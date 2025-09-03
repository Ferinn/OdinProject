// const objects
const btnIds =
{
    "plus" : "+",
    "minus" : "-",
    "multiply" : "*",
    "divide" : "/"
}
const allowedNumKeys =
[
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "."
]
const allowedOperatorKeys =
[
    "+", "-", "*", "/", "=", "Enter"
]
// primitive enum
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
        // VALUE = this node is only a value
        // OPEARTION = this node contains two values and a operator
        // ROOT = this node is the first node of the formula
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
        // guard to return valid value of ROOT and VALUE nodes
        if (this.nodeType === nodeTypes.VALUE || this.nodeType === nodeTypes.ROOT && this.operator === undefined)
        {
            return (this.nodeType === nodeTypes.ROOT) ? this.operandA.resolve() : this.operandA;
        }
        // recursive evaluation of operations; order of operations is already built at newOperator() with root chaining
        if (this.nodeType === nodeTypes.OPERATION)
        {
            let L = this.operandA.resolve();
            let R = this.operandB.resolve();
            switch (this.operator)
            {
                case "+": return L + R;
                case "-": return L - R;
                case "*": return L * R;
                case "/": return L / R;
            }
        }
        return 0;
    }
}
let nodeTree = [];
let root = undefined;
let lastNode = undefined;

let mainString = "";
let isAppendingFloat = false;
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
        return;
    }
    if (lastNode.nodeType === nodeTypes.OPERATION && lastNode.operandB === undefined)
    {
        error("Can't insert more than one operator in a row!");
        return;
    }

    // ending float creation
    if (isAppendingFloat)
    {
        isAppendingFloat = false;
    }

    // Transforming node ROOT into an OPERATION
    if (lastNode.nodeType === nodeTypes.ROOT)
    {
        lastNode.nodeType = nodeTypes.OPERATION;
        lastNode.operator = type;
        lastNode = root; // regardless of the precedence, this is the topmost priority now
        
        //updating display
        mainString += type;
        update();
        return;
    }

    let newOp = new MathNode(undefined, type);

    // New operator has <= precedence than root; setting it to new root
    if (isPrecedent(type) <= isPrecedent(root.operator))
    {
        // chaining previous root to the left of this new current root
        newOp.operandA = root;
        root = newOp;

        //updating display and lastNode
        lastNode = newOp;
        mainString += type;
        update();
        return;
    }

    // New operator has > precedence; insert under right spine
    let node = root;
    // Walk while the RIGHT CHILD is an operation with precedence >= new op
    while ( node.operandB &&
            node.operandB.nodeType === nodeTypes.OPERATION &&
            isPrecedent(node.operandB.operator) >= isPrecedent(type))
    {
        node = node.operandB;
    }

    // Insert between node and its right child
    newOp.operandA = node.operandB; // left side of new op is what used to be node's right
    node.operandB = newOp;          // new op becomes the new right child

    lastNode = newOp; // next digits will fill operandB of this new op
    
    //updating display
    mainString += type;
    update();
}

