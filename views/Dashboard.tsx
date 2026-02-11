import React, { useState, useRef } from 'react';
import { User, Gender, Occasion, StylingResult } from '../types';
import { Button } from '../components/Button';
import { Select } from '../components/Select';
import { Input } from '../components/Input';
import { Upload, X, AlertCircle, Sparkles } from 'lucide-react';
import { generateStylingAdvice } from '../services/geminiService';

interface DashboardProps {
  user: User | null;
  onAnalysisComplete: (result: StylingResult) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onAnalysisComplete }) => {
  const [gender, setGender] = useState<Gender>(Gender.MALE);
  const [occasion, setOccasion] = useState<Occasion>(Occasion.CASUAL);
  const [age, setAge] = useState<string>('');
  const [eventDetails, setEventDetails] = useState<string>('');
  const [budget, setBudget] = useState<string>('');
  const [colorPref, setColorPref] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError("File size too large. Please upload an image under 5MB.");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleGenerate = async () => {
    if (!image) {
      setError("Please upload a photo first.");
      return;
    }
    if (!age) {
      setError("Please enter your age.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const result = await generateStylingAdvice(image, gender, occasion, age, eventDetails, budget, colorPref);
      
      // Save to local storage history
      const historyStr = localStorage.getItem(`history_${user?.id}`);
      const history = historyStr ? JSON.parse(historyStr) : [];
      history.unshift(result);
      localStorage.setItem(`history_${user?.id}`, JSON.stringify(history));

      onAnalysisComplete(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-serif font-bold text-[#2D2D2D] mb-3">Styling Studio</h1>
        <p className="text-[#666666] font-light text-lg">Let's create your perfect look for the day.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left Column: Image Upload */}
        <div className="bg-white p-8 rounded-[2rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-[#F0EFE9] h-fit">
          <div className="flex justify-between items-center mb-6">
             <h2 className="text-xl font-serif font-semibold text-[#2D2D2D]">1. Your Photo</h2>
             <span className="text-xs font-bold text-[#C1A17C] bg-[#FDFBF7] px-3 py-1 rounded-full border border-[#E6D5B8]">REQUIRED</span>
          </div>
          
          <div className={`relative border-2 border-dashed rounded-3xl transition-all duration-300 ${image ? 'border-transparent shadow-md' : 'border-[#D1C7BD] hover:border-[#C1A17C] bg-[#FAF9F6]'} aspect-[3/4] flex flex-col items-center justify-center overflow-hidden group`}>
            {image ? (
              <>
                <img src={image} alt="Uploaded" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                <button 
                  onClick={handleRemoveImage}
                  className="absolute top-4 right-4 bg-white/80 text-[#2D2D2D] p-2 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors backdrop-blur-md shadow-sm"
                >
                  <X className="h-5 w-5" />
                </button>
              </>
            ) : (
              <div 
                className="flex flex-col items-center cursor-pointer p-8 text-center w-full h-full justify-center"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="bg-white p-5 rounded-full mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <Upload className="h-8 w-8 text-[#C1A17C]" />
                </div>
                <p className="text-[#2D2D2D] font-medium mb-1 text-lg">Upload Portrait</p>
                <p className="text-[#888888] text-sm font-light">Natural lighting works best</p>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleImageUpload} 
            />
          </div>
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-600 text-sm">
              <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Right Column: Preferences */}
        <div className="flex flex-col h-full space-y-8">
          <div className="bg-white p-8 rounded-[2rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-[#F0EFE9]">
            <h2 className="text-xl font-serif font-semibold text-[#2D2D2D] mb-6">2. Your Profile & Event</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value as Gender)}
                  options={[
                    { value: Gender.MALE, label: 'Male' },
                    { value: Gender.FEMALE, label: 'Female' },
                    { value: Gender.NON_BINARY, label: 'Non-Binary' }
                  ]}
                />
                <Input
                  label="Age"
                  type="number"
                  placeholder="e.g. 25"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min="1"
                  max="120"
                />
              </div>
              
              <Select
                label="Occasion Category"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value as Occasion)}
                options={[
                  { value: Occasion.CASUAL, label: 'Casual - Everyday Chic' },
                  { value: Occasion.BUSINESS, label: 'Business - Professional' },
                  { value: Occasion.FORMAL, label: 'Formal - Gala & Black Tie' },
                  { value: Occasion.PARTY, label: 'Party - Social Event' }
                ]}
              />

              <Input 
                label="Specific Event Details"
                placeholder="e.g. Best friend's beach wedding"
                value={eventDetails}
                onChange={(e) => setEventDetails(e.target.value)}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                    label="Budget (Approx)"
                    placeholder="e.g. ₹5,000 or $100"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                />
                <Input 
                    label="Preferred Color (Optional)"
                    placeholder="e.g. Emerald Green"
                    value={colorPref}
                    onChange={(e) => setColorPref(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#2D2D2D] to-[#1a1a1a] p-8 rounded-[2rem] shadow-xl text-white flex-grow flex flex-col justify-center relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 p-8 opacity-10">
                <Sparkles className="h-32 w-32" />
            </div>
            
            <h2 className="text-xl font-serif font-semibold text-white mb-3 relative z-10">3. Create Look</h2>
            <p className="text-[#A0A0A0] text-sm mb-8 font-light relative z-10">
              Our AI stylist will analyze your complexion, age, event, and budget to craft a bespoke outfit recommendation complete with shopping links.
            </p>
            <Button 
              variant="secondary"
              onClick={handleGenerate} 
              isLoading={isAnalyzing} 
              disabled={!image}
              className="w-full py-4 text-lg font-serif relative z-10 shadow-lg shadow-[#000]/20"
            >
              {isAnalyzing ? 'Styling in progress...' : 'Curate My Style'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};