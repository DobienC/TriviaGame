var intervalID;
var resultIntervalID;
var timeLimit = 3;
var time = timeLimit;
var delayTime = 0;
var ansSelected = false;
var ans = -1;
var curQ = 0;

var correct = 0;
var wrong = 0;
var timeOut = 0;

var questions = [
    {question: "What isn't a color in MTG?", answer: "1", options: ["black","yellow","green"]},
    {question: "What isn't a Ravnica Guild?", answer: "0", options: ["Algor","Simic","Dimir"]},
    {question: "What isn't a MTG spell?", answer: "1", options: ["Enchantment","Illusion","Creature"]},
    {question: "What isn't a MTG plane", answer: "1", options: ["Ravnica","Kaer","Tarkir"]},
];

$(".title").text("Trivia Game");
var $button = $("<button>");
$button.addClass("start");
$button.text("Start");
$(".starter").append($button);
// intervalID = setInterval(countDown, 1000);
$(".start").on("click", function(){
    resetTrivia();
    intervalID = setInterval(countDown, 1000);
});

function resetTrivia(){
    timeLimit = 3;
    time = timeLimit;
    delayTime = 0;
    ansSelected = false;
    ans = -1;
    curQ = 0;
    correct = 0;
    wrong = 0;
    timeOut = 0;
    $(".title").empty();
    $(".starter").empty();
    $("#timer").empty();
    $("#question").empty();
    $("#answers").empty();
}
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
    if(delayTime <= 2){
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
    $correct.text("Correct: "+correct);
    $wrong.text("Wrong: "+wrong);
    $timeOut.text("Timeout: "+timeOut);
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
    $("#timer").text("Time Remaining: "+ (time + 1));
    $("#question").text(result);
    $("#answers").text("Correct Answer: " + questions[curQ].options[questions[curQ].answer]);
}

// Sets up the display during the quiz
function setDisplay(){
    $("#timer").empty();
    $("#question").empty();
    $("#answers").empty();
    $("#timer").text("Time Remaining: "+time);
    $("#question").text(questions[curQ].question);
    for(var i = 0; i < questions[curQ].options.length; i++){
        var $button = $("<button>");
        $button.addClass("options");
        $button.attr("value", i);
        $button.text(questions[curQ].options[i]);
        $("#answers").append($button);
    }
    finishButton();
}