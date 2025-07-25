"use client";
import React, { useState } from 'react';
import { Eye, EyeOff, Wheat, User, Mail, Lock, ArrowRight, CheckCircle } from 'lucide-react';

export default function CreateAccountPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '',
    location: '' 
  });
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<'np' | 'en'>('np');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Basic validation
    if (formData.password.length < 6) {
      alert(language === 'np' ? 'पासवर्ड कम्तिमा ६ अक्षरको हुनुपर्छ' : 'Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }
    
    try {
      // Simulate account creation - replace with your Firebase auth
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store user data securely (implement proper JWT token handling)
      const userData = {
        name: formData.name,
        email: formData.email,
        location: formData.location,
        createdAt: new Date().toISOString()
      };
      
      // Don't store password - use secure token storage
      alert(language === 'np' ? 'खाता सफलतापूर्वक बनाइयो!' : 'Account created successfully!');
      // router.push('/Calendar');
    } catch (error: any) {
      alert(language === 'np' ? 'त्रुटि भयो। पुनः प्रयास गर्नुहोस्।' : 'Error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const locations = [
    'काठमाडौं', 'पोखरा', 'चितवन', 'बुटवल', 'धरान', 'जनकपुर',
    'नेपालगञ्ज', 'महेन्द्रनगर', 'इटहरी', 'हेटौंडा'
  ];

  const texts = {
    np: {
      title: 'खाता खोल्नुहोस्',
      subtitle: 'कृषि पात्रोमा सामेल हुनुहोस्',
      name: 'तपाईंको नाम',
      email: 'इमेल ठेगाना',
      password: 'पासवर्ड',
      location: 'तपाईंको स्थान',
      selectLocation: 'स्थान छान्नुहोस्',
      createAccount: 'खाता खोल्नुहोस्',
      creating: 'खाता खोल्दै...',
      haveAccount: 'पहिले नै खाता छ?',
      login: 'लग इन गर्नुहोस्',
      benefits: [
        'मौसम अनुसार बाली सुझाव',
        'बजार मूल्य जानकारी',
        'कृषि सल्लाह सेवा'
      ]
    },
    en: {
      title: 'Create Account',
      subtitle: 'Join KrishiPatro Family',
      name: 'Your Name',
      email: 'Email Address',
      password: 'Password',
      location: 'Your Location',
      selectLocation: 'Select Location',
      createAccount: 'Create Account',
      creating: 'Creating account...',
      haveAccount: 'Already have an account?',
      login: 'Log in',
      benefits: [
        'Seasonal crop suggestions',
        'Market price information',
        'Agricultural advisory services'
      ]
    }
  };

  const t = texts[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50 flex items-center justify-center p-4">
      {/* Language Toggle */}
      <button
        onClick={() => setLanguage(language === 'np' ? 'en' : 'np')}
        className="fixed top-4 right-4 z-50 bg-white shadow-md rounded-full px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-50 transition-colors"
      >
        {language === 'np' ? 'English' : 'नेपाली'}
      </button>

      <div className="w-full max-w-4xl">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Side - Benefits & Branding */}
          <div className="text-center lg:text-left space-y-6">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <div className="bg-green-600 rounded-full p-3">
                <Wheat className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-green-800">
                कृषि पात्रो
              </h1>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {language === 'np' ? 'सरल कृषि समाधान' : 'Simple Farming Solutions'}
            </h2>

            <div className="space-y-3">
              {t.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Simple illustration */}
            <div className="hidden lg:block">
              <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-8 text-center">
                <div className="text-6xl mb-4">🌾</div>
                <p className="text-green-700 font-medium">
                  {language === 'np' ? 'हजारौं किसानको भरोसा' : 'Trusted by thousands of farmers'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-green-800 mb-2">{t.title}</h3>
              <p className="text-gray-600">{t.subtitle}</p>
            </div>

            <div className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {t.name} *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder={language === 'np' ? 'राम बहादुर' : 'Ram Bahadur'}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {t.email} *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="ram@example.com"
                    required
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {t.location} *
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="">{t.selectLocation}</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {t.password} *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    minLength={6}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  {language === 'np' ? 'कम्तिमा ६ अक्षर चाहिन्छ' : 'Minimum 6 characters required'}
                </p>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading || !formData.name || !formData.email || !formData.password || !formData.location}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    {t.creating}
                  </>
                ) : (
                  <>
                    {t.createAccount}
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center mt-6 pt-6 border-t border-gray-200">
              <p className="text-gray-600 text-sm">
                {t.haveAccount}{' '}
                <button className="text-green-600 hover:text-green-700 font-medium hover:underline">
                  {t.login}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
