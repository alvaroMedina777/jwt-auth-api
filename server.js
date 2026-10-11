const express = require("express");
const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Servidor funcionando en el puerto 3000");
});

app.get("/", (req, res) => {
    res.send("Mi API esta funcionando")
})