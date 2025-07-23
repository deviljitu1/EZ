import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  // Get token from query string
  const params = new URLSearchParams(location.search);
  const token = params.get('token');

  const API_BASE = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:4000`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      toast({ title: 'Password mismatch', description: 'Passwords do not match.', variant: 'destructive' });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password })
      });
      if (!res.ok) throw new Error((await res.json()).error || 'Failed to reset password');
      setSuccess(true);
      toast({ title: 'Password reset', description: 'You can now log in with your new password.' });
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300">Reset Password</h1>
        {success ? (
          <div className="text-green-600 dark:text-green-400 text-center">Password reset! Redirecting to login...</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold mb-1 dark:text-gray-100">New Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full border rounded p-2 bg-gray-50 dark:bg-gray-800 dark:text-gray-100 border-gray-200 dark:border-gray-700"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 dark:text-gray-100">Confirm Password</label>
              <input
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
                className="w-full border rounded p-2 bg-gray-50 dark:bg-gray-800 dark:text-gray-100 border-gray-200 dark:border-gray-700"
              />
            </div>
            <button type="submit" className="w-full py-2 bg-blue-600 dark:bg-blue-700 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-800 transition text-lg font-bold" disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword; 