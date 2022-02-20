window.addEventListener('DOMContentLoaded', () => {

    // Tabs
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


        // Timer
        const deadline = '2022-02-24';

        function getTimeRemaining(endTime){
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

                function addZero(element, getR){
                    if ( getR < 10 ){
                        element.innerHTML = `0${getR}`;
                    }else{
                        element.innerHTML = getR;
                    }
                }
                addZero(days, t.days);
                addZero(hours, t.hours);
                addZero(minutes, t.minutes);
                addZero(seconds, t.seconds);
                

                if (t.total <= 0){
                    clearInterval(timeInterval);
                }
            }
        }

        setClock('.timer', deadline);




});