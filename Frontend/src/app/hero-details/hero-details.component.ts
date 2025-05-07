import { Component, OnInit } from '@angular/core';
import { ApiFetchService } from '../services/api-fetch.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-details',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './hero-details.component.html',
  styleUrl: './hero-details.component.scss'
})
export class HeroDetailsComponent implements OnInit {

  hero: any = null;

  constructor(private apiService: ApiFetchService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.apiService.searchHeroById(id).subscribe({
      next: (data) => {
        this.hero = data;
      },
      error: (err) => {
        console.error('Error fetching hero:', err);
      }
    });
  }
}
