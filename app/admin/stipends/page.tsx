'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function StipendsPage() {
    const [stipends, setStipends] = useState([]);
    const [interns, setInterns] = useState([]); // For dropdown
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [newStipend, setNewStipend] = useState({ intern_id: '', amount: '', payment_date: '', notes: '' });
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

    useEffect(() => {
        if (!isVerifying) {
            fetchStipends();
            fetchInterns();
        }
    }, [isVerifying]);

    if (isVerifying) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                <p className="text-gray-500 font-medium">Verifying access rights...</p>
            </div>
        );
    }

    async function fetchStipends() {
        try {
            const res = await fetch('/api/stipends');
            const data = await res.json();
            setStipends(data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    }

    async function fetchInterns() {
        try {
            const res = await fetch('/api/interns');
            if (res.ok) setInterns(await res.json());
        } catch (err) { }
    }

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        try {
            const res = await fetch('/api/stipends', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newStipend)
            });
            if (res.ok) {
                setIsCreating(false);
                fetchStipends();
                setNewStipend({ intern_id: '', amount: '', payment_date: '', notes: '' });
            }
        } catch (err) {
            alert('Error creating stipend');
        }
    }

    return (
        <div>
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900 ">Stipends & Payments</h1>
                    <p className="mt-2 text-sm text-gray-700 ">
                        Track intern stipends.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <Button onClick={() => setIsCreating(!isCreating)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Record Payment
                    </Button>
                </div>
            </div>

            {isCreating && (
                <form onSubmit={handleCreate} className="mt-6 bg-white p-4 rounded shadow  space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <Label htmlFor="intern">Intern</Label>
                            <select
                                id="intern"
                                required
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  "
                                value={newStipend.intern_id}
                                onChange={e => setNewStipend({ ...newStipend, intern_id: e.target.value })}
                            >
                                <option value="">Select Intern</option>
                                {interns.map((intern: any) => (
                                    <option key={intern.id} value={intern.id}>{intern.name} ({intern.intern_id})</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <Label htmlFor="amount">Amount</Label>
                            <Input id="amount" type="number" required value={newStipend.amount} onChange={e => setNewStipend({ ...newStipend, amount: e.target.value })} />
                        </div>
                        <div>
                            <Label htmlFor="date">Payment Date</Label>
                            <Input id="date" type="date" required value={newStipend.payment_date} onChange={e => setNewStipend({ ...newStipend, payment_date: e.target.value })} />
                        </div>
                        <div>
                            <Label htmlFor="notes">Notes</Label>
                            <Input id="notes" value={newStipend.notes} onChange={e => setNewStipend({ ...newStipend, notes: e.target.value })} />
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
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300 ">
                                <thead className="bg-gray-50 ">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900  sm:pl-6">Intern</th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 ">Amount</th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 ">Date</th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 ">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white  ">
                                    {stipends.map((stipend: any) => (
                                        <tr key={stipend.id}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900  sm:pl-6">
                                                {stipend.Intern?.name || stipend.intern_id}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
                                                Rs. {stipend.amount}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
                                                {stipend.payment_date}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
                                                <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${stipend.status === 'paid' ? 'bg-green-50 text-green-700 ring-green-600/20' :
                                                        stipend.status === 'failed' ? 'bg-red-50 text-red-700 ring-red-600/20' :
                                                            'bg-yellow-50 text-yellow-700 ring-yellow-600/20'
                                                    }`}>
                                                    {stipend.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
