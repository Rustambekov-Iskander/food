function sliderr({allSlide, offer, wrapper, 
                  curr, next, prev,
                  field}) {
    class Slides {
        constructor(alt, img) {
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
            data.data.forEach(({
                alt,
                img
            }) => {
                new Slides(alt, img).addImg();
            });

            const total = document.getElementById('total');
            if (data.data.length < 10) {
                total.innerHTML = `0${data.data.length}`;
            } else {
                total.innerHTML = `${data.data.length}`;
            }
            console.log(data.data);
        })
        .then(() => {
            const slides = document.querySelectorAll(allSlide),
                slider = document.querySelector(offer),
                slideWrapper = document.querySelector(wrapper),
                current = document.querySelector(curr),
                nextSlide = document.querySelector(next),
                prevSlide = document.querySelector(prev),
                sliderField = document.querySelector(field),
                width = window.getComputedStyle(slideWrapper).width;

            function currentSlide() {
                if (slideIndex + 1 < 10) {
                    current.textContent = `0${slideIndex + 1}`;
                } else {
                    current.textContent = `${slideIndex + 1}`;
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
                if (i == 0) {
                    dot.style.opacity = '1';
                }
                indicators.append(dot);
                dots.push(dot);
            }

            function forDots() {
                dots.forEach(dot => dot.style.opacity = '0.5');
                dots[slideIndex].style.opacity = '1';
                currentSlide();
            }

            nextSlide.addEventListener('click', () => {

                if (offset == widthPx * (slides.length - 1)) {
                    offset = 0;
                    slideIndex = 0;
                } else {
                    offset += widthPx;
                    ++slideIndex;

                }

                forDots();
                sliderField.style.transform = `translateX(-${offset}px)`;
            });

            prevSlide.addEventListener('click', () => {

                if (offset == 0) {
                    offset = widthPx * (slides.length - 1);
                    slideIndex = slides.length - 1;
                } else {
                    offset -= widthPx;
                    --slideIndex;

                }
                forDots();
                sliderField.style.transform = `translateX(-${offset}px)`;
            });

            dots.forEach(dot => {
                dot.addEventListener('click', e => {
                    const slideTo = e.target.getAttribute('data-slide-to');
                    slideIndex = slideTo - 1;
                    offset = widthPx * (slideTo - 1);
                    forDots();
                    sliderField.style.transform = `translateX(-${offset}px)`;

                });
            });


        });
}


export default sliderr;