$(document).ready(function() {
    
  //On Submit grab burger id and display burger in correct location
  $(".devour-form").on("submit", function(event) {
    event.preventDefault();

    //Setting up variable equal to burger's id from value
    var burger_id = $(this).children(".burger_id").val();
    console.log(burger_id);
    
    $.ajax({
      method: "PUT",
      url: "/burgers/" + burger_id
    }).then(function(data) {
      // reload page to display update
      location.reload();
    });
  });
});
