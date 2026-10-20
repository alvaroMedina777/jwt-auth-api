require("dotenv").config();

const variablesRequeridas = ["MONGODB_URI", "JWT_SECRET"];

for (const variable of variablesRequeridas) {
  if (!process.env[variable]?.trim()) {
    console.error(`Error: falta configurar la variable ${variable}`);
    process.exit(1);
  }
}

const express = require("express");
const connectionDB = require("./config/database");
const authRoutes = require("./routes/authRoutes")
const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);

async function iniciarServidor() {
    await connectionDB();

    app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor funcionando en el puerto ${process.env.PORT || 3000}`);
});
}

app.get("/", (req, res) => {
    res.send("Mi API esta funcionando")
})

iniciarServidor();