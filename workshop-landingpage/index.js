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


//validar informacion de usuario completa

function validarContacto(req, res, next) {
    const { nombre, apellido, email,telefono } = req.body;
    console.log(req.body);

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
        console.log('buscando mail');
        return c.email == email;
    });

    if (i >= 0) {
        return res.status(409)
            .json('El contacto ya existe!!!');
    }

    return next();
}

//Crea endpoint post

server.post('/inscripcion', validarContacto, validarSiExiste, (req, res) => {
    console.log('entre');
    console.log(req.body);
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


server.listen(3000, () => {
    console.log('Servidor iniciado...');
});
