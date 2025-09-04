function end_game() {
  // Remove key listener
  document.removeEventListener('keydown', handleKeydown);

  // Optional: visually disable board
  document.querySelectorAll(".tile").forEach(tile => {
    tile.classList.add("disabled"); // Add a CSS class to gray out or lock tiles
  });

  // Introduce new game button
  document.getElementById("new-game-container").classList.add("show");
} // function