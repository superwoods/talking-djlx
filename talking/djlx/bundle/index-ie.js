const targetName = '#rotBox61';
new Swiper(targetName + ' .swiper-container', {
    loop: true,
    speed: 1500,
    autoplay: isDev ? false : {
        delay: 3000
    },
    // freeMode: true,
    watchOverflow: true,
    // slidesPerView: 3,
    // slidesPerGroup: 3,
    // slidesPerColumn: 2,
    // spaceBetween: 20,
    pagination: {
        el: targetName + ' .swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: targetName + ' .swiper-button-next',
        prevEl: targetName + ' .swiper-button-prev',
    },
    effect: 'coverflow',
    centeredSlides: true,
    coverflowEffect: {
        rotate: 30,
        stretch: 40,
        depth: 80,
        modifier: 3,
        slideShadows: false
    },
    preventClicks: false,
    // slidesPerView: 3,
    // centeredSlides: true,
});