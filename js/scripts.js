//Requirements
// setInterval to decrease all levels on timer - DONE
// adjust the setInterval function to include logic to stop at 0;

// Actions that adjust levels
// feed the tamagotchi increases the food level
// entertain the tamagotchi increases the play level
// sleep increase sleep level
// when entertaining/play level increases, the sleep decreases

// XMLHttpRequests
// get one for the pet upon page load - DONE
// get another once the food action is done (eventlistener - button click)
// remove pet giphy and replace with sleeping once it's time to sleeping
// API Key: dE8nV26K2d3Kt2KRCMuAT0zniF8P5mWH

//"http://api.giphy.com/v1/gifs/JIX9t2j0ZTN9S?api_key=dE8nV26K2d3Kt2KRCMuAT0zniF8P5mWH"
//"api_key": "dE8nV26K2d3Kt2KRCMuAT0zniF8P5mWH",
//"gif_id": "JIX9t2j0ZTN9S"

// have pet in an object with the following attributes: food, sleep, play
// should I replace the url as it's own variable and then include the ids
// in a separate object it gets it from?

const defaultCat = "http://api.giphy.com/v1/gifs/JIX9t2j0ZTN9S?api_key=dE8nV26K2d3Kt2KRCMuAT0zniF8P5mWH";
const playCat = "http://api.giphy.com/v1/gifs/Fig1uR9DGHf6E?api_key=dE8nV26K2d3Kt2KRCMuAT0zniF8P5mWH";
const foodCat = "http://api.giphy.com/v1/gifs/EBDXQI8mRX1u0?api_key=dE8nV26K2d3Kt2KRCMuAT0zniF8P5mWH";
const sleepCat = "http://api.giphy.com/v1/gifs/Nf5FCBnN2TCAE?api_key=dE8nV26K2d3Kt2KRCMuAT0zniF8P5mWH";


let decerementPropertyLevel = function(cat, catProperty, time) {
  // add logic to stop at 0;
  return setInterval(function(){
    cat[catProperty] -= 2;
  }, time)
}


let cat = {
  food: 100,
  sleep: 100,
  play: 100,
}
  cat.foodInterval  = decerementPropertyLevel(cat, "food", 2000);
  cat.sleepInterval = decerementPropertyLevel(cat, "sleep", 2000);
  cat.playInterval  = decerementPropertyLevel(cat, "play", 2000);


console.log(cat);

function loadCat(url) {
  const gifRequest = new XMLHttpRequest();
  gifRequest.onload = function() {
    handleRequest(gifRequest);
  }
  gifRequest.open('GET', url);
  gifRequest.send();
}

function handleRequest(gifRequest) {
  console.log(gifRequest);
  debugger;
  if (gifRequest.status === 200) {
    let parsedJSON = JSON.parse(gifRequest.responseText);
    let results = document.getElementById('cat');
    let workPlacement = document.getElementById('work');
    let response = parsedJSON.data.images.fixed_width.url;
    results.innerHTML = `<img src=${response} />`
  } else {
    // handle the error
    console.log('not a success');
  }
}

// only called when defaultCat is present
function appendWork() {
  setInterval(function() {
    workPlacement.append('work ');
  }, 300)
  setInterval(function() {
    workPlacement.innerHTML = '<div></div>';
  }, 4600)
}
