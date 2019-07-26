loader();
let cart;
let database;
initializeCart();
getDatabase();
syncCart();

//----------------CART INITIALIZATION
function initializeCart() {
    if (localStorage.getItem('cart'))
        cart = JSON.parse(localStorage.getItem('cart'));
    else
        cart = {};
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

//--------------------DATABASE DATA
async function getDatabase() {
    var responseText = await ajaxPromise(`https://proiect-final-f676e.firebaseio.com/products/.json`, "GET");
    database = JSON.parse(responseText);
    drawCart();
    syncCart();
    document.querySelector(".loader").innerHTML = "";
    document.querySelector(".loader").style.display = "none";

}

function loader() {
    document.querySelector(".loader").innerHTML = "<img src='https://cdn.dribbble.com/users/189524/screenshots/2822794/silhouette-solo-loader-dribbble_v2.gif' class='loaderImg'>";
}


//----------------CART SYNC
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


// -----------DRAWING THE TABLE HEADER
function drawCart() {
    if (Object.keys(cart).length > 0) {
        let html = `
        <table class="table col-12 col-lg-9" id="myTable">
        <thead>
            <tr>
            <th class="d-none d-md-table-cell"></th>
            <th scope="col">Product name</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Subtotal</th>
            <th></th>
            </tr>
        </thead>
        <tbody></tbody>
        </table>
        <div class="totalSpot col-12 col-lg-3"></div>
        `;
        document.querySelector("#cartContent").innerHTML = html;

        //---------DRAWING THE TABLE CONTENT
        html = "";
        let itemsInCart = 0;
        let priceTotal = 0;
        for (let key in cart) {
        var arr = database[key].image.split(" ");
            let subtotal = cart[key].quantity * cart[key].price;
            html += `
           <tr>
           <td class="d-none d-md-table-cell"><img src="../imagini/${arr[0]}" id="firebaseImage"></td>
           <td class="align-middle"><a href="./phone_details.html?id=${key}">${cart[key].name}</a></td>
           <td class="align-middle">${cart[key].price} lei</td>
           <td class="align-middle">
           <button class ="decrement"  id = "${key}" onclick="decrement();">-</button>
           <input class ="quantityInput" type="text" value="${cart[key].quantity}" disabled>
           <button class ="increment"  id = "${key}" onclick="increment();">+</button>
           </td>
           <td class="align-middle">${subtotal.toFixed(2)} lei</td>
           <td class="align-middle">
           <button id = "${key}" class="text-nowrap" onclick="remove();"><span class="d-none d-sm-inline">Remove</span><i class="fas fa-trash-alt"></i>
           </button>
           </td>
           </tr> 
            `;
            priceTotal += subtotal;
            itemsInCart += cart[key].quantity;
        }
        document.querySelector('table tbody').innerHTML = html;


        //-----------DRAWING THE TOTALS 
        html = `
        <div class="d-flex flex-column text-center content-justify-center">
        <h4 class="d-flex-inline">Summary</h4>
        <hr>
        <p><b>Items in cart:</b> ${itemsInCart}</p>
        <p><b>Total price:</b> ${priceTotal.toFixed(2)} lei</p>
        <p><b>Shipping cost:</b> Free shipping</p>
        <hr>
        <button id="continueBtn" class="btn btn-dark">Continue Shopping</button>
        <button id="checkoutBtn" class="btn btn-success" onclick="checkingStock();">Checkout</button>
        </div>
        `;
        document.querySelector('.totalSpot').innerHTML = html;

        let str = `
        <span>${itemsInCart}</span>
        `;
        document.querySelector("#itemCounter").innerHTML = str;
        document.querySelector("#continueBtn").addEventListener("click", () => {
            window.open("phones.html", "_self");
        });

    } else {
        document.querySelector('#cartContent').innerHTML = '<h1 style="text-align:center; margin-top:300px; margin-left:auto; margin-right:auto;">Shopping cart is empty!</h2>';
    }
}

function decrement() {
    if (event.target.classList.contains("decrement")) {
        let id = event.target.id;
        if (cart[id].quantity > 1) {
            cart[id].quantity--;
            localStorage.setItem("cart", JSON.stringify(cart));
            drawCart();
        }
    }
}

function increment() {
    if (event.target.classList.contains("increment")) {
        let id = event.target.id;
        if (database[id].stock > cart[id].quantity) {
            cart[id].quantity++;
            localStorage.setItem("cart", JSON.stringify(cart));
            drawCart();
        }
    }
}

// ------------DELETE FROM CART
function remove() {
    let id = event.currentTarget.id;
    delete cart[id];
    localStorage.setItem("cart", JSON.stringify(cart));
    drawCart();
    itemCounter();
}


function redirect() {
    window.open("index.html#1", "_self")
}


//----------------------STOCK UPDATE
function confirm() {
    let orders = [];
    for (let key in cart) {
        let update = database[key].stock - cart[key].quantity;
        let order = fetch(`https://proiect-final-f676e.firebaseio.com/products/${[key]}/stock.json`, {
            method: 'PUT',
            body: update
        })
        orders.push(order);
    }

    Promise.all(orders)
        .then(function () {
            localStorage.removeItem('cart');
            window.open("checkout.html", "_self");
        })
}

//------------------STOCK CHECKING FUNCTION
function checkingStock() {
    if (Object.keys(cart).length > 0) {
        fetch("https://proiect-final-f676e.firebaseio.com/products.json")
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                database = data;
                let modified = false;
                let div = document.createElement('div')
                let html = '<div class="text-center position-fixed p-3 border rounded shadow bg-white screen-center">';
                for (let key in cart) {
                    if (database[key].stock < 1) {
                        html += `<p>We are sorry but product ${cart[key].name} is out of stock. We deleted the product from your cart.</p>`;
                        delete cart[key];
                        modified = true;
                    } else if (cart[key].quantity > database[key].stock) {
                        cart[key].quantity = database[key].stock;
                        html += `<p>${cart[key].name}'s quantity has been modified with the max stock available.</p>`;
                        modified = true;
                    }
                }
                html+=`
                <button id="okBtn">Ok</button>
                </div>
                `;
                div.innerHTML = html;
                div.querySelector('#okBtn').addEventListener('click', function(){
                    if(Object.keys(cart).length > 0){
                    div.parentElement.removeChild(div);
                    } else {
                        window.open("phones.html", "_self");
                    }
                })
                if (modified) {
                    document.body.appendChild(div);
                    drawCart();
                    localStorage.setItem('cart', JSON.stringify(cart));
                } else {
                    confirm();
                }

            });
    }
}


function itemCounter(){
    var counter = 0;
    if(Object.keys(cart).length >0){
        for(let key in cart){
            counter += cart[key].quantity;
        }
        document.querySelector("#itemCounter").innerHTML= counter;
    } else {
        document.querySelector("#itemCounter").innerHTML ="";
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
    localStorage.setItem("cart",JSON.stringify(cart));
  }
  
  