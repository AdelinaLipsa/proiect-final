"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

$(window).scroll(function () {
  var height = $(window).scrollTop();

  if (height > 100) {
    $('#back2Top').fadeIn();
  } else {
    $('#back2Top').fadeOut();
  }
});
$(document).ready(function () {
  $("#back2Top").click(function (event) {
    event.preventDefault();
    $("html, body").animate({
      scrollTop: 0
    }, "slow");
    return false;
  });
});
var database = {};
loader();
getPhones();
initializeCart();
itemCounter();

function initializeCart() {
  if (localStorage.getItem('cart')) cart = JSON.parse(localStorage.getItem('cart'));else cart = {};
}

function loader() {
  document.querySelector(".loader").innerHTML = "<img src='https://cdn.dribbble.com/users/189524/screenshots/2822794/silhouette-solo-loader-dribbble_v2.gif' class='loaderImg'>";
}

function ajaxPromise(url, method, body) {
  return new Promise(function (resolve, reject) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          resolve(this.responseText);
        } else {
          reject(this);
        }
      }
    };

    xhttp.open(method, url, true);
    xhttp.send(body);
  });
}

function getPhones() {
  var responseText;
  return regeneratorRuntime.async(function getPhones$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(ajaxPromise("https://proiect-final-f676e.firebaseio.com/products.json", "GET"));

        case 2:
          responseText = _context.sent;
          database = JSON.parse(responseText);
          syncCart();
          draw(database);
          document.querySelector(".loader").innerHTML = "";
          document.querySelector(".loader").style.display = "none";

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}

function draw(database) {
  var html = '<div class="row justify-content-center no-gutters">';

  for (var id in database) {
    var arr = database[id].image.split(" ");
    html += "\n                <div class=\"col-12 col-md-6 col-lg-4 p-5\">\n                    <div class=\"card h-100\" id=\"background-shadow\">\n                        <img class=\"card-img-top img-fluid w-75 mx-auto\" src=\"../imagini/".concat(arr[0], "\">\n                        \n                        <div class=\"card-body text-center d-flex flex-column\">\n                            <h3 class=\"card-title\">").concat(database[id].name, "</h3>\n                            <div class=\"mt-auto\">\n                                <p class=\"card-text\"><b>PRICE:&nbsp</b>").concat(database[id].price, "</p>\n                                <p class=\"card-text \"><b>In stock:&nbsp</b> ").concat(database[id].stock, "</p>\n                            </div>\n                        </div>\n                        <div class=\"card-footer text-center\">\n                            <button id=\"").concat(id, "\" class=\"detailsBtn\">Details</button>\n                        </div>\n                                               \n                     </div>\n                </div>\n        ");
  }

  html += '</div>';
  document.querySelector("#content").innerHTML = html;
}

document.addEventListener('click', function (e) {
  if (e.target && e.target.classList == 'detailsBtn') {
    window.open("phone_details.html?id=".concat(event.target.id), "_self");
  }
});

function itemCounter() {
  var counter = 0;

  if (Object.keys(cart).length > 0) {
    for (var key in cart) {
      counter += cart[key].quantity;
    }

    document.querySelector("#itemCounter").innerHTML = counter;
  }
}

function syncCart() {
  for (var key in database) {
    if (cart[key]) {
      cart[key] = _objectSpread({}, cart[key], {}, database[key]);
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

function search(e) {
  var foundProducts = {};
  var insertedInput = document.querySelector('#input').value.trim().toLowerCase();

  if (insertedInput) {
    for (var id in database) {
      var arr = database[id].name.toLowerCase().split(/[\s,]+/);

      if (arr.includes(insertedInput)) {
        foundProducts[id] = database[id];
      }
    }

    if (Object.keys(foundProducts).length > 0) {
      draw(foundProducts);
      document.querySelector('#input').value = '';
      document.querySelector('#input').setAttribute('placeholder', 'Search');
    } else {
      document.querySelector('#input').value = '';
      document.querySelector('#input').setAttribute('placeholder', 'Product not found!');
      setTimeout(function () {
        document.querySelector('#input').setAttribute('placeholder', 'Search');
      }, 2000);
      draw(database);
    }
  }
}

document.querySelector('#searchBtn').addEventListener('click', search);
document.querySelector('#input').addEventListener('keyup', function (e) {
  e.preventDefault();
  e = e || window.event;

  if (e.keyCode == '13') {
    search();
  }
});