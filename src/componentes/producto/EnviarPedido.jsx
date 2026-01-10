// componentes/servicios/enviarPedido.js

export async function EnviarPedido({
  tipoProducto,
  producto,
  cliente,
  endpoint,
}) {
  const formData = new FormData();

  formData.append(
    "datos",
    new Blob(
      [
        JSON.stringify({
          tipoProducto,
          producto,
          cliente,
        }),
      ],
      { type: "application/json" }
    )
  );

  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}${endpoint}`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Error al enviar el pedido");
  }
}
