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

export default timer;
