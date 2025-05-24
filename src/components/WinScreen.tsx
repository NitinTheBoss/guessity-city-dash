
import React, { useEffect } from 'react';
import { Share2, Copy } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface WinScreenProps {
  targetCity: { name: string; state: string };
  guesses: any[];
  onPlayAgain: () => void;
  gameMode: 'daily' | 'infinite';
}

const WinScreen: React.FC<WinScreenProps> = ({ targetCity, guesses, onPlayAgain, gameMode }) => {
  const guessCount = guesses.length;

  // Create confetti effect
  useEffect(() => {
    const createConfetti = () => {
      const confetti = document.createElement('div');
      confetti.innerHTML = ['🎉', '🎊', '🎈', '🎯', '✨'][Math.floor(Math.random() * 5)];
      confetti.style.position = 'fixed';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = '-50px';
      confetti.style.fontSize = '2rem';
      confetti.style.pointerEvents = 'none';
      confetti.style.zIndex = '1000';
      confetti.style.animation = 'fall 3s linear forwards';
      
      document.body.appendChild(confetti);
      
      setTimeout(() => {
        confetti.remove();
      }, 3000);
    };

    // Add CSS for falling animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fall {
        to {
          transform: translateY(100vh) rotate(360deg);
        }
      }
    `;
    document.head.appendChild(style);

    // Create multiple confetti pieces
    const interval = setInterval(createConfetti, 200);
    
    // Clean up after 2 seconds
    setTimeout(() => {
      clearInterval(interval);
      style.remove();
    }, 2000);

    return () => {
      clearInterval(interval);
      style.remove();
    };
  }, []);

  const shareText = gameMode === 'daily' 
    ? `I guessed today's city in ${guessCount} tries on Guessity! 🇮🇳🗺️\nCan you beat me? Play now 👉`
    : `I guessed the city in ${guessCount} tries on Guessity! 🇮🇳🗺️\nCan you beat me? Play now 👉`;
  const gameLink = window.location.href;

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + gameLink)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareText + ' ' + gameLink);
    toast({
      title: "Copied to clipboard!",
      description: "Share your result with friends",
    });
  };

  const getEncouragementText = () => {
    if (guessCount === 1) return "🤯 INCREDIBLE! First try!";
    if (guessCount <= 3) return "🎯 Amazing! You're a geography master!";
    if (guessCount <= 5) return "🎊 Great job! Well played!";
    if (guessCount <= 8) return "👏 Nice work! You got there!";
    return "🎉 Victory! Persistence pays off!";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center animate-scale-in">
        <div className="text-6xl mb-4 animate-bounce">🎉</div>
        
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          You Found It! 🇮🇳
        </h2>
        
        <p className="text-xl text-gray-600 mb-6">
          {getEncouragementText()}
        </p>

        <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl p-6 mb-6">
          <div className="text-4xl mb-2">🗺️</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">
            {targetCity.name}
          </h3>
          <p className="text-gray-600">{targetCity.state}</p>
          <p className="text-lg font-semibold text-sky-600 mt-2">
            {guessCount} {guessCount === 1 ? 'guess' : 'guesses'}!
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-3">
            <button
              onClick={handleWhatsAppShare}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Share2 className="w-5 h-5" />
              WhatsApp
            </button>
            <button
              onClick={handleCopyLink}
              className="flex-1 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Copy className="w-5 h-5" />
              Copy Link
            </button>
          </div>
          
          <button
            onClick={onPlayAgain}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            {gameMode === 'daily' ? 'Back to Menu' : 'Play Again'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinScreen;
