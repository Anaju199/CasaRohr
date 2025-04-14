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
import { InstagramComponent } from './paginas/instagram/instagram.component';
import { CadastrarEditarFotosComponent } from './paginas/administrador/fotos/cadastrar-editar-fotos/cadastrar-editar-fotos.component';
import { ListarFotosComponent } from './paginas/administrador/fotos/listar-fotos/listar-fotos.component';
import { PaginaInicialAdmComponent } from './paginas/administrador/pagina-inicial-adm/pagina-inicial-adm.component';
import { CatalogoComponent } from './paginas/catalogo/catalogo.component';
import { CadastrarEditarCatalogosComponent } from './paginas/administrador/catalogo/cadastrar-editar-catalogos/cadastrar-editar-catalogos.component';
import { ListarCatalogosComponent } from './paginas/administrador/catalogo/listar-catalogos/listar-catalogos.component';
import { SearchResultsComponent } from './paginas/search-results/search-results.component';

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
    path: 'catalogos',
    component: CatalogoComponent
  },
  {
    path: 'instagram',
    component: InstagramComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'administrador',
    component: PaginaInicialAdmComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cadastrarEditarFoto/:id',
    component: CadastrarEditarFotosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cadastrarEditarFoto',
    component: CadastrarEditarFotosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'listarFotos',
    component: ListarFotosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cadastrarEditarCatalogo/:id',
    component: CadastrarEditarCatalogosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cadastrarEditarCatalogo',
    component: CadastrarEditarCatalogosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'listarCatalogos',
    component: ListarCatalogosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'search',
    component: SearchResultsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
