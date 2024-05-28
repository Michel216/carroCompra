const express = require('express');
const cliente = require('../modelos/cliente');
const bcrypt = require('bcrypt');

const clienteController = {
  insertar: async (req, res) => {
    const {
      nombre,
      direccion,
      email,
      telefono,
      documento,
    } = req.body;
    try {
      const nuevocliente = new cliente({
        nombre,
        direccion,
        email,
        telefono,
        documento,
      });
      await nuevocliente.save()
      res.json(nuevocliente);
    } catch (error) {
      console.error('Error al insertar el cliente:', error);
      res.status(500).json({ error: 'Error al insertar el cliente' });
    }
  },

  listarTodos: async (req, res) => {
    try {
      const clientes = await cliente.find();
      res.json(clientes);
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
      res.status(500).json({ error: 'Error al obtener los clientes' });
    }
  },

  obtenerPorId: async (req, res) => {
    const clienteId = req.params.id;
    try {
      const clienteXId = await cliente.findById(clienteId);
      if (!clienteXId) {
        return res.status(404).json({ error: 'cliente no encontrado' });
      }
      res.json(clienteXId);
    } catch (error) {
      console.error(`Error al obtener el cliente con ID ${clienteId}:`, error);
      res.status(500).json({ error: `Error al obtener el cliente con ID ${clienteId}` });
    }
  },

  modificar: async (req, res) => {
    const clienteId = req.params.id;
    const nuevosDatoscliente = req.body;
    try {
      const clienteActualizado = await cliente.findByIdAndUpdate(clienteId, nuevosDatoscliente, { new: true });
      if (!clienteActualizado) {
        return res.status(404).json({ error: 'cliente no encontrado' });
      }
      res.json(clienteActualizado);
    } catch (error) {
      console.error(`Error al modificar el cliente con ID ${clienteId}:`, error);
      res.status(500).json({ error: `Error al modificar el cliente con ID ${clienteId}` });
    }
  },

  activar: async (req, res) => {
    const clienteId = req.params.id;
    try {
      const clienteActivado = await cliente.findByIdAndUpdate(clienteId, { activo: true }, { new: true });
      if (!clienteActivado) {
        return res.status(404).json({ error: 'cliente no encontrado' });
      }
      res.json("Cliente Activo");
    } catch (error) {
      console.error(`Error al activar el cliente con ID ${clienteId}:`, error);
      res.status(500).json({ error: `Error al activar el cliente con ID ${clienteId}` });
    }
  },

  desactivar: async (req, res) => {
    const clienteId = req.params.id;
    try {
      const clienteDesactivado = await cliente.findByIdAndUpdate(clienteId, { activo: false }, { new: true });
      if (!clienteDesactivado) {
        return res.status(404).json({ error: 'cliente no encontrado' });
      }
      res.json("Cliente Inactivo");
    } catch (error) {
      console.error(`Error al desactivar el cliente con ID ${clienteId}:`, error);
      res.status(500).json({ error: `Error al desactivar el cliente con ID ${clienteId}` });
    }
  },

  listarActivos: async (req, res) => {
    try {
      const clientesActivos = await cliente.find({ activo: true });
      res.json(clientesActivos);
    } catch (error) {
      console.error('Error al obtener los clientes activos:', error);
      res.status(500).json({ error: 'Error al obtener los clientes activos' });
    }
  },

  listarInactivos: async (req, res) => {
    try {
      const clientesInactivos = await cliente.find({ activo: false });
      res.json(clientesInactivos);
    } catch (error) {
      console.error('Error al obtener los clientes inactivos:', error);
      res.status(500).json({ error: 'Error al obtener los clientes inactivos' });
    }
  },
};

module.exports = { clienteController };