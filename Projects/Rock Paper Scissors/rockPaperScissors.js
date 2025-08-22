let playerScore = 0;
let computerScore = 0;

for (let i = 0; i < 5; i++)
{
    play();
}
console.log("Final scores:" +
            "\nPlayer: " + playerScore +
            "\nComputer: " + computerScore);
if (playerScore > computerScore)
{
    console.log("Player won the game!! :-)");
}
else if (playerScore < computerScore)
{
    console.log("Computer won the game!! :-(");
}
else
{
    console.log("The entire game is a draw!! :-/");
}


function play()
{
    let computerChoice = getComputerChoice();
    let playerChoice = getPlayerChoice();

    console.log("Player chose: " + playerChoice);
    console.log("Computer chose: " + computerChoice);

    if (playerChoice === null)
    {
        console.log("Please enter a valid choice!")
        play();
        return;
    }
    else
    {
        playerChoice = playerChoice.toUpperCase();
        computerChoice = computerChoice.toUpperCase();

        if (computerChoice === playerChoice)
        {
            console.log("It's a draw!");
            return;
        }

        if (playerChoice === "ROCK")
        {
            if (computerChoice === "PAPER")
            {
                score(false);
                return;
            }
            score(true);
        }
        else if (playerChoice === "PAPER")
        {
            if (computerChoice === "SCISSORS")
            {
                score(false);
                return;
            }
            score(true);
        }
        else if (playerChoice === "SCISSORS")
        {
            if (computerChoice === "ROCK")
            {
                score(false);
                return;
            }
            score(true);
        }
    }
}

function score(lastWonPlayer)
{
    if (lastWonPlayer === true)
    {
        playerScore++;
        console.log("Player wins! :-)")
    }
    else
    {
        computerScore++;
        console.log("Computer wins! :-(")
    }

    console.log("Player's score: " + playerScore);
    console.log("Computer's score: " + computerScore);
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

function getPlayerChoice()
{
    let choice = prompt("Type 'rock' 'paper' or 'scissors' to enter your choice!", null);

    switch (choice)
    {
        case "rock":
            return "rock";
        case "paper":
            return "paper";
        case "scissors":
            return "scissors";
    }
    console.log("Invalid choice!")
    return null;
}