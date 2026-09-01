import React, { useState } from 'react';
import { 
  MapPin, 
  Layers, 
  Maximize2, 
  ExternalLink, 
  Info, 
  TreePine, 
  Dog, 
  Trophy, 
  GraduationCap, 
  Building2,
  X
} from 'lucide-react';
import { ParklandItem, ParklandCategory } from '../types';

interface InteractiveMapProps {
  items: ParklandItem[];
  selectedItem: ParklandItem | null;
  onSelectItem: (item: ParklandItem) => void;
  onClose?: () => void;
}

export const InteractiveParklandMap: React.FC<InteractiveMapProps> = ({
  items,
  selectedItem,
  onSelectItem,
  onClose,
}) => {
  const [mapCategory, setMapCategory] = useState<ParklandCategory>('all');
  const [hoveredItem, setHoveredItem] = useState<ParklandItem | null>(null);

  const filteredItems = items.filter(
    (item) => mapCategory === 'all' || item.category === mapCategory
  );

  const getPinColor = (cat: ParklandCategory) => {
    switch (cat) {
      case 'parks-nature':
        return 'bg-emerald-500 text-slate-950 border-emerald-300';
      case 'pet-parks':
        return 'bg-amber-500 text-slate-950 border-amber-300';
      case 'equestrian-trails':
        return 'bg-teal-400 text-slate-950 border-teal-200';
      case 'sports-recreation':
        return 'bg-sky-500 text-slate-950 border-sky-300';
      case 'schools-education':
        return 'bg-indigo-400 text-slate-950 border-indigo-200';
      case 'city-services':
        return 'bg-rose-500 text-white border-rose-300';
      case 'events-markets':
        return 'bg-purple-500 text-white border-purple-300';
      default:
        return 'bg-emerald-400 text-slate-950 border-white';
    }
  };

  return (
    <div className="relative bg-slate-900 rounded-2xl border border-emerald-900/40 p-4 shadow-2xl overflow-hidden">
      {/* Map Control Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white font-heading">
              Interactive Parkland Exploration & Facility Map
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            Click any interactive marker to inspect facility amenities, coordinates, and operating hours.
          </p>
        </div>

        {/* Category Filter Pills on Map */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setMapCategory('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              mapCategory === 'all' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'
            }`}
          >
            All Pins ({items.length})
          </button>
          <button
            onClick={() => setMapCategory('parks-nature')}
            className={`px-2 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
              mapCategory === 'parks-nature' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Parks
          </button>
          <button
            onClick={() => setMapCategory('sports-recreation')}
            className={`px-2 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
              mapCategory === 'sports-recreation' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Sports
          </button>
          <button
            onClick={() => setMapCategory('schools-education')}
            className={`px-2 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
              mapCategory === 'schools-education' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Schools & Library
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              title="Close Map"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Map Graphic Canvas Simulation */}
      <div className="relative mt-4 w-full h-[360px] sm:h-[440px] bg-slate-950 rounded-xl border border-slate-800 overflow-hidden select-none">
        {/* Background Grid & Compass Styling */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:32px_32px] opacity-30" />

        {/* Everglades Buffer on West */}
        <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-emerald-950/60 to-transparent border-r border-emerald-900/30 flex items-center justify-center pointer-events-none">
          <span className="text-[10px] uppercase font-extrabold tracking-widest text-emerald-500/40 -rotate-90 whitespace-nowrap">
            Everglades Conservation Buffer
          </span>
        </div>

        {/* Major Parkland Arterials Simulation (Roads) */}
        {/* Holmberg Road (East-West) */}
        <div className="absolute left-16 right-8 top-[52%] h-1 bg-slate-800 flex items-center justify-end pr-2 pointer-events-none">
          <span className="text-[9px] font-bold text-slate-500 bg-slate-950/80 px-1 rounded">Holmberg Rd</span>
        </div>
        {/* Trails End (East-West North) */}
        <div className="absolute left-16 right-20 top-[38%] h-0.5 bg-slate-800/80 pointer-events-none flex items-center justify-center">
          <span className="text-[8px] font-medium text-slate-600 bg-slate-950/90 px-1">Trails End</span>
        </div>
        {/* Parkside Dr (East-West South) */}
        <div className="absolute left-16 right-16 top-[68%] h-0.5 bg-slate-800/80 pointer-events-none flex items-center justify-center">
          <span className="text-[8px] font-medium text-slate-600 bg-slate-950/90 px-1">Parkside Dr</span>
        </div>
        {/* University Dr (North-South Center) */}
        <div className="absolute top-6 bottom-6 left-[50%] w-1 bg-slate-800 flex flex-col justify-start pt-2 items-center pointer-events-none">
          <span className="text-[9px] font-bold text-slate-500 bg-slate-950/80 px-1 rounded -rotate-90 mt-4">University Dr</span>
        </div>
        {/* Pine Island Rd (North-South West) */}
        <div className="absolute top-6 bottom-6 left-[30%] w-0.5 bg-slate-800/80 pointer-events-none" />
        {/* State Road 7 / US 441 (East Boundary) */}
        <div className="absolute top-4 bottom-4 right-4 w-1 bg-slate-800 pointer-events-none flex flex-col items-center pt-4">
          <span className="text-[9px] font-bold text-slate-500 bg-slate-950/80 px-1 rounded -rotate-90">SR 7 (US 441)</span>
        </div>

        {/* Legend Badge in Map Corner */}
        <div className="absolute top-3 left-20 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-lg p-2 text-[10px] text-slate-300 space-y-1 shadow-lg pointer-events-none">
          <div className="font-bold text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Parkland City Bounds (FL 33067 / 33076)
          </div>
          <div className="text-slate-400">Total Area: 12.8 sq mi | 32+ Miles Trails</div>
        </div>

        {/* Interactive Location Pins */}
        {filteredItems.map((item) => {
          const isSelected = selectedItem?.id === item.id;
          const isHovered = hoveredItem?.id === item.id;
          const pinColor = getPinColor(item.category);

          return (
            <div
              key={item.id}
              style={{
                left: `${item.coordinates.mapX}%`,
                top: `${item.coordinates.mapY}%`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <button
                onClick={() => onSelectItem(item)}
                className={`group relative flex items-center justify-center p-2 rounded-full border-2 shadow-lg transition-all duration-200 cursor-pointer ${pinColor} ${
                  isSelected || isHovered
                    ? 'scale-125 ring-4 ring-emerald-400/50 z-30'
                    : 'hover:scale-110'
                }`}
                title={item.title}
              >
                <MapPin className="w-3.5 h-3.5 fill-current" />
              </button>

              {/* Pin Label Tooltip */}
              {(isHovered || isSelected) && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-slate-900 border border-emerald-500/50 rounded-xl p-2.5 shadow-2xl text-left pointer-events-auto z-40 animate-fadeIn">
                  <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                    {item.categoryLabel}
                  </div>
                  <div className="text-xs font-bold text-white line-clamp-1 mt-0.5">
                    {item.title}
                  </div>
                  <div className="text-[10px] text-slate-300 mt-1 line-clamp-1">
                    {item.address}
                  </div>
                  <div className="mt-2 flex items-center justify-between pt-1.5 border-t border-slate-800 text-[10px]">
                    <span className="text-amber-300 font-bold">★ {item.rating}</span>
                    <button
                      onClick={() => onSelectItem(item)}
                      className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-0.5 cursor-pointer"
                    >
                      Inspect <ExternalLink className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Map Footer Helper */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 pt-1">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Parks & Nature
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Dog Park
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500" /> Sports & Courts
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" /> Schools & Library
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400" /> Equestrian
          </span>
        </div>
        <span className="text-slate-500 italic">Coordinates accurate to Parkland, FL municipal boundaries</span>
      </div>
    </div>
  );
};
