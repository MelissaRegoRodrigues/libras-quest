export enum Screen {
  HOME = 'HOME',
  QUIZ = 'QUIZ',
  GAME = 'GAME',
  ABOUT = 'ABOUT',
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface SignGameItem {
  id: number;
  word: string;
  description: string; // Description of the sign gesture
  imageUrl?: string; // Placeholder for the sign image
}

export interface GameState {
  score: number;
  completed: boolean;
  currentLevel: number;
}