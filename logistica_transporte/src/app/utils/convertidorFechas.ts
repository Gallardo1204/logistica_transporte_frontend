
/*
La funcion transforma el formato de fecha '2023-05-25T00:00:00'
a uno soportado por el input de tipo 'Date'.
*/
export function transformarFechaV1(fecha: string): string {
  const fechaObj = new Date(fecha);
  const mes = fechaObj.getMonth() + 1;
  const dia = fechaObj.getDate();
  const mesString = mes < 10 ? `0${mes}` : `${mes}`;
  const diaString = dia < 10 ? `0${dia}` : `${dia}`;
  return `${fechaObj.getFullYear()}-${mesString}-${diaString}`;
}

/*
La funcion transforma el formato del input tipo 'Date'
al formato de fecha: '2023-05-25T00:00:00'.
*/
export function transformarFechaV2(fechaString: string): string {
  const fechaObj = new Date(fechaString);
  return fechaObj.toISOString();
}
