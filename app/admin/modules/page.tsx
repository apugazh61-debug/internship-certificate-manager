'use client';

import { useState } from 'react';
import { BookOpen, Plus, Search, Edit2, Trash2, Clock, Users, ChevronRight, GraduationCap } from 'lucide-react';

// Sample data with enriched fields
const mockModules = [
    { id: 1, name: 'Fundamentals of UI/UX Design', description: 'A complete guide to wireframing, prototyping, and user psychology using Modern UI principles.', duration_days: 15, enrolled: 45, status: 'Active', category: 'Design', tech: 'Figma, Adobe XD', difficulty: 'Beginner' },
    { id: 2, name: 'Full-Stack Web Development', description: 'Comprehensive training covering React ecosystem, Node.js backend, and database architecture.', duration_days: 60, enrolled: 120, status: 'Active', category: 'Development', tech: 'Next.js, SQL, Node', difficulty: 'Advanced' },
    { id: 3, name: 'Applied Data Science & ML', description: 'Intensive module on statistical analysis, machine learning algorithms, and deep neural networks.', duration_days: 45, enrolled: 38, status: 'Active', category: 'Data AI', tech: 'Python, PyTorch', difficulty: 'Intermediate' },
    { id: 4, name: 'Cyber Security Essentials', description: 'Network security protocols, ethical hacking baselines, and vulnerability assessments.', duration_days: 30, enrolled: 22, status: 'Upcoming', category: 'Security', tech: 'Linux, Wireshark', difficulty: 'Intermediate' },
];

