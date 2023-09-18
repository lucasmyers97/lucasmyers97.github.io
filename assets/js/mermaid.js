import mermaid from 'https://unpkg.com/mermaid@10.4.0/dist/mermaid.esm.min.mjs';
mermaid.initialize({ startOnLoad: false });

var mermaid_markup = [];
export function getMermaidMarkup() {
    const mermaid_elements = document.getElementsByClassName("mermaid");
    for (let i = 0; i < mermaid_elements.length; ++i) {
        mermaid_elements[i].id = `mermaid[${i}]`;  
        mermaid_markup.push({id: mermaid_elements[i].id, 
            markup: mermaid_elements[i].textContent});
    }
}

export function setMermaidColorscheme(currentTheme) {
    for (let i = 0; i < mermaid_markup.length; ++i) {
        const mermaid_element = document.getElementById(mermaid_markup[i].id);
        const content = mermaid_markup[i].markup;
        const pattern = /(%%{ init: { 'theme': ').*(' } }%%)/;
        const replacement = "$1" + currentTheme + "$2";
        mermaid_element.textContent = content.replace(pattern, replacement);
        mermaid_element.removeAttribute("data-processed");
    }
    mermaid.run();
}

export function renderMermaid() {
    return mermaid.run();
}
