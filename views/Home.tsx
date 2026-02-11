import React from 'react';
import { Button } from '../components/Button';
import { Sparkles, Camera, Palette, ShoppingBag, ArrowRight } from 'lucide-react';

interface HomeProps {
  onGetStarted: () => void;
}

export const Home: React.FC<HomeProps> = ({ onGetStarted }) => {
  return (
    <div className="flex flex-col items-center justify-center pt-10 pb-20 px-4 overflow-hidden">
      
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto space-y-8 animate-fade-in relative z-10">
        <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-5 py-2 mb-4 border border-[#F0EFE9] shadow-sm animate-bounce-slow">
          <Sparkles className="h-4 w-4 text-[#C1A17C]" />
          <span className="text-sm font-medium text-[#666666] tracking-wide uppercase">AI-Powered Personal Styling</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-serif font-bold text-[#2D2D2D] leading-[1.1] mb-6">
          Curate Your <br />
          <span className="italic text-[#C1A17C]">Signature</span> Look.
        </h1>
        
        <p className="text-xl text-[#666666] mb-12 max-w-2xl mx-auto leading-relaxed font-light">
          Discover fashion that compliments your unique complexion. Upload your photo and let our intelligent stylist create your perfect palette.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={onGetStarted} className="text-lg px-10 py-4 shadow-xl shadow-[#C1A17C]/20">
            Start Styling
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button variant="outline" className="text-lg px-10 py-4" onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}>
            How it Works
          </Button>
        </div>
      </div>

      {/* Hero Image / Abstract Art */}
      <div className="mt-20 relative w-full max-w-5xl mx-auto h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden shadow-2xl animate-float-delayed">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
          alt="Fashion Editorial" 
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-transparent to-transparent"></div>
      </div>

      {/* Features */}
      <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto w-full px-6">
        {[
          {
            icon: <Camera className="h-8 w-8 text-[#2D2D2D]" />,
            title: "Smart Analysis",
            desc: "Advanced computer vision detects your unique skin tone nuances and facial features."
          },
          {
            icon: <Palette className="h-8 w-8 text-[#2D2D2D]" />,
            title: "Color Theory",
            desc: "Receive scientifically backed color palettes that naturally enhance your radiance."
          },
          {
            icon: <ShoppingBag className="h-8 w-8 text-[#2D2D2D]" />,
            title: "Curated Shopping",
            desc: "Get direct access to items that match your style profile on your favorite stores."
          }
        ].map((feature, idx) => (
          <div key={idx} className="bg-white p-10 rounded-3xl border border-[#F0EFE9] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] transition-all duration-500 group">
            <div className="mb-6 bg-[#FAF9F6] w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-[#E6D5B8]">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#2D2D2D] mb-4">{feature.title}</h3>
            <p className="text-[#666666] leading-relaxed font-light">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};