const darkMode = document.querySelector('.toggle-dark');
const mainContainer = document.querySelector('.main');
const keyboard = document.querySelector('.keyboard');
const keys = document.querySelectorAll('.key');
const countKeys = document.querySelectorAll('.count');
const clearKey = document.querySelector('.clear');
const numberKeys = document.querySelectorAll('.number');
const currCount = document.querySelector('.curr-count');
const resultContainer = document.querySelector('.result');
const light = document.querySelector('.light-mode');
const dark = document.querySelector('.dark-mode');
const body = document.querySelector('body');
let theme = 'light';

// dark mode

const toggleDarkMode = () => {
  (theme === 'light' ? theme = 'dark' : theme = 'light');
  mainContainer.classList.toggle('dark');
  keyboard.classList.toggle('dark');
  light.classList.toggle('dark');
  dark.classList.toggle('dark');
  darkMode.classList.toggle('dark');
  body.classList.toggle('dark');
  keys.forEach((key) => {
    if (key.classList.contains('count')) { return }
    else { key.classList.toggle('dark'); }
  });
  countKeys.forEach((key) => key.classList.toggle('dark'));
  localStorage.setItem('theme', theme);
};

darkMode.addEventListener('click', toggleDarkMode);

window.onload = () => {
  if (localStorage.theme === 'dark') { toggleDarkMode() }
  else { return };
}

// limit characters

let numberLength = '';

const maxLength = (currNumber) => {
  if (currNumber.length < 16) { return true };
  return false;
};

// press numbers

let allowNumber = true;
let calculate = '';
let countUpdate = '';

const getNumbers = (evt) => {
  if (!allowNumber) { return; }
  if (evt.target.id === 'dot') { 
    calculate += '.';
    return;
  }
  const number = Number(evt.target.id);
  calculate += number;
  numberLength += number;
  countUpdate += number;
  if (!maxLength(numberLength)) { return; }
  currCount.innerHTML += number;
};

numberKeys.forEach((number) => number.addEventListener('click', getNumbers));

// check if last character is number

let pressUndo = false;
let isLastCharacterNumber = false;

const checkLastCharacter = () => {
  const lastCharacter = calculate.split('').pop();
  const signals = ['+', '-', '*', '/'];
  const test = signals.some((signal) => signal === lastCharacter);

  if (test) {
    isLastCharacterNumber = false;
    return false
  } else {
    isLastCharacterNumber = true;
    return true;
  }
};


// clear key

clearKey.addEventListener('click', () => {
  calculate = '';
  allowNumber = true;
  numberLength = '';
  currCount.innerHTML = '';
  resultContainer.innerHTML = '';
});

// equals

let result = 0;
const equalsBtn = document.querySelector('.equal');

equalsBtn.addEventListener('click', () => {
  const total = eval(calculate);
  if (calculate.length === 0) { return; }
  calculate = '';
  numberLength = '';
  allowNumber = false;
  resultContainer.innerHTML = total;
  if (resultContainer.innerHTML.length > 12 && resultContainer.innerHTML.length < 20) {
    resultContainer.style.fontSize = '20px';
  } else if (resultContainer.innerHTML.length > 19){
    resultContainer.style.fontSize = '16px';
  } else {
    resultContainer.style.fontSize = '35px';
  }
});

// check last result

const checkLast = () => {
  if (calculate != '' ) { return }
  calculate += resultContainer.innerHTML
  currCount.innerHTML = resultContainer.innerHTML;
};

// sum

const sumBtn = document.querySelector('.plus');

const sum = () => {
  checkLastCharacter()
  if (!isLastCharacterNumber || currCount.innerHTML.length === 0) { return; }
  checkLast();
  numberLength = '';
  allowNumber = true;
  calculate += '+';
  currCount.innerHTML += ' + ';
};

sumBtn.addEventListener('click', sum);

// sub

const minusBtn = document.querySelector('.minus');

const sub = () => {
  checkLastCharacter()
  if (!isLastCharacterNumber || currCount.innerHTML.length === 0) { return; }
  checkLast();
  numberLength = '';
  allowNumber = true;
  calculate += '-';
  currCount.innerHTML += ' - ';
};

minusBtn.addEventListener('click', sub);

// mult

const timesBtn = document.querySelector('.times');

const mult = () => {
  checkLastCharacter()
  if (!isLastCharacterNumber || currCount.innerHTML.length === 0) { return; }
  checkLast();
  numberLength = '';
  allowNumber = true;
  calculate += '*';
  currCount.innerHTML += ' x ';
};

timesBtn.addEventListener('click', mult);

// div

const divBtn = document.querySelector('.div');

const div = () => {
  checkLastCharacter()
  if (!isLastCharacterNumber || currCount.innerHTML.length === 0) { return; }
  checkLast();
  numberLength = '';
  allowNumber = true;
  calculate += '/';
  currCount.innerHTML += ' / ';
};

divBtn.addEventListener('click', div);

// dot

const dotBtn = document.querySelector('.dot');

dotBtn.addEventListener('click', () => {
  if (currCount.innerHTML.length === 0) {
    currCount.innerHTML += '0.';
  } else {
    currCount.innerHTML += '.';
  }
});

// undo

const undoBtn = document.querySelector('.undo');
let updated = '';

const updateCurrent = (current) => {
  const update = current.slice(0, -1);
  return update;
};

undoBtn.addEventListener('click', () => {
  if (!allowNumber) { return; }
  const currentHtml = currCount.innerHTML.split('');
  let updatedHtml = currentHtml;
  const currentCount = calculate.split('');
  let updatedCount = currentCount;
  calculate = '';

  if (currentHtml.pop() === ' ') {
    pressUndo = true;
    for (let index = 0; index < 2; index++) {
      updatedHtml = updateCurrent(updatedHtml);
      currCount.innerHTML = updatedHtml.join('');
    }
    updatedCount = updateCurrent(updatedCount)
    calculate = updatedCount.join('');
  } else {
    updatedCount = updateCurrent(updatedCount);
    updatedHtml.slice(0, -1);
    calculate = updatedCount.join('');
    currCount.innerHTML = updatedHtml.join('');
  }
});
