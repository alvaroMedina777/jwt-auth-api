const mongoose = require("mongoose");

async function connectionDB() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/jwt_auth_api");
        console.log("Conexion exitosa")
    } catch (error) {
        console.error(error)
        throw error;
    }
}

module.exports = connectionDB;