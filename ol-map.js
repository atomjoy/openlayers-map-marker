// Center
var CenterPoint = [21.002902, 52.228850];

// Create map
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({ source: new ol.source.OSM() })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat(CenterPoint),
        maxZoom: 18,
        zoom: 7
    })
});