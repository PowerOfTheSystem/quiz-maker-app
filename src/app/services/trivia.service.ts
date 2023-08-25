import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CategoryMapper } from './mappers/category.mapper';
import { QuestionMapper } from './mappers/question.mapper';
import { Category } from '../models/category.model';
import { CategoryResponseTO } from './tos/category-response.to';
import { Question } from '../models/question.model';
import { QuizResponseTO } from './tos/question-response.to';

const api_base_url = 'https://opentdb.com';

@Injectable()
export class TriviaService {
  constructor(private readonly http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http
      .get<CategoryResponseTO>(`${api_base_url}/api_category.php`)
      .pipe(
        map((categoryResponseTO) =>
          categoryResponseTO.trivia_categories.map(CategoryMapper.toModel)
        )
      );
  }

  getQuestions(categoryId: string, difficulty: string): Observable<Question[]> {
    let params = new HttpParams()
      .append('category', categoryId)
      .append('difficulty', difficulty)
      .append('amount', '5')
      .append('type', 'multiple');

    return this.http
      .get<QuizResponseTO>(`${api_base_url}/api.php`, { params })
      .pipe(
        map((quizResponseTO) =>
          quizResponseTO.results.map(QuestionMapper.toModel)
        )
      );
  }
}
