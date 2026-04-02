'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Edit, Trash, BookOpen } from 'lucide-react';

interface Intern {
    id: number;
    intern_id: string;
    name: string;
    email: string;
    status: string;
    join_date: string;
}

export function InternsTable({ interns }: { interns: Intern[] }) {
    return (
        <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300 ">
                            <thead className="bg-gray-50 ">
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900  sm:pl-6">
                                        ID
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 ">
                                        Name
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 ">
                                        Email
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 ">
                                        Status
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 ">
                                        Join Date
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white  ">
                                {interns.map((intern) => (
                                    <tr key={intern.id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900  sm:pl-6">
                                            {intern.intern_id}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
                                            {intern.name}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
                                            {intern.email}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
                                            <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${intern.status === 'active' ? 'bg-green-50 text-green-700 ring-green-600/20' :
                                                intern.status === 'completed' ? 'bg-blue-50 text-blue-700 ring-blue-600/20' :
                                                    'bg-red-50 text-red-700 ring-red-600/20'
                                                }`}>
                                                {intern.status}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
                                            {intern.join_date}
                                        </td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <div className="flex justify-end gap-2">
                                                <Link href={`/admin/interns/${intern.id}/modules`} title="Modules">
                                                    <BookOpen className="h-4 w-4 text-blue-600 hover:text-blue-900" />
                                                </Link>
                                                <Link href={`/admin/interns/${intern.id}/edit`}>
                                                    <Edit className="h-4 w-4 text-indigo-600 hover:text-indigo-900" />
                                                </Link>
                                                <button onClick={() => alert('Delete not implemented yet')}>
                                                    <Trash className="h-4 w-4 text-red-600 hover:text-red-900" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
