<?php
// Conexión a la base de datos
require_once 'db_conexion.php';

try {
    // Total de votos global
    $stmtTotal = $pdo->prepare("
        SELECT SUM(votoProf + votoAlum + votosAdm) AS total_votos_global
        FROM Plantilla
    ");
    $stmtTotal->execute();
    $resultadoTotal = $stmtTotal->fetch(PDO::FETCH_ASSOC);
    $totalVotosGlobal = $resultadoTotal['total_votos_global'] ?? 0;

    // Candidato con más votos
    $stmt = $pdo->prepare("
        SELECT id_plantilla, (votoProf + votoAlum + votosAdm) AS total_votos, candidato 
        FROM Plantilla 
        ORDER BY total_votos DESC 
        LIMIT 1
    ");
    $stmt->execute();
    $resultado = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($resultado) {
        $idPlantillaGanador = $resultado['id_plantilla'];
        $nombreGanador = $resultado['candidato'];
        $totalVotosGanador = $resultado['total_votos'];
        $porcentajeVotos = ($totalVotosGlobal > 0) ? ($totalVotosGanador / $totalVotosGlobal) * 100 : 0;

        // Definir imagen según id_plantilla
        $imagenes = [
            1 => 'profesora.jpeg',
            2 => 'profesora2.jpeg',
            3 => 'profesor.jpeg',
        ];
        $imagenGanador = $imagenes[$idPlantillaGanador] ?? 'default.jpg'; // Default en caso de error
    } else {
        $nombreGanador = "Ningún registro encontrado";
        $totalVotosGanador = 0;
        $porcentajeVotos = 0;
        $imagenGanador = 'default.jpg';
    }
} catch (PDOException $e) {
    echo "Error al obtener datos: " . $e->getMessage();
    exit;
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Anuncio Elecciones UAEM 2024</title>
    <style>
        /* Tu estilo original exacto aquí */
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body, html {
            height: 100%;
            margin: 0;
            font-family: Arial, sans-serif;
        }

        .container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(to bottom right, #2E7D32, #B8860B);
            text-align: center;
            padding: 20px;
        }

        .logos {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 40px; 
            margin-bottom: 20px;
        }

        .logo {
            width: 150px;
            height: 150px;
            overflow: hidden;
        }

        .logo img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        .logo-second {
            width: 250px;
            height: 250px;
            overflow: hidden;
        }

        .logo-second img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        h1 {
            font-size: 32px;
            color: #000;
            margin: 20px 0;
            position: relative;
            animation: moveGlow 2s infinite alternate;
        }

        @keyframes moveGlow {
            0% {
                text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #fff;
                transform: translateX(0);
            }
            100% {
                text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #fff, 0 0 50px #fff, 0 0 60px #fff;
                transform: translateX(10px);
            }
        }

        .candidate-image {
            width: 550px; 
            height: 350px;
            border-radius: 8px;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            margin: 10px 0;
            background-color: transparent;
        }

        .image-and-stats {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 20px;
            margin-top: 30px;
        }

        .stat {
            background-color: rgba(0, 0, 0, 0.5); 
            color: #2E7D32;
            padding: 20px;
            border-radius: 8px;
            font-size: 24px;
            width: 48%;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
            flex-direction: column;
            height: 150px;
        }

        .votes {
            font-size: 24px;
            color: #ffffff;
        }

        .votes strong {
            font-size: 28px;
            color: #FFD700; 
        }

        .progress-container {
            width: 100%;
            background-color: #2E7D32;
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

        .progress-percentage {
            background-color: #2E7D32; 
        }

        .stats-link {
            position: absolute;
            top: 20px;
            right: 20px;
            color: #fff;
            font-size: 18px;
            text-decoration: none;
            transition: color 0.3s;
        }

        .stats-link:hover {
            color: #FFD700; 
        }

        .winner {
            margin-top: 20px;
            font-size: 26px;
            color: #fff;
            background-color: rgba(0, 0, 0, 0.6);
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }

        .winner strong {
            color: #FFD700;
        }
    </style>
</head>
<body>

<div class="container">
    <div class="logos">
        <div class="logo">
            <img src="Logo_de_la_UAEMex.svg" alt="Logo 1">
        </div>
        <div class="logo-second">
            <img src="lema1.png" alt="Logo 2">
        </div>
    </div>

    <h1>Ganador de las elecciones para rector de la UAEM 2024</h1>

    <div class="image-and-stats">
        <div class="stat" style="text-align: left;">
            <div class="votes">
                <strong><?php echo $totalVotosGanador; ?></strong> Votos Obtenidos
            </div>
        </div>

        <div class="candidate-image" id="candidateImage"></div>

        <div class="stat" style="text-align: right;">
            <div class="votes">
                <strong><?php echo number_format($porcentajeVotos, 2); ?>%</strong> Votación Obtenida
            </div>
            <div class="progress-container">
                <div class="progress-bar progress-percentage" style="width: <?php echo $porcentajeVotos; ?>%;">
                    <?php echo number_format($porcentajeVotos, 2); ?>%
                </div>
            </div>
        </div>
    </div>

    <div class="winner">
        <strong></strong> <?php echo $nombreGanador; ?>
    </div>

    <a href="login.php" class="stats-link">Ver Estadísticas</a>
</div>

<script>
    const imageUrl = "<?php echo $imagenGanador; ?>";
    document.getElementById("candidateImage").style.backgroundImage = `url(${imageUrl})`;
</script>

</body>
</html>





