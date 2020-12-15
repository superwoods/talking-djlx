'use strict';

// console.log('--> index.js');
var $$ = Dom7;
var AJAX_url = 'http://da.wa.news.cn/nodeart/page';

var msgFn = function msgFn(_ref) {
    var cid = _ref.cid,
        pgnum = _ref.pgnum,
        cnt = _ref.cnt;

    return '\n        <a href="http://da.wa.news.cn/nodeart/page?nid=' + cid + '&pgnum=' + pgnum + '&cnt=' + cnt + '&tp=1&orderby=1"\n        class="link external" target="_blank">\u6682\u65E0\u5185\u5BB9</a>\n    ';
};
var MAIN_url = '/talking/djlx/';

// 如果地址有 index
if (/index/.test(window.location.href)) {
    window.location.href = MAIN_url;
}

var cid = [
// {
// 	name: '河北雄安新区国际交流合作中心',
// 	cid: 11224954,
// 	nid: 11225273,
// 	nav: true,
// 	isPage: true,
// 	isBlank: false
// },
{
    name: '精彩连线',
    cid: 11230092,
    nid: 11230411,
    nav: true,
    isPage: 1
}];

if (isDev) {
    cid[0].cid = 11208880;
    // 	// cid[1].cid = 11217530;
    // 	// cid[1].child[0].cid = 11208880;
    // 	// 	cid[2].cid = 11217531;
    // 	// 	cid[2].child[3].cid = 11207721;
    // 	// 	cid[3].cid = 11111888;
    // 	// 	// cid[4].cid = 11208880;
    // 	// 	// cid[5].cid = 11207723;
    // 	// 	// cid[6].cid = 11207721;
    // 	// 	// cid[0].cid = 11207721;
    // 	// 	// cid[1].cid = 11207722;
    // 	// 	// cid[2].cid = 11207723;
    // 	// 	// cid[3].cid = 11208880;
    // 	// 	// cid[4].cid = 11208881;
}

var cidMap = function () {
    var r = {
        byName: {},
        byCid: {}
    };

    cid.map(function (e) {
        r.byCid[e.cid] = e.name;
        r.byName[e.name] = {
            cid: e.cid,
            child: e.child
        };

        if (e.father) {
            r.byName[e.name].father = e.father;
        }
    });

    return r;
}();

console.log('--///--> cidMap is ready:\n', cidMap);
var txtSplitByDash = function txtSplitByDash(txt) {
    return (/-/.test(txt) ? txt.split('-').slice(-1) : txt
    );
};

var setNav = function setNav(cid) {
    // console.log('----> setNavFn !!!', e);
    var dom = '';
    var cidAdd = {};

    for (var prop in cid) {
        var col = cid[prop];

        // console.log('setNav:', cid[prop]);

        var className = 'navBtn-' + col.cid;
        var _url = '/page/' + col.cid;

        if (col.nav) {
            // console.log(className);

            if (col.isPage == true) {
                dom += '\n                    <span class="line line-' + col.cid + '"></span>\n                    <a class="link navBtn ' + className + '" href="' + _url + '" data-id="id-' + col.cid + '">\n                        ' + col.name + '\n                    </a>\n                ';
            } else {
                // if (col.isGoto) {
                //     dom += `
                //         <a class="link navBtn ${className} navBtn-jumpto" 
                //             href="${MAIN_url}" 
                //             onClick="jumpto_${col.isGoto.fnName}('${col.isGoto.target}')"
                //         >
                //             ${col.name}
                //         </a>
                //         <span class="line"></span>
                //     `;

                //     window[`jumpto_${col.isGoto.fnName}`] = (target) => {
                //         // console.log(target, $(target).offset().top);
                //         const top = $(target).offset().top - 100;
                //         console.log(top * 0.8);
                //         $('.page-content').animate({ scrollTop: top }, top * 0.8);
                //     };
                // }
                // 用于给首页导航中添加不显示链接的2级栏目，当跳转之后可以获取栏目名称
                dom += '\n                    <a class="link navBtn ' + className + ' hide" href="' + _url + '" data-id="id-' + col.cid + '">\n                        ' + col.name + '\n                    </a>\n                ';
            }
        } else {
            cidAdd[col.cid] = {
                name: '' + col.name
            };
        }

        // col
        var $col = $('[data-col="' + prop + '"]');
        $col.replaceWith('\n            <a class="colA link" href="' + _url + '">\n                <div class="' + $col.attr('class') + '">\n                    <div class="hide">' + col.name + '</div>\n                </div>\n            </a>\n        ');

        // more
        var $more = $('[data-more="' + prop + '"]');
        $more.replaceWith('\n            <div class="more">\n                <a class="colA link" href="' + _url + '"> ' + $more.html() + ' </a>\n            </div>\n        ');
    }

    // a 的 data-id 必须带着，用于触发 active
    if (isPc) {
        $('[data-js="setNav(cid)"]').html('\n            <a class="link navBtn-home active" href="' + MAIN_url + '" data-id="home">\u9996\u9875</a>\n            ' + dom + '            \n        ');
    } else {
        $('[data-js="setNav(cid)"]').html('\n            ' + $('.panel-xaLogoA').prop('outerHTML') + '\n            <a class="link navBtn-home active" href="' + MAIN_url + '" data-id="home">\u9996\u9875</a>\n            ' + dom + '            \n        ');
    }

    // 设置 jump 事件
    // console.log(1, $('#navBtn-gz').offset().top);
    // console.log(2, $('#navBtn-pw').offset().top);
    // console.log(3, $('#navBtn-kj').offset().top);

    // $('.navBtn-gz').on('click', (e) => {
    //     $('.page-content').animate({ scrollTop: 1500 }, '3000');
    // });

    // $('.navBtn-pw').on('click', (e) => {
    //     $('.page-content').animate({ scrollTop: 2000 }, '3000');
    // });

    // $('.navBtn-kj').on('click', (e) => {
    //     $('.page-content').animate({ scrollTop: 2900 }, '3000');
    // });

    // console.log(cidAdd);


    // $('.navBtn-jumpto').each((i, e) => {
    //     const $e = $(e);
    //     console.log($e.data());


    // });


    return cidAdd;
};

