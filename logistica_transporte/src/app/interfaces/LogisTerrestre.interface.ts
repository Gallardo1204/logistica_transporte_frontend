export interface Data {
  mensaje: string;
  data: Data;
}

export interface LogisTerrestre {
  id: number;
  idCliente: number;
  idProducto: number;
  cantidadProducto: number;
  fechaRegistro: string;
  fechaEntrega: string;
  idBodega: number;
  precioNormal: string;
  precioDescuento: string;
  placaVehiculo: string;
  numeroGuia: string;
}
