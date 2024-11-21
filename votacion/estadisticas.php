<?php
// Conexión a la base de datos
require_once 'db_conexion.php';

try {

        // Consulta para obtener los datos de votos y calcular porcentajes de participación
        $stmt = $pdo->prepare("
        SELECT 
            SUM(votoAlum) AS total_alumnos,
            SUM(votoProf) AS total_profesores,
            SUM(votosAdm) AS total_administrativos,
            SUM(votoAlum + votoProf + votosAdm) AS total_votos
        FROM Plantilla
    ");
    $stmt->execute();
    $resultados = $stmt->fetch(PDO::FETCH_ASSOC);

    $total_alumnos = $resultados['total_alumnos'];
    $total_profesores = $resultados['total_profesores'];
    $total_administrativos = $resultados['total_administrativos'];
    $total_votos = $resultados['total_votos'];

 // Cálculo de porcentajes de participación
 $porcentaje_alumnos = $total_votos > 0 ? ($total_alumnos / $total_votos) * 100 : 0;
 $porcentaje_profesores = $total_votos > 0 ? ($total_profesores / $total_votos) * 100 : 0;
 $porcentaje_administrativos = $total_votos > 0 ? ($total_administrativos / $total_votos) * 100 : 0;

    // Consulta para obtener los tres primeros candidatos con más votos
    $stmt = $pdo->prepare("SELECT candidato, votoProf + votoAlum + votosAdm AS total_votos FROM Plantilla ORDER BY total_votos DESC LIMIT 3");
    $stmt->execute();
    $candidatos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Si no hay candidatos, asignamos nombres por defecto y votos a 0
    if (count($candidatos) < 3) {
        $candidatos = [
            ['candidato' => 'Candidato 1', 'total_votos' => 0],
            ['candidato' => 'Candidato 2', 'total_votos' => 0],
            ['candidato' => 'Candidato 3', 'total_votos' => 0],
        ];
    }
    
    // Calcular el total de votos de los tres primeros candidatos
    $total_votos = 0;
    foreach ($candidatos as $candidato) {
        $total_votos += $candidato['total_votos'];
    }
    
    // Consultar los votos nulos y otros
    $stmt_votos = $pdo->prepare("
        SELECT 
            SUM(CASE WHEN id_plantilla = 5 THEN votoProf + votoAlum + votosAdm ELSE 0 END) AS votos_nulos,
            SUM(CASE WHEN id_plantilla = 4 THEN votoProf + votoAlum + votosAdm ELSE 0 END) AS votos_otros
        FROM Plantilla
    ");
    $stmt_votos->execute();
    $votos = $stmt_votos->fetch(PDO::FETCH_ASSOC);

    // Obtener los votos nulos y otros
    $total_votos_nulos = $votos['votos_nulos'];
    $total_votos_otros = $votos['votos_otros'];

    // Calcular el total de votos (candidatos + nulos + otros)
    $total_votos_completo = $total_votos + $total_votos_nulos + $total_votos_otros;

    // Calcular los porcentajes de votación para cada candidato, nulos y otros
    $porcentajes = [];
    if ($total_votos_completo > 0) {
        foreach ($candidatos as $candidato) {
            $porcentaje = ($candidato['total_votos'] / $total_votos_completo) * 100;
            $porcentajes[] = number_format($porcentaje, 2); // Formatear el porcentaje con 2 decimales
        }
        // Porcentaje de votos nulos
        $porcentaje_votos_nulos = ($total_votos_completo > 0) ? ($total_votos_nulos / $total_votos_completo) * 100 : 0;
        // Porcentaje de votos otros
        $porcentaje_votos_otros = ($total_votos_completo > 0) ? ($total_votos_otros / $total_votos_completo) * 100 : 0;
    } else {
        // Si no hay votos, los porcentajes serán 0
        $porcentajes = [0, 0, 0];
        $porcentaje_votos_nulos = 0;
        $porcentaje_votos_otros = 0;
    }

    // Calcular la votación total (sin descontar nulos)
    $total_votacion_total = $total_votos_completo;
    
    // Calcular la votación válida (descontando los nulos)
    $votacion_valida = $total_votos_completo - $total_votos_nulos;


     // Consulta para contar los votos de hombres y mujeres
     $stmt_genero = $pdo->prepare("
     SELECT 
         SUM(CASE WHEN p.sexo = 'H' THEN 1 ELSE 0 END) AS hombres_votaron,
         SUM(CASE WHEN p.sexo = 'M' THEN 1 ELSE 0 END) AS mujeres_votaron
     FROM Persona p
     INNER JOIN (
         SELECT id_persona FROM Alumno WHERE voto_realizado = 1 UNION ALL
         SELECT id_persona FROM Profesor WHERE voto_realizado = 1 UNION ALL
         SELECT id_persona FROM Administrativo WHERE voto_realizado = 1
     ) v ON p.id_persona = v.id_persona
 ");
 $stmt_genero->execute();
 $genero_votos = $stmt_genero->fetch(PDO::FETCH_ASSOC);

 $hombres_votaron = $genero_votos['hombres_votaron'];
 $mujeres_votaron = $genero_votos['mujeres_votaron'];
 $total_genero_votos = $hombres_votaron + $mujeres_votaron;

 $porcentaje_hombres = $total_genero_votos > 0 ? ($hombres_votaron / $total_genero_votos) * 100 : 0;
 $porcentaje_mujeres = $total_genero_votos > 0 ? ($mujeres_votaron / $total_genero_votos) * 100 : 0;

} catch (PDOException $e) {
    echo "Error al obtener candidatos: " . $e->getMessage();
    exit;
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

<h1>Estadísticas de Votación a nivel global</h1>

<div class="container">

    <!-- Candidato 1 -->
    <div class="stat">
        <div class="votes">
           <center> <strong><?php echo htmlspecialchars($candidatos[0]['candidato']); ?></strong></center> 
        </div>
        <div class="votes">
            <br>
            <strong><?php echo htmlspecialchars($candidatos[0]['total_votos']); ?></strong> Votos Obtenidos
        </div>
        <div class="progress-container">
            <div class="progress-bar progress-votes" style="width: <?php echo $porcentajes[0]; ?>%;"><?php echo $porcentajes[0]; ?>%</div>
        </div>
    </div>

    <!-- Candidato 2 -->
    <div class="stat">
        <div class="votes">
           <center> <strong><?php echo htmlspecialchars($candidatos[1]['candidato']); ?></strong></center> <br> 
        </div>
        <div class="votes">
            <br>
            <strong><?php echo htmlspecialchars($candidatos[1]['total_votos']); ?></strong> Votos Obtenidos
        </div>
        <div class="progress-container">
            <div class="progress-bar progress-votes" style="width: <?php echo $porcentajes[1]; ?>%;"><?php echo $porcentajes[1]; ?>%</div>
        </div>
    </div>

    <!-- Candidato 3 -->
    <div class="stat">
        <div class="votes">
           <center> <strong><?php echo htmlspecialchars($candidatos[2]['candidato']); ?></strong></center> <br> 
        </div>
        <div class="votes">
            <br>
            <strong><?php echo htmlspecialchars($candidatos[2]['total_votos']); ?></strong> Votos Obtenidos
        </div>
        <div class="progress-container">
            <div class="progress-bar progress-votes" style="width: <?php echo $porcentajes[2]; ?>%;"><?php echo $porcentajes[2]; ?>%</div>
        </div>
    </div>

    <!-- Estadísticas adicionales: votos nulos y otros -->
    <div class="stat">
        <div class="votes">
           <center> <strong>Votos Nulos</strong></center> <br> 
        </div>
        <div class="votes">
            <br>
            <strong><?php echo $total_votos_nulos; ?></strong> Votos 
        </div>
        <div class="progress-container">
            <div class="progress-bar progress-percentage" style="width: <?php echo number_format($porcentaje_votos_nulos, 2); ?>%;"><?php echo number_format($porcentaje_votos_nulos, 2); ?>%</div>
        </div>
    </div>

    <div class="stat">
        <div class="votes">
           <center> <strong>Otros candidatos</strong></center> <br> 
        </div>
        <div class="votes">
            <br>
            <strong><?php echo $total_votos_otros; ?></strong> Votos 
        </div>
        <div class="progress-container">
            <div class="progress-bar progress-percentage" style="width: <?php echo number_format($porcentaje_votos_otros, 2); ?>%;"><?php echo number_format($porcentaje_votos_otros, 2); ?>%</div>
        </div>
    </div>

    <div class="stat">
        <div class="votes">
           <center> <strong>Porcentaje de votacion de Hombres</strong></center> <br> 
        </div>
        <div class="progress-container">
            <div class="progress-bar progress-votes" style="width: <?php echo $porcentaje_hombres; ?>%;"><?php echo number_format($porcentaje_hombres, 2); ?>%</div>
        </div>
    </div>

    <div class="stat">
        <div class="votes">
           <center> <strong>Porcentaje de votacion de mujeres</strong></center> <br> 
        </div>
        <div class="progress-container">
            <div class="progress-bar progress-votes" style="width: <?php echo $porcentaje_mujeres; ?>%;"><?php echo number_format($porcentaje_mujeres, 2); ?>%</div>
        </div>
    </div>

    <div class="stat">
        <div class="votes">
           <center> <strong>Porcentaje de participacion alumnos</strong></center> <br> 
        </div>
        <div class="progress-container">
            <div class="progress-bar progress-votes" style="width: <?php echo $porcentaje_alumnos; ?>%;"><?php echo number_format($porcentaje_alumnos, 2); ?>%</div>
        </div>
    </div>


    <div class="stat">
        <div class="votes">
           <center> <strong>Porcentaje de participacion profesores</strong></center> <br> 
        </div>
        <div class="progress-container">
            <div class="progress-bar progress-votes" style="width: <?php echo $porcentaje_profesores; ?>%;"><?php echo number_format($porcentaje_profesores, 2); ?>%</div>
        </div>
    </div>

    <div class="stat">
        <div class="votes">
           <center> <strong>Porcentaje de participacion administrativos</strong></center> <br> 
        </div>
        <div class="progress-container">
            <div class="progress-bar progress-votes" style="width: <?php echo $porcentaje_administrativos; ?>%;"><?php echo number_format($porcentaje_administrativos, 2); ?>%</div>
        </div>
    </div>
    <div class="stat">
        <div class="votes">
           <center> <strong>Votacion Total</strong></center> <br> 
        </div>
        <div class="votes">
            <br>
            <strong><?php echo $total_votacion_total; ?></strong> Votos 
        </div>
       
    </div>

    <div class="stat">
        <div class="votes">
           <center> <strong>Votacion Valida</strong></center> <br> 
        </div>
        <div class="votes">
            <br>
            <strong><?php echo $votacion_valida; ?></strong> Votos 
        </div>
       
    </div>    

</div>

</body>
</html> 


