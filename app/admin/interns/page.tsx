'use client';

import { useEffect, useState } from 'react';
import { InternsTable } from '@/components/interns-table';
import { Plus, Users, Search, Filter, Download } from 'lucide-react';
import Link from 'next/link';

export default function InternsPage() {
    const [interns, setInterns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        async function fetchInterns() {
            try {
                const res = await fetch('/api/interns');
                if (res.ok) {
                    const data = await res.json();
                    setInterns(data);
                }
            } catch (error) {
                console.error('Failed to fetch interns', error);
            } finally {
                setLoading(false);
            }
        }
        fetchInterns();
    }, []);

    const filteredInterns = interns.filter((i: any) => 
        i.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        i.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.intern_id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto pb-10">
            {/* Header Section */}
            <div className="sm:flex sm:items-center sm:justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-3">
                        <div className="p-2 bg-indigo-100 rounded-xl shadow-sm">
                            <Users className="h-6 w-6 text-indigo-600" />
                        </div>
                        Manage Interns
                    </h1>
                    <p className="mt-2 text-sm text-gray-600 max-w-2xl">
                        Monitor intern progress, manage enrollment details, and issue training certificates upon completion.
                    </p>
                </div>
                <div className="flex gap-3 mt-4 sm:mt-0">
                    <button onClick={() => alert('Exporting to Excel...')} className="inline-flex items-center gap-2 rounded-xl bg-white border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-all">
                        <Download className="h-4 w-4 text-gray-400" />
                        Export
                    </button>
                    <Link href="/admin/interns/new">
                        <button className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all duration-200">
                            <Plus className="h-4 w-4" />
                            Enroll New Intern
                        </button>
                    </Link>
                </div>
            </div>

            {/* Top Stats and Search */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-6">
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Enrolled</span>
                            <span className="text-2xl font-bold text-gray-900">{interns.length}</span>
                        </div>
                        <div className="flex flex-col border-l border-gray-100 pl-6">
                            <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-1">Active Now</span>
                            <span className="text-2xl font-bold text-gray-900">{interns.filter((i:any) => i.status?.toLowerCase() === 'active').length}</span>
                        </div>
                        <div className="flex flex-col border-l border-gray-100 pl-6">
                            <span className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-1">Completed</span>
                            <span className="text-2xl font-bold text-gray-900">{interns.filter((i:any) => i.status?.toLowerCase() === 'completed').length}</span>
                        </div>
                    </div>
                    
                    <div className="flex gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input 
                                type="text" 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search interns..." 
                                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm" 
                            />
                        </div>
                        <button className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 flex items-center gap-2 text-sm font-medium text-gray-600 transition-all shadow-sm">
                            <Filter className="h-4 w-4 text-gray-400" />
                            Filters
                        </button>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center min-h-[300px] bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mb-4"></div>
                    <p className="text-gray-500 font-medium">Fetching intern database...</p>
                </div>
            ) : (
                <InternsTable interns={searchTerm ? filteredInterns : interns} />
            )}
        </div>
    );
}
