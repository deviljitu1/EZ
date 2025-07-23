import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/components/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { FaLock } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast({
        title: "Login successful",
        description: "Welcome back to ShopEZ!",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-blue-400 via-sky-200 to-blue-100 overflow-hidden relative">
      {/* Floating icons */}
      <span className="absolute top-10 left-10 animate-bounce-slow text-blue-300 opacity-60 text-5xl select-none pointer-events-none">🛒</span>
      <span className="absolute bottom-16 left-1/3 animate-float text-yellow-300 opacity-50 text-4xl select-none pointer-events-none">⭐</span>
      <span className="absolute top-1/2 right-20 animate-bounce-slow text-pink-300 opacity-40 text-6xl select-none pointer-events-none">🎁</span>
      {/* Left branding/illustration section */}
      <div className="hidden md:flex flex-col items-center justify-center w-1/2 h-full p-12 bg-gradient-to-br from-blue-600 to-sky-400 text-white rounded-r-3xl shadow-2xl relative z-10">
        {/* Animated SVG illustration */}
        <div className="mb-8 animate-float">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="60" cy="100" rx="40" ry="10" fill="#fff" fillOpacity="0.15" />
            <rect x="35" y="40" width="50" height="40" rx="8" fill="#fff" fillOpacity="0.7" />
            <rect x="50" y="30" width="20" height="20" rx="6" fill="#fff" fillOpacity="0.9" />
            <path d="M50 50 Q60 60 70 50" stroke="#0ea5e9" strokeWidth="3" fill="none" />
            <circle cx="60" cy="60" r="6" fill="#0ea5e9" />
          </svg>
        </div>
        <h2 className="text-4xl font-extrabold mb-4 tracking-tight drop-shadow-lg">Welcome Back!</h2>
        <p className="text-lg font-medium opacity-90 mb-8 text-center max-w-xs">Sign in to ShopEZ and experience seamless shopping, fast checkout, and exclusive deals.</p>
        <ul className="space-y-3 text-base">
          <li className="flex items-center gap-2"><span className="inline-block w-2 h-2 bg-white rounded-full"></span> Secure & Fast Login</li>
          <li className="flex items-center gap-2"><span className="inline-block w-2 h-2 bg-white rounded-full"></span> Personalized Recommendations</li>
          <li className="flex items-center gap-2"><span className="inline-block w-2 h-2 bg-white rounded-full"></span> Order Tracking & History</li>
        </ul>
      </div>
      {/* Right login form section */}
      <div className="flex flex-1 items-center justify-center w-full h-full p-6">
        <Card className="w-full max-w-md shadow-2xl rounded-3xl border-0 bg-white/60 backdrop-blur-lg ring-2 ring-blue-200/60 hover:ring-blue-400/80 transition-all duration-300" style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)' }}>
        <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-extrabold text-center text-blue-700">Sign in to ShopEZ</CardTitle>
            <CardDescription className="text-center text-base text-gray-500">Enter your email and password to access your account</CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                  className="focus-ring text-base px-4 py-2 rounded-lg border-2 border-blue-200 bg-white/80"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                  className="focus-ring text-base px-4 py-2 rounded-lg border-2 border-blue-200 bg-white/80"
              />
            </div>
            <Button 
              type="submit" 
                className="w-full py-3 text-lg font-bold rounded-xl bg-blue-600 hover:bg-blue-700 transition shadow-lg flex items-center justify-center gap-2 ring-2 ring-blue-300/40 hover:ring-blue-500/70"
              disabled={isLoading}
            >
                <FaLock className="inline-block mr-2 text-xl" />
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="spinner"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
            <div className="mt-4 text-center">
              <Link to="/forgot-password" className="text-blue-600 hover:underline text-sm">Forgot Password?</Link>
            </div>
            <div className="mt-6 text-center text-gray-600 text-base">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="text-blue-600 font-semibold hover:underline">Sign up</Link>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

export default Login;