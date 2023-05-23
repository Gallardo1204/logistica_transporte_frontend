import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/interfaces/producto.interface';
import { exposedApi } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private BASE_API = exposedApi.BASE_API;

  constructor(private http: HttpClient) { }


  getProductos(): Observable<any> {
    return this.http.get<any>(`${this.BASE_API}productos`);
  }

  guardarProducto(producto: Producto) {
    return this.http.post<Producto>(
      this.BASE_API + 'productos', producto
    )
  }

  eliminarProducto(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_API}productos/${id}`);
  }

  editarProducto(producto: Producto): Observable<any> {
    return this.http.put(`${this.BASE_API}productos/${producto.id}`, producto);
  }

  buscarProductoId(id: number): Observable<any> {
    return this.http.get(`${this.BASE_API}productos/${id}`);
  }

}
