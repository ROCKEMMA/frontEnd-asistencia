import { cargarCSS } from "../../controles/controlCSS.js";

export function moduloUniforme(nombreUniforme, correoAlumno, apiUrl) {
    cargarCSS('../modules/uniforme/uniformeModulo.css');

    const bloqueUniforme = document.createElement('div');
    bloqueUniforme.className = "div-uniforme";
    let textoPredeterminado = "";

    // Título
    const textoUniforme = document.createElement('p');
    textoUniforme.className = "texto-uniforme";
    textoUniforme.innerText = nombreUniforme;
    bloqueUniforme.appendChild(textoUniforme);

    // Contenedor de imágenes
    const divImagenes = document.createElement('div');
    divImagenes.className = "imagenes-uniforme";
    bloqueUniforme.appendChild(divImagenes);

    const prendas = [
        { nombre: "camisa", src: "../assets/icos/camisa_ico.jpg" },
        { nombre: "sueter", src: "../assets/icos/sueter_ico.png" },
        { nombre: "pantalon", src: "../assets/icos/pantalon_ico.png" },
        { nombre: "zapato", src: "../assets/icos/zapato_ico.png" }
    ];

    const seleccion = {
        camisa: false,
        sueter: false,
        pantalon: false,
        zapato: false
    };

    // Textos automáticos para cada prenda
    const textosPredeterminados = {
        camisa: "No trajo la camisa",
        sueter: "No trajo el suéter",
        pantalon: "No trajo el pantalón",
        zapato: "No trajo los zapatos"
    };

    // Contenedor para los campos de observación
    const divObservaciones = document.createElement('div');
    divObservaciones.className = "observaciones-prendas";
    bloqueUniforme.appendChild(divObservaciones);

    // Objeto para guardar referencias a los textarea de observaciones
    const textareasObservacion = {};

    prendas.forEach(prenda => {
        // Crear imagen
        const img = document.createElement('img');
        img.src = prenda.src;
        img.className = "icono-uniforme";
        img.dataset.tipo = prenda.nombre;

        // Crear textarea oculto para observación específica de la prenda
        const textareaObs = document.createElement('textarea');
        textareaObs.className = "observacion-prenda";
        textareaObs.placeholder = `Observación para ${prenda.nombre} (ej. "No trajo la ${prenda.nombre}")`;
        textareaObs.style.display = "none"; // Oculto por defecto
        divObservaciones.appendChild(textareaObs);

        // Guardar referencia
        textareasObservacion[prenda.nombre] = textareaObs;

        // Evento click en la imagen
        img.addEventListener('click', () => {
            // Primero deseleccionar todos
            prendas.forEach(p => {
                if (p.nombre !== prenda.nombre) {
                    seleccion[p.nombre] = false;
                    textareasObservacion[p.nombre].style.display = "none";
                    // Quitar clase seleccionado
                    const imgs = divImagenes.querySelectorAll('img');
                    imgs.forEach(i => {
                        if(i.dataset.tipo === p.nombre){
                            i.classList.remove('seleccionado');
                        }
                    });
                }
            });

            // Toggle selección actual
            const estaSeleccionado = seleccion[prenda.nombre];
            if(estaSeleccionado) {
                // Si ya estaba seleccionado, lo deseleccionamos
                seleccion[prenda.nombre] = false;
                textareaObs.style.display = "none";
                img.classList.remove('seleccionado');
            } else {
                // Seleccionamos la prenda clickeada
                seleccion[prenda.nombre] = true;
                textareaObs.style.display = "block";
                if(textareaObs.value.trim() === "") {
                    textareaObs.value = textosPredeterminados[prenda.nombre];
                    textoPredeterminado = textosPredeterminados[prenda.nombre];
                }
                img.classList.add('seleccionado');
            }
        });

        divImagenes.appendChild(img);
    });

    // Textarea para mensaje general
    const informacion = document.createElement('textarea');
    informacion.className = "cuerpo-uniforme";
    informacion.placeholder = "Escribe tu mensaje general aquí...";
    bloqueUniforme.appendChild(informacion);


    // Botón para enviar correo (puedes implementar la lógica)
    const botonEnviarCorreo = document.createElement('button');
    botonEnviarCorreo.className = "boton2";
    botonEnviarCorreo.innerText = "Enviar correo";

    // Crear contenedor para los botones
    const contenedorBotones = document.createElement('div');
    contenedorBotones.className = 'contenedor-botones';

    botonEnviarCorreo.addEventListener("click", () => {
    const subject = encodeURIComponent(`Reporte uniforme - ${nombreUniforme}`);
    const body = encodeURIComponent(`Hola,\n\nReporte de uniforme: ${textoPredeterminado}. \n\n${informacion.value}`);

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(correoAlumno)}&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank");
  });

    contenedorBotones.appendChild(botonEnviarCorreo);

    bloqueUniforme.appendChild(contenedorBotones);

    return bloqueUniforme;  // solo devuelves el nodo, no lo insertas en el DOM
}

export function abrirModalUniforme(nombreUniforme, correoAlumno, apiUrl) {
    if (document.querySelector('.overlay-uniforme')) return;

    const overlay = document.createElement('div');
    overlay.className = 'overlay-uniforme';

    overlay.addEventListener('click', e => {
        if (e.target === overlay) overlay.remove();
    });

    const ventana = document.createElement('div');
    ventana.className = 'ventana-Uniforme';

    const bloqueUniforme = moduloUniforme(nombreUniforme,correoAlumno, apiUrl);
    ventana.appendChild(bloqueUniforme);

    overlay.appendChild(ventana);
    document.body.appendChild(overlay);
}
