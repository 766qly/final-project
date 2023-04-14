const buttons = document.querySelectorAll('button');
const words = document.querySelectorAll('anime');

// add click event listeners to all buttons
buttons.forEach(button => {
  button.addEventListener('click', () => {
    // hide all words that don't have the corresponding class
    words.forEach(word => {
      if (word.classList.contains(button.id.toLowerCase())) {
        word.style.display = 'list-item';
      } else {
        word.style.display = 'none';
      }
    });
  });
});

const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', () => {
  // show all words by removing the classes that were added
  words.forEach(word => {
    word.style.display = 'list-item';
  });
});

$('.flip-card').click(function() {
    console.log('Card clicked!');
    $(this).toggleClass('flipped');
  });