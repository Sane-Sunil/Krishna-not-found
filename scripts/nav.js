document.addEventListener('DOMContentLoaded', () => {
  const dropdown = document.querySelector('.dropdown');
  const checkbox = dropdown.querySelector('#toggle-status');

  document.addEventListener('click', (event) => {
    // If click is outside the dropdown, uncheck the checkbox
    if (!dropdown.contains(event.target)) {
      checkbox.checked = false;
    }
  });
});
