const mongoose = require('mongoose');

const detalleVentaSchema = new mongoose.Schema({
  producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
  cantidad: { type: Number, required: true },
  subtotal: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('DetalleVenta', detalleVentaSchema);

