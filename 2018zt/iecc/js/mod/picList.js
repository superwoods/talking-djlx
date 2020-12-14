const picList = ({ cid, cnt, pgnum, targetName, hideName, hasAbs }) => {
    // console.log('----------> picList:', cid);

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
                $(targetName + ' .isNoContent').html(msgFn({ cid, pgnum, cnt }));
            } else {
                if (data.data.list.length > 0) {
                    data.data.list.map((e, i) => {
                        index++;
                        const aBegin = tp.a.start(e, index);
                        const aEnd = tp.a.end(e, index);
                        dom += `
                            <li data-index="${index}" data-docid="${e.DocID}"${e.PicLinks ? '' : 'class="noPic"'}>
                                ${tp.pic(e, index)}
                                <div class="text">
                                    ${aBegin}
                                        <div class="title">
                                            ${e.Title ? `${e.Title}` : '暂无标题'}
                                        </div>
                                    ${aEnd}
                                    ${hasAbs ? tp.abs(e) : ''}
                                </div>
                            </li>`;
                    });
                }
            }

            if (dom !== '') {
                // console.log('---> msg: 11111');
                $(targetName).find('.picList').html(`
                    <!-- cid: ${cid}, cnt: ${cnt}, pgnum: ${pgnum} START -->
                    ${dom}
                    <!-- cid: ${cid}, cnt: ${cnt}, pgnum: ${pgnum} END -->
                `);
            }
            else if (hideName) {
                $(hideName).hide();
            }
        },
        // error: function (xhr, ajaxOptions, thrownError) {
        //     console.log(xhr, ajaxOptions, thrownError);
        //     if (xhr.status == 404) {
        //         $(targetName + ' .isNoContent').html(thrownError);
        //     }
        // },
    });
};