// setNav(cid);
var contentPageFn_bannerBgDom = false;
var contentPageFn_navDom = false;
var contentPageFn_footerDom = false;

// 配置内容页
var contentPageFn = function contentPageFn() {
    /**
     * 
        <div class="navbar">
            <div class="navbar-inner">
                <div class="left">
                    <a href="#" class="link back">
                        <i class="icon icon-back"></i>
                        <span>返回</span>
                    </a>
                </div>
                <div class="title">${name}</div>
            </div>
        </div>
     */

    // <!-- banner END -->
    // ${navBarDom('aa', '/')}
    // <!-- demo banner & nav END -->

    if (contentPageFn_bannerBgDom == false) {
        // contentPageFn_bannerBgDom = $('.banner-bg').html();
        contentPageFn_bannerBgDom = $('.banner').prop('outerHTML');
    }
    if (contentPageFn_navDom == false) {
        // contentPageFn_navDom = $('.nav').html();
        contentPageFn_navDom = $('#pcNav').prop('outerHTML');
    }
    if (contentPageFn_footerDom == false) {
        contentPageFn_footerDom = $('.footer').prop('outerHTML');
    }

    return '\n        <div class="page isPageBanner">\n            <div class="page-content hide-navbar-on-scroll">\n                \n                <div class="box banner-bg">\n                    ' + contentPageFn_bannerBgDom + '\n                    ' + contentPageFn_navDom + '\n                </div>\n\n                <div class="box">\n                    <div class="content">\n                        <!-- items START -->\n                        <div class="area listHasImg spListArea">\n                            <div class="spaColTitle"> </div>\n                            <div class="hasNavBox">\n                                <div class="hasNav">\n                                    <!-- hasNav -->\n                                </div>\n                                <div class="hasNavContentBox">\n                                    <div class="listBox">\n                                        <ul class="list isLoading" id="addDataListPos" data-cid="">\n                                            <div class="isLoadingTxt">\u6B63\u5728\u52AA\u529B\u52A0\u8F7D...</div>\n                                        </ul>\n                                    </div>\n                                    <div class="isNoContent isNoContent"></div>\n                                    <div class="listBoxMoreBtnBox">\n                                        <div class="listBoxMoreBtn" id="addData">\u67E5\u770B\u66F4\u591A</div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        <!-- items END -->\n                    </div>\n                </div>\n\n                <div class="nav mobile-nav-btn">\n                    <div class="panel-openBtnBox">\n                        <a class="panel-open btn-box button button-large button-fill color-white text-color-red" href="#" data-panel="right">\n                            <i class="f7-icons" data-panel="right">bars</i>\n                        </a>\n                    </div>\n                </div>\n\n                <!-- js footer START -->\n                ' + contentPageFn_footerDom + '\n                <!-- js footer END -->\n            </div>\n        </div>\n    ';
};

var aAddClassFn = function aAddClassFn() {
    var $as = $('a');
    // console.log($as.length);
    $as.each(function (i, e) {
        var $e = $(e);
        var isAdd = $e.attr('target') == '_blank';
        // console.log(isAdd);
        if (isAdd) {
            $e.addClass('link external');
        }
    });
};

