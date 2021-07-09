// MODAL FUNCTIONS

$("#new-button").click(function() {
  $(".modal").css("display", "flex");
});

$("#close-modal").click(function() {
  $("#beginPoint").val("");
  $("#endPoint").val("");
  $("#mode").val("");
  $("#articleType").val("");
  $(".modal").css("display", "none");
});

$("#cancel-button").click(function() {
  $("#beginPoint").val("");
  $("#endPoint").val("");
  $("#mode").val("");
  $("#articleType").val("");
  $(".modal").css("display", "none");
});