var nav = document.querySelector('nav');

window.addEventListener('scroll', function() {
    if(this.window.pageYOffset > 100) {
        nav.classList.add('bg-black', 'shadow');
    } else {
        nav.classList.remove('bg-black', 'shadow');
    }
  });



const btn1 = document.querySelector("btns1");
const post1 = document.querySelector(".post1");
const widget1 = document.querySelector(".star-widget1");
const editBtn1 = document.querySelector(".edit1");
btn1.onclick = ()=>{
  widget1.style.display = "none";
  post1.style.display = "block";
  editBtn1.onclick = ()=>{
    widget1.style.display = "block";
    post1.style.display = "none";
  }
  return false;
}