(function( $ ){
	$.fn.resizeCarousel = function() {
		var carouselCropWidth = $(this).find('.carousel-inside-crop').width(); 
			
    	var itemDiv = $(this).find('.carousel-items > div');
    	itemDiv.width(carouselCropWidth);  
    	
    	return this;
    };
 })( jQuery );

function initZooms() {
	//conditional lightbox for slideshow "see larger image"
	if($thm.deviceWidthAtLeast($thm.deviceBreakpoints.tablet)){
		$('article .zoom').colorbox({
			rel:'article-gallery',
			maxWidth:$thm.deviceWidth,
		});
	}
	else {
		$.colorbox.remove();//remove any stray instances that may be hanging around
		$('article .zoom').attr('target','_blank');
	}
}

$(document).ready(function(){
	
	//zoom image functionality
	$('article .zoom').append('<div class="zoom-icon"></div>');
	$('article .zoom').addClass("article-gallery");
	$('article .zoom').attr("title",function() { 
		if ($(this).parent().find('figcaption').text()) {
			return $(this).parent().find('figcaption').text();
		}
		else 
			return $(this).find("img").attr("alt");
	});
	//bind initZooms() function to resize and trigger resize on ready
	$(window).resize(function() { 
		initZooms();
	}).resize();

	
	//initialize Prettify, which cleans up code samples
	prettyPrint();
	
	//accordion behavior for multiple pros/cons
	//Used on Test Center/reviews
	$(".proscons-wrapper.multi .ss-icon").click(function() {
		var clickedProsCons = $(this).parents(".proscons");
		if (clickedProsCons.hasClass("active")) {
			var toHide = clickedProsCons.find(".proscons-left, .proscons-right");
			toHide.slideUp();
			clickedProsCons.removeClass("active");
			$(this).text("dropdown");
		}
		else {
			var toShow = clickedProsCons.find(".proscons-left, .proscons-right");
			toShow.slideDown();
			clickedProsCons.addClass("active");
			$(this).text("directup");
		}
	});
	
	//behavior for new pin ad, pos=gpt-pin
	//see IDGMPM-10345 for details
	var pinAdThreshold = 1200; //scroll position at which ad will appear - static because it's too hard to dynamically calculate from DRR elements
	var pinAdShown = false;
	var pinAdExit; //defined here...
	
	$(window).scroll(function() {
		pinAdExit = $("footer").offset().top - $(window).height(); //... and calculated here to account for height of lazy-loaded elements that won't appear until you scroll down
		if ($(window).scrollTop() > pinAdThreshold && $(window).scrollTop() < pinAdExit && pinAdShown == false) {
			//show if between threshold and exit
			pinAdShown = true;
			//console.log("If1: pinAdThreshold = "+pinAdThreshold+"\npinAdShown = "+pinAdShown+"\npinAdExit = "+pinAdExit+"\nwindow.scrollTop = "+$(window).scrollTop());
			$("#gpt-pin").slideDown();
		}
		else if (($(window).scrollTop() < pinAdThreshold || $(window).scrollTop() >= pinAdExit) && pinAdShown == true) {
			//hide ad if above entrance threshold or below footer
			pinAdShown = false;
			//console.log("If2: pinAdThreshold = "+pinAdThreshold+"\npinAdShown = "+pinAdShown+"\npinAdExit = "+pinAdExit+"\nwindow.scrollTop = "+$(window).scrollTop());
			$("#gpt-pin").slideUp();
		}
		
	});
	//end pin ad code

});


//user taps the promo handles - needs to be $(document).on() because the promo modules load via ajax
$(document).on('click', '.handle', function(e){
	$(this).prev().addClass('open');
    $(this).addClass('open');
});

//collapse and expand tables in CW wide articles - adding this in the global article.js in case of article-sharing

$(document).ready(function(){

	$(".sectionHeader").next().css("display","none");
	$(".sectionHeader").first().next().css("display","block");
	
	$(".sectionHeader").click(function(){
		$(this).next().slideToggle('slow');
	});

  
});