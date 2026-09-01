import React from 'react';
import { 
  Sparkles, 
  Bookmark, 
  PhoneCall, 
  Compass, 
  SunMedium, 
  Trees, 
  ShieldCheck
} from 'lucide-react';
import { WeatherCondition } from '../types';

interface HeaderProps {
  weather: WeatherCondition;
  bookmarksCount: number;
  onOpenBookmarks: () => void;
  onOpenDirectory: () => void;
  onOpenAIModal: () => void;
  onOpenMap: () => void;
  isMapActive: boolean;
  totalParksCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  weather,
  bookmarksCount,
  onOpenBookmarks,
  onOpenDirectory,
  onOpenAIModal,
  onOpenMap,
  isMapActive,
  totalParksCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-emerald-950/50 shadow-lg">
      {/* Top micro-bar for quick city indicators */}
      <div className="bg-emerald-950/40 border-b border-emerald-900/30 text-xs px-4 py-1.5 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-slate-300">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Parkland, Florida • Official Search & Discovery Centre
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">
              Trails Status: <strong className="text-emerald-400 font-semibold">{weather.trailStatus}</strong>
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">
              Weather: <strong className="text-amber-300 font-semibold">{weather.temp}°F {weather.condition}</strong> (Sunset: {weather.sunset})
            </span>
          </div>

          <div className="flex items-center space-x-3 text-slate-300">
            <span className="text-emerald-300/90 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Free Public City Parks
            </span>
            <span className="text-slate-500">|</span>
            <button
              onClick={onOpenDirectory}
              className="hover:text-emerald-300 transition-colors flex items-center gap-1 font-medium cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              Emergency & City Directory
            </button>
          </div>
        </div>
      </div>

      {/* Main Header navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 p-0.5 shadow-lg shadow-emerald-950 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Trees className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white font-heading">
                PARKLAND <span className="text-emerald-400">🔍SEARCH CENTRE</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                {totalParksCount} Destinations & Guides
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              City of Parkland, FL • Parks, Equestrian, Sports, Schools & Public Information
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* AI Search Assistant Trigger */}
          <button
            id="ai-search-assistant-btn"
            onClick={onOpenAIModal}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium text-xs sm:text-sm shadow-md shadow-emerald-950/60 transition-all cursor-pointer group"
            title="Ask Parkland AI Search Intelligence"
          >
            <Sparkles className="w-4 h-4 text-emerald-200 group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">Ask Parkland AI</span>
            <span className="sm:hidden">Ask AI</span>
          </button>

          {/* Interactive Map Toggle */}
          <button
            id="interactive-map-toggle-btn"
            onClick={onOpenMap}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
              isMapActive
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
            }`}
            title="Interactive Parkland Map"
          >
            <Compass className={`w-4 h-4 ${isMapActive ? 'text-emerald-400' : 'text-slate-400'}`} />
            <span className="hidden md:inline">{isMapActive ? 'Hide Map' : 'Explore Map'}</span>
            <span className="md:hidden">Map</span>
          </button>

          {/* Bookmarks Drawer Trigger */}
          <button
            id="saved-bookmarks-btn"
            onClick={onOpenBookmarks}
            className="relative flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
            title="View Saved Places"
          >
            <Bookmark className="w-4 h-4 text-emerald-400" />
            <span className="hidden md:inline">Saved</span>
            {bookmarksCount > 0 && (
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-emerald-500 text-slate-950 rounded-full">
                {bookmarksCount}
              </span>
            )}
          </button>

          {/* Mobile Directory Quick Button */}
          <button
            id="emergency-directory-btn"
            onClick={onOpenDirectory}
            className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 transition-colors"
            title="Parkland Emergency & Directory"
          >
            <PhoneCall className="w-4 h-4 text-emerald-400" />
          </button>
        </div>
      </div>
    </header>
  );
};
