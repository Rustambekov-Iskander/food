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
        const deadline = '2022-06-24';

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
              btnOpenModal = document.querySelectorAll('[data-modal]'),
              btnCloseModal = document.querySelector('[data-modal-close]');



        function openModal(){
            modal.classList.toggle('show');
            document.body.style.overflow = 'hidden';
            clearInterval(modalTimerId);
        }

        btnOpenModal.forEach( item => {
            item.addEventListener('click', e => {
                openModal();
            });
        });

        function closeModal(btn, modal){

            function closeModalToggle(){
                modal.classList.toggle('show');
                document.body.style.overflow = '';
            }

            btn.addEventListener('click', e => {
                closeModalToggle();
            });

            modal.addEventListener('click', e => {
                if ( e.target === modal ){
                    closeModalToggle();
                }
            });

            document.addEventListener('keyup', e => {
                if ( e.code === 'Escape' && modal.classList.contains('show')){
                    closeModalToggle();
                }
            });

        }
        
        closeModal(btnCloseModal, modal);

        const modalTimerId = setTimeout( e => {
            openModal();
        }, 10000);


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
        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
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

        new AddMenuForDay(
            'img/tabs/elite.jpg',
            'elite', 
            'Премиум', 
            descrForMenu, 
            990,
            '.menu__field .container'
            ).addMenu();

        new AddMenuForDay(
            'img/tabs/vegy.jpg',
            'vegy', 
            'Веганское', 
            descrForMenu, 
            990,
            '.menu__field .container'
            ).addMenu();

        new AddMenuForDay(
            'img/tabs/post.jpg',
            'post', 
            'Постное', 
            descrForMenu, 
            990,
            '.menu__field .container'
            ).addMenu();



});