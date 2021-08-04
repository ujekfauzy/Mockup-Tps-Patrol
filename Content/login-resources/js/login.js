$(".toggle-password").click(function () {
    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
        input.attr("type", "text");
    } else {
        input.attr("type", "password");
    }
});

$('#formLogin').attr('autocomplete', 'off');
$("#formLogin").keypress(function (e) {
    if (e.keyCode == 13) {
        document.getElementById('btn-sbmt').style.cssText = `background: #FFD700;color: #fff;border-radius: 5px;box-shadow: 0 0 5px #FFD700, 0 0 25px #FFD700, 0 0 50px #FFD700, 0 0 100px #FFD700;`;
        submit();
    }
});

function submit() {
    $("#formLogin").submit();
}

function Edit(url) {
    $(".loading").show();
    $.ajaxSetup({ cache: false });
    $("#MyModalContent").load(url, function () {
        //$.unblockUI();
        $(".loading").hide();
        $("#MyModal").modal({
            //backdrop: 'relative',
            keyboard: false
        }, 'show');
        bindForm(this);
    });
    return false;
}
function CustomPopUpMessage(success, msg) {
    if (success) {
        $.confirm({
            title: 'Success!',
            content: msg,
            type: 'green',
            typeAnimated: true,
            closeIcon: true,
            closeIconClass: 'fa fa-close',
            buttons: {
                close: function () {

                }
            }
        });
    }
    else {
        $.confirm({
            title: 'Alert!',
            content: msg,
            type: 'red',
            typeAnimated: true,
            closeIcon: true,
            closeIconClass: 'fa fa-close',
            buttons: {
                close: function () {

                }
            }
        });
    }
}