var TXT_nourl = '<!-- 暂无标题链接 -->';
var TXT_notitle = '<!-- 暂无标题 -->';
var TXT_nopic = '<!-- 暂无图片 / -->';
var tp = {
    pic: function pic(e) {
        return '<div class="pic" data-docid="' + e.DocID + '">' + (e.PicLinks ? (e.LinkUrl ? '<a href="' + e.LinkUrl + '" class="link external" target="_blank" data-docid="' + e.DocID + '">' : TXT_nourl) + '<img class="lazy lazy-fade-in" src="' + e.PicLinks + '" alt="' + (e.Title ? '' + e.Title : TXT_notitle) + '">' + (e.LinkUrl ? '</a>' : '') : TXT_nopic) + '</div>';
    },
    picNoImgNoPicDom: function picNoImgNoPicDom(e) {
        return (e.PicLinks ? '\n            <div class="pic" data-docid="' + e.DocID + '">' + (e.LinkUrl ? '<a href="' + e.LinkUrl + '" class="link external" target="_blank" data-docid="' + e.DocID + '">' : TXT_nourl) + '<img class="lazy lazy-fade-in" src="' + e.PicLinks + '" alt="' + (e.Title ? '' + e.Title : TXT_notitle) + '">' + (e.LinkUrl ? '</a></div>' : '') : TXT_nopic) + '\n       ';
    },
    aImg: function aImg(e) {
        return (e.PicLinks ? (e.LinkUrl ? '<a href="' + e.LinkUrl + '" class="link external" target="_blank" data-docid="' + e.DocID + '">' : TXT_nourl) + '<img class="lazy lazy-fade-in" data-docid="' + e.DocID + '" src="' + e.PicLinks + '" alt="' + (e.Title ? '' + e.Title : TXT_notitle) + '">' + (e.LinkUrl ? '</a>' : '') : TXT_nopic) + '</div>';
    },
    title: function title(e) {
        return '' + (e.LinkUrl ? '<a href="' + e.LinkUrl + '" class="link external" target="_blank" data-docid="' + e.DocID + '">' : TXT_nourl) + (e.Title ? '' + e.Title : TXT_notitle) + (e.LinkUrl ? '</a>' : '');
    },

    a: {
        start: function start(e) {
            // tp.a.start(e)
            return '' + (e.LinkUrl ? '<a href="' + e.LinkUrl + '" class="link external" target="_blank" data-docid="' + e.DocID + '">' : TXT_nourl);
        },
        end: function end(e) {
            // tp.a.end(e)
            return '' + (e.LinkUrl ? '</a>' : '');
        }
    },
    abs: function abs(e) {
        return '' + (e.Abstract ? '<div class="abs" data-docid="' + e.DocID + '">' + e.Abstract + '</div>' : '<!-- \u6682\u65E0\u6458\u8981 data-docid="' + e.DocID + '" -->');
    },
    introTitle: function introTitle(e) {
        var hasHttp = /http/.test(e.IntroTitle);
        return '' + (e.IntroTitle && hasHttp == false ? '<div class="bigTitle" data-type="IntroTitle">' + e.IntroTitle + '</div>' : '<!-- \u6682\u65E0\u5F15\u9898 data-docid="' + e.DocID + '" -->');
    },
    date: function date(e) {
        var r = e.PubTime.split(' ')[0].split('-');
        return r[0] + '\u5E74' + r[1] + '\u6708' + r[2] + '\u65E5';
    }
};
var pageFn = function pageFn(cid, _ref2) {
    var cnt = _ref2.cnt,
        pgnum = _ref2.pgnum;

    // console.log('1:', cid.isOn);
    // if (cid.hasOwnProperty('isOn') == false) {
    console.log('         | pageFn.js:', cid);
    // const $btn = $('#addData');
    // const cid = $cid.attr('data-cid');
    // const cnt = 9; //$cid.find('li').length - 0;
    // console.log(cid, cnt);
    // let pgnum = 1;

    $('#addData' + cid).on('click', function () {
        console.log('             | #addData' + cid + ' has on clickFn()!!!');
        // console.log('----> addData:', e);
        if (cid) {
            pgnum++;
        }
        // console.log(cid, cnt, pgnum);
        loadDataListItem({
            cid: cid,
            cnt: cnt,
            pgnum: pgnum,
            isBlank: true
            // cbFn() {
            //     $('.spaColTitle').append(cid);
            // },
        });
    });

    // cid.isOn = true;
    // }
    // console.log('2:', cid.isOn);
};

/*
this mod must has setUrlDom.js
*/

var loadContnet = function loadContnet(num, attr, page) {
    loadContnetHandler({
        cid: cid[num].cid,
        cnt: 10,
        pgnum: 1,
        targetName: '[data-add="addDataPos"]'
        // attr: attr,
        // noAttr: false,
    });
};

var loadContnetHandler = function loadContnetHandler(_ref3) {
    var cid = _ref3.cid,
        cnt = _ref3.cnt,
        pgnum = _ref3.pgnum,
        targetName = _ref3.targetName,
        attr = _ref3.attr,
        noAttr = _ref3.noAttr;

    var _attr = attr ? attr : 62;
    var _noAttr = noAttr ? noAttr : false;
    var isSeted = false;

    $.ajax({
        url: AJAX_url,
        data: {
            nid: cid,
            pgnum: pgnum,
            cnt: cnt,
            tp: 1,
            orderby: 1
        },
        dataType: 'JSONP',
        success: function success(data) {
            var msg = msgFn({ cid: cid, pgnum: pgnum, cnt: cnt });

            if (data.status == '-1') {
                if (targetName) {
                    $(targetName + ' .isNoContent').addClass('noAni').html(msg);
                }
            } else {
                if (data.data.list.length > 0) {

                    console.log(data.data.list);

                    var domHtml = '';

                    data.data.list.map(function (e, i) {
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

                            domHtml += '\n                                ' + (e.Title && e.Title !== '隐藏标题' ? '<p><strong>' + e.Title + '</strong></p>' : '') + '\n                                ' + (e.Abstract ? '<p>' + e.Abstract + '</p>' : '') + '\n                            ';

                            // domHtml += `${i == 3 ? '<br>' : ''}`;
                        } else {
                            $(targetName + ' .isNoContent').addClass('noAni').html(msg).append('<div class="tips">\u7F3A\u5C11\u5C5E\u6027 ' + _attr + ' \u7684\u7A3F\u4EF6\uFF01</div>');
                        }
                    });

                    // into html
                    $(targetName).html('\n                        <div class="isContent">\n                            <div class="content">\n                                <div class="setUrlDom-domHtml">\n                                    ' + domHtml + '\n                                </div>\n                            </div>\n                        </div>');
                }
            }
        }
    });
};
var getRandomInt = function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
};

