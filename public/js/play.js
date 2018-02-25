$("#submitName").on("click", function(){


	var updateUser = $("#submitName").val().trim();

$.get("/api/" + updateUser, function(data) {

$("#well-section").append("<p>" + data.user_name + "</p>") 


});

});