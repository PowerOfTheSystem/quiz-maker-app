import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css'],
  standalone: true,
})
export class ScoreComponent implements OnInit {
  @Input({ required: true }) total!: number;
  @Input({ required: true }) arrangements!: number;

  constructor() {}

  ngOnInit() {}

  checkStatus() {
    if (this.arrangements < 2) return 'bg-danger';
    else if (this.arrangements < 4) return 'bg-warning';
    else return 'bg-success';
  }
}
