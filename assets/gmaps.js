var directionService = new google.maps.DirectionsService();

var allTrips = [];

// This variable is for setting ID's to the buttons
var i = 0;

function init () {
    var savedTrips = JSON.parse(localStorage.getItem("trips"));

    if(savedTrips !== null) {
        allTrips = savedTrips;
    }

    for(var x = 0; x < allTrips.length; x++) {
        var triptype = allTrips[x].type;
        
        listTrip("all", savedTrips);
        if(triptype == "DRIVING") {
            var drivingTrips = savedTrips.filter(function(trip){ return trip.type === "DRIVING"});
            listTrip("driving", drivingTrips);
        } else if(triptype == "BICYCLING") {
            var bicyclingTrips = savedTrips.filter(function(trip){ return trip.type === "BICYCLING"});
            listTrip("biking", bicyclingTrips);
        } else if(triptype == "TRANSIT") {
            var transitTrips = savedTrips.filter(function(trip){ return trip.type === "TRANSIT"});
            listTrip("public", transitTrips);
        } else if(triptype == "WALKING") {
            var walkingTrips = savedTrips.filter(function(trip){ return trip.type === "WALKING"});
            listTrip("walking", walkingTrips);
        }
    }
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
            output.innerHTML = "<div>From: " + document.getElementById("beginPoint").value + ". <br />To: " + document.getElementById("endPoint").value + ".<br/>" + document.getElementById("mode").value + " distance: <span id='distance'>" + result.routes[0].legs[0].distance.text + "</span>. <br />Duration: <span id='duration'>" + result.routes[0].legs[0].duration.text + "</span></div>";
            console.log("Going from " + document.getElementById("beginPoint").value + " to " + document.getElementById("endPoint").value)
            console.log("is " + result.routes[0].legs[0].distance.text + " and will take you " + result.routes[0].legs[0].duration.text + " via " + document.getElementById("mode").value);
        } else {

            output.innerHTML = "<div>Could not retrieve driving distance.</div>";
        }
        saveAndStore();
    });

    $(".modal").css("display", "none");
}

var options = {
    types: ['(cities)']
}

var beginInput = document.getElementById("beginPoint");
var autocompleteBegin = new google.maps.places.Autocomplete(beginInput, options);

var endInput = document.getElementById("endPoint");
var autocompleteEnd = new google.maps.places.Autocomplete(endInput, options);

// Creates a button for each trip, and places it into a tab to be recalled later
function listTrip(tripType, trips) {
    $(`#prev-suggestions-${tripType}`).empty();
    console.log(`listTrip ${tripType} was run`);
    trips.forEach(function(trip) {
        console.log(`${tripType}: ${trip}`);
        $(`#prev-suggestions-${tripType}`).append($(`<button id=${trip.id} class='list-group-item chosenTrip'> ${trip.start}</button>`));
    })
}

// Stores trips to localStorage
function storeTrip() {
    localStorage.setItem("trips", JSON.stringify(allTrips));
}

// Finds and saves the trip based on it's selected type of route
function saveAndStore() {
    console.log('saveAndStore was run');

    i = allTrips.length;

    var beginTrip = document.getElementById("beginPoint").value;
    var endTrip = document.getElementById("endPoint").value;
    var typeTrip = document.getElementById("mode").value;
    var tripDistance = document.getElementById("distance").innerHTML;
    var tripDuration = document.getElementById("duration").innerHTML;
    allTrips.push({start: beginTrip, destination: endTrip, type: typeTrip, distance: tripDistance, duration: tripDuration, id: i++});

    listTrip("all", allTrips);
    
    // Searches for what type of trip was taken and runs listTrip to place it into that specific tab
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

    storeTrip();

    $("#beginPoint").val("");
    $("#endPoint").val("");
};

$(".past-trip-buttons").on("click", ".chosenTrip", function(event) {
    event.preventDefault();

    console.log(allTrips);

    let buttonID = $(this).attr('id');
    buttonID = parseInt(buttonID);
    console.log(buttonID);

    const btnOutput = document.querySelector('#outputTrip');
    btnOutput.innerHTML = "<div>From: " + allTrips[buttonID].start + ". <br />To: " + allTrips[buttonID].destination + ".<br/>" + allTrips[buttonID].type + " distance: " + allTrips[buttonID].distance + ". <br />Duration: " + allTrips[buttonID].duration + "</div>";
});

init();