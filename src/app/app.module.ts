import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { HomeComponent } from './components/home/home.component';
import {AppGlobals} from './models/appGlobals';
import {UsuarioService} from './services/usuario.service';
import { ClientesComponent } from './components/clientes/clientes.component';

const appRutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'home', component: HomeComponent},
  {path: 'clientes', component: ClientesComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsuariosComponent,
    HomeComponent,
    ClientesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRutes),
    HttpClientModule
  ],
  providers: [AppGlobals, UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
