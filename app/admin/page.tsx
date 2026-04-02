import { Users, BookOpen, UserCheck, FileText } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const DashboardCharts = dynamic(() => import('@/components/dashboard-charts').then(mod => mod.DashboardCharts), {
    ssr: false,
    loading: () => <div className="mt-8 h-64 w-full bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">Loading charts...</div>
});


const stats = [
    { name: 'Total Interns', value: '12', icon: Users, change: '+2', changeType: 'positive', href: '/admin/interns' },
    { name: 'Active Modules', value: '4', icon: BookOpen, change: '0', changeType: 'neutral', href: '/admin/modules' },
    { name: 'Attendance Today', value: '92%', icon: UserCheck, change: '+5%', changeType: 'positive', href: '/admin/attendance' },
    { name: 'Certificates Issued', value: '8', icon: FileText, change: '+1', changeType: 'positive', href: '/admin/certificates' },
];

export default function AdminDashboardPage() {
    return (
        <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 ">Overview</h2>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href || '#'}
                        className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6 transition-transform hover:scale-[1.02] cursor-pointer"
                    >
                        <dt>
                            <div className="absolute rounded-md bg-indigo-500 p-3">
                                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                            </div>
                            <p className="ml-16 truncate text-sm font-medium text-gray-500 ">{item.name}</p>
                        </dt>
                        <dd className="ml-16 flex items-baseline pb-1 sm:pb-7">
                            <p className="text-2xl font-semibold text-gray-900 ">{item.value}</p>
                            <p
                                className={`ml-2 flex items-baseline text-sm font-semibold ${item.changeType === 'positive' ? 'text-green-600' :
                                    item.changeType === 'negative' ? 'text-red-600' : 'text-gray-500'
                                    }`}
                            >
                                {item.change}
                            </p>
                        </dd>
                    </Link>
                ))}
            </div>

            <DashboardCharts />
        </div>
    );
}
