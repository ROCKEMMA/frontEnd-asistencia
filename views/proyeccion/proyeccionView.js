import { cargarCSS } from "../../controles/controlCSS.js";
import { headerModulo } from "../../modules/header/headerModulo.js";
import { crearGraficaAsistencia } from "../../modules/nivelGrafico/nivelGraficoModulo.js";
import { consultarPorcentajePorNivel } from "../../controles/consultarPromedioPorNivel.js";
import { cargarItemGraficoGrado } from "../../modules/graficoItemGrado/graficoItemGrado.js";

export async function proyeccionView(
  mesSeleccionado = new Date().getMonth() + 1
) {
  cargarCSS("../views/proyeccion/proyeccionView.css");

  const contenedor = document.createElement("div");
  contenedor.appendChild(headerModulo());

  // Menú desplegable de meses
  const controlesDiv = document.createElement("div");
  controlesDiv.className = "controles-mes";

  const selectMes = document.createElement("select");
  selectMes.className = "select-mes";

  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  meses.forEach((mes, index) => {
    const option = document.createElement("option");
    option.value = index + 1;
    option.textContent = mes;
    if (index + 1 === mesSeleccionado) option.selected = true; // preseleccionar mes actual
    selectMes.appendChild(option);
  });

  controlesDiv.appendChild(selectMes);
  contenedor.appendChild(controlesDiv);

  const seccionProyecciones = document.createElement("section");
  seccionProyecciones.className = "seccion-proyecciones";

  const seccionGraficos = document.createElement("section");
  seccionGraficos.className = "seccion-graficos";

  try {
    const usuarioString = localStorage.getItem("usuario");
    const usuarioObj = JSON.parse(usuarioString);
    const nivel_id =
      usuarioObj.user.tipo_usuario_id != 1
        ? usuarioObj.user.nivel_id
        : [1, 2, 3, 4, 5, 6, 7, 8];

    const todosLosDatos = [];

    if (usuarioObj.user.tipo_usuario_id != 1) {
      const datos = await consultarPorcentajePorNivel(
        nivel_id,
        mesSeleccionado
      );
      if (datos && datos.porcentajesGrados?.length > 0) {
        const grafica = await crearGraficaAsistencia(
          datos.nombreNivel,
          datos.porcentajesGrados
        );
        seccionProyecciones.appendChild(grafica);
        todosLosDatos.push(datos);
      }
    } else {
      for (const cada_grado of nivel_id) {
        const datos = await consultarPorcentajePorNivel(
          cada_grado,
          mesSeleccionado
        );
        if (datos && datos.porcentajesGrados?.length > 0 && datos.nombreNivel) {
          const grafica = await crearGraficaAsistencia(
            datos.nombreNivel,
            datos.porcentajesGrados
          );
          seccionProyecciones.appendChild(grafica);
          todosLosDatos.push(datos);
        }
      }
    }

    contenedor.appendChild(seccionProyecciones);

    todosLosDatos.forEach((datos) => {
      datos.porcentajesGrados.forEach((element) => {
        seccionGraficos.appendChild(
          cargarItemGraficoGrado(
            datos.nombreNivel,
            element.grado_nombre,
            0.8,
            "Jossue Fuentes"
          )
        );
      });
    });

    contenedor.appendChild(seccionGraficos);

    // Recargar solo contenido al cambiar el mes
    selectMes.addEventListener("change", async () => {
      const nuevoMes = parseInt(selectMes.value);
      const nuevaVista = await proyeccionView(nuevoMes);
      document.body.innerHTML = "";
      document.body.appendChild(nuevaVista);
    });
  } catch (error) {
    console.error("Error al consultar los datos:", error);
    seccionProyecciones.innerHTML = "<p>Error al cargar los datos</p>";
  }

  return contenedor;
}

proyeccionView().then((vista) => {
  document.body.appendChild(vista);
});