var setUrlDom = function setUrlDom(_ref4) {
    var targetName = _ref4.targetName,
        url = _ref4.url;


    // if (isDev) {
    //     url = 'http://www.xiongan.gov.cn/2020-07/03/c_1210687490.htm';
    // }

    console.log('setUrlDom:', url);

    // console.log({ targetName, url });

    var fileName = url.split('/').slice(-1);
    var urlBase = url.replace(fileName, '');

    // console.log(urlBase);

    // const isXa = /xiongan\.gov\.cn/ig.test(url);

    // console.log('setUrlDom1:', targetName, url);
    // console.log('setUrlDom2:', fileName);
    // console.log('setUrlDom3:', urlBase);

    // const _url = url.

    // if (isXa) {
    $.ajax({ // 读取单独的页面
        url: url,
        type: 'get',
        success: function success(e) {
            // console.log(e);

            e = e.replace(/(<p align="center">)?<img([\s\S]+?)src=['"]([^'"]+)['"]([\s\S]+?)>(<\/p>)?/gi, function () {
                var str = void 0;
                if ((arguments.length <= 3 ? undefined : arguments[3]) && !/http/.test(arguments.length <= 3 ? undefined : arguments[3])) {
                    str = '<img src="' + urlBase + (arguments.length <= 3 ? undefined : arguments[3]) + '" width="100%" height="auto">';
                    // class="lazy lazy-fade-in" 
                    // if (getRandomInt(2) == 1) {
                    //     str = `<p>${str}</p>`;
                    // }
                } else {
                    str = '<img src="' + (arguments.length <= 3 ? undefined : arguments[3]) + '">';
                }
                return str;
            });

            var $e = $(e);

            // console.log(e);

            var $dom = $(".main-content-box", $e);

            // 检测是否存在 $dom，如果不存在使用另一个目标
            var isDom = $dom.length;
            // console.log('-------> setUrlDom isDom:', isDom);
            if (isDom == false) {
                $dom = $('.main', $e); // 另一个目标
                // 过滤页面正文内容
                $dom.find('h1').remove();
                $dom.find('.m-info.domMobile').remove();
                $dom.find('.author').remove();
                $dom.find('.keyword').remove();
            }
            var domHtml = $dom.html() || '<p>暂无正文</p>';

            // console.log(domHtml);

            var $h1 = $('.main h1', $e);
            var $mInfo = $('.main > .m-info', $e);
            var videoUrl = $.trim($('.video-url', $e).text());
            var isMp3 = /\?mp3/.test(videoUrl);
            var isVideo = videoUrl && isMp3 == false;

            var videoDom = void 0;

            if (isVideo) {
                videoDom = '\n                    <div class="spaContentVideoBox">\n                        <video src="' + videoUrl + '" controls width="100%">\n                            <p>Your browser doesn\'t support HTML5 video. Here is a <a href="' + videoUrl + '">link to the video</a> instead.</p>\n                        </video>\n                    </div>\n                ';
            }

            $('' + targetName)
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
            .html('\n                    <div class="isContent">\n                        <div class="content">\n                            <div class="setUrlDom-domHtml">\n                                ' + domHtml + '\n                            </div>\n                        </div>\n                    </div>');

            // 重新设置内部 a @St. 2020-04-17 12:03 v0.1.2
            $('' + targetName).find('.setUrlDom-domHtml a').each(function (i, e) {
                console.log(e);
                var $e = $(e);

                $e.css({
                    width: 'auto'
                });

                $e.attr('title', $.trim($e.text()));
                $e.addClass('link external');

                var url = $e.attr('href');
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
// import './mod/loadDataListItem.js'


// import './mod/memorabilia.js'
// import './mod/rotBigRound.js'
// import './mod/rotBigWithAbs.js'
// import './mod/rotAndHeadline.js'
// import './rotPicTitleAbs.js'
// import './inc/rotPic3.js'
// import './inc/list.js'
// import './mod/rotPicTitleAbsAddSidebar.js'
// import './mod/rotAndHeadline.js'
// import './mod/rotAndHeadlineWithBigTitle.js'
// // @St. 2020-03-31

/*
targetName > .topBigTitle
targetName > .swiper-wrapper
targetName > .right
*/

var rotAndHeadlineWithBigTitleNoList_initRot = function rotAndHeadlineWithBigTitleNoList_initRot(targetName) {
    new Swiper(targetName + ' .swiper-container', {
        loop: true,
        watchOverflow: true,
        // autoplay: isDev ? false : true,//可选选项，自动滑动
        pagination: {
            el: targetName + ' .swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: targetName + ' .swiper-button-next',
            prevEl: targetName + ' .swiper-button-prev'
        }
    });
};

var rotAndHeadlineWithBigTitleNoList = function rotAndHeadlineWithBigTitleNoList(_ref5) {
    var cid = _ref5.cid,
        cnt = _ref5.cnt,
        pgnum = _ref5.pgnum,
        targetName = _ref5.targetName,
        rightSideItemMax = _ref5.rightSideItemMax;


    $.ajax({
        url: AJAX_url,
        data: {
            // nid: isDev ? 1120310 : cid, // 11203173
            nid: cid,
            pgnum: pgnum,
            cnt: cnt,
            tp: 1,
            orderby: 1
        },
        dataType: 'JSONP',
        success: function success(data) {
            // console.log(data);
            var dom1 = '';
            var dom2 = '';
            var dom3 = '';
            var dom3Index = 0;
            // let dom4 = '';
            // let dom4_index = 0;
            // let dom4_listMaxNum = 8;

            if (data.status == '-1') {
                var msg = msgFn({ cid: cid, pgnum: pgnum, cnt: cnt });
                $(targetName + ' .isNoContent').html(msg);
            } else {
                if (data.data.list.length > 0) {
                    data.data.list.map(function (e, i) {
                        // console.log(e.PubTime);

                        if (e.Attr == 62) {
                            dom1 = '\n                                <!-- topBigTitle START -->\n                                ' + (e.LinkUrl ? '<h1><a href="' + e.LinkUrl + '" target="_blank" class="link external">' : '<!-- 暂无主标题链接 -->') + '\n                                ' + (e.Title ? e.Title : '<!-- 暂无主标题 -->') + '\n                                ' + (e.LinkUrl ? '</a></h1 >' : '<!-- 暂无主标题链接 -->') + '\n                                ' + (e.Abstract ? '<div class="absBox">' + e.Abstract + '</div>' : '<!-- 暂无摘要 -->') + '\n                                <!-- topBigTitle END -->';
                        }

                        if (e.Attr == 61) {
                            dom2 += '\n                                <div class="swiper-slide item" data-docid="' + e.DocID + '">\n                                    ' + tp.pic(e, i) + '\n                                    <div class="title">\n                                        <div class="text">\n                                            ' + tp.title(e, i) + '\n                                        </div>\n                                    </div>\n                                </div>\n                            ';
                        }

                        if (e.Attr == 63 && dom3Index < rightSideItemMax) {
                            dom3Index++;
                            dom3 += '\n                                <h2 class="tiny-title" data-docid="' + e.DocID + '">\n                                    ' + tp.title(e, i) + '\n                                </h2>\n                                ' + tp.abs(e) + '\n                            ';
                            if (dom3Index <= rightSideItemMax - 1) {
                                dom3 += '<div class="line"></div>';
                            }
                        }
                    });
                }
            }

            if (dom1) {
                $(targetName + ' .topBigTitle').html(dom1);
            }

            if (dom2) {
                $(targetName + ' .swiper-wrapper').html(dom2);
                rotAndHeadlineWithBigTitleNoList_initRot(targetName);
            }

            if (dom2 || dom3) {
                $('.col1 .right').html('\n                    ' + dom3 + '\n                ');
            } else {
                $('.col1 .area').hide();
                // $('.col1 .more').hide();
            }
        },
        error: function error(xhr, ajaxOptions, thrownError) {
            console.log('error:', xhr, ajaxOptions, thrownError);
            if (xhr.status == 404) {
                $('.topBigTitle .isNoContent' + cid).html(thrownError);
                $('.col1 .isNoContent' + cid).html(thrownError);
            }
        }
    });
};
// import './mod/rotAndHeadlineNoList.js'
// import './mod/rotAndHeadline_ctlHeight.js'
// import './mod/rotBig.js'

// import './mod/itemListLeftandRight.js'
// import './mod/rot2Box.js'
// import './mod/rot3BoxNoPic.js'
// import './mod/rotPicABigAndMoreTiny.js'
// import './mod/picAndList.js'
// import './mod/picList.js'
// import './mod/rotGallery.js'
// import './mod/picTitleAbsAndList.js'
// import './mod/titleAbs.js'

// import './mod/rotBox61.js'


// import './mod/bigTitle.js'
var addDataForHomepage = function addDataForHomepage(cid) {
    var rotBox61InitRot = function rotBox61InitRot(targetName) {
        var mySwiper = false;
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
                        clickable: true
                    },
                    navigation: {
                        nextEl: targetName + ' .swiper-button-next',
                        prevEl: targetName + ' .swiper-button-prev'
                    },
                    effect: 'coverflow',
                    centeredSlides: true,
                    coverflowEffect: {
                        rotate: 30,
                        stretch: 40,
                        depth: 80,
                        modifier: 3,
                        slideShadows: false
                    }
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
                        clickable: true
                    }
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

    var loadDataListItem = function loadDataListItem(_ref6) {
        var cid = _ref6.cid,
            cnt = _ref6.cnt,
            pgnum = _ref6.pgnum,
            targetName = _ref6.targetName;

        // console.log('----------> loadDataListItem() ', cid);
        // console.log(targetName);
        // console.log('-------> cnt: ', cnt);
        // console.log('addMore:', pgnum);
        console.log('ajax:', 'http://da.wa.news.cn/nodeart/page?nid=' + cid + '&pgnum=' + pgnum + '&cnt=' + cnt + '&tp=1&orderby=1');
        var index = 0;
        var page = 0;
        var dom = { 0: [] };
        var index61 = 0;
        var dom61 = '';

        $.ajax({
            url: AJAX_url,
            data: {
                // nid: isDev ? 11207721 : cid, // 11203173
                nid: cid,
                pgnum: pgnum,
                cnt: cnt,
                tp: 1,
                orderby: 1
                // type: 'GET',
            },
            dataType: 'JSONP',
            success: function success(data) {
                // console.log(data);
                if (data.status == '-1') {
                    $('#addData').html('暂无更多').addClass('disable');
                    // $('html').addClass('isCtlNoContentHeight');
                    var msg = msgFn({ cid: cid, pgnum: pgnum, cnt: cnt });
                    if (targetName) {
                        $(targetName + ' .isNoContent').html(msg);
                    } else {
                        $('.isNoContent' + cid).html(msg);
                    }
                } else {
                    if (data.data.list.length > 0) {
                        // $('html').removeClass('isCtlNoContentHeight');

                        data.data.list.map(function (e, i) {
                            if (e.Attr == 61) {
                                if (index61 < 3) {
                                    dom61 += '<div class="swiper-slide item-rightPicTitleAbs">\n                                        <div class="item-rightPicTitleAbs-in">\n                                            ' + tp.pic(e) + '\n                                            <div class="textBox">\n                                                <div class="title">\n                                                    <div class="text-in">\n                                                        ' + tp.title(e) + '\n                                                    </div>\n                                                </div>\n                                                <div class="abs">\n                                                    <div class="text-in">\n                                                        ' + tp.abs(e) + '\n                                                    </div>\n                                                </div>\n                                                <a class="link external item-rightPicTitleAbs-more" herf="' + e.LinkUrl + '">\u8BE6\u60C5</a>\n                                            </div>\n                                        </div>\n                                    </div>';
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

                        var targetName61 = '#rotBox61';
                        $(targetName61 + ' .swiper-wrapper').html('\n                                <!-- cid: ' + cid + ', cnt: ' + cnt + ', pgnum: ' + pgnum + ' START -->\n                                ' + dom61 + '\n                                <!-- cid: ' + cid + ', cnt: ' + cnt + ', pgnum: ' + pgnum + ' END -->\n                            ');
                        rotBox61InitRot(targetName61);

                        console.log(dom);

                        // console.log('p1:', dom[0]);
                        var domPage = 0;

                        render(targetName, {
                            dom: dom[domPage],
                            cid: cid,
                            cnt: cnt,
                            pgnum: pgnum
                        });

                        $('#addData').on('click', function () {
                            domPage++;
                            if (dom.hasOwnProperty(domPage)) {
                                render(false, {
                                    dom: dom[domPage],
                                    cid: cid,
                                    cnt: cnt,
                                    pgnum: pgnum
                                });
                            } else {
                                $('.isNoContent.isNoContent').html('暂无更多');
                                $('#addData').addClass('disable').off('click');
                            }
                        });
                    }
                }
            }
            // error: function (xhr, ajaxOptions, thrownError) {
            //     console.log(xhr, ajaxOptions, thrownError);
            //     if (xhr.status == 404) {
            //         $('.isLoading').html(thrownError);
            //     }
            // },
        });
    };

    var render = function render(targetName, _ref7) {
        var dom = _ref7.dom,
            cid = _ref7.cid,
            cnt = _ref7.cnt,
            pgnum = _ref7.pgnum;

        $('.isLoading').html('').removeClass('isLoading');

        var html = '';

        dom.map(function (e, i) {
            var aBegin = tp.a.start(e);
            var aEnd = tp.a.end(e);
            html += '<li data-index="' + i + '" data-docid="' + e.DocID + '"' + (e.PicLinks ? '' : 'class="noPic"') + '>\n                ' + tp.pic(e) + '\n                <div class="text">\n                    ' + aBegin + '\n                        <div class="title">\n                            ' + (e.Title ? '' + e.Title : '暂无标题') + '\n                        </div>\n                        <div class="title2">\n                            <div class="date">' + tp.date(e) + '</div>\n                            <div class="more">\u67E5\u770B\u8BE6\u60C5</div>\n                        </div>\n                    ' + aEnd + '\n                </div>\n            </li>';
        });

        if (targetName) {
            $(targetName).html('\n                    <!-- cid: ' + cid + ', cnt: ' + cnt + ', pgnum: ' + pgnum + ' START -->\n                    ' + html + '\n                    <!-- cid: ' + cid + ', cnt: ' + cnt + ', pgnum: ' + pgnum + ' END -->\n                ');
        } else {
            $('#addDataListPos').append('\n                    <!-- cid: ' + cid + ', cnt: ' + cnt + ', pgnum: ' + pgnum + ' START -->\n                    ' + html + '\n                    <!-- cid: ' + cid + ', cnt: ' + cnt + ', pgnum: ' + pgnum + ' END -->\n                ');
        }
    };

    loadDataListItem({
        cid: cid[0].cid,
        cnt: 2000,
        pgnum: 1,
        targetName: '#addDataListPos'
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

// import './setHomepageCol.js'

var setHomepageColByName = function setHomepageColByName() {
    // <a class="link" href="${e.url}${e.cid}">${e.name}</a>
    // console.log(cid);
    for (var prop in cidMap.byName) {
        // console.log(prop);
        // if (cidMap.byName.hasOwnProperty(prop)) {
        var e = cidMap.byName[prop];
        var _cid = e.cid | e;
        // console.log(cid);
        // col
        var $col = $('[data-setUrl="' + prop + '"]');

        $col.replaceWith('\n            <a class="colA link" href="/page/' + _cid + '">\n                <div class="' + $col.attr('class') + '">\n                    <div class="colATxt">' + txtSplitByDash(prop) + '</div>\n                </div>\n            </a>\n        ');

        // more
        var $more = $('[data-more="' + prop + '"]');
        $more.replaceWith('\n            <div class="more">\n                <a class="colA link" href="/page/' + _cid + '"> ' + $more.html() + ' </a>\n            </div>\n        ');
        // }
    }
};

// import './cover.js'

// import './bk/mobile/index.js'
var setPageChildNavDomFn = function setPageChildNavDomFn(channelRouter) {
    console.log('setPageChildNavDomFn(channelRouter) --//-->:', channelRouter);
    var dom = '';
    var child = channelRouter.child ? channelRouter.child : [];

    console.log(child);
    // <a class="colA link" href="/page/${e.cid}"> ${$more.html()} </a>
    child.map(function (e) {
        console.log(e);
        dom += '\n            <div class="item" data-childitem="childNav-' + e.cid + '">\n                <a class="colA link" data-childitem="childNav-' + e.cid + '" href="/page/' + e.cid + '" > ' + e.name + ' </a>\n            </div>\n        ';
    });

    return dom;
};
var findFather = function findFather(childCid) {
    console.log('findFather:\n  | ', childCid);
    var fatherRouter = void 0;
    var isRun = true;

    cid.map(function (e) {
        // ---> Lv1
        // console.log(e);
        // console.log(e.cid == childCid);
        if (e.cid == childCid == false && isRun) {
            if (e.hasOwnProperty('child')) {
                if (e.child) {
                    // console.log(1, e);
                    fatherRouter = e;
                    e.child.map(function (_e) {
                        // ---> Lv2
                        // console.log(2, _e);
                        // console.log(_e.cid == childCid);
                        if (_e.cid == childCid) {
                            isRun = false;
                        }
                    });
                }
            }
        }
    });

    // console.log('---///---> fatherRouter:', fatherRouter);
    return fatherRouter;
};

var setCol_setTimeout = void 0;

var routes = [{
    name: '首页',
    path: MAIN_url,
    url: '.',
    on: {
        // pageAfterIn: function (e, page) {
        //     console.log('pageAfterIn: ', e, page);
        //     // aAddClassFn();
        // },
        pageInit: function pageInit(e, page) {
            // console.log(e, page);
            setNav(cid); // 必须在前面，通过他设置 CHObj

            // setHomepageCol(cid);
            // setHomepageColByName();

            addDataForHomepage(cid);

            aAddClassFn();

            // if (isPc) {
            //     cover();
            // }

            // $$('.navBtn').removeClass('active');
            // $$('.navBtn-home').addClass('active');
        }
    }
},
// {
//     name: '列表页',
//     path: '/page/:currentCid',
//     content: contentPageFn(),
//     on: {
//         pageInit: function (e, page) {
//             setNav(cid);
//             // console.log('cidAdd:', cidAdd);
//             let currentCid = page.route.params.currentCid;
//             const isCurrentCidPage = window.location.href.indexOf(currentCid) !== -1;

//             // console.log('     | isCurrentCidPage:', isCurrentCidPage);
//             // console.log('     | currentCid:', currentCid);

//             if (isCurrentCidPage) {
//                 const setCol = () => {
//                     // 设置导航按钮
//                     $$(`[data-id]`).removeClass('active');
//                     let fatherRouter;

//                     let $active = $$(`[data-id="id-${currentCid}"]`);
//                     // console.log('--///---> $active:', currentCid, $active);
//                     // let spaColTitleTxt = $active.text();
//                     let spaColTitleTxt = cidMap.byCid[currentCid];
//                     // console.log('spaColTitleTxt:', spaColTitleTxt);

//                     const isNeedFindFather = spaColTitleTxt == undefined;
//                     console.log('---> isNeedFindFather:', isNeedFindFather);

//                     if (isNeedFindFather) {
//                         fatherRouter = findFather(currentCid);
//                         $active = $$(`[data-id="id-${fatherRouter.cid}"]`);
//                         spaColTitleTxt = fatherRouter.name;

//                     }

//                     console.log('fatherRouter:', fatherRouter);


//                     const channelRouter = cidMap.byName[spaColTitleTxt];
//                     const isHasChild = channelRouter ? channelRouter.child !== undefined : false;

//                     console.log('channelRouter:', channelRouter);
//                     console.log('isHasChild:', isHasChild);


//                     if ($active.length > 0) {
//                         $active.addClass('active');
//                         $$('.spaColTitle').prepend(`
//                             <div class="${$active.attr('class')}"></div>
//                             <div class="middot"></div>
//                         `);
//                     }
//                     // else {
//                     //     // console.log('aaaa');
//                     //     console.log(cidAdd[currentCid]);
//                     //     if (cidAdd.hasOwnProperty(currentCid)) {
//                     //         spaColTitleTxt = cidAdd[currentCid].name;
//                     //     } else if (cidMap) {
//                     //         spaColTitleTxt = cidMap[currentCid];
//                     //         console.log(spaColTitleTxt);
//                     //     }
//                     // }

//                     $$('.navbar .title').text(spaColTitleTxt);

//                     const $spaColTitle = $('.spaColTitle');
//                     $spaColTitle.before(`
//                         <div class="colFather itemsColSpBg">
//                             <a class="link" href="/page/${isNeedFindFather ? fatherRouter.cid : currentCid}">
//                                 <div class="colATxt">${txtSplitByDash(spaColTitleTxt)}</div>
//                             </a>
//                         </div>
//                     `);
//                     $spaColTitle.hide();


//                     if (isHasChild) {
//                         // $spaColTitle.text(txtSplitByDash(spaColTitleTxt));
//                         // const $spListArea = $('.spListArea');
//                         const $hasNav = $('.hasNav');
//                         const pageChildNavDom = setPageChildNavDomFn(channelRouter);

//                         $hasNav.addClass('hasNav').prepend(`
//                             <div class="pageChildNav">
//                                 ${pageChildNavDom}
//                             </div>
//                         `);

//                         if (isNeedFindFather) {
//                             $(`[data-childitem="childNav-${currentCid}"]`).addClass('active');
//                             // $('html').addClass('isChildDom');
//                         }
//                         // else {
//                         //     $('html').removeClass('isChildDom');
//                         // }
//                     }


//                     // ctl father
//                     const father = channelRouter ? channelRouter.father : false;
//                     // console.log('father:', father);
//                     if (father) {
//                         $spaColTitle.before(`
//                             <div class="colFather itemsColSpBg">
//                                 <div class="colATxt">${father}</div>
//                             </div>
//                         `);

//                         $$(`[data-id="id-${cidMap.byName[father].cid}"]`).addClass('active');
//                     }

//                     clearTimeout(setCol_setTimeout);
//                     setCol_setTimeout = null;
//                 };

//                 setCol_setTimeout = setTimeout(setCol, 400);

//                 // 设置数据写入 id
//                 const $id = $$('#addDataListPos');
//                 $id.attr('id', 'addDataListPos' + currentCid);
//                 $id.attr('data-cid', currentCid);

//                 // 暂无内容位置 (只能替换 class 名，新增会导致多个class)
//                 $$('.isNoContent').attr('class', 'isNoContent isNoContent' + currentCid);

//                 // 查看更多按钮
//                 $$('#addData').attr('id', 'addData' + currentCid);

//                 pageFn(currentCid);
//             }
//         },
//     },
//     navbar: {
//         hideOnPageScroll: true,
//     },
// },
{
    path: '(.*)',
    url: 'http://www.news.cn/404.html'
}];

// var theme = 'ios'; if (location.href.indexOf('theme=md') >= 0) theme = 'md';
// if (location.href.indexOf('theme=aurora') >= 0) theme = 'aurora'; var plugin
// = {     params: {         // theme: 'ios',         root: '#app',     } }; if
// (Framework7.use) Framework7.use(plugin); else if (Framework7.Class &&
// Framework7.Class.use) Framework7.Class.use(plugin);

var theme = 'auto';

if (document.location.search.indexOf('theme=') >= 0) {
    theme = document.location.search.split('theme=')[1].split('&')[0];
}

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'xiongan',
    // App id
    id: 'com.myapp.test',
    // theme: theme,
    // Enable swipe panel
    panel: {
        // swipe: isPc ? 'top' : 'left',
        swipe: 'left'
    },
    // Add default routes
    routes: routes,
    popup: {
        closeOnEscape: true
    },
    sheet: {
        closeOnEscape: true
    },
    popover: {
        closeOnEscape: true
    },
    actions: {
        closeOnEscape: true
    }
    // on: {
    //     // each object key means same name event handler
    //     pageInit: function (page) {
    //         console.log(page);

    //         // do something on page init
    //         app.lazy.create('img.lazy');
    //     },
    //     // popupOpen: function (popup) {
    //     //     // do something on popup open
    //     // },
    // },
});

// var ac1 = app
//     .actions
//     .create({
//         buttons: [
//             {
//                 text: '北京',
//                 bold: true
//             }, {
//                 text: '上海'
//             }, {
//                 text: '取消',
//                 color: 'red'
//             }
//         ]
//     });

// $('.ac-1').on('click', function () {
//     ac1.open();
// });
var mainView = app.views.create('.view-main', {
    pushState: true,
    on: {
        pageAfterIn: function pageAfterIn(e, page) {
            // console.log(e, page);
            // aAddClassFn();
            $('.listBoxMoreBtn').click();
        }
        // pageInit: function (page) {

        //     $(() => {
        //         addDataForHomepage(cid);
        //         setNav(cid);
        //         aAddClassFn();
        //     });

        //     // // console.log('page init', page);

        // },
    }
});