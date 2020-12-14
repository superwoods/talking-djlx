const txtSplitByDash = (txt) => {
    return /-/.test(txt) ? txt.split('-').slice(-1) : txt;
};