function addOperand(stringKey)
{
    // catches other keyboard inputs
    if (verifyKeyOperator(stringKey) >= 0)
    {
        if (stringKey !== "=" && stringKey !== "Enter")
        {
            addOperator(stringKey);
        }
        else
        {
            resolveAll();
        }
        return;
    }

    if (!verifyKeyInt(stringKey)) return;

    // guard catching creating a new float number
    if (stringKey === "." && !isAppendingFloat)
    {
        // catching a number that'd start with a decimal point
        if (lastNode.nodeType === nodeTypes.OPERATION && lastNode.operandB === undefined)
        {
            error("Cannot start a number with a decimal point!");
            return;
        }
        isAppendingFloat = true;
        mainString += stringKey;
        update();
        return;
    }
    // dealing with digits
    else if (isAppendingFloat)
    {
        // catching "." while already placing the decimal digits
        if (stringKey === ".")
        {
            error("Cannot put a decimal point into the decimal digits!");
            return;
        }
        let key = parseInt(stringKey, 10);
        createFloat(key);
        return;
    }

    // dealing with digits
    let key = parseInt(stringKey, 10);
    // creating a new ROOT node if there's nothing in the nodeTree yet
    if (!root)
    {
        let newRoot = new MathNode(new MathNode(key), undefined, true);
        addNode(newRoot);
        mainString += stringKey;
        update();
        return;
    }

    // If lastNode is a VALUE, append its digits
    if (lastNode.nodeType === nodeTypes.VALUE)
    {
        lastNode.operandA = appendDigit(lastNode.operandA, key);
    }
    // node ROOT was not transformed into an operation yet, appending digits
    else if (lastNode.nodeType === nodeTypes.ROOT && lastNode.operator === undefined)
    {
        root.operandA.operandA = appendDigit(root.operandA.operandA, key);
    }
    // adding new operandB to lastNode or appending its existing operandB
    else if (lastNode.nodeType === nodeTypes.OPERATION)
    {
        // operandB is undefined, creating new
        if (!lastNode.operandB)
        {
            const val = new MathNode(key);
            lastNode.operandB = val;
            lastNode = val;
            nodeTree.push(val);
        }
        // operandB is defined, appending its digits
        else
        {
            const target = lastNode.operandB;
            target.operandA = appendDigit(target.operandA, key);
        }
    }

    // display update
    mainString += stringKey;
    update();
}

function resolveAll()
{
    if (!root)
    {
        error("Cannot evaluate formula, formula incomplete!");
        return;
    }
    else if (root.nodeType === nodeTypes.OPERATION && !root.operandB)
    {
        error("Cannot evaluate formula, last binary operator has no second operand!");
        return;
    }

    let result = root.resolve();
    mainString = result;
    update();

    // Reseting all except for the result value
    nodeTree = [];
    root = new MathNode(new MathNode(result), undefined, true);
    lastNode = root;
    nodeTree.push(root);
    isAppendingFloat = false;
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
    if (root === undefined) {root = newNode;}
    lastNode = newNode;
    
}

// verifying that the key is contained within allowedNumKeys
function verifyKeyInt(key)
{
    if (key === ".")
    {
        return true;
    }
    try
    {
        let intKey = parseInt(key, 10);
        for (let i = 0; i < allowedNumKeys.length; i++)
        {
            if (intKey === allowedNumKeys[i])
            {
                return true;
            }
        }
    }
    catch
    {
       
    }
    return false;
}

// verifying that the key is contained within allowedOperatorKeys
function verifyKeyOperator(key)
{
    for (let i = 0; i < allowedOperatorKeys.length; i++)
    {
        if (key === allowedOperatorKeys[i])
        {
            // returns which operator it is as per the array
            return i;
        }
    }
    // not a supported operator
    return -1;
}

function appendDigit(a, b)
{
    return parseInt(a.toString() + b.toString(), 10);
}

function appendFloat(a, b)
{
    if (a.toString().includes("."))
    {
        return parseFloat(a.toString() + b.toString());
    }
    return parseFloat(a.toString() + "." + b.toString());
}

function createFloat(decDigit)
{
    let node = getActiveValueNode();
    if (!node) { error("No number to append decimal digits to."); return; }

    let current = node.operandA;
    let next = appendFloat(current, decDigit);
    node.operandA = next;

    mainString += decDigit.toString();
    update();
}

// evaluating operation precedence
// 0 = value
// 1 = + || -
// 2 = * || /
function isPrecedent(op)
{
    if (op === "+" || op === "-")
    {
        return 1;
    }
    if (op === "*" || op === "/")
    {
        return 2;
    }
    return 0;
}
function getActiveValueNode()
{
    if (!root) {return null;}

    // the node is a VALUE, can be edited right away
    if (lastNode.nodeType === nodeTypes.VALUE)
    {
        return lastNode;
    }

    // lastNode is an untransformed ROOT, append its operandA digits
    if (lastNode.nodeType === nodeTypes.ROOT && lastNode.operator === undefined)
    {
        return root.operandA;
    }

    // if the operandB exists, return it, else this can't be made into a float
    if (lastNode.nodeType === nodeTypes.OPERATION)
    {
        return lastNode.operandB || null;
    }
    return null;
}
// ---