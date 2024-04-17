/*
    Functions
    https://nominatim.openstreetmap.org/search?q=Warszaw&format=json
*/

// Get address from location
function ReverseGeocoding(lon, lat) {
    fetch('https://nominatim.openstreetmap.org/reverse?format=json&lon=' + lon + '&lat=' + lat).then(function(response) {
        return response.json();
    }).then(function(json) {
        console.log(json);
        if(json != undefined){
            // document.getElementById('address').innerHTML = json.display_name;
        }
    })
}

// Get location from address
function LocationGeocoding(address) {
    fetch('https://nominatim.openstreetmap.org/search?q=' + address + '&format=json').then(function(response) {
        console.log("Geocoding response :: ", response);
        return response.json();
    }).then(function(json) {
        if(json != undefined){
            // document.getElementById('location').innerHTML = json[0].lat + ' ' + json[0].lon;
            var obj = json[0];
            console.log(obj);
            console.log(obj.lat, obj.lon);
            SetMarker(obj);
        }
    })
}

function getLatLng(e){
    console.log(e.value);
    LocationGeocoding(e.value);
}

function getLatLngClick(e){
    var e = document.getElementById("address");
    console.log(e.value);
    LocationGeocoding(e.value);
}

function PointToLonLat(evt)
{
    var coordinate = ol.proj.toLonLat(evt.coordinate).map(function(val) {
        return val.toFixed(6);
    });
    console.log("Coordinates: ", coordinate, evt.coordinate);
    var lon = document.getElementById('lon').value = coordinate[0];
    var lat = document.getElementById('lat').value = coordinate[1];
    console.log("Coordinates Lon Lat: ", lon, lat);
    return coordinate;
}

function CenterMap(long, lat, zoom = 5)
{
    console.log("New position Long: " + long + " Lat: " + lat);
    map.getView().setCenter(ol.proj.transform([long, lat], 'EPSG:4326', 'EPSG:3857'));
    map.getView().setZoom(zoom);
}

function SimpleMarker(lon, lat)
{
    var layer = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [
                new ol.Feature({
                    geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat]))
                })
            ]
        })
    });
    map.addLayer(layer);
}

function SetMarker(evt)
{
    // clear
    MapSource.clear();
    var feature = new ol.Feature({
        // Object
        geometry: new ol.geom.Point(ol.proj.fromLonLat([evt.lon, evt.lat])),
        // Event
        //geometry: new ol.geom.Point(evt.coordinate)
        name: 'Marker text',
        desc: '<label>Details</label> <br> Latitude: ' + evt.lat + ' Longitude: ' + evt.lon
    });
    feature.setStyle(iconStyle);
    MapSource.addFeature(feature);
    // Center
    CenterMap(evt.lon, evt.lat);
    // Set div
    SetDivLonLat(evt.lon, evt.lat);

}

function SetDivLonLat(lon,lat)
{
    var loc = document.getElementById('location');
    loc.value = lon + ',' + lat;
    console.log(loc, lon, lat);
}

function PopUp(lon, lat)
{
    var location = new ol.geom.Point(lon, lat).transform('EPSG:4326', 'EPSG:3857');

    var container = document.getElementById('map-popup');
    var content = document.getElementById('popup-content');
    var closer = document.getElementById('popup-closer');

    var overlay = new ol.Overlay({
        element: container,
        autoPan: true,
        autoPanAnimation: {
            duration: 250
        }
    });
    overlay.setPosition(ol.proj.fromLonLat([lon, lat]));
    map.addOverlay(overlay);

    closer.onclick = function() {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
    };
}

// Show marker
function MarkerOnTop(feature, show = false)
{
    var style = feature.getStyle();
    if(show){
        style.zIndex = 9999;
        style.zIndex_ = 9999;
    }else{
        style.zIndex = 999;
        style.zIndex_ = 999;
    }
    console.log(style);
    feature.setStyle(style);
}

// Animate marker from faeture
function AnimatePoint(feature, distance = 50, speed = 5)
{
    console.log("Geometry: ", feature.getGeometry().getCoordinates());
    // var point = new ol.geom.Point(ol.proj.fromLonLat([evt.lon, evt.lat]));
    // Coordinates
    var c = feature.getGeometry().getCoordinates();
    var start = c[1];
    var end = start + distance;
    var curr = start;
    var up = true;

    window.setInterval(() => {
        if(up == true)
        {
            curr = curr + speed;
            var pos = [c[0], curr];
            // console.log("Current: ", pos);
            feature.getGeometry().setCoordinates(pos);
            if(curr > end)
            {
                up = false;
            }
        }else{
            curr = curr - speed;
            var pos = [c[0], curr];
            // console.log("Current: ", pos);
            feature.getGeometry().setCoordinates(pos);
            if(curr < start)
            {
                up = true;
            }
        }
    }, 35);
}