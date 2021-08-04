$.fn.modal.prototype.constructor.Constructor.DEFAULTS.backdrop = 'static';
$.fn.modal.prototype.constructor.Constructor.DEFAULTS.keyboard = false;
$.widget.bridge('uibutton', $.ui.button);
$('.select2').select2();
$('.btn-loading').on('click', function () {
    var $this = $(this);
    $this.button('loading');
    setTimeout(function () {
        $this.button('reset');
        $.unblockUI();
    }, 1500);
});
function Edit(url, id) {
    lookup.editForm(url, id);
}
function CustomPopUpMessage(success, msg) {
    if (success) {      
        lookup.alertSuccess(msg, window.location.href);
    }
    else {
        lookup.alertError(msg);
    }
}
function ConfirmationModal(message) {
    $('#messageConfirmation').text(message);
    $('#modalConfirm').modal({ backdrop: 'static', keyboard: false, show: true })
    $('#modalConfirm').modal('show');
}

function loadProfile(id) {
    $.ajax({
        url: "/Home/_Profile",
        data: {id},
        success: function (response) {
            $('#modalShowProfile').modal({ backdrop: 'static', keyboard: false, show: true });
            $('div.target-profile').html(response);
        }
    });
}