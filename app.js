/*global $ */

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

function getBusinessData(callbackFn) {
    // we use a `setTimeout` to make this asynchronous
    // as it would be with a real AJAX call.
	setTimeout(function(){ callbackFn(MockBusinessData)}, 1);
}

// this function stays the same when we connect
// to real API later
function displayBusinessData(data) {
    var index = 0;
    for (index in data.BusinessData) {
	   $('body').append(
        '<p>' + data.BusinessData[index].name + '</p>'+
        '<p>' + data.BusinessData[index].address.street + '</p>'+
        '<p>' + data.BusinessData[index].address.city + ', '+data.BusinessData[index].address.state + ' '+data.BusinessData[index].address.zip+ '</p>');
        index ++;
    }
}

// this function can stay the same even when we
// are connecting to real API
function getAndDisplayBusinessData() {
	getBusinessData(displayBusinessData());
}

//  on page load do this
$(function() {
	getAndDisplayBusinessData();
})