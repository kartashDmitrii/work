document.addEventListener("DOMContentLoaded", () => {
    // make dependent height
    let header = document.querySelector('header');
    let footer = document.querySelector('footer');
    let headerHeight = Math.floor(parseInt(window.getComputedStyle(header).getPropertyValue('height')));
    let footerHeight = Math.floor(parseInt(window.getComputedStyle(footer).getPropertyValue('height')));
    document.querySelector('main').style.marginTop = headerHeight + 'px';
    document.querySelector('main').style.marginBottom = footerHeight + 'px';

    // document.querySelector('.download-free').style.bottom = Math.floor(parseInt(window.getComputedStyle(footer).getPropertyValue('height'))) + 20 + 'px';
    document.querySelectorAll('.block').forEach( (elem)=> {
        elem.style.minHeight = window.innerHeight - headerHeight - footerHeight + 'px'
    });
    document.querySelectorAll('.popup').forEach( (elem)=> {
        elem.style.paddingTop = headerHeight + 'px';
        elem.style.paddingBottom = footerHeight + 'px';
    });
    // make dependent height

    // slider

    const siema = new Siema({
        selector: '.catalog-slider .slider',
        loop: false,
        onChange: () => {
            let currentDot =  document.querySelector('.catalog-slider .dots ul .current');
            if ( currentDot) {
                currentDot.classList.remove('current');
            }
            document.querySelectorAll('.catalog-slider .dots ul li')[siema.currentSlide].classList.add('current');
        }
    })
    document.querySelectorAll('.catalog-slider .slider .slide').forEach( (elem, index) => {
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

    // slider

    // smooth-scroll

    const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]'));
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

    document.querySelector('header .menu .burger button').addEventListener('click', function () {
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
    document.querySelector('header .menu .language').addEventListener('click', function () {
        if(document.querySelector('.popups .menu').style.display === 'flex'){
            document.querySelector('.popups .menu').style.left = '-100%';
            setTimeout( ()=>{
                document.querySelector('.popups .menu').style.display = 'none'
            }, 300)
        }
        let popup = document.querySelector('.popups .language');
        if(popup.style.display === 'flex'){
            document.querySelector('html').style.overflowY = 'scroll';
            popup.style.right = '-100%';
            setTimeout( ()=>{
                popup.style.display = 'none'
            }, 300)
        } else {
            document.querySelector('html').style.overflowY = 'hidden';
            popup.style.display = 'flex';
            setTimeout( ()=>{
                popup.style.right = '0';
            }, 0)

        }
    });

    // btn-events

    // show/hide header

    let prevScrollpos = window.pageYOffset;
    window.addEventListener('scroll', function() {
        let currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.querySelector('header').style.top = "0";
        } else {
            document.querySelector('header').style.top = `-${headerHeight}px`;
        }
        prevScrollpos = currentScrollPos;
    })

    // show/hide header
});