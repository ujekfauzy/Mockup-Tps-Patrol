var isLoad = false;
$(document).ready(() => {
    $('body').addClass('sidebar-collapse');
    $('.loadcard, .newcard, .designcard').css("display", "none");
    $(document).on('click', '#btnnew', function () {
        $('.newcard').css("display", "block");
        $('.loadcard').hide();
        loadTemplate(-1);
        isLoad = false;
    });

    $(document).on('click', '#btnload', function () {
        $('.loadcard').css("display", "block");
        $('.newcard').hide();
        $('.designcard').css('display', 'none');
        isLoad = true;
    });

    $('button.btn').off('click');
    document.getElementById("defaultOpen").click();

    $("#ddlname").change(function () {
        loadTemplate(this.value);
    });

    //font family
    $("#ffedit").change(function () {
        let thisval = this.value;
        if (divCurrent !== undefined && divCurrent !== "") {
            divCurrent.style.fontFamily = thisval;
        }
    });
    //font size
    $("#fsedit").change(function () {
        let thisval = this.value;
        if (divCurrent !== undefined && divCurrent !== "") {
            divCurrent.style.fontSize = this.value + "px";
        }
    });

    //modifier align text that using button tag (left, center, right)
    $('button[name=align]').click(function (e) {
        let elementAlign = $('button[name=align]');
        var target = e.currentTarget;
        elementAlign.each(function () {
            if ($(this).is(target)) {
                $(target).toggleClass('active');
                let align = target.firstElementChild.classList[1].split('-').pop();
                divCurrent.style.textAlign = align;
            } else {
                $(this).removeClass('active');
            }
        });
    });
});

function readImageFile() {
    const preview = document.querySelector('img.image-preview-temp');
    const file = document.getElementById('inputaddimage').files[0];
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        preview.src = reader.result;
    }, false);
    if (file) {
        reader.readAsDataURL(file);
    }
};

function loadTemplate(id) {
    $.ajax({
        url: "./GetTemplate",
        data: { id },
        success: function (response) {
            $('.designcard').css('display', 'block');
            $('div.target').html(response);
        }
    });
};

//remove attribute target (resizable, close, cursor)
function clearAttributeTarget(e) {
    e.resizable().resizable('destroy').removeClass('isSelected active');
    e.children('img.close').hide();
    e.css({ "cursor": "default", "overflow": "hidden" });
};
//open form editor text
function openEditor(evt, param) {
    if (component !== 'undefined') {
        if (param == "editbase") {
            clearAttributeTarget(component);
        }
    }

    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(param).style.display = "block";
    //$(evt.target.parentNode).addClass('active');
    if (evt.target.nodeName == 'BUTTON') {
        $(evt.target).addClass('active');
    }
    else if (evt.target.nodeName == 'I' || evt.target.nodeName == 'SPAN') {
        $(evt.target.parentNode).addClass('active');
    }
};
//convert hex to rgb
function rgb2hex(orig) {
    var rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+)/i);
    return (rgb && rgb.length === 4) ? "#" +
        ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : orig;
};
//set value option select
function selectElement(id, valueToSelect) {
    let element = document.getElementById(id);
    element.value = valueToSelect;
};
//set value element editor (edit text)
function setElementInput(el, value) {
    if (!el.classList.contains('noeditable')) {
        document.getElementById('textedit').parentNode.style.display = "block";
    } else {
        document.getElementById('textedit').parentNode.style.display = "none";
        document.getElementById('inputeditimage').disabled = true;
    }
    document.getElementById('textedit').innerText = value.text;
    document.getElementById('coloredit').value = value.fontColor;
    selectElement('fsedit', value.fontSize.replace('px', ''));
    selectElement('ffedit', value.fontFamily);
    document.getElementById("inputRange").value = value.rotate;
    document.getElementById("outputRange").value = value.rotate;
    value.fontWeight == "bold" ? document.getElementsByName('bold')[0].classList.add('active') : document.getElementsByName('bold')[0].classList.remove('active');
    value.fontStyle == "italic" ? document.getElementsByName('italic')[0].classList.add('active') : document.getElementsByName('italic')[0].classList.remove('active');
    value.textDecoration == "underline" ? document.getElementsByName('underline')[0].classList.add('active') : document.getElementsByName('underline')[0].classList.remove('active');
    let elementAlign = $('button[name=align]');
    let valAlign = value.textAlign;
    elementAlign.each(function (value, index) {
        let align = index.firstElementChild.classList[1].split('-').pop();
        if (align === valAlign) {
            index.classList.add('active');
        } else {
            index.classList.remove('active');
        }
    });
};
//draw edit base
function drawEditBase() {
    let actBase = $('.dropdiv.front');
    let elForm = document.getElementById('formeditbase').elements;
    let obj = {};
    for (var i = 0; i < elForm.length; i++) {
        let item = elForm.item(i);
        obj[item.name] = item.value;
    }
    actBase.css(
        {
            "width": obj.width + "px",
            "height": obj.height + "px",
            "background-color": obj.backgroundColor
        }
    );
};

