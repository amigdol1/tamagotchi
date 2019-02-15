//Requirements
// setInterval to decrease all levels on timer - DONE
// adjust the setInterval function to include logic to stop at 0;

// Actions that adjust levels
// feed the tamagotchi increases the food level - DONE
// entertain the tamagotchi increases the play level - DONE
// sleep increase sleep level - DONE

// XMLHttpRequests
// get one for the pet upon page load
// get another once the food action is done (eventlistener - button click) - DONE
// remove pet giphy and replace with sleeping once it's time to sleeping
// API Key: dE8nV26K2d3Kt2KRCMuAT0zniF8P5mWH

//"http://api.giphy.com/v1/gifs/JIX9t2j0ZTN9S?api_key=dE8nV26K2d3Kt2KRCMuAT0zniF8P5mWH"
//"api_key": "dE8nV26K2d3Kt2KRCMuAT0zniF8P5mWH",
//"gif_id": "JIX9t2j0ZTN9S"

// have pet in an object with the following attributes: food, sleep, play - DONE


const defaultCat = "http://api.giphy.com/v1/gifs/JIX9t2j0ZTN9S?api_key=dE8nV26K2d3Kt2KRCMuAT0zniF8P5mWH";
const playCat    = "http://api.giphy.com/v1/gifs/Fig1uR9DGHf6E?api_key=dE8nV26K2d3Kt2KRCMuAT0zniF8P5mWH";
const foodCat    = "http://api.giphy.com/v1/gifs/EBDXQI8mRX1u0?api_key=dE8nV26K2d3Kt2KRCMuAT0zniF8P5mWH";
const sleepCat   = "http://api.giphy.com/v1/gifs/Nf5FCBnN2TCAE?api_key=dE8nV26K2d3Kt2KRCMuAT0zniF8P5mWH";

// decrements property level through interval time
let timedDecerementPropertyLevel = function (cat, catProperty, time) {
  return setInterval(function(){
    cat[catProperty] -= 1;
    adjustProgressBarAndValue(cat, catProperty);
  }, time)
}


let cat = {
  food: 100,
  sleep: 100,
  play: 100,
}

  cat.foodInterval  = timedDecerementPropertyLevel(cat, "food", 1000);
  cat.sleepInterval = timedDecerementPropertyLevel(cat, "sleep", 1000);
  cat.playInterval  = timedDecerementPropertyLevel(cat, "play", 1000);

let incrementPropertyLevel = function(cat, catProperty) {
  if ((cat[catProperty] += 1) <= 100 === true) {
    cat[catProperty] += 1;
    adjustProgressBarAndValue(cat, catProperty);
  } else {
    cat[catProperty] = 100;
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
    let results = document.getElementById('cat');
    let response = parsedJSON.data.images.fixed_width.url;
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


// sets the progress bars and text for property values based on the
// corresponding cat property value e.g. if the value of 'cat.sleep'
// is 65, then the width of the bar and valueText should be 65%
function adjustProgressBarAndValue(cat, catProperty) {
  if ((cat[catProperty] >= 0) && (cat[catProperty] <= 100)) {
    let bar = document.getElementById(`${catProperty}-bar`);
    let valueText = document.getElementById(`${catProperty}-value`);
    valueText.innerHTML = '<div></div>';
    valueText.append(`${cat[catProperty]}%`);
    bar.style.width = `${cat[catProperty]}%`;
  }
}


adjustProgressBarAndValue(cat, 'food');
adjustProgressBarAndValue(cat, 'play');
adjustProgressBarAndValue(cat, 'sleep');
