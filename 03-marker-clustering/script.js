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


// add a marker to the map
// the first parameter is the lat, lng of the marker
let marker = L.marker([1.3039, 103.8319]);
marker.addTo(singaporeMap);

// marker.addEventListener("click", function(){
//     alert("Ion Orchard");
// })

// the first parameter of bindPopup is the
// html that you want to the show to the user
// when the marker is clicked
marker.bindPopup(`<h1>Ion Orchard</h1>
    <p><span style="font-weight: bold">ION Orchard</span> (pronounced as I-On), formerly known as the Orchard Turn Development or Orchard Turn Site, is a shopping mall in Singapore, next to Orchard MRT station. 
    It is the retail component of an integrated retail and residential development by Orchard Turn Developments Pte Ltd, a joint venture between CapitaLand and Sun Hung Kai Properties. It started operating on 21 July 2009, 
    occupying 335 food and retail outlets.[1][2] In December 2016, Forbes recognized ION Orchard as one of the top shopping malls in Singapore.[3]</p>
    `);


L.circle([1.3507, 103.8720], {
    "radius": 500,
    "color":"orange",
    "fillColor": "blue",
    "opacity": 0.5
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

// create a marker cluster layer group
// L.markerClusterGroup is only possible to use because
// we include Marker Cluster JS
let markerClusterLayerGroup = L.markerClusterGroup();
console.log(markerClusterLayerGroup);
markerClusterLayerGroup.addTo(singaporeMap);


for (let i =0; i < 1000; i++) {
    let randomLatLng = getRandomLatLng(singaporeMap);
    L.marker(randomLatLng).addTo(markerClusterLayerGroup);
}