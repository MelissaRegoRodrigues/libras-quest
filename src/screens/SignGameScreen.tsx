import React, { useState, useEffect } from 'react';
import { fetchSignGameData, shuffleArray } from '../services/geminiService.ts'; 
import { SignGameItem } from '../types.ts';
import { Loader2, Shuffle, Image as ImageIcon } from 'lucide-react';

const SignGameScreen: React.FC = () => {
  const [items, setItems] = useState<SignGameItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWord, setSelectedWord] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [matches, setMatches] = useState<number[]>([]); 
  const [attempts, setAttempts] = useState(0);
  const [imageErrors, setImageErrors] = useState<number[]>([]);
 
  const [shuffledImages, setShuffledImages] = useState<SignGameItem[]>([]); 

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = async () => {
    setLoading(true);
    setMatches([]);
    setImageErrors([]);
    setAttempts(0);
    setSelectedWord(null);
    setSelectedImage(null);
    
    const data = await fetchSignGameData();
    setItems(data);
    
    setShuffledImages(shuffleArray(data)); 
    
    setLoading(false);
  };

  const handleWordClick = (id: number) => {
    if (matches.includes(id)) return;
    setSelectedWord(id);
    checkMatch(id, selectedImage);
  };

  const handleImageClick = (id: number) => {
    if (matches.includes(id)) return;
    setSelectedImage(id);
    checkMatch(selectedWord, id);
  };

  const checkMatch = (wordId: number | null, imageId: number | null) => {
    if (wordId !== null && imageId !== null) {
      setAttempts(prev => prev + 1);
      if (wordId === imageId) {
        setMatches(prev => [...prev, wordId]);
        setSelectedWord(null);
        setSelectedImage(null);
      } else {
        setTimeout(() => {
          setSelectedWord(null);
          setSelectedImage(null);
        }, 800);
      }
    }
  };

  const handleImageError = (id: number) => {
    setImageErrors(prev => [...prev, id]);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full pb-20">
        <Loader2 className="animate-spin text-libras-blue mb-4" size={48} />
        <p className="text-gray-500 font-medium">Carregando...</p>
      </div>
    );
  }

  const isGameOver = matches.length === items.length && items.length > 0;

  return (
    <div className="flex flex-col h-full p-4 pb-24 overflow-y-auto no-scrollbar bg-gray-50">
      <div className="flex justify-between items-end mb-6">
        <div>
           <h2 className="text-2xl font-bold text-gray-800">Praticar Sinais</h2>
           <p className="text-gray-500 text-sm">Associe a palavra à foto</p>
        </div>
        <div className="text-right">
             <div className="text-xs text-gray-400">Pares</div>
             <div className="font-bold text-libras-blue">{matches.length} / {items.length}</div>
        </div>
      </div>

      {isGameOver ? (
         <div className="flex flex-col items-center justify-center flex-grow bg-white rounded-3xl shadow-sm p-8 text-center my-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Parabéns!</h3>
            <p className="text-gray-600 mb-6">Você completou o desafio de vocabulário em {attempts} tentativas.</p>
            <button 
              onClick={startNewGame}
              className="bg-libras-blue text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-blue-700 transition"
            >
              <Shuffle size={18} /> Jogar Novamente
            </button>
         </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
             <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 text-center">Palavra</h3>
             {items.map((item) => {
               const isMatched = matches.includes(item.id);
               const isSelected = selectedWord === item.id;
               return (
                 <button
                    key={`w-${item.id}`}
                    onClick={() => handleWordClick(item.id)}
                    disabled={isMatched}
                    className={`w-full p-2 h-40 rounded-xl text-sm font-bold shadow-sm transition-all flex flex-col items-center justify-center border-2
                      ${isMatched ? 'bg-green-50 border-green-200 text-green-800 opacity-60' : 
                        isSelected ? 'bg-blue-50 border-libras-blue text-libras-blue' : 'bg-white border-transparent text-gray-700 hover:border-gray-200'}`}
                 >
                   <span className="text-lg">{isMatched ? "✓" : item.word}</span>
                 </button>
               )
             })}
          </div>
          <div className="space-y-4">
             <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 text-center">Sinal</h3>
             {shuffledImages.map((item) => {
               const isMatched = matches.includes(item.id);
               const isSelected = selectedImage === item.id;
               const hasError = imageErrors.includes(item.id);
               
               return (
                 <button
                    key={`i-${item.id}`}
                    onClick={() => handleImageClick(item.id)}
                    disabled={isMatched}
                    className={`w-full rounded-xl shadow-sm transition-all h-40 flex flex-col items-center justify-center overflow-hidden border-2 bg-gray-100 p-0 relative
                      ${isMatched ? 'bg-green-50 border-green-200 opacity-60' : 
                        isSelected ? 'ring-4 ring-libras-blue border-libras-blue' : 'border-transparent hover:border-gray-300'}`}
                 >
                   {isMatched ? (
                      <span className="text-xl font-bold text-green-600">✓</span>
                   ) : (
                     <>
                       {item.imageUrl && !hasError ? (
                         <img 
                            src={item.imageUrl} 
                            alt={`Sinal de ${item.word}`} 
                            className="h-full w-full object-cover"
                            onError={() => handleImageError(item.id)}
                         />
                       ) : (
                         <div className="flex flex-col items-center justify-center h-full w-full text-gray-300 bg-gray-50">
                            <ImageIcon className="opacity-30 mb-1" size={32} />
                            <span className="text-[10px] opacity-50">Img</span>
                         </div>
                       )}
                     </>
                   )}
                 </button>
               )
             })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SignGameScreen;