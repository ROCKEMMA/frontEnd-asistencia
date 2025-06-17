import { cargarCSS } from '../../controles/controlCSS.js';

export function loginView() {
    cargarCSS('../views/login/loginView.css');

    let div = document.createElement('div');
    div.className = "login-container";

    let titulo = document.createElement('h2');
    titulo.innerText = "Iniciar Sesión";
    titulo.className = "login-title";
    div.appendChild(titulo);

    // Campo de Email
    let divEmail = document.createElement('div');
    divEmail.className = "input-group";
    
    let labelEmail = document.createElement('label');
    labelEmail.htmlFor = "emailInput";
    labelEmail.className = "input-label";
    
    // Icono Email + Texto
    let iconEmail = document.createElement('img');
    iconEmail.src = "../assets/icos/persona.svg";
    iconEmail.alt = "Icono email";
    iconEmail.className = "iconos";
    labelEmail.appendChild(iconEmail);
    labelEmail.appendChild(document.createTextNode("Correo o Usuario"));
    
    let entradaCorreo = document.createElement('input');
    entradaCorreo.type = "text";
    entradaCorreo.id = "emailInput";
    entradaCorreo.className = "input-field";
    entradaCorreo.placeholder = "Ingrese su correo";
    
    divEmail.appendChild(labelEmail);
    divEmail.appendChild(entradaCorreo);
    div.appendChild(divEmail);

    // Campo de Contraseña
    let divContrasenna = document.createElement('div');
    divContrasenna.className = "input-group";
    
    let labelPass = document.createElement('label');
    labelPass.htmlFor = "passInput";
    labelPass.className = "input-label";
    
    // Icono Contraseña + Texto
    let iconPass = document.createElement('img');
    iconPass.src = "../assets/icos/candado.svg";
    iconPass.alt = "Icono contraseña";
    iconPass.className = "iconos";
    labelPass.appendChild(iconPass);
    labelPass.appendChild(document.createTextNode("Contraseña"));
    
    let entradaContrasenna = document.createElement('input');
    entradaContrasenna.type = "password";
    entradaContrasenna.id = "passInput";
    entradaContrasenna.className = "input-field";
    entradaContrasenna.placeholder = "Ingrese su contraseña";
    
    divContrasenna.appendChild(labelPass);
    divContrasenna.appendChild(entradaContrasenna);
    div.appendChild(divContrasenna);

    // Enlace y Botón (sin cambios)
    let recuperacion = document.createElement('a');
    recuperacion.href = "#";
    recuperacion.innerText = "Recuperar contraseña";
    recuperacion.className = "recovery-link";
    div.appendChild(recuperacion);

    let boton = document.createElement('button');
    boton.innerText = "Iniciar";
    boton.type = "button";
    boton.className = "login-button";
    div.appendChild(boton);

    // Manejador de evento (sin cambios)
    boton.addEventListener("click", async () => {
        const email = entradaCorreo.value;
        const password = entradaContrasenna.value;        

        try {
            const response = await fetch('https://asistencia.jossuefuentes.space/login', {
            //const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            console.log(data);
            
            if (data.sesion) {
                console.log(data);
                localStorage.setItem("usuario", JSON.stringify(data));
                setTimeout(() => {
                    window.location.href = "dasboar.html";
                }, 100);
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