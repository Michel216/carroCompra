const express = require('express');
const venta = require('../modelos/venta');
const bcrypt = require('bcrypt');

const ventaController = {
  insertar: async (req, res) => {
    const { cliente, detalle, fecha, descuento, valor } = req.body;
    try {
      const nuevaVenta = new venta({
        cliente,
        detalle,
        fecha,
        descuento,
        valor

      });
      await nuevaVenta.save()
      res.json(nuevaVenta);
    } catch (error) {
      console.error('Error al insertar la venta:', error);
      res.status(500).json({ error: 'Error al insertar la venta' });
    }
  },
  listarTodos: async (req, res) => {
    try {
      const ventas = await venta.find().populate('cliente').populate('detalle');
      res.json(ventas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  listarActivos: async (req, res) => {
    try {
      const ventasActivas = await venta.find({ activo: true }).populate('cliente').populate('detalle');
      res.json(ventasActivas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  listarInactivos: async (req, res) => {
    try {
      const ventasInactivas = await venta.find({ activo: false }).populate('cliente').populate('detalle');
      res.json(ventasInactivas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  obtenerPorId: async (req, res) => {
    const ventaId = req.params.id;
    try {
      const ventas = await venta.findById(ventaId).populate('cliente').populate('detalle');
      if (!ventas) {
        return res.status(404).json({ message: 'Venta no encontrada' });
      }
      res.json(ventas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  listarPorClienteId: async (req, res) => {
    const clienteId = req.params.clienteId;
    try {
      const ventasCliente = await venta.find({ cliente: clienteId }).populate('cliente').populate('detalle');
      res.json(ventasCliente);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  listarEntreFechas: async (req, res) => {
    const { fechaInicio, fechaFin } = req.body;
    try {
      const ventas = await venta.find({ fecha: { $gte: fechaInicio, $lte: fechaFin } })
        .populate('cliente')
        .populate('detalle');
      res.json(ventas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  listarValorSuperiorA: async (req, res) => {
    const valor = req.params.valor;
    try {
      const ventas = await venta.find({ valor: { $gt: valor } }).populate('cliente').populate('detalle');
      res.json(ventas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  totalVentasEntreFechas: async (req, res) => {
    const { fechaInicio, fechaFin } = req.body;
    try {
      const total = await venta.aggregate([
        {
          $match: {
            fecha: { $gte: new Date(fechaInicio), $lte: new Date(fechaFin) }
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$valor' }
          }
        },
        {
          $project: {
            _id: 0, // Excluye el campo _id de la respuesta
            total: 1 // Incluye solo el campo total en la respuesta
          }
        }

      ]);
      res.json(total);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  totalDescuento: async (req, res) => {
    try {
      const total = await venta.aggregate([
        {
          $group: {
            _id: null,
            totalDescuento: { $sum: '$descuento' }
          }
        },
        {
          $project: {
            _id: 0, 
            totalDescuento: 1 
          }
        }
      ]);
      res.json(total);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  modificar: async (req, res) => {
    const ventaId = req.params.id;
    try {
      const nuevosDatosVenta = req.body;

      const ventaActualizada = await venta.findByIdAndUpdate(ventaId, nuevosDatosVenta, { new: true });
      if (!ventaActualizada) {
        return res.status(404).json({ error: 'Venta no encontrada' });
      }
      res.json(ventaActualizada);
    } catch (error) {
      console.error(`Error al modificar la venta con ID ${ventaId}:`, error);
      res.status(500).json({ error: `Error al modificar la venta con ID ${ventaId}` });
    }
  },

  activar: async (req, res) => {
    const ventaId = req.params.id;
    try {
      const ventaActivada = await venta.findByIdAndUpdate(ventaId, { activo: true }, { new: true });
      if (!ventaActivada) {
        return res.status(404).json({ error: 'Venta no encontrada' });
      }
      res.json(ventaActivada);
    } catch (error) {
      console.error(`Error al activar la venta con ID ${ventaId}:`, error);
      res.status(500).json({ error: `Error al activar la venta con ID ${ventaId}` });
    }
  },

  desactivar: async (req, res) => {
    const ventaId = req.params.id;
    try {
      const ventaDesactivada = await venta.findByIdAndUpdate(ventaId, { activo: false }, { new: true });
      if (!ventaDesactivada) {
        return res.status(404).json({ error: 'Venta no encontrada' });
      }
      res.json(ventaDesactivada);
    } catch (error) {
      console.error(`Error al desactivar la venta con ID ${ventaId}:`, error);
      res.status(500).json({ error: `Error al desactivar la venta con ID ${ventaId}` });
    }
  },
};

module.exports = { ventaController };
