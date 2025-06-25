async function consultarPorcentajePorNivel(nivel,mes) {
    try {
        const response = await fetch(
          `https://asistencia.jossuefuentes.space/porcentajeGrados?nivel_id=${nivel}&mes=${mes}&año=2025`
        );

        if (!response.ok) throw new Error("Error en la respuesta del servidor");
        
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error", error)
    }
}

export {consultarPorcentajePorNivel};