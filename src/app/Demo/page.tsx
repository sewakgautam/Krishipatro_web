"use client";
import React, { useState, useEffect } from 'react';
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
  X,
  Play,
  Pause,
  RotateCcw,
  ArrowLeft,
  CheckCircle,
  Info,
  Zap
} from 'lucide-react';

export default function DemoPage() {
  const [language, setLanguage] = useState<'np' | 'en'>('np');
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState('');
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const texts = {
    np: {
      demoTitle: 'कृषि पात्रो डेमो',
      demoSubtitle: 'हाम्रा सुविधाहरू प्रत्यक्ष अनुभव गर्नुहोस्',
      step: 'चरण',
      of: 'को',
      next: 'अगाडि',
      previous: 'पछाडि',
      play: 'चलाउनुहोस्',
      pause: 'रोक्नुहोस्',
      restart: 'फेरि सुरु',
      skipDemo: 'डेमो छोड्नुहोस्',
      startUsing: 'प्रयोग सुरु गर्नुहोस्',
      
      // Demo Steps
      steps: [
        {
          title: 'ड्यासबोर्ड परिचय',
          description: 'मुख्य ड्यासबोर्डमा सबै महत्वपूर्ण जानकारी एकै ठाउँमा पाउनुहोस्',
          instruction: 'मुख्य सुविधाहरू हेर्नुहोस्'
        },
        {
          title: 'मौसम पूर्वानुमान',
          description: 'सटीक मौसम जानकारी र कृषि कार्यका लागि सिफारिस',
          instruction: 'मौसम कार्डमा क्लिक गर्नुहोस्'
        },
        {
          title: 'बजार मूल्य',
          description: 'वास्तविक समयको बजार भाउ र मूल्य प्रवृत्ति',
          instruction: 'बजार मूल्य सेक्शनमा क्लिक गर्नुहोस्'
        },
        {
          title: 'दैनिक कार्यहरू',
          description: 'आजका कृषि कार्यहरू र अनुस्मारकहरू',
          instruction: 'कार्य सूचीमा क्लिक गर्नुहोस्'
        },
        {
          title: 'कृषि सल्लाह',
          description: 'विशेषज्ञहरूबाट प्राप्त सल्लाह र मार्गदर्शन',
          instruction: 'सल्लाह कार्डमा क्लिक गर्नुहोस्'
        },
        {
          title: 'द्रुत कार्यहरू',
          description: 'महत्वपूर्ण सुविधाहरूमा द्रुत पहुँच',
          instruction: 'द्रुत कार्य बटनहरू प्रयोग गर्नुहोस्'
        }
      ],

      // App Content
      greeting: 'नमस्कार, राम जी',
      todaysDate: 'आजको मिति',
      weather: 'मौसम',
      temperature: 'तापक्रम', 
      humidity: 'आर्द्रता',
      marketPrices: 'बजार मूल्य',
      todaysTasks: 'आजका काम',
      cropAdvice: 'बाली सल्लाह',
      quickActions: 'द्रुत कार्यहरू',
      viewAll: 'सबै हेर्नुहोस्',
      degrees: '°से',
      rs: 'रु.',
      perKg: '/के.जी.',
      clear: 'साफा',
      location: 'काठमाडौं',
      
      // Tooltips
      tooltips: {
        weather: 'यहाँ तपाईंले दैनिक मौसम, तापक्रम र आर्द्रता देख्न सक्नुहुन्छ',
        market: 'विभिन्न बालीहरूको वर्तमान बजार मूल्य र मूल्य परिवर्तन देख्नुहोस्',
        tasks: 'आजका महत्वपूर्ण कृषि कार्यहरू र तिनीहरूको समय',
        advice: 'कृषि विशेषज्ञहरूबाट मौसमी सल्लाह र मार्गदर्शन',
        actions: 'मुख्य सुविधाहरूमा द्रुत पहुँचका लागि यी बटनहरू प्रयोग गर्नुहोस्'
      }
    },
    en: {
      demoTitle: 'Krishi Patro Demo',
      demoSubtitle: 'Experience our features hands-on',
      step: 'Step',
      of: 'of',
      next: 'Next',
      previous: 'Previous', 
      play: 'Play',
      pause: 'Pause',
      restart: 'Restart',
      skipDemo: 'Skip Demo',
      startUsing: 'Start Using',
      
      steps: [
        {
          title: 'Dashboard Overview',
          description: 'Get all important information in one place on the main dashboard',
          instruction: 'Explore the main features'
        },
        {
          title: 'Weather Forecast',
          description: 'Accurate weather information and recommendations for farming activities',
          instruction: 'Click on the weather card'
        },
        {
          title: 'Market Prices',
          description: 'Real-time market rates and price trends',
          instruction: 'Click on the market prices section'
        },
        {
          title: 'Daily Tasks',
          description: 'Today\'s farming tasks and reminders',
          instruction: 'Click on the task list'
        },
        {
          title: 'Agricultural Advice',
          description: 'Expert guidance and recommendations',
          instruction: 'Click on the advice card'
        },
        {
          title: 'Quick Actions',
          description: 'Fast access to important features',
          instruction: 'Use the quick action buttons'
        }
      ],

      greeting: 'Hello, Ram ji',
      todaysDate: "Today's Date",
      weather: 'Weather',
      temperature: 'Temperature',
      humidity: 'Humidity', 
      marketPrices: 'Market Prices',
      todaysTasks: "Today's Tasks",
      cropAdvice: 'Crop Advice',
      quickActions: 'Quick Actions',
      viewAll: 'View All',
      degrees: '°C',
      rs: 'Rs.',
      perKg: '/kg',
      clear: 'Clear',
      location: 'Kathmandu',
      
      tooltips: {
        weather: 'Here you can see daily weather, temperature and humidity',
        market: 'View current market prices for different crops and price changes',
        tasks: 'Today\'s important farming tasks and their timing',
        advice: 'Seasonal advice and guidance from agricultural experts',
        actions: 'Use these buttons for quick access to main features'
      }
    }
  };

  const t = texts[language];

  // Auto-advance demo
  useEffect(() => {
    if (isPlaying && currentStep < t.steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, currentStep, t.steps.length]);

  // Sample data that changes based on demo step
  const getDynamicData = () => {
    const baseWeather = { temp: 24, humidity: 65, condition: t.clear };
    const baseMarketPrices = [
      { crop: language === 'np' ? 'धान' : 'Rice', price: 45, change: '+2' },
      { crop: language === 'np' ? 'मकै' : 'Maize', price: 32, change: '-1' },
      { crop: language === 'np' ? 'गहुँ' : 'Wheat', price: 38, change: '+1' }
    ];
    const baseTasks = [
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

    // Modify data based on current step to show interactivity
    switch(currentStep) {
      case 1: // Weather step
        return {
          weather: { ...baseWeather, temp: 26, humidity: 70 },
          marketPrices: baseMarketPrices,
          tasks: baseTasks
        };
      case 2: // Market step
        return {
          weather: baseWeather,
          marketPrices: baseMarketPrices.map(item => ({
            ...item,
            price: item.price + Math.floor(Math.random() * 3)
          })),
          tasks: baseTasks
        };
      default:
        return {
          weather: baseWeather,
          marketPrices: baseMarketPrices,
          tasks: baseTasks
        };
    }
  };

  const { weather: weatherData, marketPrices, tasks: todaysTasks } = getDynamicData();

  const cropAdvice = {
    title: language === 'np' ? 'यो महिनाको सल्लाह' : 'This Month\'s Advice',
    content: language === 'np' 
      ? 'धान बाली रोप्न उत्तम समय। मिट्टी तयार गरेर बीउ छान्नुहोस्।'
      : 'Perfect time for rice planting. Prepare soil and select quality seeds.'
  };

  const handleStepClick = (section: string) => {
    if (section === 'weather' && currentStep === 1) {
      setCompletedSteps(prev => [...prev, 1]);
      setShowTooltip('weather');
      setTimeout(() => setShowTooltip(''), 3000);
    } else if (section === 'market' && currentStep === 2) {
      setCompletedSteps(prev => [...prev, 2]);
      setShowTooltip('market');
      setTimeout(() => setShowTooltip(''), 3000);
    } else if (section === 'tasks' && currentStep === 3) {
      setCompletedSteps(prev => [...prev, 3]);
      setShowTooltip('tasks');
      setTimeout(() => setShowTooltip(''), 3000);
    } else if (section === 'advice' && currentStep === 4) {
      setCompletedSteps(prev => [...prev, 4]);
      setShowTooltip('advice');
      setTimeout(() => setShowTooltip(''), 3000);
    } else if (section === 'actions' && currentStep === 5) {
      setCompletedSteps(prev => [...prev, 5]);
      setShowTooltip('actions');
      setTimeout(() => setShowTooltip(''), 3000);
    }
  };

  const nextStep = () => {
    if (currentStep < t.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const restartDemo = () => {
    setCurrentStep(0);
    setCompletedSteps([]);
    setIsPlaying(false);
    setShowTooltip('');
  };

  const getHighlightClass = (section: string, step: number) => {
    if (currentStep === step) {
      return 'ring-4 ring-blue-400 ring-opacity-75 shadow-lg transform scale-105';
    }
    if (completedSteps.includes(step)) {
      return 'ring-2 ring-green-400 ring-opacity-50';
    }
    return '';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Demo Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            
            {/* Back to Home */}
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">{language === 'np' ? 'घर फिर्ता' : 'Back to Home'}</span>
              </button>
              
              <div>
                <h1 className="text-xl font-bold text-gray-800">{t.demoTitle}</h1>
                <p className="text-sm text-gray-600 hidden sm:block">{t.demoSubtitle}</p>
              </div>
            </div>

            {/* Demo Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLanguage(language === 'np' ? 'en' : 'np')}
                className="bg-green-50 hover:bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-medium transition-colors"
              >
                {language === 'np' ? 'En' : 'ने'}
              </button>
              
              <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 hover:bg-white rounded-md transition-colors"
                  title={isPlaying ? t.pause : t.play}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                
                <button
                  onClick={restartDemo}
                  className="p-2 hover:bg-white rounded-md transition-colors"
                  title={t.restart}
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Progress */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-gray-700">
              {t.step} {currentStep + 1} {t.of} {t.steps.length}: {t.steps[currentStep]?.title}
            </div>
            <div className="text-sm text-gray-500">
              {Math.round(((currentStep + 1) / t.steps.length) * 100)}%
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / t.steps.length) * 100}%` }}
            ></div>
          </div>
          
          {/* Current Step Description */}
          <div className="mt-2 text-sm text-gray-600">
            {t.steps[currentStep]?.description}
          </div>
          
          <div className="mt-1 text-xs font-medium text-blue-600">
            💡 {t.steps[currentStep]?.instruction}
          </div>
        </div>
      </div>

      {/* Demo Content - Simulated App */}
      <div className="max-w-6xl mx-auto p-4">
        
        {/* App Header */}
        <div className="bg-white shadow-sm border-b border-green-100 rounded-t-xl">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-green-600 rounded-full p-2">
                  <Wheat className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-xl font-bold text-green-800">कृषि पात्रो</h1>
              </div>
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <User className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* App Content */}
        <div className="bg-gradient-to-br from-green-50 via-blue-50 to-green-50 px-6 py-6 rounded-b-xl">
          
          {/* Greeting */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.greeting}</h2>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">
                {new Intl.DateTimeFormat(language === 'np' ? 'ne-NP' : 'en-US', {
                  weekday: 'long',
                  year: 'numeric', 
                  month: 'long',
                  day: 'numeric'
                }).format(new Date())}
              </span>
              <span className="text-xs text-green-600 ml-2">📍 {t.location}</span>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            
            {/* Left Section */}
            <div className="space-y-4">
              
              {/* Weather Card */}
              <div 
                className={`bg-white rounded-xl shadow-sm border border-green-100 p-6 transition-all duration-500 cursor-pointer hover:shadow-md ${getHighlightClass('weather', 1)}`}
                onClick={() => handleStepClick('weather')}
              >
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

                {/* Tooltip */}
                {showTooltip === 'weather' && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <div className="flex items-center gap-2 text-blue-800">
                      <Info className="w-4 h-4" />
                      <span className="text-sm font-medium">{t.tooltips.weather}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Market Prices */}
              <div 
                className={`bg-white rounded-xl shadow-sm border border-green-100 p-6 transition-all duration-500 cursor-pointer hover:shadow-md ${getHighlightClass('market', 2)}`}
                onClick={() => handleStepClick('market')}
              >
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

                {showTooltip === 'market' && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                    <div className="flex items-center gap-2 text-green-800">
                      <Info className="w-4 h-4" />
                      <span className="text-sm font-medium">{t.tooltips.market}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Section */}
            <div className="space-y-4">
              
              {/* Tasks */}
              <div 
                className={`bg-white rounded-xl shadow-sm border border-green-100 p-6 transition-all duration-500 cursor-pointer hover:shadow-md ${getHighlightClass('tasks', 3)}`}
                onClick={() => handleStepClick('tasks')}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-orange-500" />
                    {t.todaysTasks}
                  </h3>
                </div>

                <div className="space-y-3">
                  {todaysTasks.map((task) => (
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
                  ))}
                </div>

                {showTooltip === 'tasks' && (
                  <div className="mt-4 p-3 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                    <div className="flex items-center gap-2 text-orange-800">
                      <Info className="w-4 h-4" />
                      <span className="text-sm font-medium">{t.tooltips.tasks}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Crop Advice */}
              <div 
                className={`bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-6 transition-all duration-500 cursor-pointer hover:shadow-md ${getHighlightClass('advice', 4)}`}
                onClick={() => handleStepClick('advice')}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Wheat className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-green-800">{cropAdvice.title}</h3>
                </div>
                <p className="text-green-700 leading-relaxed">{cropAdvice.content}</p>

                {showTooltip === 'advice' && (
                  <div className="mt-4 p-3 bg-white rounded-lg border-l-4 border-green-400">
                    <div className="flex items-center gap-2 text-green-800">
                      <Info className="w-4 h-4" />
                      <span className="text-sm font-medium">{t.tooltips.advice}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div 
            className={`bg-white rounded-xl shadow-sm border border-green-100 p-6 transition-all duration-500 cursor-pointer hover:shadow-md ${getHighlightClass('actions', 5)}`}
            onClick={() => handleStepClick('actions')}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t.quickActions}</h3>
            
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

            {showTooltip === 'actions' && (
              <div className="mt-4 p-3 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                <div className="flex items-center gap-2 text-purple-800">
                  <Info className="w-4 h-4" />
                  <span className="text-sm font-medium">{t.tooltips.actions}</span>
                </div>
              </div>
            )}
                    </div> {/* End of Quick Actions */}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentStep === 0 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <ChevronLeft className="inline-block w-4 h-4 mr-1" />
              {t.previous}
            </button>

            {currentStep < t.steps.length - 1 ? (
              <div className="flex gap-3">
                <button
                  onClick={() => setCurrentStep(t.steps.length - 1)}
                  className="px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-sm font-medium"
                >
                  {t.skipDemo}
                </button>
                <button
                  onClick={nextStep}
                  className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 text-sm font-medium"
                >
                  {t.next}
                  <ChevronRight className="inline-block w-4 h-4 ml-1" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => alert('Demo completed!')}
                className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm font-semibold"
              >
                ✅ {t.startUsing}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

          
