requirejs.config({
    paths: {
        jquery: 'vendor/jquery-1.11.3.min',
        select2: 'vendor/select2.min',
        fancy: 'vendor/jquery.fancybox',
        fancypopup: 'vendor/jquery.fancybox',
        domReady: 'vendor/domready',
        owlMin: 'vendor/owl.min',
        jForm: 'vendor/jquery.form.min',
        slickjs: 'vendor/slick',
        isotopePath: 'vendor/isotope.pkgd.min',
        bridgetPath: 'vendor/jquery-bridget'
    },

    shim: {
        select2: {
            deps: ['jquery']
        },
        fancy: {
            deps: ['jquery']
        },
        owlMin: {
            deps: ['jquery']
        },
        jForm: {
            deps: ['jquery']
        }
        ,
        slickjs: {
            deps: ['jquery']
        },
        fancypopupjs: {
            deps: ['jquery']
        },
        isotopePath: {
            deps: ['jquery']
        },
        bridgetPath: {
            deps: ['jquery']
        }
    }
});

define('isotopeModule',
    ['jquery', 'bridgetPath', 'isotopePath'],
    function () {
        return {
            filter: function () {
                $('input').on('change', function (e) {
                    var id = $(this).attr('id');
                    var filterValue = $(this).attr('data-filter');
                    $(tabsFilter).isotope({filter: filterValue})
                    var section = '#content' + id[id.length - 1] + ' .item',
                        caption = '#content' + id[id.length - 1] + ' .caption';
                    $('label[for=#' + id + ']').trigger('click');
                    $('.tabs  .caption').css({'opacity': '0'});
                    $(caption).animate({'opacity': '1'},
                        {
                            'duration': 500,
                            'delay': 100
                        });
                });

                var tabsFilter = $('.our-projects__items__list');
                if (tabsFilter.length) {
                    console.log('2');

                    tabsFilter.isotope({
                        itemSelector: '.our-projects__items__list .item'
                    });
                }
                ;
            }
        }
    })

define('fancypopup',
    ['jquery'],
    function () {
        return {
            initPopup: function () {
                $(document).ready(function () {
                    $('.fancybox').fancybox({
                        openEffect: 'elastic',
                        closeEffect: 'elastic',
                    });
                });
            }
        }
    });

