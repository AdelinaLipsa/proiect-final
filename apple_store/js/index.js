function loader() {
  document.querySelector(".loader").innerHTML = "<img src='https://cdn.dribbble.com/users/189524/screenshots/2822794/silhouette-solo-loader-dribbble_v2.gif' class='loaderImg'>";
}

loader();
initializeCart();
// syncCart();
itemCounter();


function initializeCart() {
    if (localStorage.getItem('cart')){
        cart = JSON.parse(localStorage.getItem('cart'));
    }else
        cart = {};
}


$(document).ready(function(){
$('.bxslider').bxSlider({
  auto: true,
  autoControls: true,
  stopAutoOnClick: true,
  pager: true,
});
});

var video = document.getElementById("myVideo");

// Get the button
var btn = document.getElementById("myBtn");

// Pause and play the video, and change the button text
function videoPlay() {
  if (video.paused) {
    video.play();
    btn.innerHTML = "Pause";
  } else {
    video.pause();
    btn.innerHTML = "Play";
  }
}

document.querySelector("#mySecondBtn").addEventListener("click", function(){
  let w_height = window.innerHeight;
  window.scrollBy(0, w_height);
});

function itemCounter(){
  var counter = 0;
  if(Object.keys(cart).length >0){
      for(let key in cart){
          counter += cart[key].quantity;
      }
      document.querySelector("#itemCounter").innerHTML= counter;
  }
}


function initializeCart() {
  if (localStorage.getItem('cart'))
      cart = JSON.parse(localStorage.getItem('cart'));
  else
      cart = {};
}


  document.querySelector(".loader").innerHTML = "";
  document.querySelector(".loader").style.display = "none";
  document.querySelector("#boxSlider").addEventListener("click",()=>{
    window.open("phones.html", "_self")
  });
document.querySelector("#thirdBtn").addEventListener("click", ()=> {
  window.open("phones.html", "_self")
});



// function syncCart() {
//   for (let key in database) {
//       if (cart[key]) {
//           cart[key] = {
//               ...cart[key],
//               ...database[key]
//           }
//       }
//   }
//   localStorage.setItem("cart",JSON.stringify(cart));
// }

