$.fn.rotateElement = function (angle) {
    var elementToRotate = this,
        deg = angle,
        deg2radians = Math.PI * 2 / 360,
        rad = deg * deg2radians,
        costheta = Math.cos(rad),
        sintheta = Math.sin(rad),

        m11 = costheta,
        m12 = -sintheta,
        m21 = sintheta,
        m22 = costheta,
        matrixValues = 'M11=' + m11 + ', M12=' + m12 + ', M21=' + m21 + ', M22=' + m22;

    elementToRotate.css('-webkit-transform', 'rotate(' + deg + 'deg)')
        .css('-moz-transform', 'rotate(' + deg + 'deg)')
        .css('-ms-transform', 'rotate(' + deg + 'deg)')
        .css('transform', 'rotate(' + deg + 'deg)')
        .css('filter', 'progid:DXImageTransform.Microsoft.Matrix(sizingMethod=\'auto expand\',' + matrixValues + ')')
        .css('-ms-filter', 'progid:DXImageTransform.Microsoft.Matrix(SizingMethod=\'auto expand\',' + matrixValues + ')');
    return elementToRotate;
}