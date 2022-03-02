
//  Variables Hamburger Menu
let mobileMenu = document.getElementById('menu-mobile');

// ----------- Hamburger Menu ----------- //
mobileMenu.addEventListener('click', openNavBar);

function openNavBar() {
    let desktopMenu = document.getElementById('menu');
    if (desktopMenu.classList.contains("hide-mobile")) {
        desktopMenu.classList.remove("hide-mobile");
    } else {
        desktopMenu.classList.add("hide-mobile");
    }
}
// -----------  End Hamburger Menu ----------- //