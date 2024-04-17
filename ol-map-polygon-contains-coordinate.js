var polygon = [[20.57, 53.30], [21.24, 53.30], [22.152810, 52.648142], [21.24, 52], [20.50, 52], [19.785212, 52.783446]];

/*
    Is coordinate in polygon
    var coordinate = [1,2]
    var polygon_points_array = [[20.57, 53.30], [21.24, 53.30], [22.152810, 52.648142], [21.24, 52], [20.50, 52], [19.785212, 52.783446]];
*/
function PointInPolygon(coordinate, polygon_points_array)
{
    var polygon = new ol.geom.Polygon([polygon_points_array]);
    var out = polygon.intersectsCoordinate(coordinate);
    return out;
}

if(PointInPolygon([21.002902, 52.22885], polygon))
{
    console.log("Marker in delivery area !!! (PointInPolygon)");
}

/*
    TestDeliveryArea
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

if(TestDeliveryArea([21.002902, 52.228850], polygon))
{
    console.log("Marker in delivery area !!! (TestDeliveryArea)");
}