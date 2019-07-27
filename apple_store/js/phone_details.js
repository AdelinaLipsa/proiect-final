function loader() {
    document.querySelector(".loader").innerHTML = "<img src='https://cdn.dribbble.com/users/189524/screenshots/2822794/silhouette-solo-loader-dribbble_v2.gif' class='loaderImg'>";
}

let getUrl = new URL(document.URL);
let firebaseId = getUrl.searchParams.get('id');
let cart;
let database;
let sufficientStock;

initializeCart();
itemCounter();

productData()
    .then(response => {
        if (response.status === 200)
            return response.json();
        else
            console.log(response.status);
    })
    .then(function (data) {
        database = data;
        loader();
        drawDetails();
        addListeners();
        $('.carousel').carousel({
            interval: 2000
        });
    })
    .catch(err => console.log(err));

function productData() {
    return fetch(`https://proiect-final-f676e.firebaseio.com/products/${firebaseId}.json`, {
        method: 'GET'
    });
}
document.querySelector(".loader").innerHTML = "";
document.querySelector(".loader").style.display = "none";


function drawDetails() {
    let arr = database.image.split(" ");
    var html= `
    <div class="col-sm-10 d-flex pt-5">
    <div class="col-6  d-none d-sm-inline">
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
      <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img class="d-block w-100" src="../imagini/${arr[0]}" alt="First slide">
      </div>
      <div class="carousel-item">
        <img class="d-block w-100" src="../imagini/${arr[1]}" alt="Second slide">
      </div>
      <div class="carousel-item">
        <img class="d-block w-100" src="../imagini/${arr[2]}" alt="Third slide">
      </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>    
  </div>
    <div class="col-sm-6 d-flex-inline text-center">
    <h3>${database.name.toUpperCase()}</h3><br/>
    <p class="text-justify lead"><b>Description:</b>&nbsp${database.configuration}</p>
    <p class="lead"><b>Price:</b>&nbsp${database.price} lei</p>
    <p class="lead"><b>Stock:</b>&nbsp${(database.stock<=0)?0:database.stock} buc.</p>
    `;
    if (cart[firebaseId] && database.stock === cart[firebaseId].quantity){ // daca stocul produsului e egal cu cantitatea din cos
        html += `
        <h4 class="text-danger">You have the item's max quantity in your cart!</h4>
        <button id="decrement" class="btn btn-lighter" disabled>-</button>
        <input id="quantity" type="text" value="1" style="background:none; border:none;" disabled>
        <button id="increment" class="btn btn-lighter" disabled>+</button><br/><br/>
        <button class="btn btn-dark" data-id="${database.id}" disabled id="addToCart"><i class="fas fa-shopping-cart"></i>&nbspAdd to cart</button><a href="./phones.html"><button id="back"  class="btn btn-dark"><i class="fas fa-undo"></i>Back to products</button></a>
        </div>
        </div>
        `;
        $('.carousel').carousel({
            interval: 2000
        });
        var quantity = document.querySelector("#quantity");
    }else if (database.stock > 0) {
        html += `
        <button id="decrement" class="btn btn-lighter" style="">-</button>
        <input id="quantity" type="text" value="1" style="background:none;  border:none;" disabled>
        <button id="increment" class="btn btn-lighter">+</button><br/><br/>
        <button class="btn btn-dark" data-id="${database.id}" id="addToCart" class="btn btn-dark"><i class="fas fa-shopping-cart"></i>&nbspAdd to cart</button><a href="./phones.html"><button id="back" class="btn btn-dark"><i class="fas fa-undo"></i>Back to products</button></a>
        </div>
        </div>
     `;
     $('.carousel').carousel({
        interval: 2000
    });
    } else if (quantity > database.stock) {
        html += `
        <h4 class="text-danger">You are exceeding the max quantity of this item's stock!</h4>
        <div class="d-flex d-inline-block justify-content-center mb-2">
        <button id="decrement" class="btn btn-lighter">-</button>
        <input id="quantity" type="text" placeholder="qty" value="1" style="background:none; border:none;" disabled>
        <button id="increment" class="btn btn-lighter" disabled>+</button>
        </div>
        <button class="btn btn-dark" data-id="${database.id}" id="addToCart" class="btn btn-dark"><i class="fas fa-shopping-cart"></i>&nbspAdd to cart</button><a href="./phones.html"><button id="back" class="btn btn-dark"><i class="fas fa-undo"></i>Back to products</button></a>
        </div>
        </div>
        `;
        $('.carousel').carousel({
            interval: 2000
        });
    } else //daca stocul la produs e 0
        html += `
        <h4 class="text-danger">Product out of stock!</h4>
        <div class="d-flex d-inline-block justify-content-center mb-2">
        <button id="decrement" class="btn btn-lighter text-danger" disabled>-</button>
        <input id="quantity" type="text" placeholder="qty" value="1" style="background:none; border:none;" class="text-danger" disabled>
        <button id="increment" class="btn btn-lighter text-danger" disabled>+</button>
        </div>
        <button class="btn btn-dark" data-id="${database.id}" id="addToCart" disabled><i class="fas fa-shopping-cart"></i>&nbspAdd to cart</button><a href="./phones.html"><button id="back" class="btn btn-dark"><i class="fas fa-undo"></i>Back to products</button></a>
        </div>
        </div>
        </div>
        `;
        $('.carousel').carousel({
            interval: 2000
        });
    document.querySelector("#content").innerHTML = html;

    document.querySelector("#decrement").addEventListener("click", () => {
        if (parseInt(document.getElementById('quantity').value, 10) > 1) {
            document.getElementById('quantity').value -= 1;
        }
    });

    document.querySelector("#increment").addEventListener("click", () => {
        var value = parseInt(document.getElementById('quantity').value, 10);
        value = isNaN(value) ? 0 : value;
        if(value<database.stock){
        value++;
        }
        document.getElementById('quantity').value = value;
    });

}

