//"http://api.giphy.com/v1/gifs/JIX9t2j0ZTN9S?api_key=dE8nV26K2d3Kt2KRCMuAT0zniF8P5mWH"
//"api_key": "dE8nV26K2d3Kt2KRCMuAT0zniF8P5mWH",

// Need an action to happen when the pet reaches 0;
// Make mobile-friendly;
// Current bug: if you rapidly press a button over and over again,
// it will not reach 100 unless you wait for the interval to occur


const defaultCat = "http://api.giphy.com/v1/gifs/JIX9t2j0ZTN9S?api_key=dE8nV26K2d3Kt2KRCMuAT0zniF8P5mWH";
const playCat    = "http://api.giphy.com/v1/gifs/Fig1uR9DGHf6E?api_key=dE8nV26K2d3Kt2KRCMuAT0zniF8P5mWH";
const foodCat    = "http://api.giphy.com/v1/gifs/EBDXQI8mRX1u0?api_key=dE8nV26K2d3Kt2KRCMuAT0zniF8P5mWH";
const sleepCat   = "http://api.giphy.com/v1/gifs/Nf5FCBnN2TCAE?api_key=dE8nV26K2d3Kt2KRCMuAT0zniF8P5mWH";


let foodAlert = false;
let playAlert = false;
let sleepAlert = false;

// decrements property level through interval time
let timedDecerementPropertyLevel = function (cat, catProperty, time, alertPrompt) {
  return setInterval(function(){
    let futureValue = cat[catProperty] - 20;
    cat[catProperty] = Math.max(futureValue, 0);
    if (cat[catProperty] === 0 && alertPrompt === false) {
      alert(`Oh no!! Your poor kitty did not get enough ${catProperty}! You are not worthy of Tamagotchi kitty.`);
      alertPrompt = true;
    } else if (cat[catProperty] === 0 && alertPrompt === true) {
        cat[catProperty] = Math.max(futureValue, 0);
    } else {
      cat[catProperty] -= 20;
      adjustProgressBarAndValue(cat, catProperty);
    }
  }, time)
}


let cat = {
  food: 100,
  sleep: 100,
  play: 100,
}

  cat.foodInterval  = timedDecerementPropertyLevel(cat, "food", 1000, foodAlert);
  cat.sleepInterval = timedDecerementPropertyLevel(cat, "sleep", 1000, sleepAlert);
  cat.playInterval  = timedDecerementPropertyLevel(cat, "play", 1000, playAlert);

function loadCat(url) {
  const gifRequest = new XMLHttpRequest();
  gifRequest.onload = function() {
    handleRequest(gifRequest);
  }
  gifRequest.open('GET', url);
  gifRequest.send();
}

function handleRequest(gifRequest) {
  if (gifRequest.status === 200) {
    let parsedJSON = JSON.parse(gifRequest.responseText);
    let results    = document.getElementById('cat');
    let response   = parsedJSON.data.images.fixed_width.url;
    results.innerHTML = `<img src=${response} />`
  } else {
    reject('Error occurred loading gif');
  }
}

// will load new cat image with corresponding button click
// appendWord needs work (returns undefined after first click)
function buttonClickAction(button_name, url, cat, catProperty, word) {
  let button = document.getElementById(`${button_name}`);
  button.addEventListener('click', function() {
    loadCat(url);
    incrementPropertyLevel(cat, catProperty);
  })
}

// will call function to adjust the progress bar and values
// or set the cat property to 100 to ensure it does not go over 100
let incrementPropertyLevel = function(cat, catProperty) {
  // only increments when the new value is still less than or equal to 100;
  let futureValue = cat[catProperty] + 20;
  cat[catProperty] = Math.min(futureValue, 100);
  adjustProgressBarAndValue(cat, catProperty);
  //alertPrompt = false;
}

// sets the progress bars and valueText for property values based on the
// corresponding cat property value e.g. if the value of 'cat.sleep'
// is 65, then the width of the bar and valueText should be 65%
function adjustProgressBarAndValue(cat, catProperty) {
  let bar = document.getElementById(`${catProperty}-bar`);
  let valueText = document.getElementById(`${catProperty}-value`);
  valueText.innerHTML = `${cat[catProperty]}%`;
  bar.style.width = `${cat[catProperty]}%`;
}

function feed() {
  buttonClickAction('feed', foodCat, cat, 'food', 'eat');
}

function play() {
  buttonClickAction('play', playCat, cat, 'play', 'play');
}

function sleep() {
  buttonClickAction('sleep', sleepCat, cat, 'sleep', 'snooze');
}

loadCat(defaultCat);
feed();
play();
sleep();

adjustProgressBarAndValue(cat, 'food');
adjustProgressBarAndValue(cat, 'play');
adjustProgressBarAndValue(cat, 'sleep');
