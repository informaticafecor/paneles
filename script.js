// Animaciones de entrada
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Inicializar animaciones
document.querySelectorAll('.panel-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Efectos de partículas tecnológicas
function createTechParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = 'rgba(0, 188, 212, 0.6)';
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = '100vh';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1';
    particle.style.boxShadow = '0 0 10px rgba(0, 188, 212, 0.8)';
    
    document.body.appendChild(particle);
    
    particle.animate([
        { 
            transform: 'translateY(0) scale(0)', 
            opacity: 0 
        },
        { 
            transform: 'translateY(-50vh) scale(1)', 
            opacity: 1 
        },
        { 
            transform: 'translateY(-100vh) scale(0)', 
            opacity: 0 
        }
    ], {
        duration: Math.random() * 3000 + 4000,
        easing: 'ease-out'
    }).onfinish = () => particle.remove();
}

// Crear partículas cada 2 segundos
setInterval(createTechParticle, 2000);

// Efectos hover mejorados para los círculos del header
document.querySelectorAll('.tech-preview-circle').forEach(circle => {
    circle.addEventListener('mouseenter', function() {
        this.style.background = 'linear-gradient(135deg, rgba(255, 193, 7, 0.8), rgba(255, 152, 0, 0.6))';
    });
    
    circle.addEventListener('mouseleave', function() {
        this.style.background = 'linear-gradient(135deg, rgba(30, 136, 229, 0.8), rgba(0, 188, 212, 0.6))';
    });
});

// Efecto de tipeo para el título principal
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Aplicar efecto de tipeo al cargar la página
window.addEventListener('load', () => {
    const title = document.querySelector('.main-title');
    const originalText = title.textContent;
    typeWriter(title, originalText, 80);
});

// Función para navegación suave
function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}

// Event listeners para navegación
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
       // e.preventDefault();
        
        // Aquí puedes agregar lógica específica para cada enlace
        const text = this.textContent.toLowerCase();
        console.log(`Navegando a: ${text}`);
        
        // Ejemplo de redirección específica
        switch(text) {
            case 'inicio':
                window.location.href = '#';
                break;
            case 'carga procesal':
                window.location.href = '#panel-carga-procesal';
                break;
            case 'plazos':
                window.location.href = '#panel-plazos';
                break;
            case 'operativos':
                window.location.href = '#panel-operativos';
                break;
            case 'sentencias':
                window.location.href = '#panel-sentencias';
                break;
        }
    });
});

// Efectos adicionales para los paneles
document.querySelectorAll('.panel-card').forEach(panel => {
    // Efecto de sonido hover (opcional)
    panel.addEventListener('mouseenter', function() {
        // Aquí puedes agregar un sonido sutil si lo deseas
        // new Audio('hover-sound.mp3').play();
    });
    
    // Efecto de click con feedback visual
    panel.addEventListener('click', function() {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// Contador animado para estadísticas (ejemplo)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #1e88e5, #00bcd4);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Mostrar notificación
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Manejo de errores
window.addEventListener('error', function(e) {
    console.error('Error en la aplicación:', e.error);
    showNotification('Ha ocurrido un error inesperado', 'error');
});

// Función para loading state
function showLoading() {
    const loader = document.createElement('div');
    loader.id = 'global-loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(10, 25, 41, 0.8);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    `;
    
    loader.innerHTML = `
        <div style="
            width: 60px;
            height: 60px;
            border: 4px solid rgba(0, 188, 212, 0.3);
            border-top: 4px solid #00bcd4;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        "></div>
    `;
    
    // Agregar animación de spinner
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(loader);
}

function hideLoading() {
    const loader = document.getElementById('global-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(loader);
        }, 300);
    }
}

// Optimización de rendimiento
let ticking = false;

function updateParallax() {
    const scrollTop = window.pageYOffset;
    
    // Efecto parallax sutil para los círculos de fondo
    document.querySelectorAll('.tech-circle').forEach((circle, index) => {
        const speed = 0.5 + (index * 0.1);
        circle.style.transform = `translateY(${scrollTop * speed}px)`;
    });
    
    ticking = false;
}

function requestParallaxUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

// Event listener para scroll optimizado
window.addEventListener('scroll', requestParallaxUpdate);

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('FECOR Paneles Estadísticos - Sistema cargado correctamente');
    
    // Inicializar cualquier funcionalidad adicional aquí
    // Por ejemplo: cargar datos iniciales, configurar websockets, etc.
    
    showNotification('Sistema de paneles estadísticos iniciado correctamente', 'success');
});