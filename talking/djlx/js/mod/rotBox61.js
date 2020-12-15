const rotBox61InitRot = (targetName) => {
    let mySwiper = false;
    if (mySwiper == false) {

        console.log('rotBox61InitRot targetName:', targetName);

        mySwiper = new Swiper(targetName + ' .swiper-container', {
            loop: true,
            speed: 3000,
            autoplay: {
                delay: 4000
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
            // slidesPerView: 3,
            // centeredSlides: true,
        });
    }
};

const rotBox61 = ({ cid, cnt, pgnum, targetName }) => {
    console.log('----///------> rotBox61() ', cid);

    let dom = '';
    // console.log('-------> cnt: ', cnt);
    // console.log('addMore:', pgnum);
    // console.log('ajax:', `http://da.wa.news.cn/nodeart/page?nid=${cid}&pgnum=${pgnum}&cnt=${cnt}&tp=1&orderby=1`);
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

                        console.log(e.Attr);

                        if (e.Attr == 61) {
                            if (index < 3) {
                                dom += `<div class="swiper-slide item-rightPicTitleAbs">
                                    <div class="item-rightPicTitleAbs-in">
                                        ${tp.pic(e)}
                                        <div class="textBox">
                                            <div class="title">
                                                <div class="text-in">
                                                    ${tp.title(e)}
                                                </div>
                                            </div>
                                            <div class="abs">
                                                <div class="text-in">
                                                    ${tp.abs(e)}
                                                </div>
                                            </div>
                                            <a class="link external item-rightPicTitleAbs-more" herf="${e.LinkUrl}">详情</a>
                                        </div>
                                    </div>
                                </div>`;

                                index++;
                            }
                        }
                    });
                }
            }

            // $('.isLoadingTxt')
            //     .html('')
            //     .removeClass('isLoadingTxt');

            if (targetName) {
                $(targetName + ' .swiper-wrapper')
                    .html(`
                    <!-- cid: ${cid}, cnt: ${cnt}, pgnum: ${pgnum} START -->
                    ${dom}
                    <!-- cid: ${cid}, cnt: ${cnt}, pgnum: ${pgnum} END -->
                `);
                rotBox61InitRot(targetName);
            }
            // else {
            //     $(`#addDataListPos${cid}`)
            //         .append(`
            //         <!-- cid: ${cid}, cnt: ${cnt}, pgnum: ${pgnum} START -->
            //         ${dom}
            //         <!-- cid: ${cid}, cnt: ${cnt}, pgnum: ${pgnum} END -->
            //     `);
            // }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr, ajaxOptions, thrownError);
            if (xhr.status == 404) {
                $(targetName + ' .isNoContent').html(thrownError);
            }
        },
    });
};