$(document).ready(function() { 

	$.preloadCssImages();
	
	function onloadevent(){			
		// The Show
		$('#theshow').css({'display':'block'});
		show();
		// Twitter 
		$('#tweets').tweetable({username: 'drogueriacosmo', time: true, limit: 8, replies: true, position: 'append'});
		// updated()
	}
	
	function show(){
		$('body').animate({'display':'block'}, 50, function(){
			$('#theshow img:nth-child(1)').animate({'opacity':'1'}, 900, function(){
				$('body').animate({'display':'block'}, 3000, function(){
					$('#theshow img:nth-child(2)').animate({'opacity':'1'}, 900, function(){
						$('body').animate({'display':'block'}, 3000, function(){
							$('#theshow img:nth-child(3)').animate({'opacity':'1'}, 900, function(){
								$('body').animate({'display':'block'}, 3000, function(){
									$('#theshow img:nth-child(4)').animate({'opacity':'1'}, 900, function(){
										$('#theshow img:nth-child(1)').css({'opacity':'0'});
										$('#theshow img:nth-child(2)').css({'opacity':'0'});
										$('#theshow img:nth-child(3)').css({'opacity':'0'});
										$('body').animate({'display':'block'}, 3000, function(){
											$('#theshow img:nth-child(4)').animate({'opacity':'0'}, 900, function(){												
												show();
											});
										})
									});
								});
							});
						});
					});
				});
			});
		});
	}
	
	function updated(){
		$('#updated').css({'left':'-200px', 'top':'-200px', 'opacity':'0'}).animate({'left':'0px', 'top':'0px', 'opacity':'1'}, 1800);
	}
	
	$('#screenshots a').click(function(){
		image = $(this).attr('name');
		$('#overlay').css({'display':'block'});
		$('#overlay').animate({'opacity':'1'}, 500, function(){
			$('#overlay #iphone').css({'display':'block'});
			$('#overlay #box').css({'display':'block'});
			$('#overlay #close').css({'display':'block'});
			$('#overlay #closetop').css({'display':'block'});
			$('#box img:nth-child('+ image +')').css({'display':'block'});
		});
	});
	
	$('#overlay #back, #overlay #close, #overlay #closetop').click(function(){
		$('#overlay #iphone').css({'display':'none'});
		$('#overlay #close').css({'display':'none'});
		$('#overlay #box').css({'display':'none'});
		$('#overlay #closetop').css({'display':'none'});
		$('#box img').css({'display':'none'});
		$('#overlay').animate({'opacity':'0'}, 500, function(){
			$(this).css({'display':'none'});
		});
	});
	
	$('#mailname, #mailemail').click(function(){
		if($(this).val() == 'Your name'){ $(this).val(''); }
		if($(this).val() == 'Your email'){ $(this).val(''); }
	});
	
	$('#submit').click(function(){
		function isValidEmail(str) {
			if ((str.indexOf(".") > 2) && (str.indexOf("@") > 0)){
				return true;
			} else {
				return false;
			}
		}
		
		if($('#mailname').val() != '' && $('#mailemail').val() != '' && $('#mailname').val() != 'Your name' && $('#mailemail').val() != 'your eamil'){
			if(isValidEmail($('#mailemail').val()) == true){
				name = $('#mailname').val();
				email = $('#mailemail').val();
				$.ajax({
   					type: "POST",
   					url: "http://www.cosmomovil.com/web/index.php",
   					data: "name="+name+"&email="+email,
   					success: function(msg){
    				 	if(msg != 'error'){
    				 		$("#mail .body").html('<p>Welcome <strong>' + name + '</strong>, <br/> you are successfully subscribed !</p>');
    				 	} else {
    				 		alert('Sorry but something went wrong, please try again later');
    				 	}
   					}
 				});
			} else {
				alert('Please check your email adres');
			}
		} else {
			alert('Please fill in all needed information.');
		}
	});
	
	$(window).load(function (){ 				
		onloadevent();
	});
	
});

// Twitter

(function ($) {
    //define the tweetable plugin
    $.fn.tweetable = function (options) {
        //specify the plugins defauls
        var defaults = {
            limit: 5, 						//number of tweets to show
            username: 'drogueriacosmo', 	//@username tweets to display
            time: false, 					//display date
            replies: false,				//filter out @replys
            position: 'append'			//append position
        };
        //overwrite the defaults
        var options = $.extend(defaults, options);
		//loop through each instance
        return this.each(function (options) {
			//assign our initial vars
            var act = $(this);
            var $tweetList;
            var tweetMonth = '';
            var shortMonths = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
            var api = "http://api.twitter.com/1/statuses/user_timeline.json?screen_name=";
            var count = "&count=";
            //do a JSON request to twitters API
            $.getJSON(api + defaults.username + count + defaults.limit + "&callback=?", act, function (data) {
				//loop through twitters response
                $.each(data, function (i, item) {
					//check for the first loop
                    if (i == 0) {
                    	//create an unordered list to store tweets in
                        $tweetList = $('<ul class="tweetList">')[defaults.position.toLowerCase() + 'To'](act);
                    }
                    //handle @reply filtering if required
                    if (defaults.replies === false) {
                        if (item.in_reply_to_status_id === null) {
                            $tweetList.append('<li class="tweet_content_' + i + '"><p class="tweet_link_' + i + '">' + item.text.replace(/#(.*?)(\s|$)/g, '<span class="hash">#$1 </span>').replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '<a href="$&">$&</a> ').replace(/@(.*?)(\s|\(|\)|$)/g, '<a href="http://twitter.com/$1">@$1 </a>$2')+'</p></li>');
                        }
                    } else {
                        $tweetList.append('<li class="tweet_content_' + i + '"><p class="tweet_link_' + i + '">' + item.text.replace(/#(.*?)(\s|$)/g, '<span class="hash">#$1 </span>').replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '<a href="$&">$&</a> ').replace(/@(.*?)(\s|\(|\)|$)/g, '<a href="http://twitter.com/$1">@$1 </a>$2') + '</p></li>');
                    }
                    //display the tiem of tweet if required
                    if (defaults.time == true) {
                    	for(var iterate=0; iterate<=12; iterate++) {
                    		if(shortMonths[iterate] == item.created_at.substr(4, 3)) {
								tweetMonth = iterate + 1;
								if(tweetMonth < 10) {
									tweetMonth = '0' + tweetMonth;
								}
	                   		} 	
                    	}
                        $('.tweet_link_' + i).append('<small> ' + item.created_at.substr(8, 2) + '/' + tweetMonth + '/' + item.created_at.substr(26,4) + ' ' + item.created_at.substr(11,8) + '</small>');
                    }
                });
                //close the unordered list
               });
        });
    }
})(jQuery);


$(function() {
	$( '#tabs' ).tabs();
	
	$( "#accordion" ).accordion({
		autoHeight: false,
		navigation: true
	});
	
	$( "#formulation_accordion" ).accordion({
		autoHeight: false,
		navigation: true
	});
	
	
	// the next code is for identifying the tab when it is click it and the drop the right information 
	
	$("#important_contenidos").hide();
	
	$("#tabs").bind("tabsselect", function(event, ui) {
		if ( ui.index == 0) {  $("#important_contenidos").hide("slow");
							   $("#important_description").slideDown("slow");}
		
		if ( ui.index == 1) { 	
								$("#important_description").hide("slow");
								$("#important_contenidos").slideDown("slow"); }
		
		if ( ui.index == 2) {  
								$("#important_description").hide("slow");
								$("#important_contenidos").slideDown("slow");}
	});
	
});



