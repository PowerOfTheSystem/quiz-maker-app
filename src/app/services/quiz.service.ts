import { Injectable } from '@angular/core';
import { Question } from '../models/question.model';
import { StorageService } from './storage.service';

const QUIZ_KEY = 'quiz';

@Injectable()
export class QuizService extends StorageService<Question[]> {
  constructor() {
    super(QUIZ_KEY);
  }
}
