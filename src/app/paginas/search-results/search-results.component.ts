import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-results',
  template: `
    <div class="container mt-4">
      <h2 class="text-center mb-4">Resultados da Pesquisa</h2>
      <div class="alert alert-info" *ngIf="searchQuery">
        <p>Resultados para: "{{ searchQuery }}"</p>
      </div>
      <!-- Add your search results content here -->
    </div>
  `,
  styles: [`
    .container {
      min-height: 400px;
    }
  `]
})
export class SearchResultsComponent implements OnInit {
  searchQuery: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';
    });
  }
} 