import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Question } from '../../../models/question.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  imports: [NgFor, NgIf, NgClass],
  standalone: true,
})
export class QuestionComponent implements OnInit {
  choosenAnswer: string = '';

  @Input({ required: true }) question!: Question;
  @Input() checkAnswers = false;
  @Input() answerFormControl?: FormControl<string>;

  constructor() {}

  ngOnInit(): void {
    if (this.checkAnswers)
      this.choosenAnswer = this.question?.choosenAnswer ?? '';
  }

  public onSelectAnswer(option: string): void {
    if (!this.checkAnswers && this.answerFormControl)
      this.answerFormControl.setValue(option);
  }

  checkStatus(answer: string): boolean {
    return (
      this.checkAnswers &&
      this.choosenAnswer !== this.question.correctAnswer &&
      this.choosenAnswer === answer
    );
  }

  shouldBeChecked(answer: string): boolean {
    return (
      this.choosenAnswer === answer ||
      (this.checkAnswers && this.question.correctAnswer == answer)
    );
  }
}
