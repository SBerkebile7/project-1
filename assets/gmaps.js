var directionService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();

var allTrips = [];


function init () {
    var savedTrips = JSON.parse(localStorage.getItem("trips"));

    if(savedTrips !== null) {
        allTrips = savedTrips;
    }

    listTrip();
}

// This function calculates the route that would be taken based on a begin point and an end point
function calcRoute() {
    // request info pulled from modal
    var request = {
        origin: document.getElementById("beginPoint").value,
        destination: document.getElementById("endPoint").value,
        travelMode: document.getElementById("mode").value,
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
        saveAndStore();
    });
    
    // allTrips = [{
    //     start: document.getElementById("beginPoint").value,
    //     destination: document.getElementById("endPoint").value,
    //     type: document.getElementById("mode").value
    // }]

    $(".modal").css("display", "none");
}

var options = {
    types: ['(cities)']
}

var beginInput = document.getElementById("beginPoint");
var autocompleteBegin = new google.maps.places.Autocomplete(beginInput, options);

var endInput = document.getElementById("endPoint");
var autocompleteEnd = new google.maps.places.Autocomplete(endInput, options);

function listTrip(tripType, trips) {
    $(`#prev-suggestions-${tripType}`).empty();
console.log(`listTrip ${tripType} was run`);
    trips.forEach(function(trip) {
        console.log(`${tripType}: ${trip}`);
        $(`#prev-suggestions-${tripType}`).append($(`<button class='list-group-item chosenTrip'>${trip.start}</button>`))
    })
}

// Stores trips to localStorage
function storeTrip() {
    localStorage.setItem("trips", JSON.stringify(allTrips));
}

// Finds and saves the trip based on it's selected type of route
function saveAndStore() {
    console.log('saveAndStore was run');

    var beginTrip = document.getElementById("beginPoint").value;
    var endTrip = document.getElementById("endPoint").value;
    var typeTrip = document.getElementById("mode").value;
    allTrips.push({start: beginTrip, destination: endTrip, type: typeTrip});

    // listTripAll();
    listTrip("all", allTrips);
    storeTrip();
    
    if(document.getElementById("mode").value == "DRIVING") {
        var drivingTrips = allTrips.filter(function(trip){ return trip.type === "DRIVING"});
        listTrip("driving", drivingTrips);
    } else if(document.getElementById("mode").value == "BICYCLING") {
        var bicyclingTrips = allTrips.filter(function(trip){ return trip.type === "BICYCLING"});
        listTrip("biking", bicyclingTrips);
    } else if(document.getElementById("mode").value == "TRANSIT") {
        var transitTrips = allTrips.filter(function(trip){ return trip.type === "TRANSIT"});
        listTrip("public", transitTrips);
    } else if(document.getElementById("mode").value == "WALKING") {
        var walkingTrips = allTrips.filter(function(trip){ return trip.type === "WALKING"});
        listTrip("walking", walkingTrips);
    }

    $("#beginPoint").val("");
    $("#endPoint").val("");
};