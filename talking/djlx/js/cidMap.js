const cidMap = (function () {
    const r = {
        byName: {},
        byCid: {},
    };

    cid.map(e => {
        r.byCid[e.cid] = e.name;
        r.byName[e.name] = {
            cid: e.cid,
            child: e.child,
        };

        if (e.father) {
            r.byName[e.name].father = e.father;
        }
    });

    return r;
})();

console.log('--///--> cidMap is ready:\n', cidMap);