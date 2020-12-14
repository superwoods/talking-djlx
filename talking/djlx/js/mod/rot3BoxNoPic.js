const rot3BoxNoPic = ({ cid, cnt, targetName }) => {
    let rotInitFnSwiper = false;
    const pgnum = 1;
    // const cnt = 21;
    // const targetName = '#rot3BoxNoPic';

    const rotInitFn = () => {
        if (rotInitFnSwiper == false) {
            rotInitFnSwiper = new Swiper(targetName + ' .swiper-container', {
                watchOverflow: true,
                autoplay: false,
                slidesPerView: isPc ? 3 : 1,
                spaceBetween: 9,
                pagination: {
                    el: targetName + ' .swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: targetName + ' .swiper-button-next',
                    prevEl: targetName + ' .swiper-button-prev',
                },
            });
        }
    };

    $.ajax({
        url: AJAX_url,
        data: {
            // nid: isDev ? 1120310 : cid, // 11203173
            nid: cid,
            pgnum: pgnum,
            cnt: cnt,
            tp: 1,
            orderby: 1,
        },
        dataType: 'JSONP',
        success: (data) => {
            console.log('----///----> rot3BoxNoPic:', cnt, data);

            let dom1 = '';

            if (data.status == '-1') {
                $(targetName + ' .isNoContent').html(msgFn({ cid, pgnum, cnt }));
            } else {
                if (data.data.list.length > 0) {
                    data.data.list.map((e, i) => {
                        dom1 += `
                            <div class="swiper-slide itemBox" data-docid="${e.DocID}">
                                ${tp.pic(e, i)}
                                <div class="title">
                                    <div class="text">
                                        ${tp.title(e, i)}
                                    </div>
                                    ${tp.abs(e)}
                                </div>
                            </div>
                        `;
                    });
                }
            }

            if (dom1) {
                $(targetName + ' [data-add="1"] .swiper-wrapper').html(dom1);
                rotInitFn();
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