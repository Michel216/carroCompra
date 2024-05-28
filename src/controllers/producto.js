const express = require('express');
const Producto = require('../modelos/producto');
const bcryptjs = require('bcryptjs');

const productoController = {
  insertar: async (req, res) => {
    const {
      nombre,
      descripcion,
      precio,
      stock,
      stockMinimo
    } = req.body;
    try {
      const nuevoProducto = new Producto({
        nombre,
        descripcion,
        precio,
        stock,
        stockMinimo
      });
      await nuevoProducto.save();
      res.json(nuevoProducto);
    } catch (error) {
      console.error('Error al insertar el producto:', error);
      res.status(500).json({ error: 'Error al insertar el producto' });
    }
  },

  listarTodos: async (req, res) => {
    try {
      const productos = await Producto.find();
      res.json(productos);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      res.status(500).json({ error: 'Error al obtener los productos' });
    }
  },
  ListarActivos: async (req, res) => {
    try {
      const productosActivos = await Producto.find({ activo: true });
      if (!productosActivos || productosActivos.length === 0) {
        return res.status(404).json({ error: 'Productos activos no encontrados' });
      }

      res.json(productosActivos);
    } catch (error) {
      console.error('Error al buscar los productos activos:', error);
      res.status(500).json({ error: 'Error al buscar los productos activos' });
    }
  },

  ListarInactivos: async (req, res) => {
    try {
      const productosDesac = await Producto.find({ activo: false });
      if (!productosDesac || productosDesac.length === 0) {
        return res.status(404).json({ error: 'Productos activos no encontrados' });
      }

      res.json(productosDesac);
    } catch (error) {
      console.error('Error al buscar los productos activos:', error);
      res.status(500).json({ error: 'Error al buscar los productos activos' });
    }
  },

  obtenerPorId: async (req, res) => {
    const productoId = req.params.id;
    try {
      const producto = await Producto.findById(productoId);
      if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.json(producto);
    } catch (error) {
      console.error(`Error al obtener el producto con ID ${productoId}:`, error);
      res.status(500).json({ error: `Error al obtener el producto con ID ${productoId}` });
    }
  },

  listarPorStockMinimo: async (req, res) => {

    try {
      const stockMinimo = req.params.stockMinimo;
      const productos = await Producto.find({ stockMinimo: { $lte: stockMinimo } });
      res.json(productos);
    } catch (error) {
      console.error(`Error al obtener los productos con stock por debajo de ${stockMinimo}:`, error);
      res.status(500).json({ error: `Error al obtener los productos con stock por debajo de ${stockMinimo}` });
    }
  },

  listarPorPrecioSuperiorA: async (req, res) => {
    try {
      const precio = req.params.precio;
      const productos = await Producto.find({ precio: { $gt: precio } });
      res.json(productos);
    } catch (error) {
      console.error(`Error al obtener los productos con precio por encima de ${precio}:`, error);
      res.status(500).json({ error: `Error al obtener los productos con precio por encima de ${precio}` });
    }
  },

  modificar: async (req, res) => {
    const productoId = req.params.id;
    try {
      const nuevosDatosProducto = req.body;
      const productoActualizado = await Producto.findByIdAndUpdate(productoId, nuevosDatosProducto, { new: true });
      if (!productoActualizado) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.json(productoActualizado);
    } catch (error) {
      console.error(`Error al modificar el producto con ID ${productoId}:`, error);
      res.status(500).json({ error: `Error al modificar el producto con ID ${productoId}` });
    }
  },

  activar: async (req, res) => {
    const productoId = req.params.id;
    try {
      const productoActivado = await Producto.findByIdAndUpdate(productoId, { activo: true }, { new: true });
      if (!productoActivado) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.json("Producto Activado");
    } catch (error) {
      console.error(`Error al activar el producto con ID ${productoId}:`, error);
      res.status(500).json({ error: `Error al activar el producto con ID ${productoId}` });
    }
  },

  desactivar: async (req, res) => {
    const productoId = req.params.id;
    try {
      const productoDesactivado = await Producto.findByIdAndUpdate(productoId, { activo: false }, { new: true });
      if (!productoDesactivado) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.json("Producto Desactivado");
    } catch (error) {
      console.error(`Error al desactivar el producto con ID ${productoId}:`, error);
      res.status(500).json({ error: `Error al desactivar el producto con ID ${productoId}` });
    }
  },
};
module.exports = { productoController };

