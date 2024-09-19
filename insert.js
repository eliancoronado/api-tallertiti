const mongoose = require('mongoose');

// Conectar a la base de datos
mongoose.connect("mongodb+srv://cuentaparaelian12:HAayjRGRYOSk4F1B@cluster0.citmxdl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Definir el esquema y modelo del curso
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    email: String,
    pass: String,
});

const Usertiti = mongoose.model('Usertiti', userSchema);

// Insertar un nuevo curso
const curso1 = new Usertiti({
    username: "Elian Coronado",
    email: "cuentaparaelian12@gmail.com",
    pass: "elian1234@"
});

curso1.save()
    .then(() => {
        console.log('Curso insertado correctamente');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error al insertar el curso:', err);
        mongoose.connection.close();
    })