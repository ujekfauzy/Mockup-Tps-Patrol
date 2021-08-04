$(function () {
    $.ajaxSetup({ cache: false });
    $("[data-modal]").on("click", function (e) {
        $('.loading').show();
        $("#MyModalContent").load(this.href, function () {
            $("#MyModal").modal({
                //backdrop: 'static',
                keyboard: false
            }, 'show');
            bindForm(this);
            $('.loading').hide();
        });
        return false;
    });
});

function bindForm(dialog) {
    $('form', dialog).bind('submit').on('submit', function (e) {
        e.preventDefault();
        var data = new FormData(this.form);
        $.ajax({
            url: this.action,
            type: this.method,
            data: new FormData(this),
            processData: false,
            contentType: false,
            beforeSend: function () {
                $('.loading').show();
            },
            complete: function () { $('.loading').hide(); },
            success: function (result) {
                if (result.success) {
                    $("#MyModal").modal('hide');
                    CustomPopUpMessage(true, result.message);
                    //lookup.alertSuccess(result.message,result.url);
                }
                else {
                    $("#MyModal").modal('show');
                    lookup.alertError(result.message, result.url, result.title, result.status);
                    //CustomPopUpMessage(false, result.message);
                }
            },
            error: function (response) {
                CustomPopUpMessage(false, response.statusText);
            }
        });
        return false;
    });
}