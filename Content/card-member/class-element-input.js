class ElementStyle {
    constructor(text, fontSize, fontFamily, fontColor, rotate, fontWeight, fontStyle, textDecoration, textAlign) {
        this.text = text,
            this.fontSize = fontSize;
        this.fontFamily = fontFamily;
        this.fontColor = fontColor;
        this.rotate = rotate;
        this.fontWeight = fontWeight;
        this.fontStyle = fontStyle;
        this.textDecoration = textDecoration;
        this.textAlign = textAlign;
    }
}

class ElementBaseStyle {
    constructor(width, height, backgroundColor/*, backgroundImage*/) {
        this.width = width,
            this.height = height,
            this.backgroundColor = backgroundColor;
            //this.backgroundImage = backgroundImage;
    }
}

class SaveTemplate {
    constructor(layoutId, layoutName, htmlText, backgroundImage) {
        this.layoutId = layoutId;
        this.layoutName = layoutName;
        this.htmlText = htmlText;
        this.backgroundImage = backgroundImage;
    }
}