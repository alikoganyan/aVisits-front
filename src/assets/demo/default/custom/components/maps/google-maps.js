var GoogleMapsDemo = function () {
    var t = function () {
            new GMaps({div: "#m_gmap_1", lat: -12.043333, lng: -77.028333})
        }, n = function () {
            new GMaps({
                div: "#m_gmap_2", zoom: 16, lat: -12.043333, lng: -77.028333, click: function (t) {
                    alert("click")
                }, dragend: function (t) {
                    alert("dragend")
                }
            })
        }, o = function () {
            var t = new GMaps({div: "#m_gmap_3", lat: -51.38739, lng: -6.187181});
            t.addMarker({
                lat: -51.38739,
                lng: -6.187181,
                title: "Lima",
                details: {database_id: 42, author: "HPNeo"},
                click: function (t) {
                    console.log && console.log(t), alert("You clicked in this marker")
                }
            }), t.addMarker({
                lat: -12.042,
                lng: -77.028333,
                title: "Marker with InfoWindow",
                infoWindow: {content: '<span style="color:#000">HTML Content!</span>'}
            }), t.setZoom(5)
        }, e = function () {
            var t = new GMaps({div: "#m_gmap_4", lat: -12.043333, lng: -77.028333});
            GMaps.geolocate({
                success: function (n) {
                    t.setCenter(n.coords.latitude, n.coords.longitude)
                }, error: function (t) {
                    alert("Geolocation failed: " + t.message)
                }, not_supported: function () {
                    alert("Your browser does not support geolocation")
                }, always: function () {
                }
            })
        }, a = function () {
            var t = new GMaps({
                div: "#m_gmap_5", lat: -12.043333, lng: -77.028333, click: function (t) {
                    console.log(t)
                }
            });
            path = [[-12.044012922866312, -77.02470665341184], [-12.05449279282314, -77.03024273281858], [-12.055122327623378, -77.03039293652341], [-12.075917129727586, -77.02764635449216], [-12.07635776902266, -77.02792530422971], [-12.076819390363665, -77.02893381481931], [-12.088527520066453, -77.0241058385925], [-12.090814532191756, -77.02271108990476]], t.drawPolyline({
                path: path,
                strokeColor: "#131540",
                strokeOpacity: .6,
                strokeWeight: 6
            })
        }, l = function () {
            var t = [[-12.040397656836609, -77.03373871559225], [-12.040248585302038, -77.03993927003302], [-12.050047116528843, -77.02448169303511], [-12.044804866577001, -77.02154422636042]];
            new GMaps({div: "#m_gmap_6", lat: -12.043333, lng: -77.028333}).drawPolygon({
                paths: t,
                strokeColor: "#BBD8E9",
                strokeOpacity: 1,
                strokeWeight: 3,
                fillColor: "#BBD8E9",
                fillOpacity: .6
            })
        },
        i = function () {
            var t = new GMaps({div: "#m_gmap_7", lat: -12.043333, lng: -77.028333});
            $("#m_gmap_7_btn").click(function (n) {
                n.preventDefault(), mApp.scrollTo($(this), 400), t.travelRoute({
                    origin: [-12.044012922866312, -77.02470665341184],
                    destination: [-12.090814532191756, -77.02271108990476],
                    travelMode: "driving",
                    step: function (n) {
                        $("#m_gmap_7_routes").append("<li>" + n.instructions + "</li>"), $("#m_gmap_7_routes li:eq(" + n.step_number + ")").delay(800 * n.step_number).fadeIn(500, function () {
                            t.setCenter(n.end_location.lat(), n.end_location.lng()), t.drawPolyline({
                                path: n.path,
                                strokeColor: "#131540",
                                strokeOpacity: .6,
                                strokeWeight: 6
                            })
                        })
                    }
                })
            })
        },
        r = function () {
            var t = new GMaps({div: "#m_gmap_8", lat: -12.043333, lng: -77.028333}), n = function () {
                var n = $.trim($("#m_gmap_8_address").val());
                GMaps.geocode({
                    address: n, callback: function (n, o) {
                        if ("OK" == o) {
                            var e = n[0].geometry.location;
                            t.setCenter(e.lat(), e.lng()), t.addMarker({
                                lat: e.lat(),
                                lng: e.lng()
                            }), mApp.scrollTo($("#m_gmap_8"))
                        }
                    }
                })
            };
            $("#m_gmap_8_btn").click(function (t) {
                t.preventDefault(), n()
            }), $("#m_gmap_8_address").keypress(function (t) {
                "13" == (t.keyCode ? t.keyCode : t.which) && (t.preventDefault(), n())
            })
        };
    return {
        init: function () {
            t(), n(), o(), e(), a(), l(), i(), r()
        }
    }
}();
jQuery(document).ready(function () {
    GoogleMapsDemo.init()
});