define('app',
    ['jquery'],
    function () {
        function OffScroll() {
            var winScrollTop = $(window).scrollTop();
            $(window).bind('scroll', function () {
                $(window).scrollTop(winScrollTop);
            });
        };

        function showNews(item) {
            var thisNews = item,
                containerNews = $(thisNews).find('.container'),
                wrapper = $(thisNews).find('.wrappernews');
            widthWindow = $('.pagenews').width(),
                heigthWindow = $(window).height();
            $(wrapper).addClass('transparent');
            $(containerNews).stop(true, true).animate({'opacity': '0'}, function () {
                $(wrapper).toggleClass('allscreen');
                setTimeout(function () {
                    $('html').css({'overflow': 'hidden'});
                    $(containerNews).css({'position': 'relative', 'bottom': '-1500px', 'opacity': 1});
                    $(wrapper).toggleClass('allscreen fixedscreen').stop(true, true).animate({'top': 0});
                    $(containerNews).stop(true, true).animate({'bottom': 0}, 500);
                    OffScroll();
                }, 100);
            });
        };

        function hideNews(item) {
            $(item).find('.container')
                .animate({'opacity': 0}, function () {
                    $(item).find('.wrappernews').removeClass('allscreen fixedscreen');
                    $(window).unbind('scroll');
                    $('html').removeAttr('style');
                    $('header', '.header-scroll').css({'z-index': '100'});
                });
            $('.news__list__item').removeAttr('style');
            $('header').css({'top': 0});
            $('.header-mini.header-scroll').css({'top': 0});


        };

        return {
            linksLoad: function() {
                var siteURL = "http://" + top.location.host.toString();
                var link = $("a[href^='siteURL'], a[href^='/'], a[href^='./'], a[href^='../']");

                link.each(function () {
                    $(this).on('click', function (e) {
                        e.preventDefault();
                        var hr = $(this).attr('href');
                        $('body').css({'position': 'absolute'})
                            .stop(true, true)
                            //   .animate({'opacity': 0.1})
                            .animate({'left': '-100%', 'opacity': '0.2'},
                                {'duration': 500});

                        setTimeout(function () {
                            location.href = hr;
                        }, 500);

                    })
                });
            },

            paralaxForProject: function () {
                if ($(window).width() > 992) {
                    $('.back').each(function () {
                        var $bgobj = $(this),
                            $window = $(window);
                        $(window).scroll(function () {
                            var yPos = 400 + ($window.scrollTop() / 1.7); // вычисляем коэффициент
                            // Присваиваем значение background-position
                            var coords = 'center ' + yPos + 'px';
                            // Создаем эффект Parallax Scrolling
                            $bgobj.css({top: yPos});
                        });
                    });
                }
                ;
            },

            headerChange: function () {
                var cbpAnimatedHeader = (function() {
                    var docElem = document.documentElement,
                        header = document.querySelector( 'header' ),
                        didScroll = false,
                        changeHeaderOn = 300;
                    function init() {
                        window.addEventListener( 'scroll', function( event ) {
                            if( !didScroll ) {
                                didScroll = true;
                                setTimeout( scrollPage, 250 );
                            }
                        }, false );
                    }
                    function scrollPage() {
                        var sy = scrollY(),
                            headerSite = $('header');
                        if(headerSite.length)
                            if ( sy >= changeHeaderOn ) {
                                if (!$(header).hasClass("header-scroll"))
                                {
                                    headerSite.stop( true, true ).animate({top: '-100px'}, function () {
                                        $('header').addClass('header-scroll');
                                        headerSite.stop( true, true ).animate({top: '0px'});
                                    });
                                }
                            }
                            else {
                                if ($(header).hasClass("header-scroll"))
                                {
                                    headerSite.stop( true, true ).animate({top: '-100px'}, function () {
                                        $('header').removeClass('header-scroll');
                                        headerSite.stop( true, true ).animate({top: '0px'});
                                    });
                                }
                            }
                        didScroll = false;
                    }
                    function scrollY() {
                        return window.pageYOffset || docElem.scrollTop;
                    }
                    init();
                })();
            },
            ScrollToTop: function () {
                console.log('Win');

                var btnScroll = $(".scroll-top");
                if (btnScroll) {
                    btnScroll.click(function (e) {
                        e.preventDefault();
                        $('html, body').animate({
                            'scrollTop': 0
                        }, 600)
                    });
                }
            },
            ShowBtnScrollTop: function () {
                var wHeight = window.innerHeight,
                    btnScroll = $(".scroll-top");
                if (btnScroll) {
                    $(document).ready(function () {
                        var offset = window.pageYOffset;
                        if (offset < wHeight /2) {
                            btnScroll.removeClass("scroll-top--visible");
                        }
                        if (offset > wHeight /2){
                            btnScroll.addClass("scroll-top--visible");
                        }
                    });
                    $(document).on("scroll", function () {
                        var offset = window.pageYOffset;
                        if (offset < wHeight /2) {
                            btnScroll.removeClass("scroll-top--visible");
                        }
                        if (offset > wHeight /2){
                            btnScroll.addClass("scroll-top--visible");
                        }
                    });
                }
            },
            HoverBtnScrollTop: function () {
                var btnScroll = $(".scroll-top");
                if (btnScroll) {
                    btnScroll.hover(function () {
                        $(this).find("svg g polygon").css("fill", "white");
                    },function () {
                        $(this).find("svg g polygon").css("fill", "rgb(0, 178, 202)");
                    });
                }
            },
            headerChangeForProject: function () {
                var cbpAnimatedHeader = (function() {
                    var docElem = document.documentElement,
                        header = document.querySelector( '.header-mini' ),
                        didScroll = false,
                        changeHeaderOn = 700;
                    function init() {
                        window.addEventListener( 'scroll', function( event ) {
                            if( !didScroll ) {
                                didScroll = true;
                                setTimeout( scrollPage, 50 );
                            }
                        }, false );
                    }
                    function scrollPage() {
                        var sy = scrollY(),
                            headerSite = $('.header-mini');
                        if(headerSite.length)
                            if ( sy >= changeHeaderOn ) {
                                if (!$(header).hasClass("header-scroll"))
                                {
                                    headerSite.stop( true, true ).animate({top: '-700px'}, function () {
                                        $('.header__logo img').attr({'src': 'themes/default/assets/img/logoBlack.png'});
                                        $('.header-mini').addClass('header-scroll');
                                        headerSite.stop( true, true ).animate({top: '0px'});
                                    });
                                }
                            }
                            else {
                                if ($(header).hasClass("header-scroll"))
                                {
                                    headerSite.stop( true, true ).animate({top: '-400px'}, function () {
                                        $('.header__logo img').attr({'src': 'themes/default/assets/img/logo.png'});
                                        $('.header-mini').removeClass('header-scroll');
                                        headerSite.stop( true, true ).animate({top: '0px'}, 300);
                                    });
                                }
                            }
                        didScroll = false;
                    }
                    function scrollY() {
                        return window.pageYOffset || docElem.scrollTop;
                    }
                    if($(window).width()>992){
                        init();
                    }
                })();
            },

            loadScripts: function () {
                var newsBlock = $('.news__list__item'),
                    button = $('.news__list__item  .read-more');
                if (button.length) {
                    button.each(function(){
                        $(this).on('click', function(){

                            $('header').css({'top': -200});
                            $('.header-mini.header-scroll').css({'top': -200});
                            var he = 0;
                            $('.news__list__item').each(function () {
                                var t = $(this).height();
                                if(t > he){
                                    he = t + 30;
                                }
                            })
                            var perentsBlockNews = $(this).parents('.news__list__item');
                            var newsBlockHeight = $(perentsBlockNews).height();
                            $(perentsBlockNews).css({'min-height': he, 'box-shadow': 'none'});
                            $(this).css({'opacity': '0'});
                            showNews($(perentsBlockNews));

                            $(document).mouseup(function (e) {
                                var container = $(".wrappernews .container");
                                if (container.has(e.target).length === 0){
                                    hideNews(perentsBlockNews);
                                    $(button).css({'opacity': '1'});
                                    $(perentsBlockNews).find('.container').stop(true, true).animate({'opacity': '1'},
                                        {duration: 500});
                                }
                            });

                            $(this).parents('.news__list__item').find('.close-news').on('click', function(){
                                hideNews(perentsBlockNews);
                                setTimeout(function () {
                                    $(button).css({'opacity': '1'});
                                    $(perentsBlockNews).find('.container').stop(true, true).animate({'opacity': '1'},
                                        {duration: 500});
                                }, 500);
                            });

                        })
                    });
                    $('.news__list__item h3').on('click', function () {
                        var thisBlockButton = $(this).parents('.news__list__item').find('.read-more');
                        $(thisBlockButton).trigger('click');
                    })
                }
            },

            initMap: function(){
                var map;
                if($("#map").length) {
                    var gps = window.gps.split(',') ;
                    console.log(typeof gps[0]);
                    let latLng = new google.maps.LatLng(gps[0], gps[1]);

                    var Options = {
                        center: latLng,
                        zoom: 15,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                    map = new google.maps.Map(document.getElementById("map"), Options);

                    var iconBase = 'themes/default/assets/img/';

                    var marker = new google.maps.Marker({
                        map: map,
                        position: latLng,
                        icon: iconBase + 'marker.png'
                    });

                    marker.addListener('click', function() {
                        //   $('#location').css({'display': 'block'});
                        //   infowindow.open(map, marker);
                    });
                    var infowindow = new google.maps.InfoWindow({
                        setPosition: {lat: -5.363, lng: -1.044},
                        content: 'LOCATION: KYIV, UKRAINE'
                    });
                    google.maps.event.addListener(infowindow,'closeclick',function(){

                    });

                    // google.maps.event.addDomListener(window, 'load', initialize);

                    var writeUs = $('.contacts__write__us');
                    if(writeUs.length && $('#map').length){
                        console.log(111);
                        $('#map').siblings('button').on('click', function () {
                            $('html, body').animate({scrollTop: $(writeUs).position().top});
                            console.log($(writeUs).position().top);
                        })
                    }
                }
            },

            keepFooter: function () {

                var footer = $('.footer'),
                    footerH = footer.innerHeight(),
                    main = $('.content');

                main.css({
                    'paddingBottom': footerH
                });
                footer.css({
                    'marginTop': -footerH
                });
            },

            hidePreloader: function () {
                var hellopreloader = document.getElementById("hellopreloader_preload");
                setTimeout(
                    function(){
                        var widthWindow = $(window).width();
                        $('#hellopreloader_preload').animate({'opacity': 0.7, 'left': -widthWindow}, function(){
                            $('#hellopreloader_preload').css({'display': 'none'});
                        });
                    },
                    200);

                var bodyWhite = $('body.white-page');
                if(bodyWhite.length){
                    console.log(bodyWhite.find('.header__logo').find('img').attr('src'));
                    bodyWhite.find('.header__logo').find('img').attr('src', "./themes/default/assets/img/logoBlack.png");
                }
            },

            inputsFocus: function() {
                var item = $('.contacts__write__us__form label');

                if(item.length) {
                    item.each(function(){
                        var input = $(this).find('.animated-input'),
                            placeholder = $(this).find('.contacts__write__us__form__placeholder');

                        input.focus(function(){
                            $(this).parents('label').addClass('active');
                        });

                        input.blur(function(){

                            if(($(this).val() == '')) {
                                $(this).parents('label').removeClass('active');
                            }   else {
                                $(this).parents('label').addClass('active');
                            }
                        });

                        input.on('keyup', function(){

                            if(($(this).val() == '')) {
                                $(this).parents('label').removeClass('active');
                            } else {
                                $(this).parents('label').addClass('active');
                            }
                        })

                    })
                }
            },

            dotsAnimate: function() {
                var item = $('.header__floating__blocks .item');

                if(item.length) {
                    item.each(function(i){
                        var rand = Math.floor(Math.random() * (3 - 1)) + 1,
                            tm = i*0.05 + rand*0.2 +'s',
                            am = i*0.05 + rand*0.4 +'s';

                        $(this).css({
                            'transition-delay' : tm,
                            'animation-delay' : am
                        });

                        $(this).addClass('anim');
                        $(this).addClass('turn');

                    });


                    $(document).scroll(function(){
                        var scroll = $(document).scrollTop();

                        if(scroll > 10) {
                            item.each(function(i){
                                var rand = Math.floor(Math.random() * (3 - 1)) + 1,
                                    tm = i*0.05 + rand*0.2 +'s';

                                $(this).css({
                                    'transition-delay' : tm
                                });

                                $(this).addClass('run');

                            });
                        }   else {
                            item.each(function(i){
                                var rand = Math.floor(Math.random() * (3 - 1)) + 1,
                                    tm = i*0.05 + rand*0.2 +'s';

                                $(this).css({
                                    'transition-delay' : tm
                                });

                                $(this).removeClass('run');

                            });
                        }

                    })
                }
            },

            iconAnimate: function () {
                var item = $('.icon-animate');

                if(item.length) {
                    item.each(function(i){
                        var rand = Math.floor(Math.random() * (3 - 1)) + 1,
                            tm = i*0.05 + rand*0.2 +'s',
                            am = i*0.05 + rand*0.4 +'s';

                        $(this).css({
                            'transition-delay' : tm,
                            'animation-delay' : am
                        });

                        $(this).addClass('anim');
                        $(this).addClass('turn');

                    });


                    $(document).scroll(function(){
                        var scroll = $(document).scrollTop();

                        if(scroll > 10) {
                            item.each(function(i){
                                var rand = Math.floor(Math.random() * (3 - 1)) + 1,
                                    tm = i*0.05 + rand*0.2 +'s';

                                $(this).css({
                                    'transition-delay' : tm
                                });

                                $(this).addClass('run');

                            });
                        }   else {
                            item.each(function(i){
                                var rand = Math.floor(Math.random() * (3 - 1)) + 1,
                                    tm = i*0.05 + rand*0.2 +'s';

                                $(this).css({
                                    'transition-delay' : tm
                                });

                                $(this).removeClass('run');

                            });
                        }

                    })
                }
            },

            showText: function(){
                var buttonShowText = $('.show-more'),
                    buttonHideText = $('.hide-text'),
                    textContainer = $('.text-content-show'),
                    container = $('.text-content');
                if(container.length) {
                    buttonShowText.click(function () {
                        $(container).css({'overflow': 'visible', 'max-height': 'none'});
                        buttonShowText.css({'display': 'none'});
                        buttonHideText.css({'display': 'block'});
                    })
                    buttonHideText.click(function () {
                        $(container).css({'overflow': 'hidden', 'max-height': '664px'});
                        buttonHideText.css({'display': 'none'});
                        buttonShowText.css({'display': 'block'});
                    });
                };
            },

            captionAnimate: function() {
                var item = $('.caption-animated__dots');

                if(item.length) {
                    item.each(function(){

                        var dot = $(this).find('.item');

                        dot.each(function(i){
                            var rand = Math.floor(Math.random() * (3 - 1)) + 1,
                                tm = i*0.05 + rand*0.2 +'s',
                                am = i*0.05 + rand*0.4 +'s';

                            $(this).css({
                                'transition-delay' : tm,
                                'animation-delay' : am
                            });

                            $(this).addClass('turn');
                        });

                    });

                    $(document).scroll(function(){

                        var scroll = $(document).scrollTop(),
                            itemS = $('.caption-animated__dots');

                        itemS.each(function(){
                            var offset = $(this).offset().top - $(window).height() + 5,
                                dotS = $(this).find('.item');

                            if(scroll > offset) {

                                dotS.addClass('anim');
                            }   else {
                                dotS.removeClass('anim');
                            }
                        });


                    })
                }
            },

            searchFormShow: function() {
                var form = $('.header__nav__search__form'),
                    control = $('.header__nav__search').find('span'),
                    closeButton = form.find('.search-close');

                if(form.length) {
                    control.on('click', function(){
                        form.toggleClass('active');
                    });

                    closeButton.on('click', function(e){
                        e.preventDefault();
                        form.removeClass('active');
                    })
                }
            },

            navMenuShow: function(){
                var menu = $('.header__nav'),
                    control = $('.header__nav__menu__control'),
                    body = $('body'),
                    dropdownMenu = $('.dropdown');

                if(menu.length) {
                    control.on('click', function(){
                        $(this).toggleClass('active');
                        menu.toggleClass('opened');
                        body.toggleClass('fixed');
                    })
                };

                if(dropdownMenu.length){
                    $(dropdownMenu).parents('li').on('click', function () {
                        $(dropdownMenu).toggle();
                    })
                }
            },

            scrollFirstSection: function(){
                var control = $('.header__scroll__control'),
                    wHeight = $(window).height();

                if(control.length) {
                    control.on('click', function(){
                        $('html, body').animate({
                                'scrollTop' : wHeight
                            }, 300,
                            'linear'
                        )
                    })
                }
            },

            counter: function(){
                var counter = $('.counter-val');

                if(counter.length) {
                    counter.each(function(){
                        var cV = $(this).val().replace(' ', ''),
                            cVal = parseInt(cV, 10);

                        $(this).val(0);
                        $(this).data('val', cVal);

                        $(this).addClass('end');
                    });

                    $(window).scroll(function(){
                        counter.each(function(){
                            var scroll = $(window).scrollTop(),
                                offset  = $(this).offset().top - 600,
                                cVal = $(this).data('val');

                            if(scroll >= offset) {

                                if($(this).hasClass('end')) {

                                    $(this).removeClass('end');

                                    $(this).animate({
                                        cVal: cVal
                                    }, {
                                        duration: 2000,
                                        step: function (cVal){
                                            var vl = cVal.toFixed(0);

                                            $(this).val(vl);
                                        }
                                    });
                                }
                            }
                        })
                    });

                }
            },

            sectionScroll: function() {
                function goToByScroll(id){

                    $('html,body').animate({
                            scrollTop: $("#"+id).offset().top},
                        'slow');
                }

                var menuItem = $('.header__nav nav ul li a'),
                    scrollUp = $('.scroll-up'),
                    wHeight = $(window).height();

                if(menuItem.length) {

                    $(document).scroll(function(){
                        var scroll = $(document).scrollTop();

                        if(scroll > wHeight) {
                            scrollUp.addClass('active');
                        }   else {
                            scrollUp.removeClass('active');
                        }
                    });

                    menuItem.on('click', function(e){
                        //e.preventDefault();

                        goToByScroll($(this).data('section'));
                    });

                    scrollUp.on('click', function(e){
                        e.preventDefault();

                        goToByScroll($(this).data('section'));
                    });

                }
            },

            newsHeight: function() {
                var item = $('.news__list__item');

                if(item.length) {
                    var totalH = 0;

                    item.each(function(){
                        var thisH = $(this).height();

                        if(thisH> totalH) {
                            totalH = thisH
                        }
                    });

                    item.height(totalH);
                }
            }

        }
    }
);


define('slick',
    ['slickjs'],
    function () {
        return {
            sliderInite: function () {
                console.log('dfg');
                $('.slider-carusel').slick({
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    dots: true,
                    centerMode: false,
                    // focusOnSelect: false,
                    infinite: true,
                    responsive: [
                        {
                            breakpoint: 1200,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                dots: false
                            }
                        }
                    ]
                });

            },

            sliderInitePopap: function () {
                $('.slider-for').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    fade: true,
                    dots: false,
                    asNavFor: '.slider-nav',
                    centerMode: true,
                    respondTo: 'window'

                });
                $('.slider-nav').slick({
                    slidesToShow: 6, // 3,
                    slidesToScroll: 1,
                    asNavFor: '.slider-for',
                    dots: true,
                    centerMode: false,
                    focusOnSelect: true,
                    responsive: [
                        {
                            breakpoint: 1200,
                            settings: {
                                slidesToShow: 4,
                                slidesToScroll: 1
                            }
                        }
                    ]
                });
                if($('.slick-dots').length){
                    var marginForButton = $('.slick-dots').find('li:first-child').position().left;
                    var buttonNext = $('.slick-next'),
                        buttonPrev = $('.slick-prev'),
                        windowWidth = $(window).width();
                    if(windowWidth > 767){
                        if($(buttonPrev).length){
                            $(buttonPrev).css({'left': (marginForButton - 150)});
                        };
                        if($(buttonNext).length){
                            $(buttonNext).css({'right': (marginForButton - 120)});
                        };
                    } else {
                        if($(buttonPrev).length){
                            //     $(buttonPrev).css({'left': (marginForButton )});
                        };
                        if($(buttonNext).length){
                            //     $(buttonNext).css({'right': (marginForButton )});
                        };
                    }
                }


            },

            popapOpen: function(){
                var imgSlider = $('.slider-carusel').find('.bg'),
                    popapBlock = $('.popap');

                if($(window).width()>992){
                    for(i=0; i<imgSlider.length; i++){
                        $(imgSlider[i]).on('click', function (i) {
                            var winScrollTop = $(window).scrollTop();
                            $(window).bind('scroll', function () {
                                $(window).scrollTop(winScrollTop);
                            });

                            var curentIndex = imgSlider.index($(this));
                            popapBlock.stop(true, true).animate({"left": "0"},
                                { duration: 0,
                                    delay: 0,
                                    complete: function(){
                                        popapBlock.stop(true, true).animate({'opacity': '1'}, { duration: 200, delay: 0});
                                    }});

                            var windowWidth = $(window).width();
                            if(windowWidth >1199){
                                $('.slider-for').slick('slickGoTo', curentIndex-3);
                                $('.slider-nav').slick('slickGoTo', curentIndex-3);
                            } else {

                                $('.slider-for').slick('slickGoTo', curentIndex-2);
                                $('.slider-nav').slick('slickGoTo', curentIndex-2);
                            }


                            $(document).mouseup(function (e) {
                                var container = $(".popap");
                                $(window).unbind('scroll');
                                if (container.has(e.target).length === 0){
                                    $(window).unbind('scroll');
                                    popapBlock.stop(true, true).animate({'opacity': '0'},
                                        { delay: 400,
                                            complete: function(){
                                                popapBlock.css({'left': '-2000px'});
                                            }});

                                }
                            });
                        });


                    }
                    $('.close-carusel').on('click', function () {
                        $(popapBlock).stop(true, true).animate({'opacity': 0}, function () {
                            $(popapBlock).css({'left': '-2000px'});
                        })

                    });
                }
            }


        }
    }
);


