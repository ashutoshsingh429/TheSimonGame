//Better To Declare All Variables At The Beginning

var gamePattern=[];
var userClickedPattern=[];
var buttonColors=["red", "blue", "green", "yellow"];
var i=1;
var level=0;
var check=0;

function nextSequence()
{
    var randomNumber=Math.floor((Math.random()*4));
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    animatePress(randomChosenColor);
    playSound(randomChosenColor);
    $("h1").text("Level " + level);
    level++;
}

//User's Action

$(document).keydown(function()
{   
    if(i===1)
    {
        nextSequence();
        i++;
    }
});

// The click does a lot of work
// 1) Saves what the user has clicked
// 2) Checks whether its right or wrong

$(".btn").click(function()
{
    var userChosenColor=$(this).attr('id');
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    animatePress($(this).attr('id'));
    playSound($(this).attr('id'));
    if(userClickedPattern[check]!=gamePattern[check])
    {
        userClickedPattern=[];
        gamePattern=[];
        $("body").addClass("game-over");
        $("h1").text("Game over, press any key to restart");
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        setTimeout(function()
        {
            $("body").removeClass("game-over");
        }), 200;
        i=1;
        level=0;
        
    }
    else if(check===gamePattern.length-1)
    {
        check=0;
        userClickedPattern=[];
        setTimeout(function()
        {
            nextSequence();
        }, 1000);
    }
    else 
    {
        check++;
    }
});

//Effects

function playSound(name)
{
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor)
{
    $("#"+currentColor).addClass("pressed");
    setTimeout(function()
    {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}


