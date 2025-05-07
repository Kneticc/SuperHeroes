import { Component, OnInit } from '@angular/core';
import { ApiFetchService } from '../services/api-fetch.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, switchMap } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes-board',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './heroes-board.component.html',
  styleUrl: './heroes-board.component.scss'
})
export class HeroesBoardComponent implements OnInit {

  heroes: any[] = [];
  searchTerm: string = '';
  private searchSubject: Subject<string> = new Subject();

  constructor(private apiService: ApiFetchService, private router: Router) { }

  ngOnInit(): void {
    try {
      this.searchSubject.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((searchText: string) => this.apiService.searchHeroByName(searchText))
      ).subscribe((data: any) => {
        this.heroes = data.results || [];
      });
    } catch (error) {
      console.error('Error finding heroes: ', error);
    }
  }

  filterHeroes(): void {
    if (this.searchTerm.trim()) {
      this.searchSubject.next(this.searchTerm);
    } else {
      this.heroes = [];
    }
  }

  navigateToHero(id: number): void {
    this.router.navigate(['/', id]);
  }
}
