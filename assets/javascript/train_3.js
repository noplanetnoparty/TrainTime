var config = {
    apiKey: "AIzaSyBtoUP8A4HEELJaJWSpIp47s-trOG4EBeo",
    authDomain: "trains-9796b.firebaseapp.com",
    databaseURL: "https://trains-9796b.firebaseio.com",
    projectId: "trains-9796b",
    storageBucket: "trains-9796b.appspot.com",
    messagingSenderId: "1056638807558"
};
firebase.initializeApp(config);

var database = firebase.database();

var trainData = {
    tName: '',
    tDest: '',
    tFreq: 0,
    startTime: '',
    timeString: '',
    currTime: '',
    minsAway: '',
}

// var format = dateFns.format
// var currTime = new Date();

// console.log(currentTime);

$("#submit").on("click", function () {
    event.preventDefault();

    trainData.tName = $("#tName").val();
    trainData.tDest = $("#tDest").val();
    trainData.tFreq = $("#tFreq").val();
    trainData.startTime = $("#startTime").val();

    database.ref().push(trainData)
})

// database.ref().on("child_added", function(childSnapshot){
//     $("#tableContents").append()
// })

database.ref().on("child_added", function (childSnapshot) {
    $('#tableContents').append('<tr>' + '<td>' + childSnapshot.val().tName + '<td>' + childSnapshot.val().tDest + '<td>' + childSnapshot.val().tFreq + '<td>' + childSnapshot.val().timeString + '<td>' + childSnapshot.val().tMinTilTrain)
})

var hour = startTime.split(':')[0]
var min = startTime.split(':')[1]

//Add hours and minutes to today's date
var currTime = dateFns.setHours(new Date(), hour);
currTime = dateFns.setMinutes(currTime, min);

console.log('timeString: ' + trainData)