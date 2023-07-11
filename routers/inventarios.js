import { Router } from "express";
import mysql from "mysql2";
const appInventario = Router();
let con = undefined;

appInventario.use((req, res, next) => {
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

appInventario.post("/", (req, res) => {
  const { id_producto, id_bodega, cantidad } = req.body;

  // Verificar si la combinación de id_producto y id_bodega ya existe en la tabla de inventarios
  con.query(
    /*sql*/ `SELECT * FROM inventarios WHERE id_producto = ? AND id_bodega = ?`,
    [id_producto, id_bodega],
    (err, data, fils) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal server error");
      } else if (data.length === 0) {
        // Si la combinación no existe, realizar un INSERT en la tabla de inventarios
        con.query(
          /*sql*/ `INSERT INTO inventarios (id_producto, id_bodega, cantidad) VALUES (?, ?, ?)`,
          [id_producto, id_bodega, cantidad],
          (err, data, fils) => {
            if (err) {
              console.log(err);
              res.status(500).send("Internal server error");
            } else {
              console.log(data);
              res.status(201).send({
                id: data.insertId,
                id_producto,
                id_bodega,
                cantidad,
              });
            }
          }
        );
      } else {
        // Si la combinación ya existe, realizar un UPDATE en la tabla de inventarios
        const currentCantidad = data[0].cantidad;
        const newCantidad = currentCantidad + cantidad;

        con.query(
          /*sql*/ `UPDATE inventarios SET cantidad = ? WHERE id_producto = ? AND id_bodega = ?`,
          [newCantidad, id_producto, id_bodega],
          (err, data, fils) => {
            if (err) {
              console.log(err);
              res.status(500).send("Internal server error");
            } else {
              console.log(data);
              res.status(200).send({
                id_producto,
                id_bodega,
                cantidad: newCantidad,
              });
            }
          }
        );
      }
    }
  );
});

appInventario.get("/", (req, res) => {
  con.query(/*sql*/ `SELECT * FROM inventarios`, (err, data, fils) => {
    console.log(err);
    console.log(data);
    console.log(fils);
    res.send(data);
  });
});

appInventario.put("/:id", (req, res) => {
  con.query(
    /*sql*/ `UPDATE inventarios SET ? WHERE id= ?`,
    [req.body, req.params.id],
    (err, data, fils) => {
      console.log(err);
      console.log(data);
      console.log(fils);
      res.send(data);
    }
  );
});

appInventario.delete("/:id", (req, res) => {
  con.query(
    /*sql*/ `DELETE FROM inventarios WHERE id= ?`,
    req.params.id,
    (err, data, fils) => {
      console.log(err);
      console.log(data);
      console.log(fils);
      res.send(data);
    }
  );
});

export default appInventario;