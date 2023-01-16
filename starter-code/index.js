const color1="#161932";
const color2="#EFF1FA";
let data={
    "font":{
        "kumbh":"'Kumbh Sans', sans-serif",
        "roboto":"'Roboto Slab', serif",
        "space":"'Space Mono', monospace"
    },
    "theme":{
         1:"#F87070",
         2:"#70F3F8",
         3:"#D881F8"
    },
    "set":{
        "font":"kumbh",
        "theme":"1",
        "oldFont":"kumbh",
        "oldTheme":"1"
    },
    "time":{
        "timer":1,
        "long":5,
        "short":3
    },
    "oldTime":{
        "time":1,
        "long":5,
        "short":3
    },
    "runTime":{
        "time":1,
        "long":5,
        "short":3
    }
};
let [seconds,minutes] = [0,data.runTime.time];
let setMin=minutes*60;
let loopCalc=(setMin)+1;
let int= null;
let value=1;//in minute
let pauseValue=value*60;// converted to seconds
let pause = false;
let br =false;
let brMin =1
let brCalc= brMin*60;
let dd = document.getElementById("dd");
let dd0 = document.getElementById("dd0");
let minCounter=0;
let running =false;//check if timer is runing



function startTimer(){
    //clear circle animation
    let Fcircle=$(":root").css("--circle");
    dd.style.strokeDashoffset=(Fcircle);
    //updating if there has been changes
    data.runTime.time= data.oldTime.time;
    data.runTime.long= data.oldTime.long;
    data.runTime.short= data.oldTime.short;
    running=true;
    minCounter=0;
    minutes=data.runTime.time;
    setMin=minutes*60;
    loopCalc=(setMin)+1;
    int=setInterval(displayTimer,1000);
}

function resetTimer(){
    clearInterval(int);
    running=false;
    $("#contText").html("RESTART");
    minutes=data.oldTime.time;
}
function showT(){
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    $("#time").html(m+":"+s);
}
function displayTimer(){
    //first display timer to make sure first change is implemented after the first second 
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;

    $("#time").html(m+":"+s);

    if(!pause){
        if(br){
            if(brCalc>1){
                brCalc--;
            }
            else{
                $("#short").css("color","#D7E0FF");
                $("#long").css("color","#D7E0FF");
                br=false;
            }
            
        }
        else{
            minCounter++;
            loopCalc--;
            seconds--;
            if(minutes== 0 & seconds<0){
                seconds=0
                $("#time").html(m+":"+s);
                resetTimer();
            }
            else if(seconds<0){
                seconds=59;
                minutes--;
            }
        }
        if(minCounter>60){
            if(minCounter%60==1){
                let circle=$(":root").css("--circle");
                dd.style.strokeDashoffset=((circle*loopCalc)/setMin);
            }
        }
        else{
            let Fcircle=$(":root").css("--circle");
    dd.style.strokeDashoffset=(Fcircle);
        }
    }
}
function setT(){
    data.time.timer=$("#stime").val();
    data.time.short=$("#Stime").val();
    data.time.long=$("#Ltime").val();
}
function font(f){
    
    switch(f){
        case "kumbh":
            {
                $(":root").css("--font",data.font.kumbh);
                $("#kumbh").css("background-color",color1);
                $("#kumbh").css("color",color2);
                $("#roboto").css("background-color",color2);
                $("#roboto").css("color",color1);
                $("#space").css("background-color",color2);
                $("#space").css("color",color1);
                break;
            }
        case "roboto":
            {
                $(":root").css("--font",data.font.roboto);
                $("#roboto").css("background-color",color1);
                $("#roboto").css("color",color2);
                $("#kumbh").css("background-color",color2);
                $("#kumbh").css("color",color1);
                $("#space").css("background-color",color2);
                $("#space").css("color",color1);
                break;
            }
        case "space":
            {
                $(":root").css("--font",data.font.space);
                $("#space").css("background-color",color1);
                $("#space").css("color",color2);
                $("#roboto").css("background-color",color2);
                $("#roboto").css("color",color1);
                $("#kumbh").css("background-color",color2);
                $("#kumbh").css("color",color1);
                break;
            }
        default:
            {
                $(":root").css("--font",data.font.kumbh);
                $("#kumbh").css("background-color",color1);
                $("#kumbh").css("color",color2);
                $("#roboto").css("background-color",color2);
                $("#roboto").css("color",color1);
                $("#space").css("background-color",color2);
                $("#space").css("color",color1);
            }
    }
    
}
function theme (th){
    switch(th){
        case "1":
            {
                $(":root").css("--theme",data.theme[1])
                $("#1").show(100);
                $("#2").hide();
                $("#3").hide();
                break;
            }
        case "2":
            {
                $(":root").css("--theme",data.theme[2])
                $("#2").show(100);
                $("#1").hide();
                $("#3").hide();
                break;
            }
        case "3":
            {
                $(":root").css("--theme",data.theme[3])
                $("#3").show(100);
                $("#2").hide();
                $("#1").hide();
                break;
            }
        default:
            {
                $(":root").css("--theme",data.theme[1])
                $("#1").show(100);
                $("#2").hide();
                $("#3").hide();
            }
    }
}


