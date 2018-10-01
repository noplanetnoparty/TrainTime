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


$("#submit").on("click", function () {
    event.preventDefault();

    trainData.tName = $('#tName').val();
    trainData.tDest = $('#tDest').val();
    trainData.firstTime = $('#firstTime').val();
    // var firstTime = $('#firstTime').val();

    trainData.tFreq = $('#tFreq').val();

    console.log(trainData.tName);

    database.ref().push(trainData)
})

var currTime = new Date();
var format = dateFns.format;

var trainData = {
    tName: '',
    tDest: '',
    tFreq: 0,
    timeString: '',
    currTime: '',
    firstTime: '',
    nextTrain: ''
};

database.ref().on("child_added", function (childSnapshot) {

    var trainData = {
        tName: '',
        tDest: '',
        tFreq: 0,
        timeString: '',
        currTime: '',
        firstTime: '',
        nextTrain: ''
    };

    var timeString = childSnapshot.val().firstTime;

    var tArrival = timeString.split(':');
    var finalFirstTrain = currTime.setHours(tArrival[0]);
    var superFirstTrain = currTime.setMinutes(tArrival[1]);
    // firstTime.split(':')
    console.log(finalFirstTrain);


    // trainData.timeString = format(new Date(firstTime), 'HH:mm');


    // console.log(format(firstTime, 'HHmm'))
    // First Time (pushed back 1 year to make sure it comes before current time)
    // var firstTimeConverted = format(dateFns.subYears(firstTime, 1), 'HHmm');
    // console.log(firstTimeConverted);

    // Current Time
    // var currentTime = new Date();
    // console.log("CURRENT TIME: " + format(currentTime, "HHmm"));

    // Difference between the times
    var diffTime = dateFns.differenceInMinutes(new Date(), dateFns.subYears(tArrival, 1));
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFreq;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = dateFns.addMinutes(new Date(), tMinutesTillTrain);
    console.log("ARRIVAL TIME: " + format(nextTrain, "HHmm"));

    $('#tableContents').append('<tr>' + '<td>' + childSnapshot.val().tName + '<td>' + childSnapshot.val().tDest + '<td>' + childSnapshot.val().tFreq + '<td>' + childSnapshot.val().nextTrain + '<td>' + childSnapshot.val().tMinutesTillTrain)

})

// console.log(childSnapshot.val());
// console.log(trainData);

// var firstTime = childSnapshot.val().firstTime;

// var tArrival = firstTime.spilt(':');
// var finalFirstTrain = format.setHours(firstTime[0]).setMinutes(firstTime[1]);
// // firstTime.split(':')


// trainData.timeString = format(new Date(firstTime), 'HH:mm');


// console.log(format(firstTime, 'HHmm'))
// // First Time (pushed back 1 year to make sure it comes before current time)
// var firstTimeConverted = format(dateFns.subYears(firstTime, 1), 'HHmm');
// console.log(firstTimeConverted);

// // Current Time
// var currentTime = new Date();
// console.log("CURRENT TIME: " + format(currentTime, "HHmm"));

// // Difference between the times
// var diffTime = dateFns.differenceInMinutes(new Date(), dateFns.subYears(firstTime, 1));
// console.log("DIFFERENCE IN TIME: " + diffTime);

// // Time apart (remainder)
// var tRemainder = diffTime % tFreq;
// console.log(tRemainder);

// // Minute Until Train
// var tMinutesTillTrain = tFreq - tRemainder;
// console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// // Next Train
// var nextTrain = dateFns.addMinutes(new Date(), tMinutesTillTrain);
// console.log("ARRIVAL TIME: " + format(nextTrain, "HHmm"));