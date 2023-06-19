let header = document.getElementById('website-title');

let buttons = document.getElementsByTagName('Button');
for (const button of buttons) {
  console.log(button.style.offsetHeight);
  button.style.borderRadius = (button.style.offsetHeight/2);
}

function test() {
  if(window.scrollY > header.offsetHeight) {
      header.style.opacity = 0;
  }
  else if(window.scrollY < (header.offsetHeight/2)) {
      header.style.opacity = 1;
  }
}