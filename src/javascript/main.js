$(document).ready(function() {
    $(".owl-works").owlCarousel({
        items: 1,
        nav: true,
        loop: true,
        navText: ['<img src="img/arrow-left.png" alt="left">', '<img src="img/arrow-right.png" alt="right">'],
    });

    $(".owl-masters").owlCarousel({
        items: 1,
        nav: true,
        loop: true,
        navText: ['<img src="img/arrow-left.png" alt="left">', '<img src="img/arrow-right.png" alt="right">'],
    });

    $('.btn-top').click(function() {
        $('body, html').animate({
            scrollTop: 0
        }, 1000)
    });

    $('.wr-service').click(function() {
        $('.popup-send').fadeIn();
    });

    $('.popup-send-btn-close').click(function() {
        $('.popup-send').css('display', 'none');
    });
});

(function(m,e,t,r,i,k,a){m[i]= m[i]||function(){(m[i].a=m[i]. a||[]).push(arguments)}; 
m[i].l=1*new Date();k=e.createElement(t),a= e.getElementsByTagName(t)[0],k .async=1,k.src=r,a.parentNode. insertBefore(k,a)}) 
(window, document, "script", "mc.yandex.ru/metrika/tag...." , "ym"); 

ym(53275729, "init", { 
    clickmap:true, 
    trackLinks:true, 
    accurateTrackBounce:true, 
    webvisor:true 
});
