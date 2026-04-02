'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Plus, Search, Edit2, Trash2, Mail, Key, Phone, Calendar, Save, X, CheckCircle2, Lock } from 'lucide-react';

// Expanded Sample data
const initialCoordinators = [
    { id: 1, name: 'Suresh Kumar', email: 'suresh@college.edu', phone: '+91 98765 43210', role: 'Staff Coordinator', modules: 'Web Dev, Python', joinDate: '12 Jan 2024', status: 'Active' },
    { id: 2, name: 'Priya Rajan', email: 'priya@college.edu', phone: '+91 98765 11111', role: 'Lab Assistant', modules: 'AI/ML', joinDate: '24 Feb 2024', status: 'Active' },
    { id: 3, name: 'Karthik Vel', email: 'karthik@college.edu', phone: '+91 98765 22222', role: 'HOD', modules: 'Data Science', joinDate: '05 Mar 2024', status: 'Active' },
    { id: 4, name: 'Anitha S', email: 'anitha@college.edu', phone: '+91 98765 33333', role: 'Staff Coordinator', modules: 'Cyber Security', joinDate: '10 Mar 2024', status: 'Inactive' },
];

export default function CoordinatorsPage() {
    const [coordinators, setCoordinators] = useState(initialCoordinators);
    const [isAddRoute, setIsAddRoute] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isVerifying, setIsVerifying] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function checkRole() {
            try {
                const res = await fetch('/api/auth/me');
                if (res.ok) {
                    const data = await res.json();
                    if (data.user.role !== 'admin') {
                        router.push('/admin');
                    } else {
                        setIsVerifying(false);
                    }
                } else {
                    router.push('/login');
                }
            } catch (error) {
                router.push('/login');
            }
        }
        checkRole();
    }, [router]);

    // Form states
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Staff Coordinator', phone: '', modules: '' });

    if (isVerifying) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                <p className="text-gray-500 font-medium">Verifying access rights...</p>
            </div>
        );
    }

    const handleOpenAdd = () => {
        setFormData({ name: '', email: '', password: '', role: 'Staff Coordinator', phone: '', modules: '' });
        setIsAddRoute(true);
        setEditingId(null);
    };

    const handleOpenEdit = (coord: any) => {
        setFormData({ name: coord.name, email: coord.email, password: '', role: coord.role, phone: coord.phone || '', modules: coord.modules });
        setIsAddRoute(true);
        setEditingId(coord.id);
    };

    const [isSaving, setIsSaving] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    const handleSaveCoordinator = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setSuccessMsg('');

        if (editingId) {
            // Local edit (no password change needed for demo)
            setCoordinators(coordinators.map(c => c.id === editingId ? { ...c, ...formData } : c));
            setIsAddRoute(false);
            setEditingId(null);
            setIsSaving(false);
        } else {
            // POST to server to persist the login credentials
            try {
                const res = await fetch('/api/coordinators', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password,
                        name: formData.name,
                        role: formData.role,
                    }),
                });

                if (res.ok) {
                    const newEntry = {
                        id: coordinators.length + 1,
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone || '—',
                        role: formData.role,
                        modules: formData.modules || 'Unassigned',
                        joinDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                        status: 'Active'
                    };
                    setCoordinators([...coordinators, newEntry]);
                    setSuccessMsg(`✅ ${formData.name} can now login with the credentials you set.`);
                    setIsAddRoute(false);
                } else {
                    alert('Failed to save coordinator. Please try again.');
                }
            } catch {
                alert('Network error. Please try again.');
            } finally {
                setIsSaving(false);
            }
        }
    };

    const handleDelete = (id: number) => {
        if (window.confirm("Are you sure you want to delete this coordinator?")) {
            setCoordinators(coordinators.filter(c => c.id !== id));
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header Area */}
            <div className="sm:flex sm:items-center sm:justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-3">
                        <div className="p-2 bg-indigo-100 rounded-xl shadow-sm">
                            <ShieldCheck className="h-6 w-6 text-indigo-600" />
                        </div>
                        Manage Coordinators
                    </h1>
                    <p className="mt-2 text-sm text-gray-600 max-w-2xl">
                        Create and manage staff access. Coordinators can be assigned specific modules and permissions within the dashboard.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0">
                    {!isAddRoute && (
                        <button 
                            onClick={handleOpenAdd}
                            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 hover:shadow-md transition-all duration-200"
                        >
                            <Plus className="h-4 w-4" />
                            Add New Coordinator
                        </button>
                    )}
                </div>
            </div>

            {/* Main Content Area */}
            {isAddRoute ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8 animate-in fade-in slide-in-from-bottom-4 relative">
                    <button onClick={() => setIsAddRoute(false)} className="absolute top-6 right-6 p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                    
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-indigo-900">
                        {editingId ? <Edit2 className="h-5 w-5 text-indigo-500" /> : <Plus className="h-5 w-5 text-indigo-500" />}
                        {editingId ? 'Edit Coordinator Details' : 'Setup New Access'}
                    </h2>
                    
                    <form onSubmit={handleSaveCoordinator} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900 mb-1.5">Full Name</label>
                                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="block w-full rounded-xl border-0 py-2.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm bg-gray-50 hover:bg-white transition-colors" placeholder="e.g. Ramesh" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900 mb-1.5">Role Title</label>
                                <input required type="text" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="block w-full rounded-xl border-0 py-2.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm bg-gray-50 hover:bg-white transition-colors" placeholder="e.g. Staff Coordinator" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900 mb-1.5">Assigned Modules</label>
                                <input required type="text" value={formData.modules} onChange={e => setFormData({...formData, modules: e.target.value})} className="block w-full rounded-xl border-0 py-2.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm bg-gray-50 hover:bg-white transition-colors" placeholder="e.g. Web Dev, AI" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900 mb-1.5">Login ID / Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input required type="text" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="block w-full rounded-xl border-0 py-2.5 pl-10 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm bg-gray-50 hover:bg-white transition-colors" placeholder="ramesh@college.edu" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900 mb-1.5">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="block w-full rounded-xl border-0 py-2.5 pl-10 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm bg-gray-50 hover:bg-white transition-colors" placeholder="+91 98765 43210" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900 mb-1.5">
                                    {editingId ? 'Change Password (leave blank to keep current)' : 'Initial Password'}
                                </label>
                                <div className="relative">
                                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input type="text" required={!editingId} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="block w-full rounded-xl border-0 py-2.5 pl-10 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm bg-gray-50 hover:bg-white transition-colors" placeholder={editingId ? '********' : 'SuperSecret123'} />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
                            <button type="button" onClick={() => setIsAddRoute(false)} className="rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors">Cancel</button>
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isSaving ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                        </svg>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-4 w-4" />
                                        {editingId ? 'Save Changes' : 'Create Coordinator'}
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            ) : null}

            {/* Success Banner */}
            {successMsg && (
                <div className="mb-6 flex items-center gap-3 rounded-2xl bg-emerald-50 border border-emerald-200 px-5 py-4 shadow-sm animate-in fade-in slide-in-from-top-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                    <p className="text-sm font-semibold text-emerald-800">{successMsg}</p>
                    <button onClick={() => setSuccessMsg('')} className="ml-auto text-emerald-500 hover:text-emerald-700">
                        <X className="h-4 w-4" />
                    </button>
                </div>
            )}

            {/* List Area */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between bg-gray-50/50 gap-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        Active Coordinators <span className="bg-indigo-100 text-indigo-700 text-xs px-2.5 py-0.5 rounded-full">{coordinators.length}</span>
                    </h3>
                    <div className="relative w-full sm:w-auto">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input type="text" placeholder="Search staff by name or role..." className="w-full sm:w-72 pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-all" />
                    </div>
                </div>

                <ul className="divide-y divide-gray-100">
                    {coordinators.length === 0 ? (
                        <div className="p-12 text-center">
                            <ShieldCheck className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                            <p className="text-gray-500 font-medium">No coordinators found.</p>
                        </div>
                    ) : (
                        coordinators.map((coord) => (
                            <li key={coord.id} className="p-4 sm:p-6 hover:bg-indigo-50/30 transition-colors flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                                <div className="flex gap-4 items-center flex-1">
                                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-700 font-bold text-xl shadow-sm">
                                        {coord.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="text-base font-bold text-gray-900">{coord.name}</h4>
                                        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
                                            <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-gray-400"/> {coord.email}</p>
                                            <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-gray-400"/> {coord.phone}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex flex-wrap items-center gap-6 flex-1 xl:justify-between">
                                    <div className="space-y-1">
                                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Role</p>
                                        <span className="inline-flex items-center rounded-md bg-purple-50 px-2.5 py-1 text-xs font-semibold text-purple-700 ring-1 ring-inset ring-purple-700/10">
                                            {coord.role}
                                        </span>
                                    </div>

                                    <div className="space-y-1 min-w-[120px]">
                                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Modules assigned</p>
                                        <p className="text-sm font-medium text-gray-900">{coord.modules}</p>
                                    </div>
                                    
                                    <div className="space-y-1 hidden lg:block">
                                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Joined</p>
                                        <p className="text-sm font-medium text-gray-900 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-gray-400"/> {coord.joinDate}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-4 border-t pt-4 xl:border-0 xl:pt-0">
                                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${coord.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                                        <span className={`h-1.5 w-1.5 rounded-full ${coord.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span> {coord.status}
                                    </span>
                                    <div className="flex gap-1 bg-gray-50 p-1 rounded-lg border border-gray-100">
                                        <button onClick={() => handleOpenEdit(coord)} title="Edit Details" className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-white rounded-md transition-all hover:shadow-sm">
                                            <Edit2 className="h-4 w-4" />
                                        </button>
                                        <button onClick={() => handleDelete(coord.id)} title="Remove Access" className="p-2 text-gray-500 hover:text-rose-600 hover:bg-white rounded-md transition-all hover:shadow-sm">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
}
