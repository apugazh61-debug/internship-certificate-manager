'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface ModuleProgress {
    module_id: number;
    module_name: string;
    status: string;
    score?: number | null;
}

export default function InternModulesPage() {
    const params = useParams();
    const router = useRouter();
    const [progress, setProgress] = useState<ModuleProgress[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProgress() {
            setLoading(true);
            try {
                const res = await fetch(`/api/interns/${params.id}/modules`);
                const data = await res.json();
                setProgress(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchProgress();
    }, [params.id]);

    const handleUpdate = async (moduleId: number, status: string, score: any) => {
        try {
            await fetch(`/api/interns/${params.id}/modules`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ module_id: moduleId, status, score: parseFloat(score) || null })
            });
            // Optimistic update
            setProgress(progress.map(p =>
                p.module_id === moduleId ? { ...p, status, score: parseFloat(score) || null } : p
            ));
        } catch (err) {
            alert('Failed to update');
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900 ">Intern Progress</h1>
                <Button variant="outline" onClick={() => router.back()}>Back to Interns</Button>
            </div>

            {loading ? <p>Loading...</p> : (
                <div className="bg-white shadow overflow-hidden sm:rounded-md ">
                    <ul role="list" className="divide-y divide-gray-200 ">
                        {progress.map((item) => (
                            <li key={item.module_id} className="px-4 py-4 sm:px-6 flex items-center justify-between">
                                <div className="flex-1">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900 ">{item.module_name}</h3>
                                </div>
                                <div className="flex items-center gap-4">
                                    <select
                                        className="rounded-md border-gray-300 py-1.5 text-base sm:text-sm   "
                                        value={item.status}
                                        onChange={(e) => handleUpdate(item.module_id, e.target.value, item.score)}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                    <input
                                        type="number"
                                        placeholder="Score"
                                        className="w-20 rounded-md border-gray-300 py-1.5 text-base sm:text-sm   "
                                        value={item.score || ''}
                                        onChange={(e) => handleUpdate(item.module_id, item.status, e.target.value)}
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
