// Change canvas to grayscale
map.on('postcompose',function(e){
    document.querySelector('canvas').style.filter="grayscale(70%)";
});

// Change default OSM
var OsmLayer = new ol.layer.Tile({ source: new ol.source.OSM() });

// To Light
var OsmLayerLight = new ol.layer.Tile({
    source: new ol.source.OSM({
        "url" : "http://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
    }),
    opacity: 1,
    brightness: 0.8
});


// Map pixel color change
var raster = new ol.source.Raster({
        sources: [new ol.source.Stamen({
        layer: 'watercolor'
    })],
    operation: function(pixels, data) {
        // convert pixels to grayscale here
        return pixels;
    }
});