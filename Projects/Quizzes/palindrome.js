initListeners();
let currentExpression = "";
const inputBox = document.querySelector("#input-box");
const outputBox = document.querySelector("#output-box");

// --- DOM Functions ---
function initListeners()
{
    let evalBtn = document.querySelector("#eval-btn");
    let resetBtn = document.querySelector("#reset-btn");

    evalBtn.addEventListener("click", evaluate);
    resetBtn.addEventListener("click", reset);


    document.addEventListener("keyup", (e) => appendExpression(e.key));
}

let isFirstLetter = true;
function appendExpression(key)
{
    if (isAllowed.test(key))
    {
        if (isFirstLetter)
        {
            inputBox.textContent = "";
            isFirstLetter = false;
        }
        currentExpression += key;
        inputBox.textContent += key;
    }
    else
    {
        switch (key)
        {
            case "Enter":
                evaluate();
                break;
            case "Backspace":
                currentExpression = currentExpression.substring(0, currentExpression.length - 1);
                inputBox.textContent = currentExpression;
                break;
            case "Delete":
                reset();
                break;
        }
    }
}

function reset()
{
    currentExpression = "";
    isFirstLetter = true;
    inputBox.textContent = "Type an expression to be evaluated!";
    outputBox.textContent = "Result!";
}
// ---

function evaluate()
{
    let expression = currentExpression.match(isAlphabetic);
    expression = expression === null ? "" : expression.join("");

    expression = expression.toLowerCase();
    console.log(expression);
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
const isAllowed = /^[A-Za-z,\.?!\s]$/;
function isLetter(key)
{
    return regexIsLetter.test(key);
}
// ---