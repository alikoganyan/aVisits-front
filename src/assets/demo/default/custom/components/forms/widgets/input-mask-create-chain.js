var Inputmask = function () {
    var a = function () {
            $("#m_inputmask-create-chain_3").inputmask("mask", {mask: "+7 (999) 999-99-99"})
    };
    return {
        init: function () {
            a()
        }
    }
}();
jQuery(document).ready(function () {
    Inputmask.init()
});