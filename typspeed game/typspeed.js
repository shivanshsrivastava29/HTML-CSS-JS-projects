const typingText = document.querySelector('.typing-text');
const inputField = document.querySelector('.input-field');
const timeDisplay = document.getElementById('time');
const mistakesDisplay = document.getElementById('mistakes');
const wpmDisplay = document.getElementById('wpm');
const cpmDisplay = document.getElementById('cpm');
const restartBtn = document.getElementById('restart');

let paragraphs = [
    "Avoid daydreaming about the years to come.",
    "You are the most important person in your whole life.",
    "Always be true to who you are, and ignore what other people have to say about you.",
    "Only demonstrate your strength when it’s really required.",
    "Whoever fights monsters should see to it that in the process he does not become a monster."
];

let timer, timeLeft = 60, mistakes = 0, charIndex = 0;
let isTyping = false;

function loadParagraph() {
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = '';
    paragraphs[randomIndex].split('').forEach(char => {
        let span = document.createElement('span');
        span.innerText = char;
        typingText.appendChild(span);
    });
    inputField.value = '';
    inputField.focus();
}

function startTyping() {
    let characters = typingText.querySelectorAll('span');
    let typedChar = inputField.value.split('')[charIndex];
    if (charIndex < characters.length && timeLeft > 0) {
        if (typedChar == null) {
            charIndex--;
            characters[charIndex].classList.remove('correct', 'incorrect');
        } else {
            if (characters[charIndex].innerText === typedChar) {
                characters[charIndex].classList.add('correct');
            } else {
                mistakes++;
                characters[charIndex].classList.add('incorrect');
            }
            charIndex++;
        }
    }
    mistakesDisplay.innerText = mistakes;
    cpmDisplay.innerText = charIndex - mistakes;
    wpmDisplay.innerText = Math.round(((charIndex - mistakes) / 5) / ((60 - timeLeft) / 60));
}

function startTimer() {
    if (!isTyping) {
        isTyping = true;
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                timeDisplay.innerText = timeLeft;
            } else {
                clearInterval(timer);
                inputField.disabled = true;
            }
        }, 1000);
    }
}

function resetGame() {
    clearInterval(timer);
    timeLeft = 60;
    charIndex = 0;
    mistakes = 0;
    isTyping = false;
    timeDisplay.innerText = timeLeft;
    mistakesDisplay.innerText = mistakes;
    wpmDisplay.innerText = 0;
    cpmDisplay.innerText = 0;
    inputField.disabled = false;
    loadParagraph();
}

inputField.addEventListener('input', startTyping);
inputField.addEventListener('focus', startTimer);
restartBtn.addEventListener('click', resetGame);

loadParagraph();