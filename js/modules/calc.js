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

export default calc;
