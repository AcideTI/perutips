// Función para cargar el navbar
function loadNavbar() {
    const navbar = `
    <nav class="navbar navbar-expand-xxl bg-white navbar-light sticky-top px-4 px-xxl-5 py-xxl-0">
        <a href="index.html" class="navbar-brand d-flex align-items-center">
            <img class="img-fluid" src="img/logo.png" style="height:65px;">
        </a>
        <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <div class="navbar-nav ms-auto py-3 py-xxl-0 text-capitalize">
                <a href="index.html" class="nav-item nav-link active text-truncate fw-bold" data-i18n="nav.inicio">Inicio</a>
                <a href="nosotros.html" class="nav-item nav-link text-truncate fw-bold" data-i18n="nav.nosotros">Nosotros</a>
                <div class="nav-item dropdown fw-bold">
                    <div style="cursor: pointer;" class="nav-link dropdown-toggle text-truncate fw-bold" data-i18n="nav.lion" data-bs-toggle="dropdown">Lions Internacional</div>
                    <div class="dropdown-menu bg-light m-0">
                        <a href="folac-2025.html" class="dropdown-item text-capitalize fw-bold">FOLAC Costa Rica</a>
                        <a href="folac-2026-hong-kong.html" class="dropdown-item text-capitalize fw-bold" data-i18n="nav.hongkong">Convención Hong Kong</a>
                        <a href="convencion-mexico.html" class="dropdown-item text-capitalize fw-bold" data-i18n="nav.Orlando">Convención Orlando</a>
                    </div>
                </div>
                <a href="conoce-peru.html" class="nav-item nav-link text-truncate fw-bold" data-i18n="nav.peru">Conoce el Perú</a>
                <a href="paquetes-internacionales.html" class="nav-item nav-link text-truncate fw-bold" data-i18n="nav.paquetes">Paquetes Internacionales</a>
                <div class="nav-item dropdown">
                    <div style="cursor: pointer;" class="nav-link dropdown-toggle text-truncate fw-bold" data-bs-toggle="dropdown" data-i18n="nav.adicionales">Servicios Adicionales</div>
                    <div class="dropdown-menu bg-light m-0">
                        <a href="turismo-estudiantil.html" class="dropdown-item text-capitalize fw-bold" data-i18n="nav.estudiantil">Turismo Estudiantil</a>
                        <a href="bodas.html" class="dropdown-item text-capitalize fw-bold" data-i18n="nav.bodas">Bodas</a>
                        <a href="visas.html" class="dropdown-item text-capitalize fw-bold">Visas</a>
                    </div>
                </div>
                <a href="contacto.html" class="nav-item nav-link fw-bold" data-i18n="nav.contacto">Contacto</a>
                <!-- Select to idioma -->
                <select style="cursor: pointer;" id="selectedLanguage" class="nav-item nav-link border-0 fw-bold text-capitalize fw-bold">
                    <option value="en" data-i18n="nav.ingles">English</option>
                    <option value="es" data-i18n="nav.español">Español</option>
                </select>
            </div>
        </div>
    </nav>
    `;

    // Insertar el navbar en el elemento con id "navbar-container"
    document.getElementById('navbar-container').innerHTML = navbar;

    // Actualizar la clase 'active' según la página actual
    const currentPage = window.location.pathname.split('/').pop();
    
    // Remover todas las clases active existentes
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-item');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Agregar active a los enlaces principales y elementos del menú desplegable
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
            
            // Si es un elemento del menú desplegable, también activar el dropdown padre
            const dropdownParent = link.closest('.dropdown');
            if (dropdownParent) {
                const dropdownToggle = dropdownParent.querySelector('.dropdown-toggle');
                if (dropdownToggle) {
                    dropdownToggle.classList.add('active');
                }
            }
        }
    });

    // Si es la página de inicio, asegurarse de que tenga la clase active
    if (currentPage === '' || currentPage === 'index.html') {
        const homeLink = document.querySelector('a[href="index.html"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }
    }
}

// Cargar el navbar cuando el documento esté listo
document.addEventListener('DOMContentLoaded', loadNavbar); 