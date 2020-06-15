var map;
var infoWindow;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: { lat: 44.4268, lng: 26.1025 },
        mapTypeId: 'hybrid'
    });

    // Define the LatLng coordinates for the polygon.
    var coordonate_sector1 = [
        { lat: 44.472189, lng: 25.981158 },
        { lat: 44.527531, lng: 26.029738 },
        { lat: 44.539401, lng: 26.104926 },
        { lat: 44.438185, lng: 26.103058 },
        { lat: 44.436654, lng: 26.073855 },
        { lat: 44.463369, lng: 26.041583 }
    ];

    // Construct the polygon.
    var sector1 = new google.maps.Polygon({
        paths: coordonate_sector1,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 5,
        fillColor: '#FF0000',
        fillOpacity: 0.5
    });

    var coordonate_sector2 = [
        { lat: 44.488355, lng: 26.104003 },
        { lat: 44.479207, lng: 26.182757 },
        { lat: 44.456053, lng: 26.156836 },
        { lat: 44.442696, lng: 26.196147 },
        { lat: 44.432278, lng: 26.150313 },
        { lat: 44.438185, lng: 26.103558 },
    ];

    var sector2 = new google.maps.Polygon({
        paths: coordonate_sector2,
        strokeColor: '#ffa500',
        strokeOpacity: 0.8,
        strokeWeight: 5,
        fillColor: '#ffa500',
        fillOpacity: 0.5
    });


    var coordonate_sector3 = [
        { lat: 44.430011, lng: 26.095201 },
        { lat: 44.434956, lng: 26.098119 },
        { lat: 44.438185, lng: 26.103558 },
        { lat: 44.432278, lng: 26.150313 },
        { lat: 44.433703, lng: 26.156733 },
        { lat: 44.442463, lng: 26.197151 },
        { lat: 44.431847, lng: 26.225299 },
        { lat: 44.407103, lng: 26.218082 },
        { lat: 44.395250, lng: 26.211733 },
        { lat: 44.393909, lng: 26.179110 },
        { lat: 44.408554, lng: 26.122959 },
        { lat: 44.425050, lng: 26.108091 },
        { lat: 44.425986, lng: 26.101130 },
        { lat: 44.431159, lng: 26.095166 }

    ];

    var sector3 = new google.maps.Polygon({
        paths: coordonate_sector3,
        strokeColor: '#008000',
        strokeOpacity: 0.8,
        strokeWeight: 5,
        fillColor: '#008000',
        fillOpacity: 0.5
    });


    var coordonate_sector4 = [
        { lat: 44.431159, lng: 26.095166 },
        { lat: 44.425986, lng: 26.101130 },
        { lat: 44.425050, lng: 26.108091 },
        { lat: 44.408554, lng: 26.122959 },
        { lat: 44.399423, lng: 26.159804 },
        { lat: 44.369661, lng: 26.143064 },
        { lat: 44.342074, lng: 26.165315 },
        { lat: 44.334482, lng: 26.151638 },
        { lat: 44.361051, lng: 26.095703 },
        { lat: 44.382502, lng: 26.083863 },
        { lat: 44.422172, lng: 26.088763 }
    ];

    var sector4 = new google.maps.Polygon({
        paths: coordonate_sector4,
        strokeColor: '#0000ff',
        strokeOpacity: 0.8,
        strokeWeight: 5,
        fillColor: '#0000ff',
        fillOpacity: 0.5
    });

    var coordonate_sector5 = [
        { lat: 44.438185, lng: 26.103558 },
        { lat: 44.431159, lng: 26.095166 },
        { lat: 44.422172, lng: 26.088763 },
        { lat: 44.382502, lng: 26.083863 },
        { lat: 44.361051, lng: 26.095703 },
        { lat: 44.375232, lng: 26.045196 },
        { lat: 44.406022, lng: 25.996444 },
        { lat: 44.414974, lng: 26.047256 }
    ];

    var sector5 = new google.maps.Polygon({
        paths: coordonate_sector5,
        strokeColor: '#4b0082',
        strokeOpacity: 0.8,
        strokeWeight: 5,
        fillColor: '#4b0082',
        fillOpacity: 0.5
    });


    var coordonate_sector6 = [
        { lat: 44.438185, lng: 26.103558 },
        { lat: 44.414974, lng: 26.047256 },
        { lat: 44.406022, lng: 25.996444 },
        { lat: 44.441052, lng: 25.965962 },
        { lat: 44.446567, lng: 26.019349 },
        { lat: 44.457106, lng: 26.013341 },
        { lat: 44.466785, lng: 25.976948 },
        { lat: 44.472189, lng: 25.981158 },
        { lat: 44.463109, lng: 26.040978 },
        { lat: 44.437214, lng: 26.073387 }



    ];

    var sector6 = new google.maps.Polygon({
        paths: coordonate_sector6,
        strokeColor: '#ee82ee',
        strokeOpacity: 0.8,
        strokeWeight: 5,
        fillColor: '#ee82ee',
        fillOpacity: 0.5
    });




    sector1.setMap(map);
    sector2.setMap(map);
    sector3.setMap(map);
    sector4.setMap(map);
    sector5.setMap(map);
    sector6.setMap(map);


    sector1.addListener('click', showArrays);
    sector2.addListener('click', showArrays);
    sector3.addListener('click', showArrays);
    sector4.addListener('click', showArrays);
    sector5.addListener('click', showArrays);
    sector6.addListener('click', showArrays);

    infoWindow = new google.maps.InfoWindow;
}

/** @this {google.maps.Polygon} */
function showArrays(event) {
    // Since this polygon has only one path, we can call getPath() to return the
    // MVCArray of LatLngs.
    var vertices = this.getPath();

    var contentString = '<b>Bucharest</b><br>' +
        'Clicked sector: <br>' + event.latLng.lat() + ',' + event.latLng.lng() +
        '<br>';

    // Iterate over the vertices.
    for (var i = 0; i < vertices.getLength(); i++) {
        var xy = vertices.getAt(i);
        contentString += '<br>' + 'Coordinate ' + i + ':<br>' + xy.lat() + ',' +
            xy.lng();
    }

    // Replace the info window's content and position.
    infoWindow.setContent(contentString);
    infoWindow.setPosition(event.latLng);
    infoWindow.open(map);

}

