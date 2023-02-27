var images;
var slider;
var textAnim;
var id;
var author;
var initSlide = 0;

// get images from picsum

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

window.addEventListener('hashchange', ()=> {
    initSlide = location.hash.replace('#', '');
    if(initSlide > images.length) {
        history.pushState("", "", `${location.pathname}${location.search}`);
        initSlide = 0;
    }
    $('#slider').slick('slickGoTo', initSlide);
});

window.onload = function() {
    // if(location.hash !== '') {
    //     initSlide = location.hash.replace('#', '');
    // }
    console.log(initSlide, 'init slide');

    slider = document.getElementById('slider');
    // get images
    fetch("https://picsum.photos/v2/list?page=3&limit=6", requestOptions)
    .then(response => response.json())
    .then((result) => {
        images = result;
        initImages(images);
    })
    .catch(error => console.log('error', error));
};

function initImages(img) {
    img.forEach((el) => {
        let slide = document.createElement('div');
        slide.classList.add('slide');
        slide.innerHTML = '<img class="slider--img" src='+el.download_url+' alt="Image '+el.id+'">';
        slider.appendChild(slide);
        
        id = el.id;
        author = el.author;
        
        document.getElementById('author').innerHTML = author;
        // document.getElementsByClassName('id').innerHTML = id;
        $('.id').html(id);
    });
    initSlick();
    
} 

// $(document).ready(function() {})
function initSlick() {
    if(location.hash !== '') {
        initSlide = parseInt(location.hash.replace('#', ''));
        if(initSlide > images.length) {
            history.pushState("", "", `${location.pathname}${location.search}`);
            initSlide = 0;
        }
    }
    console.log(initSlide, 'on init');
    $('#slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        variableWidth: true,
        variableHeight: true,
        cssEase: 'ease-out',
        speed: 800,
        initialSlide: initSlide,
        touchMove: true,
        swipeToSlide: true,
        dots: true,
        dotsClass: 'dots__container',
        arrows: true,
        prevArrow:'<div class="slick-prev"></div>',
        nextArrow:'<div class="slick-next"></div>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ] 
    });
    // $('#slider').slick('slickGoTo', initSlide);
    animation();
    
    //Implementing  scroll
    $('#slider').on('wheel', (function(e) {
        e.preventDefault();
        if (e.originalEvent.deltaY < 0) {
            $(this).slick('slickNext');
        } else {
            $(this).slick('slickPrev');
        }
    }))
    
    .on('afterChange', function(event, slick, currentSlide, nextSlide) {
        // window.location = "#"+currentSlide;
        updateText(currentSlide);
        animation();
        console.log('afterchange');
    })
    .on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        textAnim.reverse();
        console.log('beforehange');
    })
    
    // set width based on number of el
    let dotsCollection = document.getElementsByTagName('button');
    let dots = [...dotsCollection];
    dots.forEach(dot => {
        dot.classList.add('dot');
        dot.style.setProperty("width", "calc(40vw/"+dots.length+")");
    });
    
}


function updateText(el) {
    id = images[el].id;
    author = images[el].author;
    document.getElementById('author').innerHTML = author;
    $('.id').html(id);
}

function animation() {
    textAnim = gsap.timeline();
    textAnim.play();
    textAnim.fromTo('#slider--text__container', {
        y: '20px',
        opacity: 0
    }, {
        y: '0px',
        opacity: 1,
        duration: 0.2
    })
}

// function tlContent() {
//     var tlAnim = gsap.timeline();
//     tlAnim.play();
//     tlAnim.fromTO
// }

