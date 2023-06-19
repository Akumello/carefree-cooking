let header = document.getElementById('website-title');

function test() {
  if(window.scrollY > header.offsetHeight) {
      header.style.opacity = 0;
  }
  else if(window.scrollY < (header.offsetHeight/2)) {
      header.style.opacity = 1;
  }
}