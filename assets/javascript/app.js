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

    // retrieving input values
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = moment($("#first-train").val().trim(), "HH:mm:ss A").subtract(1, "years").format("HH:mm");
    var frequency = $("#frequency").val().trim();

    // creating an object for new train
    var newTrain = {
        name: trainName,
        destination,
        start: firstTrain,
        frequency
    };
    console.log('new train: ' + newTrain);
    database.ref().push(newTrain);

    $("#train-name").val("");
    $("#desitnation").val("");
    $("#first-train").val("");
    $("#frequency").val("");
});

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    // setting names of snapshot values for simplicity
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTrain = moment(childSnapshot.val().start, 'HH:mm');
    var frequency = childSnapshot.val().frequency;

    var timeRemainder = moment().diff(moment.unix(firstTrain), "minutes") % frequency;
    var minAway = frequency - timeRemainder;
    var nextArrival = moment().add(minAway, "m").format("hh:mm A");
    console.log('timeRemainder: ', timeRemainder);
    console.log('minAway: ', minAway);
    console.log('nextArrival: ', nextArrival);





    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(firstTrain),
        $("<td>").text(frequency),
        $("<td>").text(nextArrival),
        $("<td>").text(minAway),

    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
});

function calculateArrival() {
    var now = moment();
    var minutesAway = moment(nextTrain, 'HH:mm').diff(now, 'minutes')
};