'use client'

interface WireframeServerStatusProps {
  className?: string
}

const c = {
  bg: '#0a0f12',
  border: '#252d33',
  borderLight: '#1c2328',
  textDim: '#3a4248',
  text: '#5a6368',
  textBright: '#7a8288',
  surface: '#0e1418',
}

export function WireframeServerStatus({ className = '' }: WireframeServerStatusProps) {
  return (
    <div className={`w-full h-full flex flex-col overflow-hidden font-mono ${className}`} style={{ background: c.bg }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-3 shrink-0" style={{ height: '14%', borderBottom: `1px solid ${c.border}` }}>
        <div className="flex items-center gap-2">
          <div className="w-14 h-2.5 rounded-sm" style={{ background: c.border }} />
          <div className="px-1 py-px rounded-sm text-[5px]" style={{ border: `1px solid ${c.border}`, color: c.textBright }}>ONLINE</div>
        </div>
        <div className="text-[5px]" style={{ color: c.textDim }}>194d uptime</div>
      </div>

      {/* Body */}
      <div style={{ height: '86%' }} className="flex flex-col p-2 gap-1.5 overflow-hidden">
        {/* Resource gauges row */}
        <div className="flex gap-1 shrink-0" style={{ height: '22%', minHeight: 0 }}>
          {gauges.map((g, i) => (
            <div key={i} className="flex-1 flex flex-col justify-center px-1.5 rounded-sm overflow-hidden" style={{ border: `1px solid ${c.border}`, background: c.surface }}>
              <div className="flex items-center justify-between">
                <div className="text-[5px] uppercase tracking-wider" style={{ color: c.textDim }}>{g.label}</div>
                <div className="text-[6px] font-bold" style={{ color: c.textBright }}>{g.value}</div>
              </div>
              <div className="w-full h-1 rounded-sm mt-1 overflow-hidden" style={{ background: c.borderLight }}>
                <div className="h-full rounded-sm" style={{ width: `${g.pct}%`, background: c.border }} />
              </div>
            </div>
          ))}
        </div>

        {/* Services + uptime chart */}
        <div className="flex gap-1" style={{ height: '50%', minHeight: 0 }}>
          {/* Services list */}
          <div className="flex flex-col rounded-sm p-1.5 overflow-hidden" style={{ width: '45%', border: `1px solid ${c.border}` }}>
            <div className="text-[5px] uppercase tracking-wider mb-1 shrink-0" style={{ color: c.textDim }}>Services</div>
            <div className="flex-1 flex flex-col justify-evenly min-h-0">
              {services.map((s, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full shrink-0" style={{ background: s.status === 'ok' ? '#3a5a3a' : c.border }} />
                  <div className="text-[5px] flex-1 truncate" style={{ color: c.text }}>{s.name}</div>
                  <div className="text-[4.5px] shrink-0" style={{ color: c.textDim }}>{s.info}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Uptime chart */}
          <div className="flex-1 flex flex-col rounded-sm p-1.5 overflow-hidden" style={{ border: `1px solid ${c.border}` }}>
            <div className="flex items-center justify-between mb-1 shrink-0">
              <div className="text-[5px] uppercase tracking-wider" style={{ color: c.textDim }}>Uptime (30d)</div>
              <div className="text-[5px] font-bold" style={{ color: c.textBright }}>99.9%</div>
            </div>
            <div className="flex-1 flex items-end gap-px min-h-0">
              {uptimeData.map((d, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${d}%`,
                    background: d === 100 ? '#1a2a1a' : c.border,
                    minHeight: '1px',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* VPN + network row */}
        <div className="flex gap-1" style={{ height: '26%', minHeight: 0 }}>
          {/* VPN peers */}
          <div className="flex flex-col rounded-sm p-1.5 overflow-hidden" style={{ width: '45%', border: `1px solid ${c.border}` }}>
            <div className="text-[5px] uppercase tracking-wider mb-1 shrink-0" style={{ color: c.textDim }}>VPN Peers</div>
            <div className="flex-1 flex flex-col justify-evenly min-h-0">
              {peers.map((p, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full shrink-0" style={{ background: p.active ? '#3a5a3a' : c.borderLight }} />
                  <div className="text-[5px] flex-1" style={{ color: c.text }}>{p.name}</div>
                  <div className="text-[4.5px] shrink-0" style={{ color: c.textDim }}>{p.last}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Network stats */}
          <div className="flex-1 flex flex-col rounded-sm p-1.5 overflow-hidden" style={{ border: `1px solid ${c.border}` }}>
            <div className="text-[5px] uppercase tracking-wider mb-1 shrink-0" style={{ color: c.textDim }}>Network</div>
            <div className="flex-1 flex flex-col justify-evenly min-h-0">
              {netStats.map((n, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="text-[5px]" style={{ color: c.textDim }}>{n.label}</div>
                  <div className="text-[5.5px] font-bold" style={{ color: c.textBright }}>{n.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const gauges = [
  { label: 'CPU', value: '12%', pct: 12 },
  { label: 'RAM', value: '1.2G', pct: 31 },
  { label: 'Disk', value: '34G', pct: 29 },
]

const services = [
  { name: 'WireGuard VPN', status: 'ok', info: '3 peers' },
  { name: 'Email Triage', status: 'ok', info: '47d up' },
  { name: 'Product Sync', status: 'ok', info: 'Mon 05:00' },
  { name: 'DB Backup', status: 'ok', info: '17:45' },
  { name: 'Fail2ban', status: 'ok', info: '2 bans' },
]

const uptimeData = [
  100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
  100, 100, 100, 98, 100, 100, 100, 100, 100, 100,
  100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
]

const peers = [
  { name: 'Desktop', active: true, last: '4m ago' },
  { name: 'Laptop', active: true, last: '12m ago' },
  { name: 'Mobile', active: false, last: '2d ago' },
]

const netStats = [
  { label: 'Transfer', value: '487 GB' },
  { label: 'Bandwidth', value: '24 Mbps' },
  { label: 'Blocked', value: '1,247' },
]
