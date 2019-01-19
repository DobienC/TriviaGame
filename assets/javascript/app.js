var intervalID;
var resultIntervalID;
var time = 5;
var delayTime = 0;

var questions = [
    {question: "Q", answer: "Y", options: ["1","2","3"]},
    {question: "Q", answer: "Y", options: ["1","2","3"]},
    {question: "Q", answer: "Y", options: ["1","2","3"]},
    {question: "Q", answer: "Y", options: ["1","2","3"]},
];

intervalID = setInterval(countDown, 1000);

function countDown(){
    if(time >= 0){
        $("#tester").text(time);    
        console.log(time);
        time--;
    } else {
        clearInterval(intervalID);
        time = 5
        resultIntervalID = setInterval(delayResult,1000);

    }
}
    
function delayResult(){
    if(delayTime <= 5){
        delayTime++;
        console.log("Delay: " + delayTime);
    } else {
        clearInterval(resultIntervalID);
        delayTime = 0;
        intervalID = setInterval(countDown, 1000);
    }
}

for(var i = 0; i < questions.length; i++){
    console.log(questions[i].question);
    console.log(questions[i].answer);
    console.log(questions[i].options);
}