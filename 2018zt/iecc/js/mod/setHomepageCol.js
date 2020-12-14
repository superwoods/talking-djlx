let isSetHomepageCol = false;

const setHomepageCol = (cid) => {
    // <a class="link" href="${e.url}${e.cid}">${e.name}</a>
    if (isSetHomepageCol == false) {
        // console.log(cid);
        for (const prop in cid) {
            if (cid.hasOwnProperty(prop)) {
                const e = cid[prop];
                // console.log(prop);

                // col
                const $col = $(`[data-setUrl="${prop}"]`);

                $col.replaceWith(`
                    <a class="colA link" href="/page/${e.cid}">
                        <div class="${$col.attr('class')}">
                            <div class="hide">${e.name}</div>
                        </div>
                    </a>
                `);

                // more
                const $more = $(`[data-more="${prop}"]`);
                $more.replaceWith(`
                    <div class="more">
                        <a class="colA link" href="/page/${e.cid}"> ${$more.html()} </a>
                    </div>
                `);
            }
        }
    }
};

