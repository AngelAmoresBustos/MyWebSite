document.addEventListener('DOMContentLoaded', () => {
    const fadeText = document.querySelector('.fade-on-scroll');
    const fadeOutPoint = 500; // El texto desaparecerá completamente a los 200px de scroll
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Estado inicial

    function handleScroll() {
        const scrollPosition = window.scrollY;
        const opacity = Math.max(0, 1 - (scrollPosition / fadeOutPoint));
        fadeText.style.opacity = opacity;
    }
});


document.addEventListener('DOMContentLoaded', () => {
// --- Variables ---
const header = document.getElementById('main-header');
const navMobile = document.getElementById('main-nav-mobile');
const menuToggle = document.getElementById('menu-toggle');
const navOverlay = document.querySelector('.nav-overlay');
const mobileNavLinks = document.querySelectorAll('.main-nav-mobile .nav-link'); // Únicos enlaces ahora
const sections = document.querySelectorAll('main section[id]');
const animatedElements = document.querySelectorAll('.hidden');
const currentYearSpan = document.getElementById('current-year');
const scrollProgressContainer = document.getElementById('scroll-progress-indicator');

// --- Menú Móvil Lateral Izquierdo (Ahora Universal) ---
const toggleMenu = () => {
    const isActive = navMobile.classList.contains('active');
    navMobile.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.classList.toggle('nav-active');

    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars', isActive);
    icon.classList.toggle('fa-times', !isActive);
    menuToggle.setAttribute('aria-label', isActive ? 'Abrir menú' : 'Cerrar menú');
};


menuToggle.addEventListener('click', toggleMenu);
navOverlay.addEventListener('click', toggleMenu);


mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMobile.classList.contains('active')) {
            toggleMenu();
    }
    });
});


// --- Indicador de Progreso con Círculos ---
const createProgressDots = () => {
    if (!scrollProgressContainer) return;

    scrollProgressContainer.innerHTML = '';

    sections.forEach(section => {
        const sectionId = section.getAttribute('id');
        const sectionLabel = section.getAttribute('data-label') || sectionId.charAt(0).toUpperCase() + sectionId.slice(1);  
        const dotLink = document.createElement('a');
        dotLink.classList.add('progress-dot');
        dotLink.href = `#${sectionId}`;
        dotLink.setAttribute('aria-label', `Ir a ${sectionLabel}`);
        dotLink.dataset.section = sectionId;    
        dotLink.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToSection(sectionId);
        }); 
        scrollProgressContainer.appendChild(dotLink);
    });
};


const updateProgressDots = (currentSectionId) => {
    if (!scrollProgressContainer) return;
    const dots = scrollProgressContainer.querySelectorAll('.progress-dot');
    dots.forEach(dot => {
    dot.classList.toggle('active', dot.dataset.section === currentSectionId);
    });
};


