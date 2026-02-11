import React, { useState, useEffect } from 'react';
import { Home } from './views/Home';
import { Auth } from './views/Auth';
import { Dashboard } from './views/Dashboard';
import { Result } from './views/Result';
import { History } from './views/History';
import { User, StylingResult } from './types';
import { Shirt, User as UserIcon, LogOut, History as HistoryIcon } from 'lucide-react';

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
    // Check for existing session
    const storedUser = localStorage.getItem('styleai_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setCurrentView(View.DASHBOARD);
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('styleai_user', JSON.stringify(userData));
    setCurrentView(View.DASHBOARD);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('styleai_user');
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
    <div className="min-h-screen flex flex-col bg-[#121212] text-[#e0e0e0]">
      {/* Navigation Bar */}
      <nav className="border-b border-[#2c2c2c] bg-[#1e1e1e]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center cursor-pointer" onClick={() => setCurrentView(user ? View.DASHBOARD : View.HOME)}>
              <div className="bg-[#e0e0e0] p-1.5 rounded-lg mr-2">
                <Shirt className="h-6 w-6 text-[#121212]" />
              </div>
              <span className="font-bold text-xl tracking-tight text-[#e0e0e0]">StyleAI</span>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <button
                    onClick={() => setCurrentView(View.HISTORY)}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === View.HISTORY ? 'bg-[#333333] text-white' : 'text-[#a0a0a0] hover:text-white hover:bg-[#2c2c2c]'}`}
                  >
                    <HistoryIcon className="h-4 w-4 mr-2" />
                    History
                  </button>
                  <div className="flex items-center text-sm font-medium text-[#e0e0e0]">
                    <UserIcon className="h-4 w-4 mr-2 text-[#a0a0a0]" />
                    {user.name}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-md text-[#a0a0a0] hover:text-red-400 hover:bg-[#2c2c2c] transition-colors"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </>
              ) : (
                currentView === View.HOME && (
                  <button
                    onClick={() => setCurrentView(View.LOGIN)}
                    className="text-[#e0e0e0] hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
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
      <main className="flex-grow">
        {renderView()}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#2c2c2c] py-6 mt-auto bg-[#1e1e1e]">
        <div className="max-w-7xl mx-auto px-4 text-center text-[#a0a0a0] text-sm">
          &copy; {new Date().getFullYear()} StyleAI. Powered by Gemini.
        </div>
      </footer>
    </div>
  );
};

export default App;