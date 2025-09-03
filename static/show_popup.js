// Variables
const popup_container = document.getElementById("popup-container");
const popup_message = document.getElementById("popup-message")

// Flashes pop up with input message
function show_popup(msg, endgame=false) {
  // Show
  popup_message.textContent = msg;

  // Reset animation if already applied
  popup_container.classList.remove("animate");
  void popup_container.offsetWidth;

  // Show and animate
  if(!endgame) { popup_container.classList.add("animate");}
  else { popup_container.classList.add("animate_final");}

  // Removes animation class
  popup_container.addEventListener("animationend", () =>{
    popup_container.classList.remove("animate");
  });
} // function