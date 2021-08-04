$.fn.dataTable.ext.errMode = 'none';
function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, function (m) { return map[m]; });
}

var lookup = {
    customTable: (options) => {
        options = $.extend({
            ordering: true,
            paging: true,
            responsive: false,
            addClass: "",
            removeClass: "",
            pageLength: 100,
            lengthChange: true,
            countList: 50,
            scrollY: false,
            scrollX: false,
            scrollCollapse: false,
            bFilter: true,
            bInfo: true,
            //lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "all"]],
            lengthMenu : [[100, 500, 1000, -1], [100, 500, 1000, "all"]],
            fixedColumn: false,
            fixedLeftColumns: 0,
            fixedRightColumns: 0,
            info: false
        }, options);

        if (options.countList >= 100) {
            options.lengthMenu = [[1000, 2500, 5000, -1], [1000, 2500, 5000, "all"]];
            options.pageLength = 100;
            //options.scrollY = "60vh";
        }

        if (options.info) {
            options.info = "Showing _TOTAL_ record(s)";
        }
        else {
            options.info = " ";
        }

        var fixColumngChild = false;
        if (options.fixedColumn) {
            fixColumngChild = {
                leftColumns: options.fixedLeftColumns,
                rightColumns: options.fixedRightColumns
            };
        }

        $('table.custom-table').dataTable({
            responsive: options.responsive,
            ordering: options.ordering,
            paging: options.paging,
            pageLength: options.pageLength,
            lengthChange: options.lengthChange,
            scrollY: options.scrollY,
            scrollX: options.scrollX,
            scrollCollapse: options.scrollCollapse,
            bFilter: options.bFilter,
            bInfo: options.bInfo,
            lengthMenu: options.lengthMenu,
            fixedColumns: fixColumngChild,
            language: {
                info: options.info
            }
        });

        $('table.custom-table')
            .addClass("table table-responsive table-bordered table-striped")
            .addClass(options.addClass)
            .removeClass(options.removeClass);
    },
    editForm: (url, id) => {
        $(".loading").show();
        $.ajaxSetup({ cache: false });
        $("#MyModalContent").load(url + id, function () {
            $(".loading").hide();
            $("#MyModal").modal({
                keyboard: false
            }, 'show');
            bindForm(this);
        });
        return false;
    },
    alertSuccess: (message, url) => {
        $.confirm({
            title: 'Success!',
            content: message,
            type: 'green',
            typeAnimated: true,
            closeIcon: false,
            closeIconClass: 'fa fa-close',
            buttons: {
                close: function () {
                    if ((url === undefined) || (url == '')) {
                        $('.loading').hide();
                    } else {
                        window.location.href = url;
                    }
                }
            }
        });
    },
    alertError: (message, url, title, status) => {        
        if (title == undefined || title == "") {
            title = "Information!";
        }

        if (status == undefined || status == "") {
            status = 0;
        }
        var color = 'blue';
        switch (status) {
            case 0:
                color = 'blue';
                //button = 'btn-red';
                break;
            case 1:
                color = 'blue';
                //button = 'btn-blue';
                break;
            case 2:
                color = 'yellow';
                //button = 'btn-blue';
                break;
            default:
                title = 'Information!';
                color = 'default';
                break;
        }

        $.confirm({
            title: title,
            content: message,
            type: color,
            typeAnimated: true,
            closeIcon: false,
            closeIconClass: 'fa fa-close',
            buttons: {
                close: function () {
                    if ((url === undefined) || (url == '')) {
                        $('.loading').hide();
                    } else {
                        window.location.href = url;
                    }
                }
            }
        });
    },
    alertWarning: (message, url) => {
        $.confirm({
            title: 'Warning!',
            content: message,
            type: 'yellow',
            typeAnimated: true,
            closeIcon: false,
            closeIconClass: 'fa fa-close',
            buttons: {
                close: function () {
                    if ((url === undefined) || (url == '')) {
                        $('.loading').hide();
                    } else {
                        window.location.href = url;
                    }
                }
            }
        });
    },
    alertErrorManualClose: (message, url) => {
        $.confirm({
            title: 'Alert!',
            content: message,
            type: 'red',
            typeAnimated: true,
            closeIcon: false,
            closeIconClass: 'fa fa-close',
            buttons: {
                close: function () {
                    if ((url === undefined) || (url == '')) {
                        $('.loading').hide();
                    } else {
                        window.location.href = url;
                    }
                }
            }
        });
    },
    alertErrorWithTitle: (title, message, url) => {
        $.confirm({
            title: title,
            content: message,
            type: 'red',
            typeAnimated: true,
            closeIcon: false,
            closeIconClass: 'fa fa-close',
            buttons: {
                close: function () {
                    if ((url === undefined) || (url == '')) {
                        $('.loading').hide();
                    } else {
                        window.location.href = url;
                    }
                }
            }
        });
    },
    validateMaxFileSize: function (input) {
        var _size = input.size;
        var fSExt = new Array('Bytes', 'KB', 'MB', 'GB'),
            i = 0; while (_size > 900) { _size /= 1024; i++; }
        var exactSize = (Math.round(_size * 100) / 100) + ';' + fSExt[i];
        var arrFile = exactSize.split(';');
        var result = true;
        switch (arrFile[1]) {
            case "KB":
                result = false;
                break;
            case "MB":
                var fileSize = parseInt(arrFile[0]);
                if (fileSize > 1) { // set max size
                    result = true;
                }
                break;
            default:
                result = true;
                break;
        }

        if (result) {
            input.value = "";
        }

        return result;
    }
};