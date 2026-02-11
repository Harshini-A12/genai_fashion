import React, { useState, useEffect } from 'react';
import { Home } from './views/Home';
import { Auth } from './views/Auth';
import { Dashboard } from './views/Dashboard';
import { Result } from './views/Result';
import { History } from './views/History';
import { User, StylingResult } from './types';
import { Sparkles, User as UserIcon, LogOut, History as HistoryIcon } from 'lucide-react';

enum View {
  HOME,
  LOGIN,
  SIGNUP,
  DASHBOARD,
  RESULT,
  HISTORY
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [user, setUser] = useState<User | null>(null);
  const [lastResult, setLastResult] = useState<StylingResult | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('stylesense_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setCurrentView(View.DASHBOARD);
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('stylesense_user', JSON.stringify(userData));
    setCurrentView(View.DASHBOARD);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('stylesense_user');
    setCurrentView(View.HOME);
    setLastResult(null);
  };

  const handleAnalysisComplete = (result: StylingResult) => {
    setLastResult(result);
    setCurrentView(View.RESULT);
  };

  const renderView = () => {
    switch (currentView) {
      case View.HOME:
        return <Home onGetStarted={() => setCurrentView(View.LOGIN)} />;
      case View.LOGIN:
        return <Auth mode="login" onAuthSuccess={handleLogin} onSwitchMode={() => setCurrentView(View.SIGNUP)} />;
      case View.SIGNUP:
        return <Auth mode="signup" onAuthSuccess={handleLogin} onSwitchMode={() => setCurrentView(View.LOGIN)} />;
      case View.DASHBOARD:
        return <Dashboard user={user} onAnalysisComplete={handleAnalysisComplete} />;
      case View.RESULT:
        return <Result result={lastResult} onBack={() => setCurrentView(View.DASHBOARD)} />;
      case View.HISTORY:
        return <History user={user} onSelectResult={handleAnalysisComplete} onBack={() => setCurrentView(View.DASHBOARD)} />;
      default:
        return <Home onGetStarted={() => setCurrentView(View.LOGIN)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#2D2D2D] relative overflow-x-hidden">
      {/* Abstract Background Shapes - Updated with Aesthetic Colors */}
      <div className="fixed top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#E6A696] rounded-full blur-[120px] opacity-20 pointer-events-none -z-10 animate-float" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#B0C4DE] rounded-full blur-[100px] opacity-20 pointer-events-none -z-10 animate-float-delayed" />
      <div className="fixed top-[40%] left-[20%] w-[300px] h-[300px] bg-[#8FBC8F] rounded-full blur-[90px] opacity-10 pointer-events-none -z-10" />

      {/* Navigation Bar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${currentView === View.HOME ? 'bg-transparent py-6' : 'glass-panel border-b border-white/40 shadow-sm py-4'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center cursor-pointer group" onClick={() => setCurrentView(user ? View.DASHBOARD : View.HOME)}>
              <div className="bg-gradient-to-br from-[#E6A696] to-[#D4C3A3] text-white p-2 rounded-lg mr-3 shadow-lg group-hover:scale-105 transition-transform">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="font-serif font-bold text-2xl tracking-tight text-[#3D2E1E]">StyleSense</span>
            </div>
            <div className="flex items-center space-x-6">
              {user ? (
                <>
                  <button
                    onClick={() => setCurrentView(View.HISTORY)}
                    className={`flex items-center text-sm font-medium transition-colors ${currentView === View.HISTORY ? 'text-[#C1A17C]' : 'text-[#666666] hover:text-[#2D2D2D]'}`}
                  >
                    <HistoryIcon className="h-4 w-4 mr-2" />
                    History
                  </button>
                  <div className="hidden md:flex items-center text-sm font-medium text-[#2D2D2D] bg-white/50 px-4 py-2 rounded-full border border-white">
                    <UserIcon className="h-4 w-4 mr-2 text-[#E6A696]" />
                    {user.name}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-full text-[#666666] hover:text-red-500 hover:bg-red-50 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </>
              ) : (
                currentView === View.HOME && (
                  <button
                    onClick={() => setCurrentView(View.LOGIN)}
                    className="text-[#2D2D2D] hover:text-[#C1A17C] font-medium transition-colors"
                  >
                    Sign In
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-24">
        {renderView()}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E0E0E0] py-8 bg-white/50 backdrop-blur-sm mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center text-[#888888] text-sm">
          <p className="font-serif italic text-lg mb-2 text-[#2D2D2D]">StyleSense</p>
          &copy; {new Date().getFullYear()} Personal Stylist. Powered by Gemini.
        </div>
      </footer>
    </div>
  );
};

export default App;