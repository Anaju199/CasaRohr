import { Component, OnInit, Input } from '@angular/core';
import { Foto } from 'src/app/core/tipos';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card-carrosel',
  templateUrl: './card-carrosel.component.html',
  styleUrls: ['./card-carrosel.component.css']
})
export class CardCarroselComponent implements OnInit {

  @Input() lista: Foto[] = []

  link: string = environment.urlImagem

  constructor() { }

  ngOnInit(): void {
  }

}
