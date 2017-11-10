/*global $*/

var MockBusinessData= {
    BusinessData: [
        {id: 1,
        username: "user1",
        password: "TBD",
        name: "Alice's Restaurant",
        address: {
            street:"123 Place St.",
            city: "Philadelphia",
            state: "PA",
            zip: "12345"
        }
        },
         {id: 2,
         username: "user2",
        password: "TBD",
        name: "Bob's Restaurant",
        address: {
            street:"123 Road St.",
            city: "Philadelphia",
            state: "PA",
            zip: "12345"
        }
        },
         {id: 3,
         username: "user3",
        password: "TBD",
        name: "Colin's Restaurant",
        address: {
            street:"123 Drive St.",
            city: "Philadelphia",
            state: "PA",
            zip: "12345"
        }
        },
         {id: 4,
         username: "user4",
        password: "TBD",
        name: "Debbie's Restaurant",
        address: {
            street:"123 Lane St.",
            city: "Philadelphia",
            state: "PA",
            zip: "12345"
        }
        },
         {id: 5,
         username: "user5",
        password: "TBD",
        name: "Eddie's Restaurant",
        address: {
            street:"123 Avenue St.",
            city: "Philadelphia",
            state: "PA",
            zip: "12345"
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

function getBusinessData() {
    // we use a `setTimeout` to make this asynchronous
    // as it would be with a real AJAX call.
	setTimeout(function(){ displayBusinessData(MockBusinessData)}, 1);
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
	getBusinessData();

}

//  on page load do this
$(document).ready(function() {
	getAndDisplayBusinessData();
})