var MapModule = (function(){
  //Marker normal and hover images
  var markerImage = {marker :'images/pin.png', markerhover:'images/pin-hover.png'};

  /** @constructor */
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

      //Map feature styles to show only specific locations & road
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

        //Set style to the map
        this.newMap.set('styles', this.mapStyle);

      //Close blades, when clicked on anywhere on the map
      this.newMap.addListener('click', function(e) {
         $(".itemcontent").stop().animate({left:'-' + $(".itemcontent").width()},1000);
      });
  }

  //Add CreateMarker method, which will add marker to the map given the input json data
  CreateMap.prototype.CreateMarker = function(data)
  {
      //create variable with the marker Image and the markersize
      var markerI = {
            url: markerImage.marker, 
            scaledSize : new google.maps.Size(48, 48)
      };

      //create marker
      var newMarker = new google.maps.Marker({
         position: data,
         title: data.title,
         icon:markerI
      });

      //When marker is clicked, blade element will be populated and slide in from left
      newMarker.addListener('click', function() {

        $(".itemcontent").css("left",'-' + $(".itemcontent").width() + "px");
          $("#item_img").attr("src",data.image);
          $(".blades-content h1").text(data.title);
          $(".blades-desc").html(data.description);
          $(".itemcontent").stop().animate({left:0},1000);

          //Slide out blade when close button is clicked
          $('.close').click(function(){
                   $(".itemcontent").stop().animate({left:'-' + $(".itemcontent").width()},1000);
          });
      });

      //Change marker image on mouseover and mouseout of the marker
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

      //Add marker to the map
      newMarker.setMap(this.newMap);
  }

  //Method to add given overlay image to the map
   CreateMap.prototype.addOverlayImage = function(image){
      if(image.length > 0){
        var bounds = new google.maps.LatLngBounds();
        var srcImage = image;
        overlay = new USGSOverlay(bounds, srcImage, this.newMap);
      }
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