import { cargarCSS } from "../../controles/controlCSS.js";

function asistenciaView(){
    cargarCSS("../views/asistencia/asistenciaView.css");

    let img = document.createElement('img');
    img.src = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F8c%2F50%2Fab%2F8c50abcb58817ee4ce9b358c3add3445.gif&f=1&nofb=1&ipt=e4df35e9f63e80ad0bf57c59b2db2dd767d8b83af24d75608f99bb4767b5fdf4';
    img.className = "img-trabajando";
    return img;
}

export { asistenciaView }