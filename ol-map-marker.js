/*
    Create Icon
*/
var lon = 21.002902;
var lat = 52.228850;
var MarkerIcon = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat([lon,lat])),
    name: 'Marker text',
    desc: '<label>Details</label> <br> Latitude: ' + lat + ' Longitude: ' + lon
})
// Add icon style
MarkerIcon.setStyle(new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.5, 50],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'img/marker-64.png'
        // ,scale: 0.4
    })
}));

/*
    Create map source
*/
var MapSource = new ol.source.Vector({
    features: [
        MarkerIcon
    ]
})
// Create map layer
var MapLayer = new ol.layer.Vector({
    source: MapSource
});
// Set layer z-index
MapLayer.setZIndex(999);
// Add marker to layer
map.addLayer(MapLayer);

// Clear markers from source
// MapSource.clear();