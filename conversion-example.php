<?php
// Ejemplo de cómo sería convertir a PHP tradicional
// ESTO REQUIERE REESCRIBIR TODO EL CÓDIGO

?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Plataforma Sur</title>
    <!-- Necesitarías recrear todos los estilos Tailwind manualmente -->
    <style>
        .hero-gradient {
            background: linear-gradient(135deg, #04444D 0%, #04BA70 100%);
        }
        /* Cientos de líneas más de CSS... */
    </style>
</head>
<body>
    <?php include 'header.php'; ?>
    
    <main>
        <section class="hero-gradient min-h-screen flex items-center justify-center">
            <div class="container text-center text-white">
                <h1 class="text-6xl font-bold">
                    Del sur al mundo:<br>
                    <span class="text-emerald">calidad que cruza fronteras</span>
                </h1>
                <!-- Sin animaciones Framer Motion -->
                <!-- Sin componentes React -->
                <!-- Todo código HTML/PHP manual -->
            </div>
        </section>
    </main>
    
    <?php include 'footer.php'; ?>
</body>
</html>