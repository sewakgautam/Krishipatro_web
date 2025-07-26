// pages/dashboard.tsx
import React from "react";

import { Wheat, LogOut, User, Phone } from "lucide-react";
import { useAuth } from "./contexts/firebaseauthcontext";
import ProtectedRoute from "./Components/ProtectedRoute";

export default function Dashboard() {
  const { user, userData, signOutUser } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <ProtectedRoute requireComplete={true}>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-green-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="bg-green-600 rounded-full p-2">
                  <Wheat className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-xl font-bold text-green-800">
                  कृषि पात्रो
                </h1>
              </div>

              {/* User Menu */}
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {userData?.userName || user?.displayName || "User"}
                  </p>
                  <p className="text-xs text-gray-500">{user?.phoneNumber}</p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Welcome Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-green-100">
              <div className="flex items-center gap-3 mb-4">
                <User className="w-8 h-8 text-green-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Welcome!
                </h2>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                स्वागत छ, {userData?.userName}! Your farming companion is ready.
              </p>
              <div className="bg-green-50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-green-600" />
                  <span className="text-green-700">{user?.phoneNumber}</span>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-green-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Farm Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Crops</span>
                  <span className="font-medium text-green-600">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Seasons</span>
                  <span className="font-medium text-green-600">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Alerts</span>
                  <span className="font-medium text-orange-600">2</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-green-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm text-green-700 hover:bg-green-50 rounded-lg transition-colors">
                  Add New Crop
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-green-700 hover:bg-green-50 rounded-lg transition-colors">
                  Check Weather
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-green-700 hover:bg-green-50 rounded-lg transition-colors">
                  View Calendar
                </button>
              </div>
            </div>
          </div>

          {/* Farm Scene */}
          <div className="mt-12 text-center">
            <div className="text-6xl mb-4">🏡🌾🚜🌾🏡</div>
            <p className="text-green-700 font-medium">
              Your digital farming companion
            </p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
