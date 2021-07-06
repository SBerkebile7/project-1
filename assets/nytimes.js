fetch(
  'https://api.nytimes.com/svc/books/v3/lists/current/e-book-fiction.json?api-key=HXMcUKu4hWhoZPQBW99bGZ9An0FdbWEl'
)
.then(function(res) {
  return res.json();
})
.then(function(data) {
  console.log(data);
});

//fetch (
//  'https://api.nytimes.com/svc/books/v3/reviews.json?' +
//  'title='
//  '&api-key=HXMcUKu4hWhoZPQBW99bGZ9An0FdbWEl'
//)
//.then(function(res) {
//  return res.json();
//})
//.then(function(data) {
//  console.log(data);
//});

fetch(
  'https://api.nytimes.com/svc/movies/v2/reviews/search.json?' +
  '&api-key=HXMcUKu4hWhoZPQBW99bGZ9An0FdbWEl'
)
.then(function(res) {
  return res.json();
})
.then(function(data) {
  console.log(data);
});

var recAmount = 10;

function displayRecommendations(data) {

  $("#url-return").empty();

  for (var i = 0; i < recAmount; i++) {

  var urlReturned = data.docs[i].web_url;
  $('#reviews').append('<div id="url-return"></div>');
  $("#url-return").append(`<a href="${urlReturned}" target="_blank">${articleName}</a><br/>`);
  }
}