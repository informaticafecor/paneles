/**
 * FECOR Dropdown Menu System - Compatible con CSS v12
 * Sistema completo de menú desplegable con navegación
 */

class FecorDropdownMenu {
    constructor() {
        this.dropdown = null;
        this.dropdownContent = null;
        this.isOpen = false;
        this.hoverTimeout = null;
        this.currentPage = this.getCurrentPage();
        
        this.init();
    }

    // Inicializar el sistema de menú
    init() {
        this.findElements();
        this.setupEventListeners();
        this.setupKeyboardNavigation();
        this.highlightCurrentPage();
        
        console.log('🔗 Sistema de menú FECOR inicializado');
    }

    // Encontrar elementos del DOM
    findElements() {
        this.dropdown = document.querySelector('.dropdown');
        this.dropdownContent = document.querySelector('.dropdown-content');
        this.navItems = document.querySelectorAll('.nav-item');
        this.dropdownItems = document.querySelectorAll('.dropdown-content a');
        this.panelCards = document.querySelectorAll('.panel-card');
        
        if (!this.dropdown || !this.dropdownContent) {
            console.warn('⚠️ Elementos del dropdown no encontrados');
            return false;
        }
        
        return true;
    }

    // Configurar todos los event listeners
    setupEventListeners() {
        if (!this.findElements()) return;

        // === EVENTOS DEL DROPDOWN ===
        this.setupDropdownEvents();
        
        // === EVENTOS DE NAVEGACIÓN ===
        this.setupNavigationEvents();
        
        // === EVENTOS DE PANELES ===
        this.setupPanelEvents();
        
        // === EVENTOS GLOBALES ===
        this.setupGlobalEvents();
    }

