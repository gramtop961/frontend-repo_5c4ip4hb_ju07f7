import { useEffect, useRef, useState } from 'react'
import { Pause, Play, RotateCcw, Timer } from 'lucide-react'

function pad(n) {
  return n.toString().padStart(2, '0')
}

function FocusTimer() {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef(null)

  const totalSeconds = minutes * 60 + seconds

  useEffect(() => {
    if (!running) return
    intervalRef.current = setInterval(() => {
      setSeconds((s) => {
        if (minutes === 0 && s === 0) {
          clearInterval(intervalRef.current)
          setRunning(false)
          try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)()
            const o = ctx.createOscillator()
            const g = ctx.createGain()
            o.type = 'sine'
            o.frequency.setValueAtTime(660, ctx.currentTime)
            o.connect(g)
            g.connect(ctx.destination)
            o.start()
            g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1)
            o.stop(ctx.currentTime + 1)
          } catch (e) {
            // fall back
            alert('Time\'s up! Great job focusing.')
          }
          return 0
        }
        if (s === 0) {
          setMinutes((m) => m - 1)
          return 59
        }
        return s - 1
      })
    }, 1000)

    return () => clearInterval(intervalRef.current)
  }, [running, minutes])

  const reset = () => {
    setRunning(false)
    clearInterval(intervalRef.current)
    setMinutes(25)
    setSeconds(0)
  }

  const progress = 1 - totalSeconds / (25 * 60) // relative to default 25 min

  return (
    <section id="timer" className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
        <Timer className="text-indigo-600" size={20} /> Focus Timer
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Set duration</p>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="number"
                  min={1}
                  max={180}
                  value={minutes}
                  onChange={(e) => setMinutes(Math.max(1, Math.min(180, Number(e.target.value) || 0)))}
                  className="w-24 rounded-lg border border-gray-200 px-3 py-2 text-sm"
                />
                <span className="text-sm text-gray-600">minutes</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Progress</p>
              <div className="w-40 h-2 bg-gray-100 rounded-full overflow-hidden mt-2">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                  style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
                />
              </div>
            </div>
          </div>

          <div className="text-center py-8">
            <p className="text-6xl font-mono tracking-wider text-gray-800">
              {pad(minutes)}:{pad(seconds)}
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => setRunning((r) => !r)}
                className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-white font-medium ${
                  running ? 'bg-orange-600 hover:bg-orange-700' : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {running ? <Pause size={16} /> : <Play size={16} />}
                {running ? 'Pause' : 'Start'}
              </button>
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800"
              >
                <RotateCcw size={16} /> Reset
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <p className="text-sm text-gray-600">
            Try 25 minutes of deep focus followed by a 5 minute break. Repeat 3-4 times and then take a longer break. Keep your phone away and close distracting tabs.
          </p>
          <ul className="mt-4 list-disc pl-5 text-sm text-gray-600 space-y-1">
            <li>Define a clear goal for this session</li>
            <li>Work in a quiet place or use white noise</li>
            <li>Reward yourself after each session</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default FocusTimer
