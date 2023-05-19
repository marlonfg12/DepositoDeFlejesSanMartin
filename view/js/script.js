const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
  dropdown.addEventListener('click', () => {
    dropdowns.forEach(otherDropdown => {
      if (otherDropdown !== dropdown) {
        otherDropdown.classList.remove('active');
      }
    });
    dropdown.classList.toggle('active');
  });
});


const menuIcon = document.querySelector('.menu-icon');
const menuItems = document.querySelector('.menu');

function toggleMenu() {
  menuIcon.classList.toggle('open');
  menuItems.classList.toggle('open');
}

menuIcon.addEventListener('click', toggleMenu);

