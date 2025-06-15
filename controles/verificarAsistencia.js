export async function verificarAsistencia(gradoId) {
  try {
    const res = await fetch(`http://localhost:3000/estado-asistencia?grado_id=${gradoId}`);

    const estado = await res.json();
    return estado;
  } catch (error) {
    console.error("Error al verificar asistencia:", error);
  }
}
