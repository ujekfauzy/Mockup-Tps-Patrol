var modalpdf = document.getElementById("pdfmodal"),
    captionText = document.getElementById("caption"),
    iframe = document.getElementById("iframepdf");
function popupPdf(t, m) {
    var /*e = $(t).attr("src"),*/
        n = $(t).attr("title");
    (modalpdf.style.display = "block"), (iframe.src = m), (captionText.innerHTML = n);
}
var span = document.getElementsByClassName("close")[1];
(span.onclick = function () {
    modalpdf.style.display = "none";
}),
    (window.onclick = function (t) {
        t.target === modalpdf && (modalpdf.style.display = "none");
    });

function closeModalPdf() {
    modalpdf.style.display = "none";
}