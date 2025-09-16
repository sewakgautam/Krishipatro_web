"use client";
import React, { useState, useRef } from "react";
import { Lock, ArrowRight, Shield, Wheat } from "lucide-react";
import { ConfirmationResult } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import toast, { Toaster } from "react-hot-toast";
import { db } from "../../../lib/firebaseauth";
import FarmSuccessAnimation from "./successanimation";

interface OtpPageProps {
  phoneNumber: string;
  confirmationResult: ConfirmationResult;
  onVerificationSuccess: (user: any, userExists: boolean) => void;
  onBackToPhone: () => void;
}

export default function OtpPage({
  phoneNumber,
  confirmationResult,
  onVerificationSuccess,
  onBackToPhone,
}: OtpPageProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [verifiedUser, setVerifiedUser] = useState<any>(null);
  const [language, setLanguage] = useState<"np" | "en">("np");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const checkUserExists = async (userId: string) => {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      return userDoc.exists();
    } catch (error) {
      console.error("Error checking user existence:", error);
      return false;
    }
  };

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newOtp.every((digit) => digit !== "") && !isLoading) {
      handleVerifyOtp(newOtp.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    const newOtp = [...otp];

    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    // Focus the next empty input or last input
    const nextEmptyIndex = newOtp.findIndex((digit) => digit === "");
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();

    // Auto-submit if complete
    if (pastedData.length === 6) {
      handleVerifyOtp(pastedData);
    }
  };

  const handleVerifyOtp = async (otpCode: string) => {
    setIsLoading(true);

    try {
      const result = await confirmationResult.confirm(otpCode);
      const user = result.user;

      // Check if user exists in Firestore
      const exists = await checkUserExists(user.uid);

      toast.success(
        language === "np" ? "कोड पुष्टि भयो!" : "Code verified successfully!"
      );

      setVerifiedUser(user);
      setUserExists(exists);

      if (exists) {
        // Show animation for existing users
        setShowAnimation(true);
      } else {
        // Directly go to name page for new users
        onVerificationSuccess(user, false);
      }
    } catch (error: any) {
      console.error("Error verifying code:", error);

      let errorMessage =
        language === "np"
          ? "गलत कोड। पुनः प्रयास गर्नुहोस्।"
          : "Invalid code. Please try again.";

      if (error.code === "auth/invalid-verification-code") {
        errorMessage =
          language === "np"
            ? "गलत पुष्टिकरण कोड।"
            : "Invalid verification code.";
      } else if (error.code === "auth/code-expired") {
        errorMessage =
          language === "np"
            ? "कोडको समय सकिएको छ। नयाँ कोड माग्नुहोस्।"
            : "Code expired. Please request a new code.";
      }

      toast.error(errorMessage);
      setIsLoading(false);

      // Clear OTP on error
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    }
  };

  const handleAnimationComplete = () => {
    // Animation completed, now redirect existing user to dashboard
    onVerificationSuccess(verifiedUser, userExists);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length === 6) {
      handleVerifyOtp(otpCode);
    }
  };

  const texts = {
    np: {
      title: "कोड भर्नुहोस्",
      subtitle: "SMS मा आएको ६ अंकको कोड भर्नुहोस्",
      verify: "पुष्टि गर्नुहोस्",
      verifying: "पुष्टि गर्दै...",
      backToPhone: "फिर्ता जानुहोस्",
      secureLogin: "सुरक्षित लग इन",
      resendCode: "कोड पुनः पठाउनुहोस्",
      enterDigits: "कोड भर्नुहोस्",
      autoVerify: "कोड अपने आप पुष्टि होगा",
    },
    en: {
      title: "Enter Verification Code",
      subtitle: "Enter the 6-digit code sent to your phone",
      verify: "Verify",
      verifying: "Verifying...",
      backToPhone: "Back to Phone",
      secureLogin: "Secure Login",
      resendCode: "Resend Code",
      enterDigits: "Enter code",
      autoVerify: "Code will be verified automatically",
    },
  };

  const t = texts[language];

  // Show animation only for existing users
  if (showAnimation && userExists) {
    return (
      <FarmSuccessAnimation
        language={language}
        message={
          language === "np"
            ? "स्वागत पृष्ठमा जाँदै..."
            : "Taking you to dashboard..."
        }
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

          {/* Phone Number Display */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-green-800 text-center">
              <strong>{language === "np" ? "फोन:" : "Phone:"}</strong> +977
              {phoneNumber}
            </p>
          </div>

          {/* OTP Input Grid */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 text-center">
                {t.enterDigits}
              </label>

              {/* 6-digit OTP Grid */}
              <div className="flex justify-center gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className={`w-12 h-14 text-center text-xl font-bold border-2 rounded-lg transition-all duration-200 
                      ${
                        digit
                          ? "border-green-500 bg-green-50 text-green-800"
                          : "border-gray-300 bg-white text-gray-900"
                      } 
                      focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none
                      ${
                        isLoading
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:border-green-400"
                      }
                    `}
                    disabled={isLoading}
                  />
                ))}
              </div>

              {/* Progress indicator */}
              <div className="flex justify-center mt-2">
                <div className="flex gap-1">
                  {otp.map((digit, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        digit ? "bg-green-500" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Back Button */}
            <button
              type="button"
              onClick={onBackToPhone}
              disabled={isLoading}
              className="w-full text-green-600 hover:text-green-700 text-sm font-medium disabled:opacity-50"
            >
              {t.backToPhone}
            </button>

            {/* Auto-submit info */}
            <div className="text-center text-xs text-gray-500">
              {t.autoVerify}
            </div>

            {/* Manual Submit Button (hidden when auto-submitting) */}
            {otp.join("").length === 6 && !isLoading && (
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 animate-fade-in"
              >
                <Shield className="w-5 h-5" />
                {t.verify}
                <ArrowRight className="w-5 h-5" />
              </button>
            )}

            {/* Loading state */}
            {isLoading && (
              <div className="flex items-center justify-center py-3">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-green-600 border-t-transparent mr-3"></div>
                <span className="text-green-600 font-medium">
                  {t.verifying}
                </span>
              </div>
            )}
          </form>

          {/* Resend Code */}
          <div className="text-center mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={onBackToPhone}
              className="text-green-600 hover:text-green-700 text-sm font-medium hover:underline"
            >
              {t.resendCode}
            </button>
          </div>

          {/* Security Badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
            <Shield className="w-4 h-4" />
            <span>{t.secureLogin}</span>
          </div>
        </div>

        {/* Simple illustration */}
        <div className="mt-8 text-center">
          <div className="inline-block bg-white rounded-full p-4 shadow-lg">
            <div className="text-4xl">🔐</div>
          </div>
          <p className="text-green-700 font-medium mt-2 text-sm">
            {language === "np" ? "सुरक्षित पहुँच" : "Secure Access"}
          </p>
        </div>
      </div>
    </div>
  );
}
