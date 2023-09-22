$(document).ready(function () {
    // Fancybox presets start
    $('[data-fancybox]').fancybox({
        touch: false,
        buttons: [
            "slideShow",
            "thumbs",
            "zoom",
            "fullScreen",
            "close"
        ],
        loop: false,
        protect: false,
    });
    // Fancybox presets end
    
    // Form logic start

    // Mask for input number phone
    $("#phone").mask("+38 (999) 999-99-99");
    // Form logic end

    // Header sticky on scroll start
    window.onscroll = function () { myFunction() };
    var header = document.getElementById("header");
    var sticky = header.offsetTop;
    function myFunction() {
        if (window.pageYOffset > sticky) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }
    // Header sticky on scroll end

    // Header menu start
    $('.header__burger').on('click', function (e) {
        openMenu(e)
    })
    $('.header-menu__close').on('click', function (e) {
        closeMenu(e)
    })
    $('.close-menu').on('click', function (e) {
        closeMenu(e)
    })
    function openMenu(e) {
        e.preventDefault();
        $('.header-menu').addClass('active')
        $('body').addClass('--fixed')
    }
    function closeMenu(e) {
        e.preventDefault();
        $('.header-menu').removeClass('active')
        $('body').removeClass('--fixed')
    }
    // Header menu end

    // !!!!!!!!!!!!!!!!!!!!!!!
    // First screen slider start
    // !!!!!!!!!!!!!!!!!!!!!!!
    var sync1 = $("#sync1");
    var sync2 = $("#sync2");
    var slidesPerPage = 3; //globaly define number of elements per page
    var syncedSecondary = true;

    sync1.owlCarousel({
        items: 1,
        nav: false,
        dots: false,
        autoplay: false,
        loop: true,
        responsiveRefreshRate: 200,
        touchDrag: false,
        mouseDrag: false,
        slideSpeed: 2000,
        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
        navText: ['<svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>', '<svg width="100%" height="100%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>'],
    }).on('changed.owl.carousel', syncPosition);

    sync2
        .on('initialized.owl.carousel', function () {
            sync2.find(".owl-item").eq(0).addClass("current");
        })
        .owlCarousel({
            items: 1,
            dots: false,
            nav: false,
            smartSpeed: 200,
            slideSpeed: 500,
            slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
            responsiveRefreshRate: 100,
            touchDrag: false,
            mouseDrag: false,
            navText: ['<span>Назад</span><svg width="19" height="8" viewBox="0 0 19 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.646446 4.35355C0.451185 4.15829 0.451185 3.84171 0.646446 3.64645L3.82843 0.464466C4.02369 0.269204 4.34027 0.269204 4.53553 0.464466C4.7308 0.659728 4.7308 0.976311 4.53553 1.17157L1.70711 4L4.53553 6.82843C4.7308 7.02369 4.7308 7.34027 4.53553 7.53553C4.34027 7.7308 4.02369 7.7308 3.82843 7.53553L0.646446 4.35355ZM19 4.5H1V3.5H19V4.5Z" fill="white"/></svg>', '<span>Далі</span> <svg width="19" height="8" viewBox="0 0 19 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.3536 4.35355C18.5488 4.15829 18.5488 3.84171 18.3536 3.64645L15.1716 0.464466C14.9763 0.269204 14.6597 0.269204 14.4645 0.464466C14.2692 0.659728 14.2692 0.976311 14.4645 1.17157L17.2929 4L14.4645 6.82843C14.2692 7.02369 14.2692 7.34027 14.4645 7.53553C14.6597 7.7308 14.9763 7.7308 15.1716 7.53553L18.3536 4.35355ZM0 4.5H18V3.5H0V4.5Z" fill="white"/></svg>'],
            responsive: {
                1025: {
                    items: slidesPerPage,
                }
            }
        }).on('changed.owl.carousel', syncPosition2);

    function syncPosition(el) {
        //if you set loop to false, you have to restore this next line
        //var current = el.item.index;

        //if you disable loop you have to comment this block
        var count = el.item.count - 1;
        var current = Math.round(el.item.index - (el.item.count / 2) - .5);

        if (current < 0) {
            current = count;
        }
        if (current > count) {
            current = 0;
        }

        //end block

        sync2
            .find(".owl-item")
            .removeClass("current")
            .eq(current)
            .addClass("current");
        var onscreen = sync2.find('.owl-item.active').length - 1;
        var start = sync2.find('.owl-item.active').first().index();
        var end = sync2.find('.owl-item.active').last().index();

        if (current > end) {
            sync2.data('owl.carousel').to(current, 100, true);
        }
        if (current < start) {
            sync2.data('owl.carousel').to(current - onscreen, 100, true);
        }
    }

    function syncPosition2(el) {
        if (syncedSecondary) {
            var number = el.item.index;
            sync1.data('owl.carousel').to(number, 100, true);
        }
    }

    sync2.on("click", ".owl-item", function (e) {
        e.preventDefault();
        var number = $(this).index();
        sync1.data('owl.carousel').to(number, 300, true);
    });

    // Fix nav buttons prev and next in desktop start
    $('.screen__slider-nav .owl-next').click(function () {
        if ($(window).width() > 1024) {
            sync1.trigger('next.owl.carousel');
        }
    })
    $('.screen__slider-nav .owl-prev').click(function () {
        if ($(window).width() > 1024) {
            sync1.trigger('prev.owl.carousel');
        }
    })
    // Fix nav buttons prev and next in desktop end

    // !!!!!!!!!!!!!!!!!!!!!!!
    // First screen slider end
    // !!!!!!!!!!!!!!!!!!!!!!!

    // Product slider start
    let productSlider = $('.product__slider');
    productSlider.owlCarousel({
        loop: false,
        margin: 0,
        nav: false,
        dots: false,
        touchDrag: false,
        mouseDrag: false,
        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
        items: 1,
        navText: ['<span>Назад</span><svg width="19" height="8" viewBox="0 0 19 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.646446 4.35355C0.451185 4.15829 0.451185 3.84171 0.646446 3.64645L3.82843 0.464466C4.02369 0.269204 4.34027 0.269204 4.53553 0.464466C4.7308 0.659728 4.7308 0.976311 4.53553 1.17157L1.70711 4L4.53553 6.82843C4.7308 7.02369 4.7308 7.34027 4.53553 7.53553C4.34027 7.7308 4.02369 7.7308 3.82843 7.53553L0.646446 4.35355ZM19 4.5H1V3.5H19V4.5Z" fill="white"/></svg>', '<span>Далі</span> <svg width="19" height="8" viewBox="0 0 19 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.3536 4.35355C18.5488 4.15829 18.5488 3.84171 18.3536 3.64645L15.1716 0.464466C14.9763 0.269204 14.6597 0.269204 14.4645 0.464466C14.2692 0.659728 14.2692 0.976311 14.4645 1.17157L17.2929 4L14.4645 6.82843C14.2692 7.02369 14.2692 7.34027 14.4645 7.53553C14.6597 7.7308 14.9763 7.7308 15.1716 7.53553L18.3536 4.35355ZM0 4.5H18V3.5H0V4.5Z" fill="white"/></svg>'],
    })
    // Destroy this slider in desktop and create in mobile start
    function postsCarousel() {
        var checkWidth = $(window).width();
        var owlPost = $(".product__slider-inner");
        if (checkWidth > 1024) {
            if (typeof owlPost.data('owl.carousel') != 'undefined') {
                owlPost.data('owl.carousel').destroy();
            }
            owlPost.removeClass('owl-carousel');
        } else if (checkWidth < 1025) {
            owlPost.addClass('owl-carousel');
            owlPost.owlCarousel({
                loop: false,
                margin: 0,
                nav: true,
                dots: false,
                items: 1,
                responsive: {
                    480: {
                        items: 2,
                    }
                },
                navText: ['<svg width="21" height="8" viewBox="0 0 21 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.646446 4.35355C0.451185 4.15829 0.451185 3.84171 0.646446 3.64645L3.82843 0.464466C4.02369 0.269204 4.34027 0.269204 4.53553 0.464466C4.7308 0.659728 4.7308 0.976311 4.53553 1.17157L1.70711 4L4.53553 6.82843C4.7308 7.02369 4.7308 7.34027 4.53553 7.53553C4.34027 7.7308 4.02369 7.7308 3.82843 7.53553L0.646446 4.35355ZM21 4.5H1V3.5H21V4.5Z" fill="#B5B5B5"/></svg>', '<svg width="21" height="8" viewBox="0 0 21 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.3536 4.35355C20.5488 4.15829 20.5488 3.84171 20.3536 3.64645L17.1716 0.464466C16.9763 0.269204 16.6597 0.269204 16.4645 0.464466C16.2692 0.659728 16.2692 0.976311 16.4645 1.17157L19.2929 4L16.4645 6.82843C16.2692 7.02369 16.2692 7.34027 16.4645 7.53553C16.6597 7.7308 16.9763 7.7308 17.1716 7.53553L20.3536 4.35355ZM0 4.5H20V3.5H0V4.5Z" fill="#B5B5B5"/></svg>'],
            })
        }
    }
    postsCarousel();
    $(window).resize(postsCarousel);
    // Destroy this slider in desktop and create in mobile end
    $('.product__sub-slider').owlCarousel({
        loop: false,
        margin: 8,
        nav: false,
        dots: true,
        items: 1,
        navText: ['<span>Назад</span><svg width="19" height="8" viewBox="0 0 19 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.646446 4.35355C0.451185 4.15829 0.451185 3.84171 0.646446 3.64645L3.82843 0.464466C4.02369 0.269204 4.34027 0.269204 4.53553 0.464466C4.7308 0.659728 4.7308 0.976311 4.53553 1.17157L1.70711 4L4.53553 6.82843C4.7308 7.02369 4.7308 7.34027 4.53553 7.53553C4.34027 7.7308 4.02369 7.7308 3.82843 7.53553L0.646446 4.35355ZM19 4.5H1V3.5H19V4.5Z" fill="white"/></svg>', '<span>Далі</span> <svg width="19" height="8" viewBox="0 0 19 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.3536 4.35355C18.5488 4.15829 18.5488 3.84171 18.3536 3.64645L15.1716 0.464466C14.9763 0.269204 14.6597 0.269204 14.4645 0.464466C14.2692 0.659728 14.2692 0.976311 14.4645 1.17157L17.2929 4L14.4645 6.82843C14.2692 7.02369 14.2692 7.34027 14.4645 7.53553C14.6597 7.7308 14.9763 7.7308 15.1716 7.53553L18.3536 4.35355ZM0 4.5H18V3.5H0V4.5Z" fill="white"/></svg>'],
    })
    $('.product__nav-button').on('click', function () {
        $('.product__nav-button').removeClass('active')
        $(this).addClass('active')
        // В зависимости от того, каким по счету идёт елемент - на тот слайд переключается
        let slideTo = $(this).index();
        productSlider.data('owl.carousel').to(slideTo, 500, true);
    })
    // Product slider end

    // Slider popular start
    $('.popular__slider').owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        dots: false,
        items: 1,
        navText: ['<span>Назад</span><svg width="19" height="8" viewBox="0 0 19 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.646446 4.35355C0.451185 4.15829 0.451185 3.84171 0.646446 3.64645L3.82843 0.464466C4.02369 0.269204 4.34027 0.269204 4.53553 0.464466C4.7308 0.659728 4.7308 0.976311 4.53553 1.17157L1.70711 4L4.53553 6.82843C4.7308 7.02369 4.7308 7.34027 4.53553 7.53553C4.34027 7.7308 4.02369 7.7308 3.82843 7.53553L0.646446 4.35355ZM19 4.5H1V3.5H19V4.5Z" fill="white"/></svg>', '<span>Далі</span> <svg width="19" height="8" viewBox="0 0 19 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.3536 4.35355C18.5488 4.15829 18.5488 3.84171 18.3536 3.64645L15.1716 0.464466C14.9763 0.269204 14.6597 0.269204 14.4645 0.464466C14.2692 0.659728 14.2692 0.976311 14.4645 1.17157L17.2929 4L14.4645 6.82843C14.2692 7.02369 14.2692 7.34027 14.4645 7.53553C14.6597 7.7308 14.9763 7.7308 15.1716 7.53553L18.3536 4.35355ZM0 4.5H18V3.5H0V4.5Z" fill="white"/></svg>'],
        responsive: {
            1025: {
                items: 2,
            }
        }
    })
    // Slider popular end

    // Slider default start
    $('.slider').owlCarousel({
        loop: true,
        margin: 20,
        nav: false,
        dots: true,
        items: 1,
        navText: ['<span>Назад</span><svg width="19" height="8" viewBox="0 0 19 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.646446 4.35355C0.451185 4.15829 0.451185 3.84171 0.646446 3.64645L3.82843 0.464466C4.02369 0.269204 4.34027 0.269204 4.53553 0.464466C4.7308 0.659728 4.7308 0.976311 4.53553 1.17157L1.70711 4L4.53553 6.82843C4.7308 7.02369 4.7308 7.34027 4.53553 7.53553C4.34027 7.7308 4.02369 7.7308 3.82843 7.53553L0.646446 4.35355ZM19 4.5H1V3.5H19V4.5Z" fill="white"/></svg>', '<span>Далі</span> <svg width="19" height="8" viewBox="0 0 19 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.3536 4.35355C18.5488 4.15829 18.5488 3.84171 18.3536 3.64645L15.1716 0.464466C14.9763 0.269204 14.6597 0.269204 14.4645 0.464466C14.2692 0.659728 14.2692 0.976311 14.4645 1.17157L17.2929 4L14.4645 6.82843C14.2692 7.02369 14.2692 7.34027 14.4645 7.53553C14.6597 7.7308 14.9763 7.7308 15.1716 7.53553L18.3536 4.35355ZM0 4.5H18V3.5H0V4.5Z" fill="white"/></svg>'],
        responsive: {
            1025: {
                items: 2,
            }
        }
    })
    // Slider default end
    // Gallery slider start
    $('.gallery__slider').owlCarousel({
        loop: true,
        autoWidth: false,
        center: false,
        margin: 0,
        nav: true,
        dots: true,
        items: 1,
        navText: ['<svg width="26" height="40" viewBox="0 0 26 40" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1_1061)"><path d="M7.21704 19.9467C9.10148 18.3289 10.9504 16.7467 12.817 15.1467C16.6926 11.8223 20.5681 8.49781 24.4615 5.17337C25.2793 4.48004 25.7415 3.64448 25.617 2.56004C25.4926 1.45781 24.9059 0.657814 23.8748 0.231148C22.8081 -0.213297 21.8126 -0.0177411 20.9415 0.711148C19.5015 1.92004 18.0615 3.16448 16.6393 4.39115C11.5015 8.78226 6.38148 13.1734 1.2437 17.5645C0.283705 18.3823 -0.267405 19.36 0.105928 20.6045C0.283707 21.1911 0.657038 21.7956 1.11926 22.2045C7.73259 27.9111 14.3993 33.6 21.0481 39.2889C22.3104 40.3556 24.0704 40.2134 25.1015 38.9867C26.1504 37.7245 25.9726 36.0178 24.657 34.8978C19.0215 30.0623 13.3859 25.2445 7.75037 20.4089C7.59037 20.2845 7.43037 20.1245 7.21704 19.9467Z" fill="white" fill-opacity="1"/></g><defs><clipPath id="clip0_1_1061"><rect width="25.7778" height="40" fill="white" transform="matrix(-1 0 0 1 25.7773 0)"/></clipPath></defs></svg>', '<svg width="26" height="40" viewBox="0 0 26 40" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1_1064)"><path d="M18.5603 19.9467C16.6759 18.3289 14.827 16.7467 12.9603 15.1467C9.08475 11.8223 5.2092 8.49781 1.31586 5.17337C0.498086 4.48004 0.0358639 3.64448 0.160308 2.56004C0.284753 1.45781 0.871419 0.657814 1.90253 0.231148C2.9692 -0.213297 3.96475 -0.0177411 4.83586 0.711148C6.27586 1.92004 7.71586 3.16448 9.13809 4.39115C14.2759 8.78226 19.3959 13.1734 24.5336 17.5645C25.4936 18.3823 26.0447 19.36 25.6714 20.6045C25.4936 21.1911 25.1203 21.7956 24.6581 22.2045C18.0448 27.9111 11.3781 33.6 4.7292 39.2889C3.46697 40.3556 1.70697 40.2134 0.675864 38.9867C-0.373025 37.7245 -0.195247 36.0178 1.12031 34.8978C6.75586 30.0623 12.3914 25.2445 18.027 20.4089C18.187 20.2845 18.347 20.1245 18.5603 19.9467Z" fill="white"/></g><defs><clipPath id="clip0_1_1064"><rect width="25.7778" height="40" fill="white"/></clipPath></defs></svg>'],
        responsive: {
            1025: {
                autoWidth: true,
                center: true,
                navText: ['<span>Назад</span><svg width="19" height="8" viewBox="0 0 19 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.646446 4.35355C0.451185 4.15829 0.451185 3.84171 0.646446 3.64645L3.82843 0.464466C4.02369 0.269204 4.34027 0.269204 4.53553 0.464466C4.7308 0.659728 4.7308 0.976311 4.53553 1.17157L1.70711 4L4.53553 6.82843C4.7308 7.02369 4.7308 7.34027 4.53553 7.53553C4.34027 7.7308 4.02369 7.7308 3.82843 7.53553L0.646446 4.35355ZM19 4.5H1V3.5H19V4.5Z" fill="white"/></svg>', '<span>Далі</span> <svg width="19" height="8" viewBox="0 0 19 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.3536 4.35355C18.5488 4.15829 18.5488 3.84171 18.3536 3.64645L15.1716 0.464466C14.9763 0.269204 14.6597 0.269204 14.4645 0.464466C14.2692 0.659728 14.2692 0.976311 14.4645 1.17157L17.2929 4L14.4645 6.82843C14.2692 7.02369 14.2692 7.34027 14.4645 7.53553C14.6597 7.7308 14.9763 7.7308 15.1716 7.53553L18.3536 4.35355ZM0 4.5H18V3.5H0V4.5Z" fill="white"/></svg>'],
                items: 5,
                dots: false,
            },
            480: {
                items: 2,
            }
        }
    })
    // Gallery slider end
});