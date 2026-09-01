import React from 'react';
import { 
  SunMedium, 
  Wind, 
  Droplets, 
  Compass, 
  Sunset, 
  ShieldCheck, 
  Trees
} from 'lucide-react';
import { WeatherCondition } from '../types';

interface WeatherWidgetProps {
  weather: WeatherCondition;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ weather }) => {
  return (
    <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 border border-emerald-900/40 rounded-2xl p-4 sm:p-5 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left main condition */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <SunMedium className="w-8 h-8 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                {weather.temp}°F
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                {weather.condition}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Live Parkland microclimate & outdoor park conditions
            </p>
          </div>
        </div>

        {/* Condition parameters grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-xs">
          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
            <Trees className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <span className="text-slate-400 text-[10px] block">Trail Surface</span>
              <span className="text-white font-bold">{weather.trailStatus}</span>
            </div>
          </div>

          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
            <Wind className="w-4 h-4 text-sky-400 shrink-0" />
            <div>
              <span className="text-slate-400 text-[10px] block">Wind Speed</span>
              <span className="text-white font-bold">{weather.windSpeed}</span>
            </div>
          </div>

          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
            <Droplets className="w-4 h-4 text-blue-400 shrink-0" />
            <div>
              <span className="text-slate-400 text-[10px] block">Humidity</span>
              <span className="text-white font-bold">{weather.humidity}%</span>
            </div>
          </div>

          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
            <Sunset className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <span className="text-slate-400 text-[10px] block">Sunset Time</span>
              <span className="text-white font-bold">{weather.sunset}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
