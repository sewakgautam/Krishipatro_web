"use client";
import React, { useEffect } from "react";
import { CheckCircle, Wheat, Sparkles } from "lucide-react";

interface FarmSuccessAnimationProps {
  language?: "np" | "en";
  message?: string;
  onComplete?: () => void;
  duration?: number; // in milliseconds
}

export default function FarmSuccessAnimation({ 
  language = "np", 
  message,
  onComplete,
  duration = 4000 
}: FarmSuccessAnimationProps) {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  const texts = {
    np: {
      success: "सफल भयो!",
      welcome: "स्वागत छ!",
      redirecting: "स्वागत पृष्ठमा जाँदै...",
    },
    en: {
      success: "Success!",
      welcome: "Welcome!",
      redirecting: "Taking you to dashboard...",
    },
  };

  const t = texts[language];
  const displayMessage = message || t.redirecting;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center p-4 overflow-hidden relative">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-green-400 rounded-full opacity-60 animate-float-random"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}

        {/* Wheat Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(12)].map((_, i) => (
            <Wheat
              key={`bg-wheat-${i}`}
              className="absolute w-24 h-24 text-green-600 animate-gentle-sway"
              style={{
                left: `${(i % 4) * 25}%`,
                top: `${Math.floor(i / 4) * 33}%`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-md mx-auto">
        
        {/* Success Circle with Ripple Effect */}
        <div className="relative mb-8">
          {/* Ripple Rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(3)].map((_, i) => (
              <div
                key={`ripple-${i}`}
                className="absolute w-32 h-32 border-4 border-green-400 rounded-full animate-ripple opacity-40"
                style={{
                  animationDelay: `${i * 0.6}s`,
                }}
              />
            ))}
          </div>
          
          {/* Main Success Circle */}
          <div className="relative w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-success-bounce">
            <CheckCircle className="w-16 h-16 text-white animate-check-appear" />
            
            {/* Sparkle Effects */}
            {[...Array(8)].map((_, i) => (
              <Sparkles
                key={`sparkle-${i}`}
                className="absolute w-4 h-4 text-yellow-400 animate-sparkle"
                style={{
                  left: `${50 + 40 * Math.cos((i * Math.PI) / 4)}%`,
                  top: `${50 + 40 * Math.sin((i * Math.PI) / 4)}%`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Farm Elements Circle */}
        <div className="relative mb-8">
          {/* Rotating Farm Icons */}
          {['🌾', '🚜', '🌱', '🍃', '🌻', '🥕', '🌽', '🍎'].map((emoji, i) => (
            <div
              key={`farm-${i}`}
              className="absolute text-3xl animate-orbit"
              style={{
                left: '50%',
                top: '50%',
                transformOrigin: '0 0',
                transform: `rotate(${i * 45}deg) translateX(80px) rotate(-${i * 45}deg)`,
                animationDelay: `${i * 0.3}s`,
              }}
            >
              <span className="block animate-bounce">{emoji}</span>
            </div>
          ))}
        </div>

        {/* Success Text with Typewriter Effect */}
        <div className="space-y-4 mb-8">
          <h2 className="text-4xl font-bold text-green-800 animate-slide-up">
            {t.success}
          </h2>
          <p className="text-lg text-green-600 animate-slide-up-delay font-medium">
            {displayMessage}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-green-200 rounded-full h-2 mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full animate-progress" />
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={`dot-${i}`}
              className="w-3 h-3 bg-green-500 rounded-full animate-bounce-sequence"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>

        {/* Farm Scene */}
        <div className="mt-12 animate-slide-up-slow">
          <div className="text-6xl mb-4 animate-scene-appear">
            🏡🌾🚜🌾🏡
          </div>
          <div className="text-sm text-green-600 font-medium">
            {language === "np" ? "कृषि पात्रो - सरल कृषि समाधान" : "Krishi Patro - Simple Farming Solutions"}
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float-random {
          0%, 100% { 
            transform: translateY(0px) translateX(0px); 
            opacity: 0.6;
          }
          25% { 
            transform: translateY(-20px) translateX(10px); 
            opacity: 1;
          }
          50% { 
            transform: translateY(-40px) translateX(-5px); 
            opacity: 0.8;
          }
          75% { 
            transform: translateY(-20px) translateX(15px); 
            opacity: 1;
          }
        }
        
        @keyframes gentle-sway {
          0%, 100% { transform: rotate(-2deg) scale(1); }
          50% { transform: rotate(2deg) scale(1.05); }
        }
        
        @keyframes ripple {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
        
        @keyframes success-bounce {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        
        @keyframes check-appear {
          0% { opacity: 0; transform: scale(0); }
          50% { opacity: 0; transform: scale(0); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(180deg); }
        }
        
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(80px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up-delay {
          0% { opacity: 0; transform: translateY(30px); }
          30% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up-slow {
          0% { opacity: 0; transform: translateY(50px) scale(0.8); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        
        @keyframes bounce-sequence {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
        
        @keyframes scene-appear {
          0% { opacity: 0; transform: scale(0.5); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        .animate-float-random { animation: float-random 4s ease-in-out infinite; }
        .animate-gentle-sway { animation: gentle-sway 4s ease-in-out infinite; }
        .animate-ripple { animation: ripple 2s ease-out infinite; }
        .animate-success-bounce { animation: success-bounce 0.8s ease-out; }
        .animate-check-appear { animation: check-appear 1.2s ease-out; }
        .animate-sparkle { animation: sparkle 1.5s ease-in-out infinite; }
        .animate-orbit { animation: orbit 8s linear infinite; }
        .animate-slide-up { animation: slide-up 0.8s ease-out; }
        .animate-slide-up-delay { animation: slide-up-delay 1.5s ease-out; }
        .animate-slide-up-slow { animation: slide-up-slow 2s ease-out; }
        .animate-progress { animation: progress 3s ease-out; }
        .animate-bounce-sequence { animation: bounce-sequence 1.4s ease-in-out infinite; }
        .animate-scene-appear { animation: scene-appear 1.5s ease-out 1.5s both; }
      `}</style>
    </div>
  );
}
