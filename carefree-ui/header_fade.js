let header = document.getElementById('website-title');

document.body.addEventListener('scroll', e => {
  if(window.scrollY > header.offsetHeight) {
    header.style.opacity = 0;
  }
  else if(window.scrollY < (header.offsetHeight/2)) {
      header.style.opacity = 1;
  }
});