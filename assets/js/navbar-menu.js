
//  Variables Hamburger Menu
let mobileMenu = document.getElementById('menu-mobile');
let iconMobile = document.getElementById('icon-mobile-animation');

// ----------- Hamburger Menu ----------- //
mobileMenu.addEventListener('click', openNavBar);

function openNavBar() {
    let desktopMenu = document.getElementById('menu');
    if (desktopMenu.classList.contains("hide-mobile")) {
        desktopMenu.classList.remove("hide-mobile");
        iconMobile.classList.add("icon-mobile-rotate");
    } else {
        desktopMenu.classList.add("hide-mobile");
        iconMobile.classList.remove("icon-mobile-rotate");
    }
}
// -----------  End Hamburger Menu ----------- //