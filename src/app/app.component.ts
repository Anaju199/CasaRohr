import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CasaRohr';

  private readonly API = environment.apiUrlToken + 'get_csrf_token/'

  // app.component.ts (exemplo)
constructor(private http: HttpClient) {}

ngOnInit() {
  this.http.get(this.API, { withCredentials: true })
  //  .subscribe(res => {
  //   console.log("Token recebido:", res);
  // });
    .subscribe(() => {
      // cookie 'csrftoken' deve estar presente agora
      console.log('CSRF cookie request feita');
    });
}

}

