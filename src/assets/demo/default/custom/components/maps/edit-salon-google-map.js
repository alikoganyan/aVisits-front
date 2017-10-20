var GoogleMapsDemo = function () {
    var r = function () {
        var map = new google.maps.Map(document.getElementById('m_gmap_8'), {
            zoom: 13,
            center: {lat: 59.327, lng: 18.067}
        });
        var geocoder = new google.maps.Geocoder();
        var marker = new google.maps.Marker({
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: {lat: 59.327, lng: 18.067}
        });

        function codeAddress() {
            var address = document.getElementById('m_gmap_8_address').value;
            geocoder.geocode({'address': address}, function (results, status) {
                if (status == 'OK') {
                    map.setCenter(results[0].geometry.location);
                    map.setZoom(17);
                    var myLatlng = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                    marker.setPosition(myLatlng);
                }
                else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
            marker.addListener('dragend', function (e) {
                console.log(e.latLng.lat(), e.latLng.lng());
            });
        }


        $("#m_gmap_8_btn").click(function (t) {
            t.preventDefault();
            codeAddress();
        });
    };
    return {
        init: function () {
            r()
        }
    }
}();
jQuery(document).ready(function () {
    GoogleMapsDemo.init()
});