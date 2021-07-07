// MODAL FUNCTIONS

$("#new-button").click(function() {
  $(".modal").css("display", "flex");
});

$("#close-modal").click(function() {
  $(".modal").css("display", "none");
});

$("#cancel-button").click(function() {
  $(".modal").css("display", "none");
});

$(".modal-close").click(function() {
  $(".modal").css("display", "none");
});