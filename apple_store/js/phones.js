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
    if (localStorage.getItem('cart'))
        cart = JSON.parse(localStorage.getItem('cart'));
    else
        cart = {};
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

async function getPhones() {
    var responseText = await ajaxPromise("https://proiect-final-f676e.firebaseio.com/products.json", "GET");
    database = JSON.parse(responseText);
    syncCart();
    draw(database);
    document.querySelector(".loader").innerHTML = "";
    document.querySelector(".loader").style.display = "none";

}

function draw(database) {
    let html = '<div class="row justify-content-center no-gutters">';
    for (let id in database) {
        var arr = database[id].image.split(" ");

        html += `
                <div class="col-12 col-md-6 col-lg-4 p-3">
                    <div class="card h-100">
                        <img class="card-img-top img-fluid w-75 mx-auto" src="../imagini/${arr[0]}">
                        
                        <div class="card-body text-center d-flex flex-column">
                            <h3 class="card-title">${database[id].name}</h3>
                            <div class="mt-auto">
                                <p class="card-text"><b>PRICE:&nbsp</b>${database[id].price}</p>
                                <p class="card-text "><b>In stock:&nbsp</b> ${database[id].stock}</p>
                            </div>
                        </div>
                        <div class="card-footer text-center">
                            <button id="${id}" class="detailsBtn">Details</button>
                        </div>
                                               
                     </div>
                </div>
        `;
    }
    html += '</div>';
    document.querySelector("#content").innerHTML = html;
}

document.addEventListener('click', function (e) {
    if (e.target && e.target.classList == 'detailsBtn') {
        window.open(`phone_details.html?id=${event.target.id}`, "_self")
    }
});

function itemCounter() {
    var counter = 0;
    if (Object.keys(cart).length > 0) {
        for (let key in cart) {
            counter += cart[key].quantity;
        }
        document.querySelector("#itemCounter").innerHTML = counter;
    }
}

function syncCart() {
    for (let key in database) {
        if (cart[key]) {
            cart[key] = {
                ...cart[key],
                ...database[key]
            }
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
}


document.querySelector('#searchBtn').addEventListener('click', function () {
    var foundProducts = {};
    var insertedInput = document.querySelector('#input').value.trim().toLowerCase();
    if (insertedInput) {
        for (let id in database) {
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
            setTimeout(function(){
                document.querySelector('#input').setAttribute('placeholder', 'Search');
            },2000);
            draw(database);
        }
    }
});