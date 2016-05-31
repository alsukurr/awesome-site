$(document).ready(function(){

var message =function(){
	var myDate = new Date();

	var message = "Hello!";
	// var year = myDate.getFullYear();


	/* hour is before noon */
	if ( myDate.getHours() < 6 )
	{
	    message = "Whoa, only vampires should be awake at this time!";
	}
	else  /* Hour is from noon to 5pm (actually to 5:59 pm) */
	if ( myDate.getHours() >= 6 && myDate.getHours() <= 12 )
	{
	    message = "Good Morning!";
	}
	else  /* Hour is from noon to 5pm (actually to 5:59 pm) */
	if ( myDate.getHours() >= 12 && myDate.getHours() <= 17 )
	{
	    message = "Good Afternoon!";
	}
	else  /* the hour is after 5pm, so it is between 6pm and midnight */
	if ( myDate.getHours() > 17 && myDate.getHours() <= 24 )
	{
	    message = "Good Evening!";
	}
	else  /* the hour is not between 0 and 24, so something is wrong */
	{
	    message = "Hello!";
	}

	$('h3.message-of-day').text(message);
	// $('p.copywrite span').append(year);
};

message();

var isMobile = $(window).outerWidth() < 768;
console.log(isMobile);

if(!isMobile) {
	$(".drag").draggable ({
		// containment: ".draggable",
		scroll: false,
	});

}
// $(".dragging").css("transition", "all 0s ease 0s");

});