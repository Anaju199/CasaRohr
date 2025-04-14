import { Component, OnInit } from '@angular/core';
import { FotosService } from 'src/app/core/services/fotos.service';
import { Foto } from 'src/app/core/tipos';

@Component({
  selector: 'app-construcao',
  templateUrl: './construcao.component.html',
  styleUrls: ['./construcao.component.css']
})
export class ConstrucaoComponent implements OnInit {

  listaConstrucao: Foto[] = [];

  constructor(
    private service: FotosService
  ) { }

  ngOnInit(): void {
    this.service.listar('construcao').subscribe((listaConstrucao) => {
      this.listaConstrucao = listaConstrucao
    })
  }

}
