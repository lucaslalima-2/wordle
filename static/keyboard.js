const keys = document.querySelectorAll('.key');

keys.forEach(key => {
  key.addEventListener("click", () => {
    const simulatedEvent = { key: key.dataset.key };
    handleKeydown(simulatedEvent);
  });
});