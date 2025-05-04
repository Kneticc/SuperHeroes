import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroesBoardComponent } from "./heroes-board/heroes-board.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeroesBoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Frontend';
}
