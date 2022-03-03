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

export default menu;