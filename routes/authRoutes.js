const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");


router.post("/register", async (req, res) => {
    const { nombre, apellido, correo, password } = req.body;
    const usuarioExistente = await User.findOne({ correo });

    if(usuarioExistente) {
        return res.status(409).json({
            mensaje: "Este correo ya está registrado"
        })
    }
})

module.exports = router;