$(document).ready(function(){  
    $("#ajax-form").submit(function(){
  		   if ($("#subscribe").val() == ""){ alert ("Please enter your email Id...!!"); return false; }

		   //var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		   var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		   var value = $("#subscribe").val();
		   if (reg.test(value)== false){ alert('Invalid Email Address'); return false;	}

		   $("span#ajax-message").html("<center>please wait..</center>");
					$.post(
						"http://www.java4s.com/wp-content/themes/strPro4Tut/ajax-register.php",
						$("#ajax-form").serialize(),
						function(data){
							if (data.success)
								$("span#ajax-message").css({'color':'#549614'});
							else
								$("span#ajax-message").css({'color':'#c0331c'});
							$("span#ajax-message").html(data.message);
						},
						"json"
					);
    });

	$('.pnbuttons img').css('opacity', 0.5);  
	$('.pnbuttons a').hover(  
	   function(){  
		  $(this).find('img').stop().fadeTo('slow', 1);  
	   },  
	   function(){  
		  $(this).find('img').stop().fadeTo('slow', 0.5);  
	   });  

});



$(function() 
{

$("#comment").focus(function()
{
$(this).animate({"height": "130px","width": "99%",}, "slow" );
$("#button_block").slideDown("slow");
return false;
});

$("#cancel").click(function()
{
$("#comment").animate({"height": "20px",}, "show" );
$("#button_block").slideUp("slow");
return false;
});

});
 
 
 
 
 function submitSearchForm() {
 var sb = document.getElementById("si");
 var val = sb.value;
 if(!val) val = "";
 val = val.replace(/^[ ]+/g, "").replace(/[ ]+$/g, "");
 if(val == "" || val=="search this website...") {
 sb.focus();
 return false;
 }
 return true;
 } 