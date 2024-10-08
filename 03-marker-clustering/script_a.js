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

    let response = await axios.get("https://api.data.gov.sg/v1/transport/taxi-availability");
    console.log(response.data);

})


