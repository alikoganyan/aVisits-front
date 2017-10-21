var GoogleMapsDemo = function () {
    var r = function () {
        var map = new google.maps.Map(document.getElementById('m_edit-gmap_8'), {
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
            var address = document.getElementById('m_edit-gmap_8_address').value;
            geocoder.geocode({'address': address}, function (results, status) {
                if (status == 'OK') {
                    map.setCenter(results[0].geometry.location);
                    map.setZoom(17);
                    var myLatlng = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                    marker.setPosition(myLatlng);
                    $('#hidden_marker_latitude').val(results[0].geometry.location.lat());
                    $('#hidden_marker_longitude').val(results[0].geometry.location.lng());
                    for (var i in results[0].address_components) {
                        // console.log(results[0].address_components[i]);
                        if (results[0].address_components[i].types[0] == 'street_number') {
                            var street_number = results[0].address_components[i].long_name;
                            $('#hidden_googleMap_street_number').val(street_number);
                            // console.log(street_number);
                        }
                        else if (results[0].address_components[i].types[0] == 'route') {
                            var street = results[0].address_components[i].long_name;
                            $('#hidden_googleMap_street').val(street);
                            // console.log(street);
                        }
                        else if (results[0].address_components[i].types[0] == 'locality') {
                            var city = results[0].address_components[i].long_name;
                            $('#hidden_googleMap_city').val(city);
                            // console.log(city);
                        }
                        else if (results[0].address_components[i].types[0] == 'country') {
                            var country = results[0].address_components[i].long_name;
                            $('#hidden_googleMap_country').val(country);
                            // console.log(country);
                        }
                    }
                }
                else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
            marker.addListener('dragend', function (e) {
                $('#hidden_marker_latitude').val(e.latLng.lat());
                $('#hidden_marker_longitude').val(e.latLng.lng());
                address = e.latLng.lat() + ' ' + e.latLng.lng();
                geocoder.geocode({'address': address}, function (results, status) {
                    if (status == 'OK') {

                        $('#hidden_googleMap_street_number').val('');
                        $('#hidden_googleMap_street').val('');
                        $('#hidden_googleMap_city').val('');
                        $('#hidden_googleMap_country').val('');

                        map.setCenter(results[0].geometry.location);
                        map.setZoom(17);
                        var myLatlng = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                        marker.setPosition(myLatlng);
                        $('#hidden_marker_latitude').val(results[0].geometry.location.lat());
                        $('#hidden_marker_longitude').val(results[0].geometry.location.lng());
                        var street_number = '', street = '', city = '', country = '';
                        for (var i in results[0].address_components) {
                            // console.log(results[0].address_components[i]);
                            if (results[0].address_components[i].types[0] == 'street_number') {
                                street_number = results[0].address_components[i].long_name;

                                $('#hidden_googleMap_street_number').val(street_number);
                                // console.log(street_number);
                            }
                            else if (results[0].address_components[i].types[0] == 'route') {
                                street = results[0].address_components[i].long_name;
                                $('#hidden_googleMap_street').val(street);
                                // console.log(street);
                            }
                            else if (results[0].address_components[i].types[0] == 'locality') {
                                city = results[0].address_components[i].long_name;
                                $('#hidden_googleMap_city').val(city);
                                // console.log(city);
                            }
                            else if (results[0].address_components[i].types[0] == 'country') {
                                country = results[0].address_components[i].long_name;
                                $('#hidden_googleMap_country').val(country);
                                // console.log(country);
                            }
                        }
                        $('#m_edit-gmap_8_address').val(street_number + ' ' + street + ' ' + city + ' ' + country)
                    }
                    else {
                        alert('Geocode was not successful for the following reason: ' + status);
                    }
                });
            });
        }


        $("#m_edit-gmap_8_btn").click(function (t) {
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