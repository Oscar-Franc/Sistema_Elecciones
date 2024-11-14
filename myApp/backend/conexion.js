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
app.get('/candidatos', (req, res) => {
  const query = 'SELECT id_plantilla, candidato FROM plantilla';
  db.query(query, (err, results) => {
      if (err) {
          return res.status(500).send('Error al obtener los candidatos');
      }
      res.json({ success: true, candidatos: results });
  });
});
app.post('/registrarVoto', (req, res) => {
  const { no_cuenta, id_candidato, tipo_voto } = req.body;

  // Para pruebas, todos los votos se registrarán en la columna voto_alumno
  const votoCampo = 'voto_alumno'; // Configura siempre a voto_alumno

  let query;
  let parametros;

  if (tipo_voto === 'candidato') {
      // Incrementar el voto en el candidato específico
      query = `UPDATE plantilla SET ${votoCampo} = ${votoCampo} + 1 WHERE id_plantilla = ?`;
      parametros = [id_candidato];
  } else if (tipo_voto === 'nulo') {
      // Incrementar el voto en la plantilla de "Nulo"
      query = `UPDATE plantilla SET ${votoCampo} = ${votoCampo} + 1 WHERE candidato = 'Nulo'`;
      parametros = [];
  } else if (tipo_voto === 'otro') {
      // Incrementar el voto en la plantilla de "Otro"
      query = `UPDATE plantilla SET ${votoCampo} = ${votoCampo} + 1 WHERE candidato = 'Otro'`;
      parametros = [];
  }

  // Ejecutar la consulta
  db.query(query, parametros, (err, result) => {
      if (err) {
          return res.status(500).json({ success: false, message: 'Error al registrar el voto' });
      }
      res.json({ success: true, message: 'Voto registrado correctamente' });
  });
});
// Iniciar el servidor
app.listen(8100, () => {
  console.log('Servidor corriendo en el puerto 8080');
});
