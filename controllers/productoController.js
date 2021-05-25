let db = require('../models/dbconexion');
var express = require('express');
const publicPath = require('../publicPath');
var app = express();

const publicImg = __dirname+'/images/';

let productos = {
    listar(req, res) {
        let sql = "SELECT * FROM productos";
        db.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                res.json(result);
            }
        });
    },
    store(req, res) {
        const { nombre, precio } = req.body;
        // console.log(req.files);
        // return ;
        // console.log(publicPath);
        // return ;
        const { imagen } = req.files;
        const imgUrlStorage = `${publicPath}/images/${imagen.name}`;
        const imgUrlSave = 'images/'+imagen.name;
        let sql = "INSERT INTO productos(nombre,precio,imagen) VALUES(?,?,?)";
        db.query(sql, [nombre, precio, imgUrlSave], function (err, producto) {
            imagen.mv(imgUrlStorage, function (err) {
                if (err)
                    return res.status(500).json(err);
                res.json(producto);
            });
        });
    },
    show(req, res) {
        const { id } = req.params;
        let sql = "SELECT * FROM productos WHERE id=?";
        db.query(sql, [id], function (err, rowData) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                res.json(rowData[0]);
            }
        });
    },
    edit(req, res) {
        const { id, nombre, precio } = req.body;
        const { imagen } = req.files;
        if (imagen) {
            console.log('SI HAY IMAGEN');
            const imgUrlStorage = `${publicPath}/images/${imagen.name}`;
            const imgUrlSave = 'images/'+imagen.name;
            let sql = "UPDATE productos SET nombre=?, precio=?, imagen=? WHERE id=?";
            db.query(sql, [nombre, precio,imgUrlSave, id], function (err, newData) {
                console.log(err,newData);
                imagen.mv(imgUrlStorage, function (err) {
                    if (err)
                        return res.status(500).json(err);
                    res.json(newData);
                });
                // if (err) {
                    // res.sendStatus(500);
                // } else {
                    // res.json(newData);
                // }
            });
        }else{
            console.log('NO HAY IMAGEN');
            let sql = "UPDATE productos SET nombre=?, precio=? WHERE id=?";
            db.query(sql, [nombre, precio, id], function (err, newData) {
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.json(newData);
                }
            });
        }
    },
    delete(req, res) {
        const { id } = req.params;
        let sql = "DELETE FROM productos WHERE id=?";
        db.query(sql, [id], function (err, newData) {
            if (err) {
                console.log(err);
                res.json(err);
            } else {
                res.json('Ok');
            }
        });
    }
}

module.exports = productos;
