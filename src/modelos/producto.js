const mongoose = require('mongoose');
const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
  stockMinimo: { type: Number, required: true },
  activo: { type: Boolean, default: true },
}, { timestamps: true });


module.exports = mongoose.model('Producto', productoSchema);