export default function ModulesPage() {
    const [modules, setModules] = useState(mockModules);
    const [isCreating, setIsCreating] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [newModule, setNewModule] = useState({ name: '', description: '', duration_days: 30, category: 'Development', tech: '', difficulty: 'Beginner', status: 'Active' });

    async function handleSave(e: React.FormEvent) {
        e.preventDefault();
        if (editingId) {
            setModules(modules.map(m => m.id === editingId ? { ...m, ...newModule } : m));
        } else {
            const newEntry = {
                id: modules.length + 1,
                ...newModule,
                enrolled: 0,
            };
            setModules([newEntry, ...modules]);
        }
        setIsCreating(false);
        setEditingId(null);
        setNewModule({ name: '', description: '', duration_days: 30, category: 'Development', tech: '', difficulty: 'Beginner', status: 'Active' });
    }

    const handleEdit = (module: any) => {
        setNewModule({ 
            name: module.name, 
            description: module.description, 
            duration_days: module.duration_days,
            category: module.category || 'Development',
            tech: module.tech || '',
            difficulty: module.difficulty || 'Beginner',
            status: module.status || 'Active'
        });
        setEditingId(module.id);
        setIsCreating(true);
    };

    const handleDelete = (id: number) => {
        if(window.confirm("Are you sure you want to remove this module?")) {
            setModules(modules.filter(m => m.id !== id));
        }
    }

    return (
        <div className="max-w-7xl mx-auto pb-10">
            {/* Header Section */}
            <div className="sm:flex sm:items-center sm:justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-3">
                        <div className="p-2 bg-indigo-100 rounded-xl shadow-sm">
                            <BookOpen className="h-6 w-6 text-indigo-600" />
                        </div>
                        Learning Modules
                    </h1>
                    <p className="mt-2 text-sm text-gray-600 max-w-2xl">
                        Manage training programs, course duration, and track how many interns are enrolled in each active curriculum.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0">
                    {!isCreating && (
                        <button 
                            onClick={() => setIsCreating(true)}
                            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all duration-200"
                        >
                            <Plus className="h-4 w-4" />
                            Add New Module
                        </button>
                    )}
                </div>
            </div>

            {/* Create Module UI */}
            {isCreating && (
                <div className="bg-white rounded-2xl shadow-sm border border-indigo-100 p-8 mb-8 animate-in fade-in slide-in-from-top-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 bg-indigo-500/5 rounded-bl-full pointer-events-none"></div>
                    
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-indigo-900">
                        {editingId ? <Edit2 className="h-5 w-5 text-indigo-500" /> : <Plus className="h-5 w-5 text-indigo-500" />}
                        {editingId ? 'Edit Module Details' : 'Configure New Module'}
                    </h2>
                    
                    <form onSubmit={handleSave} className="space-y-6 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="md:col-span-2 lg:col-span-3">
                                <label className="block text-sm font-medium leading-6 text-gray-900 mb-1.5">Module Title</label>
                                <input required type="text" value={newModule.name} onChange={e => setNewModule({...newModule, name: e.target.value})} className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm bg-gray-50 hover:bg-white transition-colors" placeholder="e.g. Advanced Cloud Computing" />
                            </div>
                            
                            <div className="md:col-span-2 lg:col-span-3">
                                <label className="block text-sm font-medium leading-6 text-gray-900 mb-1.5">Detailed Description</label>
                                <textarea required value={newModule.description} onChange={e => setNewModule({...newModule, description: e.target.value})} rows={3} className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm bg-gray-50 hover:bg-white transition-colors" placeholder="What will the interns learn?" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900 mb-1.5">Category</label>
                                <select value={newModule.category} onChange={e => setNewModule({...newModule, category: e.target.value})} className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm bg-gray-50">
                                    <option>Development</option>
                                    <option>Design</option>
                                    <option>Data AI</option>
                                    <option>Security</option>
                                    <option>Marketing</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900 mb-1.5">Difficulty</label>
                                <select value={newModule.difficulty} onChange={e => setNewModule({...newModule, difficulty: e.target.value})} className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm bg-gray-50">
                                    <option>Beginner</option>
                                    <option>Intermediate</option>
                                    <option>Advanced</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900 mb-1.5">Duration (Days)</label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input required type="number" min="1" value={newModule.duration_days} onChange={e => setNewModule({...newModule, duration_days: parseInt(e.target.value)})} className="block w-full rounded-xl border-0 py-3 pl-10 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm bg-gray-50 hover:bg-white transition-colors" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900 mb-1.5">Technology Stack</label>
                                <input type="text" value={newModule.tech} onChange={e => setNewModule({...newModule, tech: e.target.value})} className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm bg-gray-50" placeholder="e.g. React, Node.js" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900 mb-1.5">Module Status</label>
                                <select value={newModule.status} onChange={e => setNewModule({...newModule, status: e.target.value})} className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm bg-gray-50">
                                    <option>Active</option>
                                    <option>Upcoming</option>
                                    <option>Paused</option>
                                    <option>Finished</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-8 flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
                            <button type="button" onClick={() => { setIsCreating(false); setEditingId(null); }} className="rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors">Cancel</button>
                            <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all">
                                {editingId ? 'Update Module' : 'Publish Module'} <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Modules Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {modules.map((module) => (
                    <div key={module.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow group flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${module.status === 'Active' ? 'bg-indigo-50 text-indigo-600' : 'bg-orange-50 text-orange-600'}`}>
                                        <GraduationCap className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-gray-900 text-lg leading-tight">{module.name}</h3>
                                            <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-500 px-2 py-0.5 rounded border border-gray-200">
                                                {module.category}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full ${module.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                                                <span className={`h-1.5 w-1.5 rounded-full ${module.status === 'Active' ? 'bg-emerald-500' : 'bg-orange-500'}`}></span> {module.status}
                                            </span>
                                            <span className="text-xs font-medium text-gray-400">• {module.difficulty}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-1 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleEdit(module)} className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg">
                                        <Edit2 className="h-4 w-4" />
                                    </button>
                                    <button onClick={() => handleDelete(module.id)} className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                            
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                {module.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {module.tech?.split(',').map((t, idx) => (
                                    <span key={idx} className="text-[11px] font-medium bg-indigo-50/50 text-indigo-600 px-2 py-1 rounded-md border border-indigo-100/50">
                                        {t.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2 text-gray-500">
                                <Clock className="w-4 h-4 text-indigo-400" />
                                <span className="text-sm font-medium">{module.duration_days} Days</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-500">
                                <Users className="w-4 h-4 text-indigo-400" />
                                <span className="text-sm font-medium">{module.enrolled} Enrolled Interns</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {modules.length === 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
                    <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No Learning Modules</h3>
                    <p className="text-gray-500 mt-1">Get started by creating a new curriculum module.</p>
                </div>
            )}
        </div>
    );
}
