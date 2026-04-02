'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2, BookOpen, Send, Mail, Calendar, User, Phone, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Intern {
    id: number;
    intern_id: string;
    name: string;
    email: string;
    status: string;
    join_date: string;
    phone?: string;
    progress?: number;
    module?: string;
}

export function InternsTable({ interns }: { interns: Intern[] }) {
    if (interns.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
                <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No Interns Registered</h3>
                <p className="text-gray-500 mt-1">Enroll your first intern to start tracking progress.</p>
            </div>
        );
    }

    return (
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-100">
                    <thead className="bg-gray-50/50">
                        <tr>
                            <th scope="col" className="py-4 pl-6 pr-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Intern Info</th>
                            <th scope="col" className="px-3 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Training Progress</th>
                            <th scope="col" className="px-3 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-3 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Joined</th>
                            <th scope="col" className="relative py-4 pl-3 pr-6 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                        {interns.map((intern) => (
                            <tr key={intern.id} className="hover:bg-indigo-50/20 transition-colors group">
                                <td className="whitespace-nowrap py-5 pl-6 pr-3">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-700 font-bold text-lg shadow-sm">
                                            {intern.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-gray-900">{intern.name}</div>
                                            <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
                                                <Mail className="h-3 w-3" /> {intern.email}
                                            </div>
                                            <div className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded mt-1 inline-block">
                                                ID: {intern.intern_id}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-3 py-5">
                                    <div className="w-full max-w-[180px]">
                                        <div className="flex justify-between items-center mb-1.5">
                                            <span className="text-[11px] font-bold text-gray-600">{intern.module || 'Web Dev'}</span>
                                            <span className="text-[11px] font-bold text-indigo-600">{intern.progress || 65}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-indigo-500 rounded-full transition-all duration-1000" 
                                                style={{ width: `${intern.progress || 65}%` }}
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-5">
                                    <span className={cn(
                                        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold ring-1 ring-inset",
                                        intern.status === 'active' || intern.status === 'Active' ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' :
                                        intern.status === 'completed' || intern.status === 'Completed' ? 'bg-blue-50 text-blue-700 ring-blue-600/20' :
                                        'bg-gray-50 text-gray-600 ring-gray-400/20'
                                    )}>
                                        <span className={cn(
                                            "h-1.5 w-1.5 rounded-full",
                                            intern.status === 'active' || intern.status === 'Active' ? 'bg-emerald-500' :
                                            intern.status === 'completed' || intern.status === 'Completed' ? 'bg-blue-500' :
                                            'bg-gray-400'
                                        )} />
                                        {intern.status.charAt(0).toUpperCase() + intern.status.slice(1)}
                                    </span>
                                </td>
                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                    <div className="flex items-center gap-1.5 font-medium">
                                        <Calendar className="h-3.5 w-3.5 text-gray-400" />
                                        {intern.join_date}
                                    </div>
                                </td>
                                <td className="relative whitespace-nowrap py-5 pl-3 pr-6 text-right">
                                    <div className="flex justify-end gap-1.5 bg-gray-50 group-hover:bg-transparent p-1 rounded-lg transition-colors inline-flex">
                                        <button 
                                            onClick={() => alert(`Generating certificate for ${intern.name}...`)}
                                            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" 
                                            title="Issue Certificate"
                                        >
                                            <Send className="h-4 w-4" />
                                        </button>
                                        <Link href={`/admin/interns/${intern.id}/edit`} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Edit Profile">
                                            <Edit2 className="h-4 w-4" />
                                        </Link>
                                        <button 
                                            className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" 
                                            title="Remove Intern"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
