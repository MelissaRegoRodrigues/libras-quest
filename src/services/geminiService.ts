// Caminho: librasquest---protótipo-educacional/src/services/geminiService.ts
import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion, SignGameItem } from "../types.ts"; // <-- CORRIGIDO

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const FALLBACK_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: "Até o século XV, como a sociedade em geral considerava a pessoa surda?",
    options: ["Como seres divinos", "Como seres primitivos e incapazes", "Como cidadãos comuns", "Como líderes religiosos"],
    correctAnswerIndex: 1,
    explanation: "Segundo a apostila (pág. 5), grandes filósofos acreditavam que quem não falava não possuía pensamento, considerando os surdos 'seres primitivos' e 'incapazes'."
  },
  {
    id: 2,
    question: "O que ficou decidido no Congresso de Milão em 1880?",
    options: ["O bilinguismo como regra", "A criação do alfabeto manual", "A proibição da Língua de Sinais (Oralismo)", "A fundação do INES"],
    correctAnswerIndex: 2,
    explanation: "O Congresso de Milão (1880) foi um momento crítico onde foi proibido o uso das Línguas de Sinais e instituído o método oral (pág. 5)."
  },
  {
    id: 3,
    question: "Quem foi o professor surdo francês trazido por D. Pedro II em 1855 para o Brasil?",
    options: ["Hernest Huet", "Thomas Gallaudet", "Pedro Ponce de Leon", "Charles Michel de L’Epée"],
    correctAnswerIndex: 0,
    explanation: "Hernest Huet chegou ao Brasil em 1855, trazido pelo Imperador D. Pedro II, o que levou à fundação do atual INES (pág. 5)."
  },
  {
    id: 4,
    question: "Qual lei reconheceu a LIBRAS como meio legal de comunicação e expressão no Brasil?",
    options: ["Lei de Diretrizes e Bases", "Constituição de 1988", "Lei nº 10.436 de 2002", "Decreto 5.626"],
    correctAnswerIndex: 2,
    explanation: "A Lei nº 10.436/2002 reconheceu a Libras como meio legal de comunicação e expressão (pág. 6)."
  },
  {
    id: 5,
    question: "Qual é a modalidade da Língua Brasileira de Sinais (LIBRAS)?",
    options: ["Oral-auditiva", "Espaço-visual", "Apenas mímica", "Escrita"],
    correctAnswerIndex: 1,
    explanation: "A Libras é uma língua de modalidade espaço-visual, configurando-se no espaço e sendo percebida pelos olhos (pág. 3)."
  }
];

const FIXED_GAME_DATA: SignGameItem[] = [
  { id: 1, word: "Oi", description: "", imageUrl: "/assets/oi.png" },
  { id: 2, word: "Fazer", description: "", imageUrl: "/assets/fazer.png" },
  { id: 3, word: "Aprender", description: "", imageUrl: "/assets/aprender.png" },
  { id: 4, word: "Ter", description: "", imageUrl: "/assets/ter.png" },
  { id: 5, word: "Obrigada", description: "", imageUrl: "/assets/obrigada.png" },
  { id: 6, word: "Desculpa", description: "", imageUrl: "/assets/desculpa.png" },
  { id: 7, word: "Cansado", description: "", imageUrl: "/assets/cansado.png" },
  { id: 8, word: "Mentira", description: "", imageUrl: "/assets/mentir.png" },
  { id: 9, word: "Dias da Semana", description: "", imageUrl: "/assets/dias_semana.png" },
  { id: 10, word: "Bom", description: "", imageUrl: "/assets/bom.png" },
  { id: 11, word: "Gostar", description: "", imageUrl: "/assets/gostar.png" },
  { id: 12, word: "Parar", description: "", imageUrl: "/assets/parar.png" },
  { id: 13, word: "Obedecer", description: "", imageUrl: "/assets/obedecer.png" },
  { id: 14, word: "Ouvinte", description: "", imageUrl: "/assets/ouvinte.png" },
  { id: 15, word: "Surdo", description: "", imageUrl: "/assets/surdo.png" },
  { id: 16, word: "Saber", description: "", imageUrl: "/assets/saber.png" },
  { id: 17, word: "Não Saber", description: "", imageUrl: "/assets/nao_saber.png" },
  { id: 18, word: "Televisão", description: "", imageUrl: "/assets/tv.png" },
  { id: 19, word: "Velho", description: "", imageUrl: "/assets/velho.png" },
  { id: 20, word: "Banheiro", description: "", imageUrl: "/assets/banheiro.png" },
  { id: 21, word: "Namorar", description: "", imageUrl: "/assets/namorar.png" },
  { id: 22, word: "Passear", description: "", imageUrl: "/assets/passear.png" },
  { id: 23, word: "Tudo bem", description: "", imageUrl: "/assets/tudo_bem.png" },
  { id: 24, word: "Boa Noite", description: "", imageUrl: "/assets/boa_noite.png" }
];

// Função utilitária para embaralhar um array (algoritmo Fisher-Yates)
export function shuffleArray<T>(array: T[]): T[] { 
  let currentIndex = array.length, randomIndex;
  const newArray = [...array]; 
  
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex], newArray[currentIndex]
    ];
  }
  return newArray;
}

export const fetchQuizQuestions = async (): Promise<QuizQuestion[]> => {
  if (!apiKey) {
    console.warn("No API Key found, using fallback data from Apostila.");
    return new Promise(resolve => setTimeout(() => resolve(FALLBACK_QUIZ), 800));
  }

  try {
    return FALLBACK_QUIZ; 
  } catch (error) {
    console.error("Gemini API Error:", error);
    return FALLBACK_QUIZ;
  }
};

export const fetchSignGameData = async (): Promise<SignGameItem[]> => {
  const shuffledData = shuffleArray(FIXED_GAME_DATA);
  const selectedData = shuffledData.slice(0, 10); // <-- SELECIONA 10 ALEATÓRIOS
  
  return new Promise(resolve => setTimeout(() => resolve(selectedData), 600));
};