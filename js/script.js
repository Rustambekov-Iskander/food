import tabs from './modules/tabs';
import timer from './modules/timer';
import modal from './modules/modal';
import menu from './modules/menu';
import slider from './modules/slider';
import calc from './modules/calc';
import forms from './modules/forms';
import {openModal} from './modules/modal';


// const slides = document.querySelectorAll('.offer__slide'),
// slider = document.querySelector('.offer__slider'),
// slideWrapper = document.querySelector('.offer__slider-wrapper'),
// current = document.querySelector('#current'),
// nextSlide = document.querySelector('.offer__slider-next'),
// prevSlide = document.querySelector('.offer__slider-prev'),
// sliderField = document.querySelector('.offer__slider-inner'),

window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout( () => 
    openModal('.modal', modalTimerId), 50000);

    tabs({
        tabS: '.tabheader__item',
        tabContenT: '.tabcontent',
        tabsParenT: '.tabheader__items',
        activeClass: 'tabheader__item_active'
    });

    timer('.timer', '2022-05-01');
    modal('.modal', modalTimerId);
    menu('.menu .container');

    slider({
        allSlide: '.offer__slide',
        offer: '.offer__slider',
        wrapper: '.offer__slider-wrapper',
        curr: '#current',
        next: '.offer__slider-next',
        prev: '.offer__slider-prev',
        field: '.offer__slider-inner'
    });

    calc();
    forms('form', '.modal');
});