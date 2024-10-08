
document.addEventListener("DOMContentLoaded", async function () {
    let latLng = [1.29, 103.85]
    let singaporeMap = L.map('map');
    singaporeMap.setView(latLng, 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(singaporeMap);


    // Cyclng Layer
    let cyclingResponse = await axios.get("cycling.geojson");
    let cyclingLayer = L.geoJSON(cyclingResponse.data);
    cyclingLayer.addTo(singaporeMap);


    // NPark Layer
    let nparkResponse = await axios.get("nparks.geojson");

    
    // we can use the onEachFeature property to customize
    // each of the layer representing feature
    let nparkLayer = L.geoJSON(nparkResponse.data, {
        "onEachFeature":function(feature, layer) {

            let el = document.createElement('div');
            el.innerHTML = feature.properties.Description;
            let allTDs = el.querySelectorAll("td");
            let parkName = allTDs[0].innerHTML;
            let type = allTDs[1].innerHTML;
            let loop = allTDs[2].innerHTML;
            let parkType= allTDs[3].innerHTML;

            // parameter 1 is the feature that Leaflet is drawing right now
            // parameter 2 is the layer that the Leaflet will draw
            layer.bindPopup(`<h1>${parkName}</h1>
                <ul>
                    <li>Type: ${type}</li>
                    <li>Loop: ${loop}</li>
                    <li>Park Type: ${parkType}</li> 
                </ul>
                `);
        }
    });
    nparkLayer.addTo(singaporeMap);

    // change the color
    nparkLayer.setStyle({
        'color': 'red',
        'dashArray':10,
        'opacity': 0.5
    })


})


