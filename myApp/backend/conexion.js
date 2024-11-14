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
  password: '',
  database: 'Urna'
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
  const {password } = req.body;
  const query = `
  SELECT Persona.nombre, Persona.id_persona, COALESCE(Alumno.no_cuenta, Profesor.no_cuenta, Administrativo.no_cuenta) AS no_cuenta 
  FROM Persona 
  LEFT JOIN Alumno ON Alumno.id_persona = Persona.id_persona 
  LEFT JOIN Profesor ON Profesor.id_persona = Persona.id_persona 
  LEFT JOIN Administrativo ON Administrativo.id_persona = Persona.id_persona 
  WHERE COALESCE(Alumno.voto_realizado, Profesor.voto_realizado, Administrativo.voto_realizado) = 0 
    AND COALESCE(Alumno.no_cuenta, Profesor.no_cuenta, Administrativo.no_cuenta) = ? 
  LIMIT 1;
`;

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
    SELECT 
      Persona.nombre AS persona_nombre, 
      COALESCE(Carrera.nombre, NULL) AS carrera_nombre,
      COALESCE(Organizacion.nombre, NULL) AS organizacion_nombre
    FROM Persona
    LEFT JOIN Alumno ON Alumno.id_persona = Persona.id_persona
    LEFT JOIN Carrera ON Carrera.id_carrera = Alumno.id_carrera
    LEFT JOIN Profesor ON Profesor.id_persona = Persona.id_persona
    LEFT JOIN Administrativo ON Administrativo.id_persona = Persona.id_persona
    LEFT JOIN Organizacion ON 
      (Carrera.id_Organizacion = Organizacion.id_organizacion OR Profesor.id_organizacion = Organizacion.id_organizacion OR Administrativo.id_organizacion = Organizacion.id_organizacion)
    WHERE COALESCE(Alumno.no_cuenta, Profesor.no_cuenta, Administrativo.no_cuenta) = ? 
    LIMIT 1`;

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
  const query = 'SELECT id_plantilla, candidato FROM Plantilla';
  db.query(query, (err, results) => {
      if (err) {
          return res.status(500).send('Error al obtener los candidatos');
      }
      res.json({ success: true, candidatos: results });
  });
});

app.post('/registrarVoto', (req, res) => {
    const { idPersona, id_candidato, tipo_voto } = req.body;
    
    let votoCampo;
    let selectQuery;
    let updateQuery;
    let parametros = [];
    const id_persona = parseInt(req.body.id_persona, 10);


    // Determinar el campo de votos y actualizar `voto_realizado` en la tabla correspondiente
    if (id_persona >= 1 && id_persona <= 5000) {
        votoCampo = 'votoAlum';
        query = `UPDATE Alumno SET Alumno.voto_realizado = 1 WHERE Alumno.id_persona = ?`;
        db.query(query, [id_persona], (err, result) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error al registrar el voto del alumno' });
            }
        });
    } else if (id_persona >= 5001 && id_persona <= 7000) {
        votoCampo = 'votoProf';
        query = `UPDATE Profesor SET Profesor.voto_realizado = 1 WHERE Profesor.id_persona = ?`;
        db.query(query, [id_persona], (err, result) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error al registrar el voto del profesor' });
            }
        });
    } else if (id_persona >= 7001 && id_persona <= 8000) {
        votoCampo = 'votosAdm';
        query = `UPDATE Administrativo SET Administrativo.voto_realizado = 1 WHERE Administrativo.id_persona = ?`;
        db.query(query, [id_persona], (err, result) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error al registrar el voto del administrativo' });
            }
        });
    } else {
        return res.status(400).json({ success: false, message: 'ID de persona fuera de rango' });
    }

    // Determinar la consulta para el tipo de voto y el candidato
    if (tipo_voto === 'candidato') {
        selectQuery = `SELECT ${votoCampo} FROM Plantilla WHERE id_plantilla = ?`;
        updateQuery = `UPDATE Plantilla SET ${votoCampo} = ? WHERE id_plantilla = ?`;
        parametros = [id_candidato];
    } else if (tipo_voto === 'nulo') {
        selectQuery = `SELECT ${votoCampo} FROM Plantilla WHERE candidato = 'Nulo'`;
        updateQuery = `UPDATE Plantilla SET ${votoCampo} = ? WHERE candidato = 'Nulo'`;
    } else if (tipo_voto === 'otro') {
        selectQuery = `SELECT ${votoCampo} FROM Plantilla WHERE candidato = 'Otro'`;
        updateQuery = `UPDATE Plantilla SET ${votoCampo} = ? WHERE candidato = 'Otro'`;
    } else {
        return res.status(400).json({ success: false, message: 'Tipo de voto no válido' });
    }

    // Ejecutar la consulta de actualización en `plantilla`
    // Ejecutar la consulta para obtener el valor actual y luego actualizarlo
    db.query(selectQuery, parametros, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error al obtener el conteo de votos' });
        }

        if (results.length > 0) {
            const currentVotoCount = results[0][votoCampo] || 0;
            const newVotoCount = currentVotoCount + 1;

            // Ejecutar la actualización con el nuevo valor de votos
            db.query(updateQuery, [newVotoCount, ...parametros], (err, result) => {
                if (err) {
                    return res.status(500).json({ success: false, message: 'Error al actualizar el conteo de votos' });
                }
                res.json({ success: true, message: 'Voto registrado correctamente' });
            });
        } else {
            res.status(404).json({ success: false, message: 'Candidato no encontrado para actualizar voto' });
        }
    });
});

// Iniciar el servidor
app.listen(8100, () => {
  console.log('Servidor corriendo en el puerto 8080');
});
