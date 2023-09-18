---
title: "Website"
date: 2023-09-18T15:34-05:00
enableToc: true
draft: false
---

## Darkmode responsive Mermaid diagrams

[Mermaid](https://mermaid.js.org/) is a utility for generating diagrams based on plain-text, typically through Markdown.
It is supported by GitHub natively, and can create class diagrams, sequence diagrams, Gitgraphs, and more.
I wanted to use the Gitgraph functionality to take better notes on how git works, but I noticed that some of the styles were unreadable depending on whether the website was in light or dark mode. 
It took a lot of doing to make it dynamically switch depending on the colorscheme, so I'm taking notes here.

### Manually rendering Mermaid

For Quartz v3, Mermaid diagrams are initialized in `layouts/partials/mermaid.html`.
The code is:
```javascript
import mermaid from 'https://unpkg.com/mermaid@9/dist/mermaid.esm.min.mjs';
mermaid.initialize({ startOnLoad: true });
```
First I changed to the latest version, 10.4 (it has a nicer API), and then I disabled rendering on load.
This makes it so that where a graph would be rendered, the page just renders the text specifying the graph:
```javascript
import mermaid from 'https://unpkg.com/mermaid@10.4.0/dist/mermaid.esm.min.mjs';
mermaid.initialize({ startOnLoad: false });
```
Then, to actually render, one may just run `mermaid.run()`. 
I wrote a wrapper function so that it could be used in other scripts:
```javascript
export function renderMermaid() {
    return mermaid.run();
}
```
It returns the output which is a `Promise`. 
Running this on start will render the graphs.

### Changing the colorscheme automatically

To set a colorscheme, you need to include a directive.
This is done within the text specifying the graph as:
```
%%{ init: { 'theme': 'dark' } }%%
```
Since I want this to appear in every Mermaid block specified in my Markdown files, I go to `layouts/_default/_markup/render-codeblock-mermaid.html` so that the `div` which replaces a Mermaid codeblock turns into:
```html
<div class="mermaid">
  %%{ init: { 'theme': 'dark' } }%%
  {{- .Inner | safeHTML }}
</div>
```
Now, Mermaid will replace the text in this `div` with an `svg` which is the actually rendered graph.
Hence, we need to save this text somewhere.
For this, I create a new script in `assets/js/mermaid.js` which will hold all the Mermaid code, and then write the following function to gather all the pre-rendered text for later use, and assign the relevant `div`s an ID:
```javascript
// mermaid.js

var mermaid_markup = [];
export function getMermaidMarkup() {
    const mermaid_elements = document.getElementsByClassName("mermaid");
    for (let i = 0; i < mermaid_elements.length; ++i) {
        mermaid_elements[i].id = `mermaid[${i}]`;  
        mermaid_markup.push({id: mermaid_elements[i].id, 
            markup: mermaid_elements[i].textContent});
    }
}
```
Additionally, I want to put all of my Mermaid functionality in this file, so I take it out of `mermaid.html` and paste it here:
```javascript
// mermaid.js

import mermaid from 'https://unpkg.com/mermaid@10.4.0/dist/mermaid.esm.min.mjs';
mermaid.initialize({ startOnLoad: false });

// ...getMermaidMarkup

export function renderMermaid() {
    return mermaid.run();
}
```
Additionally, I change `mermaid.html` to:
```html
<!-- mermaid.html -->

{{if $.Site.Data.config.enableMermaid}}
  {{ if .Page.Store.Get "hasMermaid" }}
    {{$scriptname := "js/mermaid.js"}}
    {{ $s := resources.Get $scriptname | resources.ExecuteAsTemplate $scriptname . | resources.Fingerprint "md5" | resources.Minify }}
    <script src="{{$s.Permalink}}" type="module"></script>
  {{ end }}
{{ end }}
```
so that it just includes the source from `mermaid.js`.
Finally, I write a function which takes a colorscheme name, sets the colorschemes of all of the Mermaid diagrams, and then re-renders:
```javascript
// mermaid.js

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
```
Now we just need to tie this to the darkmode switcher. 
In Quartz v3 this lives in `assets/js/darkmode.js`.
To import the `mermaid.js` functionality, I actually need to make sure that I import `darkmode.js` into the head as a module script.
For this I make a modification to `layouts/partials/head.html`:
```html
{{$scriptname := "js/darkmode.js"}}
{{ $s := resources.Get $scriptname | resources.ExecuteAsTemplate $scriptname . | resources.Fingerprint "md5" | resources.Minify }}
<script src="{{$s.Permalink}}" type="module"></script>

{{$scripts := (slice "js/util.js")}}
{{range $scripts}}
{{$scriptname := .}}
{{ $s := resources.Get $scriptname | resources.ExecuteAsTemplate $scriptname . | resources.Fingerprint "md5" | resources.Minify }}
<script src="{{$s.Permalink}}"></script>
{{end}}
```
(Previously `darkmode.js` was being imported in a regular source block).
Finally, we can import the `mermaid.js` functionality into `darkmode.js` as follows:
```javascript
// darkmode.js

{{ $mermaid := "js/mermaid.js" }}
{{ $mermaid_import := resources.Get $mermaid | resources.ExecuteAsTemplate $mermaid . | resources.Fingerprint "md5" | resources.Minify }}
import { getMermaidMarkup, renderMermaid, setMermaidColorscheme } from "{{$mermaid_import.Permalink}}"
```
We need to do it this way because Hugo minifies and puts the files in some weird places.
At long last, we may call our Mermaid functions in order to tie it to darkmode switching:
```javascript
// darkmode.js

// code here...

if (currentTheme) {
  document.documentElement.setAttribute('saved-theme', currentTheme);
  syntaxTheme.href = currentTheme === 'dark' ?  '{{ $darkSyntax.Permalink }}' :  '{{ $lightSyntax.Permalink }}';
  getMermaidMarkup();
  const rendered = renderMermaid();
  rendered.then(() => { 
      let mermaid_colorscheme;
      if (currentTheme === 'light') {
          mermaid_colorscheme = 'forest';
      } else {
          mermaid_colorscheme = 'dark';
      }
      setMermaidColorscheme(mermaid_colorscheme);
  });
}

const switchTheme = (e) => {
  if (e.target.checked) {
    document.documentElement.setAttribute('saved-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    syntaxTheme.href = '{{ $darkSyntax.Permalink }}';
    setMermaidColorscheme('dark');
  }
  else {
    document.documentElement.setAttribute('saved-theme', 'light')
    localStorage.setItem('theme', 'light')
    syntaxTheme.href = '{{ $lightSyntax.Permalink }}';
    setMermaidColorscheme('forest');
  }
}

// more code here...
```
With this, our Mermaid diagrams change color on lightmode/darkmode switch.
For lightmode it seems that `forest` is the most scrutable, and for darkmode `dark` is.
It should be clear from the code how to change those to different schemes, in case one is more appealing.
