
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

export default modall;
export {openModal};
export {closeModal};