var express = require("express");
var bodyParser = require("body-parser");
var fs = require ("fs");
var path = require("path");

var estudiantes = require(path.join(__dirname,"datos", "estudiantes.json"));

var servidor = express();

//secuencia de posibles respuestas

servidor.use(express.static(path.join(__dirname, "front")));//  MIDDLEWARE
servidor.use(bodyParser.urlencoded({ extended : true }));

servidor.post("/registro", (peticion, respuesta)=>{
    console.log(peticion.body);

    estudiantes.push(peticion.body);

    fs.writeFile(path.join(__dirname, "datos", "estudiantes.json"), JSON.stringify(estudiantes),error =>{
        
        var mensaje = "Estudiante registrado";
        
        if(error){
            mensaje = "Ha ocurrido un error";
        }
        var plantilla = `<h1>${mensaje}</h1><a href="regresar al formulario></a>`;

        respuesta.send(plantilla);

    });
});

servidor.listen(4000,() => console.log("...ok"));

