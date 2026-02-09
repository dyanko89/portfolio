'use client'

interface WireframeAnalyticsDashboardProps {
  className?: string
}

// Glassmorphism monochrome palette
const c = {
  bg: 'rgba(10, 15, 18, 0.6)',
  surface: 'rgba(20, 28, 34, 0.5)',
  border: '#2f3940',
  borderLight: '#232c33',
  textDim: '#5a6a72',
  text: '#8a9298',
  textBright: '#b0b8be',
}

export function WireframeAnalyticsDashboard({ className = '' }: WireframeAnalyticsDashboardProps) {
  return (
    <div className={`w-full h-full flex flex-col overflow-hidden font-mono ${className}`} style={{ background: c.bg, backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
      {/* Nav bar */}
      <div className="flex items-center px-3 gap-3" style={{ height: '14%', minHeight: 0, borderBottom: `1px solid ${c.border}` }}>
        <div className="w-16 h-2.5 rounded-sm" style={{ background: c.border }} />
        <div className="flex gap-2 ml-2">
          <div className="w-10 h-2.5 rounded-sm" style={{ border: `1px solid ${c.border}` }} />
          <div className="w-10 h-2.5 rounded-sm" style={{ border: `1px solid ${c.border}` }} />
          <div className="w-10 h-2.5 rounded-sm" style={{ border: `1px solid ${c.border}` }} />
        </div>
        <div className="flex-1" />
        <div className="w-20 h-3 rounded-sm" style={{ border: `1px solid ${c.border}` }} />
        <div className="w-5 h-5 rounded-full" style={{ border: `1px solid ${c.border}` }} />
      </div>

      {/* Body — all percentage based */}
      <div style={{ height: '86%' }} className="flex flex-col p-2 gap-1.5 overflow-hidden">
        {/* Metric cards */}
        <div className="flex gap-1" style={{ height: '28%', minHeight: 0 }}>
          {metricCards.map((card, i) => (
            <div
              key={i}
              className="flex-1 flex flex-col justify-center px-1.5 rounded-sm overflow-hidden"
              style={{ border: `1px solid ${c.border}`, background: c.surface }}
            >
              <div className="text-[5px] uppercase tracking-wider leading-none" style={{ color: c.textDim }}>{card.label}</div>
              <div className="text-[10px] font-bold leading-tight mt-0.5" style={{ color: c.textBright }}>{card.value}</div>
              <div className="text-[4.5px] leading-none mt-0.5" style={{ color: c.textDim }}>{card.sub}</div>
            </div>
          ))}
        </div>

        {/* Chart + sidebar */}
        <div className="flex gap-1" style={{ height: '70%', minHeight: 0 }}>
          {/* Bar chart */}
          <div className="flex flex-col p-1.5 rounded-sm overflow-hidden" style={{ width: '65%', border: `1px solid ${c.border}` }}>
            <div className="flex items-center justify-between mb-1">
              <div className="text-[5px] uppercase tracking-wider" style={{ color: c.textDim }}>Performance by Territory</div>
              <div className="flex gap-0.5">
                <div className="w-6 h-2 rounded-sm" style={{ border: `1px solid ${c.borderLight}` }} />
                <div className="w-6 h-2 rounded-sm" style={{ border: `1px solid ${c.borderLight}` }} />
              </div>
            </div>
            <div className="flex-1 flex items-end gap-[2px] min-h-0">
              {barData.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center justify-end" style={{ height: '100%' }}>
                  <div
                    className="w-full rounded-sm"
                    style={{ height: `${h}%`, background: c.border, minHeight: '1px' }}
                  />
                  <div className="text-[3.5px] mt-px leading-none" style={{ color: c.textDim }}>{territoryLabels[i]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel — top locations + mini table */}
          <div className="flex flex-col gap-1 overflow-hidden" style={{ width: '35%' }}>
            {/* Top locations */}
            <div className="flex-1 rounded-sm p-1.5 flex flex-col overflow-hidden" style={{ border: `1px solid ${c.border}` }}>
              <div className="text-[5px] uppercase tracking-wider mb-1" style={{ color: c.textDim }}>Top Locations</div>
              <div className="flex-1 flex flex-col justify-evenly min-h-0">
                {topLocations.map((loc, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <div className="text-[5px] w-2 text-right" style={{ color: c.textDim }}>{i + 1}</div>
                    <div className="flex-1 h-1 rounded-sm overflow-hidden" style={{ background: c.borderLight }}>
                      <div className="h-full rounded-sm" style={{ width: `${loc.pct}%`, background: c.border }} />
                    </div>
                    <div className="text-[5px] w-3 text-right" style={{ color: c.text }}>{loc.score}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alerts summary */}
            <div className="rounded-sm p-1.5 flex flex-col gap-0.5 overflow-hidden" style={{ height: '35%', minHeight: 0, border: `1px solid ${c.border}` }}>
              <div className="text-[5px] uppercase tracking-wider" style={{ color: c.textDim }}>Alerts</div>
              {alerts.map((a, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full" style={{ background: c.border }} />
                  <div className="text-[5px] truncate" style={{ color: c.text }}>{a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const metricCards = [
  { label: 'Locations', value: '2,047', sub: '+12 this month' },
  { label: 'Avg Rating', value: '4.2', sub: '★★★★☆' },
  { label: 'Response', value: '87%', sub: '↑ 4% vs last mo' },
  { label: 'Alerts', value: '23', sub: 'Need attention' },
]

const barData = [85, 72, 91, 68, 78, 88, 62, 95, 74, 81]
const territoryLabels = ['NE', 'SE', 'MW', 'SW', 'NW', 'AT', 'GL', 'PA', 'SO', 'CE']

const topLocations = [
  { pct: 96, score: '96' },
  { pct: 94, score: '94' },
  { pct: 91, score: '91' },
  { pct: 86, score: '86' },
  { pct: 83, score: '83' },
]

const alerts = [
  'Station #2104 — low rating',
  'Station #1832 — no response',
  '14 reviews pending reply',
]
