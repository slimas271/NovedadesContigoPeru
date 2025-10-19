document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");
    const modal = document.querySelector("#modal-container");
    const modalBody = document.querySelector("#modal-body");
    const modalClose = document.querySelector(".modal-close");

    /* ===============================
    NAVBAR TOGGLE (MENÚ RESPONSIVE)
    =============================== */
    if (!navToggle.innerHTML.trim()) {
        navToggle.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#fff" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
            </svg>`;
    }

    navToggle.setAttribute("aria-expanded", "false");

    navToggle.addEventListener("click", () => {
        const expanded = navToggle.getAttribute("aria-expanded") === "true" || false;
        navToggle.setAttribute("aria-expanded", !expanded);

        // 🔧 Solución: mostrar u ocultar lista del menú
        navLinks.hidden = !navLinks.hidden;

        navLinks.classList.toggle("show");
        navToggle.classList.toggle("active");

        navToggle.innerHTML = navToggle.classList.contains("active")
            ? `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#fff" viewBox="0 0 24 24"><path d="M6 6L18 18M6 18L18 6" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>`
            : `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#fff" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>`;
    });

    /* ===============================
    CERRAR MENÚ AL HACER CLIC EN LINK
    =============================== */
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", e => {
            const isDropdown = link.closest(".dropdown");
            if (isDropdown && link.classList.contains("dropdown-toggle")) {
                e.preventDefault(); 
                return;
            }
            navLinks.classList.remove("show");
            navLinks.hidden = true;
            navToggle.classList.remove("active");
            navToggle.setAttribute("aria-expanded", "false");
        });
    });

    /* ===============================
    MODAL DINÁMICO
    =============================== */
    document.querySelectorAll(".dropdown-menu a").forEach(item => {
        item.addEventListener("click", e => {
            e.preventDefault();
            const text = item.textContent.trim();
            let contenido = "";

            switch (text) {
                case "Seguimiento de mi Pedido":
                    contenido = `
                        <h2>🚚 Seguimiento de Pedido</h2>
                        <p>Puedes rastrear el estado de tu pedido ingresando tu número de seguimiento.</p>`;
                    break;
                case "Políticas de Privacidad":
                    contenido = `
                        <h2>🔒 Políticas de Privacidad</h2>
                        <p>Protegemos tus datos personales. No compartimos tu información sin tu consentimiento.</p>`;
                    break;
                case "Términos y Condiciones":
                    contenido = `
                        <h2>📜 Términos y Condiciones</h2>
                        <p>Al usar nuestro sitio aceptas nuestras políticas de uso, pagos y devoluciones.</p>`;
                    break;
                case "Contacto y sobre Nosotros":
                    contenido = `
                        <h2>📞 Sobre Nosotros</h2>
                        <p>Somos <strong>Novedades Contigo Perú</strong>, líderes en accesorios de calidad premium.</p>
                        <p>Escríbenos a <strong>contacto@novedadescontigo.pe</strong></p>`;
                    break;
                case "Libro de Reclamaciones":
                    contenido = `
                        <h2>📕 Libro de Reclamaciones</h2>
                        <p>Puedes presentar tu reclamo llenando el formulario oficial del MINCETUR.</p>`;
                    break;
                default:
                    contenido = `<h2>${text}</h2><p>Contenido próximamente disponible.</p>`;
            }

            modalBody.innerHTML = contenido;
            modal.classList.add("show");
            modal.setAttribute("aria-hidden", "false");
        });
    });

    /* ===============================
    CERRAR MODAL
    =============================== */
    const cerrarModal = () => {
        modal.classList.remove("show");
        setTimeout(() => {
            modal.setAttribute("aria-hidden", "true");
            modalBody.innerHTML = "";
        }, 300);
    };

    modalClose.addEventListener("click", cerrarModal);
    modal.addEventListener("click", e => {
        if (e.target === modal) cerrarModal();
    });

    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && modal.classList.contains("show")) cerrarModal();
    });
});
