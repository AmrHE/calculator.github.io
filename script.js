//getting all the buttons
let operators = document.querySelectorAll(".operator");
let numberButtons = document.querySelectorAll("button:not(.operator):not(#equalsButton):not(.clearButton):not(.decimal)");
let equalsButton = document.querySelector("#equalsButton");
let commaButton = document.querySelector(".decimal");
let clearButton = document.querySelector(".clearButton");
let delButton = document.querySelector("#backspace");

//get p of old path
let pCurrPath = document.querySelector(".currentPath span");

//get p of current path
let pCurrTyping = document.querySelector(".currentInput p")

let operatorPressed = false;
let currTypingValue = "";

let commaPressed = false;
let equalsPressed = false;

//loop over every numberpad and add evenListener
numberButtons.forEach(numberButton => {
    numberButton.addEventListener("click", function() {
        if(equalsPressed) {
            pCurrTyping.textContent = "";
            pCurrPath.textContent = "";
            equalsPressed = false;
        }
        if(pCurrTyping.textContent.length < 11){
            if (operatorPressed) {
                pCurrTyping.textContent = "";
                pCurrTyping.textContent += numberButton.value;
                operatorPressed = false;
            } else {
                pCurrTyping.textContent += numberButton.value;
                if(pCurrTyping.textContent[0] == '0' && numberButton.value == "0" && !pCurrTyping.textContent.includes(".")) {
                    pCurrTyping.textContent = "0";
                    return;
                }
            }
            currTypingValue = pCurrTyping.textContent;
        }
    })
});

//Loop over every operator and add click eventListner
operators.forEach(operator => {
    operator.addEventListener("click", function() {
        if (equalsPressed) return;
        if (!pCurrTyping.textContent) return;
        if(operatorPressed) {
            pCurrPath.textContent = pCurrPath.textContent.slice(0, -2);
            pCurrPath.textContent += operator.value + " ";
        } else
            pCurrPath.textContent += currTypingValue + " " + operator.value + " ";
            operatorPressed = true;
            commaPressed = false;
    })
});

//operator Functions --> maybe not needed
let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let divide = (a, b) => {
    if (b == 0) return "Error";
    return a / b;
}
let multiply = (a, b) => a * b;

//when equals button is pressed resolve the equation 
equalsButton.addEventListener("click", function() {
    if (equalsPressed) return;
    pCurrPath.textContent += currTypingValue;
    let evalVal = eval(pCurrPath.textContent);
    pCurrPath.textContent += " =";
    pCurrTyping.textContent = evalVal;
    equalsPressed = true;
});

//Add comma when pressed only once

commaButton.addEventListener("click", function() {
    if (pCurrTyping.textContent.includes(".") || operatorPressed) return; // Comment: the replace || with &&
    commaPressed = true;
    pCurrTyping.textContent += ".";
});

//clear button setting
clearButton.addEventListener("click", function() {
    pCurrPath.textContent = "";
    pCurrTyping.textContent = "";
    commaPressed = false;
    equalsPressed = false;
    operatorPressed = false;
});

//Delete Button setting
delButton.addEventListener("click", function() {
    if (pCurrTyping.textContent.length > 0)
    pCurrTyping.textContent = pCurrTyping.textContent.slice(0, -1);
    pCurrPath.textContent += pCurrTyping.textContent.slice(0, -1);
});



//keyboard input handling
document.addEventListener("keydown", function(e) {
    switch (e.key) {
        case "Enter":
            equalsButton.focus();
            equalsButton.click();
            break;
        case ".":
            commabutton.click();
            break;
        case "Backspace":
            delButton.click();
            break;
        case "Delete":
            clearButton.click();
            break;
        default:
            break;
    }
    numberButtons.forEach(numberButton => {
        if (numberButton.value == e.key) {
            numberButton.click();
            return;
        }
    });
    operators.forEach(operator => {
        if (operator.value == e.key) {
            operator.click();
            return;
        }
    });

});