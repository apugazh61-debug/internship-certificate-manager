'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const attendanceData = [
  { name: 'Week 1', present: 11, absent: 1 },
  { name: 'Week 2', present: 10, absent: 2 },
  { name: 'Week 3', present: 12, absent: 0 },
  { name: 'Week 4', present: 11, absent: 1 },
];

const moduleData = [
  { name: 'Web Dev', interns: 6 },
  { name: 'Data Sci', interns: 4 },
  { name: 'AI/ML', interns: 2 },
];

export function DashboardCharts() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
      <div className="rounded-lg bg-white p-6 shadow ">
        <h3 className="text-base font-semibold leading-6 text-gray-900  mb-4">
          Weekly Attendance
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend iconType="circle" />
              <Line type="monotone" dataKey="present" stroke="#4F46E5" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="absent" stroke="#EF4444" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow ">
        <h3 className="text-base font-semibold leading-6 text-gray-900  mb-4">
          Interns by Module
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={moduleData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                cursor={{ fill: '#F3F4F6' }}
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="interns" fill="#4F46E5" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
