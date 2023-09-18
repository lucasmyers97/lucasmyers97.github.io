{{ $mermaid := "js/mermaid.js" }}
{{ $mermaid_import := resources.Get $mermaid | resources.ExecuteAsTemplate $mermaid . | resources.Fingerprint "md5" | resources.Minify }}
import { getMermaidMarkup, renderMermaid, setMermaidColorscheme } from "{{$mermaid_import.Permalink}}"

const userPref = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
const currentTheme = localStorage.getItem('theme') ?? userPref
const syntaxTheme = document.querySelector("#theme-link");


{{ $darkSyntax := resources.Get "styles/_dark_syntax.scss" | resources.ToCSS (dict "outputStyle" "compressed") | resources.Fingerprint "md5" | resources.Minify  }}
{{ $lightSyntax := resources.Get "styles/_light_syntax.scss" | resources.ToCSS (dict "outputStyle" "compressed") | resources.Fingerprint "md5" | resources.Minify  }}

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

window.addEventListener('DOMContentLoaded', () => {
  // Darkmode toggle
  const toggleSwitch = document.querySelector('#darkmode-toggle')

  // listen for toggle
  toggleSwitch.addEventListener('change', switchTheme, false)

  if (currentTheme === 'dark') {
    toggleSwitch.checked = true
  }
})
