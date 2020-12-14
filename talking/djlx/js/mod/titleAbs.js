const titleAbs = ({ cid, cnt, pgnum, targetName, hideName }) => {
    console.log('----------> picList:', cid);

    // console.log(!targetName);
    let dom = '';
    let index = 0;

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
                const msg = msgFn({ cid, pgnum, cnt });
                $(targetName + ' .isNoContent').html(msg);
            } else {
                if (data.data.list.length > 0) {
                    data.data.list.map((e, i) => {
                        index++;
                        const aBegin = tp.a.start(e, index);
                        const aEnd = tp.a.end(e, index);
                        dom += `
                            <div class="titleAbs-item" data-docid="${e.DocID}">
                                <div class="titleAbs-item_text">
                                    ${aBegin}
                                        <div class="titleAbs-item_title">
                                            ${e.Title ? `${e.Title}` : '暂无标题'}
                                        </div>
                                    ${aEnd}
                                </div>
                                <div class="titleAbs-item_abs">
                                    ${tp.abs(e)}
                                </div
                            </div>`;
                    });
                }
            }

            if (dom !== '') {
                // console.log('---> msg: 11111');
                $(targetName + ' .titleAbs-content').html(`
                    <!-- cid: ${cid}, cnt: ${cnt}, pgnum: ${pgnum} START -->
                    ${dom}
                    <!-- cid: ${cid}, cnt: ${cnt}, pgnum: ${pgnum} END -->
                `);
            }
            // else if (hideName) {
            //     $(hideName).hide();
            // }
        },
        // error: function (xhr, ajaxOptions, thrownError) {
        //     console.log(xhr, ajaxOptions, thrownError);
        //     if (xhr.status == 404) {
        //         $(targetName + ' .isNoContent').html(thrownError);
        //     }
        // },
    });
};