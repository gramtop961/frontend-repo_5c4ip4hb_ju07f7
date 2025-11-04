import Navbar from './components/Navbar'
import TaskManager from './components/TaskManager'
import FocusTimer from './components/FocusTimer'
import Planner from './components/Planner'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50 text-gray-900">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-10">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-gray-100 bg-white p-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Stay consistent. Ace your goals.
              </h1>
              <p className="text-gray-600 mt-2">
                Plan your study sessions, track daily tasks, and focus with a built-in timer. Keep your streak alive and make progress every day.
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-white p-4">
                  <p className="text-xs opacity-90">Daily Motivation</p>
                  <p className="text-lg font-semibold">Streak-based tasks</p>
                </div>
                <div className="rounded-lg bg-white border border-gray-100 p-4">
                  <p className="text-xs text-gray-500">Time Management</p>
                  <p className="text-lg font-semibold text-gray-800">Focus timer & planner</p>
                </div>
                <div className="rounded-lg bg-white border border-gray-100 p-4">
                  <p className="text-xs text-gray-500">For Students</p>
                  <p className="text-lg font-semibold text-gray-800">Homework to exam prep</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-gray-100 bg-white p-6">
              <h3 className="text-lg font-semibold text-gray-800">Quick Tips</h3>
              <ul className="mt-3 text-sm text-gray-600 list-disc pl-5 space-y-1">
                <li>Write tasks small and actionable.</li>
                <li>Keep your daily streak by completing at least one task.</li>
                <li>Plan sessions ahead to reduce decision fatigue.</li>
              </ul>
            </div>
          </div>
        </section>

        <TaskManager />
        <FocusTimer />
        <Planner />

        <footer className="pt-8 text-center text-xs text-gray-500">
          Built for students who want to learn smarter.
        </footer>
      </main>
    </div>
  )
}

export default App
