//import  express  from "express";
const express = require("express");
var cors = require('cors');
var bodyparser = require('body-parser');
var morgan = require('morgan');
var myData = []; 

const app = express();
const corsOpciones = {
    origin: '*',
    optionSuccessStatus: 200
}

app.use(cors(corsOpciones));
app.use(morgan('combined'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));
app.disable('etag');

app.get('/hola',(req,res) => {
    res.send('87');
});


app.post("/Insertar", (req,res) => {
            console.log("/Insertar")
            myData.push(req.body)
            res.setHeader('Access-Control-Allow-Headers','Content-Type');
            res.setHeader('Access-Control-Allow-Mathods','GET,PUT,POST,DELETE,OPTIONS');
            res.statusCode = 200;
            res.contentType('application/json').json({
                results: 'Ok',
                codigo: 200
            });
})

app.post("/obtener_todas", (req,res) => {
            console.log("/obtener_quinela")
            res.setHeader('Access-Control-Allow-Headers','Content-Type');
            res.setHeader('Access-Control-Allow-Mathods','GET,PUT,POST,DELETE,OPTIONS');
            res.statusCode = 200;
            res.contentType('application/json').json({
                results: myData,
                codigo: 200
            });
})

module.exports = app;