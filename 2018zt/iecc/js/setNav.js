const setNav = (cid) => {
    // console.log('----> setNavFn !!!', e);
    let dom = '';
    let cidAdd = {};

    for (const prop in cid) {
        const col = cid[prop];

        // console.log('setNav:', cid[prop]);

        const className = 'navBtn-' + col.cid;
        let _url = '/page/' + col.cid;

        if (col.nav) {
            // console.log(className);

            if (col.isPage == true) {
                dom += `
                    <span class="line line-${col.cid}"></span>
                    <a class="link navBtn ${className}" href="${_url}" data-id="id-${col.cid}">
                        ${col.name}
                    </a>
                `;
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
                dom += `
                    <a class="link navBtn ${className} hide" href="${_url}" data-id="id-${col.cid}">
                        ${col.name}
                    </a>
                `;
            }
        } else {
            cidAdd[col.cid] = {
                name: `${col.name}`,
            };
        }

        // col
        const $col = $(`[data-col="${prop}"]`);
        $col.replaceWith(`
            <a class="colA link" href="${_url}">
                <div class="${$col.attr('class')}">
                    <div class="hide">${col.name}</div>
                </div>
            </a>
        `);

        // more
        const $more = $(`[data-more="${prop}"]`);
        $more.replaceWith(`
            <div class="more">
                <a class="colA link" href="${_url}"> ${$more.html()} </a>
            </div>
        `);
    }

    // a 的 data-id 必须带着，用于触发 active
    if (isPc) {
        $('[data-js="setNav(cid)"]').html(`
            <a class="link navBtn-home active" href="${MAIN_url}" data-id="home">首页</a>
            ${dom}            
        `);
    } else {
        $('[data-js="setNav(cid)"]').html(`
            ${$('.panel-xaLogoA').prop('outerHTML')}
            <a class="link navBtn-home active" href="${MAIN_url}" data-id="home">首页</a>
            ${dom}            
        `);
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