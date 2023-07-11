import express from 'express';
import appUsuario from "./routers/user.js";
import appBodegas from "./routers/bodegas.js";
import appProductos from "./routers/productos.js";
import appInventario from './routers/inventarios.js';
import dotenv from "dotenv";
dotenv.config();
const appExpress = express();

appExpress.use(express.json()); //Tranformar los datos enviados a json
appExpress.use("/usuarios", appUsuario);
appExpress.use("/bodegas", appBodegas);
appExpress.use("/productos", appProductos);
appExpress.use("/inventarios", appInventario)

let config = JSON.parse(process.env.MY_CONFIG);
appExpress.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`);
});