let url = new URL(document.URL);
let firebaseId = url.searchParams.get('id');

document.querySelector('#cancelBtn').addEventListener('click', function () {
    window.open('admin.html', '_self');
});


fetch(`https://proiect-final-f676e.firebaseio.com/products/${firebaseId}.json`)
    .then(response => {
        if (response.status === 200)
            return response.json();
        else
            console.log(response.status);
    })
    .then(result => {

        document.querySelector('#name').value = result.name;
        document.querySelector('#image').value = result.image;
        document.querySelector('#price').value = result.price;
        document.querySelector('#stock').value =result.stock;
        document.querySelector('#configuration').value = result.configuration;
        document.querySelector('#category').value = result.category;
    
    })
    .catch(err => console.log(err));

document.querySelector('#saveBtn').addEventListener('click', function () {

    let name = document.querySelector('#name').value;
    let image = document.querySelector('#image').value;
    let price = document.querySelector('#price').value;
    let stock = document.querySelector('#stock').value;
    let configuration = document.querySelector('#configuration').value;
    let category = document.querySelector('#category').value;


    if (image && name && price && stock &&configuration && category) {

        let newItem = {
            image,
            name,
            price,
            stock,
            configuration,
            category
        };

        fetch(`https://proiect-final-f676e.firebaseio.com/products/${firebaseId}.json`, {
            method: 'PUT',
            body: newItem
        })
            .then(() => window.open('admin.html', '_self'))
            .catch(err => console.log(err));
    } else
        document.querySelector('#error').innerHTML = 'Please complete every field!';
});