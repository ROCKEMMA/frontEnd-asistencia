import { cargarCSS } from "../../controles/controlCSS.js";

export function moduloEliminar (nombreEliminar,nombreAlumno,informacionArea){
    cargarCSS("../modules/eliminar/eliminarModulo.css");

    let eliminarAlumno = document.createElement ('div');
    eliminarAlumno.className = "div-elimiAlumno" ;


    let textoEliminar = document.createElement ('p');
    textoEliminar.className = "titulo";
    textoEliminar.innerText = nombreEliminar;
    eliminarAlumno.appendChild(textoEliminar);

    let subArea = document.createElement ("div");
    subArea.className = "div-nombre";
    eliminarAlumno.appendChild(subArea);
    
    let textoNombre = document.createElement ('p')
    textoNombre.className = "texto-alumno-apellido"; 
    textoNombre.innerText = nombreAlumno;
    subArea.appendChild(textoNombre);

    let areaDelTexto = document.createElement('textarea');
    areaDelTexto.className = "cuerpo-eliminar";
    areaDelTexto.placeholder = "se perderan todos los datos";
    areaDelTexto.value = informacionArea ;
    subArea.appendChild(areaDelTexto);
    
    const botonEliminar = document.createElement('button');
    botonEliminar.className = "botondeEliminar";
    botonEliminar.innerText = "continuar";
    subArea.appendChild(botonEliminar);

    return eliminarAlumno ;
}