/*global $*/
/*global localStorage*/


var RESULT_HTML_TEMPLATE = (
    '<div><p></p>' +
    '<p class="name"></p>'+
    '<p class="addressLine1"></p>'+
    '<p class="addressLine2"></p>'+
    '</div>'
    );

function getBusinessData(callbackFn) {
    var data = $.ajax("https://religious-tolerance-pledge.herokuapp.com/businesses",{
            method: "GET",
           success: function (data) {  return data.body; },
        });
    // we use a `setTimeout` to make this asynchronous
    // as it would be with a real AJAX call.
	callbackFn(data);
}
function renderResult(result) {
    var template = $(RESULT_HTML_TEMPLATE);
    template.find(".name").text(result.name);
    template.find(".addressLine1").text(result.address.street);
    template.find(".addressLine2").text(result.address.city + ", "+result.address.state + " "+result.address.zip);
    return template;
}

// this function stays the same when we connect
// to real API later
function displayBusinessData(data) {
        var results = data.map(function(item, index) {
         return renderResult(item);    
        });
    $(".businesses").html(results);
}


// this function can stay the same even when we
// are connecting to real API
function getAndDisplayBusinessData() {
	getBusinessData(displayBusinessData);

}


//  on page load do this
$(document).ready(function() {
	getAndDisplayBusinessData();
	$(".login").submit(function(event) {
        event.preventDefault();
        let userTarget = $(event.currentTarget).find(".js-user");
        var user = userTarget.val();
        let targetPass =$(event.currentTarget).find(".js-pass");
        var password = targetPass.val();
        var errMessage;
          $.ajax("https://religious-tolerance-pledge.herokuapp.com/login",{
            method: "POST",
           data: {user, password},
           success: function (token) { localStorage.setItem("token", token); return window.location.href = "certificate.html"; },
           error: function(type, error) { return errMessage=error;}
        });
    if(errMessage) {
     $(".error").removeClass("hidden");
      return $(".error").html(errMessage||"server error");
    }
});
$(".signup").submit(function(event) {
        event.preventDefault();
        let userTarget = $(event.currentTarget).find(".new-user");
        var user = userTarget.val();
        let targetPass =$(event.currentTarget).find(".new-pass");
        var password = targetPass.val();
        var targetName = $(event.currentTarget).find(".new-name");
        let name = targetName.val();
        var targetStreet = $(event.currentTarget).find(".new-street");
        let street = targetStreet.val();
        var targetCity = $(event.currentTarget).find(".new-city");
        let city = targetCity.val();
        var targetState = $(event.currentTarget).find(".new-state");
        let state = targetState.val();
        var targetZip = $(event.currentTarget).find(".new-zip");
        let zip = targetZip.val();
        var newBusiness = {
            username: user,
            password: password,
            name: name,
            address: {
                street: street,
                city: city,
                state: state,
                zip: zip
            }
        };
        var errMessage;
        $.ajax("https://religious-tolerance-pledge.herokuapp.com/businesses",{
            method: "POST",
           data: newBusiness,
           success: function (token) { localStorage.setItem("token", token); return window.location.href = "certificate.html"; },
           error: function(type, error) { return errMessage=error;}
        });
    if(errMessage) {
     $(".error").removeClass("hidden");
      return $(".error").html(errMessage||"server error");
    }
});
})