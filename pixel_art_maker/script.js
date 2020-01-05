$(document).ready(function () {
  const sizePicker = $('#size-picker');
  const canvas = $('#my-node');
  const body = $('body');

  let removeGrid = false;
  let gridColor = $('#grid-color');

  let currentColor = $('#colorPicker');
  let mouseDragged = false;
  let currentRow;
  let currentTool = "paintBrush";

  let oldFillColor;
  let modalError = $(".modal-error");

  let width = 30;
  let height = 30;

  let eight = $(".eight");
  let twelve = $(".twelve");
  let sixteen = $(".sixteen");
  let thirtytwo = $(".thirtytwo");

  //when mouse button is held down the mousedragged variable is set to true
  canvas.on('mousedown', 'td', function (e) {
    e.preventDefault();
    mouseDragged = true;
  });

  //when mouse button is let up the mouseDragged variable is set to false
  body.on('mouseup', function () {
    mouseDragged = false;
  });

  //when #paint-brush div is clicked paintbrush becomes the current tool
  body.on('click', '#paint-brush', function () {
    //removes orange shadow on div from the last used tool
    removeCurrentTool();
    currentTool = "paintBrush";
    //adds the tool-selected class to div which gives an orange shadow
    $('#paint-brush').addClass('tool-selected');
  });

  //when #paint-bucket div is clicked paintbrush becomes the current tool
  body.on('click', '#paint-bucket', function () {
    //removes orange shadow on div from the last used tool
    removeCurrentTool();
    currentTool = "paintBucket";
    //adds the tool-selected class to div which gives an orange shadow
    $('#paint-bucket').addClass('tool-selected');
  });

  //when #eye-dropper div is clicked paintbrush becomes the current tool
  body.on('click', '#eye-dropper', function () {
    //removes orange shadow on div from the last used tool
    removeCurrentTool();
    currentTool = "eyeDropper";
    //adds the tool-selected class to div which gives an orange shadow
    $('#eye-dropper').addClass('tool-selected');
  });

  //when #eraser div is clicked paintbrush becomes the current tool
  body.on('click', '#eraser', function () {
    //removes orange shadow on div from the last used tool
    removeCurrentTool();
    currentTool = "eraser";
    //adds the tool-selected class to div which gives an orange shadow
    $('#eraser').addClass('tool-selected');
  });

  body.on('click', '#sample-grape', function () {
    currentColor.val("#B38CB4");
  });

  body.on('click', '#sample-brown', function () {
    currentColor.val("#B7918C");
  });

  body.on('click', '#sample-khaki', function () {
    currentColor.val("#C5A48A");
  });

  body.on('click', '#sample-burlywood', function () {
    currentColor.val("#DDC67B");
  });

  body.on('click', '#sample-sunny', function () {
    currentColor.val("#F8F272");
  });

  body.on('click', '#sample-discoball', function () {
    currentColor.val("#2EC0F9");
  });

  body.on('click', '#sample-bluejeans', function () {
    currentColor.val("#67AAF9");
  });

  body.on('click', '#sample-blueeyes', function () {
    currentColor.val("#9BBDF9");
  });

  body.on('click', '#sample-blue', function () {
    currentColor.val("#C4E0F9");
  });

  body.on('click', '#sample-mist', function () {
    currentColor.val("#E3DFFF");
  });

  body.on('click', '#sample-thistle', function () {
    currentColor.val("#D3C0CD");
  });

  body.on('click', '#sample-tuscany', function () {
    currentColor.val("#B19994");
  });

  body.on('click', '#sample-shadow', function () {
    currentColor.val("#937666");
  });

  body.on('click', '#sample-arsenic', function () {
    currentColor.val("#3D3A4B");
  });

  body.on('click', '#sample-rose', function () {
    currentColor.val("#B95F89");
  });

  gridColor.change(function () {
    $('table').css('border-color', gridColor.val());
    $('tr').css('border-color', gridColor.val());
    $('td').css('border-color', gridColor.val());
  });

  //when remove-grid is clicked the black lines on the grid are removed or added back
  body.on('click', '#remove-grid', function () {
    removeGrid = !removeGrid;
    if (removeGrid) {
      $('table').css('border', "none");
      $('tr').css('border', "none");
      $('td').css('border', "none");
    } else {
      $('table').css('border', "1px solid " + gridColor.val() + "");
      $('tr').css('border', "1px solid " + gridColor.val() + "");
      $('td').css('border', "1px solid " + gridColor.val() + "");
    }
  });

  //this is called whenever mouse moves within the canvas
  canvas.on('mousemove', function (e) {
    //the function is called only if the mouseDragged variable is called
    if (mouseDragged) {
      //stores the closest cell in a variable
      let clickedCell = $(e.target).closest('td');

      //continuously paint the nearest cell
      if (currentTool === "paintBrush") {
        highlightSquares(clickedCell);
        //countinously erase the nearest cell
      } else if (currentTool === "eraser") {
        clickedCell.css('background-color', "white");
      }
    }
  });

  canvas.on('click', 'td', function (e) {
    //stores the closest cell in a variable
    let clickedCell = $(e.target).closest('td');

    switch (currentTool) {
      //paints the clicked cell
      case "paintBrush":
        highlightSquares(clickedCell);

        break;
        //paints the current cell and the surrounding cells if they are the same color
      case "paintBucket":
        //stores the cells old color to see which surrounding cells should be colored
        oldFillColor = clickedCell.css("background-color");
        paintBucket(clickedCell);
        break;
        //changes currentColor to the background color of the clicked cell
      case "eyeDropper":
        removeCurrentTool();
        eyeDropper(clickedCell);
        //changes currentTool to paintbrush once eyedropper gets color from cell
        currentTool = "paintBrush";
        $('#paint-brush').addClass('tool-selected');
        break;
        //erases cell color by changing background to white
      case "eraser":
        clickedCell.css('background-color', "white");
        break;
    }
  });

  //this function makes a grid with the given height and width
  function makeGrid() {

    //removes the old grid when making a new grid
    canvas.empty();
    //converts the height and width from string values to a number
    //loops through the height value until it creates the same number of rows
    for (let i = 0; i < height; i++) {
      //adds a new row
      canvas.append($('<tr />').attr('data-row', i));
      //stores the location of the current row for easy access for the next for loop
      currentRow = canvas.children().last();
      //loops through the width value until it creates the same number of columns
      for (let i = 0; i < width; i++) {
        //adds a new column
        currentRow.append($('<td bgcolor="white"></td>').attr('data-col', i));
      }
    }
  }

  //changes the color of the given cell to the currentColor
  function highlightSquares(clickedCell) {
    //changes the background color of the stored variable
    clickedCell.css('background-color', currentColor.val());
  }

  //function for painting cell and surrounding cells of the same color
  function paintBucket(chosenCell) {
    highlightSquares(chosenCell);
    let colNum = chosenCell.data('col');
    let rowNum = chosenCell.parent().data('row');
    //checks to see if there is a cell to the left of chosenCell
    if (colNum > 0) {
      let leftCell = chosenCell.prev();
      //checks to see if the cell to the left is the same color as the oldFillColor
      if (leftCell.css('background-color') == oldFillColor) {
        paintBucket(leftCell);
      }
    }
    //checks to see if there is a cell to the right of the chosenCell
    if (colNum < width) {
      let rightCell = chosenCell.next();
      //checks to see if the cell to the right is the same color as oldFillColor
      if (rightCell.css('background-color') == oldFillColor) {
        paintBucket(rightCell);
      }
    }
    //checks to see if there is a cell above the chosenCell
    if (rowNum > 0) {
      let topCell = chosenCell.parent().prev().children().eq(colNum);
      //checks to see if the cell above is the same color as the oldFillColor
      if (topCell.css('background-color') == oldFillColor) {
        paintBucket(topCell);
      }
    }
    //checks to see if there is a cell below the  chosenCell
    if (rowNum < height) {
      let bottomCell = chosenCell.parent().next().children().eq(colNum);
      //checks to see if the cell below the chosenCell is the same color as oldFillColor
      if (bottomCell.css('background-color') == oldFillColor) {
        paintBucket(bottomCell);
      }
    }
  }

  function removeCurrentTool() {
    $('img').removeClass('tool-selected');
  }

  //gets the color of the given cell
  function eyeDropper(clickedCell) {
    let tempColor = clickedCell.css('background-color');
    //sets the color of currentColor to the color of the given cell
    currentColor.val(rgbToHex(tempColor));
  }

  //converts rgb color code to hex color code
  function rgbToHex(rgb) {
    var a = rgb.split("(")[1].split(")")[0].split(",");
    return "#" + a.map(function (x) {
      x = parseInt(x).toString(16);
      return (x.length == 1) ? "0" + x : x;
    }).join("");
  }

  //grid event listeners 
  eight.on("click", function () {
    height = 8;
    width = 8;
    makeGrid();
  });

  twelve.on("click", function () {
    height = 12;
    width = 12;
    makeGrid();
  });
  sixteen.on("click", function () {
    height = 16;
    width = 16;
    makeGrid();
  });


  thirtytwo.on("click", function () {
    height = 32;
    width = 32;
    makeGrid();
  });

  // image saving 
  $('.foo').click(function () {
    if (canvas.children().length > 0) {
      html2canvas($('#my-node'), {
        onrendered: function (canvas) {
          var a = document.createElement('a');
          a.href = canvas.toDataURL("image/png");
          a.download = 'image.png';
          a.click();
        }
      });
      modalError.addClass("hidden");
    } else
      modalError.removeClass("hidden");
  });


  $('.secondFoo').click(function () {
    if (canvas.children().length > 0) {
      html2canvas($('#my-node'), {
        onrendered: function (canvas) {
          var a = document.createElement('a');
          // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
          a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
          a.download = 'image.jpg';
          a.click();
        }
      });
      modalError.addClass("hidden");
    } else
      modalError.removeClass("hidden");

  });

  $('.thirdFoo').click(function () {
    if (canvas.children().length > 0) {
      html2canvas($('#my-node'), {
        onrendered: function (canvas) {
          var a = document.createElement('a');
          // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
          a.href = canvas.toDataURL("image/gif").replace("image/gif", "image/octet-stream");
          a.download = 'image.gif';
          a.click();
        }
      });
      modalError.addClass("hidden");
    } else
      modalError.removeClass("hidden");
  });

  $('.modal-cancel').click(function () {
    modalError.fadeOut(500);
  });

});