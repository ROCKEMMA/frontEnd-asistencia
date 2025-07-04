export async function verificarAsistencia(gradoId) {
  try {
    const res = await fetch(`https://asistencia.jossuefuentes.space/estado-asistencia?grado_id=${gradoId}`);

    const estado = await res.json();
    return estado;
  } catch (error) {
    console.error("Error al verificar asistencia:", error);
  }
}
