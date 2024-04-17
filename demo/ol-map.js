// Polygon
var polygon_points = [[20.922006711063837,51.43669800424428],[19.733289867618534,52.20726906566372],[19.414365836450276,52.570004719533785],[19.71879332074725,53.13028210472103],[20.67556541425201,53.32986826845254],[21.0524756329054,53.06064262010884],[21.50186858591521,53.29522444847305],[22.48763377316254,53.025780599876015],[22.661592335617947,52.47297790597722],[22.05273736702401,51.96676446116692],[20.922006711063837,51.43669800424428]];

// Center coordinates
var Point = [21.002902, 52.228850];

// Marker coordinates
var Lon = Point[0];
var Lat = Point[1];

// Create map
var Map = CreateMap(Point);

// Create markers
CreateMarker(Lon, Lat, 'Cool marker', PopupHtml(Lon, Lat), '/img/marker-64.png');

// Show popup on click
ShowPopup();

// Show polygon
CreatePolygon(polygon_points);

// Test point in area
if(PointInPolygon([21.002902, 52.22885], polygon_points))
{
    console.log("Marker in delivery area (polygon) !!!");
}

/*
    FUNCTIONS DO NOT CHANGE
*/

/*
    Create Map
*/
function CreateMap(coordinate, zoom = 7, max_zoom = 18, div_id = 'map')
{
    var TileLayer = new ol.layer.Tile({ source: new ol.source.OSM() });

    return new ol.Map({
        target: div_id,
        layers: [ TileLayer ],
        view: new ol.View({
            center: ol.proj.fromLonLat(coordinate),
            maxZoom: max_zoom,
            zoom: zoom
        })
    })
}

/*
    Marker
*/
function PopupHtml(lon, lat)
{
    return '<label>Details</label> <br> Latitude: ' + lat + ' Longitude: ' + lon;
}

function CreateMarker(lon, lat, popup_title, popup_html, marker_image = '/img/marker-64.png', marker_scale = 1)
{
    var Icon = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([lon,lat])),
        name: popup_title,
        desc: popup_html
    })

    Icon.setStyle(new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 50],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: marker_image,
            scale: marker_scale
        })
    }))

    var Source = new ol.source.Vector({ features: [ Icon ] })
    var Layer = new ol.layer.Vector({ source: Source });
    Layer.setZIndex(999);
    Map.addLayer(Layer);

    return Source;
}

/*
    Show popup
*/
function ShowPopup()
{
    var popup_div = document.getElementById('ol-popup');

    var popup = new ol.Overlay({
        element: popup_div,
        autoPan: true,
        autoPanAnimation: {
            duration: 250
        }
    });

    popup.setPosition(undefined); // Hide overlay with popup

    Map.addOverlay(popup);

    var selected = null;

    // Hover
    // map.on('pointermove', function (evt) {
    // Double click
    // map.on('dblclick', function (evt) {
    // Click
    Map.on('click', function (evt) {

        var feature = Map.forEachFeatureAtPixel(evt.pixel, function (f, layer) {
            selected = f;
            return f;
        });

        if (Map.hasFeatureAtPixel(evt.pixel) === true)
        {
            // Click position
            var coordinate = evt.coordinate;
            popup.setPosition(coordinate);

            // Get marker description
            popup_div.innerHTML = feature.get('desc');

            // Marker on top
            // MarkerOnTop(feature, true);
        }
        else
        {
            selected = null;
            popup.setPosition(undefined);

            // Popups source Hide markers zindex 999
            // Source.getFeatures().forEach((f) => {
            //     MarkerOnTop(f, false);
            // });
        }
        console.log("Marker clicked/hovered !!!");
    });
}

/*
    Hide popup
*/
function HidePopup(popup)
{
    popup.setPosition(undefined);
}

/*
    Set popup position
*/
function PopupPosition(lon, lat, popup)
{
    popup.setPosition(ol.proj.fromLonLat([lon, lat]));
}

/*
    Move marker to top
*/
function MarkerOnTop(feature, show = false)
{
    if(style != null){
        var style = feature.getStyle();
        if(show){
            style.zIndex = 9999;
            style.zIndex_ = 9999;
        }else{
            style.zIndex = 999;
            style.zIndex_ = 999;
        }
        feature.setStyle(style);
    }
}

/*
    Polygon
*/
function CreatePolygon(poly)
{
    var polygon = new ol.geom.Polygon([poly]);
    var feature = new ol.Feature({
        geometry: polygon.transform('EPSG:4326', 'EPSG:3857'),
        name: 'Delivery area',
        desc: 'Delivery area'
    });

    var PolygonSource = new ol.source.Vector();
    PolygonSource.addFeature(feature);

    var PolygonLayer = new ol.layer.Vector({
        source: PolygonSource
    });

    var style = new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(0, 166, 255, 0.1)',
            weight: 1
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(71, 166, 255, 1)',
            width: 2,
            // lineDash: [3,6,9]
        })
    });

    PolygonLayer.setStyle(style);
    PolygonLayer.setZIndex(1);
    Map.addLayer(PolygonLayer);
}

/*
    Test delivery area coordinates
    var coordinate = [21.002902, 52.22885]
    var polygon_points = [[20.57, 53.30], [21.24, 53.30], [22.152810, 52.648142], [21.24, 52], [20.50, 52], [19.785212, 52.783446]];
*/
function PointInPolygon(coordinate, polygon_points_array)
{
    var polygon = new ol.geom.Polygon([polygon_points_array]);
    var out = polygon.intersectsCoordinate(coordinate);
    return out;
}