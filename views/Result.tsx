import React from 'react';
import { StylingResult, SkinTone } from '../types';
import { Button } from '../components/Button';
import { ArrowLeft, ShoppingCart, Info, Palette, Scissors, Shirt } from 'lucide-react';

interface ResultProps {
  result: StylingResult | null;
  onBack: () => void;
}

const SkinToneBadge: React.FC<{ tone: SkinTone }> = ({ tone }) => {
  const colors = {
    [SkinTone.FAIR]: 'bg-orange-100 text-orange-900',
    [SkinTone.MEDIUM]: 'bg-orange-200 text-orange-900',
    [SkinTone.OLIVE]: 'bg-yellow-700/50 text-yellow-100',
    [SkinTone.DEEP]: 'bg-amber-900 text-amber-100'
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${colors[tone]}`}>
      {tone} Skin Tone
    </span>
  );
};

export const Result: React.FC<ResultProps> = ({ result, onBack }) => {
  if (!result) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 animate-fade-in">
      <Button variant="outline" onClick={onBack} className="mb-8">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Image & Summary */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#1e1e1e] p-4 rounded-2xl border border-[#2c2c2c]">
            <img src={result.userImage} alt="User" className="w-full rounded-xl mb-4" />
            <div className="flex flex-wrap gap-2 mb-4">
              <SkinToneBadge tone={result.detectedSkinTone} />
              <span className="px-3 py-1 bg-[#2a2a2a] text-[#a0a0a0] rounded-full text-xs font-medium uppercase tracking-wider border border-[#2c2c2c]">
                {result.occasion}
              </span>
              <span className="px-3 py-1 bg-[#2a2a2a] text-[#a0a0a0] rounded-full text-xs font-medium uppercase tracking-wider border border-[#2c2c2c]">
                {result.gender}
              </span>
            </div>
          </div>
          
          <div className="bg-[#1e1e1e] p-6 rounded-2xl border border-[#2c2c2c]">
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <Palette className="h-5 w-5 mr-2 text-indigo-400" />
              Recommended Palette
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-lg shadow-inner" style={{ backgroundColor: result.colorPalette.primary }} />
                <div>
                  <p className="text-xs text-[#a0a0a0]">Primary</p>
                  <p className="text-sm text-white font-medium">{result.colorPalette.primary}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-lg shadow-inner" style={{ backgroundColor: result.colorPalette.secondary }} />
                <div>
                  <p className="text-xs text-[#a0a0a0]">Secondary</p>
                  <p className="text-sm text-white font-medium">{result.colorPalette.secondary}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-lg shadow-inner" style={{ backgroundColor: result.colorPalette.accent }} />
                <div>
                  <p className="text-xs text-[#a0a0a0]">Accent</p>
                  <p className="text-sm text-white font-medium">{result.colorPalette.accent}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Why this suits you */}
          <div className="bg-[#1e1e1e] p-8 rounded-2xl border border-[#2c2c2c] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Info className="h-24 w-24" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Stylist's Analysis</h2>
            <p className="text-[#a0a0a0] leading-relaxed text-lg">
              {result.explanation}
            </p>
          </div>

          {/* Outfit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1e1e1e] p-6 rounded-2xl border border-[#2c2c2c]">
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <Shirt className="h-5 w-5 mr-2 text-blue-400" />
                The Outfit
              </h3>
              <ul className="space-y-4">
                <li className="flex flex-col">
                  <span className="text-xs text-[#666666] uppercase tracking-wide">Top</span>
                  <span className="text-[#e0e0e0] font-medium">{result.outfit.top}</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-xs text-[#666666] uppercase tracking-wide">Bottom</span>
                  <span className="text-[#e0e0e0] font-medium">{result.outfit.bottom}</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-xs text-[#666666] uppercase tracking-wide">Shoes</span>
                  <span className="text-[#e0e0e0] font-medium">{result.outfit.shoes}</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-6">
               {/* Hairstyle */}
               <div className="bg-[#1e1e1e] p-6 rounded-2xl border border-[#2c2c2c] flex-1">
                <h3 className="text-white font-semibold mb-3 flex items-center">
                  <Scissors className="h-5 w-5 mr-2 text-pink-400" />
                  Hairstyle
                </h3>
                <p className="text-[#e0e0e0]">{result.hairstyle}</p>
              </div>
               
               {/* Accessories */}
               <div className="bg-[#1e1e1e] p-6 rounded-2xl border border-[#2c2c2c] flex-1">
                <h3 className="text-white font-semibold mb-3">Accessories</h3>
                <div className="flex flex-wrap gap-2">
                  {result.accessories.map((acc, i) => (
                    <span key={i} className="bg-[#2a2a2a] text-[#e0e0e0] px-3 py-1 rounded-lg text-sm border border-[#2c2c2c]">
                      {acc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Shopping Keywords */}
          <div className="bg-[#2a2a2a] p-6 rounded-2xl border border-[#2c2c2c]">
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2 text-green-400" />
              Shop This Look
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {result.shoppingKeywords.map((keyword, i) => (
                <div key={i} className="flex flex-wrap gap-2 items-center bg-[#1e1e1e] p-3 rounded-lg border border-[#2c2c2c]">
                  <span className="text-sm font-medium text-[#e0e0e0] flex-grow">{keyword}</span>
                  <div className="flex space-x-2">
                    <a href={`https://www.amazon.in/s?k=${encodeURIComponent(keyword)}`} target="_blank" rel="noopener noreferrer" className="text-xs text-[#a0a0a0] hover:text-white hover:underline">Amazon</a>
                    <a href={`https://www.myntra.com/${encodeURIComponent(keyword)}`} target="_blank" rel="noopener noreferrer" className="text-xs text-[#a0a0a0] hover:text-white hover:underline">Myntra</a>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};