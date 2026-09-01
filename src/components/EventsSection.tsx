import React from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Sparkles, 
  CheckCircle2,
  Tag
} from 'lucide-react';
import { UPCOMING_EVENTS } from '../data/parklandData';

interface EventsSectionProps {
  onSearchCategory: (cat: string) => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ onSearchCategory }) => {
  return (
    <div className="bg-slate-900/90 rounded-2xl border border-emerald-900/40 p-5 sm:p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-heading">
              Upcoming Parkland Community Events & Concerts
            </h3>
            <p className="text-xs text-slate-400">
              Farmers markets, Eats 'n' Beats amphitheater concerts & sports openings
            </p>
          </div>
        </div>

        <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/30">
          Official Community Schedule
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
        {UPCOMING_EVENTS.map((event) => (
          <div
            key={event.id}
            className="bg-slate-950/70 border border-slate-800 hover:border-purple-500/40 rounded-xl p-4 transition-all flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  {event.category}
                </span>
                <span className="text-emerald-400 font-bold text-xs flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {event.admission}
                </span>
              </div>

              <h4 className="text-base font-bold text-white leading-tight">
                {event.name}
              </h4>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                {event.description}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800/80 space-y-1 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span className="font-semibold text-slate-200">{event.date}</span>
                <span className="text-slate-500">•</span>
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span className="line-clamp-1">{event.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
