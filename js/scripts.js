//"http://api.giphy.com/v1/gifs/JIX9t2j0ZTN9S?api_key=dE8nV26K2d3Kt2KRCMuAT0zniF8P5mWH"
//"api_key": "dE8nV26K2d3Kt2KRCMuAT0zniF8P5mWH",

// Make mobile-friendly;


const defaultCat = "http://api.giphy.com/v1/gifs/JIX9t2j0ZTN9S?api_key=dE8nV26K2d3Kt2KRCMuAT0zniF8P5mWH";
const playCat    = "http://api.giphy.com/v1/gifs/Fig1uR9DGHf6E?api_key=dE8nV26K2d3Kt2KRCMuAT0zniF8P5mWH";
const foodCat    = "http://api.giphy.com/v1/gifs/EBDXQI8mRX1u0?api_key=dE8nV26K2d3Kt2KRCMuAT0zniF8P5mWH";
const sleepCat   = "http://api.giphy.com/v1/gifs/Nf5FCBnN2TCAE?api_key=dE8nV26K2d3Kt2KRCMuAT0zniF8P5mWH";

// decrements property level through interval time
let timedDecerementPropertyLevel = function (cat, catProperty) {
  let futureValue = cat[catProperty] - 1;
  cat[catProperty] = Math.max(futureValue, 0);
  adjustProgressBarAndValue(cat, catProperty);
  if (!cat[catProperty]) {
    alert(`Oh no!! Your poor kitty did not get enough ${catProperty}! You are not worthy of Tamagotchi kitty.`);
    document.getElementById(`${catProperty}`).disabled = true;
    // check to see if endTamagotchiLife is applicable before the relevant interval is cleared
    endTamagotchiLife();
    clearInterval(determineInterval(catProperty));
  }
}

// create a new function that checks if all of the alerts are true and
// then it wont allow you to incremement the level
let cat = {
  food: 100,
  sleep: 100,
  play: 100,
}

  let foodInterval  = setInterval(timedDecerementPropertyLevel.bind(this, cat, "food"), 1000);
  let playInterval  = setInterval(timedDecerementPropertyLevel.bind(this, cat, "play"), 1000);
  let sleepInterval = setInterval(timedDecerementPropertyLevel.bind(this, cat, "sleep",), 1000);

  function determineInterval(catProperty) {
    switch(catProperty) {
    case 'food':
      return foodInterval;
      break;
    case 'play':
      return playInterval;
      break;
    case 'sleep':
      return sleepInterval;
      break;
    }
  }


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


// will call function to adjust the progress bar and values
// or set the cat property to 100 to ensure it does not go over 100
let incrementPropertyLevel = function(cat, catProperty) {
  let futureValue = cat[catProperty] + 1;
  if (cat[catProperty] != 0) {
    cat[catProperty] = Math.min(futureValue, 100);
    adjustProgressBarAndValue(cat, catProperty);
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

// sets the progress bars and valueText for property values based on the
// corresponding cat property value e.g. if the value of 'cat.sleep'
// is 65, then the width of the bar and valueText should be 65%
function adjustProgressBarAndValue(cat, catProperty) {
  let bar = document.getElementById(`${catProperty}-bar`);
  let valueText = document.getElementById(`${catProperty}-value`);
  valueText.innerHTML = `${cat[catProperty]}%`;
  bar.style.width = `${cat[catProperty]}%`;
}

// check to see if all property values are at 0
// Tamagotchi can no longer continue it's life if all resources are at 0
function endTamagotchiLife() {
  if (!cat.food && !cat.play && !cat.sleep) {
    alert("All of your Tamagotchi's life resources have depleted! Game over.");
  }
}

function food() {
  buttonClickAction('food', foodCat, cat, 'food', 'eat');
}

function play() {
  buttonClickAction('play', playCat, cat, 'play', 'play');
}

function sleep() {
  buttonClickAction('sleep', sleepCat, cat, 'sleep', 'snooze');
}

loadCat(defaultCat);
food();
play();
sleep();

adjustProgressBarAndValue(cat, 'food');
adjustProgressBarAndValue(cat, 'play');
adjustProgressBarAndValue(cat, 'sleep');
