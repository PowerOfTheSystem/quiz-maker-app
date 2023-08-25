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

  difficulties?: Difficulty[] = [
    { value: 'easy', name: 'Easy' },
    { value: 'medium', name: 'Medium' },
    { value: 'hard', name: 'Hard' },
  ];
  categories?: Observable<Category[]>;
  questions?: Observable<Question[]>;

  constructor(
    private readonly triviaService: TriviaService,
    private readonly quizService: QuizService,
    formBuilder: FormBuilder
  ) {
    this.questionFormArray = formBuilder.array<FormControl<string>>([]);
  }

  public ngOnInit(): void {
    this.quizService.clearData();
    this.categories = this.triviaService.getCategories();
  }

  public ngOnDestroy(): void {
    let storageQuizzes = this.quizService.getData() ?? [];

    this.questionFormArray.controls.forEach((question, index) => {
      let quiz = storageQuizzes[index];

      if (quiz) quiz.choosenAnswer = question.value;
    });

    this.quizService.saveData(storageQuizzes);
  }

  public onCreate(quizForm: NgForm): void {
    this.questionFormArray.clear();
    if (quizForm.value.category)
      this.questions = this.triviaService
        .getQuestions(quizForm.value.category, quizForm.value.difficulty)
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
                answers: quiz.answers.sort(() => Math.random() - 0.5),
              };
            });

            this.quizService.saveData(newQuizzes);

            return newQuizzes;
          })
        );
  }
}
