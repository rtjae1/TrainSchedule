// Initialize Firebase
var config = {
    apiKey: "AIzaSyBrWa-sy6a_PuNRfj0qn73S9_HO6z0kYkY",
    authDomain: "go-nova.firebaseapp.com",
    databaseURL: "https://go-nova.firebaseio.com",
    projectId: "go-nova",
    storageBucket: "go-nova.appspot.com",
    messagingSenderId: "580024396991"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

   //button for adding trains
   $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    //grab user input
    var trainName = $("#t-name-input").val().trim();
    var trainDestination = $("#dest-input").val().trim();
    var trainFrequency = $("#freq-input").val().trim();
    var trainFirst =$("#first-train-input").val().trim();


    //object to hold train info
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        frequency: trainFrequency,
        firstTrain: trainFirst,

    };

    //push to database
    database.ref().push(newTrain);

      console.log(newTrain.name);
      console.log(newTrain.destination);
      console.log(newTrain.frequency);
      console.log(newTrain.firstTrain);

      $("#t-name-input").val("");
      $("#dest-input").val("");
      $("#first-train-input").val("");
      $("#freq-input").val("");

});

      //firebase event for adding train to database and row in html on submiting train
      database.ref().on("child_added", function(childSnapshot) {
          console.log(childSnapshot.val());

          var trainName = childSnapshot.val().name;
          var trainDestination = childSnapshot.val().destination;
          var trainFrequency = childSnapshot.val().frequency;
          var trainFirst = childSnapshot.val().firstTrain;

          console.log(trainName);
          console.log(trainDestination);
          console.log(trainFrequency);
          console.log(trainFirst);



          //format first train time and push back 1 year so it comes before current time
          var trainFirstFormat = moment(trainFirst, "hh:mm").subtract(1, "years");
          console.log(trainFirstFormat);

          //current time
          var currentTime = moment();    
          console.log(currentTime);              
          //difference between times
          var diffTime = moment().diff(moment(trainFirstFormat), "minutes");
          //time apart
          var tApart = diffTime % trainFrequency;
         //minutes until next train
          var minutesTillNext = trainFrequency - tApart;
         //next train
          var nextTrain = moment().add(minutesTillNext, "minutes");
          var nextArrival = moment(nextTrain).format('hh:mm A');
         //create new row for table
          var newRow = $("<tr>").append(
              $("<td>").text(trainName),
              $("<td>").text(trainDestination),
              $("<td>").text("Every " + trainFrequency + " minutes"),
              $("<td>").text(nextArrival),
              $("<td>").text(minutesTillNext + " minutes"),
          );

          //append row to table
          $("#train-tbl > tbody").append(newRow);

      });
