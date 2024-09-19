const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const authRoutes = require('./routes/authRoutes');
const Usertiti = require('./models/User');
const Delivery = require('./models/Solicitud');
const PORT = 4000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://cuentaparaelian12:HAayjRGRYOSk4F1B@cluster0.citmxdl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("MongoDB connected");
    });

app.use('/api/auth', authRoutes);

app.get("/api/users", async (req, res) => {
    try {
        const users = await Usertiti.find({});
        res.json(users);
    } catch {
        res.status(500).json({ error: 'Error al obtener los profesores' });
    }
})

app.get("/api/solicitudes", async (req, res) => {
    try {
        const deliverys = await Delivery.find({});
        res.json(deliverys);
    } catch {
        res.status(500).json({ error: 'Error al obtener las solicitudes' });
    }
})

app.listen(PORT, () => {
    console.log(`Servidor escuchando en https://localhost:${PORT}`)
})