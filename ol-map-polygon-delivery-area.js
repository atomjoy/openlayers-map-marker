/*
    Polygon
*/
var poly = [[20.57, 53.30], [21.24, 53.30], [22.152810, 52.648142], [21.24, 52], [20.50, 52], [19.785212, 52.783446]];

var polygon = new ol.geom.Polygon([poly]);
polygon.transform('EPSG:4326', 'EPSG:3857');

// polygon.applyTransform(ol.proj.getTransform('EPSG:4326', 'EPSG:3857'))
var feature = new ol.Feature(polygon);

// Create vector source and the feature to it.
var PolygonSource = new ol.source.Vector();
PolygonSource.addFeature(feature);

// Create vector layer attached to the vector source.
var PolygonLayer = new ol.layer.Vector({
    source: PolygonSource
});

// Polygon color
var style = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(71, 166, 255, 0.1)',
        weight: 1
    }),
    stroke: new ol.style.Stroke({
        color: 'rgba(71, 166, 255, 1)',
        width: 2,
        lineDash: [3,6,9]
    })
});
PolygonLayer.setStyle(style);

// Layer z-index
PolygonLayer.setZIndex(1);

// Add the vector layer to the map.
map.addLayer(PolygonLayer);


/*
    Test js point in poligon
*/
function TestDeliveryArea(point, vs)
{
    var x = point[0], y = point[1];
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
};

if(TestDeliveryArea([21.002902, 52.228850], poly))
{
    console.log("Marker in delivery area (polygon) !!!");
}

/*
    Is coordinate in polygon
    var coordinate = [1,2]
    var polygon_points_array = [[20.57, 53.30], [21.24, 53.30], [22.152810, 52.648142], [21.24, 52], [20.50, 52], [19.785212, 52.783446]];
*/
function PointInPolygon(polygon_points_array, coordinate)
{
    var polygon = new ol.geom.Polygon([polygon_points_array]);
    var out = polygon.intersectsCoordinate(coordinate);

    console.log("Polygon in area: ", out);
    return out;
}

PointInPolygon(poly, [21.002902, 52.22885]);