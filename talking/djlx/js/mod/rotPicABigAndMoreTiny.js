const rotPicABigAndMoreTiny_initRot = (targetName) => {
    let rotPicABigAndMoreTiny_initRot_swiper = null;

    rotPicABigAndMoreTiny_initRot_swiper = new Swiper(targetName + ' .swiper-container', {
        watchOverflow: true,
        // autoplay: false,
        spaceBetween: isPc ? 0 : 9,
        pagination: {
            el: targetName + ' .rotPicABigAndMoreTiny-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: targetName + ' .rotPicABigAndMoreTiny-next',
            prevEl: targetName + ' .rotPicABigAndMoreTiny-prev',
        },
    });
};

const rotPicABigAndMoreTiny = ({ cid, targetName, hideName }) => {
    // const isWidthTiny = $$('html').hasClass('is-widthTiny');
    // console.log('isWidthTiny:', isWidthTiny);

    const pgnum = 1;
    const cnt = 4 * 3; // 必须是4的倍数，否则会导致闭合异常

    const start = '<!-- ';
    const end = ' -->\n';



    const itemBoxRightItem = (e, index) => {
        return `<div class="itemBoxRight-item" data-index="${index}" data-docid="${e.DocID}">
                    ${tp.pic(e, index)}
                    <div class="title">
                        <div class="text">
                            ${tp.title(e, index)}
                        </div>
                        ${tp.a.start(e, index)}
                            <div class="icon-jump"></div>
                        ${tp.a.end(e, index)}
                    </div>
                </div>`;
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
            // console.log('loadDatarotPicABigAndMoreTiny: ', data.data.list);
            let dom1 = '';
            let index = 0;
            let slide = 0;

            if (data.status == '-1') {
                const msg = msgFn({ cid, pgnum, cnt });
                $(targetName + ' .isNoContent').html(msg);
            } else {
                if (data.data.list.length > 0) {
                    // console.log('loadDatarotPicABigAndMoreTiny: ', data.data.list.length);
                    data.data.list.map((e, i) => {
                        const slideNum = index / 4;
                        const isSlideStart = /\./.test(slideNum) == false;
                        const isSlideEnd = /\.75/.test(slideNum);

                        if (isPc) {
                            if (isSlideStart) {
                                dom1 += start + `---- ${slide} START ----` + end;
                                dom1 += `<div class="swiper-slide itemBox" data-slide="${slide}" data-index="${index}" data-docid="${e.DocID}">`;
                                dom1 += start + `== child START ==` + end;
                                dom1 += `   <div class="itemBoxLeft">`;
                                // dom1 += start + `${index}` + end;
                                dom1 += `       ${tp.pic(e, index)}
                                                <div class="title">
                                                    <div class="text">
                                                        ${tp.title(e, index)}
                                                    </div>
                                                </div>`;
                                dom1 += start + `== child END ==` + end;
                                dom1 += `    </div>
                                             <div class="itemBoxRight">`;
                                slide++;
                            } else if (isSlideEnd) {
                                // dom1 += start + `${index}` + end;
                                dom1 += itemBoxRightItem(e, index);
                                dom1 += `    </div>
                                        </div>`;
                                dom1 += start + `---- ${slide} END ----` + end;
                            } else {
                                dom1 += start + `--` + end;
                                // dom1 += start + `${index}` + end;
                                dom1 += itemBoxRightItem(e, index);
                                dom1 += start + `\\--` + end;
                            }
                        } else {
                            dom1 += `<div class="swiper-slide mobile-itemBox"
                                        data-slide="${slide}" 
                                        data-index="${index}" 
                                        data-docid="${e.DocID}">
                                        ${tp.pic(e, index)}
                                        <div class="title">
                                            <div class="text">
                                                ${tp.title(e, index)}
                                            </div>
                                        </div>
                                    </div>`;
                        }

                        index++;
                    });
                }
            }

            if (dom1) {
                // console.log(dom1);
                $(targetName + ' .swiper-wrapper').html(dom1);
                rotPicABigAndMoreTiny_initRot(targetName);
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
