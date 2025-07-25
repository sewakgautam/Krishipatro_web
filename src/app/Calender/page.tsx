'use client';
import React, { useEffect, useState } from 'react';
import { Wheat, Calendar, Sprout, Scissors, Sun, Moon, ChevronRight } from 'lucide-react';

// More accurate Nepali month mapping
const getNepaliMonthInfo = () => {
  // Simulating current date - you can replace this with actual nepali-date-converter
  const currentMonth = 'श्रावण'; // Shrawan (current)
  const nextMonth = 'भदौ'; // Bhadra (next)
  
  return {
    current: currentMonth,
    next: nextMonth,
    currentIndex: 3, // Shrawan is 4th month (0-indexed = 3)
    nextIndex: 4 // Bhadra is 5th month (0-indexed = 4)
  };
};

const cropData = {
  "region": "तराई तथा खोंच",
  "crops": [
    {
      "name": "काउली",
      "varieties": ["काठमाडौ लोकल", "खुमल कापु", "डोका ग्लोबल १६"],
      "sowing_time": ["चैत", "बैशाख"],
      "harvest_time": ["असार", "साउन"],
      "spacing_cm": "60x45",
      "seed_rate": "30 ग्राम वा 1800 बेर्ना",
      "suitable_crop_rotation": ["धान", "लसुन"],
      "notes": [
        "रोग किरा सहन सक्ने तथा स्थानीय रुपमा अनुकूलन भएका जातहरु लगाउने।",
        "फोहरा सिंचाइ प्रयोग गर्ने।",
        "आईपीएम प्रविधि अपनाउने।"
      ]
    },
    {
      "name": "धान",
      "varieties": ["वर्षा", "मनसुली", "सुगन्धा"],
      "sowing_time": ["असार"],
      "harvest_time": ["मंसिर", "पुष"],
      "spacing_cm": "20x15",
      "seed_rate": "40 केजी प्रति हेक्टर",
      "suitable_crop_rotation": ["गहुँ", "सरसो"],
      "notes": [
        "वर्षाको समयमा रोप्ने उत्तम।",
        "जैविक मल प्रयोग गर्ने।"
      ]
    },
    {
      "name": "मकै",
      "varieties": ["रामपुर कम्पोजिट", "पूर्ण हाइब्रिड"],
      "sowing_time": ["चैत", "बैशाख", "जेठ"],
      "harvest_time": ["भदौ", "आश्विन"],
      "spacing_cm": "75x25",
      "seed_rate": "25 केजी प्रति हेक्टर",
      "suitable_crop_rotation": ["धान", "गहुँ"],
      "notes": [
        "पानी जमेको ठाउँमा नलगाउने।",
        "पुर्ण बाली भएपछि फसल गर्ने।"
      ]
    },
    {
      "name": "तिल",
      "varieties": ["स्थानीय", "कृष्ण"],
      "sowing_time": ["श्रावण"],
      "harvest_time": ["कार्तिक"],
      "spacing_cm": "30x10",
      "seed_rate": "5-6 केजी प्रति हेक्टर",
      "suitable_crop_rotation": ["धान", "गहुँ"],
      "notes": [
        "बर्षाको समयमा रोप्ने राम्रो।",
        "पानी जमेको ठाउँमा नलगाउने।"
      ]
    },
    {
      "name": "साग तरकारी",
      "varieties": ["पालुंगो", "मेथी", "धनिया"],
      "sowing_time": ["श्रावण", "भदौ"],
      "harvest_time": ["आश्विन", "कार्तिक"],
      "spacing_cm": "15x10",
      "seed_rate": "2-3 केजी प्रति हेक्टर",
      "suitable_crop_rotation": ["कुनै पनी"],
      "notes": [
        "नियमित पानी दिने।",
        "जैविक मल मात्र प्रयोग गर्ने।"
      ]
    }
  ]
};

interface Crop {
  name: string;
  varieties: string[];
  sowing_time: string[];
  harvest_time: string[];
  spacing_cm: string;
  seed_rate: string;
  suitable_crop_rotation: string[];
  notes: string[];
}

