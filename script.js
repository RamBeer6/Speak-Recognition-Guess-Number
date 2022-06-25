const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();
console.log(randomNum);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognition and game
recognition.start();

// Capture user speak
function onSpeak(e) {
  const msg = e.results[0][0].transcript;

  writeMsg(msg);
  checkNumber(msg);
}

//Check msg to valid number

function checkNumber(msg) {
  const num = +msg;

  // check if msg is valid number
  if (Number.isNaN(num)) {
    msgEl.innerHTML += `<div class="alert">That is NOT a valid number</div>`;
    return;
  }

  // check range of number 1-100
  if (num < 1 || num > 100) {
    msgEl.innerHTML += '<div class="alert">Number MUST be between 1-100';
    return;
  }

  // Check num to randomNum
  if (num === randomNum) {
    document.body.innerHTML = `
    <h2>Congrats! You have guessed the number! <br><br>
    It was ${num}</h2>
    <button class="play-again" id="play-again">Play Again</button>
  `;
  } else if (num > randomNum) {
    msgEl.innerHTML += '<div class="alert"> GO LOWER </div>';
  } else {
    msgEl.innerHTML += '<div class="alert"> GO HIGHER </div>';
  }
}

// Prompt the user What he said
function writeMsg(msg) {
  msgEl.innerHTML = `<div>You Said:</div>
  <span class="msg">${msg}</span>`;
}

// Generate A random number 1-100
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// Speak result
recognition.addEventListener('result', onSpeak);

// End SpeechRecognition service
recognition.addEventListener('end', () => recognition.start());

//play again listeners
document.body.addEventListener('click', (e) => {
  if (e.target.id == 'play-again') {
    window.location.reload();
  }
});
