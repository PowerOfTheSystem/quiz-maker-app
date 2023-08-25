import { Route } from '@angular/router';
import { QuizComponent } from './components/quiz/quiz.component';

export const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: QuizComponent,
  },
  {
    path: 'result',
    loadComponent: () =>
      import('./components/quiz/quiz-result/quiz-result.component').then(
        (c) => c.QuizResultComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
