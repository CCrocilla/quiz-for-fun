//  Variables Hamburger Menu
let mobileMenu = document.getElementById('menu-mobile');
let iconMobile = document.getElementById('icon-mobile-animation');

// ----------- Hamburger Menu ----------- //
// Content Studied on W3School and created custom code for my needs.
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

mobileMenu.addEventListener('click', openNavBar);
// -----------  End Hamburger Menu ----------- //