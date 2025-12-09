import React from 'react';
import { Screen } from '../types';
import { Home, BookOpen, Gamepad2, Info } from 'lucide-react';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  const navItems = [
    { id: Screen.HOME, label: 'Início', icon: Home },
    { id: Screen.QUIZ, label: 'História', icon: BookOpen },
    { id: Screen.GAME, label: 'Praticar', icon: Gamepad2 },
    { id: Screen.ABOUT, label: 'Sobre', icon: Info },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe pt-2 px-4 shadow-lg z-50">
      <div className="flex justify-around items-center max-w-md mx-auto h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center w-16 transition-colors duration-200 ${
                isActive ? 'text-libras-blue font-bold' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon size={24} className={isActive ? 'fill-current' : ''} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;