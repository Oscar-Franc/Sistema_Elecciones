<?php
// Configuración de la base de datos
$host = 'database-2.ch0ay6w4kcbb.us-east-1.rds.amazonaws.com'; // Tu host
$dbname = 'urnaelectroral'; // Nombre de tu base de datos
$username = 'admin'; // Tu usuario de base de datos
$password = 'Hereiva12'; // Tu contraseña de base de datos

try {
    // Conexión a la base de datos
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Conexión exitosa a la base de datos en la nube!<br>";

    // Consultas para obtener los datos de votos de la organización 4 (id_organizacion = 4)

    // Votos de alumnos de la organización 4 (usando la relación con Carrera)
    $sql_alumnos = "SELECT COUNT(*) AS total_alumnos, SUM(a.voto_realizado) AS votos_realizados
                    FROM Alumno a
                    JOIN Persona p ON a.id_persona = p.id_persona
                    JOIN Carrera c ON a.id_carrera = c.id_carrera
                    WHERE c.id_Organizacion = 4";
    $alumnos_result = $pdo->query($sql_alumnos);
    $alumnos = $alumnos_result->fetch();

    // Votos de profesores de la organización 4
    $sql_profesores = "SELECT COUNT(*) AS total_profesores, SUM(pf.voto_realizado) AS votos_realizados
                       FROM Profesor pf
                       JOIN Persona p ON pf.id_persona = p.id_persona
                       WHERE pf.id_organizacion = 4";
    $profesores_result = $pdo->query($sql_profesores);
    $profesores = $profesores_result->fetch();

    // Votos de administrativos de la organización 4
    $sql_administrativos = "SELECT COUNT(*) AS total_administrativos, SUM(ad.voto_realizado) AS votos_realizados
                            FROM Administrativo ad
                            JOIN Persona p ON ad.id_persona = p.id_persona
                            WHERE ad.id_organizacion = 4";
    $administrativos_result = $pdo->query($sql_administrativos);
    $administrativos = $administrativos_result->fetch();

    // Calcular votos válidos (suma de votos realizados por alumnos, profesores y administrativos)
    $votos_validos = $alumnos['votos_realizados'] + $profesores['votos_realizados'] + $administrativos['votos_realizados'];

    // Calcular porcentajes de votación por tipo de empleado
    $porcentaje_alumnos = $votos_validos > 0 ? ($alumnos['votos_realizados'] / $votos_validos) * 100 : 0;
    $porcentaje_profesores = $votos_validos > 0 ? ($profesores['votos_realizados'] / $votos_validos) * 100 : 0;
    $porcentaje_administrativos = $votos_validos > 0 ? ($administrativos['votos_realizados'] / $votos_validos) * 100 : 0;

    // Consultar el total de votos realizados por hombres y mujeres en la organización 4
    $sql_sexo = "SELECT sexo, SUM(voto_realizado) AS votos_realizados
                 FROM Persona p
                 JOIN (
                    SELECT id_persona, voto_realizado FROM Alumno WHERE id_carrera IN (SELECT id_carrera FROM Carrera WHERE id_Organizacion = 4)
                    UNION
                    SELECT id_persona, voto_realizado FROM Profesor WHERE id_organizacion = 4
                    UNION
                    SELECT id_persona, voto_realizado FROM Administrativo WHERE id_organizacion = 4
                 ) AS votos ON p.id_persona = votos.id_persona
                 GROUP BY sexo";
    $sexo_result = $pdo->query($sql_sexo);
    $sexo_data = $sexo_result->fetchAll(PDO::FETCH_ASSOC);

    $votos_hombres = 0;
    $votos_mujeres = 0;

    // Asignar los votos realizados por hombres y mujeres
    foreach ($sexo_data as $sexo) {
        if ($sexo['sexo'] == 'M') {
            $votos_hombres = $sexo['votos_realizados'];
        } else if ($sexo['sexo'] == 'F') {
            $votos_mujeres = $sexo['votos_realizados'];
        }
    }

    // Calcular los porcentajes de votación por sexo
    $porcentaje_hombres = $votos_validos > 0 ? ($votos_hombres / $votos_validos) * 100 : 0;
    $porcentaje_mujeres = $votos_validos > 0 ? ($votos_mujeres / $votos_validos) * 100 : 0;

    

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>


<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Estadísticas de Votación</title>
<style>
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body, html {
        height: 100%;
        margin: 0;
        font-family: Arial, sans-serif;
        background: linear-gradient(to bottom right, #2E7D32, #B8860B);
    }

    .container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        width: 100vw;
        height: 100vh;
        padding: 20px;
    }

    .votes {
        font-size: 24px;
        color: #ffffff;
    }

    /* Título */
    h1 {
        text-align: center;
        font-size: 36px;
        color: #fff;
        margin-top: 20px;
    }

    .back-link {
        position: absolute;
        top: 10px;
        right: 20px;
        font-size: 18px;
        color: #fff;
        text-decoration: none;
        background-color: transparent;
        padding: 10px;
        border-radius: 5px;
    }

    .back-link:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }

    .stat {
        background-color: rgba(0, 0, 0, 0.5); 
        color: #fff;
        padding: 20px;
        border-radius: 8px;
        font-size: 24px;
        width: 300px; /* Ajuste el ancho a un tamaño consistente */
        height: 320px; /* Ajuste la altura para que todos sean del mismo tamaño */
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        margin: 15px;
    }

    .progress-container {
        width: 100%;
        background-color: #ddd;
        border-radius: 8px;
        margin-top: 10px;
    }

    .progress-bar {
        height: 20px;
        border-radius: 8px;
        text-align: center;
        color: white;
        font-weight: bold;
        line-height: 20px;
        transition: width 1s;
    }

    .progress-votes {
        background-color: #4CAF50;
    }

    .progress-percentage {
        background-color: #FF6347; 
    }

    .total-votes, .valid-votes {
        font-size: 28px;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.7);
        padding: 20px;
        border-radius: 10px;
        margin: 20px;
        text-align: center;
        width: 300px; /* Aseguramos que estos divs también tengan el mismo tamaño */
        height: 120px; /* Ajuste la altura */
    }
