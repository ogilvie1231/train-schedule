var firebaseConfig = {
    apiKey: "AIzaSyCtyWUrkTGFXYTpwJdooaCMGA4wygvQj4U",
    authDomain: "train-schedule-4cf95.firebaseapp.com",
    databaseURL: "https://train-schedule-4cf95.firebaseio.com",
    projectId: "train-schedule-4cf95",
    storageBucket: "",
    messagingSenderId: "1085887182049",
    appId: "1:1085887182049:web:5f97eba708d406861373a0",
    measurementId: "G-HGWBJVLMM2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$('#add-train-btn').on('click', function(event) {
    event.preventDefault();

    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = moment($("#first-train").val().trim(), "HH:mm:ss A").subtract(1, "years").format("X");
    var frequency = $("#frequency").val().trim();


    var newTrain = {
        name: trainName,
        destination,
        start: firstTrain,
        frequency
    };
    console.log('new train: ' + newTrain);
    database.ref().push(newTrain);

    console.log(newTrain.trainName);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);

    $("#train-name").val("");
    $("#desitnation").val("");
    $("#first-train").val("");
    $("#frequency").val("");

});

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().start;
    var frequency = childSnapshot.val().frequency;

    // console.log(trainName);
    // console.log(destination);
    // console.log(firstTrain);
    // console.log(frequency);
    var firstTrainPretty = moment(firstTrain, 'minutes').format('hh:mm');
    var minuteFormat = "hh:mm";
    var convertTime = moment(firstTrainPretty, minuteFormat);
    console.log('convert time: ' + convertTime)

    console.log('firstTrainPretty: ' + firstTrainPretty)

    // var timeRemain = moment().diff(firstTrain, "minutes");
    // var timeRemain = moment().diff(moment(firstTrainPretty, "X"), "minutes");
    // console.log('time remailing: ' + timeRemain)

    // // Calculate the months worked using hardcore math
    // // To calculate the months worked
    // var empMonths = moment().diff(moment(firstTrain, "X"), "months");
    // console.log(empMonths);


    // // Calculate the total billed rate
    // var empBilled = empMonths * frequency;
    // console.log(empBilled);

    // first train 12:00 --- Frequency 30m --- current time 1:15 --- therefor the next train will arrive in 15 minutes.
    // first train (trainTime) 
    // current time (moment)
    // frequency (frequency)
    // ---Calculating the next arrival
    // (trainTime) 12:15 + (frequency) 00:30 = (nextArrival) 12:45
    // (trainTime) 12:15 + (frequency) 00:30 = (nextArrival) 12:45 - (moment) 12:30 = (timeRemaining) 00:15

    // ---finding the time until the next train.
    // var timeRemaining = moment().diff(newTrain.start)

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(firstTrain),
        // $("<td>").text(firstTrainPretty),
        $("<td>").text(frequency),

    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
});