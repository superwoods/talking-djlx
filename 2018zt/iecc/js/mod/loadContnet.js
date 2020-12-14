/*
this mod must has setUrlDom.js
*/

const loadContnet = (num, attr, page) => {
    loadContnetHandler({
        cid: cid[num].cid,
        cnt: 10,
        pgnum: 1,
        targetName: '[data-add="addDataPos"]',
        // attr: attr,
        // noAttr: false,
    });
};

const loadContnetHandler = ({ cid, cnt, pgnum, targetName, attr, noAttr }) => {
    const _attr = attr ? attr : 62;
    const _noAttr = noAttr ? noAttr : false;
    let isSeted = false;

    $.ajax({
        url: AJAX_url,
        data: {
            nid: cid,
            pgnum: pgnum,
            cnt: cnt,
            tp: 1,
            orderby: 1,
        },
        dataType: 'JSONP',
        success: (data) => {
            const msg = msgFn({ cid, pgnum, cnt });

            if (data.status == '-1') {
                if (targetName) {
                    $(targetName + ' .isNoContent').addClass('noAni').html(msg);
                }
            } else {
                if (data.data.list.length > 0) {

                    console.log(data.data.list);

                    let domHtml = '';

                    data.data.list.map((e, i) => {
                        if (_noAttr || e.Attr == _attr) {
                            // if (e.LinkUrl && targetName && isSeted == false) {
                            //     // console.log(e.Title);
                            //     setUrlDom({
                            //         targetName,
                            //         url: e.LinkUrl
                            //     });
                            //     isSeted = true;
                            // }
                            // if (i == 4) {
                            //     e.Title = '隐藏标题';
                            // }

                            domHtml += `
                                ${e.Title && e.Title !== '隐藏标题' ? `<p><strong>${e.Title}</strong></p>` : ''}
                                ${e.Abstract ? `<p>${e.Abstract}</p>` : ''}
                            `;

                            // domHtml += `${i == 3 ? '<br>' : ''}`;

                        } else {
                            $(targetName + ' .isNoContent').addClass('noAni').html(msg).append(`<div class="tips">缺少属性 ${_attr} 的稿件！</div>`);
                        }
                    });

                    // into html
                    $(targetName).html(`
                        <div class="isContent">
                            <div class="content">
                                <div class="setUrlDom-domHtml">
                                    ${domHtml}
                                </div>
                            </div>
                        </div>`);
                }
            }
        },
    });
};