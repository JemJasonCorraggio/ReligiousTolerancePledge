/*global $*/
/*global localStorage*/

$("certificate.html").ready(function() {
    var token = localStorage.getItem("token");
$.ajax("https://religious-tolerance-pledge.herokuapp.com/certificate",{
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            },
           success: function (imgbase64) { return $(".certificate").html(imgbase64);},
           error: function(type, error) { //window.location.href = "index.html";
     $(".error").removeClass("hidden");
      return $(".error").html("You must take the pledge or sign in to get your certificate.");}
        });

})