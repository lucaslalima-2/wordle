// Initializes dark mode toggle
const toggle = document.getElementById("dark-switch");
const label = document.getElementById("dark-mode-label");

// Initializes app in dark-mode
if (toggle.checked) {
  document.body.classList.add('dark-mode');
  label.textContent = "Light Mode";
} // if

// Sets change behavior
toggle.addEventListener("change", () => {
  document.body.classList.toggle('dark-mode', toggle.checked);
  label.textContent = toggle.checked ? "Light Mode" : "Dark Mode";
}); // add event listener