import { Component, OnInit } from '@angular/core';
import { FotosService } from 'src/app/core/services/fotos.service';
import { Foto } from 'src/app/core/tipos';

@Component({
  selector: 'app-magazine',
  templateUrl: './magazine.component.html',
  styleUrls: ['./magazine.component.css']
})
export class MagazineComponent implements OnInit {

  listaMagazine: Foto[] = [];

  constructor(
    private service: FotosService
  ) { }

  ngOnInit(): void {
    this.service.listar('magazine').subscribe((listaMagazine) => {
      this.listaMagazine = listaMagazine
    })
  }

}
