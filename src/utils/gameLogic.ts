
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

// Haversine formula to calculate distance between two points
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return Math.round(R * c);
};

// Calculate direction from guess to target
export const calculateDirection = (guessLat: number, guessLon: number, targetLat: number, targetLon: number): string => {
  const dLon = targetLon - guessLon;
  const dLat = targetLat - guessLat;
  
  const angle = Math.atan2(dLon, dLat) * 180 / Math.PI;
  const normalizedAngle = (angle + 360) % 360;
  
  if (normalizedAngle >= 337.5 || normalizedAngle < 22.5) return "North";
  if (normalizedAngle >= 22.5 && normalizedAngle < 67.5) return "Northeast";
  if (normalizedAngle >= 67.5 && normalizedAngle < 112.5) return "East";
  if (normalizedAngle >= 112.5 && normalizedAngle < 157.5) return "Southeast";
  if (normalizedAngle >= 157.5 && normalizedAngle < 202.5) return "South";
  if (normalizedAngle >= 202.5 && normalizedAngle < 247.5) return "Southwest";
  if (normalizedAngle >= 247.5 && normalizedAngle < 292.5) return "West";
  return "Northwest";
};

// Format population difference
export const formatPopulationDelta = (delta: number): string => {
  const absDelta = Math.abs(delta);
  const isMore = delta > 0;
  
  if (absDelta >= 1000000) {
    const millions = (absDelta / 1000000).toFixed(1);
    return `${millions}M ${isMore ? 'more' : 'fewer'} people`;
  } else if (absDelta >= 1000) {
    const thousands = Math.round(absDelta / 1000);
    return `${thousands}K ${isMore ? 'more' : 'fewer'} people`;
  } else {
    return `${absDelta} ${isMore ? 'more' : 'fewer'} people`;
  }
};

// Process a guess against the target city
export const processGuess = (guessedCity: City, targetCity: City): GuessResult => {
  const distance = calculateDistance(
    guessedCity.latitude, 
    guessedCity.longitude, 
    targetCity.latitude, 
    targetCity.longitude
  );
  
  const direction = calculateDirection(
    guessedCity.latitude,
    guessedCity.longitude,
    targetCity.latitude,
    targetCity.longitude
  );
  
  const populationDelta = targetCity.population - guessedCity.population;
  const stateMatch = guessedCity.state === targetCity.state;
  const isCorrect = guessedCity.name === targetCity.name;
  
  return {
    city: guessedCity,
    distance,
    direction,
    populationDelta,
    stateMatch,
    isCorrect
  };
};

// Get random city for the target
export const getRandomCity = (cities: City[]): City => {
  return cities[Math.floor(Math.random() * cities.length)];
};
