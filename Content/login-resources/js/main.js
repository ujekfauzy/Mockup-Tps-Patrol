(function ($) {
    "use strict";
    window.onload = addNewClass();
    function addNewClass() {
        $('.fxt-template-animation').imagesLoaded().done(function (instance) {
            $('.fxt-template-animation').addClass('loaded');
        });
    }
})(jQuery);

$(function () {
    var body = $('.section-bg');
    var backgrounds = [
        'url("/Content/Gambar/bg/A_1.jpg")',
        'url("/Content/Gambar/bg/A_2.jpg")',
        'url("/Content/Gambar/bg/A_3.jpg")',
        'url("/Content/Gambar/bg/A_4.jpg")',
        'url("/Content/Gambar/bg/A_5.jpg")'];
    var current = 0;

    function nextBackground() {
        body.css({
            'background': backgrounds[current = ++current % backgrounds.length],
            'height': '100%',
            'background-position': 'center',
            'background-repeat': 'no-repeat',
            'background-size': 'cover'
        });
        setTimeout(nextBackground, 10000);
    }
    setTimeout(nextBackground, 10000);
    body.css({
        'background': backgrounds[0],
        'height': '100%',
        'background-position': 'center',
        'background-repeat': 'no-repeat',
        'background-size': 'cover'
    });
});