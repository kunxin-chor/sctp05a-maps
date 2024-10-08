// create a map object
// L.map recieves one parameter, the lat, lng of the center point of the map
// the lat, lng in Leaflet is always an array
// let singaporeLatLng = [1.29, 103.85]
// index 0 = lat, index 1 = lng
let latLng = [1.29, 103.85]
// creates a leaflet map and store in the `singaporeMap` variable
// first parameter of the L.map is actually the id that display the map
let singaporeMap = L.map('map');
// set the zoom level of the map
// setView allows us to set the center point of the map
singaporeMap.setView(latLng, 13 );

// setup the tile layer
// a tile layer basically are the graphics used to
// display (i.e render) a map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(singaporeMap);

// first parameter: a leaflet map object
function getRandomLatLng(map) {
    // get the boundaries of the map
    // bounds will contain four corners of the visible map (in latlng)
    let bounds = map.getBounds();

    // get the ne corners and sw corners in lat ln
    let ne = bounds.getNorthEast();
    let sw = bounds.getSouthWest();

    // get height and width
    let lngSpan = ne.lng - sw.lng;
    let latSpan = ne.lat - sw.lat;

    let randomLat = Math.random() * latSpan + sw.lat;
    let randomLng = Math.random() * lngSpan + sw.lng;

    return [randomLat, randomLng];
}

// A layer group  is a container that can contain other layers
// it makes it easy for the developers to hide and show layers
// and to access them later. 
// Layer groups are built into leaflet. We don't need a plugin.
let markerLayerGroup = L.layerGroup();
markerLayerGroup.addTo(singaporeMap); // the layer group will not display its content
                             // if not added to the map


for (let i = 0; i < 5; i++) {
    // Alternatively: 
    // let coordinate = getRandomLatLng(singaporeMap);
    // let m = L.marker(coordinate);
    let m = L.marker(getRandomLatLng(singaporeMap));
    m.addTo(markerLayerGroup);
}

let circleLayerGroup = L.layerGroup();
circleLayerGroup.addTo(singaporeMap);

for (let i = 0; i < 10; i++) {
    let c = L.circle(getRandomLatLng(singaporeMap), {
        "radius": 200,
        "fillColor": "orange",
        "opacity": 1,
        "fillOpacity": 0.7
    });
    c.addTo(circleLayerGroup);
}

let clusterLayerGroup = L.markerClusterGroup();
clusterLayerGroup.addTo(singaporeMap);
for (let i = 0; i < 1000; i++) {
    L.marker(getRandomLatLng(singaporeMap)).addTo(clusterLayerGroup);
}

let baseLayer = {
    "Markers": markerLayerGroup,
    "Circles": circleLayerGroup,
}

let overlays = {

    "Cluster": clusterLayerGroup
}

// Create a Layer Control GUI element and add it to the map
// 1st parameter = base layers (can only select one to display and must be one)
// 2nd parameter = overlays (can toggle one or more, or none at all)
L.control.layers(baseLayer, overlays).addTo(singaporeMap);

document.querySelector("#showCircleButton").addEventListener("click", function(){
    // check if the map is not showing the circle layer group
    if (!singaporeMap.hasLayer(circleLayerGroup)) {
        // if not, then show the marker layer group
        singaporeMap.addLayer(circleLayerGroup);    
    } else {
        // otherwise, if already showing, remove the circle layer group
        singaporeMap.removeLayer(circleLayerGroup);
    }
})

document.querySelector("#showMarkerButton")
    .addEventListener("click", function(){
        if (!singaporeMap.hasLayer(markerLayerGroup)) {
            singaporeMap.addLayer(markerLayerGroup);
        } else {
            singaporeMap.removeLayer(markerLayerGroup);
        }
    })