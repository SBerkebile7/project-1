// MODAL FUNCTIONS

$("#close-warning").click(function() {
    $(".modal").css("display", "none");
  });

var checkbox = document.getElementById("checkbox")

$("#proceed").click(function() {
    if (checkbox.checked == true) {
        $(".modal").css("display", "none");
    }
});