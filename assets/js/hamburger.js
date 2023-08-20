function clickHamburger() {

    const sidebar_element = document.getElementById('sidebar');
    sidebar_element.setAttribute('class', 'sidebar-open');
    sidebar_element.focus();

    sidebar_element.addEventListener('blur', (event) => {
        if (event.relatedTarget) {
            if (sidebar_element.contains(event.relatedTarget)) {
                return;
            }
        }
        sidebar_element.dataset.timeout = setTimeout(() => {
            sidebar_element.setAttribute('class', 'sidebar-closed');
        }, 0)
    });

    sidebar_element.addEventListener('focus', (event) => {
        clearTimeout(sidebar_element.dataset.timeout);
    });
}
