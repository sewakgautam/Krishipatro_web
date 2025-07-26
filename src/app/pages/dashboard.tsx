"use client";
import React, { useState } from 'react';
import { 
  Calendar, 
  Cloud, 
  Wheat, 
  TrendingUp, 
  Bell, 
  User, 
  Sun,
  CloudRain,
  Thermometer,
  DollarSign,
  Sprout,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Settings,
  Menu,
  X
} from 'lucide-react';

export default function HomePage() {
  const [language, setLanguage] = useState<'np' | 'en'>('np');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showMenu, setShowMenu] = useState(false);

  // Get today's date in Nepali format
  const nepaliDate = new Intl.DateTimeFormat('ne-NP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(selectedDate);

  const englishDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(selectedDate);

  const texts = {
    np: {
      greeting: 'नमस्कार, राम जी',
      todaysDate: 'आजको मिति',
      weather: 'मौसम',
      temperature: 'तापक्रम',
      humidity: 'आर्द्रता',
      rainfall: 'वर्षा',
      marketPrices: 'बजार मूल्य',
      todaysTasks: 'आजका काम',
      cropAdvice: 'बाली सल्लाह',
      noTasks: 'आज कुनै काम छैन',
      viewAll: 'सबै हेर्नुहोस्',
      degrees: '°से',
      rs: 'रु.',
      perKg: '/के.जी.',
      clear: 'सफा',
      location: 'काठमाडौं'
    },
    en: {
      greeting: 'Hello, Ram ji',
      todaysDate: "Today's Date",
      weather: 'Weather',
      temperature: 'Temperature',
      humidity: 'Humidity',
      rainfall: 'Rainfall',
      marketPrices: 'Market Prices',
      todaysTasks: "Today's Tasks",
      cropAdvice: 'Crop Advice',
      noTasks: 'No tasks for today',
      viewAll: 'View All',
      degrees: '°C',
      rs: 'Rs.',
      perKg: '/kg',
      clear: 'Clear',
      location: 'Kathmandu'
    }
  };

  const t = texts[language];

  // Sample data
  const weatherData = {
    temp: 24,
    humidity: 65,
    condition: t.clear,
    icon: Sun
  };

  const marketPrices = [
    { crop: language === 'np' ? 'धान' : 'Rice', price: 45, change: '+2' },
    { crop: language === 'np' ? 'मकै' : 'Maize', price: 32, change: '-1' },
    { crop: language === 'np' ? 'गहुँ' : 'Wheat', price: 38, change: '+1' }
  ];

  const todaysTasks = [
    {
      id: 1,
      task: language === 'np' ? 'बीउ रोप्ने' : 'Plant seeds',
      time: language === 'np' ? 'बिहान ६ बजे' : '6:00 AM',
      priority: 'high'
    },
    {
      id: 2,
      task: language === 'np' ? 'पानी हाल्ने' : 'Water plants',
      time: language === 'np' ? 'साँझ ५ बजे' : '5:00 PM',
      priority: 'medium'
    }
  ];

  const cropAdvice = {
    title: language === 'np' ? 'यो महिनाको सल्लाह' : 'This Month\'s Advice',
    content: language === 'np' 
      ? 'धान बाली रोप्न उत्तम समय। मिट्टी तयार गरेर बीउ छान्नुहोस्।'
      : 'Perfect time for rice planting. Prepare soil and select quality seeds.'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50">
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="bg-green-600 rounded-full p-2">
                <Wheat className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-green-800">
                कृषि पात्रो
              </h1>
            </div>

            {/* Right side controls */}
            <div className="flex items-center gap-3">
              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === 'np' ? 'en' : 'np')}
                className="bg-green-50 hover:bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-medium transition-colors"
              >
                {language === 'np' ? 'En' : 'ने'}
              </button>

              {/* Menu Toggle */}
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 hover:bg-green-50 rounded-lg transition-colors"
              >
                {showMenu ? <X className="w-5 h-5 text-green-700" /> : <Menu className="w-5 h-5 text-green-700" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMenu && (
            <div className="mt-4 pt-4 border-t border-green-100 lg:hidden">
              <div className="flex flex-col gap-2">
                <button className="text-left py-2 px-3 hover:bg-green-50 rounded-lg text-green-700 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Profile
                </button>
                <button className="text-left py-2 px-3 hover:bg-green-50 rounded-lg text-green-700 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        
        {/* Greeting */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.greeting}</h2>
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{language === 'np' ? nepaliDate : englishDate}</span>
            <span className="text-xs text-green-600 ml-2">📍 {t.location}</span>
          </div>
        </div>

        {/* Today's Overview - Two Main Sections */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          
          {/* Left Section - Weather & Market */}
          <div className="space-y-4">
            
            {/* Weather Card */}
            <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Cloud className="w-5 h-5 text-blue-500" />
                  {t.weather}
                </h3>
                <div className="text-3xl">☀️</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">
                    {weatherData.temp}{t.degrees}
                  </div>
                  <div className="text-sm text-gray-600">{t.temperature}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {weatherData.humidity}%
                  </div>
                  <div className="text-sm text-gray-600">{t.humidity}</div>
                </div>
              </div>
            </div>

            {/* Market Prices */}
            <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  {t.marketPrices}
                </h3>
                <button className="text-sm text-green-600 hover:text-green-700 hover:underline">
                  {t.viewAll}
                </button>
              </div>

              <div className="space-y-3">
                {marketPrices.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-medium text-gray-800">{item.crop}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-800">
                        {t.rs}{item.price}{t.perKg}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.change.startsWith('+') 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {item.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section - Tasks & Advice */}
          <div className="space-y-4">
            
            {/* Today's Tasks */}
            <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-orange-500" />
                  {t.todaysTasks}
                </h3>
              </div>

              <div className="space-y-3">
                {todaysTasks.length > 0 ? (
                  todaysTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          task.priority === 'high' ? 'bg-red-500' : 
                          task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}></div>
                        <div>
                          <div className="font-medium text-gray-800">{task.task}</div>
                          <div className="text-xs text-gray-600">{task.time}</div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <Sprout className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm">{t.noTasks}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Crop Advice */}
            <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Wheat className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold text-green-800">{cropAdvice.title}</h3>
              </div>
              <p className="text-green-700 leading-relaxed">{cropAdvice.content}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {language === 'np' ? 'द्रुत कार्यहरू' : 'Quick Actions'}
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center gap-2 p-4 hover:bg-green-50 rounded-lg transition-colors">
              <Calendar className="w-6 h-6 text-green-600" />
              <span className="text-sm font-medium text-gray-700">
                {language === 'np' ? 'पात्रो' : 'Calendar'}
              </span>
            </button>
            
            <button className="flex flex-col items-center gap-2 p-4 hover:bg-blue-50 rounded-lg transition-colors">
              <Cloud className="w-6 h-6 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">
                {language === 'np' ? 'मौसम' : 'Weather'}
              </span>
            </button>
            
            <button className="flex flex-col items-center gap-2 p-4 hover:bg-yellow-50 rounded-lg transition-colors">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
              <span className="text-sm font-medium text-gray-700">
                {language === 'np' ? 'बजार' : 'Market'}
              </span>
            </button>
            
            <button className="flex flex-col items-center gap-2 p-4 hover:bg-purple-50 rounded-lg transition-colors">
              <Sprout className="w-6 h-6 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">
                {language === 'np' ? 'सल्लाह' : 'Advice'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
