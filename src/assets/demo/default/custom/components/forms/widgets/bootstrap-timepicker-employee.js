var BootstrapTimepicker = function () {
    var e = function () {
        for (var i = 0; i <= 6; ++i) {
            $("#m_timepicker_start_" + i).timepicker({
                defaultTime: "10:00",
                minuteStep: 15,
                disableFocus: !0,
                showMeridian: !1,
            }),
                $("#m_timepicker_end_" + i).timepicker({
                    defaultTime: "19:00",
                    minuteStep: 15,
                    showMeridian: !1,
                })
        }
    };
    return {
        init: function () {
            e();
        }
    }
}();
jQuery(document).ready(function () {
    BootstrapTimepicker.init()
});
