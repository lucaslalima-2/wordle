// Variables
let current_row = 0;
let current_tile = 0;

function handleKeydown(event) {
  const key = event.key;
  const row = document.getElementById(`row-${current_row}`);
  const tile = row.children[current_tile];

  // Only allow letters A-Z
  if (/^[a-zA-Z]$/.test(key) && current_tile < 5) {
    tile.textContent = key.toUpperCase();
    tile.classList.add("occupied");
    current_tile++;
  }; // if

  // Handle backspace
  if (key === 'Backspace' && current_tile > 0) {
    current_tile--; // go back one
    const tile = row.children[current_tile];
    tile.classList.remove("occupied");
    tile.textContent = '';
  } // if

  // Enter key behavior if word is too short
  if (key === "Enter" && current_tile < 5) {
    show_popup("Too few letters");
  } // if

  // Enter key behavior
  if (key === 'Enter' && current_tile === 5) {
    // Builds word to submit
    const row = document.getElementById(`row-${current_row}`);
    let guess = '';
    for(let i=0; i<5; i++){
      guess += row.children[i].textContent;
    }; // for
 
    // Send word to backend /submit
    fetch("/submit", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({guess: guess})
    }).then(response => response.json())
    .then(data => {
      if(data["status"] == "success") {
        // Uses data["colors"] to set colors of different tiles
        setTileColors(data["colors"], row);

        // Checks win or loss
        if (data["colors"].filter(item => item ==="green").length==5) {
          // Win
          show_popup("You won! \n Refresh to start a new game!", endgame=true);
          end_game();
        } else if (current_row==4) {
          // Lose
          show_popup("You lose.\nRefresh page to start new game!", endgame=true);
          end_game();
        } else {
          // Midgame, update pointer
          current_row++;
          current_tile = 0;
        } //if-elif-else
      } else {
        // Invalid entry: too short, reused word, unapproved dictionary word
        show_popup(data["msg"]);
      }; // if-else
    }); // then
  } // if
}; // add event listener

document.addEventListener('keydown', handleKeydown); 