</style>
</head>
<body>

<a href="javascript:history.back()" class="back-link">Regresar</a>

<h1>Estadísticas de votación a nivel Uribe</h1>

<div class="container">

   <div class="stat">
   <div class="votes">
           <center> <strong>Alumnos</strong></center> <br> 
        </div>
        <div class="votes">
            <br>
            <strong><?php echo htmlspecialchars($alumnos ['votos_realizados']); ?></strong> Votos Obtenidos
        </div>
        <div class="progress-container">
            <div class="progress-bar progress-votes" style="width: <?php echo $porcentaje_alumnos; ?>%;"><?php echo $porcentaje_alumnos; ?>%</div>
        </div>
    </div>
    

    <div class="stat">
    <div class="votes">
           <center> <strong>Profesores</strong></center> <br> 
        </div>

        <div class="votes">
            <br>
            <strong><?php echo htmlspecialchars($profesores ['votos_realizados']); ?></strong> Votos Obtenidos
        </div>
        <div class="progress-container">
            <div class="progress-bar progress-votes" style="width: <?php echo $porcentaje_profesores; ?>%;"><?php echo $porcentaje_profesores; ?>%</div>
        </div>
    </div>

    <div class="stat">
    <div class="votes">
           <center> <strong>Administrativos</strong></center> <br> 
        </div>

        <div class="votes">
            <br>
            <strong><?php echo htmlspecialchars($administrativos ['votos_realizados']); ?></strong> Votos Obtenidos
        </div>
        <div class="progress-container">
            <div class="progress-bar progress-votes" style="width: <?php echo $porcentaje_administrativos; ?>%;"><?php echo $porcentaje_administrativos; ?>%</div>
        </div>
    </div>

    <div class="stat">
    <div class="votes">
           <center> <strong>Votacion valida</strong></center> <br> 
        </div>

        <div class="votes">
            <br>
            <strong><?php echo htmlspecialchars($votos_validos); ?></strong> Votos validos
        </div>
    </div>

    <div class="stat">
    <div class="votes">
           <center> <strong>Porcentaje de votacion hombres</strong></center> <br> 
        </div>

        <div class="progress-container">
            <div class="progress-bar progress-votes" style="width: <?php echo $porcentaje_hombres; ?>%;"><?php echo $porcentaje_hombres; ?>%</div>
        </div>
    </div>

    <div class="stat">
    <div class="votes">
           <center> <strong>Porcentaje de votacion mujeres</strong></center> <br> 
        </div>

        <div class="progress-container">
            <div class="progress-bar progress-votes" style="width: <?php echo $porcentaje_mujeres; ?>%;"><?php echo $porcentaje_mujeres; ?>%</div>
        </div>
    </div>
</div>



</body>
</html> 