import { Router } from "express";
import mysql from "mysql2";
const appUsuario = Router();
let con = undefined;

appUsuario.use((req, res, next)=>{
    try {
        con = mysql.createPool({
            host: "localhost",
            user: "campus",
            password: "campus2023",
            database: "admissionTest",
            port: 3306
    });
    next();        
    } catch (error) {
        res.status(500).send('Bad connection')
    }
})

// ? Al agregar el signo "?"  decimos que es opcional el parametro
appUsuario.post("/", (req, res) => {
    con.query(
        /*sql*/ `INSERT INTO bodegas SET ?`,
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
})

appUsuario.get("/", (req, res) => {
    con.query(
        /*sql*/ `SELECT * FROM bodegas ORDER BY nombre`,
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
        /*sql*/ `UPDATE bodegas SET ? WHERE id= ?`,
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
        /*sql*/ `DELETE FROM bodegas WHERE id= ?`,
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