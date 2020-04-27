"use strict";

$(document).ready(function () {
  var scene = document.getElementById("scene");
  var parallax = new Parallax(scene);
  AOS.init({
    duration: 3000
  });
  $(window).scroll(function () {
    $(".scrollDown").css("opacity", 1 - $(window).scrollTop() / 250);
  });
  $(window).on("load", function () {
    $(".loader").fadeOut("slow");
  });
  $(window).scroll(function () {
    var scrollPos = $(window).scrollTop();
    var navbar = $(".navbar");
    var logo = $(".logo-text");
    var center = $(".center");

    if (scrollPos > $(window).height()) {
      navbar.addClass("bg-dark");
      logo.addClass("text-light");
      center.addClass("text-light");
    } else {
      navbar.removeClass("bg-dark");
      logo.removeClass("text-light");
      center.removeClass("text-light");
    }
  }); // svg for about me header

  var textPath = document.querySelector("#text-path");
  var h = document.documentElement,
      b = document.body,
      st = 'scrollTop',
      sh = 'scrollHeight';
  document.addEventListener("scroll", function (e) {
    var percent = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
    textPath.setAttribute("startOffset", -percent * 40 + 1200);
  }); // font style for portfolio header

  var text = new Blotter.Text('PORTFOLIO', {
    family: "LeagueSpartan-Black",
    size: 200,
    paddingLeft: 0,
    paddingRight: 0
  });
  var channel = new Blotter.ChannelSplitMaterial(); // Set material opts

  channel.uniforms.uOffset.value = 0.08;
  channel.uniforms.uRotation.value = 45;
  channel.uniforms.uApplyBlur.value = 1;
  channel.uniforms.uAnimateNoise.value = 1;
  var bChannel = new Blotter(channel, {
    texts: text
  }); // Apply to element

  var bScopeC = bChannel.forText(text);
  var elem = document.getElementById('blotz');
  bScopeC.appendTo(elem); // font style for contact header

  var text2 = new Blotter.Text('Hello.', {
    family: "LeagueSpartan-Black",
    size: 200,
    paddingLeft: 0,
    paddingRight: 0
  });
  var rolling = new Blotter.RollingDistortMaterial();
  var bRolling = new Blotter(rolling, {
    texts: text2
  }); // Apply to element

  var bScopeR = bRolling.forText(text2);
  var elem2 = document.querySelector('.outer-font');
  bScopeR.appendTo(elem2);
});