    // Configurar eventos específicos del dropdown
    setupDropdownEvents() {
        // Hover para abrir dropdown
        this.dropdown.addEventListener('mouseenter', () => {
            this.clearHoverTimeout();
            this.openDropdown();
        });

        // Delay más largo para cerrar dropdown
        this.dropdown.addEventListener('mouseleave', () => {
            this.hoverTimeout = setTimeout(() => {
                this.closeDropdown();
            }, 800); // 800ms de delay (antes era 300ms)
        });

        // También mantener abierto cuando se está sobre el dropdown-content
        if (this.dropdownContent) {
            this.dropdownContent.addEventListener('mouseenter', () => {
                this.clearHoverTimeout();
            });

            this.dropdownContent.addEventListener('mouseleave', () => {
                this.hoverTimeout = setTimeout(() => {
                    this.closeDropdown();
                }, 500); // 500ms cuando sale del contenido
            });
        }

        // Click en el enlace principal
        const mainDropdownLink = this.dropdown.querySelector('.nav-item');
        if (mainDropdownLink) {
            mainDropdownLink.addEventListener('click', (e) => {
                const href = mainDropdownLink.getAttribute('href');
                if (href && href.includes('.html')) {
                    e.preventDefault();
                    const pageName = href.replace('.html', '');
                    this.navigateToPage(pageName);
                    this.closeDropdown();
                }
            });
        }

        // Eventos en elementos del dropdown
        this.dropdownItems.forEach((item, index) => {
            // Click en elementos del dropdown
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const href = item.getAttribute('href');
                if (href) {
                    const pageName = href.replace('.html', '');
                    this.navigateToPage(pageName);
                    this.closeDropdown();
                }
            });

            // Hover effects mejorados
            item.addEventListener('mouseenter', () => {
                this.clearHoverTimeout(); // Limpiar timeout al entrar a un item
                this.highlightDropdownItem(item, index);
            });

            item.addEventListener('mouseleave', () => {
                this.unhighlightDropdownItem(item);
                // No cerrar inmediatamente, permitir navegación
            });
        });
    }

    // Configurar eventos de navegación general
    setupNavigationEvents() {
        this.navItems.forEach(item => {
            // Solo para nav-items que NO están en dropdown
            if (!item.closest('.dropdown')) {
                item.addEventListener('click', (e) => {
                    const href = item.getAttribute('href');
                    if (href && href.includes('.html')) {
                        e.preventDefault();
                        const pageName = href.replace('.html', '');
                        this.navigateToPage(pageName);
                    }
                });
            }
        });
    }

    // Configurar eventos de paneles
    setupPanelEvents() {
        this.panelCards.forEach(card => {
            // Usar data-page o extraer de onclick
            let pageName = card.getAttribute('data-page');
            
            if (!pageName) {
                const onclick = card.getAttribute('onclick');
                if (onclick && onclick.includes('.html')) {
                    const match = onclick.match(/(\w+)\.html/);
                    if (match) {
                        pageName = match[1];
                        card.setAttribute('data-page', pageName);
                        card.removeAttribute('onclick');
                    }
                }
            }

            if (pageName) {
                card.addEventListener('click', () => {
                    this.navigateToPage(pageName);
                });

                // Efectos mejorados de hover
                card.addEventListener('mouseenter', () => {
                    this.enhancePanelHover(card);
                });

                card.addEventListener('mouseleave', () => {
                    this.resetPanelHover(card);
                });
            }
        });
    }

    // Configurar eventos globales
    setupGlobalEvents() {
        // Cerrar dropdown al hacer click fuera - con delay
        document.addEventListener('click', (e) => {
            if (this.dropdown && !this.dropdown.contains(e.target)) {
                // Pequeño delay para evitar cierre accidental
                setTimeout(() => {
                    this.closeDropdown();
                }, 100);
            }
        });

        // NO cerrar dropdown al hacer scroll para mejor UX
        // window.addEventListener('scroll', () => {
        //     if (this.isOpen) {
        //         this.closeDropdown();
        //     }
        // });

        // Resize handler
        window.addEventListener('resize', () => {
            if (this.isOpen) {
                this.repositionDropdown();
            }
        });

        // Cerrar dropdown solo con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeDropdown();
            }
        });
    }

    // Configurar navegación por teclado
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'Escape':
                    if (this.isOpen) {
                        this.closeDropdown();
                        e.preventDefault();
                    }
                    break;
                    
                case 'Enter':
                    if (e.target.classList.contains('nav-item')) {
                        e.target.click();
                    }
                    break;
                    
                case 'ArrowDown':
                    if (this.isOpen) {
                        this.navigateDropdownItems('down');
                        e.preventDefault();
                    }
                    break;
                    
                case 'ArrowUp':
                    if (this.isOpen) {
                        this.navigateDropdownItems('up');
                        e.preventDefault();
                    }
                    break;
            }

            // Atajos de teclado (Alt + número)
            if (e.altKey) {
                const shortcuts = {
                    '1': 'index',
                    '2': 'carga',
                    '3': 'plazos',
                    '4': 'operativos',
                    '5': 'sentencias'
                };
                
                if (shortcuts[e.key]) {
                    e.preventDefault();
                    this.navigateToPage(shortcuts[e.key]);
                }
            }
        });
    }

    // Abrir dropdown con animación
    openDropdown() {
        if (this.isOpen || !this.dropdownContent) return;

        this.dropdownContent.style.display = 'block';
        
        // Forzar reflow para que la animación funcione
        this.dropdownContent.offsetHeight;
        
        // Aplicar estilos de apertura
        this.dropdownContent.style.opacity = '1';
        this.dropdownContent.style.visibility = 'visible';
        this.dropdownContent.style.transform = 'translateY(0)';
        
        this.isOpen = true;
        this.dropdown.classList.add('dropdown-open');
        
        // Disparar evento personalizado
        this.dispatchEvent('dropdownOpened');
        
        console.log('📂 Dropdown abierto');
    }

    // Cerrar dropdown con animación
    closeDropdown() {
        if (!this.isOpen || !this.dropdownContent) return;

        // Aplicar estilos de cierre
        this.dropdownContent.style.opacity = '0';
        this.dropdownContent.style.visibility = 'hidden';
        this.dropdownContent.style.transform = 'translateY(-10px)';
        
        // Ocultar después de la animación
        setTimeout(() => {
            if (this.dropdownContent) {
                this.dropdownContent.style.display = 'none';
            }
        }, 300);
        
        this.isOpen = false;
        this.dropdown.classList.remove('dropdown-open');
        
        // Disparar evento personalizado
        this.dispatchEvent('dropdownClosed');
        
        console.log('📁 Dropdown cerrado');
    }

    // Toggle dropdown
    toggleDropdown() {
        if (this.isOpen) {
            this.closeDropdown();
        } else {
            this.openDropdown();
        }
    }

    // Limpiar timeout de hover
    clearHoverTimeout() {
        if (this.hoverTimeout) {
            clearTimeout(this.hoverTimeout);
            this.hoverTimeout = null;
        }
    }

    // Navegar a una página
    navigateToPage(pageName) {
        console.log(`🔄 Navegando a: ${pageName}`);
        
        // Aquí puedes implementar tu lógica de navegación
        // Opción 1: Navegación tradicional
        window.location.href = `${pageName}.html`;
        
        // Opción 2: Para SPA (descomenta si usas Single Page Application)
        // this.loadPageContent(pageName);
        
        this.currentPage = pageName;
        this.highlightCurrentPage();
        
        // Disparar evento de navegación
        this.dispatchEvent('pageNavigation', { page: pageName });
    }

    // Obtener página actual
    getCurrentPage() {
        const path = window.location.pathname;
        const fileName = path.split('/').pop();
        return fileName.replace('.html', '') || 'index';
    }

    // Resaltar página actual en navegación
    highlightCurrentPage() {
        // Remover clases activas
        this.navItems.forEach(item => item.classList.remove('active'));
        this.dropdownItems.forEach(item => item.classList.remove('active'));
        
        // Agregar clase activa al elemento correspondiente
        const currentLink = document.querySelector(`[href="${this.currentPage}.html"]`);
        if (currentLink) {
            currentLink.classList.add('active');
        }
    }

    // Resaltar elemento del dropdown
    highlightDropdownItem(item, index) {
        // Efecto de brillo personalizado
        item.style.background = 'linear-gradient(45deg, #1e88e5, #00bcd4)';
        item.style.transform = 'translateX(8px)';
        item.style.paddingLeft = '28px';
        item.style.boxShadow = '0 5px 15px rgba(30, 136, 229, 0.4)';
        
        // Efecto de pulso sutil
        item.style.animation = 'pulse 1.5s infinite';
    }

    // Quitar resaltado del dropdown
    unhighlightDropdownItem(item) {
        item.style.background = '';
        item.style.transform = '';
        item.style.paddingLeft = '';
        item.style.boxShadow = '';
        item.style.animation = '';
    }

    // Mejorar hover de paneles
    enhancePanelHover(panel) {
        panel.style.transform = 'translateY(-10px) scale(1.02)';
        panel.style.borderColor = '#ffc107';
        panel.style.boxShadow = '0 30px 80px rgba(30, 136, 229, 0.4)';
        
        // Efecto en el icono
        const icon = panel.querySelector('.panel-icon');
        if (icon) {
            icon.style.transform = 'rotateY(360deg) scale(1.1)';
            icon.style.background = 'linear-gradient(45deg, #ffc107, #ff9800)';
        }
    }

    // Resetear hover de paneles
    resetPanelHover(panel) {
        panel.style.transform = '';
        panel.style.borderColor = '';
        panel.style.boxShadow = '';
        
        const icon = panel.querySelector('.panel-icon');
        if (icon) {
            icon.style.transform = '';
            icon.style.background = '';
        }
    }

    // Navegación por elementos del dropdown con teclado
    navigateDropdownItems(direction) {
        const items = Array.from(this.dropdownItems);
        let currentIndex = items.findIndex(item => item === document.activeElement);
        
        if (direction === 'down') {
            currentIndex = (currentIndex + 1) % items.length;
        } else {
            currentIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
        }
        
        items[currentIndex].focus();
    }

    // Reposicionar dropdown (útil en responsive)
    repositionDropdown() {
        if (!this.isOpen || !this.dropdownContent) return;
        
        const rect = this.dropdown.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        
        // Ajustar posición si se sale de la pantalla
        if (rect.right > viewportWidth - 20) {
            this.dropdownContent.style.left = 'auto';
            this.dropdownContent.style.right = '0';
        } else {
            this.dropdownContent.style.left = '0';
            this.dropdownContent.style.right = 'auto';
        }
    }

    // Disparar eventos personalizados
    dispatchEvent(eventName, detail = {}) {
        const event = new CustomEvent(`fecor:${eventName}`, {
            detail: { ...detail, dropdown: this }
        });
        document.dispatchEvent(event);
    }

    // Métodos públicos para control externo
    destroy() {
        this.closeDropdown();
        // Aquí podrías remover event listeners si es necesario
        console.log('🗑️ Sistema de dropdown destruido');
    }

    // Recargar sistema
    reload() {
        this.destroy();
        setTimeout(() => this.init(), 100);
    }
}

