
import React from 'react';
import { MapPin, Navigation, Users, MapIcon } from 'lucide-react';
import { formatPopulationDelta } from '../utils/gameLogic';

interface City {
  name: string;
  state: string;
  latitude: number;
  longitude: number;
  population: number;
}

interface GuessResult {
  city: City;
  distance: number;
  direction: string;
  populationDelta: number;
  stateMatch: boolean;
  isCorrect: boolean;
}

interface GuessResultProps {
  result: GuessResult;
  guessNumber: number;
}

const GuessResult: React.FC<GuessResultProps> = ({ result, guessNumber }) => {
  const { city, distance, direction, populationDelta, stateMatch, isCorrect } = result;

  const getDistanceColor = (distance: number) => {
    if (distance === 0) return 'text-green-600 bg-green-50';
    if (distance < 50) return 'text-orange-600 bg-orange-50';
    if (distance < 200) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getDirectionEmoji = (direction: string) => {
    const directionMap: { [key: string]: string } = {
      'North': '⬆️',
      'Northeast': '↗️',
      'East': '➡️',
      'Southeast': '↘️',
      'South': '⬇️',
      'Southwest': '↙️',
      'West': '⬅️',
      'Northwest': '↖️'
    };
    return directionMap[direction] || '🧭';
  };

  if (isCorrect) {
    return (
      <div className="bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 rounded-xl p-6 mb-4 animate-bounce">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">🎉</div>
            <div className="text-xl font-bold text-green-800">
              Correct! {city.name}, {city.state}
            </div>
            <div className="text-green-600 mt-1">Guess #{guessNumber}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-2 border-sky-200 rounded-xl p-4 mb-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="font-bold text-lg text-gray-900">{city.name}</div>
          <div className="text-gray-600 text-sm">{city.state}</div>
        </div>
        <div className="bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm font-medium">
          #{guessNumber}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className={`flex items-center p-3 rounded-lg ${getDistanceColor(distance)}`}>
          <MapPin className="w-5 h-5 mr-2" />
          <div>
            <div className="font-semibold">{distance} km away</div>
            <div className="text-xs opacity-75">Distance</div>
          </div>
        </div>

        <div className="flex items-center p-3 rounded-lg bg-blue-50 text-blue-600">
          <Navigation className="w-5 h-5 mr-2" />
          <div>
            <div className="font-semibold">
              {getDirectionEmoji(direction)} {direction}
            </div>
            <div className="text-xs opacity-75">Direction</div>
          </div>
        </div>

        <div className="flex items-center p-3 rounded-lg bg-purple-50 text-purple-600">
          <Users className="w-5 h-5 mr-2" />
          <div>
            <div className="font-semibold text-xs">
              {formatPopulationDelta(populationDelta)}
            </div>
            <div className="text-xs opacity-75">Population</div>
          </div>
        </div>

        <div className={`flex items-center p-3 rounded-lg ${
          stateMatch ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
        }`}>
          <MapIcon className="w-5 h-5 mr-2" />
          <div>
            <div className="font-semibold text-xs">
              {stateMatch ? 'Correct State! ✅' : 'Wrong State ❌'}
            </div>
            <div className="text-xs opacity-75">State</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuessResult;
