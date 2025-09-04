const newGameBtn = document.getElementById("new-game-button");
newGameBtn.addEventListener("click", start_new_game);

function start_new_game() {
  fetch("/new_game", {
    method: "GET",
    headers: {"Content-Type": "application/json"}
  })
  .then(response => {
    if (!response.ok) throw new Error("Server error");
    return response.json();
  })
  .then(data => {
    console.log("New game initialized:", data);
    location.reload(); // Now it reloads *after* the server responds
  })
  .catch(error => {
    console.error("Error starting new game:", error);
    show_popup("Failed to start new game. Try again.");
  });
} ; // function