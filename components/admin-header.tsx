'use client';

import { useState, useEffect } from 'react';
import { Bell, Search, UserCircle, ChevronDown, CheckCircle2, Clock, KeyRound } from 'lucide-react';

export function AdminHeader() {
    const [showNotifications, setShowNotifications] = useState(false);
    const [pendingResetRequest, setPendingResetRequest] = useState<string | null>(null);

    const [user, setUser] = useState<{ email: string; role: string } | null>(null);

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch('/api/auth/me');
                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                }
            } catch (error) {
                console.error("Failed to fetch user session", error);
            }
        }
        fetchUser();

        // Read from localstorage for reset requests
        if (typeof window !== 'undefined') {
            const req = localStorage.getItem('pendingResetRequest');
            if (req) setPendingResetRequest(req);
        }
    }, [showNotifications]);

    const handleApproveReset = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('pendingResetRequest');
            setPendingResetRequest(null);
            setShowNotifications(false);
            alert(`✅ Approved! The coordinator can now login with their approved credentials.`);
        }
    };

    const handleDenyReset = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('pendingResetRequest');
            setPendingResetRequest(null);
            setShowNotifications(false);
            alert(`❌ Request denied. The coordinator has been notified.`);
        }
    };

    return (
        <header className="flex h-20 items-center justify-between border-b border-indigo-100 bg-white/80 backdrop-blur-md px-8 sticky top-0 z-50">
            <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold tracking-tight text-indigo-950">Dashboard Overview</h1>
            </div>
            
            <div className="flex items-center gap-6">
                {/* Search Bar */}
                <div className="hidden md:flex relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Search interns, certificates..." 
                        className="w-64 pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 hover:bg-white transition-all shadow-sm"
                    />
                </div>

                {/* Notifications Dropdown Container */}
                <div className="relative">
                    <button 
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="relative p-2.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors focus:outline-none"
                    >
                        <Bell className="h-6 w-6" />
                        <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-rose-500 border-2 border-white"></span>
                    </button>

                    {/* Dropdown Menu */}
                    {showNotifications && (
                        <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl shadow-indigo-100/50 border border-indigo-50 overflow-hidden z-50 animate-in slide-in-from-top-2 fade-in">
                            <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                                <h3 className="font-semibold text-gray-900">Notifications</h3>
                                <span className="text-xs font-semibold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                                    {pendingResetRequest && user?.role === 'admin' ? '3 New' : '2 New'}
                                </span>
                            </div>
                            
                            <div className="max-h-80 overflow-y-auto">
                                {/* Dynamic Password Reset Request - Admin ONLY */}
                                {pendingResetRequest && user?.role === 'admin' && (
                                    <div className="p-4 border-b border-indigo-100 bg-indigo-50/50 hover:bg-indigo-50 transition-colors">
                                        <div className="flex gap-3">
                                            <div className="mt-1 h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                                                <KeyRound className="h-4 w-4 text-orange-600" />
                                            </div>
                                            <div className="w-full">
                                                <p className="text-sm text-gray-900 font-bold">Coordinator Access Request</p>
                                                <p className="text-xs text-gray-600 mt-1"><span className="font-medium text-gray-800">{pendingResetRequest}</span> has requested a password reset / access.</p>
                                                
                                                <div className="mt-3 flex gap-2 w-full">
                                                    <button onClick={handleApproveReset} className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold py-1.5 px-3 rounded-lg transition-colors">
                                                        ✓ Approve
                                                    </button>
                                                    <button onClick={handleDenyReset} className="flex-1 bg-white border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold py-1.5 px-3 rounded-lg transition-colors">
                                                        ✕ Deny
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer">
                                    <div className="flex gap-3">
                                        <div className="mt-1 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-800 font-medium">Certificates Generated</p>
                                            <p className="text-xs text-gray-500 mt-0.5">8 new certificates have been auto-generated for the AI/ML batch.</p>
                                            <p className="text-xs text-indigo-500 mt-2 flex items-center gap-1">
                                                <Clock className="w-3 h-3" /> Just now
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                                    <div className="flex gap-3">
                                        <div className="mt-1 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                            <UserCircle className="h-4 w-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-800 font-medium">New Intern Registered</p>
                                            <p className="text-xs text-gray-500 mt-0.5">Rahul from Web Dev module has completed the onboarding process.</p>
                                            <p className="text-xs text-indigo-500 mt-2 flex items-center gap-1">
                                                <Clock className="w-3 h-3" /> 2 hours ago
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="p-3 border-t border-gray-100 text-center bg-gray-50/50">
                                <button 
                                    onClick={() => setShowNotifications(false)}
                                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                                >
                                    Mark all as read
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Admin Profile */}
                <div className="flex items-center gap-3 pl-6 border-l border-gray-200 cursor-pointer group">
                    <div className="h-10 w-10 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
                        <UserCircle className="h-6 w-6" />
                    </div>
                    <div className="hidden md:block">
                        <p className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                            {user?.role === 'admin' ? 'College Admin' : (user?.email?.split('@')[0] || 'Coordinator')}
                        </p>
                        <p className="text-xs font-medium text-gray-500 capitalize">
                            {user?.role || 'Administrator'}
                        </p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                </div>
            </div>
        </header>
    );
}
