import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Globe, 
  Star, 
  Bookmark, 
  Share2, 
  ShieldAlert, 
  Check, 
  Navigation, 
  Calendar,
  Sparkles,
  Info,
  Trees
} from 'lucide-react';
import { ParklandItem } from '../types';

interface ParklandDetailModalProps {
  item: ParklandItem | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (item: ParklandItem) => void;
}

export const ParklandDetailModal: React.FC<ParklandDetailModalProps> = ({
  item,
  onClose,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [copied, setCopied] = useState(false);

  if (!item) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(
      `${item.title} - Parkland Search Centre: ${item.address}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getGoogleMapsUrl = () => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      item.title + ' ' + item.address
    )}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-slate-900 border border-emerald-900/50 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/80 hover:bg-slate-950 text-slate-300 hover:text-white backdrop-blur-md transition-colors cursor-pointer"
          title="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Media Banner */}
        <div className="relative h-64 sm:h-72 w-full bg-slate-950 shrink-0">
          <img
            src={item.image}
            alt={item.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

          {/* Floating Category & Badges */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1.5">
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-500 text-slate-950 shadow-md">
                  {item.categoryLabel}
                </span>
                {item.badge && (
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-slate-950/90 text-emerald-300 border border-emerald-500/40">
                    {item.badge}
                  </span>
                )}
                <span className="px-2 py-0.5 rounded text-xs bg-slate-950/80 text-amber-300 flex items-center gap-1 font-bold">
                  <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                  {item.rating} ({item.reviewsCount} reviews)
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading tracking-tight leading-snug">
                {item.title}
              </h2>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => onToggleBookmark(item)}
                className={`p-2.5 rounded-xl backdrop-blur-md transition-colors cursor-pointer shadow-lg ${
                  isBookmarked
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'bg-slate-950/80 hover:bg-slate-950 text-slate-200'
                }`}
                title={isBookmarked ? 'Saved in bookmarks' : 'Save this location'}
              >
                <Bookmark className="w-5 h-5 fill-current" />
              </button>

              <button
                onClick={handleShare}
                className="p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-950 text-slate-200 backdrop-blur-md transition-colors cursor-pointer shadow-lg"
                title="Share Info"
              >
                {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-sm text-slate-300 flex-1">
          {/* Quick Essential Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-semibold text-slate-400 block">Address & Neighborhood</span>
                <span className="text-white font-medium">{item.address}</span>
                <span className="text-xs text-emerald-400 block mt-0.5">{item.neighborhood}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-semibold text-slate-400 block">Operating Hours</span>
                <span className="text-white font-medium">{item.hours}</span>
                <span className="text-xs text-emerald-300/80 block mt-0.5">
                  Admission: {item.admission}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="text-xs font-semibold text-slate-400 block">Contact Phone</span>
                <a href={`tel:${item.phone.replace(/[^0-9]/g, '')}`} className="text-white font-medium hover:text-emerald-400 transition-colors">
                  {item.phone}
                </a>
              </div>
            </div>

            {item.contactEmail && (
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-xs font-semibold text-slate-400 block">Direct Inquiries</span>
                  <a href={`mailto:${item.contactEmail}`} className="text-emerald-400 font-medium hover:underline">
                    {item.contactEmail}
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Full Description */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-emerald-400" />
              Comprehensive Information
            </h3>
            <p className="text-slate-300 leading-relaxed text-sm bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/80">
              {item.fullDetails}
            </p>
          </div>

          {/* Best Time to Visit */}
          {item.bestTimeToVisit && (
            <div className="bg-emerald-950/30 border border-emerald-900/50 rounded-xl p-3.5 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block">
                  Recommended Time to Visit
                </span>
                <p className="text-xs text-slate-300 mt-0.5">
                  {item.bestTimeToVisit}
                </p>
              </div>
            </div>
          )}

          {/* Amenities & Facilities Badges */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Trees className="w-4 h-4 text-emerald-400" />
              Amenities & On-Site Facilities
            </h3>
            <div className="flex flex-wrap gap-2">
              {item.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-950 text-emerald-300 border border-emerald-900/40 flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          {/* Key Special Features */}
          {item.features && item.features.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Highlights & Features
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {item.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Rules and City Ordinances */}
          {item.rules && item.rules.length > 0 && (
            <div className="bg-amber-950/20 border border-amber-900/40 rounded-xl p-4 space-y-2">
              <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                Parkland Rules & Visitor Guidelines
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {item.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition-colors cursor-pointer"
          >
            Close
          </button>

          <a
            href={getGoogleMapsUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-950 transition-all cursor-pointer"
          >
            <Navigation className="w-4 h-4" />
            Get Driving Directions
          </a>
        </div>
      </div>
    </div>
  );
};
