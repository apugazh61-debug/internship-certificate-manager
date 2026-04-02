'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface AttendanceRecord {
    intern_id: number;
    intern_code: string;
    name: string;
    status: string;
    check_in_time?: string;
}

export function AttendanceTable({ initialRecords, date, onSave }: { initialRecords: AttendanceRecord[], date: string, onSave: (records: any[]) => void }) {
    const [records, setRecords] = useState(initialRecords);

    const handleStatusChange = (internId: number, newStatus: string) => {
        setRecords(records.map(r =>
            r.intern_id === internId ? { ...r, status: newStatus } : r
        ));
    };

    const handleSave = () => {
        onSave(records);
    };

    return (
        <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300 ">
                            <thead className="bg-gray-50 ">
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900  sm:pl-6">Intern ID</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 ">Name</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 ">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white  ">
                                {records.map((record) => (
                                    <tr key={record.intern_id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900  sm:pl-6">
                                            {record.intern_code}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
                                            {record.name}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
                                            <select
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6   "
                                                value={record.status}
                                                onChange={(e) => handleStatusChange(record.intern_id, e.target.value)}
                                            >
                                                <option value="present">Present</option>
                                                <option value="absent">Absent</option>
                                                <option value="late">Late</option>
                                                <option value="excused">Excused</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <Button onClick={handleSave}>Save Attendance</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
