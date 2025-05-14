//import { header } from "./componentes/views/header_view/header.js";
//import { gradoItem } from "./componentes/modulos/grados/grado_item.js";

import { login } from "./componentes/views/login_view/login.js";
import { verificarSesion } from "./servicios/local_storage.js";
import { grados } from "./componentes/views/grados_view/trados.js";


const sesionActiva = verificarSesion();

if (sesionActiva) {
    document.body.appendChild(grados());
} else {
    console.log("iniciar sección");
    document.body.appendChild(login());
}