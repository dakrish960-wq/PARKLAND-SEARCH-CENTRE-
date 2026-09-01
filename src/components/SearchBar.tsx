import React from 'react';
import { 
  Search, 
  X, 
  SlidersHorizontal, 
  RotateCcw, 
  MapPin, 
  Check, 
  Sparkles,
  TreePine,
  Dog,
  Trophy,
  GraduationCap,
  Building2,
  Calendar,
  FileText,
  Utensils
} from 'lucide-react';
import { ParklandCategory } from '../types';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: ParklandCategory;
  onCategorySelect: (category: ParklandCategory) => void;
  selectedAmenities: string[];
  onToggleAmenity: (amenity: string) => void;
  sortBy: 'relevance' | 'rating' | 'name';
  onSortChange: (sort: 'relevance' | 'rating' | 'name') => void;
  onResetFilters: () => void;
  totalResults: number;
}

const CATEGORIES: { id: ParklandCategory; label: string; icon: any }[] = [
  { id: 'all', label: 'All Parkland Info', icon: Sparkles },
  { id: 'parks-nature', label: 'Parks & Nature', icon: TreePine },
  { id: 'equestrian-trails', label: 'Equestrian & Trails', icon: MapPin },
  { id: 'sports-recreation', label: 'Sports & Courts', icon: Trophy },
  { id: 'pet-parks', label: 'Dog Parks & Pets', icon: Dog },
  { id: 'schools-education', label: 'Schools & Library', icon: GraduationCap },
  { id: 'city-services', label: 'City & Public Safety', icon: Building2 },
  { id: 'events-markets', label: 'Events & Markets', icon: Calendar },
  { id: 'rules-permits', label: 'Rules & Permits', icon: FileText },
  { id: 'dining-lifestyle', label: 'Dining & Lifestyle', icon: Utensils },
];

const POPULAR_AMENITIES = [
  'Lighted Courts',
  'Pickleball',
  'Zero-Depth Splash Pad',
  'Dog Friendly',
  '2 Regulation Riding Arenas',
  'Synthetic Turf Fields',
  'Amphitheater',
  'Fishing Pier',
  'Children’s Story Castle',
  'Free Wi-Fi',
  'Pavilion Rentals',
  'Restrooms',
];

const QUICK_TRENDING_SEARCHES = [
  'Pine Trails Park',
  'Barkland Dog Park',
  'Pickleball Courts',
  'Equestrian Center',
  'Splash Pad',
  'Covered Bridge',
  'Farmers Market',
  'Marjory Stoneman Douglas',
  'Alligator Rules',
  'Pavilion Rental',
];

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategorySelect,
  selectedAmenities,
  onToggleAmenity,
  sortBy,
  onSortChange,
  onResetFilters,
  totalResults,
}) => {
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  return (
    <div className="w-full space-y-4">
      {/* Primary Search Input Card */}
      <div className="relative bg-slate-900/90 rounded-2xl border border-emerald-900/40 p-3 sm:p-4 shadow-xl backdrop-blur-md">
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-emerald-400 pointer-events-none" />
          <input
            id="parkland-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search parks, trails, sports fields, schools, rules, events or addresses..."
            className="w-full pl-12 pr-28 py-3.5 sm:py-4 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm sm:text-base font-medium transition-all"
          />

          <div className="absolute right-2.5 flex items-center gap-1.5">
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                title="Clear Search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`p-2 sm:px-3 sm:py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                showAdvanced || selectedAmenities.length > 0
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
              title="Filter by Amenities"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
              {selectedAmenities.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-bold flex items-center justify-center">
                  {selectedAmenities.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Quick Trending Keyword Pills */}
        <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 text-xs text-slate-400 no-scrollbar">
          <span className="whitespace-nowrap font-semibold text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-400" /> Popular:
          </span>
          {QUICK_TRENDING_SEARCHES.map((tag) => (
            <button
              key={tag}
              onClick={() => onSearchChange(tag)}
              className={`whitespace-nowrap px-2.5 py-1 rounded-full text-xs transition-colors cursor-pointer border ${
                searchQuery.toLowerCase() === tag.toLowerCase()
                  ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400'
                  : 'bg-slate-950/60 hover:bg-slate-800 text-slate-300 border-slate-800'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Advanced Amenities Filter Accordion */}
        {showAdvanced && (
          <div className="mt-4 pt-4 border-t border-slate-800 space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Filter by Specific Amenities & Features
              </span>
              {(selectedAmenities.length > 0 || searchQuery || selectedCategory !== 'all') && (
                <button
                  onClick={onResetFilters}
                  className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Reset all filters
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {POPULAR_AMENITIES.map((amenity) => {
                const isSelected = selectedAmenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    onClick={() => onToggleAmenity(amenity)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm shadow-emerald-950'
                        : 'bg-slate-950/70 hover:bg-slate-800 text-slate-300 border-slate-800'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-emerald-400" />}
                    {amenity}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Category Filter Pills & Sort Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Scrollable Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1.5 sm:pb-0 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onCategorySelect(cat.id)}
                className={`whitespace-nowrap px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-950 font-bold'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : 'text-emerald-400'}`} />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Results count & Sort dropdown */}
        <div className="flex items-center justify-between w-full sm:w-auto gap-3 text-xs text-slate-400 border-t sm:border-t-0 border-slate-800 pt-2 sm:pt-0">
          <span className="font-semibold text-slate-300">
            {totalResults} {totalResults === 1 ? 'Result' : 'Results'} found
          </span>

          <div className="flex items-center gap-1.5">
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as any)}
              className="bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="relevance">Most Relevant</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
