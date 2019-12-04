// TYPING EFFECT SCRIPT ------------------------------->
document.addEventListener('DOMContentLoaded', function (event) {
  // array with texts to type in typewriter
  var dataText = ["Hello there! My name is Adelina.", "Thank you for visiting my page.", "I am a Front End Developer."]; // type one text in the typwriter
  // keeps calling itself until the text is finished

  function typeWriter(text, i, fnCallback) {
    // chekc if text isn't finished yet
    if (i < text.length) {
      // add next character to h1
      document.querySelector("h1").innerHTML = text.substring(0, i + 1) + '<span class="dash" aria-hidden="true"></span>'; // wait for a while and call this function again for next character

      setTimeout(function () {
        typeWriter(text, i + 1, fnCallback);
      }, 100);
    } // text finished, call callback if there is a callback function
    else if (typeof fnCallback == 'function') {
        // call callback after timeout
        setTimeout(fnCallback, 700);
      }
  } // start a typewriter animation for a text in the dataText array


  function StartTextAnimation(i) {
	setTimeout(function(){
    if (typeof dataText[i] == 'undefined') {
      setTimeout(function () {
        StartTextAnimation(0);
      }, 20000);
    } // check if dataText[i] exists


    if (i < dataText[i].length) {
      // text exists! start typewriter animation
      typeWriter(dataText[i], 0, function () {
        // after callback (and whole text has been animated), start next text
        StartTextAnimation(i + 1);
      });
    }
  },2000); // start the text animation
  }

  StartTextAnimation(0);
});
//<--------------------------------------
// below listed default settings
AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
  

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

}); 

// data-aos-offset="200"
// data-aos-delay="50"
// data-aos-duration="1000"
// data-aos-easing="ease-in-out"
// data-aos-mirror="true"
// data-aos-once="false"
// data-aos-anchor-placement="top-center"

