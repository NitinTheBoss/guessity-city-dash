
import React from 'react';
import { Calendar, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GameModeSelectorProps {
  onModeSelect: (mode: 'daily' | 'infinite') => void;
}

const GameModeSelector: React.FC<GameModeSelectorProps> = ({ onModeSelect }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="text-8xl mb-6">🗺️🇮🇳</div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Guessity
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            🇮🇳 The Ultimate Indian Geography Challenge
          </p>
          <p className="text-gray-500">
            Test your knowledge of India's cities!
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
            Choose Your Game Mode
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Daily Challenge Mode */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-transparent hover:border-green-200 transition-all duration-300 hover:shadow-xl">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  Daily Challenge
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  One city per day, same for everyone. Perfect for sharing your score with friends! 🎯
                </p>
                <div className="space-y-2 text-sm text-gray-500 mb-6">
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Same city for all players</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Share your results</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>New city every day</span>
                  </div>
                </div>
                <Button 
                  onClick={() => onModeSelect('daily')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  size="lg"
                >
                  Play Daily Challenge
                </Button>
              </div>
            </div>

            {/* Infinite Mode */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-transparent hover:border-orange-200 transition-all duration-300 hover:shadow-xl">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shuffle className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  Infinite Mode
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Keep playing with random cities! Perfect for practice and endless fun. 🎲
                </p>
                <div className="space-y-2 text-sm text-gray-500 mb-6">
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    <span>Random cities</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    <span>Play as much as you want</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    <span>Perfect for practice</span>
                  </div>
                </div>
                <Button 
                  onClick={() => onModeSelect('infinite')}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                  size="lg"
                >
                  Play Infinite Mode
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameModeSelector;
