"use client";
import React, { useState } from "react";
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
} from "lucide-react";

export default function HeroPage() {
  const [language, setLanguage] = useState<"np" | "en">("np");
  const [showMenu, setShowMenu] = useState(false);

  const texts = {
    np: {
      // Header
      appName: "कृषि पात्रो",
      tagline: "स्मार्ट कृषिको लागि आधुनिक समाधान",

      // Hero Section
      heroTitle: "नेपालका किसानहरूको लागि डिजिटल साथी",
      heroSubtitle:
        "मौसम, बजार मूल्य, र कृषि सल्लाह एकै ठाउँमा। आफ्नो खेतीलाई अझ फलदायी बनाउनुहोस्।",
      getStarted: "सुरु गर्नुहोस्",
      watchDemo: "डेमो हेर्नुहोस्",

      // Features
      featuresTitle: "मुख्य सुविधाहरू",
      featuresSubtitle: "किसानहरूको दैनिक आवश्यकताका लागि सम्पूर्ण समाधान",

      feature1Title: "मौसम पूर्वानुमान",
      feature1Desc: "सटीक मौसम जानकारी र कृषि उत्पादनका लागि उपयुक्त समय",

      feature2Title: "बजार मूल्य",
      feature2Desc: "वास्तविक समयको बजार भाउ र मूल्य प्रवृत्ति",

      feature3Title: "कृषि पात्रो",
      feature3Desc: "रोप्ने, काट्ने र अन्य कृषि कार्यहरूको उत्तम समय",

      feature4Title: "विशेषज्ञ सल्लाह",
      feature4Desc: "कृषि विशेषज्ञहरूबाट प्राप्त सल्लाह र मार्गदर्शन",

      feature5Title: "कार्य व्यवस्थापन",
      feature5Desc: "दैनिक कृषि कार्यहरूको योजना र अनुगमन",

      feature6Title: "सामुदायिक सञ्जाल",
      feature6Desc: "अन्य किसानहरूसँग अनुभव साझा गर्नुहोस्",

      // Stats
      happyFarmers: "खुशी किसानहरू",
      villages: "गाउँहरू",
      crops: "बालीका प्रकार",

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
    },
    en: {
      // Header
      appName: "Krishi Patro",
      tagline: "Modern Solutions for Smart Farming",

      // Hero Section
      heroTitle: "Digital Companion for Nepal's Farmers",
      heroSubtitle:
        "Weather, market prices, and agricultural advice in one place. Make your farming more productive.",
      getStarted: "Get Started",
      watchDemo: "Watch Demo",

      // Features
      featuresTitle: "Key Features",
      featuresSubtitle: "Complete solutions for farmers' daily needs",

      feature1Title: "Weather Forecast",
      feature1Desc:
        "Accurate weather information and optimal timing for agricultural activities",

      feature2Title: "Market Prices",
      feature2Desc: "Real-time market rates and price trends",

      feature3Title: "Agricultural Calendar",
      feature3Desc:
        "Best times for planting, harvesting, and other farming activities",

      feature4Title: "Expert Advice",
      feature4Desc: "Guidance and recommendations from agricultural experts",

      feature5Title: "Task Management",
      feature5Desc: "Plan and monitor your daily farming activities",

      feature6Title: "Community Network",
      feature6Desc: "Share experiences with other farmers",

      // Stats
      happyFarmers: "Happy Farmers",
      villages: "Villages",
      crops: "Crop Types",

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
    },
  };

  const t = texts[language];

  const features = [
    {
      icon: Cloud,
      title: t.feature1Title,
      desc: t.feature1Desc,
      color: "blue",
    },
    {
      icon: TrendingUp,
      title: t.feature2Title,
      desc: t.feature2Desc,
      color: "green",
    },
    {
      icon: Calendar,
      title: t.feature3Title,
      desc: t.feature3Desc,
      color: "purple",
    },
    {
      icon: Wheat,
      title: t.feature4Title,
      desc: t.feature4Desc,
      color: "orange",
    },
    {
      icon: Bell,
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

  const testimonials = [
    {
      name: language === "np" ? "राम बहादुर" : "Ram Bahadur",
      location: language === "np" ? "काठमाडौं" : "Kathmandu",
      text:
        language === "np"
          ? "यो एपले मेरो खेतीलाई धेरै सहज बनायो। मौसम र बजार भाउ सबै एकै ठाउँमा पाइन्छ।"
          : "This app made my farming much easier. Weather and market prices are all available in one place.",
      rating: 5,
    },
    {
      name: language === "np" ? "सुनिता देवी" : "Sunita Devi",
      location: language === "np" ? "पोखरा" : "Pokhara",
      text:
        language === "np"
          ? "विशेषज्ञहरूको सल्लाहले मेरो बालीको उत्पादन बढ्यो।"
          : "Expert advice helped increase my crop production.",
      rating: 5,
    },
    {
      name: language === "np" ? "हरि प्रसाद" : "Hari Prasad",
      location: language === "np" ? "चितवन" : "Chitwan",
      text:
        language === "np"
          ? "कृषि पात्रोले मलाई सही समयमा काम गर्न मद्दत गर्छ।"
          : "Krishi Patro helps me work at the right time.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="bg-green-600 rounded-full p-2">
                <Wheat className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-green-800">
                  {t.appName}
                </h1>
                <p className="text-xs text-green-600 hidden sm:block">
                  {t.tagline}
                </p>
              </div>
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
                <button className="text-green-600 hover:text-green-700 px-4 py-2 font-medium transition-colors">
                  {t.login}
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  {t.signUp}
                </button>
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
                >
                  {language === "np" ? "सुविधाहरू" : "Features"}
                </a>
                <a
                  href="#about"
                  className="py-2 text-gray-700 hover:text-green-600"
                >
                  {t.aboutUs}
                </a>
                <a
                  href="#contact"
                  className="py-2 text-gray-700 hover:text-green-600"
                >
                  {t.contact}
                </a>
                <div className="flex gap-2 pt-2 border-t border-green-100 mt-2">
                  <button className="flex-1 text-green-600 border border-green-600 px-4 py-2 rounded-lg font-medium">
                    {t.login}
                  </button>
                  <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-medium">
                    {t.signUp}
                  </button>
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
              <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {t.heroTitle}
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {t.heroSubtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center gap-2">
                  {t.getStarted}
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center gap-2">
                  <Play className="w-5 h-5" />
                  {t.watchDemo}
                </button>
              </div>
            </div>

            {/* Right Content - Mock App Preview */}
            <div className="relative max-w-md">
              <div className="bg-white rounded-3xl shadow-2xl p-6 border">
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

                <div className="space-y-3">
                  {[
                    {
                      icon: Droplets,
                      color: "blue",
                      title:
                        language === "np" ? "पानी हाल्ने समय" : "Watering Time",
                      desc:
                        language === "np"
                          ? "बिहान ७ बजे - धान खेतमा"
                          : "7 AM - Rice field",
                    },
                    {
                      icon: Bug,
                      color: "orange",
                      title:
                        language === "np"
                          ? "कीटनाशक छर्कने"
                          : "Pesticide Spray",
                      desc: language === "np" ? "साँझ ५ बजे पछि" : "After 5 PM",
                    },
                    {
                      icon: Sprout,
                      color: "purple",
                      title: language === "np" ? "बृद्धि जाँच" : "Growth Check",
                      desc:
                        language === "np"
                          ? "बोटको उचाई नाप्नुहोस्"
                          : "Measure plant height",
                    },
                  ].map((task, index) => (
                    <div
                      key={index}
                      className={`bg-${task.color}-50 rounded-lg p-3 flex items-center gap-3`}
                    >
                      <task.icon className={`w-6 h-6 text-${task.color}-600`} />
                      <div className="text-left text-black">
                        <div className="font-medium text-sm">{task.title}</div>
                        <div className="text-xs text-gray-600">{task.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">
                5000+
              </div>
              <div className="text-gray-600">{t.happyFarmers}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">200+</div>
              <div className="text-gray-600">{t.villages}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600">{t.crops}</div>
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
                blue: "text-blue-600 bg-blue-100",
                green: "text-green-600 bg-green-100",
                purple: "text-purple-600 bg-purple-100",
                orange: "text-orange-600 bg-orange-100",
                red: "text-red-600 bg-red-100",
                indigo: "text-indigo-600 bg-indigo-100",
              };

              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div
                    className={`w-12 h-12 rounded-lg ${
                      colorClasses[feature.color as keyof typeof colorClasses]
                    } flex items-center justify-center mb-4`}
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

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t.testimonialsTitle}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 border border-gray-100"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t.ctaTitle}</h2>
          <p className="text-xl mb-8 opacity-90">{t.ctaSubtitle}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-colors">
              {t.signUp}
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-xl font-semibold text-lg transition-colors">
              {t.login}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Logo Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-600 rounded-full p-2">
                  <Wheat className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">{t.appName}</span>
              </div>
              <p className="text-gray-400">{t.tagline}</p>
            </div>

            {/* Links */}
            <div>
              <h3 className="font-semibold mb-4">
                {language === "np" ? "लिंकहरू" : "Links"}
              </h3>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  {t.aboutUs}
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  {t.contact}
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  {language === "np" ? "सुविधाहरू" : "Features"}
                </a>
              </div>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold mb-4">
                {language === "np" ? "कानुनी" : "Legal"}
              </h3>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  {t.privacy}
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  {t.terms}
                </a>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4">{t.contact}</h3>
              <div className="space-y-2 text-gray-400">
                <p>📧 info@krishipatro.com</p>
                <p>📞 +977-1-234567</p>
                <p>
                  📍{" "}
                  {language === "np" ? "काठमाडौं, नेपाल" : "Kathmandu, Nepal"}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; 2025 {t.appName}.{" "}
              {language === "np"
                ? "सर्वाधिकार सुरक्षित।"
                : "All rights reserved."}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
