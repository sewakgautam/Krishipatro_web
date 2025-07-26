import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, TrendingDown, Minus, MapPin, Calendar, Leaf, BarChart3, Filter, RefreshCw, CalendarDays, Menu, X } from 'lucide-react';
import Image from 'next/image';

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
  const [showFilters, setShowFilters] = useState(false);

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
    if (percentChange > 0) return <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500" />;
    if (percentChange < 0) return <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />;
    return <Minus className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />;
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
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-emerald-100 w-full max-w-sm">
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
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-red-200 w-full max-w-md">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-500 text-2xl">⚠️</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">त्रुटि भयो</h3>
            <p className="text-gray-600 mb-4 text-sm">{error}</p>
            <button
              onClick={() => fetchMarketData(selectedDate)}
              disabled={refreshing}
              className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
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
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center gap-3">
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
            
            <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <div className="flex items-center gap-2 flex-1 sm:flex-initial">
                <CalendarDays className="w-4 h-4 text-emerald-600" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => handleDateChange(e.target.value)}
                  className="text-xs sm:text-sm border text-black border-gray-300 rounded-lg px-2 sm:px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 flex-1 sm:flex-initial"
                />
              </div>
              
              <button
                onClick={() => fetchMarketData(selectedDate)}
                disabled={refreshing}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">{refreshing ? 'लोड गर्दै...' : 'रिफ्रेस'}</span>
              </button>
            </div>
          </div>
          
          <div className="mt-4 sm:hidden">
            <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-100 px-3 py-2 rounded-lg">
              <Calendar className="w-4 h-4" />
              {marketData?.headers[0]?.latestDate || 'N/A'}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
                <p className="text-xs sm:text-sm text-gray-500">कुल उत्पादन</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-emerald-600">{stats.priceIncreases}</p>
                <p className="text-xs sm:text-sm text-gray-500">मूल्य वृद्धि</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-red-600">{stats.priceDecreases}</p>
                <p className="text-xs sm:text-sm text-gray-500">मूल्य कमी</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Minus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-gray-600">{stats.noChange}</p>
                <p className="text-xs sm:text-sm text-gray-500">स्थिर मूल्य</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-100">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="उत्पादन खोज्नुहोस् (जस्तै: आलु, गोलभेडा)..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-sm sm:text-base text-black"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Mobile Filter Toggle */}
            <div className="flex items-center justify-between sm:hidden">
              <span className="text-sm font-medium text-gray-700">फिल्टर</span>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-emerald-600 bg-emerald-50 rounded-lg"
              >
                {showFilters ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                {showFilters ? 'लुकाउनुहोस्' : 'देखाउनुहोस्'}
              </button>
            </div>
            
            {/* Filters */}
            <div className={`${showFilters ? 'block' : 'hidden'} sm:block space-y-3 sm:space-y-0 sm:flex sm:gap-4`}>
              <div className="relative flex-1 sm:max-w-[200px]">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  className="w-full pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white text-sm text-black"
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

              <div className="relative flex-1 sm:max-w-[160px]">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  className="w-full pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white text-sm text-black"
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

        {/* Market Overview - Mobile optimized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
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
                    <p className="text-xs text-gray-500 truncate sm:hidden">{market.name}</p>
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

        {/* Results count */}
        <div className="mb-4">
          <p className="text-sm sm:text-base text-gray-600">
            <span className="font-semibold">{filteredData.length}</span> उत्पादनहरू फेला परे
            {searchTerm && <span className="ml-2 text-emerald-600">"{searchTerm}" को लागि</span>}
          </p>
        </div>

        {/* Market Data Table - Mobile Cards / Desktop Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">आजको बजार मूल्य</h2>
            <p className="text-xs sm:text-sm text-gray-500">सबै बजारका ताजा दरहरू</p>
          </div>
          
          {/* Mobile Card View */}
          <div className="sm:hidden">
            {filteredData.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Search className="w-12 h-12 text-gray-300 mb-4 mx-auto" />
                <p className="text-lg font-medium">कुनै उत्पादन फेला परेन</p>
                <p className="text-sm">फिल्टर परिवर्तन गर्नुहोस् वा अर्को खोजी गर्नुहोस्</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredData.map((item) => {
                  const productInfo = marketData?.rows.find(row => row.sid === item.productSubType);
                  return (
                    <div key={`${item.market}-${item.productSubType}`} className="p-4 hover:bg-gray-50">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            productInfo?.category === 2 ? 'bg-green-400' : 
                            productInfo?.category === 3 ? 'bg-orange-400' : 'bg-gray-400'
                          }`}></div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {item.productSubTypeNameNe}
                            </div>
                            <div className="text-xs text-gray-500">
                              {getCategoryName(productInfo?.category || 0)}
                            </div>
                          </div>
                        </div>
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getPriceChangeBg(item.percentChange)}`}>
                          {getPriceChangeIcon(item.percentChange)}
                          <span className={getPriceChangeColor(item.percentChange)}>
                            {item.percentChange === 0 ? '0%' : `${item.percentChange > 0 ? '+' : ''}${item.percentChange.toFixed(1)}%`}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-500 mb-2">{item.marketNameNe}</div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-xs text-gray-500">न्यूनतम</div>
                          <div className="font-medium">रू {item.minPrice.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">अधिकतम</div>
                          <div className="font-medium">रू {item.maxPrice.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">औसत</div>
                          <div className="font-bold text-emerald-600">रू {item.avgPrice.toLocaleString()}</div>
                        </div>
                      </div>
                      
                      <div className="mt-2 text-xs text-gray-500">
                        इकाई: {item.unit}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
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

        {/* Footer */}
        <div className="mt-8 sm:mt-12 bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Leaf className="w-5 h-5 text-emerald-500" />
              <span className="font-semibold text-gray-900">कृषि पात्रो</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mb-2">
              डाटा स्रोत: कृषि बजार, कोशी प्रदेश | अन्तिम अपडेट: {marketData?.headers[0]?.latestDate || 'N/A'}
            </p>
            <p className="text-xs text-gray-400">
              नेपालका प्रमुख बजारहरूको दैनिक मूल्य सूचना
            </p>
            <div className="hidden sm:block mt-2">
              <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-100 px-3 py-2 rounded-lg justify-center">
                <Calendar className="w-4 h-4" />
                अन्तिम अपडेट: {marketData?.headers[0]?.latestDate || 'N/A'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPage;
