import React, { useEffect, useState } from 'react';
import { User, StylingResult } from '../types';
import { Button } from '../components/Button';
import { ArrowLeft, Clock } from 'lucide-react';

interface HistoryProps {
  user: User | null;
  onSelectResult: (result: StylingResult) => void;
  onBack: () => void;
}

export const History: React.FC<HistoryProps> = ({ user, onSelectResult, onBack }) => {
  const [history, setHistory] = useState<StylingResult[]>([]);

  useEffect(() => {
    if (user) {
      const historyStr = localStorage.getItem(`history_${user.id}`);
      if (historyStr) {
        setHistory(JSON.parse(historyStr));
      }
    }
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 md:py-12">
      <div className="flex items-center justify-between mb-10">
        <Button variant="ghost" onClick={onBack} className="pl-0 hover:bg-transparent hover:text-[#C1A17C]">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </Button>
        <h1 className="text-3xl font-serif font-bold text-[#2D2D2D]">Your Style Archive</h1>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-32 bg-white rounded-[2rem] border border-[#F0EFE9] shadow-sm">
          <Clock className="h-16 w-16 text-[#E0E0E0] mx-auto mb-6" />
          <h3 className="text-2xl font-serif font-bold text-[#2D2D2D] mb-3">No Styles Yet</h3>
          <p className="text-[#888888] font-light">Your personal fashion journey begins with your first upload.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {history.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-[2rem] border border-[#F0EFE9] overflow-hidden shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] transition-all duration-300 cursor-pointer group hover:-translate-y-1"
              onClick={() => onSelectResult(item)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={item.userImage} alt="User" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <div className="absolute bottom-4 left-6 pr-4">
                  <p className="text-white font-medium text-sm backdrop-blur-sm bg-black/20 px-3 py-1 rounded-full inline-block mb-1">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                  <p className="text-white/90 text-xs font-light tracking-wide uppercase truncate">
                    {item.eventDetails ? item.eventDetails : item.occasion} • {item.gender}
                  </p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex space-x-3 mb-4">
                  <div className="h-6 w-6 rounded-full shadow-md ring-2 ring-white" style={{ backgroundColor: item.colorPalette.primary }} />
                  <div className="h-6 w-6 rounded-full shadow-md ring-2 ring-white" style={{ backgroundColor: item.colorPalette.secondary }} />
                  <div className="h-6 w-6 rounded-full shadow-md ring-2 ring-white" style={{ backgroundColor: item.colorPalette.accent }} />
                </div>
                <p className="text-sm text-[#666666] line-clamp-3 font-serif leading-relaxed italic border-t border-[#F0EFE9] pt-4">
                    "{item.explanation}"
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};