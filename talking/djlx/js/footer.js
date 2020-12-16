const setFooter = (() => {
    var d = new Date();
    var year = d.getFullYear();
    $('.footer .footer-in2 .text6 span').text(year);
})();