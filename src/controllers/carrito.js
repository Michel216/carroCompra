const express = require('express');
const Carrito = require('../modelos/Carrito');

const carritoController = {
  listarPorClienteId: async (req, res) => {
    const clienteId = req.params.clienteId;
    try {
      const carritoCliente = await Carrito.find({ cliente: clienteId });
      res.json(carritoCliente);
    } catch (error) {
      console.error(`Error al obtener el carrito del cliente con ID ${clienteId}:`, error);
      res.status(500).json({ error: `Error al obtener el carrito del cliente con ID ${clienteId}` });
    }
  },

  insertar: async (req, res) => {
    const { cliente, producto, valor, cantidad, descuento } = req.body;
    try {
      const nuevoItemCarrito = await Carrito.create({
        cliente,
        producto,
        valor,
        cantidad,
        descuento,
      });
      res.json(nuevoItemCarrito);
    } catch (error) {
      console.error('Error al insertar el item en el carrito:', error);
      res.status(500).json({ error: 'Error al insertar el item en el carrito' });
    }
  },

  eliminar: async (req, res) => {
    const itemId = req.params.id;
    try {
      const itemEliminado = await Carrito.findByIdAndDelete(itemId);
      if (!itemEliminado) {
        return res.status(404).json({ error: 'Item del carrito no encontrado' });
      }
      res.json({ message: 'Item del carrito eliminado correctamente' });
    } catch (error) {
      console.error(`Error al eliminar el item del carrito con ID ${itemId}:`, error);
      res.status(500).json({ error: `Error al eliminar el item del carrito con ID ${itemId}` });
    }
  },

  modificar: async (req, res) => {
    const itemId = req.params.id;
    const nuevosDatosItem = req.body;
    try {
      const itemActualizado = await Carrito.findByIdAndUpdate(itemId, nuevosDatosItem, { new: true });
      if (!itemActualizado) {
        return res.status(404).json({ error: 'Item del carrito no encontrado' });
      }
      res.json(itemActualizado);
    } catch (error) {
      console.error(`Error al modificar el item del carrito con ID ${itemId}:`, error);
      res.status(500).json({ error: `Error al modificar el item del carrito con ID ${itemId}` });
    }
  },
};

module.exports = carritoController;
