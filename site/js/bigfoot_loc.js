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

// 1. Add a 2nd layer group for the sightings.
let bestTacos = new L.LayerGroup();

let allSigntings = new L.LayerGroup();
// 1. Add a layer group for the tacos.



// 2. Add a reference to the tectonic plates group to the overlays object.
let overlays = {
  "The Best Tacos": bestTacos,

  "Sightings": allSigntings,
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


// Retrieve the sighting GeoJSON data.
d3.json("../static/bigfoot_movement.geojson").then(function (data) {

  // This function returns the style data for each of the earthquakes we plot on
  // the map. We pass the magnitude of the earthquake into two separate functions
  // to calculate the color and radius.
  function styleInfo(feature) {
    return {
      opacity: .75,
      fillOpacity: .5,
      //fillColor: getColor(feature.properties.month),
      fillColor: "#FFFFFF",

      color: "#FFFFFF",
      radius: getRadius(feature.properties.classification),
      stroke: true,
      weight: 0.5
    };
  }

  // This function determines the color of the marker based on the magnitude of the earthquake.
  function getColor(month) {
    if (month == 1) {
      return "#056A8F";
    }
    if (month == 2) {
      return "#056A8F";
    }
    if (month == 3) {
      return "#7B2094";
    }
    if (month == 4) {
      return "#7B2094";
    }
    if (month == 5) {
      return "#7B2094";
    }
    if (month == 6) {
      return "#FB2F03";
    }
    if (month == 7) {
      return "#FB2F03";
    }
    if (month == 8) {
      return "#FB2F03";
    }
    if (month == 9) {
      return "#7B2094";
    }
    if (month == 10) {
      return "#7B2094";
    }
    if (month == 11) {
      return "#7B2094";
    }
    return "#056A8F";
  }

  // This function determines the radius of the earthquake marker based on its magnitude.
  // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
  function getRadius(classification) {
    if (classification == "Class A") {
      return 4;
    }
    if (classification == "Class B") {
      return 2;
    }
    if (classification == "Class C") {
      return 1;
    }
  }

  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    // We turn each feature into a circleMarker on the map.
    pointToLayer: function (feature, latlng) {
      console.log(data);
      return L.circleMarker(latlng);
    },
    // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
    // We create a popup for each circleMarker to display the magnitude and location of the earthquake
    //  after the marker has been created and styled.
    onEachFeature: function (feature, layer) {
      layer.bindPopup("Report Number:" + feature.properties.number + "<br>Report: " + feature.properties.report + "<br>Date: " + feature.properties.timestamp)
    }
  }).addTo(allSigntings);

  // Then we add the earthquake layer to our map.
  allSigntings.addTo(map);

  // Here we create a legend control object.
  let legend = L.control({
    position: "bottomright"
  });

  // Then add all the details for the legend
  legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");
  }
});




