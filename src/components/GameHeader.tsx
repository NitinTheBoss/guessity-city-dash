
import React from 'react';
import { RotateCcw, ArrowLeft } from 'lucide-react';

interface GameHeaderProps {
  targetCity: { name: string; state: string };
  guessCount: number;
  onNewGame: () => void;
  onBackToModes: () => void;
  gameMode: 'daily' | 'infinite';
}

const GameHeader: React.FC<GameHeaderProps> = ({ guessCount, onNewGame, onBackToModes, gameMode }) => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-4 mb-4">
        <button
          onClick={onBackToModes}
          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          title="Back to Game Modes"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        
        <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
          Guessity 🇮🇳
        </h1>
        
        <button
          onClick={onNewGame}
          className="p-2 bg-sky-100 hover:bg-sky-200 rounded-lg transition-colors"
          title={gameMode === 'daily' ? "New Daily Challenge" : "New Game"}
        >
          <RotateCcw className="w-5 h-5 text-sky-600" />
        </button>
      </div>
      
      <p className="text-gray-600 mb-2">
        🗺️ Guess {gameMode === 'daily' ? "today's" : "the"} hidden Indian city!
      </p>
      
      <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-sky-500 rounded-full"></span>
          <span>Guesses: {guessCount}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className={`w-2 h-2 rounded-full ${gameMode === 'daily' ? 'bg-green-500' : 'bg-orange-500'}`}></span>
          <span>{gameMode === 'daily' ? 'Daily Challenge' : 'Infinite Mode'}</span>
        </div>
      </div>
    </div>
  );
};

export default GameHeader;
