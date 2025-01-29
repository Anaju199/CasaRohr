import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './componentes/menu/menu.component';
import { PaginaInicialComponent } from './paginas/pagina-inicial/pagina-inicial.component';
import { LoginComponent } from './paginas/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { SupermercadoComponent } from './paginas/supermercado/supermercado.component';
import { HistoriaComponent } from './paginas/historia/historia.component';
import { MoveisComponent } from './paginas/moveis/moveis.component';
import { ConstrucaoComponent } from './paginas/construcao/construcao.component';
import { MagazineComponent } from './paginas/magazine/magazine.component';
import { LocaisComponent } from './paginas/locais/locais.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'paginaInicial',
    pathMatch: 'full'
  },
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'paginaInicial',
    component: PaginaInicialComponent
  },
  {
    path: 'supermercado',
    component: SupermercadoComponent
  },
  {
    path: 'historia',
    component: HistoriaComponent
  },
  {
    path: 'moveis',
    component: MoveisComponent
  },
  {
    path: 'construcao',
    component: ConstrucaoComponent
  },
  {
    path: 'magazine',
    component: MagazineComponent
  },
  {
    path: 'locais',
    component: LocaisComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
