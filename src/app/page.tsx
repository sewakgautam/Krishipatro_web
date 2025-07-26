"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Wheat,
  Cloud,
  TrendingUp,
  Calendar,
  Bell,
  Smartphone,
  Bug,
  Users,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  Star,
  Play,
  Download,
  Globe,
  Shield,
  Zap,
  Droplets,
  Sprout,
  Target,
  Settings,
  Clock,
  Leaf,
  MessageSquare,
  Sun,
  DollarSign,
  Lightbulb,
  Heart,
} from "lucide-react";
import Link from 'next/link';
import { useAuth } from '@/pages/contexts/firebaseauthcontext';

export default function HeroPage() {
  const [language, setLanguage] = useState("np");
  const [showMenu, setShowMenu] = useState(false);

  const texts = {
    np: {
      // Header
      appName: "कृषि पात्रो",
      tagline: "स्मार्ट कृषिको लागि आधुनिक समाधान",

      // Hero Section
      heroTitle: "नेपाली किसानहरूको लागि स्मार्ट बाली पात्रो",
      heroSubtitle:
        "तपाईंको बालीको सम्पूर्ण जीवनचक्र व्यवस्थापन गर्नुहोस्। बीउ रोप्ने देखि फसल काट्ने सम्म, हरेक चरणमा सही समयमा सही जानकारी पाउनुहोस्।",
      getStarted: "सुरु गर्नुहोस्",
      watchDemo: "डेमो हेर्नुहोस्",
      downloadApp: "एप डाउनलोड गर्नुहोस्",

      // Features
      featuresTitle: "मुख्य सुविधाहरू",
      featuresSubtitle: "किसानहरूको दैनिक आवश्यकताका लागि सम्पूर्ण समाधान",

      feature1Title: "व्यक्तिगत बाली पात्रो",
      feature1Desc: "तपाईंले रोपेको मितिको आधारमा व्यक्तिगत योजना र सुझावहरू",

      feature2Title: "स्मार्ट सूचना प्रणाली",
      feature2Desc: "सही समयमा पानी, मल, र कीटनाशकको सूचना",

      feature3Title: "बजार मूल्य",
      feature3Desc: "वास्तविक समयको बजार भाउ र मूल्य प्रवृत्ति",

      feature4Title: "मौसम पूर्वानुमान",
      feature4Desc: "सटीक मौसम जानकारी र कृषि उत्पादनका लागि उपयुक्त समय",

      feature5Title: "विशेषज्ञ सल्लाह",
      feature5Desc: "कृषि विशेषज्ञहरूबाट प्राप्त सल्लाह र मार्गदर्शन",

      feature6Title: "सामुदायिक सञ्जाल",
      feature6Desc: "अन्य किसानहरूसँग अनुभव साझा गर्नुहोस्",

      // Why Choose Us
      whyChooseUsTitle: "किन कृषि पात्रो छान्नुहुन्छ?",
      whyChooseUsSubtitle: "हाम्रो एपले तपाईंलाई कृषिमा सफलता प्राप्त गर्न मद्दत गर्नेछ।",

      chooseReason1Title: "पूर्ण नेपाली भाषा समर्थन",
      chooseReason1Desc: "तपाईंको आफ्नै भाषामा सहज पहुँच र प्रयोग गर्नुहोस्।",

      chooseReason2Title: "स्थानीय मौसम र बजार डाटा",
      chooseReason2Desc: "तपाईंको क्षेत्रको लागि सटीक मौसम पूर्वानुमान र बजार मूल्यहरू पाउनुहोस्।",

      chooseReason3Title: "प्रयोग गर्न सजिलो इन्टरफेस",
      chooseReason3Desc: "सरल र सहज डिजाइनले सबै किसानहरूलाई सजिलै प्रयोग गर्न मद्दत गर्छ।",

      chooseReason4Title: "विशेषज्ञ सल्लाह",
      chooseReason4Desc: "कृषि विशेषज्ञहरूबाट समयमै र सही सल्लाह प्राप्त गर्नुहोस्।",

      // Made in Nepal Section
      madeInNepalTitle: "नेपालमा बनेको, नेपालका लागि",
      madeInNepalSubtitle: "नेपाली विकासकर्ताहरूद्वारा नेपाली किसानहरूका लागि विशेष रूपमा डिजाइन गरिएको",

      madeInNepal: "नेपालमा बनेको",
      byNepali: "नेपालीहरूद्वारा निर्मित",
      forNepali: "नेपाली किसानहरूका लागि",

      // Stats
      happyFarmers: "खुशी किसानहरू",
      villages: "गाउँहरू",
      crops: "बालीका प्रकार",
      dailyUsers: "दैनिक प्रयोगकर्ता",

      // Testimonials
      testimonialsTitle: "किसानहरूको अनुभव",

      // CTA
      ctaTitle: "आज नै सुरु गर्नुहोस्",
      ctaSubtitle: "हजारौं किसानहरूको साथमा सामेल हुनुहोस्",
      signUp: "दर्ता गर्नुहोस्",
      login: "लगिन गर्नुहोस्",

      // Footer
      aboutUs: "हाम्रो बारे",
      contact: "सम्पर्क",
      privacy: "गोपनीयता नीति",
      terms: "सर्तहरू",
      support: "सहयोग",
    },
    en: {
      // Header
      appName: "Krishi Patro",
      tagline: "Modern Solutions for Smart Farming",

      // Hero Section
      heroTitle: "Smart Crop Calendar for Nepal's Farmers",
      heroSubtitle:
        "Manage your crop's complete lifecycle. Get personalized recommendations based on your planting date, with real-time notifications for watering, fertilizing, pest control, and harvesting.",
      getStarted: "Get Started",
      watchDemo: "Watch Demo",
      downloadApp: "Download App",

      // Features
      featuresTitle: "Key Features",
      featuresSubtitle: "Complete solutions for farmers' daily needs",

      feature1Title: "Personal Crop Calendar",
      feature1Desc: "Customized plan based on your planting date and crop type",

      feature2Title: "Smart Notification System",
      feature2Desc: "Timely alerts for watering, fertilizing, and pest control",

      feature3Title: "Market Prices",
      feature3Desc: "Real-time market rates and price trends",

      feature4Title: "Weather Forecast",
      feature4Desc: "Accurate weather information and optimal timing for agricultural activities",

      feature5Title: "Expert Advice",
      feature5Desc: "Guidance and recommendations from agricultural experts",

      feature6Title: "Community Network",
      feature6Desc: "Share experiences with other farmers",

      // Why Choose Us
      whyChooseUsTitle: "Why Choose Krishi Patro?",
      whyChooseUsSubtitle: "Our app is designed to empower your farming success.",

      chooseReason1Title: "Full Nepali Language Support",
      chooseReason1Desc: "Access and use the app comfortably in your own language.",

      chooseReason2Title: "Local Weather & Market Data",
      chooseReason2Desc: "Get accurate forecasts and market prices for your region.",

      chooseReason3Title: "Easy to Use Interface",
      chooseReason3Desc: "Simple and intuitive design to assist all farmers.",

      chooseReason4Title: "Expert Advice",
      chooseReason4Desc: "Timely and accurate advice from agriculture experts.",

      // Made in Nepal Section
      madeInNepalTitle: "Made in Nepal, For Nepal",
      madeInNepalSubtitle: "Specially designed by Nepali developers for Nepali farmers",

      madeInNepal: "Made in Nepal",
      byNepali: "By Nepali Developers",
      forNepali: "For Nepali Farmers",

      // Stats
      happyFarmers: "Happy Farmers",
      villages: "Villages",
      crops: "Crop Types",
      dailyUsers: "Daily Users",

      // Testimonials
      testimonialsTitle: "What Farmers Say",

      // CTA
      ctaTitle: "Start Today",
      ctaSubtitle: "Join thousands of farmers",
      signUp: "Sign Up",
      login: "Login",

      // Footer
      aboutUs: "About Us",
      contact: "Contact",
      privacy: "Privacy Policy",
      terms: "Terms",
      support: "Support",
    },
  };

  const t = texts[language];

  const features = [
    {
      icon: Target,
      title: t.feature1Title,
      desc: t.feature1Desc,
      color: "green",
    },
    {
      icon: Bell,
      title: t.feature2Title,
      desc: t.feature2Desc,
      color: "blue",
    },
    {
      icon: TrendingUp,
      title: t.feature3Title,
      desc: t.feature3Desc,
      color: "purple",
    },
    {
      icon: Cloud,
      title: t.feature4Title,
      desc: t.feature4Desc,
      color: "orange",
    },
    {
      icon: Lightbulb,
      title: t.feature5Title,
      desc: t.feature5Desc,
      color: "red",
    },
    {
      icon: Users,
      title: t.feature6Title,
      desc: t.feature6Desc,
      color: "indigo",
    },
  ];

  const whyChooseReasons = [
    {
      icon: MessageSquare,
      title: t.chooseReason1Title,
      desc: t.chooseReason1Desc,
      color: "green",
    },
    {
      icon: Sun,
      title: t.chooseReason2Title,
      desc: t.chooseReason2Desc,
      color: "blue",
    },
    {
      icon: Zap,
      title: t.chooseReason3Title,
      desc: t.chooseReason3Desc,
      color: "purple",
    },
    {
      icon: Lightbulb,
      title: t.chooseReason4Title,
      desc: t.chooseReason4Desc,
      color: "orange",
    },
  ];

  const testimonials = [
    {
      name: language === "np" ? "राम बहादुर" : "Ram Bahadur",
      location: language === "np" ? "काठमाडौं" : "Kathmandu",
      text:
        language === "np"
          ? "कृषि पात्रोले मेरो खेतीलाई धेरै सहज बनायो। अब म सही समयमा काम गर्न सक्छु।"
          : "Krishi Patro made my farming much easier. Now I can work at the right time.",
      rating: 5,
    },
    {
      name: language === "np" ? "सुनिता देवी" : "Sunita Devi",
      location: language === "np" ? "पोखरा" : "Pokhara",
      text:
        language === "np"
          ? "यो एपले मलाई बजार मूल्य र मौसम दुवै जानकारी दिन्छ। धेरै उपयोगी छ।"
          : "This app gives me both market prices and weather information. Very useful.",
      rating: 5,
    },
    {
      name: language === "np" ? "हरि प्रसाद" : "Hari Prasad",
      location: language === "np" ? "चितवन" : "Chitwan",
      text:
        language === "np"
          ? "विशेषज्ञहरूको सल्लाहले मेरो बालीको उत्पादन बढ्यो।"
          : "Expert advice helped increase my crop production.",
      rating: 5,
    },
  ];

  const { user, userData, loading } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Image
                src={"/mainlogo.png"}
                alt="Krishi Patro"
                width={200}
                height={40}
                className="rounded-full"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-gray-700 hover:text-green-600 transition-colors"
              >
                {language === "np" ? "सुविधाहरू" : "Features"}
              </a>
              <a
                href="#why-choose"
                className="text-gray-700 hover:text-green-600 transition-colors"
              >
                {language === "np" ? "किन छान्नुहोस्" : "Why Choose"}
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-green-600 transition-colors"
              >
                {t.aboutUs}
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-green-600 transition-colors"
              >
                {t.contact}
              </a>
            </nav>

            {/* Right side controls */}
            <div className="flex items-center gap-3">
              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === "np" ? "en" : "np")}
                className="bg-green-50 hover:bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-medium transition-colors"
              >
                {language === "np" ? "En" : "ने"}
              </button>

              {/* Desktop Auth Buttons */}
              <div className="hidden md:flex items-center gap-2">
                <Link 
                  href='/login' 
                  className="text-green-600 border border-green-600 hover:bg-green-50 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {t.login}
                </Link>
                <Link 
                  href='/signup' 
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {t.signUp}
                </Link>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="md:hidden p-2 hover:bg-green-50 rounded-lg transition-colors"
              >
                {showMenu ? (
                  <X className="w-5 h-5 text-green-700" />
                ) : (
                  <Menu className="w-5 h-5 text-green-700" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMenu && (
            <div className="md:hidden pb-4 border-t border-green-100 pt-4">
              <div className="flex flex-col gap-3">
                <a
                  href="#features"
                  className="py-2 text-gray-700 hover:text-green-600"
                  onClick={() => setShowMenu(false)}
                >
                  {language === "np" ? "सुविधाहरू" : "Features"}
                </a>
                <a
                  href="#why-choose"
                  className="py-2 text-gray-700 hover:text-green-600"
                  onClick={() => setShowMenu(false)}
                >
                  {language === "np" ? "किन छान्नुहोस्" : "Why Choose"}
                </a>
                <a
                  href="#about"
                  className="py-2 text-gray-700 hover:text-green-600"
                  onClick={() => setShowMenu(false)}
                >
                  {t.aboutUs}
                </a>
                <a
                  href="#contact"
                  className="py-2 text-gray-700 hover:text-green-600"
                  onClick={() => setShowMenu(false)}
                >
                  {t.contact}
                </a>
                <div className="flex gap-2 pt-2 border-t border-green-100 mt-2">
                  <Link 
                    href='/login' 
                    className="flex-1 text-center text-green-600 border border-green-600 px-4 py-2 rounded-lg font-medium"
                  >
                    {t.login}
                  </Link>
                  
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-blue-50 to-green-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <CheckCircle className="w-4 h-4" />
                {language === "np" ? "अब उपलब्ध छ" : "Now Available"}
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {t.heroTitle}
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {t.heroSubtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  href='/signup' 
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center gap-2"
                >
                  {t.getStarted}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  {t.downloadApp}
                </button>
              </div>
            </div>

            {/* Right Content - Enhanced App Preview */}
            <div className="relative max-md mx-md">
              <div className="bg-white rounded-3xl shadow-2xl p-6 border">
                {/* App Header */}
                <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-4 text-white mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Wheat className="w-5 h-5" />
                      <span className="font-semibold">{t.appName}</span>
                    </div>
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div className="text-sm opacity-90">
                    {language === "np" ? "आजको कार्य सूची" : "Today's Tasks"}
                  </div>
                </div>

                {/* Task List */}
                <div className="space-y-3">
                  {[
                    {
                      icon: Droplets,
                      color: "blue",
                      title: language === "np" ? "पानी हाल्ने समय" : "Watering Time",
                      desc: language === "np" ? "बिहान ७ बजे - धान खेतमा" : "7 AM - Rice field",
                      status: "pending"
                    },
                    {
                      icon: Bug,
                      color: "orange",
                      title: language === "np" ? "कीटनाशक छर्कने" : "Pesticide Spray",
                      desc: language === "np" ? "साँझ ५ बजे पछि" : "After 5 PM",
                      status: "completed"
                    },
                    {
                      icon: Sprout,
                      color: "purple",
                      title: language === "np" ? "बृद्धि जाँच" : "Growth Check",
                      desc: language === "np" ? "बोटको उचाई नाप्नुहोस्" : "Measure plant height",
                      status: "upcoming"
                    },
                  ].map((task, index) => (
                    <div
                      key={index}
                      className={`bg-${task.color}-50 rounded-lg p-3 flex items-center gap-3 relative`}
                    >
                      <task.icon className={`w-6 h-6 text-${task.color}-600`} />
                      <div className="text-left text-black flex-1">
                        <div className="font-medium text-sm">{task.title}</div>
                        <div className="text-xs text-gray-600">{task.desc}</div>
                      </div>
                      {task.status === "completed" && (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Quick Stats */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-lg font-bold text-green-600">15</div>
                      <div className="text-xs text-gray-600">
                        {language === "np" ? "दिन बाँकी" : "Days Left"}
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-blue-600">85%</div>
                      <div className="text-xs text-gray-600">
                        {language === "np" ? "वृद्धि" : "Growth"}
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-purple-600">₹45</div>
                      <div className="text-xs text-gray-600">
                        {language === "np" ? "बजार भाउ" : "Market Price"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-green-600 mb-2">12,000+</div>
              <div className="text-gray-600">{t.happyFarmers}</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">{t.villages}</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-purple-600 mb-2">75+</div>
              <div className="text-gray-600">{t.crops}</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-orange-600 mb-2">8,500+</div>
              <div className="text-gray-600">{t.dailyUsers}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t.featuresTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.featuresSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const colorClasses = {
                blue: "text-blue-600 bg-blue-100 border-blue-200",
                green: "text-green-600 bg-green-100 border-green-200",
                purple: "text-purple-600 bg-purple-100 border-purple-200",
                orange: "text-orange-600 bg-orange-100 border-orange-200",
                red: "text-red-600 bg-red-100 border-red-200",
                indigo: "text-indigo-600 bg-indigo-100 border-indigo-200",
              };

              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className={`w-12 h-12 rounded-lg ${
                      colorClasses[feature.color]
                    } border flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t.whyChooseUsTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t.whyChooseUsSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseReasons.map((reason, index) => {
              const Icon = reason.icon;
              const colorClasses = {
                blue: "text-blue-600 bg-blue-100 border-blue-200",
                green: "text-green-600 bg-green-100 border-green-200",
                purple: "text-purple-600 bg-purple-100 border-purple-200",
                orange: "text-orange-600 bg-orange-100 border-orange-200",
              };

              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className={`w-12 h-12 rounded-lg ${colorClasses[reason.color]} border flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {reason.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

            {/* Made in Nepal Section */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t.madeInNepalTitle}
          </h2>
          <p className="text-lg text-gray-600 mb-6">{t.madeInNepalSubtitle}</p>
          <div className="flex justify-center gap-6 flex-wrap text-green-700 font-medium">
            <span className="bg-white border border-green-100 px-6 py-3 rounded-full shadow-sm">
              {t.madeInNepal}
            </span>
            <span className="bg-white border border-green-100 px-6 py-3 rounded-full shadow-sm">
              {t.byNepali}
            </span>
            <span className="bg-white border border-green-100 px-6 py-3 rounded-full shadow-sm">
              {t.forNepali}
            </span>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl lg:text-4xl font-bold text-gray-900 mb-12">
            {t.testimonialsTitle}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition"
              >
                <div className="text-sm text-gray-600 mb-4">
                  “{testimonial.text}”
                </div>
                <div className="text-green-700 font-semibold text-sm">
                  {testimonial.name}
                </div>
                <div className="text-xs text-gray-500">{testimonial.location}</div>
                <div className="flex mt-2 gap-1 text-yellow-500">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t.ctaTitle}</h2>
          <p className="text-lg mb-6">{t.ctaSubtitle}</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/signup"
              className="bg-white text-green-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              {t.signUp}
            </Link>
            <Link
              href="/login"
              className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-green-700 transition"
            >
              {t.login}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-gray-700">
          <div>
            <h4 className="text-lg font-semibold mb-2">{t.aboutUs}</h4>
            <p className="text-sm leading-relaxed">
              {language === "np"
                ? "कृषि पात्रो एउटा डिजिटल उपकरण हो जसले नेपाली किसानहरूलाई स्मार्ट खेती गर्न मद्दत गर्छ।"
                : "Krishi Patro is a digital tool helping Nepali farmers practice smart farming."}
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">{t.contact}</h4>
            <ul className="text-sm space-y-1">
              <li>Email: hello@krishipatro.com</li>
              <li>Phone: +977-9800000000</li>
              <li>Address: Kathmandu, Nepal</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">{t.support}</h4>
            <ul className="text-sm space-y-1">
              <li>
                <Link href="/privacy" className="hover:text-green-600">{t.privacy}</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-green-600">{t.terms}</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-green-600">
                  {language === "np" ? "प्रश्नोत्तर" : "FAQs"}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">
              {language === "np" ? "सामाजिक सञ्जाल" : "Follow Us"}
            </h4>
            <ul className="text-sm space-y-1">
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-600">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-600">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-600">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Krishi Patro. All rights reserved.
        </div>
      </footer>
    </div>
  );
}


