const setHomepageColByName = () => {
    // <a class="link" href="${e.url}${e.cid}">${e.name}</a>
    // console.log(cid);
    for (const prop in cidMap.byName) {
        // console.log(prop);
        // if (cidMap.byName.hasOwnProperty(prop)) {
        const e = cidMap.byName[prop];
        const cid = e.cid | e;
        // console.log(cid);
        // col
        const $col = $(`[data-setUrl="${prop}"]`);

        $col.replaceWith(`
            <a class="colA link" href="/page/${cid}">
                <div class="${$col.attr('class')}">
                    <div class="colATxt">${txtSplitByDash(prop)}</div>
                </div>
            </a>
        `);

        // more
        const $more = $(`[data-more="${prop}"]`);
        $more.replaceWith(`
            <div class="more">
                <a class="colA link" href="/page/${cid}"> ${$more.html()} </a>
            </div>
        `);
        // }
    }
};

