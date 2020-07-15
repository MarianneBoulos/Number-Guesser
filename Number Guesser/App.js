 /*
 GAME FUNCTION:
 -Player must guess a number between a min and a max
 -Player gets a certain amount of guesses
 -Notify player of guesses remaining
 -Notify player of correct answer if he looses
 -Let player choose to play again
 */

//  Game Values
let min=1,
    max=10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign to UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again Event listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});

// Listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);

    // Validate Input
    if( isNaN(guess) || guess < min || guess > max ){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }
    // Check if won
    if( guess === winningNum){
        // Game over -Won
        // // Disable Input
        // guessInput.disabled = true;
        // // Change border color
        // guessInput.style.borderColor = 'green';
        // // Set Message
        // setMessage(`${winningNum} is correct, YOU WIN!`, 'green');
        gameOver(true, `${winningNum} is correct, YOU WIN!`);

    } else{
        // Wrong Number
         guessesLeft -=1; 
        //  teh above is same as guessesLeft = guessesLeft - 1
        if( guessesLeft === 0){
            // Game over- Lost 
            // // Disable Input
            //  guessInput.disabled = true;
            // // Change border color
            //  guessInput.style.borderColor = 'red';
            // // Set Message
            //  setMessage(`Game Over, you Lost. The correct number was ${winningNum}.`, 'red');
            gameOver(false, `Game Over, you Lost. The correct number was ${winningNum}.`)

        } else{
            // Game continues - answer wrong

            // Change border color
            guessInput.style.borderColor = 'red';

            // Clear the input
            guessInput.value = '';

            // Tell user it's the wrong number
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
        }

    }
});

// Game Over 
function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red' ;
    // Disable Input
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = color;
    // Set Text Color
    message.style.color = color;
    // Set Message
    setMessage(msg);


    // Play Again?
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';

}

// Get winning number
function getRandomNum(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

// Set message 
function setMessage(msg , color){
    message.style.color = color;
    message.textContent = msg;
}