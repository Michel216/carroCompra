const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, min: 6 },
  activo: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("usuario", usuarioSchema)
