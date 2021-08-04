$('#plusdoc').on('click', function () {
    let submit = true;
    let NamaAction = $("#ActionName").val();
    if (NamaAction == 0 || NamaAction == "") {
        lookup.alertError("Action Name Must Be Filled First")
        submit = false;

    }
    let IsIndex = false;
    if ($("#isIndex").is(':checked')) {
        IsIndex = true;
    }
    if (submit) {
        $.ajax({
            type: "POST",
            url: "/MControllerMenu/AddDetailControllerAction",
            data: { NamaAction: NamaAction, isIndex: IsIndex },
            beforeSend: function () { $(".loading").show(); },
            success: function (data) {
                $(".loading").hide();
                $('#MyModalContent').html(data);
                //$("#isIndex").prop("checked", false);
                //$("#ActionName").val("");
                //$("#Id_Header").prop('disabled', true);
                //$("#ControllerMenuNewRow_NamaController").prop('readOnly', true);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                $(".loading").hide();
               
                CustomPopUpMessage(false, xhr.statusText);
                $("#isIndex").prop("checked", false);
                $("#ActionName").val("");
            }
        });
    }


});

function DeleteDetailAction(name) {
    $.ajax({
        type: "POST",
        url: "/MControllerMenu/DeleteDetailControllerAction",
        data: { namaAction: name },
        beforeSend: function () { },
        success: function (data) {
            
            $(".loading").hide();
            $('#MyModalContent').html(data);
            
        },
        error: function (xhr, ajaxOptions, thrownError) {
            //alert(xhr.status);
            var msg = JSON.parse(xhr.responseText);
            CustomPopUpMessage(false, msg.message);
            $(".loading").hide();
        }
    });
}
