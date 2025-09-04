const keys = document.querySelectorAll('.key');

// Key initialization
keys.forEach(key => {
  // Set default color
  key.classList.add("gray");
  key.dataset.color = "gray";

  // Set click event
  key.addEventListener("click", () => {
    const simulatedEvent = { key: key.dataset.key };
    handleKeydown(simulatedEvent);
  });
});

// Function to update key colors
function setKeyboardColors(guess, colors){
  for (let i=0; i<guess.length; i++){
    const letter = guess[i].toUpperCase();
    const color = colors[i];
    const tkey = document.querySelector(`.key[data-key="${letter}"]`);
    const cur_color = tkey.dataset.color;
    const color_hier = {"gray":0, "dark-gray":1, "yellow":2, "green":3};

    if (color_hier[color] > color_hier[cur_color]) {
      tkey.classList.remove("gray", "dark-grey", "yellow", "green");
      tkey.classList.add(color);
      tkey.dataset.color = color;
    }// if
  } // for     
}// function