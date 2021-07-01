function booksApi() {
    var travelTypeSelector = document.querySelector('#mode').value;
    // Create a variable to hold the value of rating
    var rating = document.querySelector('#rating').value;
    fetch(
      'https://api.giphy.com/v1/gifs/search?q=' +
        searchTerm +
        // Add the rating parameter
        '&rating=' +
        rating +
        '&api_key=MwmqPsibE3r4OXyWACc0BbT3BiaQj3Jk'
    )
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        console.log(response.data[0]);
        var responseContainerEl = document.querySelector('#response-container');
        responseContainerEl.innerHTML = '';
        var gifImg = document.createElement('img');
        gifImg.setAttribute('src', response.data[0].images.fixed_height.url);
        responseContainerEl.appendChild(gifImg);
      });
  }
  