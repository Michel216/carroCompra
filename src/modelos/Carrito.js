const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
  producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
  valor: { type: Number, default: 0 },
  cantidad: { type: Number, default: 0 },
  descuento: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Carrito', carritoSchema);
