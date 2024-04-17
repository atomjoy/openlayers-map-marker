/*
    Create marker icon
*/
var iconStyle = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.5, 50],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 0.75,
        src: 'img/marker-64.png'
    }),
    text: new ol.style.Text({
        font: '12px Arial',
        fill: new ol.style.Fill({ color: '#000' }),
        stroke: new ol.style.Stroke({
            color: '#fff', width: 2
        }),
        text: 'New marker text'
    })
});

/*
    Events
*/
map.on('dblclick', function(evt)
// map.on('singleclick', function(evt)
{
    var coordinatePretty = ol.coordinate.toStringHDMS(ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326'), 2);
    var coordinate = ol.proj.toLonLat(evt.coordinate);

    console.log("Clicked at position: ", coordinatePretty, coordinate);
    console.log("Clicked at position: ", evt.coordinate);

    // Clear markers source
    MapSource.clear();

    // Add point
    var f = new ol.Feature({
        // From lon, lat
        // new ol.geom.Point(ol.proj.fromLonLat([4.35247, 50.84673])),
        // From event
        geometry: new ol.geom.Point(evt.coordinate),
        name: 'Marker text',
        desc: '<label>Details</label> <br> Latitude: ' + coordinate[1].toFixed(6) + ' Longitude: ' + coordinate[0].toFixed(6)
    });
    f.setStyle(iconStyle);

    // Add to source
    MapSource.addFeature(f);

    // Animate marker position
    AnimatePoint(f);

    // Set div coordinates
    SetDivLonLat(coordinate[0].toFixed(6), coordinate[1].toFixed(6));

    // Get lon, lat
    // var coordinate = PointToLonLat(evt);
    // Show popup
    // PopUp(coordinate[0], coordinate[1]);
});