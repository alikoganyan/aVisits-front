var DropzoneDemo = function () {
    var e = function () {
        Dropzone.options.mDropzoneOne = {
            paramName: "img",
            maxFiles: 1,
            maxFilesize: 5,
            headers: {'content-Type' : undefined ,"Cache-Control":undefined},
            accept: function (e, o) {
                "justinbieber.jpg" == e.name ? o("Naha, you don't.") : o()
            }
        }, Dropzone.options.mDropzoneTwo = {
            paramName: "img", maxFiles: 10, maxFilesize: 10, accept: function (e, o) {
                "justinbieber.jpg" == e.name ? o("Naha, you don't.") : o()
            }
        }, Dropzone.options.mDropzoneThree = {
            paramName: "img",
            maxFiles: 10,
            maxFilesize: 10,
            acceptedFiles: "image/*,application/pdf,.psd",
            accept: function (e, o) {
                "justinbieber.jpg" == e.name ? o("Naha, you don't.") : o()
            }
        }
    };
    return {
        init: function () {
            e()
        }
    }
}();
DropzoneDemo.init();
