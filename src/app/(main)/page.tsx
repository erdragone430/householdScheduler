// app/(main)/page.tsx
import React from 'react';

// Dati di esempio per i membri della casa
const activeMembers = [
  { id: 1, name: 'Marco Rossi', role: 'In casa', task: 'Cucina & Piatti', avatar: 'MR', status: 'online' },
  { id: 2, name: 'Sara Bianchi', role: 'Fuori', task: 'Spesa settimanale', avatar: 'SB', status: 'offline' },
  { id: 3, name: 'Luca Verdi', role: 'In casa', task: 'Raccolta differenziata', avatar: 'LV', status: 'online' },
  { id: 4, name: 'Elena Neri', role: 'In casa', task: 'Pulizia bagno', avatar: 'EN', status: 'busy' },
];

export default function MainPage() {
  const daysOfWeek = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
  
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      
      <section className="lg:col-span-2 bg-white border border-neutral-200 rounded-2xl py-6 pr-6 pl-10 shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-neutral-900">
              Calendar
            </h2>
            <p className="text-sm text-neutral-500 mt-0.5">
              Visual
            </p>
          </div>
          
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs font-medium border border-neutral-200 rounded-lg hover:bg-neutral-50">
              Today
            </button>
            <button className="px-3 py-1.5 text-xs font-medium border border-neutral-200 rounded-lg hover:bg-neutral-50">
              Month
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-neutral-500 mb-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="py-1">{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((day) => {
            const isToday = day === 15;
            return (
              <div
                key={day}
                className={`min-h-[75px] sm:min-h-[90px] p-2 border rounded-xl flex flex-col justify-between transition-colors ${
                  isToday
                    ? 'border-neutral-900 bg-neutral-50'
                    : 'border-neutral-300 hover:border-neutral-200 hover:bg-neutral-50/50'
                }`}
              >
                <span
                  className={`text-xs font-bold inline-block w-5 h-5 text-center leading-5 rounded-full ${
                    isToday ? 'bg-neutral-900 text-white' : 'text-neutral-700'
                  }`}
                >
                  {day}
                </span>

                {day % 4 === 0 && (
                  <span className="text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-100 px-1.5 py-0.5 rounded truncate">
                    Pulizie
                  </span>
                )}
                {day === 15 && (
                  <span className="text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-100 px-1.5 py-0.5 rounded truncate">
                    Spesa
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold tracking-tight text-neutral-900">
            Persone Attive
          </h2>
          <span className="text-xs font-semibold px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded-full">
            {activeMembers.length} membri
          </span>
        </div>

        <ul className="divide-y divide-neutral-100">
          {activeMembers.map((member) => (
            <li key={member.id} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {/* Avatar iniziale */}
                <div className="relative w-9 h-9 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-xs font-semibold text-neutral-700">
                  {member.avatar}
                 
                  <span
                    className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-white ${
                      member.status === 'online'
                        ? 'bg-emerald-500'
                        : member.status === 'busy'
                        ? 'bg-amber-500'
                        : 'bg-neutral-300'
                    }`}
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-neutral-900 leading-tight">
                    {member.name}
                  </p>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {member.task}
                  </p>
                </div>
              </div>

              <span className="text-[11px] font-medium text-neutral-400 bg-neutral-50 px-2 py-1 rounded-md border border-neutral-100">
                {member.role}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-6 pt-4 border-t border-neutral-100">
          <button className="w-full py-2.5 px-4 text-xs font-semibold text-neutral-700 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-xl transition-colors">
            Visualizza tutti i coinquilini
          </button>
        </div>
      </section>

    </div>
  );
}