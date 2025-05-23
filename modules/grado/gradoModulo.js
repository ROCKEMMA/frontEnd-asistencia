export function moduloGrado(nombreGrado,estado){
    //div del bloque grado
    let blque1 = document.createElement('a');
    blque1.href = "asistencia.html";
    blque1.className = `div-grado ${estado}`;


    //texto del bloque grado 
    let texto1 = document.createElement('p');  // crear la etiqueta "variable"
    texto1.className = "texto-inicio"; // nombre que se llama para el css 
    texto1.innerText = nombreGrado // es el contenido que se almacena en el parrafo
    blque1.appendChild(texto1);

    //retornar mi modulo
    return blque1;
}
