const express = require('express');
const venta = require('../modelos/venta');
const detalleVenta = require('../modelos/detalleVenta');

const detalleVentaController = {
  listarPorVentaId: async (req, res) => {
    const ventaId = req.params.id;
    try {
      const detallesVenta = await venta.findById(ventaId).populate('detalle');
      console.log(detallesVenta);
      res.json(detallesVenta);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  insertar: async (req, res) => {
    const { producto, cantidad, subtotal } = req.body;
    try {
      const nuevodetalleVenta = await detalleVenta.create({
        producto,
        cantidad,
        subtotal,
      });
      res.json(nuevodetalleVenta);
    } catch (error) {
      console.error('Error al insertar el detalle de la venta:', error);
      res.status(500).json({ error: 'Error al insertar el detalle de la venta' });
    }
  },

  modificar: async (req, res) => {
    const detalleVentaId = req.params.id;
    const nuevosDatosdetalleVenta = req.body;
    try {
      const detalleVentaActualizado = await detalleVenta.findByIdAndUpdate(detalleVentaId, nuevosDatosdetalleVenta, { new: true });
      if (!detalleVentaActualizado) {
        return res.status(404).json({ error: 'Detalle de venta no encontrado' });
      }
      res.json(detalleVentaActualizado);
    } catch (error) {
      console.error(`Error al modificar el detalle de la venta con ID ${detalleVentaId}:`, error);
      res.status(500).json({ error: `Error al modificar el detalle de la venta con ID ${detalleVentaId}` });
    }
  },
};

module.exports = { detalleVentaController };