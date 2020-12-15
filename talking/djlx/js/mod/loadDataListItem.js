//- listAbsPic mods
const loadDataListItem = ({ cid, cnt, pgnum, targetName }) => {
    // console.log('----------> loadDataListItem() ', cid);
    // console.log(targetName);
    // console.log('-------> cnt: ', cnt);
    // console.log('addMore:', pgnum);
    // console.log('ajax:', `http://da.wa.news.cn/nodeart/page?nid=${cid}&pgnum=${pgnum}&cnt=${cnt}&tp=1&orderby=1`);
    let index = 0;
    let page = 0;
    let dom = { 0: [] };



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
                $('#addData' + cid).html('暂无更多').addClass('disable');
                $('html').addClass('isCtlNoContentHeight');
                const msg = msgFn({ cid, pgnum, cnt });
                if (targetName) {
                    $(targetName + ' .isNoContent').html(msg);
                } else {
                    $('.isNoContent' + cid).html(msg);
                }
            } else {
                if (data.data.list.length > 0) {
                    $('html').removeClass('isCtlNoContentHeight');

                    data.data.list.map((e, i) => {
                        if (e.Attr == 61) {


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


                    $(targetName + ' .swiper-wrapper')
                        .html(`
                            <!-- cid: ${cid}, cnt: ${cnt}, pgnum: ${pgnum} START -->
                            ${dom}
                            <!-- cid: ${cid}, cnt: ${cnt}, pgnum: ${pgnum} END -->
                        `);

                    rotBox61InitRot(targetName);



                    console.log(dom);
                    // console.log('index:', index);
                    if (dom[0].length == 9) {
                        console.log('p1:', dom[0]);
                        render(targetName, {
                            dom: dom[0],
                            cid,
                            cnt,
                            pgnum
                        });
                    }

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
    /**
     *  
        const aBegin = tp.a.start(e);
        const aEnd = tp.a.end(e);
        <li data-index="${i}" data-docid="${e.DocID}"${e.PicLinks ? '' : 'class="noPic"'}>
            ${tp.pic(e)}
            <div class="text">
                ${aBegin}
                    <div class="title">
                        ${e.Title ? `${e.Title}` : '暂无标题'}
                    </div>
                    <!-- ${tp.abs(e)} -->
                ${aEnd}
            </div>
        </li>
    `;
     */

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
        $(`#addDataListPos${cid}`)
            .append(`
                <!-- cid: ${cid}, cnt: ${cnt}, pgnum: ${pgnum} START -->
                ${html}
                <!-- cid: ${cid}, cnt: ${cnt}, pgnum: ${pgnum} END -->
            `);
    }
};