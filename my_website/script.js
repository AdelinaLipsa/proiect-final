// event listeners
document.getElementById("cv").addEventListener("click", ()=> {
    window.open("cv.html", "_self");
});

document.getElementById("logo").addEventListener("click", ()=> {
    window.open("index.html", "_self");
});

document.getElementById("hello").addEventListener("click", ()=> {
    window.open("hello.html", "_self");
});

document.querySelector('#addBtn').addEventListener('click', function () {
    let name = document.querySelector("#name").value;
    let message = document.querySelector("#message").value;
    let email = document.querySelector("#email").value;

    if(name && message && email){

     let newMessage={
         name,
         message,
         email
     };  

     fetch(`https://website-ee717.firebaseio.com/.json`, {
         method: "POST",
         body: JSON.stringify(newMessage)
     })
     .then(()=> window.open("index.html", "_self"))
     .then(()=> setTimeout(function(){
        document.querySelector('#addBtn').setAttribute('name', 'Message sent!');
    },2000))
     .catch(err=> console.log(err));
    } 
});


document.querySelector('#cancelBtn').addEventListener('click', function () {
    window.open('index.html', '_self');
});

