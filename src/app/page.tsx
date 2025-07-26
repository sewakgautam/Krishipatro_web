"use client";

import React, { useState, useEffect } from "react";
import {
  Wheat,
  Cloud,
  TrendingUp,
  Calendar,
  Users,
  Mail,
  CheckCircle,
  Globe,
  Clock,
  Sprout,
  Bell,
  Target,
  Droplets,
  Bug,
  Settings,
  ArrowRight,
  Leaf,
  MessageSquare,
  Sun,
  DollarSign,
  Zap,
  Lightbulb,
  Heart,
  Menu,
  X,
  Star,
  Download,
  Play,
  ChevronRight,
  Shield,
  Smartphone,
  BarChart3,
  Headphones,
  Award,
  MapPin,
  Phone,
} from "lucide-react";
import Image from "next/image";

// Header Component
const Header = ({
  language,
  setLanguage,
  t,
}: {
  language: string;
  setLanguage: (lang: "en" | "np") => void;
  t: { tagline: string; appName: string; nav: any };
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-green-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center">
                <div className="flex items-center">
                  {language=='np' ? <Image
                    src={"/mainlogo-np.png"}
                    alt="Description"
                    width={300}
                    height={100}
                    className="rounded-full"
                  /> : <Image
                    src={"/mainlogo.png"}
                    alt="Description"
                    width={300}
                    height={100}
                    className="rounded-full"
                  />}
                  
                </div>
              </div>
            </div>
          
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              {t.nav.features}
            </a>
            <a
              href="#how-it-works"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              {t.nav.howItWorks}
            </a>
            <a
              href="#testimonials"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              {t.nav.testimonials}
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              {t.nav.contact}
            </a>
            <button
              onClick={() => setLanguage(language === "np" ? "en" : "np")}
              className="bg-green-50 hover:bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:shadow-md"
            >
              {language === "np" ? "English" : "नेपाली"}
            </button>
            <button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-2.5 rounded-lg font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5">
              {t.nav.downloadApp}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-4">
              <a
                href="#features"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                {t.nav.features}
              </a>
              <a
                href="#how-it-works"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                {t.nav.howItWorks}
              </a>
              <a
                href="#testimonials"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                {t.nav.testimonials}
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                {t.nav.contact}
              </a>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setLanguage(language === "np" ? "en" : "np")}
                  className="bg-green-50 text-green-700 px-4 py-2 rounded-lg text-sm font-medium flex-1"
                >
                  {language === "np" ? "English" : "नेपाली"}
                </button>
                <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg font-semibold flex-1">
                  {t.nav.downloadApp}
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

// Hero Section Component
const HeroSection = ({ t, language }: { t: any; language: string }) => {
  return (
    <section className="relative bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 py-20 lg:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-emerald-400 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-8 hover:bg-green-200 transition-colors">
              <Zap className="w-4 h-4" />
              {t.hero.badge}
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-green-600 via-green-700 to-emerald-600 bg-clip-text text-transparent">
                {t.hero.title.split(" ")[0]}
              </span>{" "}
              <span className="text-gray-900">
                {t.hero.title.split(" ").slice(1).join(" ")}
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-xl lg:max-w-none">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3">
                <Download className="w-5 h-5" />
                {t.hero.downloadButton}
              </button>
              <button className="bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-200 hover:border-gray-300 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:shadow-lg flex items-center justify-center gap-3">
                <Play className="w-5 h-5" />
                {t.hero.watchDemo}
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              {[
                { number: "10K+", label: t.hero.stats.farmers },
                { number: "50+", label: t.hero.stats.crops },
                { number: "95%", label: t.hero.stats.accuracy },
              ].map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Phone Mockup */}
          <div className="relative max-w-sm mx-auto lg:max-w-md">
            <div className="relative">
              {/* Phone Frame */}
              <div className="bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
                <div className="bg-white rounded-[2.5rem] overflow-hidden">
                  {/* Status Bar */}
                  <div className="bg-gray-900 h-8 flex items-center justify-center">
                    <div className="w-20 h-1 bg-gray-600 rounded-full"></div>
                  </div>

                  {/* App Content */}
                  <div className="p-6 bg-gradient-to-br from-green-50 to-blue-50 min-h-[600px]">
                    {/* App Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center">
                          <Wheat className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">
                            {t.appName}
                          </h3>
                          <p className="text-xs text-gray-600">
                            {language === "np" ? "आजको कार्य" : "Today's Tasks"}
                          </p>
                        </div>
                      </div>
                      <Bell className="w-6 h-6 text-gray-600" />
                    </div>

                    {/* Weather Card */}
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-4 text-white mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Sun className="w-5 h-5" />
                          <span className="font-medium">
                            {language === "np" ? "काठमाडौं" : "Kathmandu"}
                          </span>
                        </div>
                        <span className="text-2xl font-bold">28°C</span>
                      </div>
                      <p className="text-sm opacity-90">
                        {language === "np"
                          ? "धान रोप्नको लागि उत्तम दिन"
                          : "Perfect day for rice planting"}
                      </p>
                    </div>

                    {/* Task Cards */}
                    <div className="space-y-3">
                      {[
                        {
                          icon: Droplets,
                          color: "blue",
                          title:
                            language === "np"
                              ? "पानी हाल्ने समय"
                              : "Watering Time",
                          time: "7:00 AM",
                          status: "pending",
                        },
                        {
                          icon: Sprout,
                          color: "green",
                          title:
                            language === "np" ? "बृद्धि जाँच" : "Growth Check",
                          time: "10:00 AM",
                          status: "completed",
                        },
                        {
                          icon: Bug,
                          color: "orange",
                          title:
                            language === "np"
                              ? "कीट नियन्त्रण"
                              : "Pest Control",
                          time: "5:00 PM",
                          status: "upcoming",
                        },
                      ].map((task, index) => (
                        <div
                          key={index}
                          className={`bg-white rounded-xl p-4 shadow-sm border-l-4 border-${task.color}-500`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 bg-${task.color}-100 rounded-lg flex items-center justify-center`}
                            >
                              <task.icon
                                className={`w-5 h-5 text-${task.color}-600`}
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 text-sm">
                                {task.title}
                              </h4>
                              <p className="text-xs text-gray-600">
                                {task.time}
                              </p>
                            </div>
                            <div
                              className={`w-3 h-3 rounded-full ${
                                task.status === "completed"
                                  ? "bg-green-500"
                                  : task.status === "pending"
                                  ? "bg-yellow-500"
                                  : "bg-gray-300"
                              }`}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Navigation */}
                    <div className="flex justify-center mt-8">
                      <div className="bg-white rounded-full p-1 shadow-lg">
                        <div className="flex gap-1">
                          {[Calendar, BarChart3, Users, Settings].map(
                            (Icon, index) => (
                              <button
                                key={index}
                                className={`p-3 rounded-full ${
                                  index === 0
                                    ? "bg-green-100 text-green-600"
                                    : "text-gray-400"
                                }`}
                              >
                                <Icon className="w-5 h-5" />
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white rounded-full p-3 shadow-xl animate-bounce">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white rounded-full p-3 shadow-xl animate-pulse">
                <Bell className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Features Section Component
const FeaturesSection = ({ t, language }: { t: any; language: string }) => {
  const features = [
    {
      icon: Target,
      title: t.features.personalCalendar.title,
      desc: t.features.personalCalendar.desc,
      color: "green",
      image: "📅",
    },
    {
      icon: Bell,
      title: t.features.smartNotifications.title,
      desc: t.features.smartNotifications.desc,
      color: "blue",
      image: "🔔",
    },
    {
      icon: Sprout,
      title: t.features.harvestIndicator.title,
      desc: t.features.harvestIndicator.desc,
      color: "orange",
      image: "🌱",
    },
    {
      icon: Settings,
      title: t.features.stepGuide.title,
      desc: t.features.stepGuide.desc,
      color: "purple",
      image: "📚",
    },
    {
      icon: Clock,
      title: t.features.reminderService.title,
      desc: t.features.reminderService.desc,
      color: "red",
      image: "⏰",
    },
    {
      icon: BarChart3,
      title: t.features.progressTracking.title,
      desc: t.features.progressTracking.desc,
      color: "indigo",
      image: "📊",
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            {t.features.badge}
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t.features.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.features.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colorClasses = {
              blue: "from-blue-500 to-blue-600 shadow-blue-500/25",
              green: "from-green-500 to-green-600 shadow-green-500/25",
              purple: "from-purple-500 to-purple-600 shadow-purple-500/25",
              orange: "from-orange-500 to-orange-600 shadow-orange-500/25",
              red: "from-red-500 to-red-600 shadow-red-500/25",
              indigo: "from-indigo-500 to-indigo-600 shadow-indigo-500/25",
            };

            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative mb-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${
                      colorClasses[feature.color as keyof typeof colorClasses]
                    } rounded-2xl flex items-center justify-center shadow-xl`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 text-2xl">
                    {feature.image}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                <div className="mt-6 flex items-center text-green-600 font-medium text-sm group-hover:gap-3 gap-2 transition-all">
                  <span>
                    {language === "np" ? "थप जान्नुहोस्" : "Learn More"}
                  </span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// How It Works Section
const HowItWorksSection = ({ t, language }: { t: any; language: string }) => {
  const steps = [
    {
      number: "01",
      title: t.howItWorks.step1.title,
      desc: t.howItWorks.step1.desc,
      icon: Download,
      color: "green",
    },
    {
      number: "02",
      title: t.howItWorks.step2.title,
      desc: t.howItWorks.step2.desc,
      icon: Sprout,
      color: "blue",
    },
    {
      number: "03",
      title: t.howItWorks.step3.title,
      desc: t.howItWorks.step3.desc,
      icon: Bell,
      color: "purple",
    },
    {
      number: "04",
      title: t.howItWorks.step4.title,
      desc: t.howItWorks.step4.desc,
      icon: TrendingUp,
      color: "orange",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-20 bg-gradient-to-br from-gray-50 to-green-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t.howItWorks.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.howItWorks.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const colorClasses = {
              green: "from-green-500 to-green-600 shadow-green-500/25",
              blue: "from-blue-500 to-blue-600 shadow-blue-500/25",
              purple: "from-purple-500 to-purple-600 shadow-purple-500/25",
              orange: "from-orange-500 to-orange-600 shadow-orange-500/25",
            };

            return (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/4 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent transform translate-x-4"></div>
                )}

                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative mb-6">
                    <div
                      className={`w-20 h-20 bg-gradient-to-br ${
                        colorClasses[step.color as keyof typeof colorClasses]
                      } rounded-2xl flex items-center justify-center mx-auto shadow-xl`}
                    >
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-gray-900 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center">
                      {step.number}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = ({ t, language }: { t: any; language: string }) => {
  const testimonials = [
    {
      name: language === "np" ? "रामकृष्ण श्रेष्ठ" : "Ramkrishna Shrestha",
      location: language === "np" ? "धनकुटा" : "Dhankuta",
      image: "👨‍🌾",
      rating: 5,
      text: t.testimonials.testimonial1,
    },
    {
      name: language === "np" ? "सुनिता गुरुङ" : "Sunita Gurung",
      location: language === "np" ? "पोखरा" : "Pokhara",
      image: "👩‍🌾",
      rating: 5,
      text: t.testimonials.testimonial2,
    },
    {
      name: language === "np" ? "दिलबहादुर तामाङ" : "Dilbahadur Tamang",
      location: language === "np" ? "सिन्धुपाल्चोक" : "Sindhupalchok",
      image: "👨‍🌾",
      rating: 5,
      text: t.testimonials.testimonial3,
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            {t.testimonials.badge}
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t.testimonials.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.testimonials.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-2xl shadow-lg">
                  {testimonial.image}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {testimonial.location}
                  </p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                  />
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed italic">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = ({ t, language }: { t: any; language: string }) => {
  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-green-900 to-blue-900 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              {t.contact.title}
            </h2>
            <p className="text-xl mb-8 text-green-100">{t.contact.subtitle}</p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold">{t.contact.phone}</h4>
                  <p className="text-green-200">+977 9804385646</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold">{t.contact.email}</h4>
                  <p className="text-green-200">info@krishipatro.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold">{t.contact.location}</h4>
                  <p className="text-green-200">
                    {language === "np" ? "मोरङ, नेपाल" : "Morang, Nepal"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold mb-6">{t.contact.formTitle}</h3>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t.contact.form.name}
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                  placeholder={t.contact.form.namePlaceholder}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t.contact.form.phone}
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                  placeholder={t.contact.form.phonePlaceholder}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t.contact.form.message}
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent resize-none"
                  placeholder={t.contact.form.messagePlaceholder}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-lg"
              >
                {t.contact.form.submit}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = ({ t, language }: { t: any; language: string }) => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
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
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              {t.footer.description}
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors cursor-pointer">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                <Phone className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer">
                <Mail className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">{t.footer.quickLinks}</h4>
            <div className="space-y-2">
              <a
                href="#features"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                {t.nav.features}
              </a>
              <a
                href="#how-it-works"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                {t.nav.howItWorks}
              </a>
              <a
                href="#testimonials"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                {t.nav.testimonials}
              </a>
              <a
                href="#contact"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                {t.nav.contact}
              </a>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">{t.footer.support}</h4>
            <div className="space-y-2">
              <a
                href="#"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                {t.footer.help}
              </a>
              <a
                href="#"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                {t.footer.privacy}
              </a>
              <a
                href="#"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                {t.footer.terms}
              </a>
              <a
                href="#"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                {t.footer.faq}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} {t.appName}.{" "}
            {language === "np"
              ? "सर्वाधिकार सुरक्षित।"
              : "All rights reserved."}{" "}
            <span className="text-green-400 font-medium">
              {language === "np" ? "नेपालमा बनेको ❤️" : "Made in Nepal ❤️"}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main Component
export default function KrishiPatroWebsite() {
  const [language, setLanguage] = useState<"en" | "np">("np");

  const texts = {
    np: {
      appName: "कृषि पात्रो",
      tagline: "स्मार्ट बाली पात्रो र कृषि सहयोग",
      nav: {
        features: "सुविधाहरू",
        howItWorks: "कसरी काम गर्छ",
        testimonials: "प्रतिक्रिया",
        contact: "सम्पर्क",
        downloadApp: "एप डाउनलोड",
      },
      hero: {
        badge: "अब उपलब्ध",
        title: "कृषि पात्रो स्मार्ट बाली पात्रो",
        subtitle:
          "तपाईंको बालीको सम्पूर्ण जीवनचक्र व्यवस्थापन गर्नुहोस्। बीउ रोप्ने देखि फसल काट्ने सम्म, हरेक चरणमा सही समयमा सही जानकारी पाउनुहोस्।",
        downloadButton: "अहिले डाउनलोड गर्नुहोस्",
        watchDemo: "डेमो हेर्नुहोस्",
        stats: {
          farmers: "किसानहरू",
          crops: "बालीहरू",
          accuracy: "सटीकता",
        },
      },
      features: {
        badge: "मुख्य सुविधाहरू",
        title: "तपाईंको कृषिलाई स्मार्ट बनाउने सुविधाहरू",
        subtitle:
          "आधुनिक प्रविधिको साथ परम्परागत कृषिलाई नयाँ उचाइमा पुर्याउनुहोस्",
        personalCalendar: {
          title: "व्यक्तिगत बाली पात्रो",
          desc: "तपाईंले रोपेको मितिको आधारमा व्यक्तिगत योजना र समयतालिका पाउनुहोस्",
        },
        smartNotifications: {
          title: "स्मार्ट सूचना प्रणाली",
          desc: "सही समयमा पानी, मल, र कीटनाशकको सूचना प्राप्त गर्नुहोस्",
        },
        harvestIndicator: {
          title: "फसल काट्ने सूचक",
          desc: "फसल काट्ने उत्तम समयको सूचना र गुणस्तर जाँचका सुझावहरू",
        },
        stepGuide: {
          title: "चरणबद्ध गाइड",
          desc: "बीउ देखि फसल सम्मको विस्तृत गाइड र उत्तम अभ्यासहरू",
        },
        reminderService: {
          title: "रिमाइन्डर सेवा",
          desc: "महत्वपूर्ण कार्यहरूको समयमै रिमाइन्डर र कार्य व्यवस्थापन",
        },
        progressTracking: {
          title: "प्रगति ट्र्याकिंग",
          desc: "तपाईंको बालीको वृद्धि र प्रगति निरीक्षण गर्नुहोस्",
        },
      },
      howItWorks: {
        title: "कसरी काम गर्छ कृषि पात्रो?",
        subtitle:
          "केवल ४ सजिलो चरणमा आफ्नो कृषि व्यवस्थापनलाई स्मार्ट बनाउनुहोस्",
        step1: {
          title: "एप डाउनलोड गर्नुहोस्",
          desc: "प्ले स्टोर बाट कृषि पात्रो डाउनलोड गरेर खाता खोल्नुहोस्",
        },
        step2: {
          title: "बाली जानकारी राख्नुहोस्",
          desc: "तपाईंको बाली, रोप्ने मिति र क्षेत्रको जानकारी थप्नुहोस्",
        },
        step3: {
          title: "सूचनाहरू प्राप्त गर्नुहोस्",
          desc: "समयमै कार्य सूचनाहरू र सुझावहरू प्राप्त गर्नुहोस्",
        },
        step4: {
          title: "सफल कृषि गर्नुहोस्",
          desc: "वैज्ञानिक विधिले उत्पादकता बढाउनुहोस्",
        },
      },
      testimonials: {
        badge: "किसानहरूको अनुभव",
        title: "हाम्रा सफल किसानहरूको कथा",
        subtitle:
          "हजारौं किसानहरूले कृषि पात्रोको साथ आफ्नो उत्पादकता बढाएका छन्",
        testimonial1:
          "कृषि पात्रोले मेरो धान खेतीमा ठूलो सुधार ल्यायो। अब म सही समयमा सबै काम गर्न सक्छु।",
        testimonial2:
          "यो एपले मलाई मेरो तरकारी खेतीलाई व्यवस्थित गर्न मद्दत गर्यो। उत्पादन धेरै बढ्यो।",
        testimonial3:
          "पहिले म धेरै कुरा बिर्सिन्थे, अब सबै काम समयमै गर्न सक्छु। धन्यवाद कृषि पात्रो!",
      },
      contact: {
        title: "हामीसँग जोडिनुहोस्",
        subtitle: "तपाईंको प्रश्न र सुझावहरू हाम्रो लागि महत्वपूर्ण छन्",
        phone: "फोन नम्बर",
        email: "इमेल ठेगाना",
        location: "स्थान",
        formTitle: "सन्देश पठाउनुहोस्",
        form: {
          name: "तपाईंको नाम",
          namePlaceholder: "पूरा नाम लेख्नुहोस्",
          phone: "फोन नम्बर",
          phonePlaceholder: "तपाईंको फोन नम्बर",
          message: "सन्देश",
          messagePlaceholder: "तपाईंको सन्देश यहाँ लेख्नुहोस्...",
          submit: "सन्देश पठाउनुहोस्",
        },
      },
      footer: {
        description:
          "नेपाली किसानहरूको लागि बनाइएको स्मार्ट कृषि समाधान। आधुनिक प्रविधिसँग परम्परागत कृषिलाई जोड्दै।",
        quickLinks: "छिटो लिंकहरू",
        support: "सहयोग",
        help: "मद्दत केन्द्र",
        privacy: "गोपनीयता नीति",
        terms: "सेवाका शर्तहरू",
        faq: "सामान्य प्रश्नहरू",
      },
    },
    en: {
      appName: "Krishi Patro",
      tagline: "Smart Crop Calendar & Farming Assistant",
      nav: {
        features: "Features",
        howItWorks: "How It Works",
        testimonials: "Testimonials",
        contact: "Contact",
        downloadApp: "Download App",
      },
      hero: {
        badge: "Now Available",
        title: "Krishi Patro Smart Crop Calendar",
        subtitle:
          "Manage your crop's complete lifecycle. Get personalized recommendations based on your planting date, with real-time notifications for watering, fertilizing, pest control, and harvesting.",
        downloadButton: "Download Now",
        watchDemo: "Watch Demo",
        stats: {
          farmers: "Farmers",
          crops: "Crops",
          accuracy: "Accuracy",
        },
      },
      features: {
        badge: "Key Features",
        title: "Features That Make Your Farming Smart",
        subtitle:
          "Elevate traditional farming to new heights with modern technology",
        personalCalendar: {
          title: "Personal Crop Calendar",
          desc: "Get customized plans and schedules based on your planting date and crop type",
        },
        smartNotifications: {
          title: "Smart Notification System",
          desc: "Receive timely alerts for watering, fertilizing, and pest control activities",
        },
        harvestIndicator: {
          title: "Harvest Indicator",
          desc: "Get optimal harvesting time notifications and quality check suggestions",
        },
        stepGuide: {
          title: "Step-by-Step Guide",
          desc: "Detailed guidance from seed to harvest with best practices and techniques",
        },
        reminderService: {
          title: "Reminder Service",
          desc: "Never miss important farming tasks with smart reminders and task management",
        },
        progressTracking: {
          title: "Progress Tracking",
          desc: "Monitor your crop's growth stages and development progress",
        },
      },
      howItWorks: {
        title: "How Does Krishi Patro Work?",
        subtitle: "Make your farm management smart in just 4 easy steps",
        step1: {
          title: "Download the App",
          desc: "Download Krishi Patro from Play Store and create your account",
        },
        step2: {
          title: "Add Crop Information",
          desc: "Add your crop details, planting date, and location information",
        },
        step3: {
          title: "Receive Notifications",
          desc: "Get timely task notifications and expert recommendations",
        },
        step4: {
          title: "Farm Successfully",
          desc: "Increase productivity using scientific methods and guidance",
        },
      },
      testimonials: {
        badge: "Farmer Experiences",
        title: "Stories of Our Successful Farmers",
        subtitle:
          "Thousands of farmers have increased their productivity with Krishi Patro",
        testimonial1:
          "Krishi Patro brought significant improvement to my rice farming. Now I can do all tasks at the right time.",
        testimonial2:
          "This app helped me organize my vegetable farming systematically. Production increased significantly.",
        testimonial3:
          "I used to forget many things before, now I can do all work on time. Thank you Krishi Patro!",
      },
      contact: {
        title: "Get In Touch",
        subtitle: "Your questions and suggestions are important to us",
        phone: "Phone Number",
        email: "Email Address",
        location: "Location",
        formTitle: "Send Message",
        form: {
          name: "Your Name",
          namePlaceholder: "Enter your full name",
          phone: "Phone Number",
          phonePlaceholder: "Your phone number",
          message: "Message",
          messagePlaceholder: "Write your message here...",
          submit: "Send Message",
        },
      },
      footer: {
        description:
          "Smart agricultural solution made for Nepali farmers. Connecting traditional farming with modern technology.",
        quickLinks: "Quick Links",
        support: "Support",
        help: "Help Center",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        faq: "FAQ",
      },
    },
  };

  const t = texts[language];

  return (
    <div className="min-h-screen bg-white">
      <Header language={language} setLanguage={setLanguage} t={t} />
      <HeroSection t={t} language={language} />
      <FeaturesSection t={t} language={language} />
      <HowItWorksSection t={t} language={language} />
      <TestimonialsSection t={t} language={language} />
      <ContactSection t={t} language={language} />
      <Footer t={t} language={language} />
    </div>
  );
}
