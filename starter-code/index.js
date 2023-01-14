let [seconds,minutes,hours] = [0,1,0];
let loopCalc=minutes*60;
let int= null;
let value=1;//in minute
let pauseValue=value*60;// converted to seconds
let pause = false;
let br =false;
let brMin =1
let brCalc= br*60;

function startTimer(){
    int=setInterval(displayTimer,1000);
}

function resetTimer(){
    clearInterval(int);
    $("#contText").html("RESTART");
    minutes=1;
}
function displayTimer(){
    //first display timer to make sure first change is implemented after the first second 
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;

    $("#time").html(m+":"+s);

    if(!pause){
        if(br){
            brCalc--;
        }
        else{
            loopCalc--;
            seconds--;
            if(seconds==0 & minutes==0){
                s = seconds < 10 ? "0" + seconds : seconds;
                $("#time").html(m+":"+s);
                resetTimer();
            }
            if(seconds<0){
                seconds=59;
                minutes--;
            }
        }
    }
    
}
$("#controller").click(()=>{
    let cont =$("#contText").first().text();
    if(cont=="START"||cont=="RESTART"){
        $("#contText").html("PAUSE");
        startTimer()
    }
    else if(cont=="PAUSE"){
        $("#contText").html("RESUME");
        clearInterval(int);
    }
    else if(cont=="RESUME"){
        $("#contText").html("PAUSE");
        startTimer()
    }
});

