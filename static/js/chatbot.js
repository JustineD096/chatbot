var pureLearning = true;
var readyToGetMessage = false;

var phrases = new Object();
phrases['what is your name'] = new Object();
phrases['what is your name']['my name is chatbot'] = 0;
phrases['my name is chatbot'] = new Object();
phrases['my name is chatbot']['me too!'] = 0;

function displayPhrases(){
    $("#phrases").val(JSON.stringify(phrases));
}

function replacePhrases(){
    try{
        phrases = JSON.parse($("#phrases").val());
        console.log(phrases);
    }
    catch(err){
        alert("BAD JSON STRING:\n"+err);
    }
}

function addPair(prompt,reply){
    if (!phrases.hasOwnProperty(prompt)) phrases[prompt] = new Object();
    if (!phrases[prompt].hasOwnProperty(reply)) phrases[prompt][reply]=0;
    phrases[prompt][reply]+=1;
    displayPhrases();
}

function pickRandomProperty(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1/++count)
           result = prop;
    return result;
}

function findReply(prompt){
    if (phrases.hasOwnProperty(prompt)) return pickRandomProperty(phrases[prompt]);
    else return pickRandomProperty(phrases);
}

function print(speaker,message){
    var $chatbox = $("#chatbox");
    if (speaker) $chatbox.append(speaker+": "+message+"\n");
    else $chatbox.append(message+"\n");
    if($chatbox.length) $chatbox.scrollTop($chatbox[0].scrollHeight - $chatbox.height());
}

function waitForMessage(){
    console.log(readyToGetMessage);
    if (!readyToGetMessage) {
        setTimeout(waitForMessage, 1000);
    }
}

function getMessage(){
    waitForMessage();
    console.log("donezo");
}

function chatLoop(){
    var prompt = "";
    var reply = "";
    var index = 0;
    prompt = getMessage();
    while (true){
        if (index%2) {
            reply = getMessage();
            print("You",reply);
        }
        else {
            reply = findReply(prompt);
            print("Bot",reply);
        }
        addPair(prompt,reply);
        prompt = reply;
        index += 1;
    }
}

/*var prompt = "";
function chat(){
    prompt = $("#message").val();
    $("#message").val("");
    print("You",prompt);
    var reply = findReply(prompt);
    print("Bot",reply);
    addPair(prompt,reply);
}*/


$("#learn-button").on('click',function(){
    if (!pureLearning){
        pureLearning = true;
        print(false, "\n\nSWITCHING TO PURE LEARNING MODE\n");
        $(this).addClass("active");
        $("#talk-button").removeClass("active");
    }
});

$("#talk-button").on('click',function(){
    if (pureLearning){
        pureLearning = false;
        print(false, "\n\nSWITCHING TO TALK &amp; LEARN MODE\n");
        $(this).addClass("active");
        $("#learn-button").removeClass("active");
    }
});

$(document).ready(function(){
    displayPhrases();
    /*chatLoop();*/
});