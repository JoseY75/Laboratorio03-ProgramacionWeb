document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Interacción: Bienvenida
    alert("¡Bienvenido al sitio web!");

    // 2. Interacción: Menú Hamburguesa
    const hbMenu = document.getElementById('hamburgerMenu');
    const mainNav = document.getElementById('mainNav');
    hbMenu.addEventListener('click', () => mainNav.classList.toggle('show'));

    // 3. Interacción: Botón Reserva con Confirmación y Redirección
    document.getElementById('btnReserva').addEventListener('click', () => {
        const respuesta = confirm("¿Deseas realizar una reserva? Te llevaremos al formulario.");
        if (respuesta) {
            document.getElementById('seccion-contacto').scrollIntoView({ behavior: 'smooth' });
        }
    });

    // 4. Interacción: Validación Estricta
    const contactForm = document.getElementById('contactForm');
    
    // Filtro anti-símbolos en tiempo real
    const soloAlfaNum = (e) => {
        e.target.value = e.target.value.replace(/[^a-zA-Z0-9ÁÉÍÓÚáéíóúñÑ\s]/g, "");
    };
    document.getElementById('asunto').addEventListener('input', soloAlfaNum);
    document.getElementById('mensaje').addEventListener('input', soloAlfaNum);

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let esValido = true;

        // Reglas de seguridad
        const regexNombre = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]{3,}$/;
        // Email: Excluye terminaciones falsas como .cox
        const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.(com|pe|net|org|edu)$/;

        const campos = [
            { el: document.getElementById('nombre'), reg: regexNombre, error: "Use solo letras (mín. 3)." },
            { el: document.getElementById('email'), reg: regexEmail, error: "Email inválido (Use .com, .pe, etc)." },
            { el: document.getElementById('asunto'), min: 4, error: "Mín. 4 caracteres, sin símbolos." },
            { el: document.getElementById('mensaje'), min: 10, error: "Mín. 10 caracteres, sin símbolos." }
        ];

        campos.forEach(campo => {
            const val = campo.el.value.trim();
            const errorDiv = campo.el.nextElementSibling;
            
            let falla = false;
            if (val === "") falla = true;
            else if (campo.reg && !campo.reg.test(val)) falla = true;
            else if (campo.min && val.length < campo.min) falla = true;

            if (falla) {
                errorDiv.innerText = campo.error || "Campo obligatorio";
                campo.el.classList.add('input-invalid');
                esValido = false;
            } else {
                errorDiv.innerText = "";
                campo.el.classList.remove('input-invalid');
            }
        });

        if (esValido) {
            alert("¡Éxito! Su mensaje ha sido validado y enviado correctamente.");
            contactForm.reset();
        }
    });

    // 5-6. Interacción: Tabla (Agregar/Eliminar)
    const tabla = document.querySelector('#tablaInteractiva tbody');
    document.getElementById('addFila').addEventListener('click', () => {
        const row = tabla.insertRow();
        for(let i=0; i<5; i++) row.insertCell(i).innerText = "Texto";
    });
    document.getElementById('delFila').addEventListener('click', () => {
        if(tabla.rows.length > 0) tabla.deleteRow(-1);
    });

    // 7-8. Interacción: Tutoriales (Desplegar y cambio de icono)
    document.querySelectorAll('.tutorial-trigger').forEach(t => {
        t.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('i');
            const isHidden = content.style.display === "none";
            content.style.display = isHidden ? "block" : "none";
            icon.className = isHidden ? "bi bi-dash-circle text-danger" : "bi bi-plus-circle text-success";
        });
    });

    // 9. Interacción: Hover en tabla
    tabla.addEventListener('mouseover', (e) => {
        if(e.target.tagName === 'TD') e.target.parentElement.style.backgroundColor = "#e8f5e9";
    });
    tabla.addEventListener('mouseout', (e) => {
        if(e.target.tagName === 'TD') e.target.parentElement.style.backgroundColor = "";
    });

    // 10. Interacción: Click en Redes Sociales (Alerta)
    document.querySelectorAll('.social-section i').forEach(icon => {
        icon.addEventListener('click', function() {
            alert("Redireccionando a nuestra red social...");
        });
    });
});