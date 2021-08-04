
$('#btnAddDoc').on('click', function () {
    let submit = true;

    let idLayanan = $("#Id").val();

    let namaLayanan = $("#LayananNewRow_Nama").val();
    if (namaLayanan == 0 || namaLayanan == "") {
        alert("Nama Must Be Filled First")
        submit = false;
    }

    //let NamaAction = $("#ActionName").val();
    //if (NamaAction == 0 || NamaAction == "") {
    //    alert("Action Name Must Be Filled First")
    //    submit = false;
    //}

    if (submit) {
        $.ajax({
            type: "POST",
            url: "/MLayanan/SaveListDocumentTemp",
            data: { idLayanan: $("#Id").val(), idDokumen: $("#IdDokumen").val() },
            beforeSend: function () { $(".loading").show(); },
            success: function (data) {
                $(".loading").hide();
                $('#table tbody').html(data);
                //$("#isIndex").prop("checked", false)
                //$("#ActionName").val("");
            },
            error: function (xhr, ajaxOptions, thrownError) {
                $(".loading").hide();
                alert(xhr.status);
                alert(thrownError);
                //$("#ActionName").val("")
                //$("#isIndex").prop("checked", false)
            }
        })
    }
});

function DeleteDocument(idDokumen) {
    $.ajax({
        type: "POST",
        url: "/MLayanan/DeleteListDocumentTemp",
        data: { idDokumen: idDokumen },
        beforeSend: function () { },
        success: function (data) {
            $(".loading").hide();
            $('#table tbody').html(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            //alert(xhr.status);
            alert(thrownError);
            $(".loading").hide();
        }
    })
}

function ClearSession() {
    $.ajax({
        type: "Get",
        url: "/MLayanan/ClearSession",
        dataType: "json",
        success: function (data) {
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });
}