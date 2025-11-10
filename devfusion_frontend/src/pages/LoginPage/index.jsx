import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Lock, Loader2, ArrowRight } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/authSlice'; 

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setLoading(true);
    setLoginError('');

    const LOGIN_API_URL = 'http://127.0.0.1:8000/api/auth/login/';

    try {
      const response = await axios.post(LOGIN_API_URL, {
        username: data.username,
        password: data.password,
      });

      const { access, refresh } = response.data;
      
      dispatch(loginSuccess({ access, refresh }));

      navigate('/student-profile-hub'); 

    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'Authentication failed. Invalid credentials.';
      setLoginError(errorMessage);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-[--color-background]">
      <div 
        className="w-full max-w-md p-8 space-y-8 bg-[--color-card] brand-shadow-lg rounded-xl animate-fade-in-up micro-transition"
      >
        {/* ... (Header) ... */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[--color-text-primary]">
            Sign in to DevFusion
          </h2>
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* ... (Username field) ... */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-[--color-text-secondary] mb-1">
              Username
            </label>
            <div className="relative">
              <User className="absolute top-1/2 left-3 -translate-y-1/2 h-4 w-4 text-[--color-muted-foreground]" />
              <input
                id="username"
                type="text" 
                placeholder="Enter your username"
                className={`w-full pl-10 pr-4 py-2 border rounded-lg bg-[--color-input] brand-transition 
                  focus:ring-2 focus:ring-[--color-ring] focus:border-[--color-primary] 
                  ${errors.username ? 'border-[--color-error]' : 'border-[--color-border]'}`}
                {...register("username", { 
                  required: "Username is required.",
                })}
                disabled={loading}
              />
            </div>
            {errors.username && <p className="mt-1 text-xs text-[--color-error] font-medium">{errors.username.message}</p>}
          </div>

          {/* ... (Password field) ... */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[--color-text-secondary] mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute top-1/2 left-3 -translate-y-1/2 h-4 w-4 text-[--color-muted-foreground]" />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className={`w-full pl-10 pr-4 py-2 border rounded-lg bg-[--color-input] brand-transition
                  focus:ring-2 focus:ring-[--color-ring] focus:border-[--color-primary] 
                  ${errors.password ? 'border-[--color-error]' : 'border-[--color-border]'}`}
                {...register("password", { 
                  required: "Password is required.",
                })}
                disabled={loading}
              />
            </div>
            {errors.password && <p className="mt-1 text-xs text-[--color-error] font-medium">{errors.password.message}</p>}
          </div>

          {/* ... (Error Message, Button, Footer Links) ... */}
          {loginError && (
            <div className="p-3 text-sm text-[--color-error-foreground] bg-[--color-error] rounded-lg bg-opacity-90" role="alert">
              {loginError}
            </div>
          )}
          <div>
            <button
              type="submit"
              className={`w-full flex justify-center items-center py-2 px-4 border border-transparent 
                rounded-lg shadow-sm text-sm font-medium text-[--color-primary-foreground] bg-[--color-primary] 
                hover:bg-opacity-90 micro-transition focus:outline-none focus:ring-2 focus:ring-offset-2 
                focus:ring-[--color-ring] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading 
                ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                : <ArrowRight className="mr-2 h-4 w-4" />
              }
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </div>
          <div className="flex justify-between text-sm">
            <a href="#" className="font-medium text-[--color-text-secondary] hover:text-[--color-primary] micro-transition">
              Forgot Password?
            </a>
            <a href="/register" className="font-medium text-[--color-primary] hover:text-opacity-80 micro-transition">
              Create an Account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;