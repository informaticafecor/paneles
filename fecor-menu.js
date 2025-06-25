// fecor-menu.js - Sistema de Menú Unificado FECOR
class FecorMenuSystem {
    constructor() {
        this.menuHTML = `
            <!-- Fondo tecnológico -->
              <!-- Navegación superior -->
      <nav class="top-nav">
                <div class="nav-content">
                    <!-- Logo/Título FECOR (visible en móvil) -->
                    <div class="nav-logo">FECOR</div>
                    
                    <!-- Hamburger Menu Button (solo visible en móvil) -->
                    <button class="hamburger-btn" id="hamburger-btn" aria-label="Menú">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    
                    <!-- Navegación Desktop (se oculta en móvil) -->
                    <div class="nav-items">
                        <a href="index.html" class="nav-item">Inicio</a>
                        
                        <!-- Menú desplegable para Carga Procesal -->
                        <div class="dropdown">
                            <a href="" class="nav-item">Carga Procesal</a>
                            <div class="dropdown-content">
                                <a href="carga.html">Carga Supraprovincial</a>
                                <a href="cargasupra.html">Carga Provincial</a>
                                <a href="cargapool.html">Carga del Pool</a>
                            </div>
                        </div>
                        
                        <a href="plazos.html" class="nav-item">Plazos</a>
                        <a href="operativos.html" class="nav-item">Operativos</a>
                        <a href="sentencias.html" class="nav-item">Sentencias</a>
                        
                    </div>
                </div>
            </nav>
  

    <!-- ===== ELEMENTOS MÓVILES QUE FALTABAN ===== -->
    
    <!-- Sidebar Overlay (fondo oscuro cuando está abierto) -->
    <div class="sidebar-overlay" id="sidebar-overlay"></div>

    <!-- Sidebar Navigation (menú lateral móvil) -->
    <nav class="sidebar-nav" id="sidebar-nav">
        <div class="sidebar-header">
            <div class="sidebar-title">Menú FECOR</div>
            <button class="close-sidebar" id="close-sidebar" aria-label="Cerrar menú">✕</button>
        </div>
        <div class="sidebar-content">
            <a href="index.html" class="sidebar-nav-item">
                <span class="sidebar-icon">🏠</span>
                <span>Inicio</span>
            </a>
            
            <!-- Sidebar Dropdown para Carga Procesal -->
            <div class="sidebar-dropdown" id="sidebar-dropdown">
                <a href="#" class="sidebar-nav-item sidebar-dropdown-toggle">
                    <span class="sidebar-icon">📋</span>
                    <span>Carga Procesal</span>
                    <span class="dropdown-arrow">▼</span>
                </a>
                <div class="sidebar-dropdown-content">
                    <a href="carga.html" class="sidebar-dropdown-item">
                        <span class="sidebar-icon">📊</span>
                        <span>Carga Supraprovincial</span>
                    </a>
                    <a href="cargasupra.html" class="sidebar-dropdown-item">
                        <span class="sidebar-icon">🏛️</span>
                        <span>Carga Provincial</span>
                    </a>
                    <a href="cargapool.html" class="sidebar-dropdown-item">
                        <span class="sidebar-icon">👥</span>
                        <span>Carga del Pool</span>
                    </a>
                </div>
            </div>
            
            <a href="plazos.html" class="sidebar-nav-item">
                <span class="sidebar-icon">⏱️</span>
                <span>Plazos</span>
            </a>
            <a href="operativos.html" class="sidebar-nav-item">
                <span class="sidebar-icon">🚁</span>
                <span>Operativos</span>
            </a>
            <a href="sentencias.html" class="sidebar-nav-item">
                <span class="sidebar-icon">⚖️</span>
                <span>Sentencias</span>
            </a>
        </div>
    </nav>
     
        `;
    }

    // Método para inyectar el menú en el DOM
    inject() {
        console.log('🔧 Inyectando menú FECOR...');
        
        // Crear contenedor temporal
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = this.menuHTML;
        
        // Inyectar elementos al inicio del body
        const body = document.body;
        while (tempDiv.firstChild) {
            body.insertBefore(tempDiv.firstChild, body.firstChild);
        }
        
        // Inicializar funcionalidad después de un breve delay
        setTimeout(() => {
            this.initMobileNav();
        }, 100);
        
        console.log('✅ Menú FECOR inyectado correctamente');
    }

    // Inicializar navegación móvil
    initMobileNav() {
        console.log('📱 Inicializando navegación móvil...');
        
        // Elementos del DOM
        this.hamburgerBtn = document.getElementById('hamburger-btn');
        this.sidebar = document.getElementById('sidebar-nav');
        this.overlay = document.getElementById('sidebar-overlay');
        this.closeBtn = document.getElementById('close-sidebar');
        this.dropdown = document.getElementById('sidebar-dropdown');
        
        // Estados
        this.isOpen = false;
        this.isDropdownOpen = false;
        
        // Configurar event listeners
        this.setupEventListeners();
        
        // Configurar navegación
        this.setupNavigation();
        
        // Configurar dropdown desktop
        this.setupDesktopDropdown();
        
        console.log('✅ Navegación móvil inicializada');
    }

