"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Eye,
  EyeOff,
  Wheat,
  Phone,
  Lock,
  ArrowRight,
  Shield,
  User,
} from "lucide-react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  ConfirmationResult,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../../firebaseauth";

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
    recaptchaWidgetId?: number;
    confirmationResult?: ConfirmationResult;
  }
}

export default function LoginPage() {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    verificationCode: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<"np" | "en">("np");
  const [step, setStep] = useState<"details" | "code">("details"); // Two-step process
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [recaptchaInitialized, setRecaptchaInitialized] = useState(false);
  const recaptchaRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const initializeRecaptcha = () => {
    if (window.recaptchaVerifier || !recaptchaRef.current) {
      return;
    }

    try {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, recaptchaRef.current, {
        size: 'normal',
        callback: (response: any) => {
          console.log("reCAPTCHA solved");
          setRecaptchaInitialized(true);
        },
        'expired-callback': () => {
          console.log("reCAPTCHA expired");
          setRecaptchaInitialized(false);
        }
      });

      // Render the reCAPTCHA
      window.recaptchaVerifier.render().then((widgetId) => {
        console.log("reCAPTCHA rendered with widget ID:", widgetId);
        setRecaptchaInitialized(true);
      }).catch((error) => {
        console.error("Error rendering reCAPTCHA:", error);
        setRecaptchaInitialized(false);
      });

    } catch (error) {
      console.error("Error initializing reCAPTCHA:", error);
      setRecaptchaInitialized(false);
    }
  };

  const clearRecaptcha = () => {
    if (window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear();
        delete window.recaptchaVerifier;
        setRecaptchaInitialized(false);
      } catch (error) {
        console.error("Error clearing reCAPTCHA:", error);
      }
    }
  };

  useEffect(() => {
    // Initialize reCAPTCHA when component mounts and we're on the details step
    if (step === "details" && !recaptchaInitialized) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        initializeRecaptcha();
      }, 100);

      return () => clearTimeout(timer);
    }

    // Cleanup function
    return () => {
      if (step !== "details") {
        clearRecaptcha();
      }
    };
  }, [step, recaptchaInitialized]);

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (!formData.phoneNumber || !formData.name) {
      alert(
        language === "np" 
          ? "सबै फिल्ड भर्नुहोस्" 
          : "Please fill all fields"
      );
      setIsLoading(false);
      return;
    }

    if (!recaptchaInitialized || !window.recaptchaVerifier) {
      alert(
        language === "np" 
          ? "reCAPTCHA पूरा गर्नुहोस्" 
          : "Please complete the reCAPTCHA"
      );
      setIsLoading(false);
      return;
    }

    // Format phone number (add +977 for Nepal if not present)
    let phoneNumber = formData.phoneNumber.trim();
    if (!phoneNumber.startsWith('+')) {
      phoneNumber = '+977' + phoneNumber;
    }

    try {
      const result = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
      setConfirmationResult(result);
      window.confirmationResult = result;
      setStep("code");
      
      alert(
        language === "np" 
          ? "कोड पठाइयो। आफ्नो फोनमा चेक गर्नुहोस्।" 
          : "Code sent! Check your phone."
      );
    } catch (error: any) {
      console.error("Error sending code:", error);
      
      let errorMessage = language === "np"
        ? "कोड पठाउन सकिएन। पुनः प्रयास गर्नुहोस्।"
        : "Failed to send code. Please try again.";

      // Handle specific Firebase errors
      if (error.code === 'auth/invalid-phone-number') {
        errorMessage = language === "np"
          ? "गलत फोन नम्बर ढाँचा।"
          : "Invalid phone number format.";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = language === "np"
          ? "धेरै प्रयासहरू। केहि समय पछि प्रयास गर्नुहोस्।"
          : "Too many attempts. Please try again later.";
      }
      
      alert(errorMessage);
      
      // Reset reCAPTCHA on error
      clearRecaptcha();
      // Reinitialize after a short delay
      setTimeout(() => {
        initializeRecaptcha();
      }, 1000);
      
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.verificationCode || !confirmationResult) {
      alert(
        language === "np" ? "कोड भर्नुहोस्" : "Please enter the verification code"
      );
      setIsLoading(false);
      return;
    }

    try {
      const result = await confirmationResult.confirm(formData.verificationCode);
      const user = result.user;
      
      // Update user profile with the name
      try {
        await updateProfile(user, {
          displayName: formData.name,
        });
        console.log("User profile updated with name:", formData.name);
      } catch (profileError) {
        console.error("Error updating profile:", profileError);
        // Don't fail the login if profile update fails
      }
      
      console.log("User signed in:", user);
      console.log("User display name:", user.displayName);
      console.log("User phone number:", user.phoneNumber);
      
      alert(
        language === "np" 
          ? `स्वागत छ, ${formData.name}! सफलतापूर्वक लग इन भयो!` 
          : `Welcome, ${formData.name}! Login successful!`
      );
      
      // Here you can also save additional user data to Firestore if needed
      // Example:
      // await setDoc(doc(db, "users", user.uid), {
      //   name: formData.name,
      //   phoneNumber: user.phoneNumber,
      //   createdAt: new Date(),
      // });
      
      // Redirect to home or dashboard
      // router.push('/home');
      
    } catch (error: any) {
      console.error("Error verifying code:", error);
      
      let errorMessage = language === "np"
        ? "गलत कोड। पुनः प्रयास गर्नुहोस्।"
        : "Invalid code. Please try again.";

      if (error.code === 'auth/invalid-verification-code') {
        errorMessage = language === "np"
          ? "गलत पुष्टिकरण कोड।"
          : "Invalid verification code.";
      } else if (error.code === 'auth/code-expired') {
        errorMessage = language === "np"
          ? "कोडको समय सकिएको छ। नयाँ कोड माग्नुहोस्।"
          : "Code expired. Please request a new code.";
      }
      
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToDetails = () => {
    setStep("details");
    setFormData(prev => ({ ...prev, verificationCode: "" }));
    setConfirmationResult(null);
    // Reinitialize reCAPTCHA
    setTimeout(() => {
      initializeRecaptcha();
    }, 100);
  };

  const texts = {
    np: {
      title: step === "details" ? "विवरण भर्नुहोस्" : "कोड भर्नुहोस्",
      subtitle: step === "details" ? "आफ्नो नाम र फोन नम्बर भर्नुहोस्" : "SMS मा आएको कोड भर्नुहोस्",
      name: "पूरा नाम",
      phoneNumber: "फोन नम्बर",
      verificationCode: "पुष्टिकरण कोड",
      sendCode: "कोड पठाउनुहोस्",
      verify: "पुष्टि गर्नुहोस्",
      sending: "पठाउँदै...",
      verifying: "पुष्टि गर्दै...",
      noAccount: "खाता छैन?",
      createAccount: "खाता खोल्नुहोस्",
      backToDetails: "फिर्ता जानुहोस्",
      welcome: "स्वागत छ",
      secureLogin: "सुरक्षित लग इन",
      resendCode: "कोड पुनः पठाउनुहोस्",
      completeCaptcha: "reCAPTCHA पूरा गर्नुहोस्",
    },
    en: {
      title: step === "details" ? "Enter Details" : "Enter Code",
      subtitle: step === "details" ? "Enter your name and phone number" : "Enter the code sent to your phone",
      name: "Full Name",
      phoneNumber: "Phone Number",
      verificationCode: "Verification Code",
      sendCode: "Send Code",
      verify: "Verify",
      sending: "Sending...",
      verifying: "Verifying...",
      noAccount: "No account?",
      createAccount: "Create Account",
      backToDetails: "Back to Details",
      welcome: "Welcome",
      secureLogin: "Secure Login",
      resendCode: "Resend Code",
      completeCaptcha: "Complete reCAPTCHA",
    },
  };

  const t = texts[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50 flex items-center justify-center p-4">
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

          {/* Form */}
          <div className="space-y-6">
            {step === "details" ? (
              // Details Step (Name + Phone Number)
              <>
                {/* Name Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {t.name}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-base text-black"
                      placeholder={language === "np" ? "राम बहादुर" : "John Doe"}
                      required
                    />
                  </div>
                </div>

                {/* Phone Number Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {t.phoneNumber}
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
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

                {/* reCAPTCHA */}
                <div className="flex justify-center">
                  <div ref={recaptchaRef} id="recaptcha-container"></div>
                </div>

                {!recaptchaInitialized && (
                  <div className="text-center text-sm text-orange-600">
                    {t.completeCaptcha}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || !formData.phoneNumber || !formData.name || !recaptchaInitialized}
                  onClick={handleDetailsSubmit}
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
              </>
            ) : (
              // Verification Code Step
              <>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-green-800">
                    <strong>{language === "np" ? "नाम:" : "Name:"}</strong> {formData.name}
                  </p>
                  <p className="text-sm text-green-800">
                    <strong>{language === "np" ? "फोन:" : "Phone:"}</strong> +977{formData.phoneNumber}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {t.verificationCode}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      name="verificationCode"
                      type="text"
                      value={formData.verificationCode}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-center text-2xl tracking-widest text-black"
                      placeholder="123456"
                      maxLength={6}
                      required
                    />
                  </div>
                </div>

                {/* Back Button */}
                <button
                  type="button"
                  onClick={handleBackToDetails}
                  className="w-full text-green-600 hover:text-green-700 text-sm font-medium"
                >
                  {t.backToDetails}
                </button>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || !formData.verificationCode}
                  onClick={handleCodeSubmit}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-base"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      {t.verifying}
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5" />
                      {t.verify}
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </>
            )}
          </div>

          {/* Create Account Link */}
          <div className="text-center mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              {t.noAccount}{" "}
              <button className="text-green-600 hover:text-green-700 font-medium hover:underline">
                {t.createAccount}
              </button>
            </p>
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
