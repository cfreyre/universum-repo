/*
 * Copyright (c) 2007-2011 ctc systems
 * Version: 2.22 (06/08/2011)
 * Requires: jQuery v1.1.3.1 or later
 *
 */

$(function() {
	$( "#tabs" ).tabs();
	
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
	});  //End tabselect show and hide code
	
});