// Crear instancia global cuando el DOM esté listo
let fecorDropdown = null;

// Inicialización automática
document.addEventListener('DOMContentLoaded', () => {
    fecorDropdown = new FecorDropdownMenu();
    
    // Hacer disponible globalmente
    window.fecorDropdown = fecorDropdown;
});

// Event listeners para eventos personalizados
document.addEventListener('fecor:dropdownOpened', (e) => {
    console.log('🎉 Evento: Dropdown abierto', e.detail);
});

document.addEventListener('fecor:dropdownClosed', (e) => {
    console.log('📝 Evento: Dropdown cerrado', e.detail);
});

document.addEventListener('fecor:pageNavigation', (e) => {
    console.log('🔄 Evento: Navegación a página', e.detail.page);
});

// Funciones de utilidad globales
window.openFecorDropdown = () => fecorDropdown?.openDropdown();
window.closeFecorDropdown = () => fecorDropdown?.closeDropdown();
window.toggleFecorDropdown = () => fecorDropdown?.toggleDropdown();

// CSS adicional para animaciones (inyectado por JS)
const additionalCSS = `
    .dropdown-content {
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .dropdown-open .nav-item::after {
        transform: rotate(180deg);
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.8; }
    }
    
    .nav-item.active {
        background: linear-gradient(45deg, #ffc107, #ff9800) !important;
        color: #0a1929 !important;
        font-weight: 700;
    }
    
    .dropdown-content a.active {
        background: linear-gradient(45deg, #ffc107, #ff9800) !important;
        color: #0a1929 !important;
        font-weight: 700;
    }
`;

// Inyectar CSS adicional
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);

