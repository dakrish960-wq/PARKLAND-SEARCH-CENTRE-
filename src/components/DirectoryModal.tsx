import React, { useState } from 'react';
import { 
  X, 
  PhoneCall, 
  ShieldAlert, 
  Building, 
  Flame, 
  Trees, 
  BookOpen, 
  MapPin, 
  Clock, 
  Mail,
  Search,
  Check
} from 'lucide-react';
import { PARKLAND_DIRECTORIES } from '../data/parklandData';

interface DirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DirectoryModal: React.FC<DirectoryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  if (!isOpen) return null;

  const filtered = PARKLAND_DIRECTORIES.filter((d) =>
    d.department.toLowerCase().includes(filterQuery.toLowerCase()) ||
    d.address.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-slate-900 border border-emerald-900/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-heading">
                Parkland Emergency & City Services Directory
              </h3>
              <p className="text-xs text-slate-400">
                Official contact numbers, emergency hotlines, and municipal offices
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

        {/* Emergency Alert Banner */}
        <div className="bg-rose-950/40 border-b border-rose-900/40 p-3 sm:px-5 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-rose-200">
            <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
            <span>
              <strong>Immediate Life Threatening Emergency:</strong> Dial <strong>911</strong> directly for Fire Rescue or Police Dispatch.
            </span>
          </div>
          <a
            href="tel:911"
            className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shrink-0"
          >
            Call 911
          </a>
        </div>

        {/* Search within Directory */}
        <div className="p-4 bg-slate-950/50 border-b border-slate-800">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Search departments, parks, permits, fire, police..."
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Directory List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3 flex-1">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-950/70 border border-slate-800/90 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-emerald-500/40 transition-colors"
            >
              <div className="space-y-1">
                <h4 className="font-bold text-white text-sm sm:text-base">
                  {item.department}
                </h4>
                <div className="flex items-center gap-3 text-xs text-slate-400 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    {item.hours}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {item.address}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                <a
                  href={`tel:${item.phone.replace(/[^0-9]/g, '')}`}
                  className="px-3.5 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 font-bold text-xs border border-emerald-500/30 transition-all flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  {item.phone}
                </a>

                <button
                  onClick={() => handleCopyPhone(item.phone)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                  title="Copy Number"
                >
                  {copiedPhone === item.phone ? <Check className="w-4 h-4 text-emerald-400" /> : 'Copy'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-950 border-t border-slate-800 text-center text-xs text-slate-500">
          City of Parkland, Florida Municipal Government • Parkland Search Centre
        </div>
      </div>
    </div>
  );
};
