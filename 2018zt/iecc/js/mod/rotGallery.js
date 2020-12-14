// let rotBigInitRot_swiperEl = false;
const addGlleryThumbs = (targetName) => {
    const $target = $(targetName + ' .gallery-top');
    const $imgs = $target.find('.pic');
    let temp = '';
    $imgs.each((i, e) => {
        temp += `
        <div class="swiper-slide item">
            <div class="pic">`;
        const $e = $(e);
        // console.log(i, $e);
        const $img = $e.find('img');
        const src = $img.attr('src');
        if (src) {
            temp += `<img src="${src}">`;
        }
        temp += `
            </div>
        </div>`;
    });

    $target.after(`
        <div class="swiper-container gallery-thumbs">
            <div class="swiper-wrapper">
                ${temp}
            </div>
        </div>
    `);
};

const initGllery = (targetName) => {

    if (isPc) {
        addGlleryThumbs(targetName);
    }

    var galleryThumbs = new Swiper(targetName + ' .gallery-thumbs', {
        direction: 'vertical',
        spaceBetween: 10,
        slidesPerView: 3,
        // loop: true,
        // freeMode: true,
        loopedSlides: 3, //looped slides should be the same
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
    });

    var galleryTop = new Swiper(targetName + ' .gallery-top', {
        direction: isPc ? 'vertical' : 'horizontal',
        // autoplay: true, //isPc ? true : false
        spaceBetween: isPc ? 10 : 0,
        loop: true,
        loopedSlides: isPc ? 3 : 0, //looped slides should be the same
        navigation: {
            nextEl: targetName + ' .swiper-button-next',
            prevEl: targetName + ' .swiper-button-prev',
        },
        thumbs: {
            swiper: isPc ? galleryThumbs : null,
        },
    });
};



const rotGallery = ({ cid, cnt, pgnum, targetName, hideName }) => {
    // console.log('----///------> rotBig() ', cid);

    let dom = '';
    let index = 0;

    $.ajax({
        url: AJAX_url,
        data: {
            // nid: isDev ? 11203173 : cid, // 11203173
            nid: cid,
            pgnum: pgnum,
            cnt: cnt,
            tp: 1,
            orderby: 1,
            // type: 'GET',
        },
        dataType: 'JSONP',
        success: (data) => {
            // console.log(data);
            if (data.status == '-1') {
                const msg = msgFn({ cid, pgnum, cnt });
                $(targetName + ' .isNoContent').html(msg);
            } else {
                if (data.data.list.length > 0) {
                    data.data.list.map((e, i) => {
                        index++;
                        const aBegin = tp.a.start(e, index);
                        const aEnd = tp.a.end(e, index);
                        // ${tp.picNoImgNoPicDom(e, index)}

                        dom += `
                            <div class="swiper-slide item">
                                <li data-index="${index}" data-docid="${e.DocID}"${e.PicLinks ? '' : 'class="noPic"'}>
                                ${tp.pic(e, index)}
                                <div class="title">
                                        <div class="text">
                                            ${tp.title(e, index)}
                                        </div>
                                    </div>
                                </li>
                            </div>
                        `;
                    });
                }
            }

            if (targetName && dom !== '') {
                $(targetName + ' .swiper-wrapper')
                    .html(`
                    <!-- cid: ${cid}, cnt: ${cnt}, pgnum: ${pgnum} START -->
                    ${dom}
                    <!-- cid: ${cid}, cnt: ${cnt}, pgnum: ${pgnum} END -->
                `);


                setTimeout(() => {
                    initGllery(targetName);
                }, 600);

            } else if (hideName) {
                $(hideName).hide();
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr, ajaxOptions, thrownError);
            if (xhr.status == 404) {
                $(targetName + ' .isNoContent').html(thrownError);
            }
        },
    });
};