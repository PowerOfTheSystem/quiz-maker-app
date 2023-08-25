import { Difficulty } from './difficulty.model';

export type Question = {
  id?: number;
  category: string;
  difficulty: Difficulty;
  question: string;
  correctAnswer: string;
  answers: string[];
  choosenAnswer?: string;
};
