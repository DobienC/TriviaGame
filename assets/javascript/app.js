var intervalID;
var resultIntervalID;
var time = 2;
var delayTime = 0;
var ansSelected = false;
var ans = -1;
var curQ = -1;

var questions = [
    {question: "What isn't a color in MTG?", answer: "2", options: ["black","yellow","green"]},
    {question: "What isn't a Ravnica Guild?", answer: "1", options: ["Algor","Simic","Dimir"]},
    {question: "What isn't a MTG spell?", answer: "2", options: ["Enchantment","Illusion","Creature"]},
    {question: "What isn't a MTG plane", answer: "2", options: ["Ravnica","Kaer","Tarkir"]},
];

intervalID = setInterval(countDown, 1000);


function checkAnswer(){
    if(ansSelected === true){
        ansSelected = false;
        if(ans === questions[curQ].answer){
            return true;
        } else {
            return false;
        }
    }
}

function countDown(){
    if(time >= 0){
        checkAnswer();
        $("#tester").text(time);    
        console.log(time);
        time--;
    } else {
        curQ++;
        if(curQ > questions.length){
            console.log(curQ);
            alert("Done");
            clearInterval(intervalID);
        } else {
            console.log(curQ); 
            clearInterval(intervalID);
            time = 2
            resultIntervalID = setInterval(delayResult,1000);   
        }
    }
}
    
function delayResult(){
    if(delayTime <= 1){
        delayTime++;
        console.log("Delay: " + delayTime);
    } else {
        clearInterval(resultIntervalID);
        delayTime = 0;
        intervalID = setInterval(countDown, 1000);
    }
}

// for(var i = 0; i < questions.length; i++){
//     console.log(questions[i].question);
//     console.log(questions[i].answer);
//     console.log(questions[i].options);
// }