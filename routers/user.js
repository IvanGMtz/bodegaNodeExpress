import { Router } from "express";
import con from "../server/connection.js"
const appUsuario = Router();


// ? Al agregar el signo "?"  decimos que es opcional el parametro
appUsuario.post("/", (req, res) => {
    con.query(
        /*sql*/ `INSERT INTO users SET ?`,
        req.body,
        (err,data,fils)=>{
            console.log(err);
            console.log(data);
            console.log(fils);
            data.affectedRows+=200;
            let result = req.body;
            result.id= data.insertId;
            res.status(data.affectedRows).send(result);
        }
    );
//res.status(202).send("It's worked"); //Sintaxis para crear tus propios errores o aciertos
})

appUsuario.get("/", (req, res) => {
    con.query(
        /*sql*/ `SELECT * FROM users`,
        req.body,
        (err,data,fils)=>{
            console.log(err);
            console.log(data);
            console.log(fils);
            res.send(data)
        }
    );
})

appUsuario.put("/:id", (req, res) => {
    con.query(
        /*sql*/ `UPDATE users SET ? WHERE id= ?`,
        [req.body, req.params.id],
        (err,data,fils)=>{
            console.log(err);
            console.log(data);
            console.log(fils);
            res.send(data)
        }
    );
})

appUsuario.delete("/:id", (req, res) => {
    con.query(
        /*sql*/ `DELETE FROM users WHERE id= ?`,
        req.params.id,
        (err,data,fils)=>{
            console.log(err);
            console.log(data);
            console.log(fils);
            res.send(data)
        }
    );
})



export default appUsuario;