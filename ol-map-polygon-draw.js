// global
var draw;

// Add draw to map
function addInteractions(value = 'Polygon', geometryFunction)
{
    if (value !== 'None')
    {
        // @type {ol.geom.GeometryType}
        // var geometryFunction = function(coordinates, geometry) {};
        var maxPoints = 100000;

        draw = new ol.interaction.Draw({
            source: Source,
            type: (value),
            geometryFunction: geometryFunction,
            maxPoints: maxPoints
        });
        map.addInteraction(draw);
    }else{
        console.log("Error draw value: Point, Polygon, LineString, Circle, Square, Box");
    }
}

// Remove draw from map
function removeInteractions()
{
    map.removeInteraction(draw);
}

// Callback does not works (delete)
function Geometry(coordinates, geometry)
{
    if (geometry == undefined)
    {
        geometry = new ol.geom.Polygon(null);
    }
    console.log("Polygon points: ", coordinates);
    return geometry;
};

// Allow draw polygon on map
addInteractions('Polygon');