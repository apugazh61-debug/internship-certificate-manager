'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';

export default function ModulesPage() {
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [newModule, setNewModule] = useState({ name: '', description: '', duration_days: 7 });

    useEffect(() => {
        fetchModules();
    }, []);

    async function fetchModules() {
        try {
            const res = await fetch('/api/modules');
            const data = await res.json();
            setModules(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        try {
            const res = await fetch('/api/modules', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newModule)
            });
            if (res.ok) {
                setIsCreating(false);
                fetchModules();
            }
        } catch (err) {
            alert('Error creating module');
        }
    }

    return (
        <div>
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900 ">Learning Modules</h1>
                    <p className="mt-2 text-sm text-gray-700 ">
                        Manage course curriculum and modules.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <Button onClick={() => setIsCreating(!isCreating)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Module
                    </Button>
                </div>
            </div>

            {isCreating && (
                <form onSubmit={handleCreate} className="mt-6 bg-white p-4 rounded shadow  space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <Label htmlFor="name">Module Name</Label>
                            <Input id="name" required value={newModule.name} onChange={e => setNewModule({ ...newModule, name: e.target.value })} />
                        </div>
                        <div>
                            <Label htmlFor="duration">Duration (Days)</Label>
                            <Input id="duration" type="number" required value={newModule.duration_days} onChange={e => setNewModule({ ...newModule, duration_days: parseInt(e.target.value) })} />
                        </div>
                        <div className="sm:col-span-2">
                            <Label htmlFor="description">Description</Label>
                            <Input id="description" value={newModule.description} onChange={e => setNewModule({ ...newModule, description: e.target.value })} />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="ghost" onClick={() => setIsCreating(false)}>Cancel</Button>
                        <Button type="submit">Save</Button>
                    </div>
                </form>
            )}

            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <ul role="list" className="divide-y divide-gray-100 ">
                            {modules.map((module: any) => (
                                <li key={module.id} className="flex justify-between gap-x-6 py-5">
                                    <div className="flex min-w-0 gap-x-4">
                                        <div className="min-w-0 flex-auto">
                                            <p className="text-sm font-semibold leading-6 text-gray-900 ">{module.name}</p>
                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500 ">{module.description}</p>
                                        </div>
                                    </div>
                                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                        <p className="text-sm leading-6 text-gray-900 ">{module.duration_days} days</p>
                                    </div>
                                </li>
                            ))}
                            {modules.length === 0 && !loading && <p className="text-gray-500 text-sm">No modules found.</p>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
