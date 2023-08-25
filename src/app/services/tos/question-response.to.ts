export type QuestionTO = {
  category: string;
  difficulty: QuestionDifficultyTO;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type QuestionDifficultyTO = {
  value: string;
  name: string;
};

export type QuizResponseTO = {
  response_code: number;
  results: QuestionTO[];
};
