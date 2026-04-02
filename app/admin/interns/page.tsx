'use client';

import { useEffect, useState } from 'react';
import { InternsTable } from '@/components/interns-table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default function InternsPage() {
    const [interns, setInterns] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <div>
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900 ">Interns</h1>
                    <p className="mt-2 text-sm text-gray-700 ">
                        A list of all the interns in your account including their name, title, email and role.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <Link href="/admin/interns/new">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Intern
                        </Button>
                    </Link>
                </div>
            </div>

            {loading ? (
                <div className="mt-8 text-center text-sm text-gray-500">Loading intern data...</div>
            ) : (
                <InternsTable interns={interns} />
            )}
        </div>
    );
}
