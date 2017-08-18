// SEARCH
var myUrl = 'https://developers.zomato.com/api/v2.1/search';
var key = 'd79b356002229fc294e09c308a4c8643';
var cityCode = ['67','73','83','97','257','280'];

$(document).ready(function(){
  cityCode.forEach(function(el){
    $.ajax({
      url: myUrl,
      type: 'GET',
      dataType: 'json',
      data: {
        entity_type : 'city',
        entity_id : el
      },
      beforeSend: function(request) {
        request.setRequestHeader("user-key", key);
      }

    })
    .done(function(res){
      res.restaurants.forEach(function(el){
        var name = el.restaurant.name;
        var img = el.restaurant.thumb;
        var elId = el.restaurant.id;
        var type = el.restaurant.cuisines;
        var city = el.restaurant.location.city;
        var cityId = el.restaurant.location.city_id;
        var address = el.restaurant.location.address;
        var locality = el.restaurant.location.locality;
        var currency = el.restaurant.currency;
        var cost = el.restaurant.average_cost_for_two;
        var rating = el.restaurant.user_rating.aggregate_rating;

        if(img == ""){
          img = 'https://cdn.pixabay.com/photo/2014/05/18/11/25/pizza-346985_960_720.jpg';
        }

        var estructura = ('<div class="col s4 m4" id="' + elId +'"> <div class="card center-align">' +
        '<img src="' + img + '">' + '<b>' + name +
        '</b><p class="card-content"> ' + locality + '<i class="material-icons">restaurant</i></p>' +
        '</div></div>');

        $('.selectCity').append('<option value="'+ city +'" id="'+ cityId +'">'+ city +'</option>');

        var map = {};
        $('.selectCity option').each(function () {
          if (map[this.value]) {
            $(this).remove()
          }
          map[this.value] = true;
        })

        $(document).keypress(function(e) {
          if(e.which == 13) {
            var selectCity = $(".selectCity").val();
            if (selectCity == city){
              $('.list').append(estructura);
            }
          }

          $('#'+ elId).click(function() {
            $('#footer-fixed').empty();
            $('#footer-fixed').append(`<div class="container">
                <div class="row white-text center uppercase title">`+ name +` <i class="material-icons right-align">favorite</i></div>
                <div class="row center white">
                  <h6 class="orange-text">Address</h6>
                  <p>` + address + `</p>
                  <h6 class="orange-text">Price</h6>
                  <p>`+ currency + cost +`</p>
                  <h6 class="orange-text">Rating</h6>
                  <p>` + rating +`</p>
                </div>
              </div>`)

          });
        });
      });
    })
    .fail(function() {
      console.log("error");
    })
  })
});
