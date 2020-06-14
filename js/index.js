const card = document.querySelector(".card");
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const lowerCaseLetters = letters.toLowerCase;
let currentLetter = letters[card.getAttribute("letter")];
let displayedLetter = document.querySelector(".letter");
let test = document.querySelector(".test");
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

const updateCurrentLetter = (dir) => {
  currentLetter = letters[card.getAttribute("letter")];
};

const updateCurrentImage = (id) => {
  document.getElementById("letter-image").src = `./images/${id}.jpg`;
  document.getElementById("letter-image").alt = imageNames[id];
};

// handle left and right arrow button clicks

const updateCard = (dir) => {
  console.log(card.getAttribute("letter"));

  const checkMinMaxLettid = () => {
    if (card.getAttribute("letter") < 0) {
      card.setAttribute("letter", 25);
      letterId = 25;
      updateCurrentLetter();
      displayedLetter.innerHTML = currentLetter;
      return;
    }

    if (card.getAttribute("letter") > 25) {
      card.setAttribute("letter", 0);
      letterId = 0;
      updateCurrentLetter();
      displayedLetter.innerHTML = currentLetter;
      return;
    }
  };

  if (dir == "arrow-left") {
    card.setAttribute("letter", --letterId);
    checkMinMaxLettid();
    updateCurrentLetter(dir);
    displayedLetter.innerHTML = currentLetter;
    updateCurrentImage(letterId);

    return;
  }
  card.setAttribute("letter", ++letterId);
  checkMinMaxLettid();
  updateCurrentLetter(dir);
  displayedLetter.innerHTML = currentLetter;
  updateCurrentImage(letterId);
};

const handleClick = (event) => {
  updateCard(event.target.className);
};

const nextButton = document.querySelector(".next");

nextButton.addEventListener("click", () => {
  alert("button click");
});

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

  // test.innerHTML = `<h1> ${event.srcElement.attributes.letter.value} </h1>`;
};

document
  .querySelector("#letter-image")
  .addEventListener("click", speachHandler);

document.querySelector(".letter").addEventListener("click", speachHandler);
