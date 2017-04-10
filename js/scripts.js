//Variale for the center of the map to diplay
var center = {lat: 48.85, lng: 2.35};

//Create Map with the center
var googleMap = new MapModule.CreateMap(center);

//Get marker data and add to the map
$(document).ready(function(){
    $.get("data/address.json", function(result){
        $.each(result, function(i, field){
            //console.log(result);
            googleMap.CreateMarker(result[i]);
        });
    });
});

//Add Overlay
googleMap.addOverlayImage("../images/map-overlay.png");

//Disable scale in Mobile Safari
document.addEventListener('touchmove', function(event) {
    event = event.originalEvent || event;
    if(event.scale > 1) {
      event.preventDefault();
    }
  }, false);


