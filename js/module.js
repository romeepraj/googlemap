var MapModule = (function(){
  var markerImage = {marker :'images/pin.png', markerhover:'images/pin-hover.png'};
  function CreateMap(data)
  {
      this.newMap = new google.maps.Map(document.getElementById('map'),
      {
         zoom:14,
         center: data,
         mapTypeId: 'hybrid',
         disableDefaultUI:true,
         scrollwheel: false,
         navigationControl: false,
         mapTypeControl: false,
         scaleControl: false,
         draggable: false,
         panControl:false,
         disableDoubleClickZoom: true,
         dblclick:false,
         clickableIcons: false
      });
      this.mapStyle = [ 
          {
            featureType: "all",
            stylers: [{ visibility: "off" }]
          },
          {
            featureType: 'administrative.locality',
            elementType: 'labels',
            stylers: [{ visibility: "on"}]
          },
          {
            featureType: 'poi.attraction',
            elementType: 'labels',
            stylers: [{ visibility: "on" }]
          },
          {
              featureType: 'road.highway',
              elementType: 'labels',
              stylers: [{ visibility: "on" }]
          },
            {
              featureType: 'road.arterial',
              elementType: 'labels',
              stylers: [{ visibility: "on" }]
            }
        ];
        this.newMap.set('styles', this.mapStyle);


      this.newMap.addListener('click', function(e) {
         $(".itemcontent").stop().animate({left:'-' + $(".itemcontent").width()},1000);
      });
  }
  CreateMap.prototype.CreateMarker = function(data)
  {
      var markerI = {
            url: markerImage.marker, 
            scaledSize : new google.maps.Size(48, 48)
      };
      var newMarker = new google.maps.Marker({
         position: data,
         title: data.title,
         icon:markerI
      });
      newMarker.addListener('click', function() {

        $(".itemcontent").css("left",'-' + $(".itemcontent").width() + "px");
          // $(".blades").append("<div class='close'>X</div><div class='inner'><div class='blade-img'><img src='"+ data.image + "'></div><div class='blades-content'><h1>" + data.title + "</h1><div class='blades-desc'>"+ data.description +"</div></div></div>");
          $("#item_img").attr("src",data.image);
          $(".blades-content h1").text(data.title);
          $(".blades-desc").html(data.description);
          $(".itemcontent").stop().animate({left:0},1000);

          $('.close').click(function(){
                   $(".itemcontent").stop().animate({left:'-' + $(".itemcontent").width()},1000);
          });
      });
      with ({ markerImageData: markerImage, markerImg:markerI }) {
         newMarker.addListener('mouseover', function() {
            markerImg.url = markerImageData.markerhover;
            this.setIcon(markerImg);
         });
         newMarker.addListener('mouseout', function() {
            markerImg.url = markerImageData.marker;
            this.setIcon(markerImg);
         });
      }
      newMarker.setMap(this.newMap);
  }

   CreateMap.prototype.OuterLay = function(){
      var bounds = new google.maps.LatLngBounds();
      var srcImage = '../images/map-overlay.png';
      overlay = new USGSOverlay(bounds, srcImage, this.newMap);
   }


    /** @constructor */
  function USGSOverlay(bounds, image, map) {

    // Initialize all properties.
    this.bounds_ = bounds;
    this.image_ = image;
    this.map_ = map;

    // Define a property to hold the image's div. We'll
    // actually create this div upon receipt of the onAdd()
    // method so we'll leave it null for now.
    this.div_ = null;

    // Explicitly call setMap on this overlay.
    this.setMap(map);
  }
    USGSOverlay.prototype = new google.maps.OverlayView();

  /**
   * onAdd is called when the map's panes are ready and the overlay has been
   * added to the map.
   */
  USGSOverlay.prototype.onAdd = function() {

    var div = document.createElement('div');
    div.style.borderStyle = 'none';
    div.style.borderWidth = '0px';
    div.style.position = 'absolute';

    // Create the img element and attach it to the div.
    var img = document.createElement('img');
    img.src = this.image_;
    img.style.width = '100vw';
    img.style.height = '100vh';
    img.style.position = 'absolute';
    div.appendChild(img);

    this.div_ = div;

    // Add the element to the "overlayLayer" pane.
    var panes = this.getPanes();
    panes.overlayLayer.appendChild(div);
  };

  USGSOverlay.prototype.draw = function() {
  };


  return{
    CreateMap: CreateMap,
  }

}());