define('owl',
    ['owlMin'],
    function(){

        return {
            projectCaruselInit: function(){
                $('.owl-carousel').owlCarousel({
                    stagePadding: 0,
                    lazyLoad: true,
                    margin: 40,
                    nav:true,
                    pagination: true,
                    responsive:{
                        0:{
                            items:1
                        },
                        600:{
                            items:1
                        },
                        1170:{
                            items:3
                        },
                        autoplay: true,
                        autoplaySpeed: 700
                    }
                });
            },

            topSliderInit: function(){
                var slider = $('.header__slider'),
                    slidernav = $('.header__slider__nav'),
                    sliderPrev = slidernav.find('.owl-prev'),
                    sliderNext = slidernav.find('.owl-next'),
                    currentCounter = $('.current-slide'),
                    totalCounter = $('.total-slides'),
                    header = $('.header__bg');

                sliderPrev.on('click', function(){
                    slider.trigger('prev.owl.carousel');
                });

                sliderNext.on('click', function(){
                    slider.trigger('next.owl.carousel');
                });

                slider.on('translate.owl.carousel', function(event) {
                    var activeSrc = $('.owl-item.active').next().find('.slide img').attr('src');

                    function changeBg() {
                        header.css({
                            'background-image' : 'url('+activeSrc+')'
                        });

                        header.fadeIn(100);
                    }

                    header.fadeOut(500, changeBg );
                });

                slider.on('translated.owl.carousel', function(event) {

                    var total = event.item.count,
                        current = event.item.index - 1;
                    current = current<=total?current:1;
                    if(current == 0) {
                        currentCounter.html(total);
                    }   else {
                        currentCounter.html(current);
                    }
                    console.log(current);

                    totalCounter.html(total);
                });

                slider.on('initialized.owl.carousel', function(event) {
                    var total = event.item.count,
                        current = event.item.index - 1;

                    currentCounter.html(current);
                    totalCounter.html(total);

                    var header = $('.header__bg'),
                        activeSrc = $('.owl-item.active').find('.slide img').attr('src');

                    header.css({
                        'background-image' : 'url('+activeSrc+')'
                    })
                });

                if(slider.length) {
                    slider.owlCarousel({
                        items: 1,
                        autoHeight: true,
                        loop:true,
                        //autoplay: false,
                        autoplay: true,
                        nav: false,
                        autoplaySpeed: 700
                    })
                }
            },

            newsSliderInit: function() {
                var slider = $('.news__list'),
                    wWidth = $(window).width();

                /*       if(slider.length && (wWidth < 992)) {
                 slider.owlCarousel({
                 items: 2,
                 autoHeight: true,
                 loop:true,
                 autoplay: false,
                 nav: false,
                 dots: true,
                 autoplaySpeed: 400,

                 responsive : {
                 // breakpoint from 0 up
                 0 : {
                 items: 1

                 },
                 // breakpoint from 1199 up

                 768 : {
                 items: 2
                 }
                 }
                 })
                 } */
            }
        }
    }
);

