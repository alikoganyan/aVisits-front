var DatatableRemoteAjaxDemo = function () {

    var t = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var t = $(".m_datatable").mDatatable({
                data: {
                    type: "remote",
                    source: {
                        read: {
                            url: "http://api.avisits.com/api/" + currentUser.chain.id + "/position_index?token=" + currentUser.token
                        }
                    },
                    pageSize: 10,
                    saveState: {cookie: !0, webstorage: !0},
                    serverPaging: !0,
                    serverFiltering: !0,
                    serverSorting: !0
                },
                layout: {theme: "default", class: "", scroll: !1, footer: !1},
                sortable: !0,
                filterable: !1,
                pagination: !0,
                columns: [
                    {
                        field: "id",
                        title: "#",
                        sortable: !1,
                        width: 40,
                        selector: !1,
                        textAlign: "center"
                    },
                    {
                        field: "title",
                        title: "Название",
                        filterable: !1,
                        width: 150
                    },
                    {
                        field: "description",
                        title: "Описание",
                        width: 300
                    },
                    {
                        field: "Actions",
                        width: 110,
                        title: "Actions",
                        sortable: !0,
                        overflow: "visible",
                        template: function (t) {
                            // console.log(t);
                            return '\t\t\t\t\t\t' +
                                '<a class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill position_edit" data-id=' + t.id + ' data-title=' + t.title + ' data-description=' + t.description + ' data data-target="#m_modal_5" data-toggle="modal" title="Edit details">\t\t\t\t\t\t\t' +
                                '<i class="la la-edit"></i>\t\t\t\t\t\t' +
                                '</a>\t\t\t\t\t\t' +
                                '<a href="javascript:void(0)"   class="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill position_delete" data-id=' + t.id + ' title="Delete">' +
                                '\t\t\t\t\t\t\t' +
                                '<i class="la la-trash"></i>\t\t\t\t\t\t' +
                                '</a>\t\t\t\t\t'
                        }
                    }]
            }),
            e = t.getDataSourceQuery();

        /* MODAL BUTTON HERE */
        $(document).on('click', '.add_position_button', function () {
            $("#m_modal_5 form input[name=id]").val('');
            $("#m_modal_5 form input[name=title]").val('');
            $("#m_modal_5 form textarea[name=description]").val('');

            $("#position_add").css('display', 'inline');
            $(".button_edit_send").css('display', 'none');
        });
            /* ADD HERE */
            $(document).on('click', '#position_add', function () {
                var name = $('#position_name').val();
                var description = $('#position_description').val();

                var url = "http://api.avisits.com/api/" + currentUser.chain.id + "/position?token=" + currentUser.token;


                $.ajax({
                    url: url,
                    type: 'POST',
                    data: {
                        title: name,
                        description: description
                    },
                    success: function (result) {
                        if (result.status == "OK") {
                            $('#m_modal_5').modal('hide');
                        }
                        t.load();
                    }
                });

            });

            /* EDIT HERE */
            $(document).on('click', '.position_edit', function () {
                $(".button_edit_send").css('display', 'inline');
                $("#position_add").css('display', 'none');

                $("#m_modal_5 form input[name=id]").val($(this).data('id'));
                $("#m_modal_5 form input[name=title]").val($(this).data('title'));
                $("#m_modal_5 form textarea[name=description]").val($(this).data('description'));

            });

            $(document).on('click', '.button_edit_send', function () {
                var id = $("#m_modal_5 form input[name=id]").val();
                var title = $("#m_modal_5 form input[name=title]").val();
                var description = $("#m_modal_5 form textarea[name=description]").val();
                var url = "http://api.avisits.com/api/" + currentUser.chain.id + "/position/" + id + "?token=" + currentUser.token;
                $.ajax({
                    url: url,
                    type: 'PUT',
                    data: {
                        title: title,
                        description: description
                    },
                    success: function (result) {
                        if (result.status == "OK") {
                            $('#m_modal_5').modal('hide');
                        }
                        t.load();
                    }
                });
            });

        /* DELETE HERE */
        $(document).on('click', '.position_delete', function (e) {
            var id = $(this).data('id');
            var url = "http://api.avisits.com/api/" + currentUser.chain.id + "/position/" + id + "?token=" + currentUser.token;
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function (result) {
                    t.load();
                }
            });
        }),

            $("#m_form_search").on("keyup", function (e) {
                var a = t.getDataSourceQuery();
                a.generalSearch = $(this).val().toLowerCase(), t.setDataSourceQuery(a), t.load()
            }).val(e.generalSearch),
            $("#m_form_status").on("change", function () {
                var e = t.getDataSourceQuery();
                e.Status = $(this).val().toLowerCase(), t.setDataSourceQuery(e), t.load()
            }).val(void 0 !== e.Status ? e.Status : ""),
            $("#m_form_type").on("change", function () {
                var e = t.getDataSourceQuery();
                e.Type = $(this).val().toLowerCase(), t.setDataSourceQuery(e), t.load()
            }).val(void 0 !== e.Type ? e.Type : ""),
            $("#m_form_status, #m_form_type").selectpicker()

    };
    return {
        init: function () {
            t()
        }
    }
}();
$(function () {
    DatatableRemoteAjaxDemo.init()
});


