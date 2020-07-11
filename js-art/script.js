window.onload = () => {
    let checkFlag = window.getComputedStyle(document.querySelector('.header .burger')).getPropertyValue('display');
    let header = document.querySelector('.header');
    let footer = document.querySelector('.footer');
    let headerHeight = Math.floor(parseInt(window.getComputedStyle(header).getPropertyValue('height')));
    let footerHeight = Math.floor(parseInt(window.getComputedStyle(footer).getPropertyValue('height')));
    if (checkFlag === 'block') {
        // make dependent height

        document.querySelector('main').style.marginTop = headerHeight + 'px';
        document.querySelector('main').style.marginBottom = footerHeight + 'px';

        document.querySelector('.download-free').style.bottom = Math.floor(parseInt(window.getComputedStyle(footer).getPropertyValue('height'))) + 20 + 'px';
        document.querySelectorAll('.block').forEach((elem) => {
            elem.style.minHeight = window.innerHeight - headerHeight - footerHeight + 'px'
        });
        document.querySelectorAll('.popup').forEach((elem) => {
            elem.style.paddingTop = headerHeight + 'px';
            elem.style.paddingBottom = footerHeight + 'px';
        });
    }
    // make dependent height

    // slider

    const siema = new Siema({
        selector: '.catalog-slider .siema-slider',
        loop: false,
        onChange: () => {
            let currentDot =  document.querySelector('.catalog-slider .dots ul .current');
            if ( currentDot) {
                currentDot.classList.remove('current');
            }
            document.querySelectorAll('.catalog-slider .dots ul li')[siema.currentSlide].classList.add('current');
        }
    })
    document.querySelectorAll('.catalog-slider .siema-slider .siema-slide').forEach( (elem, index) => {
        let li = document.createElement('li');
        li.classList.add(`${index}`);
        if (index === 0){
            li.classList.add('current');
        }
        li.addEventListener('click', function () {
            siema.goTo(index);
            let currentDot =  document.querySelector('.catalog-slider .dots ul .current');
            if ( currentDot) {
                currentDot.classList.remove('current');
            }
            this.classList.add('current')
        })
        document.querySelector('.catalog-slider .dots ul').appendChild(li);
    });
    document.querySelector('.catalog-slider .arrows .next').addEventListener('click', () => siema.next());
    document.querySelector('.catalog-slider .arrows .prev').addEventListener('click', () => siema.prev());

    // slider

    // smooth-scroll

    const anchors = [].slice.call(document.querySelectorAll('*[href*="#"]'));
    anchors.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scroll({
                top: coordY,
                left: 0,
            });

            let popup = document.querySelector('.popups .menu');
            document.querySelector('html').style.overflowY = 'scroll';
            popup.style.left = '-100%';
            setTimeout( ()=>{
                popup.style.display = 'none'
            }, 300)
        });
    });

    // smooth-scroll
    // btn-events
    if (checkFlag === 'block') {
        document.querySelector('.header .menu .burger button').addEventListener('click', function () {
            if(document.querySelector('.popups .language').style.display === 'flex'){
                document.querySelector('.popups .language').style.right = '-100%';
                setTimeout( ()=>{
                    document.querySelector('.popups .language').style.display = 'none'
                }, 300)
            }
            let popup = document.querySelector('.popups .menu');
            if(popup.style.display === 'flex'){
                document.querySelector('html').style.overflowY = 'scroll';
                popup.style.left = '-100%';
                setTimeout( ()=>{
                    popup.style.display = 'none'
                }, 300)
            } else {
                document.querySelector('html').style.overflowY = 'hidden';
                popup.style.display = 'flex';
                setTimeout( ()=>{
                    popup.style.left = '0';
                }, 0)

            }
        });

        document.querySelector('.header .menu .language').addEventListener('click', function () {
            if (document.querySelector('.popups .menu').style.display === 'flex') {
                document.querySelector('.popups .menu').style.left = '-100%';
                setTimeout(() => {
                    document.querySelector('.popups .menu').style.display = 'none'
                }, 300)
            }
            let popup = document.querySelector('.popups .language');
            if (popup.style.display === 'flex') {
                document.querySelector('html').style.overflowY = 'scroll';
                popup.style.right = '-100%';
                setTimeout(() => {
                    popup.style.display = 'none'
                }, 300)
            } else {
                document.querySelector('html').style.overflowY = 'hidden';
                popup.style.display = 'flex';
                setTimeout(() => {
                    popup.style.right = '0';
                }, 0)

            }
        });
    }

    // btn-events

    // page-slider

    if (checkFlag === 'none'){
        $('main').fullpage({
            navigation: true,
        });
    }

    // page-slider
};