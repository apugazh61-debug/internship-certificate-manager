'use client';

import { useState, useEffect } from 'react';
import { AttendanceTable } from '@/components/attendance-table';
import { Input } from '@/components/ui/input';

export default function AttendancePage() {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [data, setData] = useState({ records: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const res = await fetch(`/api/attendance?date=${date}`);
                const json = await res.json();
                setData(json);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [date]);

    const handleSave = async (updatedRecords: any[]) => {
        try {
            const res = await fetch('/api/attendance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ date, records: updatedRecords })
            });
            if (res.ok) {
                alert('Attendance saved successfully');
            } else {
                alert('Failed to save');
            }
        } catch (err) {
            alert('Error saving');
        }
    };

    return (
        <div>
            <div className="sm:flex sm:items-center justify-between">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900 ">Daily Attendance</h1>
                    <p className="mt-2 text-sm text-gray-700 ">
                        Mark attendance for interns.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0">
                    <Input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-48"
                    />
                </div>
            </div>

            {loading ? (
                <div className="mt-10 text-center">Loading...</div>
            ) : (
                <AttendanceTable initialRecords={data.records} date={date} onSave={handleSave} />
            )}
        </div>
    );
}
