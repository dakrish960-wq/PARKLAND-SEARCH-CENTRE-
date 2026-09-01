import React from 'react';
import { 
  X, 
  Bookmark, 
  Trash2, 
  ArrowUpRight, 
  MapPin, 
  Clock, 
  Printer,
  Sparkles
} from 'lucide-react';
import { ParklandItem } from '../types';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedItems: ParklandItem[];
  onSelectItem: (item: ParklandItem) => void;
  onRemoveBookmark: (item: ParklandItem) => void;
  onClearAll: () => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  savedItems,
  onSelectItem,
  onRemoveBookmark,
  onClearAll,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-md bg-slate-900 border-l border-emerald-900/40 h-full flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Bookmark className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base font-heading">
                My Saved Parkland Places
              </h3>
              <p className="text-xs text-slate-400">
                {savedItems.length} {savedItems.length === 1 ? 'place' : 'places'} saved
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action micro-bar */}
        {savedItems.length > 0 && (
          <div className="px-4 py-2 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" /> Print list
            </button>
            <button
              onClick={onClearAll}
              className="text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear all
            </button>
          </div>
        )}

        {/* Bookmarked Items List */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {savedItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 text-slate-500">
              <Bookmark className="w-12 h-12 stroke-[1.5] text-slate-700" />
              <p className="text-sm text-slate-400 font-medium">
                No saved places yet
              </p>
              <p className="text-xs text-slate-500 max-w-xs">
                Click the bookmark icon on any Parkland park, school, trail, or facility card to save it here for quick access.
              </p>
            </div>
          ) : (
            savedItems.map((item) => (
              <div
                key={item.id}
                className="group relative bg-slate-950 border border-slate-800 hover:border-emerald-500/40 rounded-xl p-3.5 transition-all flex items-start justify-between gap-3 shadow-md"
              >
                <div 
                  className="space-y-1 cursor-pointer flex-1"
                  onClick={() => {
                    onSelectItem(item);
                    onClose();
                  }}
                >
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                    {item.categoryLabel}
                  </span>
                  <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                    <span className="line-clamp-1">{item.address}</span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                  <button
                    onClick={() => onRemoveBookmark(item)}
                    className="p-1 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                    title="Remove from bookmarks"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      onSelectItem(item);
                      onClose();
                    }}
                    className="p-1 text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
                    title="View details"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
          >
            Close Saved Places
          </button>
        </div>
      </div>
    </div>
  );
};
