var directionService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();

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
            //const output = document.querySelector('#output');
            //output.innerHTML = "<div>From: " + document.getElementById("beginPoint").value + ". <br />To: " + document.getElementById("endPoint").value + ".<br/>Driving distance: " + result.routes[0].legs[0].distance.text + ". <br />Duration: " + result.routes[0].legs[0].duration.text + "</div>";
            console.log("Going from " + document.getElementById("beginPoint").value + " to " + document.getElementById("endPoint").value)
            console.log("is " + result.routes[0].legs[0].distance.text + " and will take you " + result.routes[0].legs[0].duration.text + " via " + document.getElementById("mode").value);
            directionsDisplay.setDirections(result);
        } else {
            directionsDisplay.setDirections({ routes: []});

            map.setCenter(myLatLng);
            output.innerHTML = "<div>Could not retrieve driving distance.</div>";
        }
    });
}

var options = {
    types: ['(cities)']
}

var beginInput = document.getElementById("beginPoint");
var autocompleteBegin = new google.maps.places.Autocomplete(beginInput, options);

var endInput = document.getElementById("endPoint");
var autocompleteEnd = new google.maps.places.Autocomplete(endInput, options);
