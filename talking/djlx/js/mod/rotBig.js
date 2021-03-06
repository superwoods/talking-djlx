let rotBigInitRot_swiperEl = false;
const rotBigInitRot = (targetName, cnt, rotBigInitRotCtl) => {
    rotBigInitRot_swiperEl = new Swiper(targetName + ' .swiper-container', {
        loop: rotBigInitRotCtl ? rotBigInitRotCtl.loop : false,
        // freeMode: true,
        watchOverflow: true,
        autoplay: false,
        slidesPerView: 1,
        slidesPerColumn: isPc ? 1 : cnt,
        spaceBetween: rotBigInitRotCtl ? rotBigInitRotCtl.spaceBetween : 10,
        pagination: {
            el: targetName + ' .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: targetName + ' .swiper-button-next',
            prevEl: targetName + ' .swiper-button-prev',
        },
    });
};


const rotBig = ({ cid, cnt, pgnum, targetName, hideName, rotBigInitRotCtl }) => {
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
                        dom += `
                            <div class="swiper-slide item">
                                <li data-index="${index}" data-docid="${e.DocID}"${e.PicLinks ? '' : 'class="noPic"'}>
                                    ${tp.picNoImgNoPicDom(e, index)}
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
                    // console.log('setTimeout:', targetName);
                    rotBigInitRot(targetName, cnt, rotBigInitRotCtl);
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