
document.addEventListener("DOMContentLoaded", async function () {
    let latLng = [1.29, 103.85]
    let singaporeMap = L.map('map');
    singaporeMap.setView(latLng, 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(singaporeMap);

    // HDB Layer Group
    let hdbLayerGroup = L.layerGroup();
    hdbLayerGroup.addTo(singaporeMap);

    // load in the three data files
    let hdbResponse = await axios.get("https://gist.githubusercontent.com/kunxin-chor/a5f5cab3e8a6ad0868134334c1432d9a/raw/ca55e99903d5913fc0e701ddab139472fe7fe4fa/hdb.json");
    
    for (let hdb of hdbResponse.data) {
        let marker = L.marker(hdb.coordinates)
        marker.bindPopup(`<h1>${hdb.name}</h1>`);
        marker.addTo(hdbLayerGroup);
    }

    // load 
    let mallLayerGroup = L.layerGroup();
    mallLayerGroup.addTo(singaporeMap);

    let mallResponse = await axios.get("https://gist.githubusercontent.com/kunxin-chor/a5f5cab3e8a6ad0868134334c1432d9a/raw/ca55e99903d5913fc0e701ddab139472fe7fe4fa/malls.json");
    for (let mall of mallResponse.data) {
        let marker = L.marker(mall.coordinates);
        marker.bindPopup(`<h1>${mall.name}</h1>`);
        marker.addTo(mallLayerGroup);
    }

    // nature.json
    let natureLayerGroup = L.layerGroup();
    natureLayerGroup.addTo(singaporeMap);

    let natureResponse = await axios.get("https://gist.githubusercontent.com/kunxin-chor/a5f5cab3e8a6ad0868134334c1432d9a/raw/ca55e99903d5913fc0e701ddab139472fe7fe4fa/nature.json");
    for (let nature of natureResponse.data) {
        let marker = L.marker(nature.coordinates);
        marker.bindPopup(`<h1>${nature.name}</h1>`);
        marker.addTo(natureLayerGroup);
    }

    let overlay = {
        "HDB": hdbLayerGroup,
        "Mall":mallLayerGroup,
        "Nature": natureLayerGroup
    }

    L.control.layers({}, overlay).addTo(singaporeMap);
})


