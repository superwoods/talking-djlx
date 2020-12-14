const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
};

const setUrlDom = ({ targetName, url }) => {

    // if (isDev) {
    //     url = 'http://www.xiongan.gov.cn/2020-07/03/c_1210687490.htm';
    // }

    console.log('setUrlDom:', url);

    // console.log({ targetName, url });

    const fileName = url.split('/').slice(-1);
    const urlBase = url.replace(fileName, '');

    // console.log(urlBase);

    // const isXa = /xiongan\.gov\.cn/ig.test(url);

    // console.log('setUrlDom1:', targetName, url);
    // console.log('setUrlDom2:', fileName);
    // console.log('setUrlDom3:', urlBase);

    // const _url = url.

    // if (isXa) {
    $.ajax({  // 读取单独的页面
        url: url,
        type: 'get',
        success: function (e) {
            // console.log(e);

            e = e.replace(/(<p align="center">)?<img([\s\S]+?)src=['"]([^'"]+)['"]([\s\S]+?)>(<\/p>)?/gi, function (...opt) {
                let str;
                if (opt[3] && !/http/.test(opt[3])) {
                    str = `<img src="${urlBase}${opt[3]}" width="100%" height="auto">`;
                    // class="lazy lazy-fade-in" 
                    // if (getRandomInt(2) == 1) {
                    //     str = `<p>${str}</p>`;
                    // }
                } else {
                    str = `<img src="${opt[3]}">`;
                }
                return str;
            });

            const $e = $(e);

            // console.log(e);

            let $dom = $(".main-content-box", $e);

            // 检测是否存在 $dom，如果不存在使用另一个目标
            const isDom = $dom.length;
            // console.log('-------> setUrlDom isDom:', isDom);
            if (isDom == false) {
                $dom = $('.main', $e); // 另一个目标
                // 过滤页面正文内容
                $dom.find('h1').remove();
                $dom.find('.m-info.domMobile').remove();
                $dom.find('.author').remove();
                $dom.find('.keyword').remove();
            }
            let domHtml = $dom.html() || '<p>暂无正文</p>';

            // console.log(domHtml);

            const $h1 = $('.main h1', $e);
            const $mInfo = $('.main > .m-info', $e);
            const videoUrl = $.trim($('.video-url', $e).text());
            const isMp3 = /\?mp3/.test(videoUrl);
            const isVideo = videoUrl && isMp3 == false;

            let videoDom;

            if (isVideo) {
                videoDom = `
                    <div class="spaContentVideoBox">
                        <video src="${videoUrl}" controls width="100%">
                            <p>Your browser doesn't support HTML5 video. Here is a <a href="${videoUrl}">link to the video</a> instead.</p>
                        </video>
                    </div>
                `;
            }

            $(`${targetName}`)
                // .show()
                // .html(`
                //     <div class="isContent">
                //         <p class="title">
                //             ${$h1.html()}
                //         </p>
                //         <p class="info">
                //             ${$mInfo.html()}
                //         </p>
                //         <div class="content">
                //             ${videoDom ? videoDom : ''}
                //             <div class="setUrlDom-domHtml">
                //                 ${domHtml}
                //             </div>
                //         </div>
                //     </div>`)
                .html(`
                    <div class="isContent">
                        <div class="content">
                            <div class="setUrlDom-domHtml">
                                ${domHtml}
                            </div>
                        </div>
                    </div>`);

            // 重新设置内部 a @St. 2020-04-17 12:03 v0.1.2
            $(`${targetName}`)
                .find('.setUrlDom-domHtml a')
                .each((i, e) => {
                    console.log(e);
                    const $e = $(e);

                    $e.css({
                        width: 'auto',
                    });

                    $e.attr('title', $.trim($e.text()));
                    $e.addClass('link external');

                    let url = $e.attr('href');
                    // console.log(url);
                    url = url.replace(/\.\.\/\.\.\//g, 'http://www.xiongan.gov.cn/');

                });


            if (isVideo) {
                $('.pageVideo').hide();
            }

            /** 图片加 a
            const $targetName = $(`${targetName}`);
            const $imgs = $targetName.find('img');

            // console.log($imgs);
            // class="lazy lazy-fade-in" data-

            $imgs.each((i, e) => {
                const $img = $(e);
                let imgDom = `
                    <a class="link external" href="${$img.attr('src')}">
                        <img src="${$img.attr('src')}" width="100%" height="auto">
                    </a>
                `;

                if (getRandomInt(2) == 1) {
                    $img.parents('p').replaceWith(imgDom);
                } else {
                    $img.replaceWith(imgDom);
                }
            });
            */

            /* 因为不是 spa 不能使用里的地址替换
            const $div_currpage = $(`${targetName}`).find('#div_currpage');
            // const page = $div_currpage.html().replace(/http:\/\/www\.xiongan\.gov\.cn\//ig, '/c/');
            // $div_currpage.html(page).find('a').addClass('link');
            $div_currpage.find('a')
                .each((i, e) => {
                    // console.log(i, e);
                    const $e = $(e);
                    let url = $e.attr('href');
                    // console.log(url);
                    url = url.replace(/\//g, '&');
                    // console.log(url);
                    url = url.replace('http:&&www.xiongan.gov.cn&', '/c/');
                    // console.log(url);
                    $e.attr('href', url).addClass('link');
                });
            */

            // setImgLazy(2000);
            // $(`.${targetName}`).find('a').addClass('link external');
        }
    });
    // } else { // 如果不是 xiongan.gov.cn 的链接会现实图片和 a 链接
    //     $(`.${targetName}`)
    //         .addClass('isNotXaUrl')
    //         .html(`
    //             <a href="${url}" class="link external" target="_blank">
    //                 isNotXaUrl
    //             </a>
    //         `);
    // }
};