$(document).ready(function() {
  $(".button-collapse").sideNav();
});

function initMap() {
  var cuisine = "";
  var apiKey = '82734c090e0f0e10ad946c6239e028bb';
  var latitud = -33.4573805;
  var longitud = -70.5939723;
  var zoom = 12;
  var map = new google.maps.Map(document.getElementById("map"));
  resetMap();

  selectCocinerias(apiKey);
  onMap(apiKey);

  $(".selectCuisines").on("change", function(){
    cuisine = $(this).val();
    resetMap();
  });

  function resetMap() {
    map = new google.maps.Map(document.getElementById("map"),{
      zoom: zoom,
      center: {lat: latitud, lng: longitud},
      mapTypeControl: true,
      zoomControl: true,
      streetViewControl: true
    });

    google.maps.event.addListener(map, 'zoom_changed', function() {
      zoom = map.getZoom();
    });

    google.maps.event.addListener(map, 'idle', function(event){
      latitud = map.getCenter().lat();
      longitud = map.getCenter().lng();
    });

    onMap(apiKey);
  }
  //Llamamos a la seccion de cocinerias y llenamos el select con las existentes
  function selectCocinerias(apiKey) {
    var url = 'https://developers.zomato.com/api/v2.1/cuisines';

    $.ajax({
      url: url,
      type: 'GET',
      beforeSend: function(request) {
        request.setRequestHeader("user-key", apiKey);
      },
      dataType: 'json',
      data: {
        'lat': latitud,
        'lon': longitud
      }
    })
    .done(function(response){
      response.cuisines.forEach(function(single) {
        var id = single.cuisine.cuisine_id;
        var cuisine = single.cuisine.cuisine_name;
        //Aqui se toman y se ponen detro de las opciones
        var option = `<option value="${id}">${cuisine}</option>`;
        $(".selectCuisines").append(option);
      })
    })
    .fail(function() {
      console.log("error");
    });
  }
  //Funcion que busca los locales por tipo
  function onMap(apiKey) {
    var url = 'https://developers.zomato.com/api/v2.1/search?';

    $.ajax({
      url: url,
      type: 'GET',
      beforeSend: function(request) {
        request.setRequestHeader("user-key", apiKey);
      },
      dataType: 'json',
      data: {
        'lat': latitud,
        'lon': longitud,
        'entity_id' : "83",
        'cuisines': cuisine
      }
    })
    .done(function(response){
      response.restaurants.forEach(function(single) {
        var lat = single.restaurant.location.latitude;
        var lon = single.restaurant.location.longitude;
        pinLocal(lat, lon);
      })
    })
    .fail(function() {
      console.log("error");
    })
  }
  //Pin que marca el local
  function pinLocal(lat, lon) {
    var marker = pin(map);
    marker.setPosition(new google.maps.LatLng(lat,lon));
    marker.setVisible(true);
  }
  //Creando el pin con sus valores
  function pin(map) {
    var icono = {
      url: 'dist/img/pin.png',
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
    };

    var marker = new google.maps.Marker({
      map: map,
      icon: icono,
      anchorPoint: new google.maps.Point(0, -29)
    });

    return marker;
  }
};