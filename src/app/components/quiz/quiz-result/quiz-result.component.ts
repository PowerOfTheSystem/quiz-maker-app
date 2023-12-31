import { Component, OnInit } from '@angular/core';
import { QuestionComponent } from '../../../shared/components/question/question.component';
import { RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';
import { ScoreComponent } from '../../../shared/components/score/score.component';
import { Question } from '../../../models/question.model';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css'],
  imports: [RouterModule, NgFor, QuestionComponent, ScoreComponent],
  providers: [QuizService],
  standalone: true,
})
export class QuizResultComponent implements OnInit {
  questions: Question[] = [];
  total: number = 0;
  totalScored: number = 0;

  constructor(private readonly storeService: QuizService) {}

  ngOnInit() {
    this.questions = this.storeService.getData() ?? [];
    this.total = this.questions.length;
    this.questions.forEach((q) => {
      if (q.correctAnswer === q.choosenAnswer) this.totalScored++;
    });
  }
}
