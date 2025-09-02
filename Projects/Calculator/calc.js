const btnIds =
{
    "plus" : "+",
    "minus" : "-",
    "multiply" : "*",
    "divide" : "/"
}
const formulaBox = document.querySelector("#formula-box");

let mainString = "";

attachListenersToBtns();

function attachListenersToBtns()
{
    let _buttons = document.querySelectorAll("button");
    for (let i = 0; i < _buttons.length; i++)
    {
        let id = _buttons[i].id;
        _buttons[i].addEventListener("click", () => addOperator(btnIds[id]));
    }
}

function addOperator(type)
{
    mainString += type;
    
}

function update()
{

}