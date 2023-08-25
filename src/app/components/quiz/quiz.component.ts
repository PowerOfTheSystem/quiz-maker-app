import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormsModule,
  NgForm,
  Validators,
} from '@angular/forms';
import { QuestionComponent } from '../../shared/components/question/question.component';
import { RouterModule } from '@angular/router';
import { TriviaService } from '../../services/trivia.service';
import { Difficulty } from '../../models/difficulty.model';
import { Category } from '../../models/category.model';
import { Question } from '../../models/question.model';
import { QuizService } from '../../services/quiz.service';
import { QuizForm } from './quiz.form';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  imports: [
    NgFor,
    NgIf,
    AsyncPipe,
    FormsModule,
    RouterModule,
    QuestionComponent,
  ],
  providers: [TriviaService, QuizService],
  standalone: true,
})
export class QuizComponent implements OnInit, OnDestroy {
  questionFormArray: FormArray<FormControl<string>>;

  categories?: Observable<Category[]>;
  difficulties?: Difficulty[] = [
    { value: 'easy', name: 'Easy' },
    { value: 'medium', name: 'Medium' },
    { value: 'high', name: 'High' },
  ];
  questions?: Observable<Question[]>;

  constructor(
    private readonly triviaService: TriviaService,
    private readonly quizService: QuizService,
    formBuilder: FormBuilder
  ) {
    this.questionFormArray = formBuilder.array<FormControl<string>>([]);
  }

  public ngOnInit(): void {
    this.quizService.clear();
    this.categories = this.triviaService.getCategories();
  }

  public ngOnDestroy(): void {
    let storageQuizzes = this.quizService.getData() ?? [];

    this.questionFormArray.controls.forEach((question, index) => {
      let quiz = storageQuizzes[index];

      if (quiz) quiz.choosenAnswer = question.value;
    });

    this.quizService.save(storageQuizzes);
  }

  public onCreate(quizForm: NgForm): void {
    let { category, difficulty } = quizForm.value as QuizForm;
    this.questionFormArray.clear();
    if (category)
      this.questions = this.triviaService
        .getQuestions(category, difficulty)
        .pipe(
          map((quizzes) => {
            let newQuizzes = quizzes.map((quiz, index) => {
              this.questionFormArray.push(
                new FormControl<string>('', {
                  nonNullable: true,
                  validators: [Validators.required],
                })
              );
              return {
                ...quiz,
                id: index,
                answers: this.sortAnswers(quiz.answers),
              };
            });

            this.quizService.save(newQuizzes);

            return newQuizzes;
          })
        );
  }

  private sortAnswers(answers: string[]): string[] {
    return answers.sort((a, b) => {
      return 0.5 - Math.random();
    });
  }
}
