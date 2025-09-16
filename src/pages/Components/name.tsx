"use client";
import React, { useState } from "react";
import { User, ArrowRight, Shield, Wheat } from "lucide-react";
import { updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import { db } from '../../../lib/firebaseauth';
import FarmSuccessAnimation from './successanimation';


interface NamePageProps {
  user: any; // Firebase user object
  onProfileComplete: () => void;
}

export default function NamePage({ user, onProfileComplete }: NamePageProps) {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [language, setLanguage] = useState<"np" | "en">("np");

  const handleAnimationComplete = () => {
    onProfileComplete();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!name.trim()) {
      toast.error(
        language === "np" ? "नाम भर्नुहोस्" : "Please enter your name"
      );
      setIsLoading(false);
      return;
    }

    try {
      // Update Firebase Auth profile
      await updateProfile(user, {
        displayName: name.trim(),
      });

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        userName: name.trim(),
        phoneNumber: user.phoneNumber,
        uid: user.uid,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      toast.success(
        language === "np"
          ? "प्रोफाइल सिर्जना भयो!"
          : "Profile created successfully!"
      );

      // Show animation before redirecting
      setShowAnimation(true);
    } catch (error: any) {
      console.error("Error creating user profile:", error);
      
      let errorMessage =
        language === "np"
          ? "प्रोफाइल सिर्जना गर्न सकिएन। पुनः प्रयास गर्नुहोस्।"
          : "Failed to create profile. Please try again.";

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const texts = {
    np: {
      title: "आफ्नो नाम भर्नुहोस्",
      subtitle: "आफ्नो प्रोफाइल पूरा गर्नुहोस्",
      name: "पूरा नाम",
      complete: "पूरा गर्नुहोस्",
      completing: "पूरा गर्दै...",
      welcome: "स्वागत छ",
      almostDone: "लगभग सकियो!",
    },
    en: {
      title: "Enter Your Name",
      subtitle: "Complete your profile",
      name: "Full Name",
      complete: "Complete",
      completing: "Completing...",
      welcome: "Welcome",
      almostDone: "Almost done!",
    },
  };

  const t = texts[language];

  // Show animation after successful profile creation
  if (showAnimation) {
    return (
      <FarmSuccessAnimation
        language={language}
        message={language === "np" ? "प्रोफाइल तयार भयो! स्वागत पृष्ठमा जाँदै..." : "Profile created! Taking you to dashboard..."}
        onComplete={handleAnimationComplete}
        duration={4000}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50 flex items-center justify-center p-4">
      <Toaster position="top-right" />
      
      {/* Language Toggle */}
      <button
        onClick={() => setLanguage(language === "np" ? "en" : "np")}
        className="fixed top-4 right-4 z-50 bg-white shadow-md rounded-full px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-50 transition-colors"
      >
        {language === "np" ? "English" : "नेपाली"}
      </button>

      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="bg-green-600 rounded-full p-3">
                <Wheat className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-green-800">कृषि पात्रो</h1>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">{t.title}</h2>
            <p className="text-gray-600 text-sm">{t.subtitle}</p>
          </div>

          {/* Welcome Message */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-green-800 text-center">
              <strong>{t.welcome}!</strong> {t.almostDone}
            </p>
            <p className="text-xs text-green-600 text-center mt-1">
              {language === "np" ? "फोन:" : "Phone:"} {user?.phoneNumber}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {t.name}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-base text-black"
                  placeholder={
                    language === "np" ? "राम बहादुर" : "John Doe"
                  }
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !name.trim()}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-base"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  {t.completing}
                </>
              ) : (
                <>
                  <User className="w-5 h-5" />
                  {t.complete}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Security Badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
            <Shield className="w-4 h-4" />
            <span>
              {language === "np" ? "सुरक्षित प्रोफाइल" : "Secure Profile"}
            </span>
          </div>
        </div>

        {/* Simple illustration */}
        <div className="mt-8 text-center">
          <div className="inline-block bg-white rounded-full p-4 shadow-lg">
            <div className="text-4xl">👤</div>
          </div>
          <p className="text-green-700 font-medium mt-2 text-sm">
            {language === "np" ? "आफ्नो प्रोफाइल बनाउनुहोस्" : "Create Your Profile"}
          </p>
        </div>
      </div>
    </div>
  );
}
