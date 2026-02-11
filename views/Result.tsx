import React from 'react';
import { StylingResult, SkinTone } from '../types';
import { Button } from '../components/Button';
import { ArrowLeft, ShoppingBag, Info, Palette, Scissors, Shirt, ExternalLink, Calendar, Share2, Wallet, Heart } from 'lucide-react';

interface ResultProps {
  result: StylingResult | null;
  onBack: () => void;
}

const SkinToneBadge: React.FC<{ tone: SkinTone }> = ({ tone }) => {
  const colors = {
    [SkinTone.FAIR]: 'bg-[#FFF0E6] text-[#8C5E4A] border-[#EBD6C6]',
    [SkinTone.MEDIUM]: 'bg-[#F2D7C0] text-[#7A5239] border-[#D9BC9E]',
    [SkinTone.OLIVE]: 'bg-[#E3D8B6] text-[#6B5E34] border-[#C9BE9B]',
    [SkinTone.DEEP]: 'bg-[#8F6E56] text-[#FFF0E6] border-[#755A46]'
  };

  return (
    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${colors[tone]} shadow-sm`}>
      {tone} Skin Tone
    </span>
  );
};

// Aesthetic color palette for shopping cards
const aestheticColors = [
  { bg: 'bg-[#8FBC8F]/10', border: 'border-[#8FBC8F]/30', text: 'text-[#2F4F2F]', hover: 'group-hover:text-[#2F4F2F]' }, // Sage Green
  { bg: 'bg-[#B0C4DE]/10', border: 'border-[#B0C4DE]/30', text: 'text-[#4682B4]', hover: 'group-hover:text-[#4682B4]' }, // Light Steel Blue
  { bg: 'bg-[#BC8F8F]/10', border: 'border-[#BC8F8F]/30', text: 'text-[#8B4513]', hover: 'group-hover:text-[#8B4513]' }, // Rosy Brown
  { bg: 'bg-[#F0E68C]/10', border: 'border-[#F0E68C]/30', text: 'text-[#8B8B00]', hover: 'group-hover:text-[#8B8B00]' }, // Khaki/Yellow
  { bg: 'bg-[#E6A696]/10', border: 'border-[#E6A696]/30', text: 'text-[#A0522D]', hover: 'group-hover:text-[#A0522D]' }, // Terracotta
  { bg: 'bg-[#708090]/10', border: 'border-[#708090]/30', text: 'text-[#2F4F4F]', hover: 'group-hover:text-[#2F4F4F]' }, // Slate Gray
];

export const Result: React.FC<ResultProps> = ({ result, onBack }) => {
  if (!result) return null;

  const generateShareText = () => {
    let text = `✨ *My StyleSense Look* ✨\n\n`;
    text += `📅 *Event:* ${result.eventDetails || result.occasion}\n`;
    text += `🧥 *Style:* ${result.explanation.substring(0, 100)}...\n\n`;
    text += `🛍️ *Shop this look:*\n`;
    
    result.shoppingKeywords.forEach((keyword, index) => {
      text += `\n📌 *${index + 1}. ${keyword}*\n`;
      text += `   • Amazon: https://www.amazon.in/s?k=${encodeURIComponent(keyword)}\n`;
      text += `   • Myntra: https://www.myntra.com/${encodeURIComponent(keyword)}\n`;
      text += `   • Ajio: https://www.ajio.com/search/?text=${encodeURIComponent(keyword)}\n`;
      text += `   • Nykaa: https://www.nykaafashion.com/catalogsearch/result/?q=${encodeURIComponent(keyword)}\n`;
    });

    text += `\nStyled by StyleSense 👗`;
    return text;
  };

  const handleShare = async () => {
    const shareText = generateShareText();
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My StyleSense Look',
          text: shareText,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(shareText);
      alert("Style details and links copied to clipboard!");
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(generateShareText());
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 md:py-12 animate-fade-in pb-20">
      <div className="flex justify-between items-center mb-8">
        <Button variant="ghost" onClick={onBack} className="pl-0 hover:bg-transparent hover:text-[#C1A17C]">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Studio
        </Button>
        <div className="flex space-x-2">
            <button 
              onClick={handleWhatsAppShare} 
              className="bg-[#25D366] text-white p-2.5 rounded-full hover:bg-[#128C7E] transition-all hover:scale-110 shadow-md" 
              title="Share on WhatsApp"
            >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            </button>
            <Button variant="outline" onClick={handleShare} className="px-4 py-2 border-[#E0E0E0] text-[#666666] hover:text-[#2D2D2D] hover:border-[#C1A17C] transition-all">
                <Share2 className="h-4 w-4 mr-2" />
                Share
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Col: Image & Palette - Spans 4 cols */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-4 rounded-[2rem] shadow-lg border border-[#F0EFE9] sticky top-28">
            <div className="relative rounded-[1.5rem] overflow-hidden mb-6 aspect-[3/4]">
                <img src={result.userImage} alt="User" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 pt-20">
                    <div className="flex flex-wrap gap-2">
                        <SkinToneBadge tone={result.detectedSkinTone} />
                    </div>
                </div>
            </div>
            
            <div className="px-2">
                <h3 className="text-[#2D2D2D] font-serif font-bold text-xl mb-6 flex items-center">
                <Palette className="h-5 w-5 mr-3 text-[#C1A17C]" />
                Your Palette
                </h3>
                <div className="space-y-6">
                {[
                    { label: 'Primary', color: result.colorPalette.primary },
                    { label: 'Secondary', color: result.colorPalette.secondary },
                    { label: 'Accent', color: result.colorPalette.accent }
                ].map((item, idx) => (
                    <div key={idx} className="flex items-center group">
                        <div className="w-16 h-16 rounded-2xl shadow-md ring-4 ring-white transition-transform group-hover:scale-110 duration-300" style={{ backgroundColor: item.color }} />
                        <div className="ml-5">
                            <p className="text-xs text-[#888888] uppercase tracking-wider mb-1">{item.label}</p>
                            <p className="text-lg text-[#2D2D2D] font-serif font-medium">{item.color}</p>
                        </div>
                    </div>
                ))}
                </div>
            </div>
          </div>
        </div>

        {/* Right Col: Details - Spans 8 cols */}
        <div className="lg:col-span-8 space-y-10">
          
            {/* Header */}
            <div className="border-b border-[#E0E0E0] pb-8">
                <div className="flex flex-wrap gap-3 mb-4">
                    {result.eventDetails && (
                      <span className="px-4 py-1.5 bg-[#FDFBF7] text-[#C1A17C] rounded-full text-xs font-bold uppercase tracking-wider border border-[#E6D5B8] flex items-center shadow-sm">
                        <Calendar className="w-3 h-3 mr-1.5" />
                        {result.eventDetails}
                      </span>
                    )}
                     <span className="px-4 py-1.5 bg-[#FAF9F6] text-[#666666] rounded-full text-xs font-bold uppercase tracking-wider border border-[#E0E0E0]">
                        {result.occasion}
                    </span>
                    <span className="px-4 py-1.5 bg-[#FAF9F6] text-[#666666] rounded-full text-xs font-bold uppercase tracking-wider border border-[#E0E0E0]">
                        {result.age ? `${result.age} Years • ` : ''}{result.gender} Look
                    </span>
                </div>
                <h1 className="text-5xl font-serif font-bold text-[#2D2D2D] mb-4">The Curated Look</h1>
                <p className="text-[#666666] text-lg font-light leading-relaxed max-w-2xl">
                    A personalized ensemble designed to harmonize with your complexion and elevate your presence.
                </p>

                {/* Optional Budget & Color Tags */}
                {(result.budget || result.colorPreference) && (
                    <div className="flex flex-wrap gap-4 mt-6">
                        {result.budget && (
                            <div className="flex items-center text-[#555] text-sm bg-white border border-[#E0E0E0] px-3 py-1.5 rounded-lg shadow-sm">
                                <Wallet className="h-4 w-4 mr-2 text-[#8FBC8F]" />
                                Budget: {result.budget}
                            </div>
                        )}
                        {result.colorPreference && (
                            <div className="flex items-center text-[#555] text-sm bg-white border border-[#E0E0E0] px-3 py-1.5 rounded-lg shadow-sm">
                                <Heart className="h-4 w-4 mr-2 text-[#E6A696]" />
                                Preferred: {result.colorPreference}
                            </div>
                        )}
                    </div>
                )}
            </div>

          {/* Analysis Card */}
          <div className="bg-[#FDFBF7] p-8 rounded-[2rem] border border-[#F0EFE9] relative overflow-hidden shadow-sm">
             <div className="absolute top-0 right-0 p-6 opacity-10">
                <Info className="h-32 w-32 text-[#C1A17C]" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#2D2D2D] mb-4 relative z-10">Stylist's Note</h2>
            <p className="text-[#555555] leading-relaxed text-lg font-serif italic relative z-10">
              "{result.explanation}"
            </p>
          </div>

          {/* Outfit Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#F0EFE9] hover:shadow-md transition-shadow relative overflow-hidden">
               <div className="absolute top-0 right-0 w-24 h-24 bg-[#B0C4DE] rounded-bl-full opacity-10 pointer-events-none"></div>
              <h3 className="text-[#2D2D2D] font-serif font-bold text-xl mb-6 flex items-center">
                <Shirt className="h-5 w-5 mr-3 text-[#4682B4]" />
                Ensemble Details
              </h3>
              <ul className="space-y-6">
                <li className="flex flex-col border-l-2 border-[#E0E0E0] pl-4 hover:border-[#4682B4] transition-colors">
                  <span className="text-xs text-[#888888] uppercase tracking-wide mb-1">Top</span>
                  <span className="text-[#2D2D2D] font-medium text-lg">{result.outfit.top}</span>
                </li>
                <li className="flex flex-col border-l-2 border-[#E0E0E0] pl-4 hover:border-[#4682B4] transition-colors">
                  <span className="text-xs text-[#888888] uppercase tracking-wide mb-1">Bottom</span>
                  <span className="text-[#2D2D2D] font-medium text-lg">{result.outfit.bottom}</span>
                </li>
                <li className="flex flex-col border-l-2 border-[#E0E0E0] pl-4 hover:border-[#4682B4] transition-colors">
                  <span className="text-xs text-[#888888] uppercase tracking-wide mb-1">Footwear</span>
                  <span className="text-[#2D2D2D] font-medium text-lg">{result.outfit.shoes}</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-8">
               {/* Hairstyle */}
               <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#F0EFE9] flex-1 hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#E6A696] rounded-bl-full opacity-10 pointer-events-none"></div>
                <h3 className="text-[#2D2D2D] font-serif font-bold text-xl mb-4 flex items-center">
                  <Scissors className="h-5 w-5 mr-3 text-[#E6A696]" />
                  Grooming
                </h3>
                <p className="text-[#555555]">{result.hairstyle}</p>
              </div>
               
               {/* Accessories */}
               <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#F0EFE9] flex-1 hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#F0E68C] rounded-bl-full opacity-10 pointer-events-none"></div>
                <h3 className="text-[#2D2D2D] font-serif font-bold text-xl mb-4">Accessories</h3>
                <div className="flex flex-wrap gap-2">
                  {result.accessories.map((acc, i) => (
                    <span key={i} className="bg-[#FAF9F6] text-[#555555] px-4 py-2 rounded-xl text-sm border border-[#E0E0E0] hover:border-[#E6A696] transition-colors">
                      {acc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Shopping Keywords */}
          <div className="bg-white p-10 rounded-[2rem] shadow-xl border border-[#F0EFE9]">
            <h3 className="font-serif font-bold text-2xl mb-6 flex items-center text-[#2D2D2D]">
              <ShoppingBag className="h-6 w-6 mr-3 text-[#E6A696]" />
              Shop the Look
            </h3>
            <p className="text-[#888888] mb-8 font-light">Find these items on your favorite stores. Colors indicate different style elements.</p>
            <div className="grid grid-cols-1 gap-4">
              {result.shoppingKeywords.map((keyword, i) => {
                const colorTheme = aestheticColors[i % aestheticColors.length];
                return (
                  <div key={i} className={`flex flex-col sm:flex-row gap-4 items-center ${colorTheme.bg} backdrop-blur-sm p-5 rounded-xl border ${colorTheme.border} transition-all duration-300 group hover:shadow-md`}>
                    <span className={`text-base font-bold ${colorTheme.text} flex-grow w-full sm:w-auto font-serif`}>{keyword}</span>
                    <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-start sm:justify-end">
                        <a href={`https://www.amazon.in/s?k=${encodeURIComponent(keyword)}`} target="_blank" rel="noopener noreferrer" className={`px-4 py-1.5 rounded-full bg-white text-xs ${colorTheme.text} hover:scale-105 shadow-sm flex items-center gap-1 transition-all border border-transparent hover:border-current`}>
                            Amazon <ExternalLink className="h-3 w-3" />
                        </a>
                        <a href={`https://www.myntra.com/${encodeURIComponent(keyword)}`} target="_blank" rel="noopener noreferrer" className={`px-4 py-1.5 rounded-full bg-white text-xs ${colorTheme.text} hover:scale-105 shadow-sm flex items-center gap-1 transition-all border border-transparent hover:border-current`}>
                            Myntra <ExternalLink className="h-3 w-3" />
                        </a>
                        <a href={`https://www.ajio.com/search/?text=${encodeURIComponent(keyword)}`} target="_blank" rel="noopener noreferrer" className={`px-4 py-1.5 rounded-full bg-white text-xs ${colorTheme.text} hover:scale-105 shadow-sm flex items-center gap-1 transition-all border border-transparent hover:border-current`}>
                            Ajio <ExternalLink className="h-3 w-3" />
                        </a>
                        <a href={`https://www.nykaafashion.com/catalogsearch/result/?q=${encodeURIComponent(keyword)}`} target="_blank" rel="noopener noreferrer" className={`px-4 py-1.5 rounded-full bg-white text-xs ${colorTheme.text} hover:scale-105 shadow-sm flex items-center gap-1 transition-all border border-transparent hover:border-current`}>
                            Nykaa <ExternalLink className="h-3 w-3" />
                        </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};