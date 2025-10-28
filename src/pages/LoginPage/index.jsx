import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

// Using namespace std for clean structure!
function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // --- Submission Handler ---
  // --- Submission Handler ---
  const onSubmit = async (data) => {
    setLoading(true);
    setLoginError('');

    const LOGIN_API_URL = 'YOUR_BACKEND_API_URL/login';

    // ////////////////////////////////////////////////////////////////////////
    // // CIPHER MODIFICATION: Force local test credentials check first
    // ////////////////////////////////////////////////////////////////////////
    const { email, password } = data;

    // 1. Check for hardcoded test credentials (for testing purposes)
    if (email === 'test@example.com' && password === 'password') {
        // Simulate success delay
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        
        localStorage.setItem('authToken', 'fake-token-123');
        navigate('/student-profile-hub'); // Assuming this is your profile route
        setLoading(false);
        return; // Exit the function after successful test login
    }
    
    // 2. If not test credentials, proceed with the actual API call
    try {
      // NOTE: This will likely fail until you replace the placeholder URL
      const response = await axios.post(LOGIN_API_URL, data);

      const token = response.data.token;
      localStorage.setItem('authToken', token);
      
      // Navigate on real API success
      navigate('/student-profile-hub'); 

    } catch (error) {
      // Handles both API failure and incorrect test password/username attempt
      const errorMessage = error.response?.data?.message || 'Authentication failed. Invalid credentials.';
      setLoginError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Outer container uses your custom background color and centers the content
    <div className="flex items-center justify-center min-h-screen bg-[--color-background]">
      <div 
        // Card styling using your custom utility classes and animations
        className="w-full max-w-md p-8 space-y-8 bg-[--color-card] brand-shadow-lg rounded-xl animate-fade-in-up micro-transition"
      >
        
        {/* Header Section with Custom Brand Gradient */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-10 h-10 rounded-full fusion-gradient collaborative-glow flex items-center justify-center">
              <Lock className="text-white h-5 w-5" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-[--color-text-primary]">
            Sign in to DevFusion
          </h2>
          <p className="mt-2 text-[--color-text-secondary]">
            Welcome back, Alchemist!
          </p>
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          
          {/* Email Input Group */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[--color-text-secondary] mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute top-1/2 left-3 -translate-y-1/2 h-4 w-4 text-[--color-muted-foreground]" />
              <input
                id="email"
                type="email"
                placeholder="you@devfusion.com"
                className={`w-full pl-10 pr-4 py-2 border rounded-lg bg-[--color-input] brand-transition 
                  focus:ring-2 focus:ring-[--color-ring] focus:border-[--color-primary] 
                  ${errors.email ? 'border-[--color-error]' : 'border-[--color-border]'}`}
                {...register("email", { 
                  required: "Email is required.",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email format." }
                })}
                disabled={loading}
              />
            </div>
            {errors.email && <p className="mt-1 text-xs text-[--color-error] font-medium">{errors.email.message}</p>}
          </div>

          {/* Password Input Group */}
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
                  minLength: { value: 6, message: "Password must be at least 6 characters." }
                })}
                disabled={loading}
              />
            </div>
            {errors.password && <p className="mt-1 text-xs text-[--color-error] font-medium">{errors.password.message}</p>}
          </div>
          
          {/* General Error Message */}
          {loginError && (
            <div className="p-3 text-sm text-[--color-error-foreground] bg-[--color-error] rounded-lg bg-opacity-90" role="alert">
              {loginError}
            </div>
          )}

          {/* Submit Button */}
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
        </form>
        
        {/* Footer/Links */}
        <div className="flex justify-between text-sm">
          <a href="#" className="font-medium text-[--color-text-secondary] hover:text-[--color-primary] micro-transition">
            Forgot Password?
          </a>
          <a href="/register" className="font-medium text-[--color-primary] hover:text-opacity-80 micro-transition">
            Create an Account
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;