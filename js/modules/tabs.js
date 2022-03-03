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

export default tabs;