const fs = require('fs');
const path = require('path');

// Función para actualizar una página HTML
function updatePage(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Reemplazar el navbar existente con el contenedor
    content = content.replace(
        /<!-- Navbar Start -->[\s\S]*?<!-- Navbar End -->/,
        '<!-- Navbar Container -->\n    <div id="navbar-container"></div>\n    <!-- Navbar End -->'
    );
    
    // Agregar la referencia al script del navbar si no existe
    if (!content.includes('js/navbar.js')) {
        content = content.replace(
            /<\/body>/,
            '    <script src="js/navbar.js"></script>\n</body>'
        );
    }
    
    fs.writeFileSync(filePath, content);
}

// Función para procesar todos los archivos HTML en un directorio
function processDirectory(directory) {
    const files = fs.readdirSync(directory);
    
    files.forEach(file => {
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            processDirectory(filePath);
        } else if (file.endsWith('.html')) {
            updatePage(filePath);
        }
    });
}

// Procesar el directorio actual
processDirectory('.'); 