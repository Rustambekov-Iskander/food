window.addEventListener('DOMContentLoaded', () => {

    // Tabheader
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

        function hideTabContent(){
            tabContent.forEach( item => {
                item.classList.add('hide'); 
                item.classList.remove('show', 'fade'); 
            } );

            tabs.forEach( item => {
                item.classList.remove('tabheader__item_active');
            } );
        }

        function showTapContent( i = 0 ){
            tabContent[i].classList.add('show', 'fade');
            tabContent[i].classList.remove('hide');
            tabs[i].classList.add('tabheader__item_active');
        }

        hideTabContent();
        showTapContent();

        tabsParent.addEventListener( 'click', event => {
            const target = event.target;

            if ( target && target.classList.contains('tabheader__item') ){
                tabs.forEach( (items, i) => {
                    if ( target == items ){
                        hideTabContent();
                        showTapContent(i);

                    }
                } );
            }

        } );
        // tabheader end


        // Timer
        const deadline = '2022-05-01';

        function getTimeRemaining (endTime){
            const t = Date.parse(endTime) - Date.parse(new Date()),
                  days = Math.floor( t / ( 1000 * 60 * 60 * 24 ) ),
                  hours = Math.floor( ( t / ( 1000 * 60 * 60 ) ) % 24 ),
                  minutes = Math.floor( ( t / ( 1000 * 60 ) ) % 60 ),
                  seconds = Math.floor( ( t /  1000 ) % 60 );

            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };

        }

        function setClock(selection, endTime){
            const timer = document.querySelector(selection),
                  days = document.querySelector('#days'),
                  hours = document.querySelector('#hours'),
                  minutes = document.querySelector('#minutes'),
                  seconds = document.querySelector('#seconds'),
                  timeInterval = setInterval(updateClock, 1000);
            
            updateClock();
            
            function updateClock(){
                const t = getTimeRemaining(endTime);

                function addZero(selector, getR){
                    if ( getR < 10 ){
                        selector.innerHTML = `0${getR}`;
                    }else{
                        selector.innerHTML = getR;
                    }
                }

                addZero(days, t.days);
                addZero(hours, t.hours);
                addZero(minutes, t.minutes);
                addZero(seconds, t.seconds);
                
                if ( t.total <= 0 ){
                    clearInterval(timeInterval);
                }
            }
        }

        setClock('.timer', deadline);
        // timer end

        // modal
        const modal = document.querySelector('.modal'),
              btnOpenModal = document.querySelectorAll('[data-modal]');

        function openModal(){
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            clearInterval(modalTimerId);
        }

        btnOpenModal.forEach( item => {
            item.addEventListener('click', e => {
                openModal();
            });
        });

        function removeModal(){
            modal.classList.remove('show');
            document.body.style.overflow = '';

        }

        function closeModal(modal){

            modal.addEventListener('click', e => {
                const cond = e.target.getAttribute('data-modal-close') == '';
                if ( e.target === modal || cond ){
                    removeModal();
                }
            });

            document.addEventListener('keyup', e => {
                if ( e.code === 'Escape' && modal.classList.contains('show')){
                    removeModal();
                }
            });

        }
        
        closeModal(modal);

        const modalTimerId = setTimeout( e => {
            openModal();
        }, 50000);


        function openModalByScroll(){
            const scrl = window.scrollY+1 >= document.documentElement.
            scrollHeight - document.documentElement.clientHeight;

            if ( scrl ){
                openModal();
                window.removeEventListener('scroll', openModalByScroll);
            }
        }
        window.addEventListener('scroll', openModalByScroll);

        // modal end

        // classes for menu
        class AddMenuForDay {

            constructor(src, alt, title, descr, price, selector){
                this.src = src;
                this.alt = alt;
                this.title = title;
                this.descr = descr;
                this.price = price;
                this.selector = document.querySelector(selector);
            }

            addMenu(){
                let div = document.createElement('div');
                div.innerHTML = `
<div class="menu__item">
    <img src="${this.src}" alt="${this.alt}">
    <h3 class="menu__item-subtitle">Меню “${this.title}”</h3>
    <div class="menu__item-descr">${this.descr}</div>
    <div class="menu__item-divider"></div>
    <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total"><span>${this.price}</span> $/день</div>
    </div>
</div>
                `;
                this.selector.append(div);
            }
        }

        let descrForMenu = `В меню мы используем не только 
        красивый дизайн упаковки, но и качественное исполнение блюд. 
        Красная рыба, морепродукты, фрукты - ресторанное меню без 
        похода в ресторан!`;

        const getResource = async (url) => {
            const res = await fetch(url);

            if ( !res.ok ){
                throw new Error(`Could not fetch ${url}, status: ${res.status}`);
            }

            return await res.json();
        };


        axios.get('http://localhost:3000/menu')
            .then(data => {
                data.data.forEach( ({img, altimg, title, descr, price}) => {
                    new AddMenuForDay(img, altimg, title, descr, price, '.menu .container').addMenu();

                });
            });

        //====== if you need to create only once =========

        // getResource('http://localhost:3000/menu')
        //     .then(data => createCard(data));

        // function createCard(data){
        //     data.forEach( ({img, altimg, title, descr, price}) => {
        //         const element = document.createElement('div');
        //         element.classList.add('menu__item');

        //         element.innerHTML = `
        //         <div class="menu__item">
        //             <img src="${img}" alt="${altimg}">
        //             <h3 class="menu__item-subtitle">Меню “${title}”</h3>
        //             <div class="menu__item-descr">${descr}</div>
        //             <div class="menu__item-divider"></div>
        //             <div class="menu__item-price">
        //                 <div class="menu__item-cost">Цена:</div>
        //                 <div class="menu__item-total"><span>${price}</span> $/день</div>
        //             </div>
        //         </div>
        //         `;
        //         document.querySelector('.menu .container').append(element);

        //     });
        // }
        // ==================================================
                

    

        // end classes for menu

        // forms with db
        const forms = document.querySelectorAll('form');

        const message = {
            loading: 'img/form/spinner.svg',
            succes: 'Спасибо! Мы с вами скоро свяжемся',
            failure: 'Что-то пошло не так'
        };

        forms.forEach(form => {
            bindPostData(form);
        });

        const postData = async (url, data) => {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: data     
            });

            return await res.json();
        };

        function bindPostData(form){
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const statusMessage = document.createElement('img');
                statusMessage.src = message.loading;
                statusMessage.style.cssText = `
                    display: block;
                    margin: 0 auto;
                `;
                form.insertAdjacentElement('afterend', statusMessage);
                
            
                const formData = new FormData(form);

                const json = JSON.stringify(Object.fromEntries(formData.entries()));


                postData('http://localhost:3000/requests', json)
                    .then(data => {
                        console.log(data);
                        statusMessage.remove();
                        showThnxModal(message.succes);
                    })
                    .catch(() => {
                        showThnxModal(message.failure);
                    })
                    .finally(() =>{
                        form.reset();
                    });

            });
        }

        function showThnxModal(message){
            const prevModalDialog = document.querySelector('.modal__dialog');

            prevModalDialog.classList.add('hide');
            openModal();

            const thnxModal = document.createElement('div');
            thnxModal.classList.add('modal__dialog');
            thnxModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close data-modal-close" data></div>
                <div class="modal__title">${message}</div>
            </div>
            `;
            document.querySelector('.modal').append(thnxModal);
            setTimeout(() => {
                thnxModal.remove();
                prevModalDialog.classList.add('show');
                prevModalDialog.classList.remove('hide');
                removeModal();
            }, 3000);

        }


        // Slider
        class Slides {

            constructor(alt,  img) {
                this.alt = alt;
                this.img = img;
            }

            addImg() {
                const slideInner = document.querySelector('.offer__slider-inner');
                slideInner.insertAdjacentHTML('beforeend', `
                <div class="offer__slide">
                    <img src="${this.img}" alt="${this.alt}">
                </div>
                `);
            }
        }

        axios.get('http://localhost:3000/slide')
        
            .then(data => {
                data.data.forEach(({id, alt, img}) => {
                    new Slides(alt, img).addImg();
                });

                const total = document.getElementById('total');
                if (data.data.length < 10){
                    total.innerHTML = `0${data.data.length}`;
                }else{
                    total.innerHTML = `${data.data.length}`;
                } 
                console.log(data.data);
            })
            .then( () => {
                const slides = document.querySelectorAll('.offer__slide'),
                      slider = document.querySelector('.offer__slider'),
                      slideWrapper = document.querySelector('.offer__slider-wrapper'),
                      current = document.querySelector('#current'),
                      nextSlide = document.querySelector('.offer__slider-next'),
                      prevSlide = document.querySelector('.offer__slider-prev'),
                      sliderField = document.querySelector('.offer__slider-inner'),
                      width = window.getComputedStyle(slideWrapper).width;

                function currentSlide(){
                    if(slideIndex < 10){
                        current.textContent = `0${slideIndex}`;
                    }else{
                        current.textContent = `${slideIndex}`;
                    }
                }

                let slideIndex = 0;
                let offset = 0;
        
                sliderField.style.width = 100 * slides.length + "%";
                sliderField.style.display = 'flex';
                sliderField.style.transition = '0.5s all';
        
                slideWrapper.style.overflow = 'hidden';
        
        
                slides.forEach(slide => {
                    slide.style.width = width;
                });
                const widthPx = +width.replace(/\D/g, '');

                slider.style.position = 'relative';
                const indicators = document.createElement('ol'),
                    dots = [];
                indicators.classList.add('carousel-indicators');
                indicators.style.cssText = `
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    z-index: 15;
                    display: flex;
                    justify-content: center;
                    margin-right: 15%;
                    margin-left: 15%;
                    list-style: none;
                `;
                slider.append(indicators);

                for (let i = 0; i < slides.length; i++) {
                    const dot = document.createElement('li');
                    dot.setAttribute('data-slide-to', i + 1);
                    dot.style.cssText = `
                        box-sizing: content-box;
                        flex: 0 1 auto;
                        width: 30px;
                        height: 6px;
                        margin-right: 3px;
                        margin-left: 3px;
                        cursor: pointer;
                        background-color: #fff;
                        background-clip: padding-box;
                        border-top: 10px solid transparent;
                        border-bottom: 10px solid transparent;
                        opacity: .5;
                        transition: opacity .6s ease;
                    `;
                    if (i == 0){
                        dot.style.opacity = '1';
                    }
                    indicators.append(dot);
                    dots.push(dot); 
                }

                function forDots(){
                    dots.forEach(dot => dot.style.opacity = '0.5');
                    dots[slideIndex - 1].style.opacity = '1';
                    currentSlide();
                    sliderField.style.transform = `translateX(-${offset}px)`;
                }
        
                nextSlide.addEventListener('click', () => {
        
                    if (offset == widthPx * (slides.length -1)){
                        offset = 0;
                        slideIndex = 0;
                    }else{
                        offset += widthPx;
                        ++slideIndex;
        
                    }
                    
                    forDots();
                });
        
                prevSlide.addEventListener('click', () => {
        
                    if (offset == 0){
                        offset = widthPx * (slides.length -1);
                        slideIndex = slides.length -1;
                    }else{
                        offset -= widthPx;
                        --slideIndex;
        
                    }
                    forDots();

                });

                dots.forEach(dot => {
                    dot.addEventListener('click', e => {
                        const slideTo = e.target.getAttribute('data-slide-to');
                        slideIndex = slideTo;
                        offset = widthPx * (slideTo -1);

                        forDots();

                    });
                });

                
            });
            // slider end
                
            // calc
            const genders = document.querySelectorAll('[data-gender]'),
                  activity = document.querySelectorAll('[data-activity]'),
                  height = document.querySelector('#height'),
                  weight = document.querySelector('#weight'),
                  age = document.querySelector('#age'),
                  result = document.querySelector('.calculating__result span'),
                  calculating = document.querySelector('.calculating .container');
            
            let activityResult = '',
                genderResult = '',
                weightContent = '',
                heightContent = '',
                ageContent = '';
            

            function calculatingChoose(items, item){
                items.forEach(item => {
                    item.classList.remove('calculating__choose-item_active');
                });

                item.classList.add('calculating__choose-item_active');

            }
  

            genders.forEach(gender => {
                gender.addEventListener('click', () => {
                    calculatingChoose(genders, gender);
                    genders.forEach(gender => {
                        if (gender.classList.contains('calculating__choose-item_active')){
                            genderResult = (gender.getAttribute(`data-gender`));
                        }
                    });
                });
            });


            activity.forEach(item => {
                item.addEventListener('click', () => {
                    calculatingChoose(activity, item);
                    activity.forEach(item => {
                        if (item.classList.contains('calculating__choose-item_active')){
                            activityResult = (item.getAttribute(`data-activity`));
                        }
                    });
                    
                });
            });
            

            
            weight.addEventListener('keyup', () => {
                let weightResult = weight.value;

                if( +weightResult ){
                    weightContent = weightResult;
                }else{
                    console.log('можно вводить только цифры');
                }
            });

            height.addEventListener('keyup', () => {
                let heightResult = height.value;
                if( +heightResult ){
                    heightContent = heightResult;
                }else{
                    console.log('можно вводить только цифры');
                }
            });
            age.addEventListener('keyup', () => {
                let ageResult = age.value;
                if( +ageResult ){
                    ageContent = ageResult;
                }else{
                    console.log('можно вводить только цифры');
                }
            });


            calculating.addEventListener('click', () => {
                    let bmr = 0;
                    let act = 0;

                    if(activityResult == 'low'){
                        act = 1.2;
                    }else if(activityResult == 'small'){
                        act = 1.375;
                    }else if (activityResult == 'medium'){
                        act = 1.55;
                    }else if (activityResult == 'high'){
                        act = 1.725;
                    }

                    if(genderResult == 'woman'){
                        bmr = 447.6 + (9.2 * weightContent) + (3.1 * heightContent) + (4.3 * ageContent);
                        
                    }else if (genderResult == 'man'){
                        bmr = 88.36 + (13.4 * weightContent) + (4.8 * heightContent) + (5.7 * ageContent);
                    }

                    console.log(genderResult + activityResult);
                    console.log(weightContent + heightContent + ageContent);

                    bmr *= act;

                    result.innerHTML = `${Math.floor(bmr)}`;
                    


                });
            
            // calc end



});