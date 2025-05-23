
import React, { useEffect } from 'react';
import { Share2, Copy } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface GuessResult {
  city: { name: string; state: string };
  distance: number;
  direction: string;
  populationDelta: number;
  stateMatch: boolean;
  isCorrect: boolean;
}

interface WinScreenProps {
  targetCity: { name: string; state: string };
  guesses: GuessResult[];
  onPlayAgain: () => void;
}

const WinScreen: React.FC<WinScreenProps> = ({ targetCity, guesses, onPlayAgain }) => {
  const guessCount = guesses.length;
  const closestGuess = guesses
    .filter(guess => !guess.isCorrect)
    .reduce((closest, current) => 
      current.distance < closest.distance ? current : closest, 
      { distance: Infinity, city: { name: '', state: '' } }
    );

  // Create confetti effect
  useEffect(() => {
    const createConfetti = () => {
      const confetti = document.createElement('div');
      confetti.innerHTML = ['🎉', '🎊', '🎈', '✨', '🌟'][Math.floor(Math.random() * 5)];
      confetti.style.position = 'fixed';
      confetti.style.left = Math.random() * window.innerWidth + 'px';
      confetti.style.top = '-50px';
      confetti.style.fontSize = '24px';
      confetti.style.zIndex = '1000';
      confetti.style.pointerEvents = 'none';
      confetti.style.animation = 'fall 3s linear forwards';
      
      document.body.appendChild(confetti);
      
      setTimeout(() => {
        confetti.remove();
      }, 3000);
    };

    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fall {
        0% { transform: translateY(-50px) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);

    // Create confetti
    const interval = setInterval(createConfetti, 200);
    
    // Stop after 2 seconds
    setTimeout(() => clearInterval(interval), 2000);

    return () => {
      clearInterval(interval);
      style.remove();
    };
  }, []);

  const shareText = `I guessed ${targetCity.name} in ${guessCount} tries on Guessity! 🌍\nCan you beat me? Play now 👉`;
  const gameLink = window.location.href;

  const handleWhatsAppShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${gameLink}`)}`;
    window.open(url, '_blank');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText} ${gameLink}`);
      toast({
        title: "Copied!",
        description: "Share text copied to clipboard",
      });
    } catch (err) {
      console.error('Failed to copy:', err);
      toast({
        title: "Copy failed",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const getPerformanceMessage = (guesses: number) => {
    if (guesses === 1) return "🎯 INCREDIBLE! First try!";
    if (guesses <= 3) return "🔥 AMAZING! You're a geography master!";
    if (guesses <= 5) return "👏 GREAT! Well done!";
    if (guesses <= 8) return "✨ GOOD! Nice work!";
    return "🎉 COMPLETED! Every guess counts!";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center animate-scale-in">
        <div className="text-6xl mb-4 animate-bounce">🎉</div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          You found it!
        </h2>
        
        <p className="text-xl text-gray-700 mb-1">
          The city was <span className="font-bold text-sky-600">{targetCity.name}</span>!
        </p>
        
        <p className="text-lg text-gray-600 mb-6">
          {getPerformanceMessage(guessCount)}
        </p>

        <div className="bg-sky-50 rounded-xl p-4 mb-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-sky-600">{guessCount}</div>
              <div className="text-sm text-gray-600">Guesses</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-sky-600">
                {closestGuess.distance !== Infinity ? `${closestGuess.distance}km` : '-'}
              </div>
              <div className="text-sm text-gray-600">Closest Guess</div>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <button
            onClick={handleWhatsAppShare}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 font-medium"
          >
            <Share2 className="w-5 h-5" />
            Brag to your friends on WhatsApp!
          </button>
          
          <button
            onClick={handleCopyLink}
            className="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 font-medium"
          >
            <Copy className="w-5 h-5" />
            Copy Share Link
          </button>
        </div>

        <button
          onClick={onPlayAgain}
          className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white py-4 px-6 rounded-xl transition-all font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          🎮 Play Again
        </button>
      </div>
    </div>
  );
};

export default WinScreen;
