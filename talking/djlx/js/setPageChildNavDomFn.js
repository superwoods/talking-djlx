const setPageChildNavDomFn = (channelRouter) => {
    console.log('setPageChildNavDomFn(channelRouter) --//-->:', channelRouter);
    let dom = '';
    let child = channelRouter.child ? channelRouter.child : [];

    console.log(child);
    // <a class="colA link" href="/page/${e.cid}"> ${$more.html()} </a>
    child.map((e) => {
        console.log(e);
        dom += `
            <div class="item" data-childitem="childNav-${e.cid}">
                <a class="colA link" data-childitem="childNav-${e.cid}" href="/page/${e.cid}" > ${e.name} </a>
            </div>
        `;

    });




    return dom;
};