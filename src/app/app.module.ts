import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SafeUrlPipe } from './core/pipe/safe-url.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutenticacaoInterceptor } from './core/interceptors/autenticacao.interceptor';
import { RodapeComponent } from './componentes/rodape/rodape.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { PaginaInicialComponent } from './paginas/pagina-inicial/pagina-inicial.component';
import { LoginComponent } from './paginas/login/login.component';
import { HistoriaComponent } from './paginas/historia/historia.component';
import { MoveisComponent } from './paginas/moveis/moveis.component';
import { SupermercadoComponent } from './paginas/supermercado/supermercado.component';
import { ConstrucaoComponent } from './paginas/construcao/construcao.component';
import { MagazineComponent } from './paginas/magazine/magazine.component';
import { LocaisComponent } from './paginas/locais/locais.component';
import { InstagramComponent } from './paginas/instagram/instagram.component';
import { CadastrarEditarFotosComponent } from './paginas/administrador/fotos/cadastrar-editar-fotos/cadastrar-editar-fotos.component';
import { ListarFotosComponent } from './paginas/administrador/fotos/listar-fotos/listar-fotos.component';
import { PaginaInicialAdmComponent } from './paginas/administrador/pagina-inicial-adm/pagina-inicial-adm.component';
import { CardCarroselComponent } from './componentes/card-carrosel/card-carrosel.component';
import { CatalogoComponent } from './paginas/catalogo/catalogo.component';
import { CadastrarEditarCatalogosComponent } from './paginas/administrador/catalogo/cadastrar-editar-catalogos/cadastrar-editar-catalogos.component';
import { ListarCatalogosComponent } from './paginas/administrador/catalogo/listar-catalogos/listar-catalogos.component';
import { SearchResultsComponent } from './paginas/search-results/search-results.component';
import { CadastrarEditarCategoriaComponent } from './paginas/administrador/categorias/cadastrar-editar-categoria/cadastrar-editar-categoria.component';
import { ListarCategoriaComponent } from './paginas/administrador/categorias/listar-categoria/listar-categoria.component';

@NgModule({
  declarations: [
    SafeUrlPipe,
    AppComponent,
    RodapeComponent,
    MenuComponent,
    PaginaInicialComponent,
    LoginComponent,
    HistoriaComponent,
    MoveisComponent,
    SupermercadoComponent,
    ConstrucaoComponent,
    MagazineComponent,
    LocaisComponent,
    InstagramComponent,
    CadastrarEditarFotosComponent,
    ListarFotosComponent,
    PaginaInicialAdmComponent,
    CardCarroselComponent,
    CatalogoComponent,
    CadastrarEditarCatalogosComponent,
    ListarCatalogosComponent,
    SearchResultsComponent,
    CadastrarEditarCategoriaComponent,
    ListarCategoriaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AutenticacaoInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
