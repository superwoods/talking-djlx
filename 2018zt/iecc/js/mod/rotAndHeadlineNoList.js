// @St. 2020-03-31

/*
targetName > .swiper-wrapper
targetName > .right
*/

const rotAndHeadlineNoList_initRot = (targetName) => {
    new Swiper(targetName + ' .swiper-container', {
        loop: true,
        watchOverflow: true,
        // autoplay: isDev ? false : true,//可选选项，自动滑动
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

const rotAndHeadlineNoList = ({
    cid,
    cnt,
    pgnum,
    targetName,
    // hideName,
    // hasCol,
    rightSideItemMax
}) => {

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
            // console.log(data);
            let dom1 = '';
            let dom2 = '';
            let dom3 = '';
            let dom3Index = 0;
            // let dom4 = '';
            // let dom4_index = 0;
            // let dom4_listMaxNum = 8;

            if (data.status == '-1') {
                const msg = msgFn({ cid, pgnum, cnt });
                $(targetName + ' .isNoContent').html(msg);
            } else {
                if (data.data.list.length > 0) {
                    data.data.list.map((e, i) => {
                        // console.log(e.PubTime);

                        // if (e.Attr == 62) {
                        //     dom1 = `
                        //         <!-- topBigTitle START -->
                        //         ${e.LinkUrl ? `<h1><a href="${e.LinkUrl}" target="_blank" class="link external">` : '<!-- 暂无主标题链接 -->'}
                        //         ${e.Title ? e.Title : '<!-- 暂无主标题 -->'}
                        //         ${e.LinkUrl ? '</a></h1 >' : '<!-- 暂无主标题链接 -->'}
                        //         ${e.Abstract ? `<div class="absBox">${e.Abstract}</div>` : '<!-- 暂无摘要 -->'}
                        //         <!-- topBigTitle END -->`;
                        // }

                        if (e.Attr == 61) {
                            dom2 += `
                                <div class="swiper-slide item" data-docid="${e.DocID}">
                                    ${tp.pic(e, i)}
                                    <div class="title">
                                        <div class="text">
                                            ${tp.title(e, i)}
                                        </div>
                                    </div>
                                </div>
                            `;
                        }

                        if (e.Attr == 63 && dom3Index < rightSideItemMax) {
                            dom3Index++;
                            dom3 += `
                                <h2 class="tiny-title" data-docid="${e.DocID}">
                                    ${tp.title(e, i)}
                                </h2>
                                ${tp.abs(e)}
                            `;
                            if (dom3Index <= rightSideItemMax - 1) {
                                dom3 += '<div class="line"></div>';
                            }
                        }

                    });
                }
            }

            // if (dom1) {
            //     $(targetName + ' .topBigTitle').html(dom1);
            // }

            if (dom2) {
                $(targetName + ' .swiper-wrapper').html(dom2);
                rotAndHeadlineNoList_initRot(targetName);
            }

            if (dom2 || dom3) {
                $('.col1 .right').html(`
                    ${dom3}
                `);
            } else {
                $('.col1 .area').hide();
                // $('.col1 .more').hide();
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log('error:', xhr, ajaxOptions, thrownError);
            if (xhr.status == 404) {
                $('.topBigTitle .isNoContent' + cid).html(thrownError);
                $('.col1 .isNoContent' + cid).html(thrownError);
            }
        },
    });
};