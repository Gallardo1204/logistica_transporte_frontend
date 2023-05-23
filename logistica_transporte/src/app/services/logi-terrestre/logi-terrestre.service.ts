import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LogisTerrestre } from 'src/app/interfaces/LogisTerrestre.interface';
import { exposedApi } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogiTerrestreService {

  constructor(private http: HttpClient) { }

  private BASE_API = exposedApi.BASE_API;

  getLogisTerrestres(): Observable<any> {
    return this.http.get<any>(`${this.BASE_API}logistica-terrestre`);
  }

  buscarLogisTerrestreId(id: number): Observable<any> {
    return this.http.get(`${this.BASE_API}logistica-terrestre/${id}`);
  }

  guardarLogisTerrestre(LogisTerrestre: LogisTerrestre) {
    return this.http.post<LogisTerrestre>(
      this.BASE_API + 'logistica-terrestre', LogisTerrestre
    )
  }

  editarLogisTerrestre(LogisTerrestre: LogisTerrestre): Observable<any> {
    return this.http.put(`${this.BASE_API}logistica-terrestre/${LogisTerrestre.id}`, LogisTerrestre);
  }

  eliminarLogisTerrestre(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_API}logistica-terrestre/${id}`);
  }


}
