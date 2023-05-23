export function validarPlaca(placa: string): boolean {
  const placaRegex = /^[A-Za-z]{3}\d{3}$/;
  return placaRegex.test(placa);
}

export function validarNumeroFlota(numeroFlota: string): boolean {
  const numeroFlotaRegex = /^[A-Za-z]{3}\d{4}[A-Z]$/;
  return numeroFlotaRegex.test(numeroFlota);
}

export function validarNumeroGuia(numeroGuia: string): boolean {
  const numeroGuiaRegex = /^[A-Za-z0-9]{10}$/;
  return numeroGuiaRegex.test(numeroGuia);
}
