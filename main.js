document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");
    const dropdowns = document.querySelectorAll(".dropdown");
    const modal = document.querySelector("#modal-container");
    const modalBody = document.querySelector("#modal-body");
    const modalClose = document.querySelector(".modal-close");

    // Helper
    const isMobile = () => window.innerWidth <= 768;

    // Atributos iniciales seguros
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
    if (navLinks) navLinks.hidden = isMobile();

    // Actualizar al redimensionar (desktop <-> mobile)
    window.addEventListener("resize", () => {
        if (!navLinks) return;
        // en escritorio siempre mostrar nav (no hidden)
        navLinks.hidden = isMobile();
        if (!isMobile()) {
            navLinks.classList.remove("show");
            if (navToggle) {
                navToggle.classList.remove("active");
                navToggle.setAttribute("aria-expanded", "false");
            }
            // cerrar submenus
            dropdowns.forEach(d => d.classList.remove("show"));
        }
    });

    const closeAllMenus = () => {
        if (navLinks) {
            navLinks.classList.remove("show");
            navLinks.hidden = isMobile();
        }
        dropdowns.forEach(d => d.classList.remove("show"));
        if (navToggle) {
            navToggle.classList.remove("active");
            navToggle.setAttribute("aria-expanded", "false");
        }
    };

    /* NAVBAR TOGGLE: abre solo el panel principal en móvil */
    if (navToggle && navLinks) {
        navToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            // solo en mobile togglear visibilidad
            if (isMobile()) {
                const isOpen = navLinks.classList.toggle("show");
                navLinks.hidden = !isOpen;
                navToggle.classList.toggle("active", isOpen);
                navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
                dropdowns.forEach(d => d.classList.remove("show"));
            }
        });
    }

    /* Dropdown: toggle por click (funciona en desktop y mobile) */
    dropdowns.forEach(drop => {
        const toggle = drop.querySelector(".dropdown-toggle");
        if (!toggle) return;
        toggle.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            // cerrar otros submenus
            dropdowns.forEach(d => { if (d !== drop) d.classList.remove("show"); });
            drop.classList.toggle("show");
        });
    });

    /* Abrir modal desde items del dropdown (mantiene tu lógica) */
    document.querySelectorAll(".dropdown-menu a").forEach(item => {
        item.addEventListener("click", e => {
            e.preventDefault();
            const text = item.textContent.trim();
            let contenido = `<h2>${text}</h2><p>Contenido próximamente disponible.</p>`;
            switch (text) {
                case "Seguimiento de mi Pedido":
                    contenido = `<h2>🚚 Seguimiento de Pedido</h2><p>Puedes rastrear el estado de tu pedido ingresando tu número de seguimiento.</p>`;
                    break;
                case "Políticas de Privacidad":
                    contenido = `<h2>🔒 Políticas de Privacidad</h2><p>Protegemos tus datos personales. No compartimos tu información sin tu consentimiento.</p>`;
                    break;
                case "Términos y Condiciones":
                    contenido = `<h2>📜 Términos y Condiciones</h2><p>Al usar nuestro sitio aceptas nuestras políticas de uso, pagos y devoluciones.</p>`;
                    break;
                case "Contacto y sobre Nosotros":
                    contenido = `<h2>📞 Sobre Nosotros</h2><p>Somos <strong>Novedades Contigo Perú</strong>. Escríbenos a <strong>contacto@novedadescontigo.pe</strong></p>`;
                    break;
                case "Libro de Reclamaciones":
                    contenido = `<h2>📕 Libro de Reclamaciones</h2><p>Puedes presentar tu reclamo llenando el formulario oficial del MINCETUR.</p>`;
                    break;
            }
            if (modal && modalBody) {
                modalBody.innerHTML = contenido;
                modal.classList.add("show");
                modal.setAttribute("aria-hidden", "false");
            }
            closeAllMenus();
        });
    });

    /* Cerrar modal */
    const cerrarModal = () => {
        if (!modal) return;
        modal.classList.remove("show");
        setTimeout(() => {
            modal.setAttribute("aria-hidden", "true");
            if (modalBody) modalBody.innerHTML = "";
        }, 250);
    };
    if (modalClose) modalClose.addEventListener("click", cerrarModal);
    if (modal) modal.addEventListener("click", e => { if (e.target === modal) cerrarModal(); });

    /* Click fuera: cerrar todo */
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".site-nav")) {
            closeAllMenus();
        }
    });

    /* ESC: cerrar todo */
    document.addEventListener("keydown", e => {
        if (e.key === "Escape") {
            if (modal && modal.classList.contains("show")) cerrarModal();
            closeAllMenus();
        }
    });
});
