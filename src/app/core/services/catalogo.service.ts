import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  private readonly API = environment.apiUrl + 'catalogos'
  private readonly API_LISTA = environment.apiUrl + 'lista_catalogos/'
  private readonly API_LISTA_SOCIEDADES = environment.apiUrl + 'lista_categorias/'

  constructor(private http: HttpClient) { }

  listar(): Observable<any[]> {
    let params = new HttpParams()
      // .set("categoria", categoria)

    const url = `${this.API}/`
    return this.http.get<any[]>(url, {params})
  }

  listarTodos(pagina: number, itensPorPagina: number): Observable<any> {
    let params = new HttpParams()
      .set("_page", pagina)
      .set("_limit", itensPorPagina)

    const url = `${this.API}/`
    return this.http.get<any>(url, {params})
  }

  listarCategorias(): Observable<string[]> {
    return this.http.get<string[]>(this.API_LISTA_SOCIEDADES)
  }

  criar(catalogo: FormData): Observable<any> {
    const url = `${this.API}/`
    return this.http.post<any>(url, catalogo)
  }

  editar(id: number, catalogo: FormData): Observable<any> {
    const url = `${this.API}/${id}/`
    return this.http.put<any>(url, catalogo)
  }

  excluir(id: number): Observable<any> {
    const url = `${this.API}/${id}/`
    return this.http.delete<any>(url)
  }

  buscarPorId(id: number): Observable<any> {
    const url = `${this.API}/${id}/`
    return this.http.get<any>(url)
  }
}