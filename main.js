let name = document.getElementById('Nombre');
let lastName = document.getElementById('Apellido');
let phone = document.getElementById('Telefono');
let email = document.getElementById('inputEmail');
let button = document.getElementById('submit');
let url = "";

validation = (name, lastName, phone, email) =>{
    if(name != null && lastName != null && phone != null && email != null){
        console.log(`Campo correcto ${name}`);
    }else{
        console.log(`Los campos no pueden estar vacios`);
    }
}

button.addEventListener('click', function (event) {
    event.preventDefault();
    //console.log(name.value);
    validation(name.value, lastName.value, phone.value, email.value);
    postServer();
});


postServer = () =>{
    fetch(`${url}`)
  .then(response => response.json())
  .then(data => console.log(data));
}
