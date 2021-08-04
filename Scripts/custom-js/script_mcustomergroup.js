
$('#btnAddDoc').on('click', function () {

    let submit = true;

    //let namaCustomerGroup = "";
    //if (idCustomerGroup === "-1") {
    //    namaCustomerGroup = $("#CustomerGroupNewRow_Nama").val();
    //}
    //else {
    //    namaCustomerGroup = $("#CustomerGroupRow_Nama").val();
    //}

    //if ((namaCustomerGroup == 0) || (namaCustomerGroup == "")) {
    //    alert("Controller Name Must Be Filled First")
    //    submit = false;
    //}

    let isMandatory = false;
    if ($("#isMandatory").is(':checked')) {
        isMandatory = true;
    }

    if (submit) {
        $.ajax({
            type: "POST",
            url: "/MCustomersGroup/SaveListDocumentTemp",
            data: { /*idCustomerGroup: $("#Id").val(),*/ idDokumen: $("#IdDokumen").val(), isMandatory: isMandatory },
            beforeSend: function () { $(".loading").show(); },
            success: function (data) {
                $(".loading").hide();
                $('#table tbody').html(data);
                //$("#isIndex").prop("checked", false);
                //$("#ActionName").val("");
                //$("#Id_Header").prop('disabled', true);
                //$("#ControllerMenuNewRow_NamaController").prop('readOnly', true);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                $(".loading").hide();
                var msg = JSON.parse(xhr.responseText);
                CustomPopUpMessage(false, msg.message);
                //$("#isIndex").prop("checked", false);
                //$("#ActionName").val("");
            }
        })
    }
});

function DeleteDocument(idDokumen) {
    $.ajax({
        type: "POST",
        url: "/MCustomersGroup/DeleteListDocumentTemp",
        data: { idDokumen: idDokumen },
        beforeSend: function () { },
        success: function (data) {
            $(".loading").hide();
            $('#table tbody').html(data);
            //let rowCount = $('#table tr').length;
            //if (rowCount === 1) {
            //    $("#Id_Header").prop('disabled', false);
            //    $("#ControllerMenuNewRow_NamaController").prop('readOnly', false);
            //}
        },
        error: function (xhr, ajaxOptions, thrownError) {
            //alert(xhr.status);
            var msg = JSON.parse(xhr.responseText);
            CustomPopUpMessage(false, msg.message);
            $(".loading").hide();
        }
    });
}

function ClearSession() {
    $.ajax({
        type: "Get",
        url: "/MCustomersGroup/ClearSession",
        dataType: "json",
        success: function (data) { },
        error: function (xhr, ajaxOptions, thrownError) { }
    });
}