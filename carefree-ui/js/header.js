import * as urls from './urls.js';

let header = document.getElementById('website-title');

// Header will disappear when scrolled past, then fade in when half of its originally visible area is present again
window.addEventListener('scroll', e => {
  if(window.scrollY > header.offsetHeight)
    header.style.opacity = 0;
  else if(window.scrollY < (header.offsetHeight/2))
      header.style.opacity = 1;
});

header.addEventListener('click', e => {
  window.open(urls.recipeMenuUrl, '_self');
});