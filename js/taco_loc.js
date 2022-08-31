// Add console.log to check to see if our code is working.
console.log("heffelumps");

// We create the second tile layer that will be the background of our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY
});

// We create the second tile layer that will be the background of our map.
let navigationNight = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY
});

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [40.7, -94.5],
  zoom: 4,
  layers: [navigationNight]
});

// Create a base layer that holds all three maps.
let baseMaps = {
  "Satellite": satelliteStreets,
  "Navigation Night": navigationNight
};

// 1. Add layers group for the sightings and the tacos.
let bestTacos = new L.LayerGroup();

// 2. Add a reference to the tectonic plates group to the overlays object.
let overlays = {
  "The Best Tacos": bestTacos,
};

// Then we add a control to the map that will allow the user to change which
// layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);

let tacoStyle = {
  opacity: 1,
  fillOpacity: 1,
  fillColor: "#FCAB08",
  color: "#FC8A08",
  radius: 4,
  stroke: true,
  weight: 0.5
};

// 3. Use d3.json to make a call to get our TACO geoJSON data.
d3.json("../static/best_tacos.geojson").then(function (data) {
  console.log(data);
  L.geoJSON(data, {
    pointToLayer: function (feature, latlng) {
      console.log(data);
      return L.circleMarker(latlng);
    },
    style: tacoStyle,
    onEachFeature: function (feature, layer) {
      layer.bindPopup(feature.properties.name + "<br>" + feature.properties.address + ", " + feature.properties.city + "<br>" + feature.properties.websites);
    }
  }).addTo(bestTacos);

  bestTacos.addTo(map);
  // Here we create a legend control object.
  let legend = L.control({
    position: "bottomright"
  });

  // Then add all the details for the legend
  legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");
  }
});






