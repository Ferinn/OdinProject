const buttons = document.querySelectorAll(".project-card");

let projectToIndexPairs =
{
    "HTML-Recipes" : "Projects/Excercises/HTML-Excercises/index.html",
    "CSS-Excercises" : "Projects/Excercises/CSS-Excercises/crossroads.html",
    "Landing-Page" : "Projects/Landing Page/index.html",
    "Rock-Paper-Scissors" : "Projects/Rock Paper Scissors/index.html",
    "Etch-A-Sketch" : "Projects/Etch A Sketch/index.html"
}

for (let i = 0; i < buttons.length; i++)
{
    buttons[i].addEventListener("click", () => redirect(buttons[i]));
}

function redirect(button)
{
    let projectName = button.textContent;
    console.log("Clicked on " + projectName);
    let redirectURL = projectToIndexPairs[projectName];
    console.log(redirectURL);
    window.location.href = redirectURL;
}