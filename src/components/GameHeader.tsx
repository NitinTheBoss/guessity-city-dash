
import React from 'react';
import { RotateCcw } from 'lucide-react';

interface GameHeaderProps {
  targetCity: { name: string; state: string };
  guessCount: number;
  onNewGame: () => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({ targetCity, guessCount, onNewGame }) => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-4 mb-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
          Guessity
        </h1>
        <button
          onClick={onNewGame}
          className="p-2 bg-sky-100 hover:bg-sky-200 rounded-lg transition-colors"
          title="New Game"
        >
          <RotateCcw className="w-5 h-5 text-sky-600" />
        </button>
      </div>
      
      <p className="text-gray-600 mb-2">
        🌍 Guess the hidden Indian city!
      </p>
      
      <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-sky-500 rounded-full"></span>
          <span>Guesses: {guessCount}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <span>Target: {targetCity.state}</span>
        </div>
      </div>
    </div>
  );
};

export default GameHeader;