define('dev',
    ['jForm'],
    function(){
        function Feedback()
        {
            function displayErrors(i, m)
            {
                if(typeof i != 'undefined'){
                    $(i).each(function(k,v){
                        $(v).addClass('fail').after('<p class="fail-message">'+m+'</p>');
                        $(v).on('keyup change', function(){
                            $(this).removeClass('fail').siblings('.fail-message').remove();
                        });
                    });
                    $('.fail-message').on('click', function(){
                        $(this).remove();
                    });
                }
            }
            function displaySuccess(m)
            {
                $('#feedbackSubmit').after('<p class="success-message">'+m+'</p>');
                $('.success-message').on('click', function(){
                    $(this).remove();
                });
            }
            function success(d)
            {
                $('#feedbackSubmit').removeAttr('disabled');
                $('.fail').removeClass('fail');
                $('p.fail-message').remove();
                $('p.success-message').remove();
                if (d.s) {
                    $('#feedbackForm').trigger('reset');
                    displaySuccess(d.m);
                } else {
                    displayErrors(d.i, d.m);
                }
            }
            function ajaxSubmit()
            {
                $(this).ajaxSubmit({
                    dataType: 'json',
                    beforeSend: function(){
                        $('#feedbackSubmit').attr('disabled', true);
                    },
                    success: success
                });
                return false;
            }
            return {
                ajaxSubmit: ajaxSubmit
            }
        }
        var F = new Feedback();
        $(document).ready(function(){
            var locationTab = location.hash;
            if(locationTab !== "undefined") {
                var tab_id = locationTab.substring(locationTab.indexOf("#") + 1);
                if(tab_id) {
                    $("#tab"+tab_id).trigger('click');
                }
            }

            if ($('#feedbackForm').length) {
                $(document).on('submit', '#feedbackForm', F.ajaxSubmit);
                //var pattern = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
                //var mail = $('#email');
                //mail.on('keyup', function(){
                //    if(mail.val() != ''){
                //        if(mail.val().search(pattern) != 0){
                //            mail.addClass('fail');
                //            mail.parents('label').addClass('fail');
                //        }   else {
                //            mail.removeClass('fail');
                //            mail.parents('label').removeClass('fail');
                //        }
                //    }
                //});
                $('#feedbackSubmit').on('click', function () {
                    setTimeout(function () {
                        var inputEmail = $('#email'),
                            inputName = $('#name'),
                            inputmessage = $('#message');
                        if($(inputEmail).val() == ''){$(inputEmail).parents('label').removeClass('active')};
                        if($(inputName).val() == ''){$(inputName).parents('label').removeClass('active')};
                        if($(inputmessage).val() == ''){$(inputmessage).parents('label').removeClass('active')};
                    }, 200);
                })
            }
        });
    }
);


require(['app'], function(app) {

    $(document).load(function() {
        if($(window).width() < 769){
            if($('.footer__social__networks').length && $('.footer__copyright__left').length){

                $('.footer__social__networks').after($('.footer__copyright__left'));
            }
        }

        app.hidePreloader();

        if($("body.white-page").length) {
            $(".header__logo").find('img').attr('src','themes/default/assets/img/logoBlack.png');
        }

        $(".no-reload").on('click',function(e){
            e.preventDefault();
        })
    });
})




/**
 * Created by Serhiy on 19.04.2018.
 */
