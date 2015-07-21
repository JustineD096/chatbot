var pureLearning = true;

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

var prompt0 = "";
var reply0 = "";
function talkAndLearn(){
    var newMessage = $("#message").val();
    if (newMessage == "") return;
    $("#message").val("");
    print("You", newMessage);

    if (prompt0 == "") $("#message").prop("placeholder","Reply");
    else addPair(prompt0,newMessage);

    prompt0 = newMessage
    reply0 = findReply(prompt0);
    print('Chatbot',reply0);
    addPair(prompt0,reply0);
    prompt0 = reply0;
}

function chat(){
    if (pureLearning) alert("501 NOT IMPLEMENTED\n\nTry Talk &amp; Learn Mode");
    else talkAndLearn();
}

function initVars(){
    $("#message").prop("placeholder","Initial prompt");
    $("#message").val("");
    prompt0 = "";
    reply0 = "";
}

$(document).ready(function(){
    displayPhrases();

    $("#learn-button").on('click',function(){
        if (!pureLearning){
            pureLearning = true;
            print(false, "\n\nSWITCHING TO PURE LEARNING MODE\n");
            $(this).addClass("active");
            $("#talk-button").removeClass("active");
            initVars();
        }
    });

    $("#talk-button").on('click',function(){
        if (pureLearning){
            pureLearning = false;
            print(false, "\n\nSWITCHING TO TALK &amp; LEARN MODE\n");
            $(this).addClass("active");
            $("#learn-button").removeClass("active");
            initVars();
        }
    });

});