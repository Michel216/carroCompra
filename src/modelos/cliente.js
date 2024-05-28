const mongoose = require('mongoose');
const clienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  direccion: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefono: { type: String, required: true },
  documento: { type: String, required: true, unique: true },
  activo: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Cliente', clienteSchema);
