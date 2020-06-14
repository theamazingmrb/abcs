const card = document.querySelector(".card");
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const lowerCaseLetters = letters.toLowerCase;
let currentLetter = letters[card.getAttribute("letter")];
let displayedLetter = document.querySelector(".letter");
let letterId = Number(card.getAttribute("letter"));

const imageNames = {
  0: "Apple",
  1: "Banana",
  2: "Cup",
  3: "Duck",
  4: "Elephant",
  5: "Frog",
  6: "Gorilla",
  7: "Horse",
  8: "Ice Cream",
  9: "Juice",
  10: "Keys",
  11: "Lion",
  12: "Moon",
  13: "Nose",
  14: "Orange",
  15: "Pig",
  16: "Quarter",
  17: "Rainbow",
  18: "Sun",
  19: "Turtle",
  20: "Ubrella",
  21: "Van",
  22: "Whale",
  23: "Xylophone",
  24: "Yoyo",
  25: "Zebra",
};

// Updates the current cards letter and Image
const updateCard = (dir) => {
  const updateAttributes = () => {
    currentLetter = letters[card.getAttribute("letter")];
    displayedLetter.innerHTML = currentLetter;
    document.getElementById("letter-image").src = `./images/${letterId}.jpg`;
    document.getElementById("letter-image").alt = imageNames[letterId];
  };

  // Check if 25 > letterId > 0 and handle card update accordingly
  const checkMinMaxLettid = () => {
    if (card.getAttribute("letter") < 0) {
      card.setAttribute("letter", 25);
      letterId = 25;
      updateAttributes();
      return;
    }

    if (card.getAttribute("letter") > 25) {
      card.setAttribute("letter", 0);
      letterId = 0;
      updateAttributes();
      return;
    }

    updateAttributes();
  };

  if (dir == "arrow-left") {
    card.setAttribute("letter", --letterId);
    checkMinMaxLettid();
    return;
  }

  card.setAttribute("letter", ++letterId);
  checkMinMaxLettid();
};

// handle left and right click
const handleClick = (event) => {
  updateCard(event.target.className);
};

document.querySelector(".arrow-right").addEventListener("click", handleClick);

document.querySelector(".arrow-left").addEventListener("click", handleClick);

var synth = window.speechSynthesis;

function populateVoiceList() {
  voices = synth.getVoices();

  for (i = 0; i < voices.length; i++) {
    var option = document.createElement("option");
    option.textContent = voices[i].name + " (" + voices[i].lang + ")";

    if (voices[i].default) {
      option.textContent += " -- DEFAULT";
    }

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
  }
}

populateVoiceList();

const speachHandler = (event) => {
  let speachText;
  if (event.target.className == "letter") {
    speachText = event.target.innerHTML;
  } else {
    speachText = event.srcElement.attributes.alt.value;
  }
  var utterThis = new SpeechSynthesisUtterance(speachText);

  utterThis.pitch = 2;
  utterThis.rate = 1;
  synth.speak(utterThis);
};

document
  .querySelector("#letter-image")
  .addEventListener("click", speachHandler);

document.querySelector(".letter").addEventListener("click", speachHandler);
