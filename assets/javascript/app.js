//your web app's firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCXNNdy24-ZDBX2sOpuixfCTetjGPO78eU",
    authDomain: "train-schedule-9ca7a.firebaseapp.com",
    databaseURL: "https://train-schedule-9ca7a.firebaseio.com",
    projectId: "train-schedule-9ca7a",
    storageBucket: "train-schedule-9ca7a.appspot.com",
    messagingSenderId: "379066176230",
    appId: "1:379066176230:web:34deee16da1deed5b3a127",
    measurementId: "G-TSE9EL1PGM"
  };
//Initialize firebase
firebase.initializeApp(firebaseConfig);

//create a database variable
var database = firebase.database();

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();
    var trainName = $("#InputTrainName").val().trim();
    var destination = $("#InputDestination").val().trim();
    var firstTrainTime = $("#InputFirstTrainTime").val().trim();
    var frequency = $("#InputFrequency").val().trim();
    var newTrain = {
        name: trainName,
        destination: destination,
        frequency: frequency,
        firstTrainTime: firstTrainTime
    }
    database.ref().push(newTrain);
    $("#InputTrainName").val("");
    $("#InputDestination").val("");
    $("#InputFirstTrainTime").val("");
    $("#InoutFrequency").val("");

})
database.ref().on("child-added", function(childSnapshot){
    console.log(childSnapshot.val());
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var frequency = childSnapshot.val().frequency;
    var firstTrainTime = childSnapshot.val().firstTrainTime;

    var firstTimeConverted = moment(firstTrainTime, "HH:mm").substract(1,"day");
    var trainDiff = moment().diff(moment(firstTimeConverted), "minutes");
    var trainRemainder = trainDiff % frequency;
    var minutesTillArrival = frequency - trainRemainder;
    var nextTrainTime = moment().add(minutesTillArrival,"m").format("hh:mm A");

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextTrainTime),
        $("<td>").text(minutesTillArrival),

    )
    $(".table > tbody").append(newRow)


})