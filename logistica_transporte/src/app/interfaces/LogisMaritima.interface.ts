export interface Data {
  data: LogisMaritima[];
}

export interface LogisMaritima {
  id: number;
  idCliente: number;
  idProducto: number;
  cantidadProducto: number;
  fechaRegistro: string;
  fechaEntrega: string;
  idPuerto: number;
  precioNormal: string;
  precioDescuento: string;
  numeroFlota: string;
  numeroGuia: string;
}
