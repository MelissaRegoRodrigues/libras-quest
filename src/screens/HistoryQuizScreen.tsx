import React, { useState, useEffect } from 'react';
import { fetchQuizQuestions } from '../services/geminiService';
import { QuizQuestion } from '../types';
import { CheckCircle2, XCircle, Loader2, RefreshCw } from 'lucide-react';

const HistoryQuizScreen: React.FC = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    loadQuiz();
  }, []);

  const loadQuiz = async () => {
    setLoading(true);
    setQuizCompleted(false);
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setShowExplanation(false);
    const data = await fetchQuizQuestions();
    setQuestions(data);
    setLoading(false);
  };

  const handleOptionClick = (index: number) => {
    if (selectedOption !== null) return; // Prevent double guessing

    setSelectedOption(index);
    setShowExplanation(true);
    if (index === questions[currentIndex].correctAnswerIndex) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full pb-20">
        <Loader2 className="animate-spin text-libras-blue mb-4" size={48} />
        <p className="text-gray-500 font-medium">Gerando perguntas via IA...</p>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 pb-24 text-center">
        <div className="bg-white rounded-3xl p-8 shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz Finalizado!</h2>
          <div className="text-6xl font-black text-libras-blue mb-2">{score}/{questions.length}</div>
          <p className="text-gray-500 mb-8">Acertos</p>
          
          <p className="text-gray-700 mb-6">
            {score === questions.length ? "Perfeito! Você conhece muito sobre a história da LIBRAS." : 
             score > questions.length / 2 ? "Muito bom! Continue estudando." : "Que tal tentar novamente?"}
          </p>

          <button 
            onClick={loadQuiz}
            className="w-full bg-libras-blue text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition"
          >
            <RefreshCw size={20} />
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="flex flex-col h-full p-6 pb-24 max-w-lg mx-auto overflow-y-auto no-scrollbar">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div 
          className="bg-libras-blue h-2.5 rounded-full transition-all duration-500" 
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-semibold text-gray-400">Questão {currentIndex + 1}/{questions.length}</span>
        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full">História</span>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-8 leading-relaxed">
        {currentQuestion.question}
      </h2>

      <div className="space-y-3 mb-6">
        {currentQuestion.options.map((option, idx) => {
          let buttonStyle = "bg-white border-gray-200 text-gray-700 hover:bg-gray-50";
          
          if (selectedOption !== null) {
            if (idx === currentQuestion.correctAnswerIndex) {
              buttonStyle = "bg-green-100 border-green-500 text-green-800"; // Always show correct
            } else if (idx === selectedOption) {
              buttonStyle = "bg-red-100 border-red-500 text-red-800"; // Wrong selection
            } else {
              buttonStyle = "bg-gray-100 text-gray-400 border-transparent opacity-50"; // Others dimmed
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleOptionClick(idx)}
              disabled={selectedOption !== null}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 font-medium flex justify-between items-center ${buttonStyle}`}
            >
              <span>{option}</span>
              {selectedOption !== null && idx === currentQuestion.correctAnswerIndex && <CheckCircle2 size={20} className="text-green-600" />}
              {selectedOption === idx && idx !== currentQuestion.correctAnswerIndex && <XCircle size={20} className="text-red-600" />}
            </button>
          );
        })}
      </div>

      {showExplanation && (
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-20 animate-fade-in">
          <h4 className="font-bold text-blue-800 mb-1">Explicação:</h4>
          <p className="text-blue-900 text-sm">{currentQuestion.explanation}</p>
        </div>
      )}

      {selectedOption !== null && (
        <div className="fixed bottom-20 left-0 right-0 p-4 flex justify-center bg-gradient-to-t from-gray-100 to-transparent">
           <button 
            onClick={nextQuestion}
            className="bg-libras-blue text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
          >
            {currentIndex === questions.length - 1 ? "Ver Resultado" : "Próxima Pergunta"}
          </button>
        </div>
      )}
    </div>
  );
};

export default HistoryQuizScreen;