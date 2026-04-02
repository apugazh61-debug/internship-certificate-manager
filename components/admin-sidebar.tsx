'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, BookOpen, FileCheck, LogOut, Banknote } from 'lucide-react';
import { cn } from '@/lib/utils'; // Ensure lib/utils exists from previous steps

const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Interns', href: '/admin/interns', icon: Users },
    { name: 'Modules', href: '/admin/modules', icon: BookOpen },
    { name: 'Stipends', href: '/admin/stipends', icon: Banknote },
    { name: 'Certificates', href: '/admin/certificates', icon: FileCheck },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-full w-64 flex-col border-r bg-white  ">
            <div className="flex h-16 items-center justify-center border-b px-6 ">
                <span className="text-lg font-bold tracking-tight text-gray-900 ">InternManager</span>
            </div>
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                <nav className="mt-1 flex-1 space-y-1 px-4">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    isActive
                                        ? 'bg-gray-100 text-gray-900  '
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900  :bg-gray-800 :text-white',
                                    'group flex items-center rounded-md px-2 py-2 text-sm font-medium'
                                )}
                            >
                                <item.icon
                                    className={cn(
                                        isActive ? 'text-gray-500 ' : 'text-gray-400 group-hover:text-gray-500  :text-gray-300',
                                        'mr-3 h-5 w-5 flex-shrink-0'
                                    )}
                                    aria-hidden="true"
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>
            <div className="border-t p-4 ">
                <form action="/api/auth/logout" method="POST">
                    {/* We'll implement logout via API or server action later, for now just a button */}
                    <button
                        type="button"
                        className="group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900  :bg-gray-800 :text-white"
                        onClick={async () => {
                            // Temporary client-side logout handler
                            await fetch('/api/auth/logout', { method: 'POST' });
                            window.location.href = '/login';
                        }}
                    >
                        <LogOut
                            className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500  :text-gray-300"
                            aria-hidden="true"
                        />
                        Sign out
                    </button>
                </form>
            </div>
        </div>
    );
}
