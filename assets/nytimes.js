fetch(
  'https://api.nytimes.com/svc/books/v3/lists/current/e-book-fiction.json?api-key=HXMcUKu4hWhoZPQBW99bGZ9An0FdbWEl'
)
.then(function(res) {
  return res.json();
})
.then(function(res) {
  //console.log(res);
  displayRecommendations(res);
});

//fetch(
//  'https://api.nytimes.com/svc/movies/v2/reviews/search.json?' +
//  '&api-key=HXMcUKu4hWhoZPQBW99bGZ9An0FdbWEl'
//)
//.then(function(res) {
//  return res.json();
//})
//.then(function(data) {
//  console.log(data);
//});

var recAmount = 10;
var recsShow =  document.querySelector('#recs');

function displayRecommendations(res) {
  $("#recs").empty();

  for (var i = 0; i < recAmount; i++) {
    var recsURL = res.results.books[i].amazon_product_url;
    var bookTitle = res.results.books[i].title;
    $('#outputTrip').append('<div id="#recs"></div>');
    $("#recs").append(`<a href="${recsURL}" target="_blank">${bookTitle}</a><br/>`);
  }
}