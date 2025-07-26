"use client";
import React, { useState } from "react";
import { ConfirmationResult } from "firebase/auth";
import { useRouter } from "next/router";
import PhonePage from "./phone";
import OtpPage from "./otpverification";
import NamePage from "./name";

type AuthStep = "phone" | "otp" | "userName";

interface AuthState {
  phoneNumber: string;
  confirmationResult: ConfirmationResult | null;
  user: any;
}

export default function AuthFlowManager() {
  const [currentStep, setCurrentStep] = useState<AuthStep>("phone");
  const [authState, setAuthState] = useState<AuthState>({
    phoneNumber: "",
    confirmationResult: null,
    user: null,
  });
  const router = useRouter();

  const handleCodeSent = (phoneNumber: string, confirmationResult: ConfirmationResult) => {
    setAuthState(prev => ({
      ...prev,
      phoneNumber,
      confirmationResult,
    }));
    setCurrentStep("otp");
  };

  const handleVerificationSuccess = (user: any, userExists: boolean) => {
    setAuthState(prev => ({
      ...prev,
      user,
    }));

    if (userExists) {
      // User exists, redirect to homepage/dashboard
      router.push("/dashboard"); // Change this to your homepage route
    } else {
      // User doesn't exist, show name input
      setCurrentStep("userName");
    }
  };

  const handleBackToPhone = () => {
    setCurrentStep("phone");
    setAuthState({
      phoneNumber: "",
      confirmationResult: null,
      user: null,
    });
  };

  const handleProfileComplete = () => {
    // Profile creation complete, redirect to homepage/dashboard
    router.push("/dashboard"); // Change this to your homepage route
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "phone":
        return <PhonePage onCodeSent={handleCodeSent} />;
      
      case "otp":
        return (
          <OtpPage
            phoneNumber={authState.phoneNumber}
            confirmationResult={authState.confirmationResult!}
            onVerificationSuccess={handleVerificationSuccess}
            onBackToPhone={handleBackToPhone}
          />
        );
      
      case "userName":
        return (
          <NamePage
            user={authState.user}
            onProfileComplete={handleProfileComplete}
          />
        );
      
      default:
        return <PhonePage onCodeSent={handleCodeSent} />;
    }
  };

  return <>{renderCurrentStep()}</>;
}
