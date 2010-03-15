// jQuery object
jQuery.gmapUi = function(map,options){
	// Check if the browser is compatible with Google Maps
	if (!window.GBrowserIsCompatible || !GBrowserIsCompatible() || !map.isLoaded() ) return false;
	
	var gmapUi_map = map;
	var gmapUi_mapCenter = map.getCenter();
    var gmapUi_mapContainer = '#'+ map.getContainer().id;
    
  	// définition des paramètres par défaut
    var defaults = {
        mapControl: 'GLargeMapControl', //  GSmallMapControl , GSmallZoomControl , 
        mapTypeControl : true
    }; 
   
      
    // mélange des paramètres fournis et des paramètres par défaut
   options = $.extend(defaults, options);      
     

    
    if(options.mapTypeControl){
        // map types tool bar   
	    $('<span id="gmapUi_toolbar" style="padding: 4px 0px 4px 3px;" class="ui-widget-header ui-corner-all">')
	    .css({float:'right', position:'absolute', right:'0px', margin : '8px 4px 0px 0px',opacity: '0.8'})
	    .append('<span id="gmapUi_mapTypes"></span>')
	    .appendTo(gmapUi_mapContainer);
	    
	    var gmapUi_maps = map.getMapTypes();
	    var gmapUi_currMap = map.getCurrentMapType(); 
		for (var i = 0; i<gmapUi_maps.length; i++){
	  	  // var s = gmapUi_maps[i].getName();
	  	  // alert(gmapUi_maps[i]);
	  	  if(gmapUi_currMap == gmapUi_maps[i]) checked="checked";else checked="";  
	  	   $('<input type="radio" onclik="" id="gmapUi_map_'+i+'" name="map" value="'+i+'"  '+checked+' /><label for="gmapUi_map_'+i+'">' + gmapUi_maps[i].getName() + '</label>')
	  	   .change(function() {
	  	       var i = $(this).attr('value');
			   map.setMapType(gmapUi_map.getMapTypes()[i]);
		    })
	  	   .appendTo("#gmapUi_mapTypes");
	    }
	   $("#gmapUi_mapTypes").buttonset();
   }

   switch (options.mapControl){
     case 'GSmallMapControl' :
     	addMapControl();	
     	addGSmallMapControlZoom();
     	break;
     case 'GSmallZoomControl' :
    	addGSmallZoomControl();
        break;
     default : 
     	addMapControl();
     	addGLargeMapControlZoom();

   }
   

   
   function addZoomControl(){
   
   }
   
   function addMapControl(){
	     //left button
	    $('<button id="left">left</button>').button({
			text: false,
			icons: {
				primary: 'ui-icon-triangle-1-w'
			}
		})
		.removeClass('ui-corner-all')
		.addClass('ui-corner-left')
	
		.css({ top:'32px', left:'5px' , float:'left' , position:'absolute' , opacity: '0.8' })
		.click(function() {
		   //pan the map horizontally to right
			map.panDirection(1, 0);
		})
		.appendTo(gmapUi_mapContainer);
		
		// right button
		$('<button id="right">right</button>').button({
			text: false,
			icons: {
				primary: 'ui-icon-triangle-1-e'
			}
		})
		.removeClass('ui-corner-all')
		.addClass('ui-corner-right')
		.css({ top:'32px', left:'54px' , float:'left' , position:'absolute',opacity: '0.8'})
		.click(function() {
			//pan the map horizontally to left
			map.panDirection(-1, 0);
		})
		.appendTo(gmapUi_mapContainer);
		
		//up button
	    $('<button id="up">up</button>').button({
			text: false,
			icons: {
				primary: 'ui-icon-triangle-1-n'
			}
		})
		.removeClass('ui-corner-all')
		.addClass('ui-corner-top')
		.css({ top:'7px', left:'30px' , float:'left' , position:'absolute' , opacity: '0.8' })
		.click(function() {
			//pan the map vertically to downwards
			map.panDirection(0, 1);
		})
		.appendTo(gmapUi_mapContainer);
		
		// down button	
		$('<button id="down">down</button>').button({
			text: false,
			icons: {
				primary: 'ui-icon-triangle-1-s'
			}
		})
		.removeClass('ui-corner-all')
		.addClass('ui-corner-bottom')
		.css({ top:'56px', left:'30px' , float:'left' , position:'absolute' , opacity: '0.8'})
		.click(function() {
			//pan the map vertically to upwards
			map.panDirection(0, -1);
		})
		.appendTo(gmapUi_mapContainer);
	
		// main button
		$('<button id="main" style="z-index: 1000">center</button>').button({
			text: false,
			icons: {
				primary: 'ui-icon-flag'
			}
		})
		.removeClass('ui-corner-all')
		.css({ top:'32px', left:'30px' , float:'left' , position:'absolute' , opacity: '0.8'})
		.click(function() {
			//pan the map to the center
			var lat = map.getCenter().lat();
			var lng = map.getCenter().lng(); 

			map.panTo(gmapUi_mapCenter);
			
		})
		.appendTo(gmapUi_mapContainer);
   }
   
   function addGSmallMapControlZoom(){
   		// zoom +
		$('<button id="zoom_plus">zoom plus</button>').button({
				text: false,
				icons: {
					primary: 'ui-icon-plus'
				}
	     })
		.removeClass('ui-corner-all')
		.addClass('ui-corner-top')
	    .css({ top:'90px', left:'30px' , float:'left' , position:'absolute' , opacity: '0.8' , 'z-index':100})
		.click(function() {
		     map.zoomIn();
			 $("#slider-vertical").slider("value", map.getZoom());	
	    })
		.appendTo(gmapUi_mapContainer);
		
		// zoom -	
		$('<button id="zoom_minus">zoom minus</button>').button({
				text: false,
				icons: {
					primary: 'ui-icon-minus'
				}
		})
		.removeClass('ui-corner-all')
		.addClass('ui-corner-bottom')
		.css({ top:'115px', left:'30px' , float:'left' , position:'absolute' , opacity: '0.8' , 'z-index':100})
		.click(function() {
			 gmapUi_map.zoomOut();
			 $("#slider-vertical").slider("value", gmapUi_map.getZoom());
		})
	    .appendTo(gmapUi_mapContainer);
   }
    
    
   function addGSmallZoomControl(){
      		// zoom +
		$('<button id="zoom_plus">zoom plus</button>').button({
				text: false,
				icons: {
					primary: 'ui-icon-plus'
				}
	     })
		.removeClass('ui-corner-all')
		.addClass('ui-corner-top')
	    .css({ top:'7px', left:'10px' , float:'left' , position:'absolute' , opacity: '0.8' , 'z-index':100})
		.click(function() {
		     map.zoomIn();
			 $("#slider-vertical").slider("value", map.getZoom());	
	    })
		.appendTo(gmapUi_mapContainer);
		
		// zoom -	
		$('<button id="zoom_minus">zoom minus</button>').button({
				text: false,
				icons: {
					primary: 'ui-icon-minus'
				}
		})
		.removeClass('ui-corner-all')
		.addClass('ui-corner-bottom')
		.css({ top:'32px', left:'10px' , float:'left' , position:'absolute' , opacity: '0.8' , 'z-index':100})
		.click(function() {
			 gmapUi_map.zoomOut();
			 $("#slider-vertical").slider("value", gmapUi_map.getZoom());
		})
	    .appendTo(gmapUi_mapContainer);
   }
  
   function  addGLargeMapControlZoom(){	

		$('<div style="height:120px; margin-left: 8px;" id="slider-vertical"></div>')
		.css({ top:'115px', left:'30px' , float:'left' , position:'absolute' , opacity: '0.8'})
		.slider({
			orientation: "vertical",
			range: "min",
			min: 0,
			max: 15,
			value: map.getZoom(),
			slide: function(event, ui) {
				//$("#amount").val(ui.value);
			},
			stop: function(event, ui) { gmapUi_map.setZoom(ui.value); }
			
		})
		.removeClass('ui-corner-all')
		.appendTo(gmapUi_mapContainer);
		
		// zoom +
		$('<button id="zoom_plus">zoom plus</button>').button({
				text: false,
				icons: {
					primary: 'ui-icon-plus'
				}
	     })
		.removeClass('ui-corner-all')
		.addClass('ui-corner-top')
	    .css({ top:'90px', left:'30px' , float:'left' , position:'absolute' , opacity: '0.8' , 'z-index':100})
		.click(function() {
		     gmapUi_map.zoomIn();
			 $("#slider-vertical").slider("value", gmapUi_map.getZoom());	
	    })
		.appendTo(gmapUi_mapContainer);
		
		// zoom -	
		$('<button id="zoom_minus">zoom minus</button>').button({
				text: false,
				icons: {
					primary: 'ui-icon-minus'
				}
		})
		.removeClass('ui-corner-all')
		.addClass('ui-corner-bottom')
		.css({ top:'236px', left:'30px' , float:'left' , position:'absolute' , opacity: '0.8' , 'z-index':100})
		.click(function() {
			 gmapUi_map.zoomOut();
			 $("#slider-vertical").slider("value", gmapUi_map.getZoom());
		})
	    .appendTo(gmapUi_mapContainer);
   }

	
}
