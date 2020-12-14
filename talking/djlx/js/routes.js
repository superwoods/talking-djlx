let setCol_setTimeout;

const routes = [
    {
        name: '首页',
        path: MAIN_url,
        url: '.',
        on: {
            // pageAfterIn: function (e, page) {
            //     console.log('pageAfterIn: ', e, page);
            //     // aAddClassFn();
            // },
            pageInit: function (e, page) {
                // console.log(e, page);
                setNav(cid); // 必须在前面，通过他设置 CHObj

                // setHomepageCol(cid);
                setHomepageColByName();

                addDataForHomepage(cid);

                aAddClassFn();

                // if (isPc) {
                //     cover();
                // }

                // $$('.navBtn').removeClass('active');
                // $$('.navBtn-home').addClass('active');
            },
        }
    },
    {
        name: '列表页',
        path: '/page/:currentCid',
        content: contentPageFn(),
        on: {
            pageInit: function (e, page) {
                setNav(cid);
                // console.log('cidAdd:', cidAdd);
                let currentCid = page.route.params.currentCid;
                const isCurrentCidPage = window.location.href.indexOf(currentCid) !== -1;

                // console.log('     | isCurrentCidPage:', isCurrentCidPage);
                // console.log('     | currentCid:', currentCid);

                if (isCurrentCidPage) {
                    const setCol = () => {
                        // 设置导航按钮
                        $$(`[data-id]`).removeClass('active');
                        let fatherRouter;

                        let $active = $$(`[data-id="id-${currentCid}"]`);
                        // console.log('--///---> $active:', currentCid, $active);
                        // let spaColTitleTxt = $active.text();
                        let spaColTitleTxt = cidMap.byCid[currentCid];
                        // console.log('spaColTitleTxt:', spaColTitleTxt);

                        const isNeedFindFather = spaColTitleTxt == undefined;
                        console.log('---> isNeedFindFather:', isNeedFindFather);

                        if (isNeedFindFather) {
                            fatherRouter = findFather(currentCid);
                            $active = $$(`[data-id="id-${fatherRouter.cid}"]`);
                            spaColTitleTxt = fatherRouter.name;

                        }

                        console.log('fatherRouter:', fatherRouter);




                        const channelRouter = cidMap.byName[spaColTitleTxt];
                        const isHasChild = channelRouter ? channelRouter.child !== undefined : false;

                        console.log('channelRouter:', channelRouter);
                        console.log('isHasChild:', isHasChild);


                        if ($active.length > 0) {
                            $active.addClass('active');
                            $$('.spaColTitle').prepend(`
                                <div class="${$active.attr('class')}"></div>
                                <div class="middot"></div>
                            `);
                        }
                        // else {
                        //     // console.log('aaaa');
                        //     console.log(cidAdd[currentCid]);
                        //     if (cidAdd.hasOwnProperty(currentCid)) {
                        //         spaColTitleTxt = cidAdd[currentCid].name;
                        //     } else if (cidMap) {
                        //         spaColTitleTxt = cidMap[currentCid];
                        //         console.log(spaColTitleTxt);
                        //     }
                        // }

                        $$('.navbar .title').text(spaColTitleTxt);

                        const $spaColTitle = $('.spaColTitle');
                        $spaColTitle.before(`
                            <div class="colFather itemsColSpBg">
                                <a class="link" href="/page/${isNeedFindFather ? fatherRouter.cid : currentCid}">
                                    <div class="colATxt">${txtSplitByDash(spaColTitleTxt)}</div>
                                </a>
                            </div>
                        `);
                        $spaColTitle.hide();


                        if (isHasChild) {
                            // $spaColTitle.text(txtSplitByDash(spaColTitleTxt));
                            // const $spListArea = $('.spListArea');
                            const $hasNav = $('.hasNav');
                            const pageChildNavDom = setPageChildNavDomFn(channelRouter);

                            $hasNav.addClass('hasNav').prepend(`
                                <div class="pageChildNav">
                                    ${pageChildNavDom}
                                </div>
                            `);

                            if (isNeedFindFather) {
                                $(`[data-childitem="childNav-${currentCid}"]`).addClass('active');
                                // $('html').addClass('isChildDom');
                            }
                            // else {
                            //     $('html').removeClass('isChildDom');
                            // }
                        }




                        // ctl father
                        const father = channelRouter ? channelRouter.father : false;
                        // console.log('father:', father);
                        if (father) {
                            $spaColTitle.before(`
                                <div class="colFather itemsColSpBg">
                                    <div class="colATxt">${father}</div>
                                </div>
                            `);

                            $$(`[data-id="id-${cidMap.byName[father].cid}"]`).addClass('active');
                        }

                        clearTimeout(setCol_setTimeout);
                        setCol_setTimeout = null;
                    };

                    setCol_setTimeout = setTimeout(setCol, 400);

                    // 设置数据写入 id
                    const $id = $$('#addDataListPos');
                    $id.attr('id', 'addDataListPos' + currentCid);
                    $id.attr('data-cid', currentCid);

                    // 暂无内容位置 (只能替换 class 名，新增会导致多个class)
                    $$('.isNoContent').attr('class', 'isNoContent isNoContent' + currentCid);

                    // 查看更多按钮
                    $$('#addData').attr('id', 'addData' + currentCid);

                    pageFn(currentCid);
                }
            },
        },
        navbar: {
            hideOnPageScroll: true,
        },
    },
    {
        path: '(.*)',
        url: 'http://www.xiongan.gov.cn/404.html'
    }
];