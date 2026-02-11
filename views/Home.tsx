import React from 'react';
import { Button } from '../components/Button';
import { Sparkles, Camera, Palette, ShoppingBag } from 'lucide-react';

interface HomeProps {
  onGetStarted: () => void;
}

export const Home: React.FC<HomeProps> = ({ onGetStarted }) => {
  return (
    <div className="flex flex-col items-center justify-center pt-20 pb-12 px-4">
      <div className="text-center max-w-3xl mx-auto space-y-6 animate-fade-in">
        <div className="inline-flex items-center space-x-2 bg-[#2a2a2a] rounded-full px-4 py-1.5 mb-4 border border-[#2c2c2c]">
          <Sparkles className="h-4 w-4 text-yellow-500" />
          <span className="text-sm font-medium text-[#e0e0e0]">AI-Powered Personal Styling</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
          Elevate Your Style with <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">Intelligent</span> Fashion.
        </h1>
        
        <p className="text-xl text-[#a0a0a0] mb-10 max-w-2xl mx-auto leading-relaxed">
          Upload your photo and let our AI analyze your skin tone to generate personalized outfit recommendations for any occasion.
        </p>

        <Button onClick={onGetStarted} className="mx-auto text-lg px-8 py-4">
          Get Started Now
        </Button>
      </div>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto w-full px-4">
        {[
          {
            icon: <Camera className="h-8 w-8 text-[#e0e0e0]" />,
            title: "Smart Analysis",
            desc: "Advanced computer vision detects your unique skin tone and features."
          },
          {
            icon: <Palette className="h-8 w-8 text-[#e0e0e0]" />,
            title: "Color Theory",
            desc: "Get personalized color palettes that enhance your natural complexion."
          },
          {
            icon: <ShoppingBag className="h-8 w-8 text-[#e0e0e0]" />,
            title: "Curated Shopping",
            desc: "Receive tailored keywords to find the perfect items on your favorite stores."
          }
        ].map((feature, idx) => (
          <div key={idx} className="bg-[#1e1e1e] p-8 rounded-2xl border border-[#2c2c2c] hover:border-[#404040] transition-colors group">
            <div className="mb-6 bg-[#2a2a2a] w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
            <p className="text-[#a0a0a0] leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};