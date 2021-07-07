var directionService = new google.maps.DirectionsService();

var allTrips = [];

// This variable is for setting ID's to the buttons
var i = 0;


// On page load init runs and attaches all files saved from localStorage to the page as a button
function init () {
    var savedTrips = JSON.parse(localStorage.getItem("trips"));

    if(savedTrips !== null) {
        allTrips = savedTrips;
    }

    // Loops through allTrips to attach previous trips to page as buttons
    for(var x = 0; x < allTrips.length; x++) {
        var tripType = allTrips[x].type;
        
        listTrip("all", savedTrips);
        if(tripType == "DRIVING") {
            var drivingTrips = savedTrips.filter(function(trip){ return trip.type === "DRIVING"});
            listTrip("driving", drivingTrips);
        } else if(tripType == "BICYCLING") {
            var bicyclingTrips = savedTrips.filter(function(trip){ return trip.type === "BICYCLING"});
            listTrip("biking", bicyclingTrips);
        } else if(tripType == "TRANSIT") {
            var transitTrips = savedTrips.filter(function(trip){ return trip.type === "TRANSIT"});
            listTrip("public", transitTrips);
        } else if(tripType == "WALKING") {
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

        // Searches for modal input for preferred type of article
        var parsedNum = result.routes[0].legs[0].duration.text;
        parsedNum = parsedNum.replace(/[^0-9\.]+/g, "");
        parsedNum.parseInt;
        if(document.getElementById("articleType").value == "books") {
            console.log("books");
        } else if (document.getElementById("articleType").value == "articles") {
            console.log("articles");
            popularArticles();
        } else {
            if(parsedNum > 60) {
                console.log("books");
            } else {
                popularArticles();
                console.log("articles");
            }
        }
        
    });

    $(".modal").css("display", "none");
}

// Sets autofill option to only show cities as a viable choice
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

// Variables for the elements on the page for the tabs and their buttons
var all = document.getElementById("prev-suggestions-all");
var allTab = document.getElementById("all-tab");
var drive = document.getElementById("prev-suggestions-driving");
var driveTab = document.getElementById("driving-tab");
var bike = document.getElementById("prev-suggestions-biking");
var bikeTab = document.getElementById("biking-tab");
var transit = document.getElementById("prev-suggestions-public");
var transitTab = document.getElementById("transit-tab");
var walking = document.getElementById("prev-suggestions-walking");
var walkingTab = document.getElementById("walking-tab");
// Toggles the appearance of buttons shown on the page based on selected tab. By default the 'all' tab is shown on page start
function showAll() {
    if (all.style.display === "none") {
        all.style.display = "block";
        allTab.classList.add("is-active");
        drive.style.display = "none";
        driveTab.classList.remove("is-active");
        bike.style.display = "none";
        bikeTab.classList.remove("is-active");
        transit.style.display = "none";
        transitTab.classList.remove("is-active");
        walking.style.display = "none";
        walkingTab.classList.remove("is-active");
    }
}
function showDriving() {
    if (drive.style.display === "none") {
        all.style.display = "none";
        allTab.classList.remove("is-active");
        drive.style.display = "block";
        driveTab.classList.add("is-active");
        bike.style.display = "none";
        bikeTab.classList.remove("is-active");
        transit.style.display = "none";
        transitTab.classList.remove("is-active");
        walking.style.display = "none";
        walkingTab.classList.remove("is-active");
    }
}
function showBiking() {
    if (bike.style.display === "none") {
        all.style.display = "none";
        allTab.classList.remove("is-active");
        drive.style.display = "none";
        driveTab.classList.remove("is-active");
        bike.style.display = "block";
        bikeTab.classList.add("is-active");
        transit.style.display = "none";
        transitTab.classList.remove("is-active");
        walking.style.display = "none";
        walkingTab.classList.remove("is-active");
    }
}
function showTransit() {
    if (transit.style.display === "none") {
        all.style.display = "none";
        allTab.classList.remove("is-active");
        drive.style.display = "none";
        driveTab.classList.remove("is-active");
        bike.style.display = "none";
        bikeTab.classList.remove("is-active");
        transit.style.display = "block";
        transitTab.classList.add("is-active");
        walking.style.display = "none";
        walkingTab.classList.remove("is-active");
    }
}
function showWalking() {
    if (walking.style.display === "none") {
        all.style.display = "none";
        allTab.classList.remove("is-active");
        drive.style.display = "none";
        driveTab.classList.remove("is-active");
        bike.style.display = "none";
        bikeTab.classList.remove("is-active");
        transit.style.display = "none";
        transitTab.classList.remove("is-active");
        walking.style.display = "block";
        walkingTab.classList.add("is-active");
    }
}

$(".past-trip-buttons").on("click", ".chosenTrip", function(event) {
    event.preventDefault();

    console.log(allTrips);

    let buttonID = $(this).attr('id');
    buttonID = parseInt(buttonID);
    console.log(buttonID);

    const btnOutput = document.querySelector('#outputTrip');
    btnOutput.innerHTML = "<div>From: " + allTrips[buttonID].start + ". <br />To: " + allTrips[buttonID].destination + ".<br/>" + allTrips[buttonID].type + " distance: " + allTrips[buttonID].distance + ". <br />Duration: " + allTrips[buttonID].duration + "</div>";
    
    var parsedNum = allTrips[buttonID].duration;
    parsedNum = parsedNum.replace(/[^0-9\.]+/g, "");
    parsedNum.parseInt;
    if(parsedNum > 60) {
        console.log("books");
    } else {
        popularArticles();
        console.log("articles");
    }
});

init();

// NYT ARTICLE SEARCH API

var today = moment().format("YYYYMMDD");

var yesterday = moment().add(-1, 'days').format("YYYYMMDD");

var durationArticleRatio = 5;

// console.log(today);
// console.log(yesterday);

function popularArticles() {
    // var period = document.querySelector() NOTE - NEED VARIABLE FROM SPENCER ON TRIP DURATION TO CREATE IF THEN FOR PERIOD VARIABLE
    // var travel = document.querySelector('#mode').value;
    // Create a variable to hold the value of rating
    // var topic = document.querySelector('#topic').value;


    fetch(
      'https://api.nytimes.com/svc/search/v2/articlesearch.json?' +
        'begin_date=' + yesterday +
        '&end_date=' + today +
        '&sort=newest' +
        '&api-key=MwmqPsibE3r4OXyWACc0BbT3BiaQj3Jk'
    )
      .then(function(res) {
        return res.json();
      })
      .then(function(res) {
        // console.log(res.response);

        displayArticles(res.response);


      });
  }

  function displayArticles(data) {

    $("#url-return").empty();

    for (var i = 0; i < durationArticleRatio; i++) {
  
    var urlReturned = data.docs[i].web_url;
    var articleName = data.docs[i].headline.main
    // console.log(res.response.docs[0].web_url);
    // console.log(res.response.docs[0].headline.main);
    $('#outputTrip').append('<div id="url-return"></div>');
    $("#url-return").append(`<a href="${urlReturned}" target="_blank">${articleName}</a><br/>`);

    }
  }