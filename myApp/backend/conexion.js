const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configurar conexión a MySQL
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '091294',
  database: 'urnaelectoral'
});

db.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
  } else {
    console.log('Conexión a la base de datos exitosa');
  }
});

// Endpoint para iniciar sesión
app.post('/login', async(req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT Persona.nombre  FROM Persona JOIN Alumno ON Alumno.id_persona = Persona.id_persona WHERE  Alumno.no_cuenta = ?';

  db.query(query, [password], (err, result) => {
    if (err) {
      return res.status(500).send('Error en la consulta');
    }

    if (result.length > 0) {
      res.json({ success: true, user: result[0] });
    } else {
      res.json({ success: false, message: 'Credenciales incorrectas' });
    }
  });
});
// Iniciar el servidor
app.listen(8100, () => {
  console.log('Servidor corriendo en el puerto 8080');
});
