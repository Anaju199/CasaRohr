import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CSRFTokenService } from './csrftoken.service';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  
  private readonly API = environment.apiUrl + 'envia_email/'

  constructor(private http: HttpClient
  ) {}

  // enviarEmail(dados: any): Observable<any> {
  //   this.http.get<{csrfToken:string}>("https://anajulia.pythonanywhere.com/get_csrf_token/", { withCredentials:true })
  //     .subscribe({
  //       next: (res) => {
  //         const csrfToken = res.csrfToken;

  //         const headers = new HttpHeaders({
  //           "Content-Type": "application/json",
  //           "X-CSRFToken": csrfToken || ""
  //         });

  //         return this.http.post(
  //           this.API,
  //           { nome: dados.nome, email: dados.email, destinatario: dados.destinatario, mensagem: dados.mensagem, 
  //             cargoInteressado: dados.cargoInteressado, assunto: dados.assunto},
  //           { headers, withCredentials: true }
  //         ).subscribe({
  //         next: (r) => console.log("✅ POST OK:", r),
  //         error: (e) => console.error("❌ Erro no POST:", e)
  //       });
  //     },
  //     error: (err) => console.error("❌ Erro no GET CSRF:", err)
  //   });
  // }

enviarEmail(dados: any): Observable<any> {
  return this.http.get<{csrfToken: string}>(environment.apiUrlToken + "/get_csrf_token/", { withCredentials: true }).pipe(
    switchMap(res => {
      const csrfToken = res.csrfToken;

      const headers = new HttpHeaders({
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken || ""
      });

      console.log("dads",dados)

      return this.http.post(
        this.API,
        {
          nome: dados.nome,
          email: dados.email,
          destinatario: dados.destinatario,
          mensagem: dados.mensagem,
          cargoInteressado: dados.cargoInteressado,
          assunto: dados.assunto
        },
        { headers, withCredentials: true }
      );
    })
  );
}


  // service ou componente de teste
 testaCSRF() {
  // 1. GET para gerar o cookie
  this.http.get<{csrfToken:string}>("https://anajulia.pythonanywhere.com/get_csrf_token/", { withCredentials:true })
    .subscribe({
      next: (res) => {
        console.log("✅ Resposta GET /get_csrf_token:", res);

        // 2. Mostra os cookies salvos no navegador
        console.log("🍪 document.cookie atual:", document.cookie);

        const csrfToken = res.csrfToken; // pega do JSON, não do cookie
        console.log("🔑 Token extraído do cookie:", csrfToken);

        // 4. Monta os headers do POST
        const headers = new HttpHeaders({
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken || ""
        });
        console.log("📩 Headers do POST:", headers);

        // 5. Faz o POST de teste
        this.http.post(
          "https://anajulia.pythonanywhere.com/ch_envia_email/",
          { nome: "teste", email: "teste@teste.com", destinatario: "contato@casarohr.com.br", mensagem: "Olá mundo!" },
          { headers, withCredentials: true }
        ).subscribe({
          next: (r) => console.log("✅ POST OK:", r),
          error: (e) => console.error("❌ Erro no POST:", e)
        });
      },
      error: (err) => console.error("❌ Erro no GET CSRF:", err)
    });
}

}
