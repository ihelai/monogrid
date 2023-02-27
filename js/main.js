var images;
var slider;
var textAnim;
var id;
var author;
var initSlide = 1;

// get images from picsum

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

window.addEventListener('hashchange', ()=> {
    initSlide = location.hash.replace('#', '');
    if(initSlide > images.length || initSlide == 0) {
        history.pushState("", "", `${location.pathname}${location.search}`);
        initSlide = 1;
    }
    $('#slider').slick('slickGoTo', initSlide-1);
});

window.onload = function() {
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
        $('.id').html(id);

    });
    initSlick();
    
} 

function initSlick() {

    tlContent();
    
    if(location.hash !== '') {
        initSlide = parseInt(location.hash.replace('#', ''));
        if(initSlide > images.length || initSlide == 0) {
            history.pushState("", "", `${location.pathname}${location.search}`);
            initSlide = 1;
        }
    }

    $('#slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        variableWidth: true,
        variableHeight: true,
        cssEase: 'ease-out',
        speed: 800,
        initialSlide: initSlide-1,
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
        updateText(currentSlide);
        animation();
    })
    .on('beforeChange', function() {
        textAnim.reverse();
    })

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

function tlContent() {
    var tlAnim = gsap.timeline();
    tlAnim.play();
    tlAnim.to('.content', {
        opacity: 1,
        duration: 0.3,
        delay: 0.3
    })
}

