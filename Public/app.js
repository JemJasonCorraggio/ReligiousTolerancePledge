/*global $*/
var MockBusinessData= {
    BusinessData: [
        {id: 1,
        username: "user1",
        password: "passwprd",
        name: "Alice's Restaurant",
        address: {
            street:"123 Place St.",
            city: "Philadelphia",
            state: "PA",
            zip: "12345"
        },
           validatePassword: function(password) {
  return password===this.password;
}
        },
         {id: 2,
         username: "user2",
        password: "passwprd",
        name: "Bob's Restaurant",
        address: {
            street:"123 Road St.",
            city: "Philadelphia",
            state: "PA",
            zip: "12345"
        },
           validatePassword: function(password) {
  return password===this.password;
}
        },
         {id: 3,
         username: "user3",
        password: "passwprd",
        name: "Colin's Restaurant",
        address: {
            street:"123 Drive St.",
            city: "Philadelphia",
            state: "PA",
            zip: "12345"
        },
           validatePassword: function(password) {
  return password===this.password;
}
        },
         {id: 4,
         username: "user4",
        password: "passwprd",
        name: "Debbie's Restaurant",
        address: {
            street:"123 Lane St.",
            city: "Philadelphia",
            state: "PA",
            zip: "12345"
        },
           validatePassword: function(password) {
  return password===this.password;
}
        },
         {id: 5,
         username: "user5",
        password: "passwprd",
        name: "Eddie's Restaurant",
        address: {
            street:"123 Avenue St.",
            city: "Philadelphia",
            state: "PA",
            zip: "12345"
        },
           validatePassword: function(password) {
  return password===this.password;
}
        }
        ]
};

var RESULT_HTML_TEMPLATE = (
    '<div><p></p>' +
    '<p class="name"></p>'+
    '<p class="addressLine1"></p>'+
    '<p class="addressLine2"></p>'+
    '</div>'
    );

function getBusinessData(callbackFn) {
    // we use a `setTimeout` to make this asynchronous
    // as it would be with a real AJAX call.
	setTimeout(function(){ callbackFn(MockBusinessData)}, 100);
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
        var results = data.BusinessData.map(function(item, index) {
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
        var _user=MockBusinessData.BusinessData.find(function(item){return item.username===user;});
         user = _user;
         var errMessage;
         if (!user) {
        // Return a rejected promise so we break out of the chain of .thens.
        // Any errors like this will be handled in the catch block.
        errMessage="Incorrect Username or Password";
      }
      console.log(user);
      if (!user.validatePassword(password)) {
             errMessage="Incorrect Username or Password";
      }
      else { window.location.href = "certificate.html";}
    if(errMessage) {
     $(".error").removeClass("hidden");
      return $(".error").html(errMessage||"server error");
    }
});
})