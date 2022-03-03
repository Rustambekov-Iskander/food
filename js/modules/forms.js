import {openModal} from './modal';
import {postData} from '../services/services';

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


            postData('http://localhost:3000/requests', json)
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
        openModal('.modal');

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


export default form;