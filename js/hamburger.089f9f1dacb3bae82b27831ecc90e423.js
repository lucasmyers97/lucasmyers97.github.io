const openSidebar = [
    { transform: 'translate(0)' },
    { transform: 'translate(-280px)' }
];

const sidebarTiming = {
  duration: 150,
  iterations: 1,
};

function clickHamburger() {

    const sidebar_element = document.getElementById('sidebar');
    sidebar_element.animate(openSidebar, sidebarTiming).finished.then(() => {
        sidebar_element.setAttribute('class', 'sidebar-open');
    });
}
