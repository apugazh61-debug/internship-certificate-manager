'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Award, GraduationCap, ChevronRight, LayoutDashboard, KeyRound, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('Pugazh@Alfiya');
    const [password, setPassword] = useState('PugazhAlfiya');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    // Forgot Password States
    const [showForgotForm, setShowForgotForm] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');
    const [isForgotSubmitted, setIsForgotSubmitted] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Demo condition for "approved" ramesh account
        if (email === 'ramesh@gmail.com' && password === 'Approved123') {
            setIsLoading(false);
            router.push('/admin');
            return;
        }

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (res.ok) {
                router.push('/admin');
            } else {
                const data = await res.json();
                setError(data.message || 'Login failed');
                setIsLoading(false);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            setIsLoading(false);
        }
    };

    const handleForgotSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call to send approval request to admin
        setTimeout(() => {
            setIsLoading(false);
            setIsForgotSubmitted(true);
            
            // Set localStorage to show notification in admin dashboard (for demo purposes)
            if (typeof window !== 'undefined') {
                localStorage.setItem('pendingResetRequest', forgotEmail);
            }
        }, 1500);
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Left Panel - Branding */}
            <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-linear-to-br from-indigo-900 via-[#1E1B4B] to-[#312E81] p-12 text-white overflow-hidden relative">
                {/* Decorative Background Elements */}
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse transition-all duration-1000"></div>
                <div className="absolute top-1/4 -right-24 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse transition-all duration-1000" style={{ animationDelay: '2s' }}></div>
                <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse transition-all duration-1000" style={{ animationDelay: '4s' }}></div>

                <div className="relative z-10 flex items-center gap-3">
                    <div className="bg-white/10 p-2 rounded-xl backdrop-blur-md border border-white/10 shadow-xl">
                        <Award className="h-8 w-8 text-indigo-300" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-white">CertiManage</span>
                </div>

                <div className="relative z-10 grow flex flex-col justify-center mt-12">
                    <div className="space-y-8 max-w-lg">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-200 text-sm font-medium backdrop-blur-md">
                            <LayoutDashboard className="h-4 w-4" />
                            Admin Portal
                        </div>
                        
                        <h1 className="text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                            Streamline your academic credentials securely.
                        </h1>
                        <p className="text-lg text-indigo-200 leading-relaxed font-light">
                            Automate internship certificates, track student progress, and analyze attendance all from one centralized dashboard tailored for institutions.
                        </p>

                        <div className="pt-8">
                            <div className="flex items-center gap-4 text-indigo-200 bg-white/5 w-max px-5 py-3 rounded-2xl border border-indigo-500/20 backdrop-blur-md shadow-lg">
                                <GraduationCap className="h-6 w-6 text-indigo-400" />
                                <span className="text-sm font-medium">Trusted by leading educational institutions</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-sm text-indigo-300 font-medium">
                    &copy; {new Date().getFullYear()} CertiManage. All rights reserved.
                </div>
            </div>

            {/* Right Panel - Form Area */}
            <div className="flex w-full lg:w-1/2 flex-col items-center justify-center p-8 sm:p-12 lg:p-24 bg-white shadow-2xl relative z-10">
                <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    
                    {/* Mobile Logo */}
                    <div className="flex items-center gap-3 lg:hidden justify-center mb-8">
                        <div className="bg-indigo-100 p-2.5 rounded-xl border border-indigo-200 shadow-sm">
                            <Award className="h-8 w-8 text-indigo-600" />
                        </div>
                        <span className="text-3xl font-extrabold tracking-tight text-gray-900">CertiManage</span>
                    </div>

                    {!showForgotForm ? (
                        <>
                            <div className="text-center lg:text-left space-y-3">
                                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                                    Welcome back
                                </h2>
                                <p className="text-gray-500 text-base">
                                    Please enter your credentials to sign in.
                                </p>
                            </div>

                            <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
                                <div className="space-y-5">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                                            Login ID
                                        </label>
                                        <div className="mt-2.5">
                                            <input
                                                id="email"
                                                name="email"
                                                type="text"
                                                autoComplete="username"
                                                required
                                                className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-all duration-200 bg-gray-50 focus:bg-white"
                                                placeholder="Pugazh@Alfiya"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                disabled={isLoading}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="password" className="block text-sm font-semibold leading-6 text-gray-900">
                                                Password
                                            </label>
                                            <div className="text-sm">
                                                <button 
                                                    type="button"
                                                    onClick={() => {
                                                        setShowForgotForm(true);
                                                        setForgotEmail(email);
                                                        setError('');
                                                    }}
                                                    className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
                                                >
                                                    Forgot password?
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mt-2.5">
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                autoComplete="current-password"
                                                required
                                                className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-all duration-200 bg-gray-50 focus:bg-white"
                                                placeholder="••••••••"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                disabled={isLoading}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {error && (
                                    <div className="rounded-xl bg-red-50 p-4 border border-red-200 shadow-sm">
                                        <div className="flex">
                                            <div className="ml-3">
                                                <h3 className="text-sm font-medium text-red-800">Authentication Failed</h3>
                                                <div className="mt-2 text-sm text-red-700">
                                                    <p>{error}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-3 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 hover:shadow-lg focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? (
                                            <span className="flex items-center gap-2">
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Signing in...
                                            </span>
                                        ) : (
                                            <>
                                                Sign in to Dashboard
                                                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        /* FORGOT PASSWORD FORM */
                        <div className="animate-in fade-in slide-in-from-right-8 duration-300">
                            <button 
                                onClick={() => {
                                    setShowForgotForm(false);
                                    setIsForgotSubmitted(false);
                                }}
                                className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-600 mb-6 transition-colors"
                            >
                                <ArrowLeft className="h-4 w-4" /> Back to Login
                            </button>
                            
                            <div className="text-center lg:text-left space-y-3 mb-8">
                                <div className="inline-flex p-3 rounded-2xl bg-indigo-50 border border-indigo-100 mb-2">
                                    <KeyRound className="h-6 w-6 text-indigo-600" />
                                </div>
                                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                                    Access Request
                                </h2>
                                <p className="text-gray-500 text-base">
                                    {!isForgotSubmitted 
                                        ? "Enter your Coordinator ID string. An approval request will be sent to the principal Administrator."
                                        : "Approval request successfully submitted."
                                    }
                                </p>
                            </div>

                            {!isForgotSubmitted ? (
                                <form onSubmit={handleForgotSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="forgot-email" className="block text-sm font-semibold leading-6 text-gray-900">
                                            Coordinator Login ID
                                        </label>
                                        <div className="mt-2.5">
                                            <input
                                                id="forgot-email"
                                                type="text"
                                                required
                                                className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-all duration-200 bg-gray-50 focus:bg-white"
                                                placeholder="ramesh@gmail.com"
                                                value={forgotEmail}
                                                onChange={(e) => setForgotEmail(e.target.value)}
                                                disabled={isLoading}
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="rounded-xl bg-orange-50 p-4 border border-orange-200 shadow-sm">
                                        <p className="text-sm text-orange-800 font-medium">
                                            Note: Your new password will only work after the admin approves your request from their dashboard.
                                        </p>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full flex items-center justify-center rounded-xl bg-indigo-600 px-3 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 hover:shadow-lg transition-all duration-200 disabled:opacity-70"
                                    >
                                        {isLoading ? 'Sending Request...' : 'Send Approval Request'}
                                    </button>
                                </form>
                            ) : (
                                <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center space-y-4">
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-green-900">Request Sent to Admin!</h3>
                                    <p className="text-sm text-green-700 font-medium leading-relaxed">
                                        The main administrator has been notified. Check back later to login once your request is approved.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                    
                    <p className="mt-8 text-center text-sm text-gray-500 absolute bottom-0 inset-x-0 pb-8 lg:static lg:pb-0">
                        Need help? Contact <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Technical Support</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
