import { Calendar, CheckCircle2, Timer, School } from 'lucide-react'

function Navbar() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 grid place-items-center text-white">
            <School size={18} />
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800 leading-none">Focus Time</p>
            <p className="text-[11px] text-gray-500 leading-none mt-1">Student success hub</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <a href="#tasks" className="hover:text-gray-900 flex items-center gap-2">
            <CheckCircle2 size={16} /> Tasks
          </a>
          <a href="#timer" className="hover:text-gray-900 flex items-center gap-2">
            <Timer size={16} /> Focus Timer
          </a>
          <a href="#planner" className="hover:text-gray-900 flex items-center gap-2">
            <Calendar size={16} /> Planner
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
