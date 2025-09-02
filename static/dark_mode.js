// Initializes dark mode toggle
const toggle = document.getElementById("dark-switch");

// Initializes app in dark-mode
if(toggle.checked) {
  document.body.classList.add('dark-mode');
} // if

// Sets change behavior
toggle.addEventListener("change", () => {
  document.body.classList.toggle('dark-mode', toggle.checked);
}); // add event listener