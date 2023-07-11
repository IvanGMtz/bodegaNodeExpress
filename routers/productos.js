import { Router } from "express";
import con from "../server/connection.js"
const appProduct = Router();

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
