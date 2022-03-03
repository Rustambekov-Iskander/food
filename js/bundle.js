/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    const genders = document.querySelectorAll('[data-gender]'),
        activity = document.querySelectorAll('[data-activity]'),
        result = document.querySelector('.calculating__result span'),
        allItem = document.querySelectorAll('.calculating__choose-item'),
        calculating = document.querySelector('.calculating .container');

    const active = 'calculating__choose-item_active';


    let activityResult, genderResult, weightResult, heightResult, ageResult;

    if (localStorage.getItem('gender')) {
        genderResult = localStorage.getItem('gender');
        initLocalStorage(genders);
    }
    if (localStorage.getItem('activity')) {
        activityResult = localStorage.getItem('activity');
        initLocalStorage(activity);
    }

    function initLocalStorage(elements) {
        elements.forEach(element => {
            if (element.getAttribute('data-gender') === genderResult) {
                element.classList.add(active);
            }
            if (element.getAttribute('data-activity') === activityResult) {
                element.classList.add(active);
            }
        });
    }


    function calculatingChoose(items, data) {
        items.forEach(item => {
            item.addEventListener('click', () => {

                items.forEach(item => {
                    item.classList.remove(active);
                });
                item.classList.add(active);

                if (item.classList.contains(active)) {
                    switch (item.getAttribute(`${data}`)) {
                        case 'data-gen':
                            genderResult = item.getAttribute(`data-gender`);
                            localStorage.setItem('gender', item.getAttribute(`data-gender`));
                            break;
                        case "data-act":
                            activityResult = item.getAttribute(`data-activity`);
                            localStorage.setItem('activity', item.getAttribute(`data-activity`));
                            break;
                    }
                }

            });

        });
    }

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    heightResult = +input.value;
                    break;
                case 'weight':
                    weightResult = +input.value;
                    break;
                case 'age':
                    ageResult = +input.value;
                    break;
            }
        });
    }

    function calc() {
        let bmr = 0;
        if (weightResult && heightResult && ageResult && activityResult &&
            genderResult) {
            if (genderResult == 'woman') {
                bmr = 447.6 + (9.2 * weightResult) +
                    (3.1 * heightResult) + (4.3 * ageResult);

            } else if (genderResult == 'man') {
                bmr = 88.36 + (13.4 * weightResult) +
                    (4.8 * heightResult) + (5.7 * ageResult);
            }

            bmr *= activityResult;
            result.innerHTML = `${Math.floor(bmr)}`;

        }
    }

    calculating.addEventListener('click', () => {
        calc();
    });
    allItem.forEach(item => {
        item.addEventListener('input', () => {
            calc();
        });
    });

    calculatingChoose(genders, 'data-gen');
    calculatingChoose(activity, 'data-act');

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function form(formSelector, selector) {
    const modal = document.querySelector(selector);
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        succes: 'Спасибо! Мы с вами скоро свяжемся',
        failure: 'Что-то пошло не так'
    };

    forms.forEach(form => {
        bindPostData(form);
    });

    function bindPostData(form) {
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


            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    statusMessage.remove();
                    showThnxModal(message.succes);
                })
                .catch(() => {
                    showThnxModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                });
        });
    }

    function showThnxModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal');

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
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }, 3000);

    }
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./js/modules/menu.js":
/*!****************************!*\
  !*** ./js/modules/menu.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// import {getResource} from '../services/services';

function menu(selector) {
    class AddMenuForDay {

        constructor(src, alt, title, descr, price, selector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.selector = document.querySelector(selector);
        }

        addMenu() {
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



    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new AddMenuForDay(img,
                    altimg, title,
                    descr, price,
                    selector).addMenu();

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
    //                 <div class="menu__item-total"><span>${price}</span>
    //  $/день</div>
    //             </div>
    //         </div>
    //         `;
    //         document.querySelector('.menu .container').append(element);

    //     });
    // }
    // ==================================================

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (menu);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal),
/* harmony export */   "closeModal": () => (/* binding */ closeModal)
/* harmony export */ });

function closeModal(selector) {
    const modal = document.querySelector(selector);

    function removeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modal.addEventListener('click', e => {
        const cond = e.target.getAttribute('data-modal-close') == '';
        if (e.target === modal || cond) {
            removeModal();
        }
    });

    document.addEventListener('keyup', e => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            removeModal();
        }
    });
}

function openModal(selector, modalTimerId) {
    const modal = document.querySelector(selector);
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    if(modalTimerId){
        clearInterval(modalTimerId);
    }
}


function modall(modal, modalTimerId) {
    const btnOpenModal = document.querySelectorAll('[data-modal]');

    btnOpenModal.forEach(item => {
        item.addEventListener('click', () => openModal(modal, modalTimerId));
    });


    closeModal(modal);



    function openModalByScroll() {
        const scrl = window.scrollY + 1 >= document.documentElement.
        scrollHeight - document.documentElement.clientHeight;

        if (scrl) {
            openModal(modal, modalTimerId);
            window.removeEventListener('scroll', openModalByScroll);
        }
    }
    window.addEventListener('scroll', openModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modall);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sliderr);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs({tabS, tabContenT, tabsParenT, activeClass}) {
    const tabs = document.querySelectorAll(tabS),
          tabContent = document.querySelectorAll(tabContenT),
          tabsParent = document.querySelector(tabsParenT);

    function hideTabContent() {
        tabContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTapContent(i = 0) {
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTapContent();

    tabsParent.addEventListener('click', event => {
        const target = event.target;

        if (target && target.classList.contains(tabS.slice(1))) {
            tabs.forEach((items, i) => {
                if (target == items) {
                    hideTabContent();
                    showTapContent(i);

                }
            });
        }

    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(selector, deadline) {

    function getTimeRemaining(endTime) {
        const t = Date.parse(endTime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(selection, endTime) {
        const timer = document.querySelector(selection),
            days = document.querySelector('#days'),
            hours = document.querySelector('#hours'),
            minutes = document.querySelector('#minutes'),
            seconds = document.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endTime);

            function addZero(selector, getR) {
                if (getR < 10) {
                    selector.innerHTML = `0${getR}`;
                } else {
                    selector.innerHTML = getR;
                }
            }

            addZero(days, t.days);
            addZero(hours, t.hours);
            addZero(minutes, t.minutes);
            addZero(seconds, t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(selector, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getResource": () => (/* binding */ getResource)
/* harmony export */ });
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

const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/menu */ "./js/modules/menu.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");










// const slides = document.querySelectorAll('.offer__slide'),
// slider = document.querySelector('.offer__slider'),
// slideWrapper = document.querySelector('.offer__slider-wrapper'),
// current = document.querySelector('#current'),
// nextSlide = document.querySelector('.offer__slider-next'),
// prevSlide = document.querySelector('.offer__slider-prev'),
// sliderField = document.querySelector('.offer__slider-inner'),

window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout( () => 
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.openModal)('.modal', modalTimerId), 50000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])({
        tabS: '.tabheader__item',
        tabContenT: '.tabcontent',
        tabsParenT: '.tabheader__items',
        activeClass: 'tabheader__item_active'
    });

    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__["default"])('.timer', '2022-05-01');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__["default"])('.modal', modalTimerId);
    (0,_modules_menu__WEBPACK_IMPORTED_MODULE_3__["default"])('.menu .container');

    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
        allSlide: '.offer__slide',
        offer: '.offer__slider',
        wrapper: '.offer__slider-wrapper',
        curr: '#current',
        next: '.offer__slider-next',
        prev: '.offer__slider-prev',
        field: '.offer__slider-inner'
    });

    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_5__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_6__["default"])('form', '.modal');
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map