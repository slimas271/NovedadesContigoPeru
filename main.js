document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTOS PRINCIPALES ---
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');
    const modal = document.getElementById('modal-container');
    const modalBody = document.getElementById('modal-body');
    const body = document.body;

    // --- MENÚ HAMBURGUESA ---
    navToggle?.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('show');
        navToggle.classList.toggle('open');
        body.classList.toggle('no-scroll');
    });

    // --- DROPDOWN ---
    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', e => {
        e.preventDefault();
        const parent = toggle.closest('.dropdown');
        // cerrar otros dropdowns
        dropdowns.forEach(d => { if (d !== parent) d.classList.remove('open'); });
        parent.classList.toggle('open');
        });
    });

    // --- CERRAR MENÚ AL HACER CLICK FUERA ---
    document.addEventListener('click', e => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('show');
        navToggle.classList.remove('open');
        dropdowns.forEach(d => d.classList.remove('open'));
        body.classList.remove('no-scroll');
        }
    });

    // --- MODAL ---
    function abrirModal(html) {
        if (!modal || !modalBody) return;
        modalBody.innerHTML = html;
        modal.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
    }

    function cerrarModal() {
        modal?.classList.remove('show');
        modal?.setAttribute('aria-hidden', 'true');
    }

    // Cerrar modal al click en overlay o botón cerrar
    modal?.addEventListener('click', e => {
        if (e.target === modal || e.target.classList.contains('modal-close')) cerrarModal();
        if (e.target.classList.contains('modal-btn')) cerrarModal();
    });

    // --- DROPDOWN LINKS ABREN MODAL ---
    document.querySelectorAll('.dropdown-menu a').forEach(link => {
        link.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        const texto = link.textContent.trim();
        let contenido = '';

        switch (true) {
            case /Seguimiento/i.test(texto):
            contenido = `
                <h2>🚚 Seguimiento de tu Pedido</h2>
                <p>Próximamente podrás consultar el estado de tus pedidos aquí. Gracias por tu paciencia 💛</p>
                <button class="modal-btn">Aceptar</button>`;
            break;
            case /Contacto/i.test(texto):
            contenido = `
                <h2>📩 Contacto y sobre Nosotros</h2>
                <p>Somos Novedades Contigo Perú, comprometidos con la calidad y la comodidad de nuestros clientes.<br>
                Escríbenos a: <strong>contacto@novedadescontigoperu.com</strong></p>
                <button class="modal-btn">Aceptar</button>`;
            break;
            case /Políticas/i.test(texto):
            contenido = `
                <h2>🛡️ Políticas de Privacidad</h2>
                <p>Tu información está segura con nosotros. No compartimos tus datos con terceros sin tu consentimiento.</p>
                <button class="modal-btn">Aceptar</button>`;
            break;
            case /Términos/i.test(texto):
            contenido = `
                <h2>📜 Términos y Condiciones</h2>
                <p>Al usar nuestro sitio web, aceptas nuestras políticas y condiciones de uso.</p>
                <button class="modal-btn">Aceptar</button>`;
            break;
            case /Cookies/i.test(texto):
            contenido = `
                <h2>🍪 Política de Cookies</h2>
                <p>Usamos cookies para mejorar tu experiencia. Puedes aceptar o rechazar su uso en cualquier momento.</p>
                <button class="modal-btn">Aceptar</button>`;
            break;
            case /Libro/i.test(texto):
            contenido = `
                <h2>📖 Libro de Reclamaciones</h2>
                <p>Puedes presentar tu reclamo de manera formal a través de nuestro formulario de atención.</p>
                <button class="modal-btn">Aceptar</button>`;
            break;
            default:
            contenido = `<h2>Información</h2><p>${texto}</p><button class="modal-btn">Aceptar</button>`;
        }

        abrirModal(contenido);
        });
    });

    // --- ESCAPE ---
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
        cerrarModal();
        navMenu.classList.remove('show');
        navToggle.classList.remove('open');
        dropdowns.forEach(d => d.classList.remove('open'));
        body.classList.remove('no-scroll');
        }
    });

    // --- RESIZE ---
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
        navMenu.classList.remove('show');
        navToggle.classList.remove('open');
        body.classList.remove('no-scroll');
        dropdowns.forEach(d => d.classList.remove('open'));
        }
    });
});
