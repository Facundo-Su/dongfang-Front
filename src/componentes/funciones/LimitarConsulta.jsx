export function enviarConsulta() {
  const hoy = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  let datos = JSON.parse(localStorage.getItem("consultasDiarias"));

  if (!datos) {
    // No existe, creamos por primera vez
    datos = {
      lastReset: hoy,
      count: 1,
    };
  } else {
    // Revisar si cambió el día
    if (datos.lastReset !== hoy) {
      datos.lastReset = hoy;
      datos.count = 1;
    } else {
      // Mismo día, verificar límite
      if (datos.count >= 10) {
        alert("Ya alcanzaste el límite de 10 consultas por hoy.");
        return false; // 👈 detenemos la ejecución
      }
      datos.count += 1;
    }
  }

  localStorage.setItem("consultasDiarias", JSON.stringify(datos));
  return true; // 👈 indicamos que se puede continuar
}
