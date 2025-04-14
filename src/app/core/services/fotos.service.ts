import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Foto } from '../tipos';

@Injectable({
  providedIn: 'root'
})
export class FotosService {
  private readonly API = environment.apiUrl + 'fotos'
  private readonly API_LISTA = environment.apiUrl + 'lista_fotos/'
  private readonly API_LISTA_SOCIEDADES = environment.apiUrl + 'lista_categorias/'

  constructor(private http: HttpClient) { }

  listar(categoria: string): Observable<Foto[]> {
    let params = new HttpParams()
      .set("categoria", categoria)

    return this.http.get<Foto[]>(this.API_LISTA, {params})
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

  criar(foto: FormData): Observable<Foto> {
    const url = `${this.API}/`
    return this.http.post<Foto>(url, foto)
  }

  editar(id: number, foto: FormData): Observable<Foto> {
    const url = `${this.API}/${id}/`
    return this.http.put<Foto>(url, foto)
  }

  excluir(id: number): Observable<Foto> {
    const url = `${this.API}/${id}/`
    return this.http.delete<Foto>(url)
  }

  buscarPorId(id: number): Observable<Foto> {
    const url = `${this.API}/${id}/`
    return this.http.get<Foto>(url)
  }
}
