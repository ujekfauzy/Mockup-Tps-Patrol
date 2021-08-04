var component = $(".componentDiv");
var slider = document.getElementById("inputRange");
var outputSlider = document.getElementById("outputRange");
var widthBase = document.getElementById("baseWidth");
var heightBase = document.getElementById("baseHeight");
var bgImageBase = document.getElementById("baseImage");
function setElementBase(value) {
    document.getElementById('baseWidth').value = value.width;
    document.getElementById('baseHeight').value = value.height;
    document.getElementById('coloreditbase').value = value.backgroundColor;
    document.getElementById('baseImage').value = "";
}
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});