//draw edit base
function clearBackground() {
    let actBase = $('.dropdiv.front');
    actBase.css(
        {
            "background-color": "#fff",
            "background-image": "none"
        }
    );
    $('#baseImage').val('');
};

// draw edit text
function drawEditText() {
    let actComponent = $('.componentDiv.active');
    let elForm = document.getElementById('formedit').elements;
    let obj = {};
    for (var i = 0; i < elForm.length; i++) {
        let item = elForm.item(i);
        switch (item.name) {
            case 'bold':
                item.classList.contains('active') ? obj[item.name] = item.name : obj[item.name] = "normal";
                break;
            case 'italic':
                item.classList.contains('active') ? obj[item.name] = item.name : obj[item.name] = "normal";
                break;
            case 'underline':
                item.classList.contains('active') ? obj[item.name] = item.name : obj[item.name] = "none";
                break;
            case 'left': //default
                obj["textAlign"] = "left";
                break;
            case 'right':
                item.classList.contains('active') ? obj["textAlign"] = item.name : obj["textAlign"] = "left";
                break;
            case 'center':
                item.classList.contains('active') ? obj["textAlign"] = item.name : obj["textAlign"] = "left";
                break;
            default:
                obj[item.name] = item.value;
        }
    }
    actComponent.css({
        "font-size": obj.fontSize + "px",
        "font-family": obj.fontFamily,
        "color": obj.fontColor,
        "font-weight": obj.bold,
        "font-style": obj.italic,
        "text-decoration": obj.underline,
        "text-align": obj["textAlign"]
    })
        .rotateElement(obj.rotate);
    actComponent.find('span.txtcontent').text(obj.text);
};

//draw edit image
function drawEditImage(e) {
    $('div.isSelected.active').find('img.picture').attr('src', window.URL.createObjectURL(e.files[0]));
};

