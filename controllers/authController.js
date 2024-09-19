const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usertiti = require('../models/User');
const Delivery = require('../models/Solicitud');
const mongoose = require("mongoose");

exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await Usertiti.findOne({ email: email, pass: password });
      if (!user) return res.status(404).json({ message: 'Correo o contraseña no Incorrectos' });

      const token = jwt.sign({ id: user._id }, "jwebtoken", { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Error en el login', error });
    }
  };
exports.register = async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      const user = await new Usertiti({ username: username, email: email, pass: password });
      if (!user) return res.status(404).json({ message: 'No se pudo registrar' });

      const token = jwt.sign({ id: user._id }, "jwebtoken", { expiresIn: '1h' });
      user.save().then(() => {
            console.log("Usuario Registrado")
        });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Error en el Register', error });
    }
  };
  exports.solicitud = async (req, res) => {
    const { vehicleType, licensePlate, situation, address, currentTime } = req.body;
    console.log(req.body);


    // Validación de los datos requeridos
    if (!vehicleType || !licensePlate || !situation || !address || !currentTime) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    try {
        const solicitudDelivery = new Delivery({
            tipo: vehicleType,
            placa: licensePlate,
            situation: situation,
            address: address,
            time: currentTime,
        });

        // Guardar la solicitud y esperar a que se complete
        await solicitudDelivery.save();
        console.log("Solicitud enviada y registrada");
        
        // Responder al cliente
        return res.status(201).json({ message: 'Solicitud enviada con éxito', data: solicitudDelivery });
    } catch (error) {
        console.error('Error en el Delivery:', error);
        return res.status(500).json({ message: 'Error en el Delivery', error });
    }
};
