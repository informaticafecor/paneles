   // Sistema de Sidebar FECOR
        class FecorSidebar {
            constructor() {
                this.hamburgerBtn = document.getElementById('hamburger-btn');
                this.sidebar = document.getElementById('sidebar-nav');
                this.overlay = document.getElementById('sidebar-overlay');
                this.closeBtn = document.getElementById('close-sidebar');
                this.dropdown = document.getElementById('sidebar-dropdown');
                this.isOpen = false;
                
                this.init();
            }

            init() {
                // Event listeners
                this.hamburgerBtn?.addEventListener('click', () => this.toggleSidebar());
                this.closeBtn?.addEventListener('click', () => this.closeSidebar());
                this.overlay?.addEventListener('click', () => this.closeSidebar());
                
                // Dropdown en sidebar
                this.dropdown?.addEventListener('click', (e) => {
                    if (e.target.classList.contains('sidebar-dropdown-toggle')) {
                        e.preventDefault();
                        this.toggleDropdown();
                    }
                });

                // Cerrar con ESC
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && this.isOpen) {
                        this.closeSidebar();
                    }
                });

                // Navigation links
                this.setupNavigation();

                console.log('🍔 Sidebar FECOR inicializado');
            }

            toggleSidebar() {
                if (this.isOpen) {
                    this.closeSidebar();
                } else {
                    this.openSidebar();
                }
            }

            openSidebar() {
                this.sidebar?.classList.add('active');
                this.overlay?.classList.add('active');
                this.hamburgerBtn?.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevenir scroll
                this.isOpen = true;
            }

            closeSidebar() {
                this.sidebar?.classList.remove('active');
                this.overlay?.classList.remove('active');
                this.hamburgerBtn?.classList.remove('active');
                document.body.style.overflow = '';
                this.isOpen = false;
            }

            toggleDropdown() {
                this.dropdown?.classList.toggle('active');
            }

            setupNavigation() {
                // Enlaces del sidebar
                const sidebarLinks = document.querySelectorAll('.sidebar-nav-item, .sidebar-dropdown-item');
                sidebarLinks.forEach(link => {
                    link.addEventListener('click', (e) => {
                        const href = link.getAttribute('href');
                        if (href && href !== '#' && href.includes('.html')) {
                            // Cerrar sidebar antes de navegar
                            this.closeSidebar();
                            
                            // Opcional: Agregar pequeño delay para animación
                            setTimeout(() => {
                                window.location.href = href;
                            }, 300);
                        }
                    });
                });
            }
        }

        // Inicializar cuando el DOM esté listo
        document.addEventListener('DOMContentLoaded', () => {
            window.fecorSidebar = new FecorSidebar();
        });

        // También inicializar dropdown desktop si existe
        document.addEventListener('DOMContentLoaded', () => {
            const dropdown = document.querySelector('.dropdown');
            const dropdownContent = document.querySelector('.dropdown-content');
            
            if (dropdown && dropdownContent) {
                let timeout;
                
                dropdown.addEventListener('mouseenter', () => {
                    clearTimeout(timeout);
                    dropdownContent.style.display = 'block';
                    setTimeout(() => {
                        dropdownContent.style.opacity = '1';
                        dropdownContent.style.visibility = 'visible';
                        dropdownContent.style.transform = 'translateY(0)';
                    }, 10);
                });
                
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
        });