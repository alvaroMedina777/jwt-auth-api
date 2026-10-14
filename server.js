const express = require("express");
const connectionDB = require("./config/database");
const authRoutes = require("./routes/authRoutes")
const app = express();

app.use(express.json());
app.use("/auth", authRoutes);

async function iniciarServidor() {
    await connectionDB();

    app.listen(3000, () => {
    console.log("Servidor funcionando en el puerto 3000");
});
}

app.get("/", (req, res) => {
    res.send("Mi API esta funcionando")
})

iniciarServidor();