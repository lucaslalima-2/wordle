// Variables
let current_row = 0;
let current_tile = 0;

document.addEventListener('keydown', (event) => {
  const key = event.key;
  const row = document.getElementById(`row-${current_row}`);
  const tile = row.children[current_tile];

  // Only allow letters A-Z
  if (/^[a-zA-Z]$/.test(key) && current_tile < 5) {
    // console.log("Placing in: ", current_row, current_tile); // debug
    tile.textContent = key.toUpperCase();
    tile.classList.add("occupied");
    current_tile++;
  }; // if

  // Handle backspace
  if (key === 'Backspace' && current_tile > 0) {
    current_tile--; // go back one
    // console.log("Deleting: ", current_row, current_tile); // debug
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
        // Updates pointer
        current_row++;
        current_tile = 0;
      } else {
        show_popup(data["msg"]);
      }; // if-else
    }); // then
  } // if
}); // add event listener