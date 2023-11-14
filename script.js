let str = "";
let display = document.querySelector(".display");
let buttons = document.querySelectorAll(".buttonbox");

// Adiciona o evento de clique para botões
buttons.forEach(function (button) {
    button.addEventListener("click", function (dets) {
        handleButtonClick(dets.target.innerHTML);
    });
});

// Adiciona o evento de teclado
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Evita que o formulário (se houver) seja enviado
        calculateResult();
    } else if (event.key === "c" || event.key === "C") {
        clearCalculator();
    } else if (/[0-9+\-*/.=]/.test(event.key)) {
        handleKeyPress(event.key);
    }
});

function handleButtonClick(value) {
    if (value === "=") {
        calculateResult();
    } else if (value === "C") {
        clearCalculator();
    } else if (value === "DEL") {
        deleteLastInput();
    } else {
        appendInput(value);
    }
}

function handleKeyPress(key) {
    // Verifica se a tecla pressionada é um número ou um operador
    if (/[0-9+\-*/.=]/.test(key)) {
        handleButtonClick(key);
    }
}

function calculateResult() {
    try {
        str = eval(str);
        display.innerHTML = str;
    } catch (error) {
        str = "Error";
        display.innerHTML = str;
    }
}

function clearCalculator() {
    str = "";
    display.innerHTML = str;
}

function deleteLastInput() {
    str = str.slice(0, -1);
    display.innerHTML = str;
}

function appendInput(value) {
    str = str + value;
    display.innerHTML = str;
}

