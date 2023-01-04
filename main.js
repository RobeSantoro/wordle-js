import './style.css'

const app = document.getElementById('app');
let possibleWords = [];

// Fetch data from the wordle api
const fetchData = async () => {
  const response = await fetch('https://raw.githubusercontent.com/tabatkins/wordle-list/main/words')
  const data = await response.text();
  const words = data.split('\n');
  words.forEach(word => possibleWords.push(word));
}

fetchData().then(() => {
  // Generate a random word
  const randomWord = possibleWords[Math.floor(Math.random() * possibleWords.length)];
  const solution = randomWord; console.log(solution);


  let solutionDiv = app.appendChild(document.createElement('div'));
  solutionDiv.classList.add('word');
  solutionDiv.style.display = 'none';

  // foreach letter in the word create a div with the letter as text
  randomWord.split('').forEach(letter => {
    const letterDiv = document.createElement('div');
    letterDiv.innerText = letter;
    letterDiv.classList.add('letter');
    letterDiv.style.marginTop = '10px';    
    solutionDiv.appendChild(letterDiv);
  });

  // Get alll the 6 divs with the class word
  let words = document.querySelectorAll('.word');

  // Initialize empty array for current guess
  let guesses = []

  // Initialize counters to keep track of the number of letters in the currebt guess array  
  let letterIndex = 0;

  // Initialize counter to keep track of the number of tries done
  let guessIndex = 0;

  document.addEventListener('keydown', (e) => {

    let letter = e.key

    // Push the letter to the current guess array

    if (guesses.length < 5 && letter.match(/^[a-zA-Z]$/)) {

      guesses.push(letter);
      words[guessIndex].children[letterIndex].innerText = letter;

      // Increment the letter index
      letterIndex++;
    }

    // If the Backspace key is pressed pop the last letter from the current guess array
    if (letter === 'Backspace' && guesses.length > 0) {

      guesses.pop();
      letterIndex--;

      // Notice that the letter index is decremented before the letter is removed from the dom
      words[guessIndex].children[letterIndex].innerText = ''      
      
    }

    if (letter === 'Enter' && guesses.length === 5) {

      // YOU WIN 
      if (solution === guesses.join('')) {        

        /* words[guessIndex].children.forEach(el => {
          el.classList.add('correct');
        }); */

        for (let i = 0; i < words[guessIndex].children.length; i++) {
          const element = words[guessIndex].children[i];
          element.classList.add('correct');          
        }
        
        /* solutionDiv.style.display = 'flex'; */
        alert('You win!');

      } else {

        let solutionLetters =solution.split('');      

        // Cycle through the guess and solution letters
        for (let i = 0; i < solutionLetters.length; i++) {

          // The letters are correct and in the correct position
          if (guesses[i] === solutionLetters[i]) {

            words[guessIndex].children[i].classList.add('correct');

          }

          // The letters are correct but in the wrong position
          else if (solution.includes(guesses[i])) {

            words[guessIndex].children[i].classList.add('close');

          }

          // The letters are not present in the solution word
          else {

            words[guessIndex].children[i].classList.add('wrong');

          }
        }

        if (guessIndex === 4) {

          solutionDiv.style.display = 'flex';
          alert('You lose!');

        } else {

        guessIndex++;
        guesses = [];
        letterIndex = 0;

        }
      }


    }

  




  })

})





