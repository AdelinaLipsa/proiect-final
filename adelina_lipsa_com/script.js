document.addEventListener("DOMContentLoaded", function() {
  new fullpage("#fullpage", {
    //options here
    licenseKey: "OPEN-SOURCE-GPLv3-LICENSE",
    autoScrolling: true,
    lazyLoading: true,
    scrollBar: false,
    navigation: true,
    navigationPosition: "left",
    lockAnchors: false,
    verticalCentered: false
  });

  //loader
  const loading = document.querySelector("#loading");
  const fadeEffect = setInterval(() => {
    if (!loading.style.opacity) {
      loading.style.opacity = 1;
    }
    if (loading.style.opacity > 0) {
      loading.style.opacity -= 1;
    } else {
      clearInterval(fadeEffect);
      loading.setAttribute("style", "display:none");
    }
  }, 1000);

  let video = document.querySelector("video");

  const setVideoDimensions = () => {
    if (window.innerWidth / window.innerHeight > 16 / 9) {
      video.style.width = "100vw";
      video.style.height = "calc(100vw * 9 / 16)";
    } else {
      video.style.width = "calc(100vh * 16 / 9)";
      video.style.height = "100vh";
    }
  };

  window.onresize = setVideoDimensions;
  setVideoDimensions();

  // animation
  var current = 1; //keeps track of the current div
  var height = $(".roles").height(); //the height of the roles div
  var numberDivs = $(".roles").children().length; //the number of children of the roles div
  var first = $(".roles div:nth-child(1)"); //the first div nested in roles div
  setInterval(function() {
    var number = current * -height;
    first.css("margin-top", number + "px");
    if (current === numberDivs) {
      first.css("margin-top", "0px");
      current = 1;
    } else current++;
  }, 2000);
});
