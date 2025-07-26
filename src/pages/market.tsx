import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, TrendingDown, Minus, MapPin, Calendar, Leaf, BarChart3, Filter, RefreshCw, CalendarDays } from 'lucide-react';

interface MarketHeader {
  id: number;
  name: string;
  nameNe: string;
  latestDate: string;
  latestDateNe: string;
}

interface ProductRow {
  sid: number;
  name: string;
  nameNe: string;
  category: number;
}

interface MarketData {
  id: number;
  date: string;
  maxPrice: number;
  minPrice: number;
  avgPrice: number;
  market: number;
  marketName: string;
  marketNameNe: string;
  productSubType: number;
  productSubTypeName: string;
  productSubTypeNameNe: string;
  dateNepali: string;
  averageDiff: number;
  percentChange: number;
  unit: string;
}

interface ApiResponse {
  headers: MarketHeader[];
  rows: ProductRow[];
  data: { [key: string]: MarketData[] };
}

const MarketPage: React.FC = () => {
  const [marketData, setMarketData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMarket, setSelectedMarket] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const today = new Date();
    const formattedDate = formatDate(today);
    setSelectedDate(formattedDate);
  }, []);

  const fetchMarketData = async (date?: string) => {
    try {
      setRefreshing(true);
      setError(null);
      
      const dateToFetch = date || selectedDate;
      const url = dateToFetch ? `/api/market-price?date=${dateToFetch}` : '/api/market-price';
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }

      const data: ApiResponse = await response.json();
      
      if ('error' in data) {
        throw new Error((data as any).error);
      }
      
      setMarketData(data);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'डाटा लोड गर्न सकिएन';
      setError(errorMessage);
      console.error('API Error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchMarketData(selectedDate);
    }
  }, [selectedDate]);

  const handleDateChange = (newDate: string) => {
    setSelectedDate(newDate);
  };

  const getPriceChangeIcon = (percentChange: number) => {
    if (percentChange > 0) return <TrendingUp className="w-4 h-4 text-emerald-500" />;
    if (percentChange < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const getPriceChangeColor = (percentChange: number) => {
    if (percentChange > 0) return 'text-emerald-500';
    if (percentChange < 0) return 'text-red-500';
    return 'text-gray-400';
  };

  const getPriceChangeBg = (percentChange: number) => {
    if (percentChange > 0) return 'bg-emerald-50 border-emerald-200';
    if (percentChange < 0) return 'bg-red-50 border-red-200';
    return 'bg-gray-50 border-gray-200';
  };

  const getCategoryName = (category: number) => {
    return category === 2 ? 'तरकारी' : category === 3 ? 'फलफूल' : 'अन्य';
  };

  const getAllMarketData = (): MarketData[] => {
    if (!marketData) return [];
    
    const allData: MarketData[] = [];
    Object.values(marketData.data).forEach(marketArray => {
      allData.push(...marketArray);
    });
    
    return allData;
  };

  const filteredData = getAllMarketData().filter(item => {
    const matchesSearch = item.productSubTypeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.productSubTypeNameNe.includes(searchTerm);
    
    const matchesMarket = selectedMarket === 'all' || item.market.toString() === selectedMarket;
    
    const productInfo = marketData?.rows.find(row => row.sid === item.productSubType);
    const matchesCategory = selectedCategory === 'all' || 
                           (productInfo && productInfo.category.toString() === selectedCategory);
    
    return matchesSearch && matchesMarket && matchesCategory;
  });

  const getMarketStats = () => {
    const allData = getAllMarketData();
    const totalProducts = allData.length;
    const priceIncreases = allData.filter(item => item.percentChange > 0).length;
    const priceDecreases = allData.filter(item => item.percentChange < 0).length;
    const noChange = allData.filter(item => item.percentChange === 0).length;
    
    return { totalProducts, priceIncreases, priceDecreases, noChange };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-emerald-100">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-200 border-t-emerald-500"></div>
            <p className="mt-4 text-gray-600 text-center font-medium">बजार डाटा लोड गर्दै...</p>
            <p className="text-sm text-gray-500 mt-2">कृपया पर्खनुहोस्</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-red-200 max-w-md">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-500 text-2xl">⚠️</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">त्रुटि भयो</h3>
            <p className="text-gray-600 mb-4 text-sm">{error}</p>
            <button
              onClick={() => fetchMarketData(selectedDate)}
              disabled={refreshing}
              className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {refreshing ? 'लोड गर्दै...' : 'पुनः प्रयास गर्नुहोस्'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const stats = getMarketStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <div className="bg-white shadow-sm border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                  <Leaf className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent">
                    कृषि पात्रो
                  </h1>
                  <p className="text-emerald-600 font-medium">बजार मूल्य सूचना</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-emerald-600" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => handleDateChange(e.target.value)}
                  className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <button
                onClick={() => fetchMarketData(selectedDate)}
                disabled={refreshing}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'लोड गर्दै...' : 'रिफ्रेस'}
              </button>
              <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-lg">
                <Calendar className="w-4 h-4" />
                {marketData?.headers[0]?.latestDate || 'N/A'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
                <p className="text-sm text-gray-500">कुल उत्पादन</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-600">{stats.priceIncreases}</p>
                <p className="text-sm text-gray-500">मूल्य वृद्धि</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <TrendingDown className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">{stats.priceDecreases}</p>
                <p className="text-sm text-gray-500">मूल्य कमी</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Minus className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-600">{stats.noChange}</p>
                <p className="text-sm text-gray-500">स्थिर मूल्य</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="उत्पादन खोज्नुहोस् (जस्तै: आलु, गोलभेडा)..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white min-w-[150px]"
                  value={selectedMarket}
                  onChange={(e) => setSelectedMarket(e.target.value)}
                >
                  <option value="all">सबै बजार</option>
                  {marketData?.headers.map(market => (
                    <option key={market.id} value={market.id.toString()}>
                      {market.nameNe}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white min-w-[130px]"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">सबै श्रेणी</option>
                  <option value="2">तरकारी</option>
                  <option value="3">फलफूल</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
          {marketData?.headers.map(market => {
            const marketProducts = getAllMarketData().filter(item => item.market === market.id);
            return (
              <div key={market.id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm truncate">{market.nameNe}</h3>
                    <p className="text-xs text-gray-500 truncate">{market.name}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-lg font-bold text-emerald-600">{marketProducts.length}</p>
                    <p className="text-xs text-gray-500">उत्पादन</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      {marketProducts.filter(p => p.percentChange > 0).length}↑ 
                      {marketProducts.filter(p => p.percentChange < 0).length}↓
                    </p>
                    <p className="text-xs text-gray-500">परिवर्तन</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mb-4">
          <p className="text-gray-600">
            <span className="font-semibold">{filteredData.length}</span> उत्पादनहरू फेला परे
            {searchTerm && <span className="ml-2 text-emerald-600">"{searchTerm}" को लागि</span>}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-900">आजको बजार मूल्य</h2>
            <p className="text-sm text-gray-500">सबै बजारका ताजा दरहरू</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    उत्पादन
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    बजार
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    न्यूनतम मूल्य
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    अधिकतम मूल्य
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    औसत मूल्य
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    परिवर्तन
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    इकाई
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <Search className="w-12 h-12 text-gray-300 mb-4" />
                        <p className="text-lg font-medium">कुनै उत्पादन फेला परेन</p>
                        <p className="text-sm">फिल्टर परिवर्तन गर्नुहोस् वा अर्को खोजी गर्नुहोस्</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item) => {
                    const productInfo = marketData?.rows.find(row => row.sid === item.productSubType);
                    return (
                      <tr key={`${item.market}-${item.productSubType}`} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${
                              productInfo?.category === 2 ? 'bg-green-400' : 
                              productInfo?.category === 3 ? 'bg-orange-400' : 'bg-gray-400'
                            }`}></div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {item.productSubTypeNameNe}
                              </div>
                              <div className="text-sm text-gray-500">
                                {item.productSubTypeName} • {getCategoryName(productInfo?.category || 0)}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{item.marketNameNe}</div>
                          <div className="text-sm text-gray-500">{item.marketName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                          रू {item.minPrice.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                          रू {item.maxPrice.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-gray-900">
                            रू {item.avgPrice.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium border ${getPriceChangeBg(item.percentChange)}`}>
                            {getPriceChangeIcon(item.percentChange)}
                            <span className={getPriceChangeColor(item.percentChange)}>
                              {item.percentChange === 0 ? '0%' : `${item.percentChange > 0 ? '+' : ''}${item.percentChange.toFixed(1)}%`}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
                          {item.unit}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Leaf className="w-5 h-5 text-emerald-500" />
              <span className="font-semibold text-gray-900">कृषि पात्रो</span>
            </div>
            <p className="text-sm text-gray-500 mb-2">
              डाटा स्रोत: कृषि बजार, कोशी प्रदेश | अन्तिम अपडेट: {marketData?.headers[0]?.latestDate || 'N/A'}
            </p>
            <p className="text-xs text-gray-400">
              नेपालका प्रमुख बजारहरूको दैनिक मूल्य सूचना
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPage;
