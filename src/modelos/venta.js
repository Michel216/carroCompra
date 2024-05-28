const mongoose = require('mongoose');

const ventaSchema = new mongoose.Schema({
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
  detalle: { type: mongoose.Schema.Types.ObjectId, ref: 'DetalleVenta' },
  fecha: { type: Date, required: true },
  descuento: { type: Number, default: 0 },
  valor: { type: Number, default: 0 },

  activo: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Venta', ventaSchema);