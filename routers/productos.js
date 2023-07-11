import { Router } from "express";
import mysql from "mysql2";
const appProduct = Router();
let con = undefined;

appProduct.use((req, res, next) => {
  try {
    con = mysql.createPool({
      host: "localhost",
      user: "root",
      password: "",
      database: "admissionTest",
      port: 3306,
    });
    next();
  } catch (error) {
    res.status(500).send("Bad connection");
  }
});

appProduct.post("/", (req, res) => {
  con.query(
    /*sql*/ `INSERT INTO productos SET ?`,
    req.body,
    (err, data, fils) => {
      console.log(err);
      console.log(data);
      console.log(fils);
      data.affectedRows += 200;
      let result = req.body;
      result.id = data.insertId;
      res.status(data.affectedRows).send(result);
    }
  );
});

appProduct.get("/", (req, res) => {
  con.query(
    /*sql*/ `SELECT productos.*, SUM(inventarios.cantidad) AS Total FROM productos 
              INNER JOIN inventarios ON productos.id = inventarios.id_producto 
              GROUP BY productos.id 
              ORDER BY Total DESC`,
    (err, data, fils) => {
      console.log(err);
      console.log(data);
      console.log(fils);
      res.send(data);
    }
  );
});

appProduct.put("/:id", (req, res) => {
  con.query(
    /*sql*/ `UPDATE productos SET ? WHERE id= ?`,
    [req.body, req.params.id],
    (err, data, fils) => {
      console.log(err);
      console.log(data);
      console.log(fils);
      res.send(data);
    }
  );
});

appProduct.delete("/:id", (req, res) => {
  con.query(
    /*sql*/ `DELETE FROM productos WHERE id= ?`,
    req.params.id,
    (err, data, fils) => {
      console.log(err);
      console.log(data);
      console.log(fils);
      res.send(data);
    }
  );
});

export default appProduct;