function ini(){
    font("kumbh");
    theme("1");
    $("#stime").html(data.time.timer);
    $("#Stime").html(data.time.short);
    $("#Ltime").html(data.time.long);
    showT()
}
$(document).on("change",)
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
$("#new").click(()=>{
    $("#menu").css("visibility","visible");
    $("#main").css("opacity","40%");
});
$("#close").click(()=>{
    //make main part deep
    $("#main").css("opacity","100%");
    //if changes were made but not saved
    font(data.set.oldFont);
    theme(data.set.oldTheme);
    $("#menu").css("visibility","collapse");
    //maintaining the old time
    data.time.timer= data.oldTime.time;
    data.time.long= data.oldTime.long;
    data.time.short= data.oldTime.short;
    //changing text to show the original time given
    $("#stime").html(data.time.timer);
    $("#Stime").html(data.time.short);
    $("#Ltime").html(data.time.long);
});
$("#kumbh").click(()=>{
    data.set.font="kumbh";
    $(":root").css("--font",data.font.kumbh);
    $("#kumbh").css("background-color",color1);
    $("#kumbh").css("color",color2);
    $("#roboto").css("background-color",color2);
    $("#roboto").css("color",color1);
    $("#space").css("background-color",color2);
    $("#space").css("color",color1);
});
$("#roboto").click(()=>{
    data.set.font="roboto";
    $(":root").css("--font",data.font.roboto);
    $("#roboto").css("background-color",color1);
    $("#roboto").css("color",color2);
    $("#kumbh").css("background-color",color2);
    $("#kumbh").css("color",color1);
    $("#space").css("background-color",color2);
    $("#space").css("color",color1);
});
$("#space").click(()=>{
    data.set.font="space";
    $(":root").css("--font",data.font.space);
    $("#space").css("background-color",color1);
    $("#space").css("color",color2);
    $("#roboto").css("background-color",color2);
    $("#roboto").css("color",color1);
    $("#kumbh").css("background-color",color2);
    $("#kumbh").css("color",color1);
});
//color selection

$("#color1").click(()=>{
    data.set.theme="1";
    $(":root").css("--theme",data.theme[1])
    $("#1").show(100);
    $("#2").hide();
    $("#3").hide();
});
$("#color2").click(()=>{
    data.set.theme="2";
    $(":root").css("--theme",data.theme[2])
    $("#2").show(100);
    $("#1").hide();
    $("#3").hide();
});
$("#color3").click(()=>{
    data.set.theme="3";
    $(":root").css("--theme",data.theme[3])
    $("#3").show(100);
    $("#2").hide();
    $("#1").hide();
});
$("#apply").click(()=>{
    //make main pard deep 
    $("#main").css("opacity","100%");
    font(data.set.font);
    theme(data.set.theme);
    $("#menu").css("visibility","collapse");
    //registering changes made 
    data.set.oldFont=data.set.font;
    data.set.oldTheme=data.set.theme;
    //registering changes made in minutes
    data.oldTime.time=data.time.timer;
    data.oldTime.long=data.time.long;
    data.oldTime.short=data.time.short;
    if(!running){
        minutes=data.oldTime.time;
        setMin=minutes*60;
        loopCalc=(setMin)+1;
        showT();
    }
});
$("#short").click(()=>{
    $("#short").css("color","#FFFFFF");
    $("#long").css("color","#D7E0FF");
    br=true;
    brMin=data.runTime.short;
});
$("#long").click(()=>{
    $("#long").css("color","#FFFFFF");
    $("#short").css("color","#D7E0FF");
    br=true;
    brMin=data.runTime.long;
});
//increae and decrease the times

$("#tInc").click(()=>{
    data.time.timer++
    $("#stime").html(data.time.timer);
});
$("#tDec").click(()=>{
     data.time.timer>1 ? data.time.timer--:null;
    $("#stime").html(data.time.timer);
});
$("#sInc").click(()=>{
    data.time.timer++
    $("#Stime").html(data.time.timer);
});
$("#sDec").click(()=>{
     data.time.timer>1 ? data.time.timer--:null;
    $("#Stime").html(data.time.timer);
});
$("#lInc").click(()=>{
    data.time.timer++
    $("#Ltime").html(data.time.timer);
});
$("#lDec").click(()=>{
     data.time.timer>1 ? data.time.timer--:null;
    $("#Ltime").html(data.time.timer);
});