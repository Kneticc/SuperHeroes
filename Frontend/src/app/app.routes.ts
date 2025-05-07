import { Routes } from '@angular/router';
import { HeroesBoardComponent } from './heroes-board/heroes-board.component';
import { HeroDetailsComponent } from './hero-details/hero-details.component';

export const routes: Routes = [
  {
    path: 'heroes-board',
    component: HeroesBoardComponent,
  },
  {
    path: ':id',
    loadComponent: () => import('./hero-details/hero-details.component').then(m => m.HeroDetailsComponent),
  },
  {
    path: '**',
    redirectTo: 'heroes-board',
    pathMatch: 'full'
  }
];
