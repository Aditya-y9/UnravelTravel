

// Create a new tile layer with your URL
var myMap = L.tileLayer('https://qgiscloud.com/support/sourcepole_headquarters/?l=haltestellen%5B70%5D%2Cfusswege%2Ctramlinien&bl=mapnik&t=anfahrt&e=949179%2C6002605%2C949668%2C6002853', {
    maxZoom: 20,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Create a map and set its view to Mumbai
var map = L.map('map', {
    center: [19.0760, 72.8777], // coordinates for Mumbai
    zoom: 13,
    layers: [myMap] // set your map as the base layer
});

// Overlays for your map
var overlays = {
    "Area": area,
    "Service": service
}

// Add base layer and overlays to map
var baseLayers = {
    "My Map": myMap
};

L.control.layers(baseLayers, overlays).addTo(map)

// Map legend
var legend = L.control({ position: 'bottomright' })
legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info')
    div.innerHTML += '<img style="width:30px;height:30px" src="../../static/images/icons/place-icon.png">: Place<br>'
    div.innerHTML += '<img style="width:30px;height:30px" src="../../static/images/icons/services-icon.png">: Service<br>'
    div.innerHTML += '<img style="width:30px;height:30px" src="../../static/images/icons/area-icon.png">: Area<br>'
    return div
}
legend.addTo(map)