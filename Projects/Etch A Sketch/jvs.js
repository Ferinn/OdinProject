const gridRoot = document.querySelector("#grid-root");
const newGridBtn = document.querySelector("#new-grid-btn");
newGridBtn.addEventListener("click", newGrid);

function newGrid()
{
    do
    {
        gridSize = prompt("Enter the number of rows for the new grid. Maximum is 100.", 16);
        console.log("User selected gridSize: " + gridSize);
    }   while (gridSize > 100);

    while (gridRoot.firstChild)
    {
        gridRoot.removeChild(gridRoot.lastChild);
    }

    for (let i = 0; i < gridSize; i++)
    {
        addRow(gridRoot, gridSize);
    }
}

function addRow(parent, ofColumns)
{
    let newRow = document.createElement("div");
    newRow.classList.add("horizontal-container");
    
    parent.appendChild(newRow);
    addRowItems(newRow, ofColumns);
}

function addRowItems(rowElement, count)
{
    for (let i = 0; i < count; i++)
    {
        let newItem = document.createElement("div");
        newItem.classList.add("gridBox");
        newItem.style.opacity = 0.0;

        addHoverListener(newItem);
        rowElement.appendChild(newItem);
    }
}

function addHoverListener(element)
{
    element.addEventListener("mouseover", () => hoverHandler(element))
}

function hoverHandler(element)
{
    setRandomRGB(element);
}

function setRandomRGB(element)
{
    let R = getRandom(255);
    let G = getRandom(255);
    let B = getRandom(255);
    let A = parseFloat(element.style.opacity) >= 1.0 ? 1.0 : parseFloat(element.style.opacity) + 0.1;

    element.style.backgroundColor = "rgb(" + R + ", " + G + ", " + B + ")";
    element.style.opacity = A;
    console.log("rgb(" + R + ", " + G + ", " + B + ", " + A + ")");
}

function getRandom(max)
{
    return Math.floor(Math.random() * max);
}