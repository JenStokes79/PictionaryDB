
$("#highScore").on("click", function(){
	//make a get request to our api to get high scores
 $.get("/api", function(data) {

  // for each character that our server sends us back
  for (var i = 0; i < data.length; i++) {
    // create a parent div for the oncoming elements
    var wellSection = $("<div>");
    // add a class to this div: 'well'
    wellSection.addClass("well");
    // add an id to the well to mark which well it is
    wellSection.attr("id", "user-well-" + i);
    // append the well to the well section
    $("#well-section").append(wellSection);

    // Now add all of our character data to the well we just placed on the page
    $("#user-well-" + i).append("<p>" + data[i].user_name + "</p>");
 
    $("#user-well-" + i).append("<p>High Score: " + data[i].high_score + "</p>");
  
  }
});
});




//adds user to db on click
$("#submitName").on("click", function(){
	//make new user
	var newUser = {
		//name form input
		user_name: $("#name").val().trim(),
	};
	//send AJAX POST
	$.post("/api/new", newUser)
	//on success, run this call back
	.then(function(data){
		console.log(data);
	});
});


