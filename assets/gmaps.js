var directionService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();

var allTrips = [{
    start: "",
    destination: "",
    type: ""
}];

// This function calculates the route that would be taken based on a begin point and an end point
function calcRoute() {
    // request info pulled from modal
    var request = {
        origin: document.getElementById("beginPoint").value,
        destination: document.getElementById("endPoint").value,
        travelMode: document.getElementById("mode").value,
        //travelMode: google.maps.TravelMode.DRIVING, //can be update to WALKING, BICYCLING or TRANSIT
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }

    // uses google maps DirectionsService to calculate a route
    directionService.route(request, (result, status) => {
        if(status == google.maps.DirectionsStatus.OK) {
            const output = document.querySelector('#outputTrip');
            output.innerHTML = "<div>From: " + document.getElementById("beginPoint").value + ". <br />To: " + document.getElementById("endPoint").value + ".<br/>Driving distance: " + result.routes[0].legs[0].distance.text + ". <br />Duration: " + result.routes[0].legs[0].duration.text + "</div>";
            console.log("Going from " + document.getElementById("beginPoint").value + " to " + document.getElementById("endPoint").value)
            console.log("is " + result.routes[0].legs[0].distance.text + " and will take you " + result.routes[0].legs[0].duration.text + " via " + document.getElementById("mode").value);
            directionsDisplay.setDirections(result);
        } else {
            directionsDisplay.setDirections({ routes: []});

            map.setCenter(myLatLng);
            output.innerHTML = "<div>Could not retrieve driving distance.</div>";
        }
    });

    $("#beginPoint").val("");
    $(".modal").css("display", "none");
    saveAndStore();
}

var options = {
    types: ['(cities)']
}

var beginInput = document.getElementById("beginPoint");
var autocompleteBegin = new google.maps.places.Autocomplete(beginInput, options);

var endInput = document.getElementById("endPoint");
var autocompleteEnd = new google.maps.places.Autocomplete(endInput, options);

// Lists trips taken on each tab based on their respective trip type
function listTripAll() {
    $("#prev-suggestions-all").empty();
    
    allTrips.forEach(function(allTrips) {
        console.log("All: " + allTrips);
        $("#prev-suggestions-all").append($(`<button class='list-group-item chosenTrip'>${allTrips}</button>`))
    })
}

// Lists trips taken on each tab based on their respective trip type
function listTripDriving() {
    $("#prev-suggestions-driving").empty();

    allTrips.forEach(function(allTrips) {
        console.log("Driving: " + allTrips);
        $("#prev-suggestions-driving").append($(`<button class='list-group-item chosenTrip'>${allTrips}</button>`))
    })
}

// Lists trips taken on each tab based on their respective trip type
function listTripBicycling() {
    $("#prev-suggestions-biking").empty();

    allTrips.forEach(function(allTrips) {
        console.log("Bicycling: " + allTrips);
        $("#prev-suggestions-biking").append($(`<button class='list-group-item chosenTrip'>${allTrips}</button>`))
    })
}

// Lists trips taken on each tab based on their respective trip type
function listTripTransit() {
    $("#prev-suggestions-public").empty();

    allTrips.forEach(function(allTrips) {
        console.log("Transit: " + allTrips);
        $("#prev-suggestions-public").append($(`<button class='list-group-item chosenTrip'>${allTrips}</button>`))
    })
}

// Lists trips taken on each tab based on their respective trip type
function listTripWalking() {
    $("#prev-suggestions-walking").empty();

    allTrips.forEach(function(allTrips) {
        console.log("Walking: " + allTrips);
        $("#prev-suggestions-walking").append($(`<button class='list-group-item chosenTrip'>${allTrips}</button>`))
    })
}

// Stores trips to localStorage
function storeTrip() {
    localStorage.setItem("trips", JSON.stringify(allTrips));
}

// Finds and saves the trip based on it's selected type of route
function saveAndStore() {
    console.log('saveAndStore was run');

    var currentTrip = $("#beginPoint").val() || '';
    allTrips.push(currentTrip);

    listTripAll();
    storeTrip();
    
    if(document.getElementById("mode").value == "DRIVING") {
        listTripDriving();
    } else if(document.getElementById("mode").value == "BICYCLING") {
        listTripBicycling();
    } else if(document.getElementById("mode").value == "TRANSIT") {
        listTripTransit();
    } else if(document.getElementById("mode").value == "WALKING") {
        listTripWalking();
    }
};