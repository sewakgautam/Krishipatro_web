"use client";
import React, { useEffect, useRef, useState } from "react";
import { Phone, ArrowRight, Wheat } from "lucide-react";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { auth } from "../../../firebaseauth";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import Image from 'next/image';

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
  }
}

interface PhonePageProps {
  onCodeSent: (phoneNumber: string, confirmationResult: any) => void;
}

export default function PhonePage({ onCodeSent }: PhonePageProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<"np" | "en">("np");
  const [recaptchaInitialized, setRecaptchaInitialized] = useState(false);
  const recaptchaRef = useRef<HTMLDivElement>(null);

  const initializeRecaptcha = () => {
    if (window.recaptchaVerifier) {
      return;
    }

    try {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response: any) => {
            console.log("reCAPTCHA solved");
            setRecaptchaInitialized(true);
          },
          "expired-callback": () => {
            console.log("reCAPTCHA expired");
            setRecaptchaInitialized(false);
          },
        }
      );

      window.recaptchaVerifier
        .render()
        .then((widgetId) => {
          console.log("Invisible reCAPTCHA rendered with widget ID:", widgetId);
          setRecaptchaInitialized(true);
        })
        .catch((error) => {
          console.error("Error rendering reCAPTCHA:", error);
          setRecaptchaInitialized(false);
        });
    } catch (error) {
      console.error("Error initializing reCAPTCHA:", error);
      setRecaptchaInitialized(false);
    }
  };

  useEffect(() => {
    // Initialize invisible reCAPTCHA when component mounts
    const timer = setTimeout(() => {
      initializeRecaptcha();
    }, 100);

    return () => {
      clearTimeout(timer);
      // Cleanup function
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
          delete window.recaptchaVerifier;
        } catch (error) {
          console.error("Error clearing reCAPTCHA:", error);
        }
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (!phoneNumber.trim()) {
      toast.error(
        language === "np" ? "फोन नम्बर भर्नुहोस्" : "Please enter phone number"
      );
      setIsLoading(false);
      return;
    }

    if (!window.recaptchaVerifier) {
      toast.error(
        language === "np"
          ? "reCAPTCHA लोड भएको छैन"
          : "reCAPTCHA not loaded"
      );
      setIsLoading(false);
      return;
    }

    // Format phone number (add +977 for Nepal if not present)
    let formattedPhone = phoneNumber.trim();
    if (!formattedPhone.startsWith("+")) {
      formattedPhone = "+977" + formattedPhone;
    }

    try {
      const result = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        window.recaptchaVerifier
      );

      toast.success(
        language === "np"
          ? "कोड पठाइयो। आफ्नो फोनमा चेक गर्नुहोस्।"
          : "Code sent! Check your phone."
      );

      // Pass the result to parent component
      onCodeSent(phoneNumber, result);
    } catch (error: any) {
      console.error("Error sending code:", error);

      let errorMessage =
        language === "np"
          ? "कोड पठाउन सकिएन। पुनः प्रयास गर्नुहोस्।"
          : "Failed to send code. Please try again.";

      // Handle specific Firebase errors
      if (error.code === "auth/invalid-phone-number") {
        errorMessage =
          language === "np"
            ? "गलत फोन नम्बर ढाँचा।"
            : "Invalid phone number format.";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage =
          language === "np"
            ? "धेरै प्रयासहरू। केहि समय पछि प्रयास गर्नुहोस्।"
            : "Too many attempts. Please try again later.";
      }

      toast.error(errorMessage);

      // Reinitialize reCAPTCHA on error
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
          delete window.recaptchaVerifier;
        } catch (error) {
          console.error("Error clearing reCAPTCHA:", error);
        }
      }
      setTimeout(() => {
        initializeRecaptcha();
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

  const texts = {
    np: {
      title: "फोन नम्बर भर्नुहोस्",
      subtitle: "आफ्नो फोन नम्बर भर्नुहोस्",
      phoneNumber: "फोन नम्बर",
      sendCode: "कोड पठाउनुहोस्",
      sending: "पठाउँदै...",
      noAccount: "खाता छैन?",
      createAccount: "खाता खोल्नुहोस्",
      secureLogin: "सुरक्षित लग इन",
    },
    en: {
      title: "Enter Phone Number",
      subtitle: "Enter your phone number",
      phoneNumber: "Phone Number",
      sendCode: "Send Code",
      sending: "Sending...",
      noAccount: "No account?",
      createAccount: "Create Account",
      secureLogin: "Secure Login",
    },
  };

  const t = texts[language];

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
              <div className="flex items-center gap-3">
                          <Image
                            src={"/mainlogo.png"}
                            alt="Description"
                            width={300}
                            height={40}
                            className="rounded-full"
                          />
                        </div>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">{t.title}</h2>
            <p className="text-gray-600 text-sm">{t.subtitle}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Phone Number Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {t.phoneNumber}
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-base text-black"
                  placeholder="9812345678"
                  required
                />
              </div>
              <p className="text-xs text-gray-500">
                {language === "np"
                  ? "नेपालको फोन नम्बर (९८XXXXXXXX)"
                  : "Nepal phone number (98XXXXXXXX)"}
              </p>
            </div>

            {/* Invisible reCAPTCHA container */}
            <div id="recaptcha-container"></div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !phoneNumber.trim()}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-base"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  {t.sending}
                </>
              ) : (
                <>
                  <Phone className="w-5 h-5" />
                  {t.sendCode}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Create Account Link */}
          <div className="text-center mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              {t.noAccount}{" "}
              <button className="text-green-600 hover:text-green-700 font-medium hover:underline">
                {t.createAccount}
              </button>
            </p>
          </div>
        </div>

        {/* Simple illustration */}
        <div className="mt-8 text-center">
          <div className="inline-block bg-white rounded-full p-4 shadow-lg">
            <div className="text-4xl">🌾</div>
          </div>
          <p className="text-green-700 font-medium mt-2 text-sm">
            {language === "np" ? "सरल कृषि समाधान" : "Simple Farming Solutions"}
          </p>
        </div>
      </div>
    </div>
  );
}
