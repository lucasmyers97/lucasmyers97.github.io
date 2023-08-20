const closeSidebar = [
    { transform: 'translate(0)' },
    { transform: 'translate(280px)' }
];

const closeSidebarTiming = {
  duration: 150,
  iterations: 1,
};

function clickXButton() {

    const sidebar_element = document.getElementById('sidebar');
    sidebar_element.animate(closeSidebar, closeSidebarTiming).finished.then(() => {
        sidebar_element.setAttribute('class', 'sidebar-closed');
    });
}
