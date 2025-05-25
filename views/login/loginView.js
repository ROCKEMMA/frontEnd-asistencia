import { cargarCSS } from '../../controles/controlCSS.js';

export function loginView() {
    cargarCSS('../views/login/loginView.css');

    let div = document.createElement('div');
    div.className = "login-container";

    let titulo = document.createElement('h2');
    titulo.innerText = "Iniciar Sesión";
    titulo.className = "login-title";
    div.appendChild(titulo);

    // Contenedor para email
    let divEmail = document.createElement('div');
    divEmail.className = "input-group";
    
    let labelEmail = document.createElement('label');
    labelEmail.innerText = "Correo electrónico:";
    labelEmail.htmlFor = "emailInput";
    labelEmail.className = "input-label";
    
    let entradaCorreo = document.createElement('input');
    entradaCorreo.type = "text";
    entradaCorreo.id = "emailInput";
    entradaCorreo.className = "input-field";
    entradaCorreo.placeholder = "Ingrese su correo";
    
    divEmail.appendChild(labelEmail);
    divEmail.appendChild(entradaCorreo);
    div.appendChild(divEmail);

    // Contenedor para contraseña
    let divContrasenna = document.createElement('div');
    divContrasenna.className = "input-group";
    
    let labelPass = document.createElement('label');
    labelPass.innerText = "Contraseña:";
    labelPass.htmlFor = "passInput";
    labelPass.className = "input-label";
    
    let entradaContrasenna = document.createElement('input');
    entradaContrasenna.type = "password";
    entradaContrasenna.id = "passInput";
    entradaContrasenna.className = "input-field";
    entradaContrasenna.placeholder = "Ingrese su contraseña";
    
    divContrasenna.appendChild(labelPass);
    divContrasenna.appendChild(entradaContrasenna);
    div.appendChild(divContrasenna);

    // Enlace de recuperación de contraseña
    let recuperacion = document.createElement('a');
    recuperacion.href = "#";
    recuperacion.innerText = "Recuperación de contraseña";
    recuperacion.className = "recovery-link";
    div.appendChild(recuperacion);

    // Botón de enviar
    let boton = document.createElement('button');
    boton.innerText = "Ingresar";
    boton.type = "button";
    boton.className = "login-button";
    div.appendChild(boton);

    // Manejador de evento básico
    boton.addEventListener("click", async () => {
        const email = entradaCorreo.value;
        const password = entradaContrasenna.value;        

        try {
            const response = await fetch('https://asistencia.jossuefuentes.space/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
                
            });

            const data = await response.json();
            console.log(data);
            

            if (data.success) {
                // Redirección básica (sin manejo de roles aún)
                window.location.href = "dasboar.html";
            } else {
                alert(data.error || "Error al iniciar sesión");
            }
        } catch (error) {
            alert("Error de conexión: " + error.message);
        }
    });

    return div;
}

document.body.appendChild(loginView());