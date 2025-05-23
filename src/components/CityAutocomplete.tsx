
import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';

interface City {
  name: string;
  state: string;
  latitude: number;
  longitude: number;
  population: number;
}

interface CityAutocompleteProps {
  cities: City[];
  onCitySelect: (city: City) => void;
  disabled?: boolean;
}

const CityAutocomplete: React.FC<CityAutocompleteProps> = ({ cities, onCitySelect, disabled }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputValue.length > 0) {
      const filtered = cities
        .filter(city => 
          city.name.toLowerCase().includes(inputValue.toLowerCase()) ||
          city.state.toLowerCase().includes(inputValue.toLowerCase())
        )
        .slice(0, 8);
      setFilteredCities(filtered);
      setShowSuggestions(true);
      setHighlightedIndex(-1);
    } else {
      setFilteredCities([]);
      setShowSuggestions(false);
    }
  }, [inputValue, cities]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleCitySelect = (city: City) => {
    setInputValue('');
    setShowSuggestions(false);
    onCitySelect(city);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || filteredCities.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredCities.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : filteredCities.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleCitySelect(filteredCities[highlightedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type an Indian city name..."
          disabled={disabled}
          className="w-full pl-10 pr-4 py-3 border-2 border-sky-200 rounded-xl focus:border-sky-500 focus:outline-none transition-colors text-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>

      {showSuggestions && filteredCities.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-sky-200 rounded-xl shadow-lg z-10 max-h-64 overflow-y-auto">
          {filteredCities.map((city, index) => (
            <button
              key={`${city.name}-${city.state}`}
              onClick={() => handleCitySelect(city)}
              className={`w-full px-4 py-3 text-left hover:bg-sky-50 transition-colors border-b border-sky-100 last:border-b-0 ${
                index === highlightedIndex ? 'bg-sky-100' : ''
              }`}
            >
              <div className="font-medium text-gray-900">{city.name}</div>
              <div className="text-sm text-gray-600">{city.state}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CityAutocomplete;
