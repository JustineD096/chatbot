var pureLearning = true;

var phrases = new Object();

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

function chat(){
    var message = $("#message").val();
    $("#message").val("");
    print("You",message);
    if (pureLearning)
    console.log(message);
}

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
});