// const objects
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
const nodeTypes = Object.freeze(
{
    ROOT : -1,
    VALUE : 0,
    OPERATION : 1
});
// ---

// DOM objects initialisation
const formulaBox = document.querySelector("#formula-box");
const errorBox = document.querySelector("#error-box");
listenToButtons();
listenToKeyboard();
// ---

// Class declaration
class MathNode
{
    constructor(_operandA, _operator, isRoot)
    {
        // value = this node is only a value
        // operation = this node contains two values and a operator
        // root = this node is the first node of the formula
        if (isRoot === true)
        {
            this.nodeType = nodeTypes.ROOT;
        }
        else if (_operator !== undefined)
        {
            this.nodeType = nodeTypes.OPERATION;
        }
        else {this.nodeType = nodeTypes.VALUE;}

        this.operandA = _operandA;
        this.operator = _operator;
        this.operandB = undefined;
    }
    resolve()
    {
        if (this.nodeType === nodeTypes.VALUE)
        {
            return this.operandA;
        }
        else if (this.nodeType === nodeTypes.OPERATION)
        {
            switch (this.operator)
            {
                case "+":
                    return this.operandA.resolve() + this.operandB.resolve();
                case "-":
                    return this.operandA.resolve() - this.operandB.resolve();
                case "*":
                    return this.operandA.resolve() * this.operandB.resolve();
                case "/":
                    return this.operandA.resolve() / this.operandB.resolve();
            }
        }
        return 0;
    }
}
let nodeTree = [];
let lastNode = undefined;
let rootNode = undefined;

let mainString = "";
// ---

// listener initialisation
function listenToButtons()
{
    let _buttons = document.querySelectorAll("button");
    for (let i = 0; i < _buttons.length; i++)
    {
        let id = _buttons[i].id;
        if (id === "resolve")
        {
            _buttons[i].addEventListener("click", resolveAll);
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
// ---

// button actions
function addOperator(type)
{
    if (lastNode === undefined)
    {
        error("Can't start the formula with an operator");
    }
    else if (lastNode.nodeType === nodeTypes.ROOT)
    {
        lastNode.nodeType = nodeTypes.OPERATION;
        lastNode.operator = type;
    }
    else
    {
        let newNode = new MathNode(lastNode, type);
        addNode(newNode);
        mainString += type;
    }
    update();
}

function addOperand(stringKey)
{
    let key = parseInt(stringKey, 10);
    if (verifyKey(key))
    {
        if (lastNode === undefined)
        {
            let newNode = new MathNode(new MathNode(key), undefined, true);
            rootNode = newNode;
            addNode(newNode);
        }
        else if (lastNode.nodeType === nodeTypes.VALUE)
        {
            lastNode.operandA = appendDigit(lastNode.operandA, key);
        }
        else if (lastNode.nodeType === nodeTypes.OPERATION)
        {
            // handling cases when the second operand of an operation is being appended into 
            // a multi-digit number, or initilised for the first time
            if (lastNode.operandB !== undefined)
            {
                lastNode.operandB.operandA = appendDigit(lastNode.operandB.operandA, key);
            }
            else
            {
                let newNode = new MathNode(key);
                lastNode.operandB = newNode;
            }
        }

        mainString += stringKey;
        update();
    }
}

function resolveAll()
{
    if (lastNode === undefined)
    {
        error("Cannot evaluate formula, formula incomplete!");
    }
    if (lastNode.operandB !== undefined)
    {
        mainString = rootNode.resolve();
        update();
    }
    else
    {
        error("Cannot evaluate formula, last binary operator has no second operand!");
    }
}
// ---

function update()
{
    formulaBox.textContent = mainString;
}

function error(message)
{
    errorBox.textContent = message;
}

function addNode(newNode)
{
    nodeTree.push(newNode);
    lastNode = newNode;
}

function verifyKey(key)
{
    let intKey = parseInt(key, 10);
    for (let i = 0; i < allowedKeys.length; i++)
    {
        if (intKey === allowedKeys[i])
        {
            return true;
        }
    }
    return false;
}

function appendDigit(a, b)
{
    return parseInt(a.toString() + b.toString(), 10);
}
// ---