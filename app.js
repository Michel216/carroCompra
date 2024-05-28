const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config();

const carritoRouter = require('./src/routers/carrito');
const clienteRouter = require('./src/routers/cliente');
const detalleVentaRouter = require('./src/routers/detalleVenta');
const productoRouter = require('./src/routers/producto');
const usuarioRouter = require('./src/routers/usuario');
const ventaRouter = require('./src/routers/venta');

const app = express();
app.use(cors())
app.use(express.json());

app.use('/usuario', usuarioRouter);
app.use('/producto', productoRouter);
app.use('/cliente', clienteRouter);
app.use('/venta', ventaRouter);
app.use('/detalleVenta', detalleVentaRouter);
app.use('/carrito', carritoRouter);

// puerto trabajado
const PORT = process.env.PORT || 3000;

// conectar con mongo
mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => {
    console.log('Conectado a MongoDB');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error de conexión a MongoDB:', error);
  });