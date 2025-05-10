import { Component, OnInit } from '@angular/core';
import { ApiFetchService } from '../../services/api-fetch.service';
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

  capitalizeKey(arg0: unknown): string {
    if (typeof arg0 === 'string') {
      return arg0.charAt(0).toUpperCase() + arg0.slice(1);
    }
    throw new Error('Invalid argument: arg0 must be a string');
  }

  getAppearanceValue(value: any): string {
    if (Array.isArray(value)) {
      return value[1] ?? 'N/A';
    }
    return value && value !== 'null' ? value : 'N/A';
  }


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
