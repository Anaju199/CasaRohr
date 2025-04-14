import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-pagina-inicial-adm',
  templateUrl: './pagina-inicial-adm.component.html',
  styleUrls: ['./pagina-inicial-adm.component.css']
})
export class PaginaInicialAdmComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router 
  ) { }

  ngOnInit(): void {
  }

  user$ = this.userService.retornarUser();
  nome = this.userService.retornarNome();

  logout() {
    this.userService.logout();
    this.router.navigate(['/login'])
  }
}
