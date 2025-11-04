import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { User, Lock, Mail, ArrowRight, Loader2, UserCheck } from 'lucide-react';

// Using namespace std for a clean structure!
function RegisterPage() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  // Watch the password field to validate 'password2'
  const password = watch('password');

  // --- Submission Handler ---
  const onSubmit = async (data) => {
    setLoading(true);
    setApiError('');

    // The URL for your new Django register endpoint
    const REGISTER_API_URL = 'http://127.0.0.1:8000/api/auth/register/';

    try {
      // Send all required fields to the backend
      const response = await axios.post(REGISTER_API_URL, {
        username: data.username,
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        password: data.password,
        password2: data.password2,
      });

      // If successful, redirect to the login page with a success message
      navigate('/login', {
        state: { message: 'Registration successful! Please log in.' }
      });

    } catch (error) {
      // Handle errors from the backend (e.g., "username already exists")
      let errorMessage = 'Registration failed. Please try again.';
      if (error.response?.data) {
        // Django validation errors are often in a dictionary
        const errorData = error.response.data;
        if (errorData.username) {
          errorMessage = `Username: ${errorData.username[0]}`;
        } else if (errorData.email) {
          errorMessage = `Email: ${errorData.email[0]}`;
        } else if (errorData.password) {
          errorMessage = `Password: ${errorData.password[0]}`;
        }
      }
      setApiError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[--color-background]">
      <div 
        className="w-full max-w-lg p-8 my-16 space-y-8 bg-[--color-card] brand-shadow-lg rounded-xl animate-fade-in-up micro-transition"
      >
        
        {/* Header Section */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-10 h-10 rounded-full fusion-gradient collaborative-glow flex items-center justify-center">
              <UserCheck className="text-white h-5 w-5" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-[--color-text-primary]">
            Create Your DevFusion Account
          </h2>
          <p className="mt-2 text-[--color-text-secondary]">
            Join the hub of academic innovation.
          </p>
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          
          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-[--color-text-secondary] mb-1">
                First Name
              </label>
              <InputWithIcon
                id="firstName"
                type="text"
                placeholder="Ada"
                icon={User}
                error={errors.firstName}
                register={register("firstName", { required: "First name is required." })}
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-[--color-text-secondary] mb-1">
                Last Name
              </label>
              <InputWithIcon
                id="lastName"
                type="text"
                placeholder="Lovelace"
                icon={User}
                error={errors.lastName}
                register={register("lastName", { required: "Last name is required." })}
                disabled={loading}
              />
            </div>
          </div>

          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-[--color-text-secondary] mb-1">
              Username
            </label>
            <InputWithIcon
              id="username"
              type="text"
              placeholder="alovelace"
              icon={User}
              error={errors.username}
              register={register("username", { required: "Username is required." })}
              disabled={loading}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[--color-text-secondary] mb-1">
              Email Address
            </label>
            <InputWithIcon
              id="email"
              type="email"
              placeholder="you@school.edu"
              icon={Mail}
              error={errors.email}
              register={register("email", { 
                required: "Email is required.",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email format." }
              })}
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[--color-text-secondary] mb-1">
              Password
            </label>
            <InputWithIcon
              id="password"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              error={errors.password}
              register={register("password", { 
                required: "Password is required.",
                minLength: { value: 8, message: "Password must be at least 8 characters." }
              })}
              disabled={loading}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="password2" className="block text-sm font-medium text-[--color-text-secondary] mb-1">
              Confirm Password
            </label>
            <InputWithIcon
              id="password2"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              error={errors.password2}
              register={register("password2", { 
                required: "Please confirm your password.",
                validate: value => value === password || "The passwords do not match."
              })}
              disabled={loading}
            />
          </div>
          
          {/* General Error Message */}
          {apiError && (
            <div className="p-3 text-sm text-[--color-error-foreground] bg-[--color-error] rounded-lg bg-opacity-90" role="alert">
              {apiError}
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
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </div>
        </form>
        
        {/* Footer Link */}
        <div className="text-sm text-center">
          <span className="text-[--color-text-secondary]">Already have an account? </span>
          <Link to="/login" className="font-medium text-[--color-primary] hover:text-opacity-80 micro-transition">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

// Helper component to render an input with an icon and error message
const InputWithIcon = ({ id, type, placeholder, icon: Icon, error, register, disabled }) => (
  <>
    <div className="relative">
      <Icon className="absolute top-1/2 left-3 -translate-y-1/2 h-4 w-4 text-[--color-muted-foreground]" />
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`w-full pl-10 pr-4 py-2 border rounded-lg bg-[--color-input] brand-transition 
          focus:ring-2 focus:ring-[--color-ring] focus:border-[--color-primary] 
          ${error ? 'border-[--color-error]' : 'border-[--color-border]'}`}
        {...register}
        disabled={disabled}
      />
    </div>
    {error && <p className="mt-1 text-xs text-[--color-error] font-medium">{error.message}</p>}
  </>
);

export default RegisterPage;