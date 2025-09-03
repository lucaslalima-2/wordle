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

  // Enter key behavior
  if (key === 'Enter' && current_tile === 5) {
    // Builds word to submit
    const row = document.getElementById(`row-${current_row}`);
    let word = '';
    for(let i=0; i<5; i++){
      word += row.children[i].textContent;
    }; // for

    console.log("word: ", word)
 
    // Send word to backend /submit
    fetch("/submit", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({word: word})
    }).then(response => response.json())
    .then(data => {
      console.log(data)
      if(data["status"] == "success") {
        current_row++;
        current_tile = 0;
      } else {
        console.log("Failed submission")
      }; // if-else
    }); // then
  } // if
}); // add event listener