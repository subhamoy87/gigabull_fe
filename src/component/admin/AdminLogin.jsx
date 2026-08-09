import React, { useState } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { Lock, Eye, EyeOff, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, company } = useSiteData();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!password) {
      setError('Please enter the admin password');
      return;
    }

    const success = await login(password);
    if (!success) {
      setError('Invalid password. Please check your admin credentials.');
    }
  };

  return (
    <div className='min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden text-white'>
      {/* Background Decorator Gradients */}
      <div className='absolute -top-32 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none' />
      <div className='absolute -bottom-32 -right-32 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none' />

      <div className='max-w-md w-full relative z-10'>
        {/* Logo & Header */}
        <div className='text-center mb-8 space-y-3'>
          <div className='inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-2 shadow-inner'>
            <Lock className='w-8 h-8' />
          </div>
          <h1 className='text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-amber-400 bg-clip-text text-transparent'>
            {company.brandName || 'Gigabull'} Admin Portal
          </h1>
          <p className='text-slate-400 text-sm'>
            Enter your security credential to manage site assets & backend settings
          </p>
        </div>

        {/* Login Card */}
        <div className='bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6'>
          <form onSubmit={handleSubmit} className='space-y-5'>
            <div className='space-y-2'>
              <label className='block text-xs font-semibold uppercase tracking-wider text-slate-300'>
                Security Password
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Enter admin password'
                  className='w-full px-4 py-3.5 pl-11 pr-11 bg-slate-950/70 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition text-sm'
                  autoFocus
                />
                <Lock className='w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2' />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition'
                >
                  {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                </button>
              </div>
            </div>

            {error && (
              <div className='p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs flex items-center gap-2'>
                <span className='w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse' />
                {error}
              </div>
            )}

            <button
              type='submit'
              className='w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition flex items-center justify-center gap-2 text-sm group cursor-pointer'
            >
              Authenticate & Launch Panel
              <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
            </button>
          </form>

          {/* Hint Footer inside Card */}
          <div className='pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400'>
            <span className='flex items-center gap-1.5'>
              <ShieldCheck className='w-4 h-4 text-emerald-400' /> Protected Portal
            </span>
            {/* <span className='text-slate-500'>
              Default Password: <code className='text-amber-400 font-mono bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800'>admin123</code>
            </span> */}
          </div>
        </div>

        {/* Back to main website link */}
        <div className='text-center mt-6'>
          <button
            onClick={() => navigate('/')}
            className='text-xs text-slate-400 hover:text-amber-400 transition cursor-pointer'
          >
            &larr; Return to Store Front
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