function initializeCart() {
    if (localStorage.getItem("cart"))
        cart = JSON.parse(localStorage.getItem("cart"));
    else
        cart = {};
}



function addToCart() {
    syncCart();
    let quantity = Number(document.querySelector("#quantity").value);
    if (cart[firebaseId]) {
        var cartQuantity = cart[firebaseId].quantity;
    } else {
        var cartQuantity = 0;
    }
    if (database.stock >= (cartQuantity + quantity)) {
        sufficientStock = true;
        if (cart[firebaseId]) {
            cart[firebaseId].quantity += quantity;
        } else {
            database.quantity = quantity;
            cart[firebaseId] = database;
        }
        localStorage.setItem("cart", JSON.stringify(cart));
    } else  {
        Swal.fire({
            type: 'error',
            title: 'Max quantity exceeded.',
            text: 'You are exceeding the max quantity of this item\'s stock!',
        })
        sufficientStock = false;
    }
    itemCounter(); 
}

function popUp() {
    if (sufficientStock){
        Swal.fire({
            position: 'top-start',
            type: 'success',
            title: `${database.name} added to cart!`,
            showConfirmButton: false,
            timer: 1500
        })
    } else {
        Swal.fire({
            type: 'error',
            title: 'Product out of stock',
            text: 'sorry',
        })
    }
}

function addListeners() {
    document.querySelector('#addToCart').addEventListener('click', function () {
        addToCart();
        popUp();
        document.querySelector('#quantity').value = 1;
        drawDetails();
        addListeners();
    });
}


function initializeCart() {
    if (localStorage.getItem('cart'))
        cart = JSON.parse(localStorage.getItem('cart'));
    else
        cart = {};
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
            cart[key].stock = {
                ...cart[key],
                ...database[key]
            }
        }
    }
    localStorage.setItem("cart",JSON.stringify(cart));
}