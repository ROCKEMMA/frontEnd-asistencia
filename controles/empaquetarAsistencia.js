export function prepararDatosAsistencia(data) {
    console.clear();
    let usuario = JSON.parse(localStorage.getItem("usuario")).user.id;
    let grado = JSON.parse(localStorage.getItem("usuario")).sesion.grado_activo;
    
    let alumnosId = [];
    data.forEach(alumno => {
        alumnosId.push(alumno.id);
    });

    let estadoAsistencia = [];
    const estadosAsistencia = document.querySelectorAll(".div-asistencia");
    estadosAsistencia.forEach(div => {
        estadoAsistencia.push(div.classList[1]); // "presente" o "ausente"
    });

    // Fusionamos alumnosId y estadoAsistencia en un solo array de objetos
    let asistencias = alumnosId.map((id, index) => {
        return {
            alumno_id: id,
            estado: estadoAsistencia[index]
        };
    });

    let paqueteDeDatos = {
        profesor_id: usuario,
        grado_id: grado,
        asistencias: asistencias
    };

    return paqueteDeDatos;
}
