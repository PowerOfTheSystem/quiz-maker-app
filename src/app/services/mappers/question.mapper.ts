import { Question } from 'src/app/models/question.model';
import { QuestionTO } from '../tos/question-response.to';

export class QuestionMapper {
  static toModel(dto: QuestionTO): Question {
    return {
      category: dto.category,
      correctAnswer: dto.correct_answer,
      answers: [...dto.incorrect_answers, dto.correct_answer],
      question: dto.question,
      difficulty: dto.difficulty,
    };
  }
}
