import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css'],
  standalone: true,
})
export class ScoreComponent {
  @Input({ required: true }) total!: number;
  @Input({ required: true }) totalScored!: number;

  constructor() {}

  checkScore() {
    if (this.totalScored < 2) return 'bg-danger';
    else if (this.totalScored < 4) return 'bg-warning';
    else return 'bg-success';
  }
}
