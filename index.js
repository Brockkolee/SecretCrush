const startArrFemale = [
    {
        name: "Alexandra Daddario",
        img: "image/female/Alexandra.png"
    },
    {
        name: "Amy Adams",
        img: "image/female/AmyAdams.png"
    },
    {
        name: "Crystal Liu",
        img: "image/female/CrystalLiu.png"
    },
    {
        name: "Emma Watson",
        img: "image/female/EmmaWatson.png"
    },
    {
        name: "Hayden Panettiere",
        img: "image/female/HaydenPanettiere.png"
    },
    {
        name: "Hyuna (Kim Hyunah)",
        img: "image/female/Hyuna.png"
    },
    {
        name: "IU (Lee Jieun)",
        img: "image/female/IU.png"
    },
    {
        name: "Jessica Alba",
        img: "image/female/JessicaAlba.png"
    },
    {
        name: "Kim Jisoo",
        img: "image/female/KimJiSoo.png"
    },
    {
        name: "Kim Taeyeon",
        img: "image/female/Taeyeon.png"
    }
]

const startArrMale = [
    {
        name: "Ashton Kutcher",
        img: "image/male/Ashton.png"
    },
    {
        name: "Brad Pitt",
        img: "image/male/BradPitt.png"
    },
    {
        name: "Chris Martin",
        img: "image/male/ChrisMartin.png"
    },
    {
        name: "Gu Tian Le (Louis Koo)",
        img: "image/male/GuTianLe.png"
    },
    {
        name: "Jay Chou",
        img: "image/male/JayChou.png"
    },
    {
        name: "Justin Timberlake",
        img: "image/male/JustinTimberlake.png"
    },
    {
        name: "Leonardo Dicaprio",
        img: "image/male/Leonardo.png"
    },
    {
        name: "Rain",
        img: "image/male/Rain.png"
    },
    {
        name: "Luo Zhi Xiang (Show Lo)",
        img: "image/male/Show.png"
    },
    {
        name: "Takeshi Kaneshiro",
        img: "image/male/Takeshi.png"
    }
]

var round2Arr = [];
var timer = document.querySelector(".timer");
var selectionArr = document.querySelectorAll(".selection");
var roundText = document.querySelector(".round");



function countDown() {

    timer.innerHTML--;
    t = setTimeout(countDown, 1000);

    if (timer.innerHTML == 0) {
        clearTimeout(t);
        roundStart();
        if (startArr.length > 0) {
                       
            nextRoundStart();
        } else if (round2Arr.length > 1) {
            document.querySelector(".round").textContent = "Round 2";
            nextRound2();
        } else if (round2Arr.length == 1) {
            document.querySelector("#image1").setAttribute("src", round2Arr[0].img);
            document.querySelector("#image1" + "-name").textContent = round2Arr[0].name;
            document.querySelector(".selection-container").style.justifyContent = "center";
            document.querySelector(".timer-group").remove();
            document.querySelector("#image2").remove();
            document.querySelector("#image2-name").remove();
            document.querySelector("#image1-name").remove();
        } else if (round2Arr.length == 0) {

            clockTick.pause();
            document.querySelector(".round").textContent = "You ran out of time!";
            document.querySelector(".timer").remove();
            document.querySelector("#image1").remove();
            document.querySelector("#image2").remove();
            document.querySelector("#image2-name").remove();
            document.querySelector("#image1-name").remove();


        }
    }
}


function enableClick() {
    selectionArr.forEach(e => {
        e.style.pointerEvents = "auto"
    })
}

function countEnd() {
    countDown();
    clockTick.play();
    enableClick();
}

selectionArr.forEach(e => {
    
    e.addEventListener("click", function (event) {  
        
        clockTick.pause();
        clickSound.play();
        countDownStart();
        clearTimeout(t);
        clickDisable();

        var selected = {
            name: event.target.name,
            img: event.target.src
        }

        if (startArr.length > 0) {
            round2Arr.push(selected);
            nextRoundStart();
        } 
         else {

            roundText.innerHTML = "Round 2";

            if (round2Arr.length >= 2) {

                nextRound2();
                round2Arr.push(selected)

            } else if (round2Arr.length == 1) {

                startRound.play();
                if (event.target.id === "image1") {
                    round1(round2Arr, "#image2")
                } else {
                    round1(round2Arr, "#image1")
                }

            } else if (round2Arr.length == 0) {

                ending.play();   
                
                if (event.target.id == "image1") {
                    endingDisplayExclude("#image2");
                } else {
                    endingDisplayExclude("#image1");
                }


            }
        }
    })
})

function endingDisplayExclude(image) {
    document.querySelector(".timer-group").remove();
    document.querySelector(image).remove();
    document.querySelector(image + "-name").remove();
    document.querySelector(".selection-container").style.justifyContent = "center";
}


function countDownStart() {
    timer.innerHTML = 3;
    setTimeout(function() {
        timer.innerHTML = 2;
    },1000);
    setTimeout(function() {
        timer.innerHTML = 1;
    },2000);
    setTimeout(function() {
        timer.innerHTML = "Go!";
    },3000);
    setTimeout(function() {
        timer.innerHTML = 10;
    },3500);

}    

function clickDisable() {
    selectionArr.forEach(e => {
        e.style.pointerEvents = "none";
    })
}


function startButton() {
    clickSound.play();
    startMusic.pause();
    document.querySelector(".start-button").style.display = "none";
    startRound.play();
    countDownStart();
    selectionArr.forEach(e => {
        e.style.pointerEvents = "none";
    })
}


function round1(arr, image) {
    var currentNumber = Math.floor(Math.random() * arr.length)
    var current = arr[currentNumber]
    document.querySelector(image).setAttribute("src", current.img);
    document.querySelector(image).setAttribute("name", current.name);
    document.querySelector(image + "-name").textContent = current.name;
    arr.splice(currentNumber, 1);
}

function round2(arr, image) {
    var currentNumber = Math.floor(Math.random() * arr.length)
    var current = arr[currentNumber]
    document.querySelector(image).setAttribute("src", current.img);
    document.querySelector(image).setAttribute("name", current.name);
    document.querySelector(image + "-name").textContent = current.name;
}

var clickSound = new Audio("./audio/click.mp3");
var startRound = document.getElementById("start-round");
var ending = new Audio("./audio/cheer.mp3");
var clockTick = new Audio("./audio/clockTick.mp3");

function nextRoundStart() {
    clockTick.pause();
    startRound.play();
    round1(startArr, "#image1");
    round1(startArr, "#image2");

}

function nextRound2() {
    clockTick.pause();
    startRound.play();

    round1(round2Arr, "#image1");
    round1(round2Arr, "#image2");


}



function female() {
    clickSound.play();
    
    startPage.style.display = "none";
    selectPage.style.display = "block";

     startSequence(startArrFemale);
     startArr = startArrFemale;
}

const startPage = document.querySelector(".start-page");
const selectPage = document.querySelector(".select-page");
const startMusic = document.querySelector("#home-music");

function male() {
    clickSound.play();
    
    startPage.style.display = "none";
    selectPage.style.display = "block";

     startSequence(startArrMale);
     startArr = startArrMale;
}


function start() {
    startMusic.volume = 0.2;
    startMusic.play();
    document.querySelector(".start").style.display = "none";
    document.querySelector(".logo").className = "fade-in";
}

function startSequence(arr) {
    round1(arr, "#image1");
    round1(arr, "#image2");
    clickDisable();
}
