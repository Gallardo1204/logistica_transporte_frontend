import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private BASE_API = 'http://localhost:8001/api/auth/login';

  constructor(private http: HttpClient) { }

  login(usuario: string, password: string): Observable<any> {

    let datos = {
      correo: usuario,
      password: password
    }

    return this.http.post(`${this.BASE_API}`, datos);
  }

}
