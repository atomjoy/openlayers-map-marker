# Openlayers map marker (ver. 6)

How to create a simple map with a marker and popup using OpenLayers? How to add a marker to OpenLayers map? OpenLayers map marker with popup. Create marker with geolocation or double click. Delivery area with polygon. Multiple markers with html popups. Animated markers.

## Map file contains

- Add image marker to map
- Show map popup on click
- Create marker on double click
- Clear all layer markers on double click
- Create map polygon from points array  
- Create delivery area, export polygon
- Test delivery area with polygon
- Search location from address (geolocation)
- Animate marker, marker highlight (ontop)
- Animate marker popup
- Multiple tags with popups from an array or database
  
## Map marker, geolocation or onclick

Map marker onclick <https://github.com/atomjoy/openlayers-map-marker/blob/master/map-marker-click.html>.

<img src="https://raw.githubusercontent.com/atomjoy/openlayers-map-marker/main/img/map-marker-polygon-click.png" width="100%">

## Delivery area with polygon

Create, load or edit polygon sample. Load polygon in json format. Download polygon file <https://github.com/atomjoy/openlayers-map-marker/blob/master/map-polygon.html>.

<img src="https://github.com/atomjoy/openlayers-map-marker/blob/master/img/map-polygon.png" width="100%">

## Map multipe markers

Multiple tags with popups from an array or database <https://github.com/atomjoy/openlayers-map-marker/blob/master/map-multiple-markers.html>.

<img src="https://raw.githubusercontent.com/atomjoy/openlayers-map-marker/master/img/map-marker-multi.png"  width="100%">

## Important

Set map div height.

```css
map {
  float: left; 
  width: 100%;
  height: 400px;
}
```

### Check if the point (coordinates) is inside the polygon

```js
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
```
