// const express = require('express');
const usuario = require('../modelos/usuario')
const {generarJWT}= require('../middlewares/validarJWT')
const bcryptjs = require('bcryptjs');

const usuarioController = {
  listarTodos: async (req, res) => {
    try {
      const usuarios = await usuario.find();
      res.json(usuarios);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
  },
  ListarActivos: async (req, res) => {
    try {
      const usuariosActivos = await usuario.find({ activo: true });
      if (!usuariosActivos || usuariosActivos.length === 0) {
        return res.status(404).json({ error: 'Usuarios activos no encontrados' });
      }

      res.json(usuariosActivos);
    } catch (error) {
      console.error('Error al buscar los usuarios activos:', error);
      res.status(500).json({ error: 'Error al buscar los usuarios activos' });
    }
  },

  ListarDesactivos: async (req, res) => {
    try {
      const usuariosDesac = await usuario.find({ activo: false });
      if (!usuariosDesac || usuariosDesac.length === 0) {
        return res.status(404).json({ error: 'Usuarios activos no encontrados' });
      }

      res.json(usuariosDesac);
    } catch (error) {
      console.error('Error al buscar los usuarios activos:', error);
      res.status(500).json({ error: 'Error al buscar los usuarios activos' });
    }
  },

  buscarPorId: async (req, res) => {
    try {
      const idUsuario = req.params.id;

      const usuarioEncontrado = await usuario.findById(idUsuario);

      if (!usuarioEncontrado) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      res.json({ usuario: usuarioEncontrado });
    } catch (error) {
      console.error('Error al buscar el usuario por id:', error);
      res.status(500).json({ error: 'Error al buscar el usuario por id' });
    }
  },

  insertar: async (req, res) => {
    try {
      const { nombre, email, password } = req.body;

      const nuevoUsuario = new usuario({ nombre, email, password });
      const salt = bcryptjs.genSaltSync();
      nuevoUsuario.password = bcryptjs.hashSync(password, salt)
      await nuevoUsuario.save();

      res.json({ nuevoUsuario });
    } catch (error) {
      res.status(500).json({ error: 'Error al insertar el usuario' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await usuario.findOne({ email });
      console.log('Usuario encontrado:', user);

      if (!user) {
        console.log('Usuario / Password no son correctos');
        return res.status(404).json({ error: 'Usuario / Password no son correctos' });
      }
      const validPassword = bcryptjs.compareSync(password, user.password);
      if (!validPassword) {
          return res.status(401).json({
              msg: "Usuario / Password no son correctos"
          })
      }
      const token = await generarJWT(user._id);

      res.json({
          usuario: user,
          token
      })
    } catch (error) {
      console.error('Error en el login:', error);
      res.status(500).json({ error: 'Error en el login, por favor intenta nuevamente' });
    }
  },

  cambiarContrasena: async (req, res) => {
    const usuarioId = req.params.id;
    try {
      const { password, newPassword } = req.body;
      const usuarioEncontrado = await usuario.findById(usuarioId);
      if (!usuarioEncontrado) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      const passwordMatch  = bcryptjs.compareSync(password, usuarioEncontrado.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Error' });
      }
      const salt = bcryptjs.genSaltSync();
      usuarioEncontrado.password = bcryptjs.hashSync(newPassword, salt)
      await usuarioEncontrado.save();

      res.json({ message: 'Cambio exitoso' });
    } catch (error) {
      console.error(`Error al cambiar la contraseña del usuario con ID ${usuarioId}:`, error);
      res.status(500).json({ error: `Error al cambiar la contraseña del usuario con ID ${usuarioId}` });
    }
  },
  modificar: async (req, res) => {
    const usuarioId = req.params.id;
    try {
      const nuevosDatosusuario = req.body;

      const usuarioActualizado = await usuario.findByIdAndUpdate(usuarioId, nuevosDatosusuario, { new: true });
      if (!usuarioActualizado) {
        return res.status(404).json({ error: 'usuario no encontrado' });
      }
      res.json({ mensaje: "Usuario Actualizado"});

    } catch (error) {
      console.error(`Error al modificar el usuario con ID ${usuarioId}:`, error);
      res.status(500).json({ error: `Error al modificar el usuario con ID ${usuarioId}` });
    }
  },

  activar: async (req, res) => {
    const usuarioId = req.params.id;
    try {
      const usuarioActivado = await usuario.findByIdAndUpdate(usuarioId, { activo: true }, { new: true });
      if (!usuarioActivado) {
        return res.status(404).json({ error: 'usuario no encontrado' });
      }
      res.json("Usuario Activado");
    } catch (error) {
      console.error(`Error al activar el usuario con ID ${usuarioId}:`, error);
      res.status(500).json({ error: `Error al activar el usuario con ID ${usuarioId}` });
    }
  },

  desactivar: async (req, res) => {
    const usuarioId = req.params.id;
    try {
      const usuarioDesactivado = await usuario.findByIdAndUpdate(usuarioId, { activo: false }, { new: true });
      if (!usuarioDesactivado) {
        return res.status(404).json({ error: 'usuario no encontrado' });
      }
      res.json("Usuario Desactivado");
    } catch (error) {
      console.error(`Error al desactivar el usuario con ID ${usuarioId}:`, error);
      res.status(500).json({ error: `Error al desactivar el usuario con ID ${usuarioId}` });
    }
  },
};

module.exports = { usuarioController };
