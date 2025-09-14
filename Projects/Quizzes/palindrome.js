initListeners();
let currentExpression = "";
const inputBox = document.querySelector("#input-box");
const outputBox = document.querySelector("#output-box");

// --- DOM Functions ---
function initListeners()
{
    let evalBtn = document.querySelector("#eval-btn");
    let resetBtn = document.querySelector("#reset-btn");
    let inputBox = document.querySelector("#input-box");

    evalBtn.addEventListener("click", evaluate);
    resetBtn.addEventListener("click", reset);
    inputBox.addEventListener("change", processInput);
}

function processInput()
{
    currentExpression = inputBox.value.toString();
    console.log(currentExpression);
}

function reset()
{
    currentExpression = "";
    inputBox.textContent = "Type an expression to be evaluated!";
    outputBox.textContent = "Result!";
}
// ---

function evaluate()
{
    let expression = currentExpression.match(isAlphabetic);
    expression = expression === null ? "" : expression.join("");

    expression = expression.toLowerCase();
    let length = expression.length;

    for (let jawL = 0, jawR = length - 1;
        jawL <= jawR;
        jawL++, jawR--)
    {
        if (expression[jawL] !== expression[jawR])
        {
            outputBox.textContent = "Expression is not a palindrome!";
            return;
        }
    }
    outputBox.textContent = "Expression is a palindrome!";
}

// --- Helper Functions
const regexIsLetter = /^[A-Za-z]$/;
const isAlphabetic = /[A-Za-z]/g;
function isLetter(key)
{
    return regexIsLetter.test(key);
}
// ---