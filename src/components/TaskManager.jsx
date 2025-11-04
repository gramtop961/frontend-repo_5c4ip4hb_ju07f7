import { useEffect, useMemo, useState } from 'react'
import { CheckCircle2, Plus, Trash2, Flame } from 'lucide-react'

function formatDateKey(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d.toISOString().slice(0, 10)
}

function TaskManager() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('ft_tasks')
    return saved ? JSON.parse(saved) : []
  })
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [due, setDue] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem('ft_tasks', JSON.stringify(tasks))
  }, [tasks])

  const todayKey = formatDateKey(new Date())

  const completionDays = useMemo(() => {
    const map = new Set()
    tasks.forEach((t) => {
      if (t.completedAt) map.add(formatDateKey(t.completedAt))
    })
    return map
  }, [tasks])

  const streak = useMemo(() => {
    // Count consecutive days up to today with at least one completion
    let count = 0
    let cursor = new Date()
    for (;;) {
      const key = formatDateKey(cursor)
      if (completionDays.has(key)) {
        count += 1
        cursor.setDate(cursor.getDate() - 1)
      } else {
        break
      }
    }
    return count
  }, [completionDays])

  const addTask = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    const newTask = {
      id: crypto.randomUUID(),
      title: title.trim(),
      subject: subject.trim(),
      due: due || null,
      done: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
    }
    setTasks((prev) => [newTask, ...prev])
    setTitle('')
    setSubject('')
    setDue('')
  }

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              done: !t.done,
              completedAt: !t.done ? new Date().toISOString() : null,
            }
          : t
      )
    )
  }

  const removeTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const filtered = tasks.filter((t) => {
    if (filter === 'all') return true
    if (filter === 'active') return !t.done
    if (filter === 'done') return t.done
    if (filter === 'today') return t.due && formatDateKey(t.due) === todayKey
    return true
  })

  return (
    <section id="tasks" className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <CheckCircle2 className="text-indigo-600" size={20} /> Daily Tasks
        </h2>
        <div className="flex items-center gap-2 text-sm">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200">
            <Flame size={16} /> {streak} day{streak === 1 ? '' : 's'} streak
          </span>
        </div>
      </div>

      <form onSubmit={addTask} className="grid grid-cols-1 md:grid-cols-12 gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title (e.g., Revise Algebra)"
          className="md:col-span-5 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject / Course"
          className="md:col-span-3 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="date"
          value={due}
          onChange={(e) => setDue(e.target.value)}
          className="md:col-span-2 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="md:col-span-2 inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 active:scale-[0.99]"
        >
          <Plus size={16} /> Add Task
        </button>
      </form>

      <div className="flex items-center gap-2 text-xs text-gray-600">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-full border ${
            filter === 'all'
              ? 'bg-gray-900 text-white border-gray-900'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-3 py-1 rounded-full border ${
            filter === 'active'
              ? 'bg-gray-900 text-white border-gray-900'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('done')}
          className={`px-3 py-1 rounded-full border ${
            filter === 'done'
              ? 'bg-gray-900 text-white border-gray-900'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          Done
        </button>
        <button
          onClick={() => setFilter('today')}
          className={`px-3 py-1 rounded-full border ${
            filter === 'today'
              ? 'bg-gray-900 text-white border-gray-900'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          Due Today
        </button>
      </div>

      <ul className="divide-y divide-gray-100 rounded-lg border border-gray-100 bg-white">
        {filtered.length === 0 && (
          <li className="p-6 text-center text-sm text-gray-500">No tasks to show</li>
        )}
        {filtered.map((t) => (
          <li key={t.id} className="p-4 flex items-center gap-3">
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => toggleTask(t.id)}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <div className="flex-1">
              <p className={`text-sm font-medium ${t.done ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                {t.title}
              </p>
              <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                {t.subject && <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">{t.subject}</span>}
                {t.due && <span>Due: {new Date(t.due).toLocaleDateString()}</span>}
              </div>
            </div>
            <button
              onClick={() => removeTask(t.id)}
              className="text-gray-400 hover:text-red-600 p-2"
              aria-label="Delete"
            >
              <Trash2 size={16} />
            </button>
          </li>
        ))}
      </ul>

      <p className="text-xs text-gray-500">
        Tip: Complete at least one task every day to keep your streak alive.
      </p>
    </section>
  )
}

export default TaskManager
