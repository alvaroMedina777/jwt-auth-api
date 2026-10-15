const mongoose = require("mongoose");

async function connectionDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Conexion exitosa");
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = connectionDB;