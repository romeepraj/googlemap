var center = {lat: 48.85, lng: 2.35};
var googleMap = new MapModule.CreateMap(center);
$(document).ready(function(){
    $.get("data/address.json", function(result){
        $.each(result, function(i, field){
          console.log(result);
            googleMap.CreateMarker(result[i]);
        });
    });
});

googleMap.OuterLay();


