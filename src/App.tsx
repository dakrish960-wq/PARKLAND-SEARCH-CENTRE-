import React, { useState, useMemo, useEffect } from 'react';
import { 
  Header 
} from './components/Header';
import { 
  SearchBar 
} from './components/SearchBar';
import { 
  ParklandCard 
} from './components/ParklandCard';
import { 
  InteractiveParklandMap 
} from './components/InteractiveParklandMap';
import { 
  ParklandDetailModal 
} from './components/ParklandDetailModal';
import { 
  AIAssistantModal 
} from './components/AIAssistantModal';
import { 
  DirectoryModal 
} from './components/DirectoryModal';
import { 
  BookmarksDrawer 
} from './components/BookmarksDrawer';
import { 
  WeatherWidget 
} from './components/WeatherWidget';
import { 
  EventsSection 
} from './components/EventsSection';
import { 
  FAQSection 
} from './components/FAQSection';
import { 
  PARKLAND_ITEMS, 
  PARKLAND_WEATHER 
} from './data/parklandData';
import { 
  ParklandItem, 
  ParklandCategory 
} from './types';
import { 
  Search, 
  Sparkles, 
  Trees, 
  MapPin, 
  PhoneCall, 
  Compass, 
  RotateCcw,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ParklandCategory>('all');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'name'>('relevance');

  const [selectedItem, setSelectedItem] = useState<ParklandItem | null>(null);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);

  // Bookmarks Local Storage state
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('parkland_saved_places');
      return saved ? JSON.parse(saved) : ['pine-trails-park', 'barkland-dog-park'];
    } catch {
      return ['pine-trails-park', 'barkland-dog-park'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('parkland_saved_places', JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.warn('Unable to persist bookmarks to localStorage', e);
    }
  }, [bookmarkedIds]);

  const toggleBookmark = (item: ParklandItem) => {
    setBookmarkedIds((prev) =>
      prev.includes(item.id) ? prev.filter((id) => id !== item.id) : [...prev, item.id]
    );
  };

  const clearAllBookmarks = () => {
    setBookmarkedIds([]);
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedAmenities([]);
    setSortBy('relevance');
  };

  // Filtered and Sorted Parkland Results
  const filteredItems = useMemo(() => {
    return PARKLAND_ITEMS.filter((item) => {
      // Category check
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Amenities check (must include all selected amenities)
      if (selectedAmenities.length > 0) {
        const matchesAmenities = selectedAmenities.every((selectedAmenity) =>
          item.amenities.some((a) => a.toLowerCase().includes(selectedAmenity.toLowerCase()))
        );
        if (!matchesAmenities) return false;
      }

      // Search Query check (fuzzy matching across title, tagline, description, address, amenities, rules)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesText =
          item.title.toLowerCase().includes(q) ||
          item.tagline.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.address.toLowerCase().includes(q) ||
          item.neighborhood.toLowerCase().includes(q) ||
          item.categoryLabel.toLowerCase().includes(q) ||
          item.amenities.some((a) => a.toLowerCase().includes(q)) ||
          item.features.some((f) => f.toLowerCase().includes(q)) ||
          item.rules.some((r) => r.toLowerCase().includes(q));

        if (!matchesText) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.title.localeCompare(b.title);
      // default: relevance (prioritizing popular places)
      if (a.isPopular && !b.isPopular) return -1;
      if (!a.isPopular && b.isPopular) return 1;
      return b.reviewsCount - a.reviewsCount;
    });
  }, [selectedCategory, selectedAmenities, searchQuery, sortBy]);

  const savedItems = useMemo(() => {
    return PARKLAND_ITEMS.filter((item) => bookmarkedIds.includes(item.id));
  }, [bookmarkedIds]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Header */}
      <Header
        weather={PARKLAND_WEATHER}
        bookmarksCount={savedItems.length}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenDirectory={() => setIsDirectoryOpen(true)}
        onOpenAIModal={() => setIsAIModalOpen(true)}
        onOpenMap={() => setIsMapVisible(!isMapVisible)}
        isMapActive={isMapVisible}
        totalParksCount={PARKLAND_ITEMS.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Hero Parkland Introduction & Quick Stat Cards */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-emerald-950/60 via-slate-900/90 to-slate-950 border border-emerald-900/40 p-6 sm:p-10 shadow-2xl">
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
              <Trees className="w-3.5 h-3.5 text-emerald-400" />
              Official Parkland Community Search Hub
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-heading">
              Everything in Parkland, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">
                Searched & Discovered.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Instantly find comprehensive details on all Parkland city parks, 32+ miles of equestrian & cycling trails, tennis & pickleball courts, top-rated schools, splash pads, community concert events, and municipal guidelines.
            </p>

            {/* Quick Metrics Bar */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <span className="text-xl sm:text-2xl font-black text-emerald-400 block font-heading">
                  18+
                </span>
                <span className="text-slate-400 font-medium">Public Parks & Preserves</span>
              </div>

              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <span className="text-xl sm:text-2xl font-black text-teal-400 block font-heading">
                  32+
                </span>
                <span className="text-slate-400 font-medium">Miles of Greenway Trails</span>
              </div>

              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <span className="text-xl sm:text-2xl font-black text-amber-400 block font-heading">
                  100%
                </span>
                <span className="text-slate-400 font-medium">Free Public Park Entry</span>
              </div>

              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <span className="text-xl sm:text-2xl font-black text-indigo-400 block font-heading">
                  A+
                </span>
                <span className="text-slate-400 font-medium">Top Rated Public Schools</span>
              </div>
            </div>
          </div>
        </section>

        {/* Primary Search and Filter Engine */}
        <section id="search-section">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            selectedAmenities={selectedAmenities}
            onToggleAmenity={toggleAmenity}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onResetFilters={handleResetFilters}
            totalResults={filteredItems.length}
          />
        </section>

        {/* Optional Interactive Map Drawer */}
        {isMapVisible && (
          <section className="animate-fadeIn">
            <InteractiveParklandMap
              items={PARKLAND_ITEMS}
              selectedItem={selectedItem}
              onSelectItem={(item) => setSelectedItem(item)}
              onClose={() => setIsMapVisible(false)}
            />
          </section>
        )}

        {/* Parkland Search Results Grid */}
        <section className="space-y-4">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <ParklandCard
                  key={item.id}
                  item={item}
                  onSelect={(selected) => setSelectedItem(selected)}
                  isBookmarked={bookmarkedIds.includes(item.id)}
                  onToggleBookmark={toggleBookmark}
                />
              ))}
            </div>
          ) : (
            /* No Results Found State */
            <div className="bg-slate-900/60 rounded-3xl border border-slate-800 p-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto text-slate-500">
                <Search className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-heading">
                  No matching Parkland listings found for "{searchQuery}"
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                  Try adjusting your keywords, resetting your amenity filters, or ask our Parkland AI Assistant.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset all filters
                </button>
                <button
                  onClick={() => setIsAIModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Ask Parkland AI
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Live Weather & Trail Conditions */}
        <section>
          <WeatherWidget weather={PARKLAND_WEATHER} />
        </section>

        {/* Upcoming Parkland Events & Concerts */}
        <section>
          <EventsSection onSearchCategory={(cat) => setSelectedCategory(cat as any)} />
        </section>

        {/* Parkland FAQs & Rules Accordion */}
        <section>
          <FAQSection />
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-slate-950 border-t border-slate-900 py-10 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-900">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Trees className="w-4 h-4" />
                </div>
                <span className="text-base font-extrabold text-white font-heading">
                  PARKLAND <span className="text-emerald-400">🔍SEARCH CENTRE</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 max-w-md">
                Official English-language search portal for exploring parks, equestrian facilities, schools, and city services in Parkland, Broward County, Florida.
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => setIsAIModalOpen(true)}
                className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Ask Parkland AI
              </button>
              <button
                onClick={() => setIsDirectoryOpen(true)}
                className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                Emergency Hotline Directory
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
            <p>© {new Date().getFullYear()} PARKLAND SEARCH CENTRE. All Parkland municipal data, park coordinates, and schedules verified.</p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-emerald-500">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Free Public Access
              </span>
              <span>•</span>
              <a 
                href="https://www.cityofparkland.org" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-emerald-400 transition-colors"
              >
                City of Parkland Official
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <ParklandDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        isBookmarked={selectedItem ? bookmarkedIds.includes(selectedItem.id) : false}
        onToggleBookmark={toggleBookmark}
      />

      <AIAssistantModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
      />

      <DirectoryModal
        isOpen={isDirectoryOpen}
        onClose={() => setIsDirectoryOpen(false)}
      />

      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        savedItems={savedItems}
        onSelectItem={(item) => setSelectedItem(item)}
        onRemoveBookmark={toggleBookmark}
        onClearAll={clearAllBookmarks}
      />
    </div>
  );
}
