import { cargarCSS } from "../../controles/controlCSS.js";

export function moduloGradoGrafica() {
    cargarCSS("../modules/gradoGrafico/gradoGraficoModulo.css");

    let bloqueGradoGraficas = document.createElement("div");
    bloqueGradoGraficas.className = 'div-General';

    let tituloModulo = document.createElement("p");
    tituloModulo.className = "titulo-asistencia";
    tituloModulo.innerText = "Proyección de asistencia general";
    bloqueGradoGraficas.appendChild(tituloModulo);

   //ACA VA LO DE LA GRAFICA DE BARRA NEGRA PROFE 
    let contenedorPrimero = document.createElement('div');
    contenedorPrimero.className = 'contenedor-Img';

    let grafica = document.createElement('img');
    grafica.className = 'grafica-general';
    grafica.src = '../assets/icos/graficaNormal.svg';
    contenedorPrimero.appendChild(grafica);
    bloqueGradoGraficas.appendChild(contenedorPrimero);


    let subBloqueGrados = document.createElement('div');
    subBloqueGrados.className = 'div-imagenesGrados';

    // Función reutilizable para crear un bloque grado + imagen
    function crearGrado(nombre) {
        let contenedorGrado = document.createElement('div');
        contenedorGrado.className = 'contenedor-grado';

        let img = document.createElement('img');
        img.className = 'grafico-circular';
        img.src = '../assets/icos/graficaCircular.svg';  
        img.alt = `Gráfico ${nombre}`;

        let etiqueta = document.createElement('p');
        etiqueta.className = 'etiqueta-grado';
        etiqueta.innerText = nombre;

        contenedorGrado.appendChild(img);
        contenedorGrado.appendChild(etiqueta);

        subBloqueGrados.appendChild(contenedorGrado);
    }

    let grados = ['IV C', 'IV DG', 'IV BIO', 'IV PC', 'V DG', 'V BIO', 'V PC', 'VI C', 'VI Mag' ];

    // Generamos cada bloque de grado con imagen
    grados.forEach(crearGrado);

    bloqueGradoGraficas.appendChild(subBloqueGrados);



    return bloqueGradoGraficas;
}
