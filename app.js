import express from 'express';
// import appUsuario from "./routers/usuario.js";
import dotenv from "dotenv";
dotenv.config();
const appExpress = express();

appExpress.use(express.json()); //Tranformar los datos enviados a json
// appExpress.use("/cliente", appUsuario);

let config = JSON.parse(process.env.MY_CONFIG);
appExpress.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`);
});