//save layout
function saveLayout() {
    clearAttributeTarget(component);
    let layoutName;
    let idLayout = -1;
    if (isLoad) {
        let select = $('#ddlname').select2('data');
        layoutName = select[0].text;
        idLayout = select[0].id;
    } else {
        layoutName = $('#CardTemplate_Nama').val();
        if (layoutName == "") {
            $('#CardTemplate_Nama').focus();
            lookup.alertError('Failed to save, Please fill layout name');
            return false;
        }
    }

    var htmlLayout = $('.templateCard').prop('outerHTML');
    htmlLayout = htmlLayout.replace(/>\s+|\s+</g, function (m) {
        return m.trim();
    });
    var obj = new SaveTemplate(idLayout, layoutName, htmlLayout);
    $.ajax({
        url: './LayoutCard',
        type: 'POST',
        data: obj,
        success: ((e) => {
            switch (e.message) {
                case "Success":
                    lookup.alertSuccess(e.message, './LayoutCard');
                    break;
                case "Error":
                    lookup.alertError(e.message);
                    break;
            }

        }),
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(xhr.responseText);
        }
    });
};
//add text
function addText() {
    var randomNumber = Math.floor(Math.random() * 10000000);
    var id = "editor" + randomNumber;
    var text = document.getElementById('txtAdd').value;
    $('<div  id="' + id + '" class="componentDiv" style="position:absolute;overflow:hidden;font-family: Arial;font-size: 14px;"><span class="txtcontent">' + text + '</span><img class="close" src="/Content/card-member/Close-512.jpg" alt=""></div>')
        .draggable({ containment: 'parent' }).appendTo(".dropdiv.front");

    $('div#' + id).find("span").trigger('click');

    component = $(".componentDiv");
};
function addBindingObject() {
    let val = document.getElementById("bindingtext");
    let randomNumber = Math.floor(Math.random() * 10000000);
    let id = "editor" + randomNumber;
    if (val.options[val.selectedIndex].value === "_photo") {
        $('<div  id="' + id + '" class="componentDiv noeditable" style="position:absolute;overflow:hidden;font-family: Arial;font-size: 14px;"><div style="width:100%;height:100%;overflow:hidden;"><img id="#' + val.options[val.selectedIndex].value + '" class="picture" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAHgCAIAAAC6s0uzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowMTA3OUM4M0JBOEMxMUUyODk1OUUwMDM4ODMyNkMyQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowMTA3OUM4NEJBOEMxMUUyODk1OUUwMDM4ODMyNkMyQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAxMDc5QzgxQkE4QzExRTI4OTU5RTAwMzg4MzI2QzJCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAxMDc5QzgyQkE4QzExRTI4OTU5RTAwMzg4MzI2QzJCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+hmM2mwAAD65JREFUeNrs3elvVPW/wHGhm0YtGi9gIsaYGDVGRSVuaIya+MRoYpQnPvQ/EwRqN5ZCRcPWli5QWlq2QosFupe22GlLOzPtzPSeC7lcLz/Ezsp0eL0emKbMnJn59Nh3zyznW9zX1/cYAJBba40AAAQYAAQYABBgABBgAECAAUCAAQABBgABBgAEGAAEGAAEGAAQYAAQYABAgAFAgAEAAQYAAQYABBgABBgABBgAEGAAEGAAQIABQIABAAEGAAEGAAQYAAQYAAQYABBgABBgAECAAUCAAQABBgABBgAEGAAEGAAEGAAQYAAQYABAgAFAgAEAAQYAAQYABBgABBgABBgAEGAAEGAAQIABQIABAAEGAAEGAAQYAAQYAAQYABBgABBgAECAAUCAAQABBgABBgAEGAAEGAAEGAAQYAAQYABAgAFAgAEAAQYAAQYABBgABBgABBgAEGAAEGAAQIABQIABAAEGAAEGAAQYAAQYAAQYABBgABBgAECAAUCAAQABBgABBgAEGAAEGAAQYAAQYAAQYABAgAFAgAEAAQYAAQYABBgABBgAEGAAEGAAEGAAQIABQIABAAEGAAEGAAQYAAQYABBgABBgABBgAECAAUCAAQABBgABBgAEGAAEGAAQYAAQYAAQYABAgAFAgAEAAQYAAQYABBgABBgAEGAAEGAAEGAAQIABQIABAAEGAAEGAAQYAAQYABBgABBgABBgAECAAUCAAQABBgABBgAEGAAEGAAQYAAQYAAQYABAgAFAgAEAAQYAAQYABBgABBgAEGAAEGAAEGAAQIABQIABAAEGAAEGAAQYAAQYABBgABBgABBgAECAAUCAAQABBgABBgAEGABWkWIjIP91dXXFYrGioiKjYCXi8XhpaenmzZuNAgGGtBw6dCgSiRQX211ZkeDPtSeffFKAEWBIVzgcTiQSwWGNUbBCCwsLhkCe8xowq4Ann7HPIMAAgAADgAADAAIMAAIMAAgwAAgwAAgwACDAACDAAIAAA4AAAwACDAACDAD8f9YDpgCVlpZ+/vnnL774YjQaNY1Vf5Swdm0sFjt06ND09LRpIMCQ37t1cfHrr7++ceNGoygYTU1NAkyh/XFpBBSe5eXlcDhsDgUjOAKOx+PmgAADAAIMAAIMAAgwAAgwACDAACDAACDAAIAAA4AAAwAZ4FzQwIrMz89fu3ZtfHw8+CKRSJSUlDz99NObNm166aWXiov9JgEBBjJtaGioo6Ojv79/bm4uFov9/Z/KysrWrVv31ltvffDBB0899ZRZgQADGRAOhxsbG0+ePLm0tHTfC0Sj0YmJiaNHj3Z3d3/yySfvv//+2rVe2AIBBtIQCoWqqqoGBgZWcuGbN2/W1dWNjo5+8803JSUlpgcCDKRibm5u+/btwdFtUtfq6OgIjpW3bdvmOBj+lf9JgHstLi4Gx77J1veOs2fPHj9+3AxBgIGknTp16urVqylfvaGhYXBw0BhBgIEkhEKhlpaWdLaQSCSam5uD/xomCDCwUhcvXpybm0tzI5cvXx4dHTVMEGAgiXamv5F4PN7f32+YIMDAioRCocnJyYxsanh4+J6zdgACDNzf1NRUNBrNyKamp6cztSkQYKDARSKRTL15KhwOOwIGAQZybc2aNYYAAgysyOOPP56pk1gFm7JKEggwZFEhPdH63HPPZepMzuXl5aWlpXYPEGDIilAoVFNTc+PGjcJ4OM8+++z69eszsqlNmzZZlQEEGLKlvb39/Pnzu3fvnpmZKYxH9Nprr6W/kaKioldeecXuAQLMo2X5thzc0M2bNzs6Oh67/emdXbt2pX8CqXywefPm8vLy9CseHAHbFUGAeeTk5kTEzc3N8/Pzd74eGRmprq5eWFhY7aNbt27dxx9/nM4WSkpKtm7dakVCEGDIiuHh4XPnzv39O/39/fv27SuAs098+OGHr776aspX//TTT19++WV7CAgwZEVra2skErnnmxcvXqyrq4vH46v6oZWVlX399dcbN25M4bpvv/32F198YfcAAYasuH79etDa+/5Td3d30ODcvAidPevXr//xxx9feOGFpK713nvvfffdd0VFRfYQEGDIvEQi0dTU9ICP/3Z0dNTX16/2hxk0+KefftqyZctKXs0tLy//9ttvv//+++Do2R4CK+E8NZC03tsefJm2trYgRV999dWqfqRPPPFE0NR33333zJkzV65cue/bvINOv/HGG++8886GDRvsGyDAkC3RaLSxsXEll2xoaAga/Nlnn632h/zybVNTU+Pj4zdu3Lh169by8nJRUdG6deuef/75jRs3Bl/YMUCAIbsuXLgwNDS0wgv/8ccfpaWlH330UQE88P+67c0337z78rblFiAdXgOGJITD4ZaWlqSucvDgwc7OzkIawpr/ZX8AAYYcOX36dLKn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" style="width:100%;height:100%;"/></div><img class="close" src="/Content/card-member/Close-512.jpg" alt=""></div>')
            .draggable({ containment: 'parent' })
            .resizable({
                handles: "se",
                containment: "parent",
                minHeight: 30,
                minWidth: 15
            }).appendTo(".dropdiv.front");
    } else {
        $('<div  id="' + id + '" class="componentDiv noeditable" style="position:absolute;overflow:hidden;font-family: Arial;font-size: 14px;"><span class="txtcontent ' + val.options[val.selectedIndex].value + '">#' + val.options[val.selectedIndex].text + '</span><img class="close" src="/Content/card-member/Close-512.jpg" alt=""></div>')
            .draggable({ containment: 'parent' })
            .appendTo(".dropdiv.front");
    }
    component = $(".componentDiv");

    $('div#' + id).find("span").trigger('click');
}

//add img
function addImg() {
    let src = "/Content/Gambar/default.jpg";
    let e = document.getElementById('image-temp').getAttribute('src');
    if (e != undefined && e != "") {
        src = e;
    }

    let randomNumber = Math.floor(Math.random() * 10000000);
    let id = "editor" + randomNumber;
    if ($(id).length) {
        id = "editor" + (randomNumber + 1);
    }
    $('<div  id="' + id + '" class="componentDiv"><div style="width:100%;height:100%;overflow:hidden;"><img class="picture" style="width:100%;height:100%;" src=' + src + ' width="70" height="90" /></div><img class="close" src="/Content/card-member/Close-512.jpg" alt=""></div>')
        .draggable({ containment: 'parent' }).resizable({
            handles: "se",
            containment: "parent",
            minHeight: 30,
            minWidth: 15
        }).appendTo(".dropdiv.front");
    component = $(".componentDiv");
};