//Query Selectors
//OTHER
const TimeStamp = document.querySelector("#datetime")
const utcTime=document.querySelector("#utctime")
//0
const ObsTime0=document.querySelector("#ObsTime0")
const Temp0=document.querySelector("#Temp0")
const FeelsLike0=document.querySelector("#FeelsLike0")
const RH0=document.querySelector("#RH0")
const Visibility0=document.querySelector("#Visibility0")
const PrecipIn0=document.querySelector("#PrecipIn0")
const WindDir0=document.querySelector("#WindDir0")
const WindSpeed0=document.querySelector("#WindSpeed0")
const PressureMb0=document.querySelector("#PressureMb0")
const CloudCover0=document.querySelector("#CloudCover0")
//1
const ObsTime1=document.querySelector("#ObsTime1")
const Temp1=document.querySelector("#Temp1")
const FeelsLike1=document.querySelector("#FeelsLike1")
const RH1=document.querySelector("#RH1")
const Visibility1=document.querySelector("#Visibility1")
const PrecipIn1=document.querySelector("#PrecipIn1")
const WindDir1=document.querySelector("#WindDir1")
const WindSpeed1=document.querySelector("#WindSpeed1")
const PressureMb1=document.querySelector("#PressureMb1")
const CloudCover1=document.querySelector("#CloudCover1")
//2
const ObsTime2=document.querySelector("#ObsTime2")
const Temp2=document.querySelector("#Temp2")
const FeelsLike2=document.querySelector("#FeelsLike2")
const RH2=document.querySelector("#RH2")
const Visibility2=document.querySelector("#Visibility2")
const PrecipIn2=document.querySelector("#PrecipIn2")
const WindDir2=document.querySelector("#WindDir2")
const WindSpeed2=document.querySelector("#WindSpeed2")
const PressureMb2=document.querySelector("#PressureMb2")
const CloudCover2=document.querySelector("#CloudCover2")
//LISTS
let P0=[ObsTime0,Temp0,FeelsLike0,RH0,Visibility0,PrecipIn0,WindDir0,WindSpeed0,PressureMb0,CloudCover0]
let P1=[ObsTime1,Temp1,FeelsLike1,RH1,Visibility1,PrecipIn1,WindDir1,WindSpeed1,PressureMb1,CloudCover1]
let P2=[ObsTime2,Temp2,FeelsLike2,RH2,Visibility2,PrecipIn2,WindDir2,WindSpeed2,PressureMb2,CloudCover2]


// Time 
let Datetime=""
Datetime=new Date();
Datetime=Datetime.toString()
console.log(Datetime)
let dst=Datetime.substring(29,31)
console.log(dst)
dst=parseInt(dst)
let Dates=""
Dates=Datetime.substring(0,15)
let hour=Datetime.substring(16,18)
let militaryhour=hour
console.log(hour)

pm=false
if (hour===12){
    pm=true
} else if (hour===0){
    pm=false
    hour=12
} else if (12<hour && hour<24){
    pm=true;
    hour=hour-12
} else if (hour>0 && hour<12){
    pm=false;
}

let min=Datetime.substring(19,21)
console.log(min)
min=min.toString()
hour=hour.toString()
time=""
if (pm===false && dst==="07"){
    time=hour+min+" AM  PDT "+Dates
} else if (pm===false && dst==="08"){
} else if (pm===true && dst==="07"){
} else {
    time=hour+min+" PM  PDT "+Dates
}
console.log(time)

TimeStamp.textContent=time

// UTC Time
let zero=""
militaryhour=parseInt(militaryhour)
militaryhour+=dst
if (militaryhour>24 || militaryhour===24){
    militaryhour=militaryhour-24;
}


if (militaryhour<10) {
    zero="0"
}

console.log(militaryhour)
console.log(zero+militaryhour);
let UtcDay=Dates.substring(8,10);
let DayZero=""
if (UtcDay<10){
    DayZero="0"
}
console.log(UtcDay);
UtcDay=parseInt(UtcDay)
if (militaryhour===0 || militaryhour>0 || militaryhour<dst){
    UtcDay=UtcDay+=1
}

console.log(UtcDay)
let utcdaytime=(DayZero+UtcDay+zero+militaryhour+min+"Z")
utcTime.textContent=utcdaytime

// Functions for Retrieving API Data
let urllist=[]
function getLink(location){
    let link="https://wttr.in/"+location+"?format=j1"
    urllist.push(link)
}

getLink("Los-Angeles")
getLink("Newport-Beach")
getLink("Irvine")
let JSON=[]
console.log(urllist)

async function getWeather(){ // promise to ask the website for data
    let res=""
    let data=""
    let JSON=[]
    for (i=0;i<urllist.length;i+=1){
        res = await fetch(urllist[i]) 
        // Promise to convert JSON
        data=await res.json();
        console.log(data)
        JSON.push(data)
    }
    console.log(JSON)
    let keys=["localObsDateTime","temp_F","FeelsLikeF","humidity","visibilityMiles","precipInches","winddirDegree","windspeedMiles","pressure","cloudcover"]
    let obs0=[]
    let obs1=[]
    let obs2=[]
    for (let i=0;i<keys.length;i+=1){
        obs0.push(JSON[0]["current_condition"]["0"][keys[i]])
        obs1.push(JSON[1]["current_condition"]["0"][keys[i]])
        obs2.push(JSON[2]["current_condition"]["0"][keys[i]])
    }
    
    console.log(obs0)
    console.log(obs1)
    console.log(obs2)
    for (i=0;i<obs0.length;i+=1){
        (P0[i]).textContent=obs0[i]
    }
    for (i=0;i<obs1.length;i+=1){
        P1[i].textContent=obs1[i]
    }
    for (i=0;i<obs2.length;i+=1){
        P2[i].textContent=obs2[i]
    }
    
}
getWeather()