export default function CropCalendar() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'sowing' | 'harvest'>('sowing');
  const [monthInfo, setMonthInfo] = useState(getNepaliMonthInfo());

  // Filter crops based on current and next month for sowing/harvesting
  const getFilteredCrops = (type: 'sowing' | 'harvest') => {
    const timeKey = type === 'sowing' ? 'sowing_time' : 'harvest_time';
    
    return cropData.crops.filter(crop => {
      return crop[timeKey].includes(monthInfo.current) || 
             crop[timeKey].includes(monthInfo.next);
    });
  };

  const sowingCrops = getFilteredCrops('sowing');
  const harvestCrops = getFilteredCrops('harvest');

  return (
    <main className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-green-50 to-blue-50 text-gray-900'} min-h-screen transition-all duration-300`}>
      <div className="max-w-4xl mx-auto p-4">
        
        {/* Header */}
        <header className="text-center mb-8 pt-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className={`p-3 rounded-full ${darkMode ? 'bg-green-800' : 'bg-green-600'} shadow-lg`}>
              <Wheat className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-green-700 dark:text-green-400">
              कृषि पात्रो
            </h1>
          </div>
          
          {/* Current Month Display */}
          <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-green-200'
          } shadow-md mb-6`}>
            <Calendar className="w-5 h-5 text-green-600" />
            <span className="font-medium">हाल: {monthInfo.current}</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="font-medium text-gray-600 dark:text-gray-300">आगामी: {monthInfo.next}</span>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full transition-colors ${
              darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-600'
            } hover:scale-110 transform`}
            title="रंग परिवर्तन गर्नुहोस्"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </header>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className={`flex rounded-full p-1 ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <button
              onClick={() => setActiveTab('sowing')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === 'sowing'
                  ? 'bg-green-600 text-white shadow-md'
                  : `${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`
              }`}
            >
              <Sprout className="w-5 h-5" />
              बीउ छर्ने समय
            </button>
            <button
              onClick={() => setActiveTab('harvest')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === 'harvest'
                  ? 'bg-orange-600 text-white shadow-md'
                  : `${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`
              }`}
            >
              <Scissors className="w-5 h-5" />
              फसल काट्ने समय
            </button>
          </div>
        </div>

        {/* Crops Display */}
        <div className="space-y-4">
          {(activeTab === 'sowing' ? sowingCrops : harvestCrops).map((crop, index) => (
            <div
              key={index}
              className={`rounded-2xl p-6 transition-all duration-200 hover:shadow-lg ${
                darkMode 
                  ? 'bg-gray-800 border border-gray-700 hover:bg-gray-750' 
                  : 'bg-white border border-gray-200 hover:shadow-xl'
              } transform hover:-translate-y-1`}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className={`text-xl font-bold ${
                  activeTab === 'sowing' ? 'text-green-700 dark:text-green-400' : 'text-orange-700 dark:text-orange-400'
                }`}>
                  {crop.name}
                </h3>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  activeTab === 'sowing'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                }`}>
                  {activeTab === 'sowing' ? 'बीउ छर्ने' : 'फसल काट्ने'}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <InfoItem label="जातहरू" value={crop.varieties.slice(0, 3).join(', ')} />
                  <InfoItem label="दूरी" value={crop.spacing_cm + ' से.मी.'} />
                  <InfoItem label="बीउको मात्रा" value={crop.seed_rate} />
                </div>
                <div className="space-y-2">
                  <InfoItem 
                    label="समय" 
                    value={activeTab === 'sowing' ? crop.sowing_time.join(', ') : crop.harvest_time.join(', ')}
                  />
                  <InfoItem label="बालीचक्र" value={crop.suitable_crop_rotation.slice(0, 2).join(', ')} />
                </div>
              </div>

              {crop.notes.length > 0 && (
                <div className={`p-4 rounded-lg ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-50'
                } border-l-4 ${
                  activeTab === 'sowing' ? 'border-green-500' : 'border-orange-500'
                }`}>
                  <h4 className="font-medium mb-2 text-sm">महत्वपूर्ण सुझावहरू:</h4>
                  <ul className="text-sm space-y-1">
                    {crop.notes.slice(0, 2).map((note, idx) => (
                      <li key={idx} className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        • {note}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {(activeTab === 'sowing' ? sowingCrops : harvestCrops).length === 0 && (
          <div className={`text-center py-12 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <Wheat className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">
              {activeTab === 'sowing' 
                ? `${monthInfo.current} र ${monthInfo.next} मा बीउ छर्ने बाली भेटिएन।`
                : `${monthInfo.current} र ${monthInfo.next} मा काट्ने बाली भेटिएन।`
              }
            </p>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center py-8 mt-12 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © २०२५ कृषि पात्रो | किसानको लागि सरल र सहज
          </p>
        </footer>
      </div>
    </main>
  );
}

// Helper component for info items
const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}:</span>
    <span className="ml-2 text-sm font-medium">{value}</span>
  </div>
);
