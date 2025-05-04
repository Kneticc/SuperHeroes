import { Component, OnInit } from '@angular/core';
import { ApiFetchServiceService } from './services/api-fetch-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, switchMap } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-heroes-board',
  imports: [CommonModule, FormsModule],
  templateUrl: './heroes-board.component.html',
  styleUrl: './heroes-board.component.scss'
})
export class HeroesBoardComponent implements OnInit {

  heroes: any[] = [];
  searchTerm: string = '';
  private searchSubject: Subject<string> = new Subject();

  constructor(private apiService: ApiFetchServiceService) { }

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((searchText: string) => this.apiService.searchHeroByName(searchText))
    ).subscribe({
      next: (data: any) => {
        this.heroes = data.results || [];
      },
      error: (error) => {
        console.error('Error fetching heroes:', error);
      }
    });
  }

  filterHeroes(): void {
    if (this.searchTerm.trim()) {
      this.searchSubject.next(this.searchTerm);
    } else {
      this.heroes = [];
    }
  }
}