// --- Resaltado de Navegación y Progreso al Hacer Scroll ---
const activateNavAndProgressOnScroll = () => {
    let currentSectionId = '';
    const scrollY = window.pageYOffset;
    const headerHeight = header ? header.offsetHeight : 0;
    const activationOffset = headerHeight + 100;

    sections.forEach(section => {
    const sectionTop = section.offsetTop - activationOffset;
    const sectionHeight = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = id;
    }
    });

    if (currentSectionId === '' && scrollY + window.innerHeight >= document.body.offsetHeight - 50) {
        currentSectionId = sections[sections.length - 1].getAttribute('id');
    } else if (currentSectionId === '' && scrollY < sections[0].offsetTop - activationOffset) {
        currentSectionId = sections[0].getAttribute('id');
    }

    // Actualizar enlaces del menú lateral
    mobileNavLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentSectionId}`);
    });

    updateProgressDots(currentSectionId);
};


// --- Scroll Suave ---
const scrollToSection = (targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        const headerOffset = header ? header.offsetHeight : 0;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({ top: offsetPosition, behavior: "smooth" });

        if (navMobile.classList.contains('active')) {
            // Añadir un pequeño delay para que el scroll no sea interrumpido por el cierre inmediato
            setTimeout(toggleMenu, 100);
        }
    }
};


// --- Animaciones de Scroll (Fade-in) ---
const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 }; // Umbral menor para iniciar antes
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.classList.remove('hidden');
        observer.unobserve(entry.target);
    }
    });
};


const observer = new IntersectionObserver(observerCallback, observerOptions);
animatedElements.forEach(el => {
    el.classList.add('hidden'); // Asegurar estado inicial
    observer.observe(el);
});


// --- Inicialización ---
createProgressDots();
window.addEventListener('scroll', activateNavAndProgressOnScroll, { passive: true }); // Optimización del listener
activateNavAndProgressOnScroll(); // Estado inicial


// Scroll suave para enlaces internos (botones, etc.)
document.querySelectorAll('a[href^="#"]:not(.progress-dot):not(.nav-link)').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').substring(1);
        if (document.getElementById(targetId)) {
            e.preventDefault();
            scrollToSection(targetId);
        }
    });
});

    // --- Año Actual en Footer ---
    if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
    }

}); // Fin DOMContentLoaded



function showBlog(blogNumber) {
    for (let index = 1; index < 4; index++) {
        const blogPost = document.getElementById(`blog-post-${index}`);
        blogPost.style.display = 'none';
    }

    const blogPost = document.getElementById(`blog-post-${blogNumber}`);
    if (blogPost) {
        blogPost.style.display = 'block';
        scrollToSection2(blogPost,{ offset: 80 });
    }
}


function hideBlog(blogNumber) {
    const blogPost = document.getElementById(`blog-post-${blogNumber}`);
    if (blogPost) {
        blogPost.style.display = 'none';
        scrollToSection2("blog",{ offset: 80 });
    }
}


/**
 * Mueve el scroll de la página hasta la sección especificada por su ID o nombre de clase
 * @param {string} sectionName - El ID o nombre de clase de la sección (sin # o .)
 * @param {Object} options - Opciones adicionales para la función
 * @param {string} options.selectorType - Tipo de selector: 'id', 'class', o 'data' (por defecto: 'id')
 * @param {string} options.dataAttribute - Atributo data a usar cuando selectorType es 'data' (por defecto: 'section')
 * @param {number} options.offset - Desplazamiento en píxeles desde la parte superior (por defecto: 0)
 * @param {string} options.behavior - Comportamiento del scroll: 'auto', 'smooth' (por defecto: 'smooth')
 * @returns {boolean} - Verdadero si la sección fue encontrada y el scroll se movió, falso en caso contrario
 */
function scrollToSection2(sectionName, options = {}) {
    // Valores predeterminados para las opciones
    const defaultOptions = {
        selectorType: 'id',      // Por defecto busca por ID
        dataAttribute: 'section', // Atributo data por defecto
        offset: 0,               // Sin desplazamiento por defecto
        behavior: 'smooth'       // Scroll suave por defecto
    };
    
    // Combinar opciones predeterminadas con las proporcionadas
    const settings = {...defaultOptions, ...options};
    
    // Crear el selector adecuado según el tipo
    let selector;
    switch (settings.selectorType.toLowerCase()) {
        case 'class':
        selector = `.${sectionName}`;
        break;
        case 'data':
        selector = `[data-${settings.dataAttribute}="${sectionName}"]`;
        break;
        case 'id':
        default:
        selector = `#${sectionName}`;
        break;
    }
    
    // Buscar el elemento en el DOM
    const section = document.querySelector(selector);
    
    // Si no se encuentra el elemento, mostrar un error y retornar falso
    if (!section) {
        console.error(`La sección "${sectionName}" no fue encontrada con el selector "${selector}"`);
        return false;
    }
    
    // Calcular la posición de la sección
    const sectionPosition = section.getBoundingClientRect().top;
    const offsetPosition = sectionPosition + window.pageYOffset - settings.offset;
    
    // Realizar el scroll
    window.scrollTo({
        top: offsetPosition,
        behavior: settings.behavior
    });    
    return true;
}
