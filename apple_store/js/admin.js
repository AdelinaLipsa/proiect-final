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

let database;
getDatabase();


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

//--------------------DATABASE DATA
async function getDatabase() {
    var responseText = await ajaxPromise(`https://proiect-final-f676e.firebaseio.com/products/.json`, "GET");
    database = JSON.parse(responseText);
    draw();
    loader();
    document.querySelector(".loader").innerHTML = "";
    document.querySelector(".loader").style.display = "none";

}

function draw() {
    let html = `
        <table class="table col-12 col-lg-9 mx-auto text-center responsive" id="myTable">
        <thead>
            <tr>
            <th class="d-none d-md-table-cell"></th>
            <th scope="col">Product name</th>
            <th scope="col" class="d-none d-sm-table-cell">Price</th>
            <th scope="col" class="d-none d-sm-table-cell">Stock</th>
            <th scope="col"></th>
            <th></th>
            </tr>
        </thead>
        <tbody></tbody>
        `;
    document.querySelector(".content").innerHTML = html;
    html = "";
    for (let id in database) {
        let arr = database[id].image.split(" ");
        html += `
           <tr>
           <td class="d-none d-md-table-cell"><img src="../imagini/${arr[0]}" id="firebaseImage" class="h-25"></td>
           <td class="align-middle">
           <a href="./phone_details.html?id=${id}">${database[id].name}</a>&nbsp(${database[id].category})
           </td>
           <td class="align-middle d-none d-sm-table-cell">${database[id].price} lei</td>
           <td class="align-middle d-none d-sm-table-cell">${database[id].stock}</td>
           <td class="align-middle">
           <button id = "${id}" class="text-nowrap btn btn-dark my-1 d-sm-inline" onclick="edit();">
           <span class="d-none d-md-inline">Modify</span>
           <i class="fas fa-edit"></i></button>
           <button id = "${id}" class="text-nowrap btn btn-dark my-1 d-sm-inline" onclick="deleteBtn();">
           <span class="d-none d-md-inline">Remove</span>
           <i class="fas fa-trash-alt"></i>
           </button>
           </tr>
           </table>
           <div class="error"></div> 
            `;
        document.querySelector('table tbody').innerHTML = html;

        document.querySelector("table tbody").addEventListener("click", function () {
            if (event.target.classList.contains("editBtn")) {
                window.open(`admin_edit.html?id=${event.target.dataset.id}`, "_self")
            }
        });
    }
}

function edit() {
    window.open(`admin_edit.html?id=${event.currentTarget.id}`, "_self");
}

async function deleteBtn() {
    let id = event.currentTarget.id;
    if (confirm(`You are deleting${database[id].name}.`)) {
        return fetch(`https://proiect-final-f676e.firebaseio.com/products/${id}.json`, {
                method: "DELETE"
            })
            .then(() => window.open('admin.html', '_self'))
            .catch(err => console.log(err));
    }
}


function filter() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("input");
    filter = input.value.toUpperCase();
    table = document.querySelector("#myTable");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

document.querySelector("#input").addEventListener("keyup", filter);

document.querySelector("#addBtn").addEventListener("click", function () {
    window.open("admin_add.html", "_self")
});