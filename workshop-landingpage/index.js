const express = require('express');
const bodyParser = require('body-parser');
const server = express();

server.use(bodyParser.json());

function log(req, res, next) {
    const { method, path, query, body } = req;
    console.log(`${method} - ${path} - ${JSON.stringify(query)} - ${JSON.stringify(body)}`);
    next();
}

server.use(log);


let inscriptos = [];

let mailInvalido = ['@gmail','@yahoo','@hotmail'];


//validar informacion de usuario completa

function validarContacto(req, res, next) {
    const { nombre, apellido, email,telefono } = req.body;
    
    if (!nombre || !apellido || !email || !telefono ) {
        return res.status(400)
            .json('Datos del contacto invalido!!!');
    }

    return next();
};

//validar que el usario no exista

function validarSiExiste(req, res, next) {
    const { email } = req.body;
    
    const i = inscriptos.findIndex(c => {
        return c.email == email;
    });

    if (i >= 0) {
        return res.status(409)
            .json('El contacto ya existe!!!');
    }

    return next();
}

// valida mail valido
function validarMail (req,res,next){

    const { email } = req.body;
   
    for(i=0;i<mailInvalido.length;i++){
        if(email.includes(mailInvalido[i])){
            console.log ('email invalido');
            return res.status(400).json('mail no valido para inscripcion');
        };
    };
    return next();

    };
   

//Crea endpoint post

server.post('/inscripcion', validarContacto, validarSiExiste,validarMail, (req, res) => {
    console.log('entre');
    inscriptos.push(req.body);
    
    res.json("Contacto agregado");
});

//En caso de error

server.use((err, req, res, next) => {
    if (!err) {
        return next();
    }

    console.log(JSON.stringify(err));

    return res.status(500)
        .json("Se ha producido un error inesperado.");
});


//Enviar lista //



server.get('/lista', (req, res) => {
    res.send(inscriptos);
});


server.listen(3000, () => {
    console.log('Servidor iniciado...');
});
