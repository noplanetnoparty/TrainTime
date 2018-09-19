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

var currTime = new Date();
var format = dateFns.format

var trainData = {
    tName: '',
    tDest: '',
    tFreq: 0,
    timeString: '',
    currTime: '',
    firstTrain: '',
    nextTrain: ''
};

$("#submit").on("click", function () {
    trainData.tName = $('#tName').val();
    trainData.tDest = $('#tDest').val();

    var firstTime = $('#firstTrain').val();
    trainData.timeString = format(new Date(firstTime), 'hh:mm');
    
    trainData.tFreq = $('#tFreq').val();

    database.ref().push(trainData)
})

database.ref().on("child_added", function (childSnapshot) {
    $('#tableContents').append('<tr>' + '<td>' + childSnapshot.val().tName + '<td>' + childSnapshot.val().tDest + '<td>' + childSnapshot.val().timeString + '<td>' + childSnapshot.val().tFrequency + '<td>' + childSnapshot.val().tMinutesTillTrain)

})


console.log(format(firstTime, 'HH:mm'))
// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = format(dateFns.subYears(firstTime, 1), 'HH:mm');
console.log(firstTimeConverted);

// Current Time
var currentTime = new Date();
console.log("CURRENT TIME: " + format(currentTime, "hh:mm"));

// Difference between the times
var diffTime = dateFns.differenceInMinutes(new Date(), dateFns.subYears(firstTime, 1));
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = dateFns.addMinutes(new Date(), tMinutesTillTrain);
console.log("ARRIVAL TIME: " + format(nextTrain, "hh:mm"));