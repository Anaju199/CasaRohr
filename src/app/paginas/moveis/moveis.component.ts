import { Component, OnInit } from '@angular/core';
import { FotosService } from 'src/app/core/services/fotos.service';
import { Foto } from 'src/app/core/tipos';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-moveis',
  templateUrl: './moveis.component.html',
  styleUrls: ['./moveis.component.css']
})
export class MoveisComponent implements OnInit {

  listaMoveis: Foto[] = [];
  searchTerm: string = '';

  constructor(
    private service: FotosService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Subscribe to query params to get search term
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['search'] || '';
      if (this.searchTerm) {
        this.filterContent(this.searchTerm);
      }
    });

    this.service.listar('moveis').subscribe((listaMoveis) => {
      this.listaMoveis = listaMoveis
    })
  }

  private filterContent(searchTerm: string): void {
    // Implement your filtering logic here
    // This could filter products, highlight matching content, etc.
    console.log('Filtering móveis content with term:', searchTerm);
  }

}
