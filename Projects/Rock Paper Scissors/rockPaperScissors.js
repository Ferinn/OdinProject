let playerScore = 0;
let computerScore = 0;

let currentChoice = "";

attachListeners();
const playerScoreBlock = document.querySelector("#player");
const computerScoreBlock = document.querySelector("#computer");
const announcement = document.querySelector("#announcement");

function play()
{
    let computerChoice = getComputerChoice();

    console.log("Computer chose: " + computerChoice);

    if (playerChoice === null)
    {
        console.log("Please enter a valid choice!")
        play();
        return;
    }
    else
    {
        if (computerChoice === playerChoice)
        {
            score(-1);
            
            return;
        }

        if (playerChoice === "rock")
        {
            if (computerChoice === "paper")
            {
                score(0);
                return;
            }
            score(1);
        }
        else if (playerChoice === "paper")
        {
            if (computerChoice === "scissors")
            {
                score(0);
                return;
            }
            score(1);
        }
        else if (playerChoice === "scissors")
        {
            if (computerChoice === "rock")
            {
                score(0);
                return;
            }
            score(1);
        }
    }
}

function score(lastWinner)
{
    if (lastWinner === 1)
    {
        playerScore++;
        console.log("Player wins! :-)")

        setWinner(playerScoreBlock);
        setLoser(computerScoreBlock);

        announcement.textContent = "Round won by player!";
    }
    else if (lastWinner === 0)
    {
        computerScore++;
        console.log("Computer wins! :-(")
        setWinner(computerScoreBlock);
        setLoser(playerScoreBlock);

        announcement.textContent = "Round won by computer!";
    }
    else if (lastWinner === -1)
    {
        console.log("It's a draw!");
        setTied(playerScoreBlock);
        setTied(computerScoreBlock);

        announcement.textContent = "Round is a tie!";
    }

    console.log("Player's score: " + playerScore);
    playerScoreBlock.textContent = "Player Score: " + playerScore;
    console.log("Computer's score: " + computerScore);
    computerScoreBlock.textContent = "Computer Score: " + computerScore;

    if (playerScore === 5 || computerScore === 5)
    {
        gameEnd(lastWinner);
    }
}

function gameEnd(winner)
{
    let winnerString = winner === 1 ? "player" : "computer";
    announcement.textContent = "Congratulations to " + winnerString + " for winning the game!";
}

function getComputerChoice()
{
    let pseudoRandom = Math.floor(Math.random() * 3);

    switch (true)
    {
        case pseudoRandom === 0:
            return "rock";
        case pseudoRandom === 1:
            return "paper";
        case pseudoRandom === 2:
            return "scissors";
    }
}

function setPlayerChoiceRock()
{
    console.log("Player chose rock");
    playerChoice = "rock";
    play();
}

function setPlayerChoicePaper()
{
    console.log("Player chose paper");
    playerChoice = "paper";
    play();
}

function setPlayerChoiceScissors()
{
    console.log("Player chose scissors");
    playerChoice = "scissors";
    play();
}

function attachListeners()
{
    let btns = document.querySelectorAll("button")
    for (let i = 0; i < btns.length; i++)
    {
        let id = btns[i].id.toString();
        switch (id)
        {
            case "rock":
                btns[i].addEventListener("click", setPlayerChoiceRock);
                break;
            case "paper":
                btns[i].addEventListener("click", setPlayerChoicePaper);
                break;
            case "scissors":
                btns[i].addEventListener("click", setPlayerChoiceScissors);
                break;
        }
    }
}

function setWinner(scoreBlock)
{
    if (!scoreBlock.classList.contains("winner"))
    {
        scoreBlock.classList.remove("loser");
        scoreBlock.classList.remove("tied");
        scoreBlock.classList.add("winner");
    }
}

function setLoser(scoreBlock)
{
    if (!scoreBlock.classList.contains("loser"))
    {
        scoreBlock.classList.add("loser");
        scoreBlock.classList.remove("tied");
        scoreBlock.classList.remove("winner");
    }
}

function setTied(scoreBlock)
{
    if (!scoreBlock.classList.contains("tied"))
    {
        scoreBlock.classList.remove("loser");
        scoreBlock.classList.add("tied");
        scoreBlock.classList.remove("winner");
    }
}