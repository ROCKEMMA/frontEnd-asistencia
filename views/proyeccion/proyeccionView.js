import { headerModulo } from "../../modules/header/headerModulo.js";

export function proyeccionView () {
    console.log("cargado");
    
    document.body.appendChild(
      headerModulo(
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.TCcYPZkra7mTMPCWre3uagAAAA%26pid%3DApi&f=1&ipt=8f255ef1389d07972910aa50f4f5e2fa0a9cb54dbb3a090d9aa506d50a588d0f",
        "Jossue Fuentes"
      )
    );
    let seccionProyecciones = document.createElement('section');

    return seccionProyecciones;   
}


proyeccionView();