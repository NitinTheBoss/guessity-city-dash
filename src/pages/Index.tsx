
import React, { useState, useEffect } from 'react';
import CityAutocomplete from '../components/CityAutocomplete';
import GuessResult from '../components/GuessResult';
import WinScreen from '../components/WinScreen';
import GameHeader from '../components/GameHeader';
import { processGuess, getDailyCity } from '../utils/gameLogic';
import citiesData from '../data/cities.json';

interface City {
  name: string;
  state: string;
  latitude: number;
  longitude: number;
  population: number;
}

const Index = () => {
  const [cities] = useState<City[]>(citiesData);
  const [targetCity, setTargetCity] = useState<City | null>(null);
  const [guesses, setGuesses] = useState<any[]>([]);
  const [gameWon, setGameWon] = useState(false);

  // Initialize game
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const newTarget = getDailyCity(cities);
    setTargetCity(newTarget);
    setGuesses([]);
    setGameWon(false);
    console.log('Daily target city:', newTarget.name); // For debugging
  };

  const handleCityGuess = (guessedCity: City) => {
    if (!targetCity || gameWon) return;

    const result = processGuess(guessedCity, targetCity);
    const newGuesses = [...guesses, result];
    setGuesses(newGuesses);

    if (result.isCorrect) {
      setGameWon(true);
    }
  };

  const handlePlayAgain = () => {
    startNewGame();
  };

  if (!targetCity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <GameHeader 
          targetCity={targetCity}
          guessCount={guesses.length}
          onNewGame={startNewGame}
        />

        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <CityAutocomplete
              cities={cities}
              onCitySelect={handleCityGuess}
              disabled={gameWon}
            />
          </div>

          {guesses.length > 0 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Your Guesses
                </h3>
                <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-blue-500 mx-auto rounded-full"></div>
              </div>

              <div className="max-h-96 overflow-y-auto space-y-3">
                {guesses.map((guess, index) => (
                  <GuessResult
                    key={`${guess.city.name}-${index}`}
                    result={guess}
                    guessNumber={guesses.length - index}
                  />
                ))}
              </div>
            </div>
          )}

          {guesses.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🗺️</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Ready to start guessing?
              </h3>
              <p className="text-gray-600">
                Type the name of an Indian city above to begin!
              </p>
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="text-lg mb-1">📍</div>
                  <div>Distance</div>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="text-lg mb-1">🧭</div>
                  <div>Direction</div>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="text-lg mb-1">👥</div>
                  <div>Population</div>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="text-lg mb-1">🏙️</div>
                  <div>State</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {gameWon && (
          <WinScreen
            targetCity={targetCity}
            guesses={guesses}
            onPlayAgain={handlePlayAgain}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
