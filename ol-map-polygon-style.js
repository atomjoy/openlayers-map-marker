/*
    Polygon color change
*/
var FillColor = 'rgba(71, 166, 255, 0.2)';
var LineColor = 'rgba(71, 166, 255, 1)';

var style = new ol.style.Style({
    fill: new ol.style.Fill({
        color: FillColor,
        weight: 1
    }),
    stroke: new ol.style.Stroke({
        color: LineColor,
        width: 2,
        lineDash: [5,10]
    }),
    image: new ol.style.Circle({
        radius: 5,
        fill: new ol.style.Fill({
            color: '#f30'
        })
    })
});
PolygonLayer.setStyle(style);