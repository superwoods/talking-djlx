const addDataForHomepage = (cid) => {
    rotBox61({
        cid: cid['0'].cid,
        cnt: 20,
        pgnum: 1,
        targetName: '#rotBox61'
    });

    loadDataListItem({
        cid: cid[0].cid,
        cnt: 36,
        pgnum: 1,
        targetName: '#addDataListPos',
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
