<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página de Botones</title>
    <style>
        /* Estilos generales */
        body, html {
            height: 100%;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(to bottom right, #2E7D32, #B8860B);
            font-family: Arial, sans-serif;
            position: relative;
            flex-direction: column; /* Cambiar a columna para que los logos estén arriba */
        }

        .button-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
            margin-top: 20px; /* Separación entre los logos y los botones */
        }

        .btn {
            background-color: #4CAF50;
            color: white;
            font-size: 20px;
            padding: 15px 25px;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            text-align: center;
            width: 200px;
            transition: background-color 0.3s ease;
        }

        .btn:hover {
            background-color: #45a049;
        }

        .btn:focus {
            outline: none;
        }

        /* Estilo para el enlace de regresar */
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
            transition: background-color 0.3s ease;
        }

        .back-link:hover {
            background-color: rgba(255, 255, 255, 0.2);
        }

        /* Estilos para los logos */
        .logos {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 15px; /* Espacio entre los logos */
            margin-bottom: 20px; /* Espacio entre los logos y los botones */
        }

        .logos img {
            width: 200px; /* Aumentar el tamaño de los logos un poco más */
            margin: 10px; /* Espaciado entre los logos */
        }
    </style>
</head>
<body>

<a href="javascript:history.back()" class="back-link">Salir</a>

    <div class="logos">
        <div class="logo">
            <img src="Logo_de_la_UAEMex.svg" alt="Logo 1">
        </div>
        <div class="logos">
            <img src="lema1.png" alt="Logo 2">
        </div>
    </div>

    <div class="button-container">
        <button class="btn" onclick="window.location.href='estadisticas.php'">Estadísticas globales</button>
        <button class="btn" onclick="window.location.href='fi.php'">Estadísticas Ingenieria</button>
        <button class="btn" onclick="window.location.href='cira.php'">Estadísticas CIRA</button>
        <button class="btn" onclick="window.location.href='teotihuacan.php'">Estadísticas Teotihuacan</button>
        <button class="btn" onclick="window.location.href='uribe.php'">Estadísticas Uribe</button>
  
    </div>

</body>
</html>


