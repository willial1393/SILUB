import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {UsuariosComponent} from './components/usuarios/usuarios.component';
import {HomeComponent} from './components/home/home.component';
import {AppGlobals} from './models/appGlobals';
import {UsuarioService} from './services/usuario.service';
import {ClientesComponent} from './components/clientes/clientes.component';
import {EquiposComponent} from './components/equipos/equipos.component';
import {ClienteService} from './services/cliente.service';
import {EquipoService} from './services/equipo.service';
import {LoginService} from './services/login.service';
import {BodegasComponent} from './components/bodegas/bodegas.component';
import {LaboratoriosComponent} from './components/laboratorios/laboratorios.component';
import {PrestamosComponent} from './components/prestamos/prestamos.component';
import {SolicitudesComponent} from './components/solicitudes/solicitudes.component';
import {SancionesComponent} from './components/sanciones/sanciones.component';
import {KardexComponent} from './components/kardex/kardex.component';
import {OperacionesComponent} from './components/operaciones/operaciones.component';
import {TiposEquiposComponent} from './components/tipos-equipos/tipos-equipos.component';

const appRutes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'usuarios', component: UsuariosComponent},
    {path: 'home', component: HomeComponent},
    {path: 'clientes', component: ClientesComponent},
    {path: 'equipos', component: EquiposComponent},
    {path: 'laboratorios', component: LaboratoriosComponent},
    {path: 'prestamos', component: PrestamosComponent},
    {path: 'sanciones', component: SancionesComponent},
    {path: 'solicitudes', component: SolicitudesComponent},
    {path: 'kardex', component: KardexComponent},
    {path: 'operaciones', component: OperacionesComponent},
    {path: 'tipos_equipos', component: TiposEquiposComponent},
    {path: 'bodegas', component: BodegasComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        UsuariosComponent,
        HomeComponent,
        ClientesComponent,
        EquiposComponent,
        BodegasComponent,
        LaboratoriosComponent,
        PrestamosComponent,
        SolicitudesComponent,
        SancionesComponent,
        KardexComponent,
        OperacionesComponent,
        TiposEquiposComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(appRutes),
        HttpClientModule
    ],
    providers: [AppGlobals,
        UsuarioService,
        ClienteService,
        EquipoService,
        LoginService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
