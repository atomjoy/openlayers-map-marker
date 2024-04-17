var straitSource = new ol.source.Vector({ wrapX: true });
var straitsLayer = new ol.layer.Vector({
    source: straitSource
});

var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        }),
        straitsLayer
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([21.002902, 52.228850]),
        maxZoom: 18,
        zoom: 2
    })
});

// Popup showing the position the hovered marker
var container = document.getElementById('popup');
var popup = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 450
    }
});
map.addOverlay(popup);

// Popup showing the position the user clicked
var containerClick = document.getElementById('popupClick');
var popupClick = new ol.Overlay({
    element: containerClick,
    autoPan: true,
    autoPanAnimation: {
        duration: 250
    }
});
map.addOverlay(popupClick);

// Popup part
var content = document.getElementById('popup-content');
var contentClick = document.getElementById('popup-content-click');
var selected = null;

// Hover popup
map.on('pointermove', function (evt)
{
    var feature = map.forEachFeatureAtPixel(evt.pixel, function (feat, layer) {
        return feat;
    });
    if (map.hasFeatureAtPixel(evt.pixel) === true)
    {
        if(selected != feature)
        {
            // Event coordinates
            // popup.setPosition(evt.coordinate);
            // Lon Lat coordinates
            var postion = ol.proj.transform([feature.get('lon'),feature.get('lat')], 'EPSG:4326', 'EPSG:3857');
            content.innerHTML = feature.get('desc');
            // Show marker on top
            MarkerOnTop(feature, true);
            // Show popup
            popup.setPosition(postion);
        }
    }
    else
    {
        straitSource.getFeatures().forEach((f) => {
            // Hide markers zindex 999
            MarkerOnTop(f, false);
        });
        // Hide popup
        popup.setPosition(undefined);
    }

});

// Click popup
map.on('click', function (evt)
{
    var feature = map.forEachFeatureAtPixel(evt.pixel, function (feat, layer) {
        selected = feat;
        return feat;
    });
    if (map.hasFeatureAtPixel(evt.pixel) === true)
    {
        // Event coordinates
        // popup.setPosition(evt.coordinate);
        // Lon Lat coordinates
        var postion = ol.proj.transform([feature.get('lon'),feature.get('lat')], 'EPSG:4326', 'EPSG:3857');
        contentClick.innerHTML = feature.get('desc');
        // Show marker on top
        MarkerOnTop(feature, true);
        // Show Popup
        popupClick.setPosition(postion);
    }
    else
    {
        selected = null;
         // Hide markers zindex 999
        straitSource.getFeatures().forEach((f) => {
            MarkerOnTop(f, false);
        });
        popupClick.setPosition(undefined);
    }
});

// Show marker on top
function MarkerOnTop(feature, show = false)
{
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

// Popup content
function ToolTip(desc)
{
    var html = '';
    desc.forEach((i) => {
        html += '<div class="ol-tooltip">'+
            '<img src="'+i.img+'">' +
            '<div class="info">'+
                '<div class="ol-tooltip-job"> <a href="'+i.link+'"> '+i.job+' </a> </div>'+
                '<div class="ol-tooltip-salary">'+i.salary+'</div>'+
                '<div class="ol-tooltip-company">'+i.name+'</div>'+
            '</div>'+
        '</div>';
    });
    return html;
}

// Data from database here :)
var data = [{"Lon":20.423771205611732,"Lat":51.31230630628479, "Icon": "img/icons/icon-cpp.png", "Desc": [{"img": "img/icons/icon-star.png", "link": "http://woo.xx", "name": "Microsoft Sp.z.o.o", "salary": "10K - 15k PLN", "job": "C++ Programmer"},{"img": "img/icons/icon-star.png", "link": "http://woo.xx", "name": "Microsoft Sp.z.o.o", "salary": "6K - 15k PLN", "job": "Backend Developer"}]},
{"Lon":138.83696330321376,"Lat":34.82803186343469, "Icon": "img/icons/icon-js.png", "Desc": [{"img": "img/icons/icon-star.png", "link": "http://woo.xx", "name": "Aliance Forever Sp.z.o.o", "salary": "9K - 15k PLN", "job": "Js Developer"}]},
{"Lon":-40.44607585856028,"Lat":-7.328655246981256, "Icon": "img/icons/icon-coin.png", "Desc": [{"img": "img/icons/icon-coin.png", "link": "http://woo.xx", "name": "BitcoinMine Sp.z.o.o", "salary": "11K - 15k PLN", "job": "Bitcoin Developer"}]},
{"Lon":-83.26297726701098,"Lat":32.45260163332322, "Icon": "img/icons/icon-php.png", "Desc": [{"img": "img/icons/icon-star.png", "link": "http://woo.xx", "name": "Comercial Zoo Sp.z.o.o", "salary": "7000 - 9000 PLN", "job": "Php Developer"}]},
{"Lon":-120.9344508712306,"Lat":37.2251403205222, "Icon": "img/icons/icon-def.png", "Desc": [{"img": "img/icons/icon-star.png", "link": "http://woo.xx", "name": "Google Sp.z.o.o", "salary": "15000 - 25000 PLN", "job": "UI Designer"}]},
{"Lon":-61.77952129376579,"Lat":53.65227108983100, "Icon": "img/icons/icon-net.png", "Desc": [{"img": "img/icons/icon-star.png", "link": "http://woo.xx", "name": "Facebook Sp.z.o.o", "salary": "17000 - 35000 PLN", "job": "UI Designer"}]},
{"Lon":-2.6245917163009893,"Lat":51.9494897654278, "Icon": "img/icons/icon-html.png", "Desc": [{"img": "img/icons/icon-star.png", "link": "http://woo.xx", "name": "MoovSpace Sp.z.o.o", "salary": "7000 - 25000 PLN", "job": "UI Designer"}]},
{"Lon":21.423771205611732,"Lat":50.312306306284796, "Icon": "img/icons/icon-js.png", "Desc": [{"img": "img/icons/icon-star.png", "link": "http://woo.xx", "name": "Moovle", "salary": "9000- 15000 PLN", "job": "Full Stack Developer"}]}];

// Create markers function
// icon.imageDiv.className += "name"
function addPointGeom(data) {
    data.forEach(function(item) { //iterate through array...

        var longitude = item.Lon, latitude = item.Lat, icon = item.Icon, desc = item.Desc;

        var MarkerIcon = new ol.style.Icon({
            anchor: [0.5, 50],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: icon
            ,scale: 0.5
        });

        var iconFeature = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.transform([longitude, latitude], 'EPSG:4326', 'EPSG:3857')),
            type: 'Point',
            desc: ToolTip(desc),
            lon: longitude,
            lat: latitude
            // desc: '<pre> <b>Waypoint Details </b> ' + '<br>' + 'Latitude : ' + latitude + '<br>Longitude: ' + longitude + '</pre>'
        }),
        iconStyle = new ol.style.Style({
            image: MarkerIcon
        });
        iconFeature.setStyle(iconStyle);
        straitSource.addFeature(iconFeature);
    });
}

// Add markers now
addPointGeom(data);