import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  usuario: string = "";
  password: string = "";

  constructor(private servicioLogin: LoginService) { }

  login() {
    this.servicioLogin.login(this.usuario, this.password).subscribe({
      next: (resp) => {

        console.log("resp-->", resp);


        // Aquí puedes manejar la respuesta del servidor después de iniciar sesión exitosamente
        const token = resp.data.token;
        console.log("token-->", token);

        // Guarda el token en el almacenamiento local (localStorage)
        localStorage.setItem('token', token);
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

}
