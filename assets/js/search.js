$(document).ready(function(){
  ajax({
    url: "https://developers.zomato.com/api/v2.1/categories",
    beforeSend: function( req ) {
      req.setRequestHeader(name,value);
    }
  })

});
