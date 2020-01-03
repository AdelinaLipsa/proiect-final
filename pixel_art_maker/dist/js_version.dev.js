"use strict";

window.addEventListener('load', function () {
  var sizePicker = document.querySelector('#size-picker');
  var canvas = document.querySelector('#my-node');
  var rightDiv = document.querySelector('.right-div');
  var leftDiv = document.querySelector('.left-div');
  var body = document.querySelector('body');
  var removeGrid = false;
  var gridColor = document.querySelector('#grid-color');
  var currentColor = document.querySelector('#colorPicker');
  var mouseDragged = false;
  var currentRow;
  var currentTool = "paintBrush";
  var oldFillColor;
  var width = 30;
  var height = 30;
  var eight = document.querySelector(".eight");
  var twelve = document.querySelector(".twelve");
  var sixteen = document.querySelector(".sixteen");
  var thirtytwo = document.querySelector(".thirtytwo"); //----------------event listeners

  canvas.addEventListener("mousedown", "td", function (e) {
    e.preventDefault();
    mouseDragged = true;
  });
  body.addEventListener("mouseup", function () {
    mouseDragged = false;
  });
  body.addEventListener("click", "#paint-brush", function () {
    removeCurrentTool();
    currentTool = "paintBrush";
    currentTool.classList.add("tool-selected");
  });
  gridColor.onchange(function () {
    document.querySelector("table").style.property('border-color', gridColor.val());
    document.querySelector("tr").style.property('border-color', gridColor.val());
    document.querySelector("td").style.property('border-color', gridColor.val());
  });
});