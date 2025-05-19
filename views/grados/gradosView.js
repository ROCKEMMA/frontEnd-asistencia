import { moduloGrado } from "../../modules/grado/gradoModulo.";

function cargarGradosView(){
    let div = document.createElement('div');
    div.innerText = "hola mundo";

    return div;
}

document.body.appendChild(cargarGradosView());