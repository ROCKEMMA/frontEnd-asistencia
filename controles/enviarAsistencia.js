import { prepararDatosAsistencia } from "../../controles/empaquetarAsistencia.js";
export async function registrarAsistencia(data) {
  try {
    let enviarDatos = await fetch("http://localhost:3000/reg-asistencia", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prepararDatosAsistencia(data)),
    });

    let response = await enviarDatos.json();
    console.log(response);
  } catch (error) {
    console.error("Error en la petición:", error);
  }
}
