const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configurar conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
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
  const query = 'SELECT persona.nombre  FROM persona JOIN alumno ON alumno.id_persona = persona.id_persona WHERE  alumno.no_cuenta = ?';

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

app.get('/alumnoInfo', (req, res) => {
  const noCuenta = req.query.no_cuenta;  // Obtenemos el no_cuenta de los parámetros de la URL
  
  const query = `
    SELECT persona.nombre AS persona_nombre, carrera.nombre AS carrera_nombre, organizacion.nombre AS organizacion_nombre
    FROM alumno
    JOIN persona ON persona.id_persona = alumno.id_alumno
    JOIN carrera ON carrera.id_carrera = alumno.id_carrera
    JOIN organizacion ON carrera.id_Organizacion = organizacion.id_organizacion
    WHERE alumno.no_cuenta = ?`;

  db.query(query, [noCuenta], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error en la consulta' });
    }

    if (result.length > 0) {
      res.json({ success: true, data: result[0] });  // Devolvemos el primer resultado de la consulta
    } else {
      res.json({ success: false, message: 'No se encontraron datos para el no_cuenta proporcionado' });
    }
  });
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});
