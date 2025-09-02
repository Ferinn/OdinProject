const btnIds =
{
    "plus" : "+",
    "minus" : "-",
    "multiply" : "*",
    "divide" : "/"
}
const allowedKeys =
[
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9
]
// DOM objects initialisation
const formulaBox = document.querySelector("#formula-box");
const errorBox = document.querySelector("#error-box");
listenToButtons();
// ---

// operations initialisation
let operation
{
    operandA = 0;
    operator = "+";
    operandB = 0;
}

let operations = new Array(9);
let lastOperation = -1;

let mainString = "";
// ---



function listenToButtons()
{
    let _buttons = document.querySelectorAll("button");
    for (let i = 0; i < _buttons.length; i++)
    {
        let id = _buttons[i].id;
        if (id === "resolve")
        {
            _buttons[i].addEventListener("click", resolve);
        }
        else
        {
            _buttons[i].addEventListener("click", () => addOperator(btnIds[id]));
        }
    }
}

function listenToKeyboard()
{
    document.addEventListener("keyup", (e) => addOperand(e.key));
}

function addOperator(type)
{
    if (lastOperation === -1)
    {
        error("Can't start formula with an operator");
    }
    else
    {
        let lastOperand = operations[lastOperation].operandB;
        let newOperation = new Object({operandA : lastOperand, operator : type, operandB : 0});
        addOperation(newOperation);
        mainString += type;
    }
    update();
}

function addOperand(key)
{
    if (verifyKey(key))
    {
        if (lastOperation === -1)
        {
            let newOperation = new Object({operandA : key, operator : "+", operandB : 0});
            addOperation(newOperation);
            mainString += key;
        }
    }
}

function resolve()
{
    mainString += "done";
    update();
}

function update()
{
    formulaBox.textContent = mainString;
}

function error(message)
{
    errorBox.textContent = message;
}

function addOperation(operation)
{
    operations.push(operation);
    lastOperation++;
}

function verifyKey(key)
{
    for (let i = 0; i < allowedKeys.length; i++)
    {
        if (key === allowedKeys[i])
        {
            return true;
        }
    }
    return false;
}