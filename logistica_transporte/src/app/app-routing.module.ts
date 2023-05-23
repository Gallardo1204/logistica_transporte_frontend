import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductosComponent } from './components/productos/productos.component';
import { LoginComponent } from './components/login/login.component';
import { LogiTerrestreComponent } from './components/logi-terrestre/logi-terrestre.component';
import { LogiMaritimaComponent } from './components/logi-maritima/logi-maritima.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'logistica-terrestre', component: LogiTerrestreComponent },
  { path: 'logistica-maritima', component: LogiMaritimaComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' } // Redirecciona a la página de inicio en caso de rutas no encontradas

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
