
//import app from "./app.js";
const app = require("./router/app");


// Direccion port y ip debe ser la docker, cambiar 
app.listen(4000,()=>{
    console.log("Servidor ejecutandose puerto 4000");
});