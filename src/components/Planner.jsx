import { useEffect, useMemo, useState } from 'react'
import { CalendarPlus, Calendar as CalendarIcon, Clock } from 'lucide-react'

function Planner() {
  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem('ft_sessions')
    return saved ? JSON.parse(saved) : []
  })
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [duration, setDuration] = useState(60)

  useEffect(() => {
    localStorage.setItem('ft_sessions', JSON.stringify(sessions))
  }, [sessions])

  const addSession = (e) => {
    e.preventDefault()
    if (!title || !date || !time) return
    const start = new Date(`${date}T${time}:00`)
    const end = new Date(start.getTime() + duration * 60000)
    setSessions((prev) => [
      {
        id: crypto.randomUUID(),
        title,
        start: start.toISOString(),
        end: end.toISOString(),
        duration,
      },
      ...prev,
    ])
    setTitle('')
    setDate('')
    setTime('')
    setDuration(60)
  }

  const upcoming = useMemo(() => {
    return [...sessions].sort((a, b) => new Date(a.start) - new Date(b.start))
  }, [sessions])

  const isToday = (iso) => {
    const d = new Date(iso)
    const t = new Date()
    return (
      d.getFullYear() === t.getFullYear() &&
      d.getMonth() === t.getMonth() &&
      d.getDate() === t.getDate()
    )
  }

  return (
    <section id="planner" className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
        <CalendarIcon className="text-indigo-600" size={20} /> Study Planner
      </h2>

      <form onSubmit={addSession} className="grid grid-cols-1 md:grid-cols-12 gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Session title (e.g., Physics - Chapter 3)"
          className="md:col-span-5 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="md:col-span-3 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="md:col-span-2 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="number"
          min={15}
          max={300}
          value={duration}
          onChange={(e) => setDuration(Math.max(15, Math.min(300, Number(e.target.value) || 0)))}
          className="md:col-span-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="md:col-span-1 inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 active:scale-[0.99]"
        >
          <CalendarPlus size={16} /> Add
        </button>
      </form>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 text-xs text-gray-600 uppercase tracking-wide">
          Upcoming Sessions
        </div>
        <ul className="divide-y divide-gray-100">
          {upcoming.length === 0 && (
            <li className="p-6 text-center text-sm text-gray-500">No sessions yet. Plan your next study block!</li>
          )}
          {upcoming.map((s) => {
            const start = new Date(s.start)
            const end = new Date(s.end)
            return (
              <li key={s.id} className="p-4 flex items-center gap-4">
                <div className={`w-2 h-10 rounded-full ${isToday(s.start) ? 'bg-emerald-500' : 'bg-indigo-500'}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{s.title}</p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                    <Clock size={14} />
                    {start.toLocaleDateString()} • {start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    <span className="ml-2 px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">{s.duration} min</span>
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default Planner
