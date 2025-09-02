import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Categoria } from '../tipos';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
 private readonly API = environment.apiUrl + 'categorias'
  private readonly API_LISTA = environment.apiUrl + 'lista_categorias/'

  constructor(private http: HttpClient) { }

  listar(categoria: string): Observable<Categoria[]> {
    let params = new HttpParams()
      .set("categoria", categoria)

    return this.http.get<Categoria[]>(this.API_LISTA, {params})
  }

  listarTodos(pagina: number, itensPorPagina: number): Observable<any> {
    let params = new HttpParams()
      .set("_page", pagina)
      .set("_limit", itensPorPagina)

    const url = `${this.API}/`
    return this.http.get<any>(url, {params})
  }

  criar(categoria: FormData): Observable<Categoria> {
    const url = `${this.API}/`
    return this.http.post<Categoria>(url, categoria)
  }

  editar(id: number, categoria: FormData): Observable<Categoria> {
    const url = `${this.API}/${id}/`
    return this.http.put<Categoria>(url, categoria)
  }

  excluir(id: number): Observable<Categoria> {
    const url = `${this.API}/${id}/`
    return this.http.delete<Categoria>(url)
  }

  buscarPorId(id: number): Observable<Categoria> {
    const url = `${this.API}/${id}/`
    return this.http.get<Categoria>(url)
  }
}
