function clickHamburger() {
    const sidebar_element = document.getElementById('sidebar');
    sidebar_element.setAttribute('class', 'sidebar-open');
    sidebar_element.focus();
    console.log("I clickedd on the hamburger");
    sidebar_element.addEventListener('blur', (event) => {
        sidebar_element.setAttribute('class', 'sidebar-closed');
        console.log("I did it");
    }, true);
}
