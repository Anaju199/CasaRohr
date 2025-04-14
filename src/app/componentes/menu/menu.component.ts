import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @ViewChild('searchInput') searchInput!: ElementRef;
  
  isSearchActive = false;
  searchText = '';

  // Define the search categories and their corresponding routes
  private searchCategories = [
    { terms: ['moveis', 'móveis', 'movel', 'móvel', 'furniture'], route: '/moveis' },
    { terms: ['supermercado', 'mercado', 'supermarket', 'grocery'], route: '/supermercado' },
    { terms: ['construcao', 'construção', 'construction', 'material'], route: '/construcao' },
    { terms: ['magazine', 'magazines'], route: '/magazine' },
    { terms: ['historia', 'história', 'history'], route: '/historia' },
    { terms: ['locais', 'local', 'locations', 'lojas', 'stores'], route: '/locais' },
    { terms: ['catalogos', 'catálogos', 'catalog'], route: '/catalogos' }
  ];

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  user$ = this.userService.retornarUser();
  nome = this.userService.retornarNome();

  toggleSearch(event: Event): void {
    event.preventDefault();
    this.isSearchActive = !this.isSearchActive;
    
    if (this.isSearchActive) {
      setTimeout(() => {
        this.searchInput.nativeElement.focus();
      });
    }
  }

  onSearch(): void {
    if (this.searchText.trim()) {
      const searchLower = this.searchText.toLowerCase().trim();
      
      // Try to find a matching category
      const matchingCategory = this.searchCategories.find(category => 
        category.terms.some(term => searchLower.includes(term))
      );

      if (matchingCategory) {
        // Navigate to the specific component
        this.router.navigate([matchingCategory.route], { 
          queryParams: { search: this.searchText } 
        });
      } else {
        // If no specific match is found, go to search results page
        this.router.navigate(['/search'], { 
          queryParams: { q: this.searchText } 
        });
      }

      this.isSearchActive = false;
      this.searchText = '';
    }
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login'])
  }
}
