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
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <div className="flex items-center justify-between mb-8">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-white">Styling History</h1>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-24 bg-[#1e1e1e] rounded-2xl border border-[#2c2c2c]">
          <Clock className="h-12 w-12 text-[#404040] mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No History Found</h3>
          <p className="text-[#a0a0a0]">Your styling sessions will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((item) => (
            <div 
              key={item.id} 
              className="bg-[#1e1e1e] rounded-xl border border-[#2c2c2c] overflow-hidden hover:border-[#404040] transition-colors cursor-pointer group"
              onClick={() => onSelectResult(item)}
            >
              <div className="relative aspect-video">
                <img src={item.userImage} alt="User" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e1e] to-transparent opacity-80" />
                <div className="absolute bottom-3 left-4">
                  <p className="text-white font-medium text-sm">{new Date(item.date).toLocaleDateString()}</p>
                  <p className="text-[#a0a0a0] text-xs">{item.occasion} • {item.gender}</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex space-x-2 mb-3">
                  <div className="h-4 w-4 rounded-full shadow-sm" style={{ backgroundColor: item.colorPalette.primary }} />
                  <div className="h-4 w-4 rounded-full shadow-sm" style={{ backgroundColor: item.colorPalette.secondary }} />
                  <div className="h-4 w-4 rounded-full shadow-sm" style={{ backgroundColor: item.colorPalette.accent }} />
                </div>
                <p className="text-sm text-[#a0a0a0] line-clamp-2">{item.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};