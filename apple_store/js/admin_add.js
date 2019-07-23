document.querySelector('#addBtn').addEventListener('click', function () {

    let name = document.querySelector('#name').value;
    let image = document.querySelector('#image').value;
    let price = document.querySelector('#price').value;
    let stock = document.querySelector('#stock').value;
    let configuration = document.querySelector('#configuration').value;
    let category = document.querySelector('#category').value;


    if (name && image && category && configuration && price && stock) {

        let newItem = {
            name,
            image,
            category,
            configuration,
            price,
            stock
        };

        fetch('https://proiect-final-f676e.firebaseio.com/products/.json', {
            method: 'POST',
            body: JSON.stringify(newItem)
        })
            .then(() => window.open('./admin.html', '_self'))
            .catch(err => console.log(err));
    } else
        document.querySelector('#error').innerHTML = 'Complete all the fields!';
});

document.querySelector('#cancelBtn').addEventListener('click', function () {
    window.open('./admin.html', '_self');
});