var intervalID;
var resultIntervalID;
var timeLimit = 30;
var time = timeLimit;
var delayTime = 0;
var ansSelected = false;
var ans = -1;
var curQ = 0;

var correct = 0;
var wrong = 0;
var timeOut = 0;

var questions = [
    {gif: "assets/images/KC.gif",question: "What city did the Kings reside in before Sacramento?", answer: "1", options: ["Anaheim","Kansas City","Seattle","Montreal"]},
    {gif: "assets/images/RayAllen.gif",question: "Which one of these players were not part of the Sacramento Kings?", answer: "0", options: ["Ray Allen","Tyreke Evans","Jason Williams","Brad Miller"]},
    {gif: "assets/images/Chris.gif",question: "Which past Kings player never won a ring?", answer: "0", options: ["Chris Webber","Peja Stojakovic","Jason Williams", "Scot Pollard"]},
    {gif: "assets/images/Punch.gif",question: "When was the last time the Kings made it to the playoffs?", answer: "1", options: ["2009","2006","2002","2015"]},
    {gif: "assets/images/Peja.gif",question: "Who wore #16?", answer: "1", options: ["Demarcus Cousins","Peja Stojakovic","Hedo Türkoğlu", "Omri Casspi"]},
    {gif: "assets/images/Oscar.gif",question: "Who leads the franchise in assists?", answer: "3", options: ["Kevin Martin","Darren Collison","Doug Christie", "Oscar Robinson"]},
    {gif: "assets/images/Marvin.gif",question: "What year did the Golden 1 Center open?", answer: "2", options: ["2012","2017","2016", "2009"]},
    {gif: "assets/images/Deaaron.gif",question: "What pick number was De'aaron Fox in the 2017 NBA Draft?", answer: "0", options: ["5","1","9", "7"]},
    {gif: "assets/images/Bogi.gif",question: "What position does Bogdan Bogdanović play?", answer: "2", options: ["Point Guard","Power Forward","Shooting Guard", "Center"]},
    {gif: "assets/images/VladeDance.gif",question: "Which past Kings player doesn't currently work with the Kings?", answer: "1", options: ["Bobby Jackson","Chris Webber","Vlade Divac", "Doug Christie"]},
];

$(".title").html("<h1>Sacramento Kings Trivia</h1>");
var $button = $("<button>");
$button.addClass("start");
$button.text("Start");
$(".starter").append($button);
// intervalID = setInterval(countDown, 1000);
$(".start").on("click", function(){
    resetTrivia();
    intervalID = setInterval(countDown, 1000);
});

function countDown(){
    if(time >= 0 && ansSelected === false){
        setDisplay();
        console.log(time);
        checkAnswer();
        time--;
    } else {
        checkAnswer();
        curQ++;
        if(curQ > questions.length){
            // console.log(curQ);
            alert("Done");
            clearInterval(intervalID);
            displayEnd();
        } else {
            // console.log(curQ); 
            clearInterval(intervalID);
            time = timeLimit;
            resultIntervalID = setInterval(delayResult,1000);   
        }
    }
}

function delayResult(){
    if(delayTime <= 1){
        delayTime++;
        console.log("Delay: " + delayTime);
        ansSelected = false;
    } else {
        clearInterval(resultIntervalID);
        if(time === 0){
            timeout++;
        }
        delayTime = 0;
        if(curQ < questions.length){
            intervalID = setInterval(countDown, 1000);
            time = timeLimit;
        } else {
            displayEnd();
        }
    }
}


function finishButton(){
    $(".options").on("click", function(event){
        ans = $(this).val();
        ansSelected = true;
    });
}

function checkAnswer(){
    if(ansSelected === true || time===0){
        ansSelected = false;
        if(ans === questions[curQ].answer){
            correct++;
            displayResult("Correct!");
        } else if(time===0){
            timeOut++;
            displayResult("TimeOut!");
        } else {
            wrong++;
            displayResult("Wrong!");
        }
    }
}

// Sets up the display after the quiz is finished
function displayEnd(){
    $("#timer").empty();
    $("#question").empty();
    $("#answers").empty();
    var $correct = $("<div>");
    var $wrong = $("<div>");
    var $timeOut = $("<div>");
    $("#timer").html("<h2>This is how you did!</h2>");
    $correct.html("<h3>Correct: "+correct+"</h3>");
    $wrong.html("<h3>Wrong: "+wrong+"</h3>");
    $timeOut.html("<h3>Timeout: "+timeOut+"</h3>");
    $("#answers").append($correct);
    $("#answers").append($wrong);
    $("#answers").append($timeOut);
    var $button = $("<button>");
    $button.addClass("start");
    $button.text("Restart");
    $(".starter").append($button);
    $(".start").on("click", function(){
        resetTrivia();
        intervalID = setInterval(countDown, 1000);
    });
}

// Sets up the display after a question is answered
function displayResult(result){
    $("#timer").empty();
    $("#question").empty();
    $("#answers").empty();
    var $gif = $("<div>");
    $gif.html("<img src=" + questions[curQ].gif +">")
    $("#timer").html("<h4>Time Remaining: "+ (time)+"</h4>");
    $("#question").html("<h3>"+result+"</h3>");
    $("#question").append($gif);
    $("#answers").html("<h4>Correct Answer: " + questions[curQ].options[questions[curQ].answer]+"</h4>");
}

// Sets up the display during the quiz
function setDisplay(){
    $("#timer").empty();
    $("#question").empty();
    $("#answers").empty();
    $("#timer").html("<h4>Time Remaining: "+(time-1)+"</h4>");
    $("#question").html("<h3>"+questions[curQ].question+"</h3>");
    for(var i = 0; i < questions[curQ].options.length; i++){
        var $button = $("<button>");
        $button.addClass("options");
        $button.attr("value", i);
        $button.text(questions[curQ].options[i]);
        $("#answers").append($button);
    }
    finishButton();
}

// Sets up the game to be replayed
function resetTrivia(){
    timeLimit = 15;
    time = timeLimit;
    delayTime = 0;
    ansSelected = false;
    ans = -1;
    curQ = 0;
    correct = 0;
    wrong = 0;
    timeOut = 0;
    $(".starter").empty();
    $("#timer").empty();
    $("#question").empty();
    $("#answers").empty();
}