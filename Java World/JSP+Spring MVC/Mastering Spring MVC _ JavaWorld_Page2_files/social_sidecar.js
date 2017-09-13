// contents of old social_sticker.js, minus JS for flyouts and Socialite

    // rate-limits certain functions, handy for attaching to scroll events, for instance
    function debounce(func, wait, immediate){
        var timeout;
        return function(){
            var context = this, args = arguments;
            var later = function(){
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    $(document).ready(function(){
        /* ----- STICKY SHARER ----- */
        // cache the sharer and its offset
        if($('#sharer').length != 0){
            var $sharer = $('#sharer');
            var sharerOffsetTop = $sharer.offset().top;
            var sharerOffsetLeft = $sharer.offset().left;
            var extraOffsetTop = 0;
            if ($('.fixed-search-wrapper').length > 0) {
            	extraOffsetTop = $('.fixed-search-wrapper').outerHeight() + 20; //add another 20 px to the top value in the css too to give a little room between fixed search and sharer
            }
           // var sharerCSSLeft = $sharer.css('left');
        //}

	        // debounce listen to the scroll ( >ie9 only )
	        if (window.addEventListener) {
	            window.addEventListener('scroll', debounce(function(){
	                if($(window).width() > 1139 && $(window).height() > 614){
	                    if (window.scrollY >= (sharerOffsetTop - extraOffsetTop)) {
	                    	$sharer.addClass('sticky').offset({left: sharerOffsetLeft});
	                    }
	                    else {
	                    	$sharer.removeClass('sticky').css('left', '-80px'); 
	                    	sharerOffsetTop = $sharer.offset().top; //recalculate this in case it got calculated weirdly because of a pushdown ticker ad
	                    }
	                }
	            }, 5));   // run maximum of one time every 5ms
	
	            window.addEventListener('resize', debounce(function(){
	                if($(window).width() > 1139){
	                    // the first header of the main section is something we know
	                    // will always be where we want it
	                    sharerOffsetLeft = $($('section[role=main] header')[0]).offset().left - 80;
	                    if($sharer.hasClass('sticky')){
	                        $sharer.css('left', sharerOffsetLeft);
	                    }
	                    
	                } else{
	                	$sharer.removeClass('sticky');
                		$sharer.css('left', '');
                		
	                	if($(window).width() < 1140){
	                		$('car').css('display', 'block');
	                    }
	                }
	            }, 10));
	        }
        }//end if #sharer block

        $('body').click(function(e){
            $('.follow_btn').parent().removeClass('open');
            $('#banner').removeClass('nav-open');
        });

        $('.follow_btn').click(function(e){
        	e.preventDefault();
            e.stopPropagation();
            $(this).parent().toggleClass('open');
        });
        
        // hide sidecar at wide desktop until user scrolls 400px down
        var lastScrollPosition = 0;
    	$(window).scroll(function(){
    		var currentScrollPosition = $(window).scrollTop();
    		if((currentScrollPosition > 400) && ($thm.deviceWidthAtLeast($thm.deviceBreakpoints.wide) || (lastScrollPosition > currentScrollPosition))) {
    			if (!$('#sharer').hasClass('show')) {
    				$('#sharer').addClass('show');
    			}
    		}
    		lastScrollPosition = currentScrollPosition;
    	}); // end hide sidecar at wide desktop

    });
    
//print function
function printPage() {
	var pageUrl = window.location.href;
	var pageUrlSplit = pageUrl.split("?");
	// find nsdr
	var nsdrRegExp = new RegExp('(?:\\?|&)nsdr=(.*?)(?=&|$)','gi');
	var nsdr = "false";
	var match;
	while ((match = nsdrRegExp.exec(document.location.search)) != null) {
		nsdr = match[1];
	}
	// create printForm
	var printForm = document.createElement("form");
	printForm.setAttribute("method", "POST");
	printForm.setAttribute("action", pageUrlSplit[0]);
	printForm.setAttribute("target", "printWindow");
	// hidden printFriendly and nsdr
	var hiddenFieldP = document.createElement("input"); 
	hiddenFieldP.setAttribute("type", "hidden");
	hiddenFieldP.setAttribute("name", "printFriendly");
	hiddenFieldP.setAttribute("value", "true");
	printForm.appendChild(hiddenFieldP);
	var hiddenFieldN = document.createElement("input"); 
	hiddenFieldN.setAttribute("type", "hidden");
	hiddenFieldN.setAttribute("name", "nsdr");
	hiddenFieldN.setAttribute("value", nsdr);
	printForm.appendChild(hiddenFieldN);
	document.body.appendChild(printForm);
	// open print window
	var printerWindow = window.open('about:blank', 'printWindow');
	printForm.submit();
	printerWindow.print();

}