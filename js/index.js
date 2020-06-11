const card = document.querySelector(".card");
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const lowerCaseLetters = letters.toLowerCase;
let currentLetter = letters[card.getAttribute("letter")];
let displayedLetter = document.querySelector(".letter");
let test = document.querySelector(".test");
let letterId = Number(card.getAttribute("letter"));

console.log(`displayedLetter letter is ${displayedLetter}`);
console.log(`${card.getAttribute("letter")}`);

const updateCurrentLetter = (dir) => {
  currentLetter = letters[card.getAttribute("letter")];
};

const updateCurrentImage = (id) => {
  document.getElementById("letter-image").src = `./images/${id}.jpg`;
};

// handle left and right arrow button clicks

const updateCard = (dir) => {
  console.log(card.getAttribute("letter"));

  if (card.getAttribute("letter") < 0) {
    card.setAttribute("letter", 25);
    updateCurrentLetter();
    displayedLetter.innerHTML = currentLetter;
    console.log("in update card");
    return;
  }

  if (dir == "arrow-left") {
    card.setAttribute("letter", --letterId);
    updateCurrentLetter(dir);
    displayedLetter.innerHTML = currentLetter;
    updateCurrentImage(letterId);
    return;
  }
  card.setAttribute("letter", ++letterId);
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
    console.log(option);
  }
}

populateVoiceList();
var utterThis = new SpeechSynthesisUtterance("C");

const speachHandler = (event) => {
  console.log(test);
  console.log(event.srcElement.attributes.letter);

  utterThis.pitch = 2;
  utterThis.rate = 1;
  synth.speak(utterThis);

  // test.innerHTML = `<h1> ${event.srcElement.attributes.letter.value} </h1>`;
};

document
  .querySelector("#letter-image")
  .addEventListener("click", speachHandler);
