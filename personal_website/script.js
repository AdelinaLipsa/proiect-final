$(window).scroll(function() {
  $(".scrollDown").css("opacity", 1 - $(window).scrollTop() / 250);
});

$(window).scroll(function() {
  var scrollPos = $(window).scrollTop();
  navbar = $(".logo-text, .center");
  navbarBg = $(".navbar");

  if (scrollPos > $(window).height()) {
    navbar.addClass("alt-color");
    navbarBg.addClass("alt-color");
  } else {
    navbar.removeClass("alt-color");
    navbarBg.removeClass("alt-color");
  }
});

$(document).ready(function() {
  $(".contact").click(function(e) {
    $(".card").toggleClass("active");
    $(".banner").toggleClass("active");
    $(".photo").toggleClass("active");
    $(".social-media-banner").toggleClass("active");
    $(".email-form").toggleClass("active");
    var buttonText = $("button.contact#main-button").text();
    if (buttonText === "back") {
      buttonText = "click to get in touch";
      $("button.contact#main-button").text(buttonText);
    } else {
      buttonText = "back";
      $("button.contact#main-button").text(buttonText);
    }
  });

  $("#projects > li").hover(
    function() {
      $(this)
        .siblings()
        .addClass("blur");
    },
    function() {
      $(this)
        .removeClass("clicked")
        .siblings()
        .removeClass("blur");
    }
  );

  $("#projects > li").click(function(e) {
    $(this).addClass("clicked");
  });
});
