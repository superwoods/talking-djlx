const cover = () => {
    const $cover = $('#cover');
    let setTimeoutFn;

    const coverOff = () => {
        $cover.fadeOut(() => {
            $cover.remove();
        });
        clearTimeout(setTimeoutFn);
        setTimeoutFn = null;
    };

    setTimeoutFn = setTimeout(() => {
        coverOff();
    }, 3000);

    $cover.on('click', () => {
        coverOff();
    });
};

cover();