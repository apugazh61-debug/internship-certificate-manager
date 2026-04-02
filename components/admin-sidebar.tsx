'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { LayoutDashboard, Users, BookOpen, FileCheck, LogOut, Banknote, ShieldCheck, UserCog } from 'lucide-react';
import { cn } from '@/lib/utils'; 

interface User {
    email: string;
    role: string;
}

const navigation = [
    { name: 'Dashboard Overview', href: '/admin', icon: LayoutDashboard, roles: ['admin', 'coordinator'] },
    { name: 'Manage Coordinators', href: '/admin/coordinators', icon: UserCog, roles: ['admin'] },
    { name: 'Manage Interns', href: '/admin/interns', icon: Users, roles: ['admin', 'coordinator'] },
    { name: 'Training Modules', href: '/admin/modules', icon: BookOpen, roles: ['admin', 'coordinator'] },
    { name: 'Stipends & Payouts', href: '/admin/stipends', icon: Banknote, roles: ['admin'] },
    { name: 'Certificates', href: '/admin/certificates', icon: FileCheck, roles: ['admin', 'coordinator'] },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const [user, setUser] = useState<User | null>(null);

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
    }, []);

    const filteredNavigation = navigation.filter(item => 
        !user || item.roles.includes(user.role)
    );

    return (
        <div className="flex h-full w-72 flex-col bg-[#111119] text-white overflow-hidden shadow-2xl relative border-r border-indigo-900/50">
            {/* Dark glowing gradient effect */}
            <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-indigo-600/20 to-transparent pointer-events-none"></div>

            <div className="flex h-20 items-center gap-3 border-b border-indigo-800/50 px-8 relative z-10">
                <div className="bg-indigo-500/20 p-2 rounded-xl backdrop-blur-md border border-indigo-400/20">
                    <ShieldCheck className="h-7 w-7 text-indigo-400" />
                </div>
                <span className="text-xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200">
                    CertiManage
                </span>
            </div>

            <div className="flex flex-1 flex-col overflow-y-auto pt-8 pb-4 relative z-10 scrollbar-thin scrollbar-thumb-indigo-900 scrollbar-track-transparent">
                <div className="px-6 mb-4 text-xs font-semibold tracking-wider text-indigo-300/50 uppercase">
                    {user?.role === 'admin' ? 'Super Admin Menu' : 'Staff Menu'}
                </div>
                
                <nav className="mt-1 flex-1 space-y-2 px-4">
                    {filteredNavigation.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    isActive
                                        ? 'bg-indigo-600/10 text-indigo-300 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.05)]'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-gray-200 border border-transparent',
                                    'group flex items-center rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200'
                                )}
                            >
                                <item.icon
                                    className={cn(
                                        isActive ? 'text-indigo-400' : 'text-gray-500 group-hover:text-gray-300',
                                        'mr-4 h-5 w-5 flex-shrink-0 transition-colors'
                                    )}
                                    aria-hidden="true"
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>
            
            <div className="border-t border-indigo-800/50 p-6 relative z-10 bg-black/20">
                <form action="/api/auth/logout" method="POST">
                    <button
                        type="button"
                        className="group flex w-full items-center rounded-xl px-4 py-3.5 text-sm font-medium text-rose-300/70 hover:bg-rose-500/10 hover:text-rose-400 border border-transparent hover:border-rose-500/20 transition-all duration-200"
                        onClick={async () => {
                            await fetch('/api/auth/logout', { method: 'POST' });
                            window.location.href = '/login';
                        }}
                    >
                        <LogOut
                            className="mr-4 h-5 w-5 flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity"
                            aria-hidden="true"
                        />
                        Sign out securely
                    </button>
                </form>
            </div>
        </div>
    );
}
