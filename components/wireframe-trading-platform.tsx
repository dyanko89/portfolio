'use client'

interface WireframeTradingPlatformProps {
  className?: string
}

// Single monochrome color palette
const c = {
  bg: '#0a0f12',
  border: '#252d33',
  borderLight: '#1c2328',
  textDim: '#3a4248',
  text: '#5a6368',
  textBright: '#7a8288',
}

export function WireframeTradingPlatform({ className = '' }: WireframeTradingPlatformProps) {
  return (
    <div className={`w-full h-full flex flex-col bg-[${c.bg}] overflow-hidden font-mono ${className}`} style={{ background: c.bg }}>
      {/* Top Bar */}
      <div className="h-8 flex items-center px-3 gap-2" style={{ borderBottom: `1px solid ${c.border}` }}>
        <div className="w-14 h-3 rounded-sm" style={{ border: `1px solid ${c.border}` }} />
        <div className="w-10 h-3 rounded-sm" style={{ border: `1px solid ${c.border}` }} />
        <div className="w-10 h-3 rounded-sm" style={{ border: `1px solid ${c.border}` }} />
        <div className="flex-1" />
        <div className="w-24 h-3.5 rounded-sm" style={{ border: `1px solid ${c.border}` }} />
        <div className="w-6 h-3.5 rounded-sm" style={{ border: `1px solid ${c.border}` }} />
      </div>

      {/* Table Header */}
      <div className="h-6 flex items-center text-[7px] uppercase tracking-wider whitespace-nowrap" style={{ borderBottom: `1px solid ${c.border}`, color: c.textDim }}>
        <div className="px-2" style={{ width: '20%' }}>Product</div>
        <div className="px-1 text-center" style={{ width: '8%' }}>Lot</div>
        <div className="px-1 text-center" style={{ width: '10%' }}>ID</div>
        <div className="px-1 text-center" style={{ width: '7%' }}>Grade</div>
        <div className="px-1 text-center" style={{ width: '8%' }}>Qty</div>
        <div className="px-1 text-center" style={{ width: '7%' }}>Period</div>
        <div className="px-1 text-center" style={{ width: '10%', borderLeft: `1px solid ${c.borderLight}` }}>Bid</div>
        <div className="px-1 text-center" style={{ width: '10%' }}>Ask</div>
        <div className="px-1 text-right" style={{ width: '20%' }}>Actions</div>
      </div>

      {/* Table Rows */}
      {tradingRows.map((row, i) => (
        <div
          key={i}
          className="h-6 flex items-center text-[7.5px] whitespace-nowrap"
          style={{
            borderBottom: `1px solid ${c.borderLight}`,
            background: row.highlight ? '#0e1418' : 'transparent',
          }}
        >
          <div className="px-2 truncate flex items-center gap-1" style={{ width: '20%', color: c.textBright }}>
            {row.expandable && <span style={{ color: c.textDim, fontSize: '5px' }}>&#9654;</span>}
            {row.name}
          </div>
          <div className="px-1 text-center" style={{ width: '8%', color: c.text }}>{row.lot}</div>
          <div className="px-1 text-center" style={{ width: '10%', color: c.text }}>{row.id}</div>
          <div className="px-1 text-center" style={{ width: '7%', color: c.text }}>{row.grade}</div>
          <div className="px-1 text-center" style={{ width: '8%', color: c.text }}>{row.qty}</div>
          <div className="px-1 text-center" style={{ width: '7%', color: c.text }}>{row.period}</div>
          <div className="px-1 text-center" style={{ width: '10%', borderLeft: `1px solid ${c.borderLight}`, color: c.textBright }}>{row.bid}</div>
          <div className="px-1 text-center" style={{ width: '10%', color: c.text }}>{row.ask}</div>
          <div className="px-2 flex items-center justify-end gap-1" style={{ width: '20%' }}>
            {row.actions?.map((action, j) => (
              <span
                key={j}
                className="px-1.5 py-0.5 rounded-sm text-[6px] uppercase tracking-wide"
                style={{ border: `1px solid ${c.border}`, color: c.text }}
              >
                {action}
              </span>
            ))}
          </div>
        </div>
      ))}

      {/* Bottom status bar */}
      <div className="mt-auto h-5 flex items-center px-3 text-[6.5px] gap-4" style={{ borderTop: `1px solid ${c.border}`, color: c.textDim }}>
        <span>12 listings</span>
        <span>3 active bids</span>
        <div className="flex-1" />
        <span>Last update: 09:15:22</span>
      </div>
    </div>
  )
}

// Generic commodity trading data
const tradingRows = [
  { name: 'Premium Blend A', lot: '2847', id: 'PBA-119', grade: 'A+', qty: '500', period: 'Q2', bid: '$42.50', ask: '$45.00', actions: ['BID', 'BUY'], expandable: true, highlight: false },
  { name: 'Standard Mix 12', lot: '3102', id: 'SM-2204', grade: 'A', qty: '1,200', period: 'Q2', bid: '$31.20', ask: '$33.80', actions: ['BID', 'BUY'], expandable: false, highlight: false },
  { name: 'Reserve Select', lot: '1893', id: 'RS-0087', grade: 'AA', qty: '250', period: 'Q3', bid: '$78.00', ask: '$82.50', actions: ['BID'], expandable: true, highlight: true },
  { name: 'Commodity Grade', lot: '4521', id: 'CG-3380', grade: 'B+', qty: '3,000', period: 'Q2', bid: '$18.90', ask: '$20.10', actions: ['BID', 'BUY'], expandable: false, highlight: false },
  { name: 'Export Certified', lot: '2210', id: 'EC-1156', grade: 'A', qty: '800', period: 'Q3', bid: '$55.00', ask: '$58.25', actions: ['BID'], expandable: true, highlight: false },
  { name: 'Small Batch 09', lot: '0917', id: 'SB-0441', grade: 'AA', qty: '120', period: 'Q2', bid: '$92.00', ask: '$97.00', actions: ['BID', 'BUY'], expandable: false, highlight: false },
  { name: 'Industrial Spec', lot: '5503', id: 'IS-7892', grade: 'B', qty: '5,000', period: 'Q4', bid: '$12.40', ask: '$13.80', actions: ['BUY'], expandable: false, highlight: false },
  { name: 'Organic Cert.', lot: '0334', id: 'OC-2281', grade: 'AA', qty: '340', period: 'Q3', bid: '$88.00', ask: '$91.50', actions: ['BID', 'BUY'], expandable: false, highlight: false },
]
