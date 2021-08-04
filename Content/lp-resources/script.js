var slideImg = document.getElementById("slideImg");
var images = new Array(
     "Content/Gambar/bg/A_1.jpg",
     "Content/Gambar/bg/A_2.jpg",
     "Content/Gambar/bg/A_6.jpg",
     "Content/Gambar/bg/A_7.jpg"
);
var len = images.length;
var i = 0;
function slider() {
    if (i > len - 1) {
        i = 0;
    }
    slideImg.src = images[i];
    i++;
    setTimeout('slider()', 20000);
}