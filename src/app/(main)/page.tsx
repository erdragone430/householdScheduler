import React from 'react';
import { fetchAllUsers } from "@/lib/server/actions/users";
import { fetchWeekSchedule } from "@/lib/server/actions/schedule";
import { fetchAllTasks } from "@/lib/server/actions/tasks"; 

export default async function MainPage() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  
  // Calcola il nome del mese corrente in inglese (es: "August")
  const currentMonthName = currentDate.toLocaleString('en-US', { month: 'long' });
  
  const weeks = [1, 2, 3, 4];

  const [usersResult, tasksResult, ...weekResults] = await Promise.all([
    fetchAllUsers(),
    fetchAllTasks(), 
    ...weeks.map((weekNum) => fetchWeekSchedule(currentYear, weekNum))
  ]);

  const users = usersResult.success && usersResult.data ? usersResult.data : [];
  const userMap = new Map(users.map((u) => [u.id, u.name]));

  const tasks = tasksResult?.success && tasksResult.data ? tasksResult.data : [];
  const taskMap = new Map(tasks.map((t) => [t.id, t.title]));

  const schedulesByWeek = weeks.map((weekNum, index) => {
    const res = weekResults[index];
    return {
      weekNum,
      schedules: res.success && res.schedules ? res.schedules : []
    };
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
      
      {/* CALENDAR SECTION */}
      <section className="lg:col-span-2 bg-white border border-neutral-200 rounded-2xl p-4 sm:py-6 sm:px-8 shadow-xs overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 flex items-center gap-2">
              Monthly Calendar 
              <span className="text-neutral-500 font-medium text-base sm:text-lg">
                - {currentMonthName}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
              Assignments for the 4 weeks of the month
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {schedulesByWeek.map(({ weekNum, schedules }) => (
            <div
              key={weekNum}
              className="p-4 border border-neutral-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-neutral-300 transition-colors bg-neutral-50/50"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold w-20 px-2.5 py-1 text-center bg-neutral-900 text-white rounded-lg shadow-2xs">
                  Week {weekNum}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 flex-1 justify-start sm:justify-end">
                {schedules.length === 0 ? (
                  <span className="text-xs text-neutral-400 italic">No task assigned</span>
                ) : (
                  schedules.map((schedule) => {
                    // Ora che hai sistemato lo schema nel DB, non c'è più bisogno di forzare il tipo con String()
                    const userName = userMap.get(schedule.user_id) || 'Unassigned';
                    const taskTitle = taskMap.get(schedule.task_id) || 'Unknown Task';

                    return (
                      <div
                        key={schedule.id}
                        className="text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                        <span className="font-bold text-neutral-900">{userName}:</span>
                        <span className="text-neutral-700">{taskTitle}</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FLATMATE SECTION */}
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
          <p className="text-sm text-neutral-500 py-4 text-center">No users in the database.</p>
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