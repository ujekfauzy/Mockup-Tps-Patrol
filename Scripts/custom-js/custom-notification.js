var registerTask = 0, violationTask = 0, roomTask = 0;
$(document).ready(function () {
    st.getSummaryTask();
    setInterval(st.getSummaryTask(), 60000);
});
var st = {
    getSummaryTask: () => {
        $.ajax({
            url: '/Dashboard/GetSummaryTask',
            type: 'POST',
            dataType: 'JSON',
            success: function (e) {
                if (e !== undefined && e !== null) {
                    st.getNotification(e);
                    st.getDashboardTask(e);
                    st.getTableTask(e);
                }
            }
        });
    },
    getNotification: (e) => {
        var sum = 0;
        var menuli = "";
        if (e.data) {
            for (var i = 0; i < e.summary.length; i++) {
                var componentLi = `<li>
                                  <a href="`+ e.summary[i].Tag[1] + `" target="_self">
                                      <i class="`+ e.summary[i].Tag[2] + ` ` + e.summary[i].Tag[3] + `"></i><b>` + e.summary[i].Total + `</b> ` + e.summary[i].Tag[0] + ` Task Approval
                                  </a>
                              </li>`;
                sum = sum + parseInt(e.summary[i].Total);
                menuli = menuli.concat(componentLi);
            }
        }
        st.updateNotification(sum, menuli);
    },
    updateNotification: (sumnotification, menuli) => {
        $('span#sum-notification').html('');
        var boxNotification = document.getElementById('sum-notification');
        if (sumnotification > 0) {
            boxNotification.classList.remove('label-danger');
            boxNotification.classList.add('label-danger');
            boxNotification.appendChild(document.createTextNode(sumnotification));
        } else {
            boxNotification.classList.remove('label-danger');
            boxNotification.classList.add('label-default');
            boxNotification.appendChild(document.createTextNode(''));
        }
        var messageNotification = sumnotification + " New Message Notification";
        $('#message-notification').html('');
        var messageBoxNotification = document.getElementById('message-notification');
        messageBoxNotification.appendChild(document.createTextNode(messageNotification));
        $('ul#ul-notif').html('');
        $('ul#ul-notif').append(menuli);
    },
    getDashboardTask: (e) => {
        const divTarget = document.getElementById('target-box');
        if (divTarget !== null) {
            divTarget.innerHTML = "";
            if (e.data) {
                for (var i = 0; i < e.summary.length; i++) {
                    var componentBox = `<div class="col-lg-3 col-6">
                                                <div class="small-box ${e.summary[i].Tag[4]}">
                                                    <div class="inner">
                                                        <h3>${e.summary[i].Total}</h3>
                                                        <p>${e.summary[i].Tag[0]}</p>
                                                    </div>
                                                    <div class="icon">
                                                        <i class="ion ${e.summary[i].Tag[5]}"></i>
                                                    </div>
                                                    <a href="${e.summary[i].Tag[1]}" class="small-box-footer">Show detail&nbsp;&nbsp;&nbsp;<i class="fa fa-arrow-circle-right"></i></a>
                                                </div>
                                            </div>`;
                    $(divTarget).append(componentBox);
                }
            }
        }

    },
    getTableTask: (e) => {
        const divTarget = document.getElementById('target-table');
        if (divTarget !== null) {
            divTarget.innerHTML = "";
            if (e.data) {
                var componentTable = `<div class="row"><div class="col-md-12"><div class="box box-success"><div class="box-header with-border"><h3 class="box-title">Task List</h3>
                        <div class="box-tools pull-right"></div></div><div class="box-body"><table id="tbl-task" class="table custom-table" width="100%">
                            <thead><tr class="bg-blue-gradient"><th width="5%">#</th><th>Task</th><th>Number</th><th>Action</th></tr></thead><tbody>`;
                for (var i = 0; i < e.summary.length; i++) {
                    componentTable += `<tr>
                                    <td>${i}</td>
                                    <td>${e.summary[i].Tag[0]}</td>
                                    <td>${e.summary[i].Total}</td>
                                    <td>
                                        <a href="${e.summary[i].Tag[1]}" class="btn btn-warning btn-xs">Show detail&nbsp;&nbsp;&nbsp;<i class="fa fa-arrow-circle-right"></i></a>
                                    </td>
                    </tr>`
                }
                componentTable += `</tbody></table></div></div></div></div>`;
                $(divTarget).append(componentTable);
            }
        }
    }
}