/*
 * Copyright (c) 2007-2011 ctc systems
 * Version: 2.22 (06/08/2011)
 * Requires: jQuery v1.1.3.1 or later
 *
 * Based on the work of:
 *  1) Matt Oakes (http://portfolio.gizone.co.uk/applications/slideshow/)
 *  2) Torsten Baldes (http://medienfreunde.com/lab/innerfade/)
 *  3) Benjamin Sterling (http://www.benjaminsterling.com/experiments/jqShuffle/)
 */

var pauseslide = 0;
$(function() {
	$("#slideshow").cycle({
		fx: "fade",
		speed: 2000,
		timeout: 3500,
		pager: "#db_nav",
		next:   "#db_next", 
		prev:   "#db_prev",
		pagerAnchorBuilder: function(idx, slide) { 
			return "#db_nav li:eq(" + idx + ") a"; 
		}
	});	
	
	$("#db_toggle").click(function() { 
		if(pauseslide == 0){
			$("#slideshow").cycle("pause");
			pauseslide = 1;
			$(this).toggleClass("pause_sel");
			$("#db_toggle2").toggleClass("play");
		}
		$(this).blur();
	});
	$("#db_toggle2").click(function() { 
		if(pauseslide > 0){
			$("#slideshow").cycle("resume");
			pauseslide = 0;
			$(this).toggleClass("play");
			$("#db_toggle").toggleClass("pause_sel");
		}
		$(this).blur();
	});
});