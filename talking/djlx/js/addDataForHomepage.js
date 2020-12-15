const addDataForHomepage = (cid) => {
    const rotBox61InitRot = (targetName) => {
        let mySwiper = false;
        if (mySwiper == false) {

            console.log('rotBox61InitRot targetName:', targetName);

            if (isPc) {
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
            } else {
                mySwiper = new Swiper(targetName + ' .swiper-container', {
                    loop: true,
                    // speed: 3000,
                    // autoplay: {
                    //     delay: 4000
                    // },
                    // freeMode: true,
                    watchOverflow: true,
                    // slidesPerView: 3,
                    // slidesPerGroup: 3,
                    // slidesPerColumn: 2,
                    spaceBetween: 20,
                    pagination: {
                        el: targetName + ' .swiper-pagination',
                        clickable: true,
                    },
                    // navigation: {
                    //     nextEl: targetName + ' .swiper-button-next',
                    //     prevEl: targetName + ' .swiper-button-prev',
                    // },
                    // effect: 'coverflow',
                    // centeredSlides: true,
                    // coverflowEffect: {
                    //     rotate: 30,
                    //     stretch: 40,
                    //     depth: 80,
                    //     modifier: 3,
                    //     slideShadows: false
                    // },
                    // slidesPerView: 3,
                    // centeredSlides: true,
                });
            }
        }
    };

    const loadDataListItem = ({ cid, cnt, pgnum, targetName }) => {
        // console.log('----------> loadDataListItem() ', cid);
        // console.log(targetName);
        // console.log('-------> cnt: ', cnt);
        // console.log('addMore:', pgnum);
        console.log('ajax:', `http://da.wa.news.cn/nodeart/page?nid=${cid}&pgnum=${pgnum}&cnt=${cnt}&tp=1&orderby=1`);
        let index = 0;
        let page = 0;
        let dom = { 0: [] };
        let index61 = 0;
        let dom61 = '';

        $.ajax({
            url: AJAX_url,
            data: {
                // nid: isDev ? 11207721 : cid, // 11203173
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
                    $('#addData').html('暂无更多').addClass('disable');
                    // $('html').addClass('isCtlNoContentHeight');
                    const msg = msgFn({ cid, pgnum, cnt });
                    if (targetName) {
                        $(targetName + ' .isNoContent').html(msg);
                    } else {
                        $('.isNoContent' + cid).html(msg);
                    }
                } else {
                    if (data.data.list.length > 0) {
                        // $('html').removeClass('isCtlNoContentHeight');

                        data.data.list.map((e, i) => {
                            if (e.Attr == 61) {
                                if (index61 < 3) {
                                    dom61 += `<div class="swiper-slide item-rightPicTitleAbs">
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
                                    index61++;
                                }
                            } else {
                                dom[page].push(e);
                                if (index < 8) {
                                    index++;
                                } else {
                                    console.log(page, index);
                                    page++;
                                    if (dom.hasOwnProperty(page) == false) {
                                        dom[page] = [];
                                    }
                                    index = 0;
                                }
                            }
                        });


                        let targetName61 = '#rotBox61';
                        $(targetName61 + ' .swiper-wrapper')
                            .html(`
                                <!-- cid: ${cid}, cnt: ${cnt}, pgnum: ${pgnum} START -->
                                ${dom61}
                                <!-- cid: ${cid}, cnt: ${cnt}, pgnum: ${pgnum} END -->
                            `);
                        rotBox61InitRot(targetName61);

                        console.log(dom);

                        // console.log('p1:', dom[0]);
                        let domPage = 0;

                        render(targetName, {
                            dom: dom[domPage],
                            cid,
                            cnt,
                            pgnum
                        });

                        $('#addData').on('click', () => {
                            domPage++;
                            if (dom.hasOwnProperty(domPage)) {
                                render(false, {
                                    dom: dom[domPage],
                                    cid,
                                    cnt,
                                    pgnum
                                });
                            } else {
                                $('.isNoContent.isNoContent').html('暂无更多');
                                $('#addData').addClass('disable').off('click');
                            }
                        });
                    }
                }
            },
            // error: function (xhr, ajaxOptions, thrownError) {
            //     console.log(xhr, ajaxOptions, thrownError);
            //     if (xhr.status == 404) {
            //         $('.isLoading').html(thrownError);
            //     }
            // },
        });
    };

    const render = (targetName, { dom, cid, cnt, pgnum }) => {
        $('.isLoading')
            .html('')
            .removeClass('isLoading');

        let html = '';

        dom.map((e, i) => {
            const aBegin = tp.a.start(e);
            const aEnd = tp.a.end(e);
            html += `<li data-index="${i}" data-docid="${e.DocID}"${e.PicLinks ? '' : 'class="noPic"'}>
                ${tp.pic(e)}
                <div class="text">
                    ${aBegin}
                        <div class="title">
                            ${e.Title ? `${e.Title}` : '暂无标题'}
                        </div>
                        <div class="title2">
                            <div class="date">${tp.date(e)}</div>
                            <div class="more">查看详情</div>
                        </div>
                    ${aEnd}
                </div>
            </li>`;
        });

        if (targetName) {
            $(targetName)
                .html(`
                    <!-- cid: ${cid}, cnt: ${cnt}, pgnum: ${pgnum} START -->
                    ${html}
                    <!-- cid: ${cid}, cnt: ${cnt}, pgnum: ${pgnum} END -->
                `);
        } else {
            $(`#addDataListPos`)
                .append(`
                    <!-- cid: ${cid}, cnt: ${cnt}, pgnum: ${pgnum} START -->
                    ${html}
                    <!-- cid: ${cid}, cnt: ${cnt}, pgnum: ${pgnum} END -->
                `);
        }
    };

    loadDataListItem({
        cid: cid[0].cid,
        cnt: 2000,
        pgnum: 1,
        targetName: '#addDataListPos',
    });

    // // 设置数据写入 id
    // const currentCid = cid[0].cid;
    // const $id = $$('#addDataListPos');
    // $id.attr('id', 'addDataListPos' + currentCid);
    // $id.attr('data-cid', currentCid);
    // // 暂无内容位置 (只能替换 class 名，新增会导致多个class)
    // $$('.isNoContent').attr('class', 'isNoContent isNoContent' + currentCid);
    // // 查看更多按钮
    // $$('#addData').attr('id', 'addData' + currentCid);
    // pageFn(cid[0].cid, { cnt: 36 });

};
