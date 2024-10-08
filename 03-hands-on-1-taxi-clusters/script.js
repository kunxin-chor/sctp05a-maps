window.addEventListener("DOMContentLoaded", async function () {

    // create a singapore map and point it at the center of singapore
    let latLng = [1.29, 103.85]
    let singaporeMap = L.map('map');
    singaporeMap.setView(latLng, 13);

    // setup the tile layer
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(singaporeMap);

    let markerClusterGroup = L.markerClusterGroup();
    markerClusterGroup.addTo(singaporeMap);

    drawMarkers(markerClusterGroup);

    // setInterval to call the function in the first parameter
    // after the interval
    setInterval(async function () {
        drawMarkers(markerClusterGroup);
    }, 30000);
})

async function drawMarkers(clusterGroup) {
    let response = await axios.get("https://api.data.gov.sg/v1/transport/taxi-availability");
    
    clusterGroup.clearLayers(); // remove all the existing layers in the group
    for (let coordinates of response.data.features[0].geometry.coordinates) {
        let latLng = [coordinates[1], coordinates[0]];
        L.marker(latLng).addTo(clusterGroup);
    }
}



