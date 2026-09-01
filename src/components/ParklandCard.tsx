import React from 'react';
import { 
  Star, 
  MapPin, 
  Clock, 
  Bookmark, 
  ArrowUpRight, 
  Phone, 
  Trees,
  CheckCircle2
} from 'lucide-react';
import { ParklandItem } from '../types';

interface ParklandCardProps {
  item: ParklandItem;
  onSelect: (item: ParklandItem) => void;
  isBookmarked: boolean;
  onToggleBookmark: (item: ParklandItem) => void;
}

export const ParklandCard: React.FC<ParklandCardProps> = ({
  item,
  onSelect,
  isBookmarked,
  onToggleBookmark,
}) => {
  return (
    <div className="group relative bg-slate-900/90 rounded-2xl border border-slate-800/80 hover:border-emerald-500/50 shadow-lg hover:shadow-2xl hover:shadow-emerald-950/40 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Top Media Image Banner */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-950">
        <img
          src={item.image}
          alt={item.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30 shadow-sm">
              {item.categoryLabel}
            </span>
            {item.badge && (
              <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-500 text-slate-950 shadow-sm">
                {item.badge}
              </span>
            )}
          </div>

          {/* Bookmark Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(item);
            }}
            className={`p-2 rounded-xl backdrop-blur-md transition-all cursor-pointer shadow-md ${
              isBookmarked
                ? 'bg-emerald-500 text-slate-950'
                : 'bg-slate-950/70 hover:bg-slate-950 text-slate-300 hover:text-emerald-400'
            }`}
            title={isBookmarked ? 'Remove from Saved' : 'Save to My Parkland List'}
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>
        </div>

        {/* Rating & Live Status Bar */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
          <div className="flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-800">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="ml-1 font-bold text-white">{item.rating}</span>
            </div>
            <span className="text-slate-400 text-[10px]">({item.reviewsCount} reviews)</span>
          </div>

          <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[11px]">
            <span className={`w-2 h-2 rounded-full ${item.isOpenNow ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span className={item.isOpenNow ? 'text-emerald-300 font-semibold' : 'text-amber-300 font-semibold'}>
              {item.isOpenNow ? 'Open Now' : 'Check Schedule'}
            </span>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 
            onClick={() => onSelect(item)}
            className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors cursor-pointer line-clamp-1 font-heading"
          >
            {item.title}
          </h3>
          <p className="text-xs text-emerald-300/90 font-medium mt-0.5 line-clamp-1">
            {item.tagline}
          </p>

          <p className="text-xs text-slate-400 mt-2.5 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Metadata Details (Address, Hours) */}
        <div className="space-y-1.5 pt-2 border-t border-slate-800/80 text-xs text-slate-300">
          <div className="flex items-start gap-2">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
            <span className="line-clamp-1 text-slate-300">{item.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="line-clamp-1 text-slate-400">{item.hours}</span>
          </div>
        </div>

        {/* Key Amenities preview */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {item.amenities.slice(0, 3).map((amenity) => (
            <span
              key={amenity}
              className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-950 text-slate-300 border border-slate-800"
            >
              {amenity}
            </span>
          ))}
          {item.amenities.length > 3 && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-400">
              +{item.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-2 flex items-center justify-between gap-2">
          <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {item.admission.includes('Free') ? 'Free Public Access' : 'Verified Facility'}
          </span>

          <button
            onClick={() => onSelect(item)}
            className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 font-semibold text-xs border border-emerald-500/30 hover:border-emerald-500 transition-all cursor-pointer"
          >
            Details <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
