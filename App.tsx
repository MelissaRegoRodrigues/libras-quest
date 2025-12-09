import React, { useState } from 'react';
import BottomNav from './components/BottomNav';
import HomeScreen from './screens/HomeScreen';
import HistoryQuizScreen from './screens/HistoryQuizScreen';
import SignGameScreen from './screens/SignGameScreen';
import AboutScreen from './screens/AboutScreen';
import { Screen } from './types';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.HOME);

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.HOME:
        return <HomeScreen onNavigate={setCurrentScreen} />;
      case Screen.QUIZ:
        return <HistoryQuizScreen />;
      case Screen.GAME:
        return <SignGameScreen />;
      case Screen.ABOUT:
        return <AboutScreen />;
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans text-gray-900 sm:max-w-md sm:mx-auto sm:border-x sm:border-gray-200 shadow-2xl relative">
      <main className="flex-1 overflow-hidden relative">
        {renderScreen()}
      </main>
      <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} />
    </div>
  );
};

export default App;