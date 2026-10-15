const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios"
            });
        }

        const usuarioExistente = await User.findOne({ email });

        if (usuarioExistente) {
            return res.status(409).json({
                mensaje: "Este email ya está registrado"
            });
        }

        const passwordHasheada = await bcrypt.hash(password, 10);

        const nuevoUsuario = new User({
            username,
            email,
            password: passwordHasheada
        });

        await nuevoUsuario.save();

        return res.status(201).json({
            mensaje: "Usuario registrado correctamente"
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                mensaje: "Este email ya está registrado"
            });
        }

        console.error(error);

        return res.status(500).json({
            mensaje: "Error interno del servidor"
        });
    }
});router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios"
            });
        }

        const usuarioExistente = await User.findOne({ email });

        if (usuarioExistente) {
            return res.status(409).json({
                mensaje: "Este email ya está registrado"
            });
        }

        const passwordHasheada = await bcrypt.hash(password, 10);

        const nuevoUsuario = new User({
            username,
            email,
            password: passwordHasheada
        });

        await nuevoUsuario.save();

        return res.status(201).json({
            mensaje: "Usuario registrado correctamente"
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                mensaje: "Este email ya está registrado"
            });
        }

        console.error(error);

        return res.status(500).json({
            mensaje: "Error interno del servidor"
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                mensaje: "Email y contraseña son obligatorios"
            });
        }

        const usuario = await User.findOne({ email });

        if (!usuario) {
            return res.status(401).json({
                mensaje: "Credenciales incorrectas"
            });
        }

        const passwordCorrecta = await bcrypt.compare(
            password,
            usuario.password
        );

        if (!passwordCorrecta) {
            return res.status(401).json({
                mensaje: "Credenciales incorrectas"
            });
        }

        const token = jwt.sign(
            {
                id: usuario._id,
                email: usuario.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || "1h"
            }
        );

        return res.status(200).json({
            mensaje: "Inicio de sesión exitoso",
            token
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensaje: "Error interno del servidor"
        });
    }
});

module.exports = router;