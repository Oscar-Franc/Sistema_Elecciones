<?php
// Verificar si el formulario fue enviado
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener el nombre de usuario y la contraseña
    $usuario = $_POST['usuario'];
    $password = $_POST['password'];

    // Aquí deberías verificar las credenciales (este es solo un ejemplo simple)
    // Ejemplo: usuario 'admin' con contraseña '1234'
    if ($usuario == "admin" && $password == "1234") {
        // Si el usuario y la contraseña son correctos, redirigir a la página home.php
        header("Location: estadistica.php");
        exit;
    } else {
        $error = "Usuario o contraseña incorrectos.";
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
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
            flex-direction: column;
        }

        /* Contenedor de logos */
        .logos {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 15px;
            margin-bottom: 30px;
        }

        .logos img {
            width: 150px; /* Ajuste del tamaño de los logos */
        }

        /* Contenedor principal del formulario de login */
        .login-container {
            background-color: rgba(255, 255, 255, 0.8);
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            width: 350px;
            text-align: center;
        }

        /* Estilos de los inputs */
        .login-container input {
            width: 100%;
            padding: 12px;
            margin: 10px 0;
            border-radius: 5px;
            border: 1px solid #ccc;
            font-size: 16px;
        }

        /* Estilos del botón de login */
        .btn-login {
            background-color: #4CAF50;
            color: white;
            font-size: 18px;
            padding: 15px;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            width: 100%;
            transition: background-color 0.3s ease;
        }

        .btn-login:hover {
            background-color: #45a049;
        }

        .btn-login:focus {
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

        /* Mensaje de error */
        .error-message {
            color: red;
            font-size: 16px;
            margin-top: 15px;
        }
    </style>
</head>
<body>

<a href="javascript:history.back()" class="back-link">Regresar</a>

    <!-- Contenedor de Logos -->
    <div class="logos">
        <div class="logo">
            <img src="Logo_de_la_UAEMex.svg" alt="Logo 1">
        </div>
        <div class="logo">
            <img src="lema1.png" alt="Logo 2">
        </div>
    </div>

    <!-- Contenedor del formulario de Login -->
    <div class="login-container">
        <h2>Iniciar sesión</h2>
        
        <!-- Mostrar mensaje de error si las credenciales son incorrectas -->
        <?php if (isset($error)): ?>
            <div class="error-message"><?php echo $error; ?></div>
        <?php endif; ?>

        <form action="" method="POST">
            <input type="text" name="usuario" placeholder="Usuario" required>
            <input type="password" name="password" placeholder="Contraseña" required>
            <button type="submit" class="btn-login">Acceder</button>
        </form>
    </div>

</body>
</html>
