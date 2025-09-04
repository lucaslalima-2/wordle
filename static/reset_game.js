function reset_game() {
  // Reset row and tile pointers
  current_row = 0;
  current_tile = 0;

  // Clear all tiles
  for (let r = 0; r < 6; r++) {
    const row = document.getElementById(`row-${r}`);
    if (!row) continue;
    for (let t = 0; t < row.children.length; t++) {
      const tile = row.children[t];
      tile.textContent = '';
      tile.classList.remove("occupied", "green", "yellow", "gray");
    }
  } // for

  // Reset keyboard colors
  document.querySelectorAll(".key").forEach(key => {
    key.classList.remove("green", "yellow", "gray", "dark-gray");
    key.classList.add("gray");
    key.dataset.color = "gray";
  });

  // Re-enable keyboard and input
  document.querySelectorAll(".key").forEach(key => {
    key.classList.remove("disable");
  });
  document.addEventListener("keydown", handle_keydown);

  // Clear popup
  popup_message.textContent = '';
  popup_container.classList.remove("animate");
  popup_container.classList.remove("animate_final");

  // Clear new-game button
  new_game_container.classList.remove("animate");

  // Re-enable tiles
  document.querySelectorAll(".tile").forEach(tile => {
    tile.classList.remove("disabled"); // Add a CSS class to gray out or lock tiles
  });

  // Fetch new word from backend
  fetch("/reset_game", {
    method: "GET",
    headers: {"Content-Type": "application/json"}
  })
  .then(response => {
    if (!response.ok) throw new Error("Failed to start new game");
    return response.json();
  })
  .then(data => {
    console.log("New game initialized:", data);
    // Optionally store wordle if needed
  })
  .catch(error => {
    console.error("Error initializing new game:", error);
    show_popup("Failed to start new game.");
  });
} // function