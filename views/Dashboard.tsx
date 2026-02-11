import React, { useState, useRef } from 'react';
import { User, Gender, Occasion, StylingResult } from '../types';
import { Button } from '../components/Button';
import { Select } from '../components/Select';
import { Upload, X, AlertCircle } from 'lucide-react';
import { generateStylingAdvice } from '../services/geminiService';

interface DashboardProps {
  user: User | null;
  onAnalysisComplete: (result: StylingResult) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onAnalysisComplete }) => {
  const [gender, setGender] = useState<Gender>(Gender.MALE);
  const [occasion, setOccasion] = useState<Occasion>(Occasion.CASUAL);
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

    setIsAnalyzing(true);
    setError(null);

    try {
      const result = await generateStylingAdvice(image, gender, occasion);
      
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
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Styling Dashboard</h1>
        <p className="text-[#a0a0a0]">Configure your preferences and upload a photo to get started.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Image Upload */}
        <div className="bg-[#1e1e1e] p-6 rounded-2xl border border-[#2c2c2c] h-fit">
          <h2 className="text-lg font-semibold text-white mb-4">1. Upload Photo</h2>
          
          <div className={`relative border-2 border-dashed rounded-xl transition-colors ${image ? 'border-[#2c2c2c] bg-[#121212]' : 'border-[#404040] hover:border-[#606060] bg-[#1a1a1a]'} aspect-[3/4] flex flex-col items-center justify-center overflow-hidden`}>
            {image ? (
              <>
                <img src={image} alt="Uploaded" className="w-full h-full object-cover" />
                <button 
                  onClick={handleRemoveImage}
                  className="absolute top-3 right-3 bg-black/50 text-white p-1.5 rounded-full hover:bg-red-500/80 transition-colors backdrop-blur-sm"
                >
                  <X className="h-5 w-5" />
                </button>
              </>
            ) : (
              <div 
                className="flex flex-col items-center cursor-pointer p-8 text-center"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="bg-[#2a2a2a] p-4 rounded-full mb-4">
                  <Upload className="h-8 w-8 text-[#a0a0a0]" />
                </div>
                <p className="text-[#e0e0e0] font-medium mb-1">Click to upload photo</p>
                <p className="text-[#666666] text-sm">JPG, PNG up to 5MB</p>
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
            <div className="mt-4 p-3 bg-red-900/20 border border-red-900/50 rounded-lg flex items-start gap-2 text-red-200 text-sm">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Right Column: Preferences */}
        <div className="flex flex-col space-y-6">
          <div className="bg-[#1e1e1e] p-6 rounded-2xl border border-[#2c2c2c]">
            <h2 className="text-lg font-semibold text-white mb-4">2. Preferences</h2>
            <div className="space-y-6">
              <Select
                label="Gender Preference"
                value={gender}
                onChange={(e) => setGender(e.target.value as Gender)}
                options={[
                  { value: Gender.MALE, label: 'Male' },
                  { value: Gender.FEMALE, label: 'Female' },
                  { value: Gender.NON_BINARY, label: 'Non-Binary' }
                ]}
              />
              
              <Select
                label="Occasion"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value as Occasion)}
                options={[
                  { value: Occasion.CASUAL, label: 'Casual - Everyday Wear' },
                  { value: Occasion.BUSINESS, label: 'Business - Professional' },
                  { value: Occasion.FORMAL, label: 'Formal - Gala & Events' },
                  { value: Occasion.PARTY, label: 'Party - Night Out' }
                ]}
              />
            </div>
          </div>

          <div className="bg-[#1e1e1e] p-6 rounded-2xl border border-[#2c2c2c] flex-grow flex flex-col justify-end">
            <h2 className="text-lg font-semibold text-white mb-2">3. Generate</h2>
            <p className="text-[#a0a0a0] text-sm mb-6">
              Our AI will analyze your skin tone from the photo and create a tailored look for your selected occasion.
            </p>
            <Button 
              onClick={handleGenerate} 
              isLoading={isAnalyzing} 
              disabled={!image}
              className="w-full py-4 text-lg"
            >
              {isAnalyzing ? 'Analyzing Skin Tone...' : 'Generate Recommendations'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};