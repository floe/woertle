// get divs set up
const page = document.getElementById('page');
const guessContainer = document.getElementById('guessContainer');
const keyboardContainer = document.getElementById('keyboardContainer');
let displayMessage = document.getElementById('displayMessage');

let guessArray = [];
let guessDivArray = [];
let letterBox=[];
let letterBoxDivArray = [];
let currentGuess='';
let guessNum = 0;
let currentLetterBox = null;
let currentBoxNum = 0;

const wordList = [];

wordList[0] = ["äbbes","alloi"];
wordList[1] = ["baura","briah"];
wordList[2] = ["ccccc"];
wordList[3] = ["dregg"];
wordList[4] = ["ebbes"];
wordList[5] = ["fluag"];
wordList[6] = ["gosch","glump"];
wordList[7] = ["haufa"];
wordList[8] = ["iiiii"];
wordList[9] = ["jeses"];
wordList[10] = ["kerle","kiebl","kiddl"];
wordList[12] = ["lackl","leffl"];
wordList[13] = ["macha"];
wordList[14] = ["neine"];
wordList[15] = ["obads"];
wordList[16] = ["ppppp"];
wordList[17] = ["qqqqq"];
wordList[18] = ["roifa"];
wordList[19] = ["seggl"];
wordList[20] = ["ttttt"];
wordList[21] = ["uuuuu"];
wordList[22] = ["vvvvv"];
wordList[23] = ["woich","waffl"];
wordList[24] = ["yyyyy"];
// wordList[25] = []

let word;
const WORD_LENGTH = 5;
const GUESSES = 6;
const disabledKeys = ['Escape', 'Tab', 'Shift', 'CapsLock', 'Control', 'Meta', 'Alt', 'ContentMenu', 'NumLock', 'ScrollLock', 'Pause', 'Delete', 'End', 'PageDown', 'PageUp', 'Home', 'Insert', 'ArrowUp', 'ArrowLeft', 'ArrowDown','ArrowRight', '*', '+', ' ','F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12', '`', '1','2','3','4','5','6','7','8','9','0','-', "`","'", '=', '[',']', '\\', ';', '/', '.', '\,'];

function setup(){
  for (let j = 0; j<GUESSES*WORD_LENGTH; j++){
      letterBox[j] = document.createElement('div');
      letterBox[j].classList.add('letterBox');
  }
  
  let count = 0;
  currentLetterBox = letterBox[currentBoxNum];
  
  for (let i = 0; i<6; i++){
    count = i*5;
    guessDivArray[i] = document.createElement('div');
    guessContainer.appendChild(guessDivArray[i]);
    guessDivArray[i].classList.add('wordContainer');
    for (let k=count; k<count+5; k++){
      guessDivArray[i].appendChild(letterBox[k]);
    }
  }
  keyboardSetup();
  word = getWord();
  console.log(word);
}

function getWord(){
  let randomLetterIndex = getRandomNumber(0,25);
  let listLength = wordList[randomLetterIndex].length;
  let randomWordIndex = getRandomNumber(0, listLength);

  return wordList[randomLetterIndex][randomWordIndex].toUpperCase();  
}

function getRandomNumber(min,max){ //taken from internet
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function keyboardSetup(){

  let keyBox = document.getElementsByClassName('key');
  for (let i = 0; i<keyBox.length; i++){
    keyBox[i].addEventListener('click', (event)=>{processKeyEvent(event)});
  } 
}

function processKeyEvent(event){
  if (guessNum <=5){
    keyPressed = event.key;
    if (event.key === undefined){
      keyPressed = event.target.innerText;
    }
    if (keyPressed == 'Enter' || keyPressed == '✅️'){
      submitWord();
      return;
    }
    if (keyPressed == 'Backspace' || keyPressed == '⬅️' ){
      previousBox()
      return;
    }
    else if (currentGuess.length <5){
      if (disabledKeys.includes(keyPressed)){
        console.log('that not allowed');
        return;
      }
      else{
        displayKey(keyPressed);
        nextBox();
      }
    }
  }
}

function nextBox(){ // move to next box
  currentBoxNum +=1;
  currentLetterBox = letterBox[currentBoxNum];
}

function previousBox(){ //move to previous box and clear it
  if (!currentGuess == ''){
    currentBoxNum -=1;
    currentLetterBox = letterBox[currentBoxNum];
    currentLetterBox.innerText = '';
    currentGuess = currentGuess.slice(0,-1);
  }
}

function displayKey(key){ // put keypress in box
  key = key.toUpperCase();
  currentLetterBox.innerText = key;
  currentGuess += key;
}

function checkWord(){
  giveHints();
  if (currentGuess == word){    
    displayText('You win!');
  }
  else if (guessNum == 5){
    displayText(`The word was ${word}`);
  }
}

function giveHints(){
  firstLetterBox = guessNum*5;  
  let keyDiv;
  let color;
  for (let i = 0; i < 5; i++){
    currentLetterBox = letterBox[firstLetterBox];
    keyDiv = document.getElementById(currentGuess[i].toLowerCase());

    if (word[i] == currentGuess[i]){
      color = 'green';
    }
    else if (word.indexOf(currentGuess[i]) > -1){
      color = 'gold'
    }
    else{
      color = 'grey'
      
    }
        
    
    console.log(keyDiv.style.border);
    let card = currentLetterBox;
    let cardColor = color;
    let keyboardKey = keyDiv;
    setTimeout(()=>{card.classList.add('flipLetter');
                    card.style.backgroundColor = cardColor;
                    card.style.border = `2px solid ${cardColor}`;
                    keyboardKey.style.backgroundColor = cardColor;
                  }
              , 300*i);
        
    firstLetterBox +=1;
  }
}

function submitWord(){
  if (currentGuess.length == 5){
    checkWord();
    guessNum+=1;
    currentGuess = '';
    currentBoxNum = guessNum*5;
    currentLetterBox = letterBox[currentBoxNum];
    return;
  }
  else{
    displayText('Not enough letters in word');
    let wordContainer = currentLetterBox.parentElement;
    wordContainer.classList.remove('shakeWord');
    setTimeout(()=>{wordContainer.classList.add('shakeWord')}, 100); 
    return;
  }
}

function displayText(message){
  displayMessage.innerText = message;
  displayMessage.classList.add('show');
  setTimeout(()=>{displayMessage.classList.remove('show')}, 2000);
}

setup();

window.addEventListener("keydown", (event)=>{ //process keypresses
 processKeyEvent(event)    
}, true);
