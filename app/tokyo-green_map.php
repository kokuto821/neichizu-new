<!DOCTYPE html>
<html>
<head>
  <title>leaflet-map</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta charset="utf-8">
  <!-- Load Leaflet code library - see updates at http://leafletjs.com/download.html -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"/>
  <link rel="stylesheet" href="./css/style.css"/>
  <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
  <!-- Load jQuery and PapaParse to read data from a CSV file -->
  <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/papaparse@5.3.0/papaparse.min.js"></script>

  <!-- Plugin Icon.Pulse -->
  <!-- <link rel="stylesheet" href="./css/L.Icon.Pulse.css" >
  <script src="./js/L.Icon.Pulse.js" ></script> -->
  <!-- plugin -->
  <link rel="stylesheet" href="./css/L.VisualClick.css" />
  <script src="./js/L.VisualClick.js"></script>
  <!-- plugin -->

  <!-- Position the map with Cascading Style Sheet (CSS) -->
  <style>
    body { margin:0; padding:0; }
    #map { position: absolute; top:0; bottom:0; right:0; left:0; }
  </style>

</head>
<body>

<!-- Insert HTML division tag to layout the map -->
<div id="map"></div>

<!-- Insert Javascript (.js) code to create the map -->
<script>
// Set up initial map center and zoom level
var map = L.map('map', {
center: [35.68517004648027, 139.75280437863023], // EDIT latitude, longitude to re-center map
zoom: 11.5,  // EDIT from 1 to 18 -- decrease to zoom out, increase to zoom in
scrollWheelZoom: true,
tap: true ,
zoomControl: false,
});
//スケールコントロールを最大幅200px、右下、m単位で地図に追加
L.control.scale({ maxWidth: 200, position: 'bottomright', imperial: false }).addTo(map);

var osm = L.tileLayer('http://tile.openstreetmap.jp/{z}/{x}/{y}.png', {
attribution: "&copy; <a href='http://www.openstreetmap.org/copyright' target='_blank'>OpenStreetMap</a>"
}) // EDIT - insert or remove ".addTo(map)" before last semicolon to display by default

var gmap = L.tileLayer('https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}',
    {attribution: "<a href='https://developers.google.com/maps/documentation' target='_blank'>Google Map</a>"
}); // EDIT - insert or remove ".addTo(map)" before last semicolon to display by default
//地理院地図の標準地図タイル
var gsi =L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', 
    {attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"});
//地理院地図の淡色地図タイル
var gsipale = L.tileLayer('http://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png',
{attribution: "<a href='http://portal.cyberjapan.jp/help/termsofuse.html' target='_blank'>地理院タイル</a>"});
//地理院地図タイル年代
var gsi1984to1986 = L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/gazo3/{z}/{x}/{y}.jpg',
{attribution: "<a href='http://portal.cyberjapan.jp/help/termsofuse.html' target='_blank'>地理院タイル</a>"});
//地理院地図タイル年代
var gsi1984to1986 = L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/gazo3/{z}/{x}/{y}.jpg',
{attribution: "<a href='http://portal.cyberjapan.jp/help/termsofuse.html' target='_blank'>地理院タイル</a>"});
//地理院地図航空写真のタイル  
var gsikouku =L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg');    
// see more basemap options at https://leaflet-extras.github.io/leaflet-providers/preview/
var baseMaps = {
    "オープンストリートマップ": osm,
    "地理院地図": gsi,
    "地理院淡色地図":gsipale,
    "GoogleMap": gmap,
    "空中写真": gsikouku,
    "空中写真(1984-1987)": gsi1984to1986,
};

// レイヤーコントロールの作成と追加
var layersControl = L.control.layers(baseMaps).addTo(map);
// 地理院地図をデフォルトで地図に追加
gsipale.addTo(map);

map.attributionControl.setPrefix(
'<span style="color:#3a5b52;">NatureMap'
);


fetch('geodata/1984_NDVI-0095_4326.geojson')
    .then((res) => res.json())
    .then((json) =>{
        //geojsonレイヤーを作成
        const polygon = L.geoJSON(json, {
            style:(feature) => ({
                color: '#3e92d6',
                opacity: 0.5 ,
            }),
        })
            .bindPopup(
                (layer) => '1984' ,
            )
            .addTo(map);

        layersControl.addOverlay(polygon,'1984_NDVI-0.095');
    });
fetch('geodata/2001_NDVI-012_4326.geojson')
    .then((res) => res.json())
    .then((json) =>{
        //geojsonレイヤーを作成
        const polygon = L.geoJSON(json, {
            style:(feature) => ({
                color: '#ff7f50',
                opacity: 0.5 ,
            }),
        })
            .bindPopup(
                (layer) => '2001' ,
            )
            .addTo(map);

        layersControl.addOverlay(polygon,'2001_NDVI-0.12');
    });
fetch('geodata/2023_NDVI-0165_4326.geojson')
    .then((res) => res.json())
    .then((json) =>{
        //geojsonレイヤーを作成
        const polygon = L.geoJSON(json, {
            style:(feature) => ({
                color: '#2e8b57',
                opacity: 0.5 ,
            }),
        })
            .bindPopup(
                (layer) => '2023' ,
            )
            .addTo(map);

        layersControl.addOverlay(polygon,'2023_NDVI-0.165');
    });

</script>
</body>
</html>
