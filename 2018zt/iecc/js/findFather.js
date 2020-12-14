const findFather = (childCid) => {
    console.log('findFather:\n  | ', childCid);
    let fatherRouter;
    let isRun = true;

    cid.map((e) => { // ---> Lv1
        // console.log(e);
        // console.log(e.cid == childCid);
        if ((e.cid == childCid) == false && isRun) {
            if (e.hasOwnProperty('child')) {
                if (e.child) {
                    // console.log(1, e);
                    fatherRouter = e;
                    e.child.map((_e) => { // ---> Lv2
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