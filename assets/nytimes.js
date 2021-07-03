fetch(
  'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=HXMcUKu4hWhoZPQBW99bGZ9An0FdbWEl'
)
.then(function(res) {
  return res.json();
})
.then(function(data) {
  console.log(data);
});