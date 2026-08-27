import React from 'react';
import { fetchAllUsers } from "@/lib/server/actions/users";
import { fetchWeekSchedule } from "@/lib/server/actions/schedule"; 

export default async function MainPage() {
  const daysOfWeek = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  
  const currentYear = new Date().getFullYear();
  const currentDate = new Date();
  const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
  const currentWeekNumber = Math.ceil(((currentDate.getTime() - startOfYear.getTime()) / 86400000 + startOfYear.getDay() + 1) / 7);

  const [usersResult, scheduleResult] = await Promise.all([
    fetchAllUsers(),
    fetchWeekSchedule(currentYear, currentWeekNumber)
  ]);

  const users = usersResult.success && usersResult.data ? usersResult.data : [];
  const schedules = scheduleResult.success && scheduleResult.schedules ? scheduleResult.schedules : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
      
      <section className="lg:col-span-2 bg-white border border-neutral-200 rounded-2xl p-4 sm:py-6 sm:px-8 shadow-xs overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900">
              Calendar
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
              Week {currentWeekNumber}
            </p>
          </div>
          
          <div className="flex gap-2 self-start sm:self-auto">
            <button className="px-3 py-1.5 text-xs font-medium border border-neutral-200 rounded-lg hover:bg-neutral-50">
              Today
            </button>
            <button className="px-3 py-1.5 text-xs font-medium border border-neutral-200 rounded-lg hover:bg-neutral-50">
              Month
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-[11px] sm:text-xs font-semibold text-neutral-500 mb-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="py-1">{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {days.map((day) => {
            const isToday = day === new Date().getDate();
            const dayTask = schedules[day % schedules.length];

            return (
              <div
                key={day}
                className={`min-h-[60px] sm:min-h-[90px] p-1.5 sm:p-2 border rounded-xl flex flex-col justify-between transition-colors ${
                  isToday
                    ? 'border-neutral-900 bg-neutral-50'
                    : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/50'
                }`}
              >
                <span
                  className={`text-[11px] sm:text-xs font-bold inline-block w-5 h-5 text-center leading-5 rounded-full ${
                    isToday ? 'bg-neutral-900 text-white' : 'text-neutral-700'
                  }`}
                >
                  {day}
                </span>

                <div className="flex flex-col gap-1 overflow-hidden">
                  {schedules.length > 0 && (
                    <span className="text-[9px] sm:text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-100 px-1 py-0.5 rounded truncate text-center">
                      {dayTask ? 'Task Assegnato' : ''}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

    
      <section className="bg-white border border-neutral-200 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900">
              Flatmates
          </h2>
          <span className="text-xs font-semibold px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded-full">
            {users.length} members
          </span>
        </div>

        {users.length === 0 ? (
          <p className="text-sm text-neutral-500 py-4 text-center">No user in db.</p>
        ) : (
          <ul className="divide-y divide-neutral-100">
            {users.map((user) => {
              const initials = user.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2);

              return (
                <li key={user.id} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-xs font-semibold text-neutral-700 shrink-0">
                      {initials}
                
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-neutral-900 leading-tight truncate">
                        {user.name}
                      </p>
                    </div>
                  </div>

                </li>
              );
            })}
          </ul>
        )}
      </section>

    </div>
  );
}