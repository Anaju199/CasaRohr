import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabecalhoComponent } from './componentes/cabecalho/cabecalho.component';
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

@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    RodapeComponent,
    MenuComponent,
    PaginaInicialComponent,
    LoginComponent,
    HistoriaComponent,
    MoveisComponent,
    SupermercadoComponent,
    ConstrucaoComponent,
    MagazineComponent,
    LocaisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
