import React from 'react';
import { Screen } from '../types';
import { ArrowRight, BookOpen, Gamepad2 } from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col h-full overflow-y-auto bg-gray-50 pb-24">
      {/* Header / Hero */}
      <div className="bg-libras-blue text-white p-8 rounded-b-[2.5rem] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">LibrasQuest</h1>
          <p className="text-blue-100 text-lg">Aprenda a história e os sinais de forma divertida.</p>
        </div>
      </div>

      <div className="p-6 space-y-6 max-w-md mx-auto w-full">
        {/* Main Actions */}
        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={() => onNavigate(Screen.QUIZ)}
            className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-all active:scale-95"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-yellow-100 p-3 rounded-xl text-yellow-600">
                <BookOpen size={28} />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-gray-800 text-lg">Quiz de História</h3>
                <p className="text-gray-500 text-sm">Teste seus conhecimentos sobre a LIBRAS.</p>
              </div>
            </div>
            <ArrowRight className="text-gray-300 group-hover:text-libras-blue transition-colors" />
          </button>

          <button
            onClick={() => onNavigate(Screen.GAME)}
            className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-all active:scale-95"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                <Gamepad2 size={28} />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-gray-800 text-lg">Jogo de Sinais</h3>
                <p className="text-gray-500 text-sm">Associe palavras aos sinais corretos.</p>
              </div>
            </div>
            <ArrowRight className="text-gray-300 group-hover:text-libras-blue transition-colors" />
          </button>
        </div>

        {/* Daily Tip or Fact */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
          <h4 className="font-bold text-yellow-800 text-sm mb-1">Você sabia?</h4>
          <p className="text-yellow-900 text-sm">
            A LIBRAS não é a simples gestualização da língua portuguesa, mas uma língua completa com gramática própria.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;