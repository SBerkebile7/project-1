// Warning Modal Activation and Functions

var checkbox = document.getElementById("checkbox")

$("#proceed").click(function() {
    if (checkbox.checked == true) {
        $(".warning-modal").css("display", "none");
    }
});