/*
    Popup Overlay
*/
var div    = document.getElementById('ol-popup');
var close    = document.getElementById('close');
var content  = document.getElementById('content');

var popup = new ol.Overlay({
    element: div,
    autoPan: true,
    autoPanAnimation: {
        duration: 250
    }
});

// Hide overlay
popup.setPosition(undefined);

// Show overlay
//popup.setPosition(ol.proj.fromLonLat([0, 0]));

map.addOverlay(popup);

// Close/hide overlay popup
close.onclick = function() {
    popup.setPosition(undefined);
    close.blur();
    return false;
};

// On click
map.on('singleclick', function (evt) {
    // Show popup on marker click
    var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
        return feature;
    });

    // Show popup on marker click
    if (map.hasFeatureAtPixel(evt.pixel) === true)
    {
        var coordinate = evt.coordinate;
        popup.setPosition(coordinate);
        // Get marker description
        content.innerHTML = feature.get('desc');
    } else {
        popup.setPosition(undefined);
        close.blur();
    }
    console.log("Marker clicked/hovered !!!");
});

// Hover popup
// map.on('pointermove', function (evt) {
//     // Show popup on marker click
//     var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
//         return feature;
//     });
//     if (map.hasFeatureAtPixel(evt.pixel) === true)
//     {
//         var coordinate = evt.coordinate;
//         popup.setPosition(coordinate);
//         // Get marker description
//         content.innerHTML = feature.get('desc');

//         console.log("Marker clicked/hovered !!! Type: ", feature.get('desc'));
//     } else {
//         popup.setPosition(undefined);
//         close.blur();
//     }
// });