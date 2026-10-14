const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

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
});

module.exports = router;