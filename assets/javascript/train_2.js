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
// var currTime = dateFns.getTime;

// currTime('HH:mm');

var format = dateFns.format

// console.log(format(currTime))
// console.log(currTime)

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

    var firstTrain = $('#firstTrain').val().trim();
    trainData.timeString = format(new Date(firstTrain), ['HHmm']);
    var firstTrainConverted = format(dateFns.subYears(firstTrain, 1), ['HHmm']);
    console.log(firstTrainConverted);

    // Difference between the times
    var diffTime = dateFns.differenceInMinutes(new Date(), firstTrain);
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tApart = diffTime % tFreq;
    console.log(tApart);

    // Minute Until Train
    var tMinsTilTrain = tFreq - tApart;
    console.log("MINUTES TIL TRAIN: " + tMinsTilTrain);


    trainData.tFreq = $('#tFreq').val();

    database.ref().push(trainData)
})

database.ref().on("child_added", function (childSnapshot) {
    $('#tableContents').append('<tr>' + '<td>' + childSnapshot.val().tName + '<td>' + childSnapshot.val().tDest + '<td>' + childSnapshot.val().tFreq + '<td>' + childSnapshot.val().timeString + '<td>' + childSnapshot.val().tMinTilTrain)
})

// 'NEXT ARRIVAL' = timeString