    // Configurar event listeners
    setupEventListeners() {
        // Event listeners para sidebar
        this.hamburgerBtn?.addEventListener('click', () => this.toggleSidebar());
        this.closeBtn?.addEventListener('click', () => this.closeSidebar());  
        this.overlay?.addEventListener('click', () => this.closeSidebar());
        
        // Dropdown en sidebar
        this.dropdown?.addEventListener('click', (e) => {
            if (e.target.closest('.sidebar-dropdown-toggle')) {
                e.preventDefault();
                this.toggleDropdown();
            }
        });

        // Cerrar con tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeSidebar();
            }
        });
    }

    // Alternar sidebar
    toggleSidebar() {
        if (this.isOpen) {
            this.closeSidebar();
        } else {
            this.openSidebar();
        }
    }

    // Abrir sidebar
    openSidebar() {
        this.sidebar?.classList.add('active');
        this.overlay?.classList.add('active');
        this.hamburgerBtn?.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.isOpen = true;
        console.log('📂 Sidebar abierto');
    }

    // Cerrar sidebar
    closeSidebar() {
        this.sidebar?.classList.remove('active');
        this.overlay?.classList.remove('active');
        this.hamburgerBtn?.classList.remove('active');
        document.body.style.overflow = '';
        this.isOpen = false;
        console.log('📁 Sidebar cerrado');
    }

    // Alternar dropdown
    toggleDropdown() {
        this.dropdown?.classList.toggle('active');
        this.isDropdownOpen = !this.isDropdownOpen;
        console.log(`📋 Dropdown ${this.isDropdownOpen ? 'abierto' : 'cerrado'}`);
    }

    // Configurar navegación
    setupNavigation() {
        // Enlaces del sidebar
        const sidebarLinks = document.querySelectorAll('.sidebar-nav-item:not(.sidebar-dropdown-toggle), .sidebar-dropdown-item');
        
        sidebarLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href !== '#' && href.includes('.html')) {
                    this.closeSidebar();
                    setTimeout(() => {
                        window.location.href = href;
                    }, 300);
                }
            });
        });
    }

    // Configurar dropdown desktop
    setupDesktopDropdown() {
        const dropdown = document.querySelector('.dropdown');
        const dropdownContent = document.querySelector('.dropdown-content');
        
        if (dropdown && dropdownContent) {
            let timeout;
            
            // Mostrar dropdown al pasar el mouse
            dropdown.addEventListener('mouseenter', () => {
                clearTimeout(timeout);
                dropdownContent.style.display = 'block';
                setTimeout(() => {
                    dropdownContent.style.opacity = '1';
                    dropdownContent.style.visibility = 'visible';
                    dropdownContent.style.transform = 'translateY(0)';
                }, 10);
            });
            
            // Ocultar dropdown al salir el mouse
            dropdown.addEventListener('mouseleave', () => {
                timeout = setTimeout(() => {
                    dropdownContent.style.opacity = '0';
                    dropdownContent.style.visibility = 'hidden';
                    dropdownContent.style.transform = 'translateY(-10px)';
                    setTimeout(() => {
                        dropdownContent.style.display = 'none';
                    }, 300);
                }, 500);
            });
        }
    }

    // Método público para recargar el menú
    reload() {
        console.log('🔄 Recargando menú FECOR...');
        
        // Remover elementos existentes
        const existingNav = document.querySelector('.top-nav');
        const existingSidebar = document.querySelector('.sidebar-nav');
        const existingOverlay = document.querySelector('.sidebar-overlay');
        const existingBg = document.querySelector('.tech-bg');
        
        existingNav?.remove();
        existingSidebar?.remove();
        existingOverlay?.remove();
        existingBg?.remove();
        
        // Volver a inyectar
        this.inject();
    }

    // Método para destruir el menú
    destroy() {
        console.log('🗑️ Destruyendo menú FECOR...');
        
        // Remover event listeners
        this.hamburgerBtn?.removeEventListener('click', this.toggleSidebar);
        this.closeBtn?.removeEventListener('click', this.closeSidebar);
        this.overlay?.removeEventListener('click', this.closeSidebar);
        
        // Remover elementos del DOM
        document.querySelector('.top-nav')?.remove();
        document.querySelector('.sidebar-nav')?.remove();
        document.querySelector('.sidebar-overlay')?.remove();
        document.querySelector('.tech-bg')?.remove();
        
        console.log('✅ Menú FECOR destruido');
    }
}

// Crear instancia global
window.FecorMenuSystem = FecorMenuSystem;
window.fecorMenu = null;

// Auto-inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Inicializando Sistema de Menú FECOR...');
    
    try {
        window.fecorMenu = new FecorMenuSystem();
        window.fecorMenu.inject();
        
        console.log('🎉 Sistema de Menú FECOR completamente cargado');
        
        // Disparar evento personalizado
        document.dispatchEvent(new CustomEvent('fecorMenuReady', {
            detail: { menu: window.fecorMenu }
        }));
        
    } catch (error) {
        console.error('❌ Error al inicializar menú FECOR:', error);
    }
});

// Event listener para cuando el menú esté listo
document.addEventListener('fecorMenuReady', (e) => {
    console.log('✨ Menú FECOR listo para usar:', e.detail);
});

// Funciones globales de utilidad
window.reloadFecorMenu = () => {
    if (window.fecorMenu) {
        window.fecorMenu.reload();
    }
};

window.destroyFecorMenu = () => {
    if (window.fecorMenu) {
        window.fecorMenu.destroy();
        window.fecorMenu = null;
    }
};