import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LogisMaritima } from 'src/app/interfaces/LogisMaritima.interface';
import { exposedApi } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogiMaritimaService {

  constructor(private http: HttpClient) { }

  private BASE_API = exposedApi.BASE_API;

  getLogisMaritimas(): Observable<any> {
    return this.http.get<any>(`${this.BASE_API}logistica-maritima`);
  }

  buscarLogisMaritimaId(id: number): Observable<any> {
    return this.http.get(`${this.BASE_API}logistica-maritima/${id}`);
  }

  guardarLogisMaritima(LogisMaritima: LogisMaritima) {
    return this.http.post<LogisMaritima>(
      this.BASE_API + 'logistica-maritima', LogisMaritima
    )
  }

  editarLogisMaritima(LogisMaritima: LogisMaritima): Observable<any> {
    return this.http.put(`${this.BASE_API}logistica-maritima/${LogisMaritima.id}`, LogisMaritima);
  }

  eliminarLogisMaritima(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_API}logistica-maritima/${id}`);
  }
}
