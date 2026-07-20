import { ImageResponse } from 'next/og'
import fs from 'fs/promises'
import path from 'path'

export const OG_SIZE = { width: 1200, height: 630 }

interface OgCardProps {
  title: string
  subtitle?: string
  tag?: string
}

export async function ogCard({ title, subtitle, tag }: OgCardProps) {
  const fontData = await fs.readFile(
    path.join(process.cwd(), 'assets', 'fonts', 'Ubuntu-Bold.ttf')
  )

  const clippedSubtitle =
    subtitle && subtitle.length > 160 ? `${subtitle.slice(0, 157)}...` : subtitle

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0a0f12',
          padding: 64,
          fontFamily: 'Ubuntu',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 30, color: '#ff5722' }}>djy89.net</div>
          {tag ? (
            <div
              style={{
                fontSize: 24,
                color: '#6b7a85',
                border: '1px solid #2a3942',
                padding: '8px 20px',
              }}
            >
              {tag}
            </div>
          ) : null}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: title.length > 60 ? 52 : 64,
              color: '#e8edef',
              lineHeight: 1.15,
            }}
          >
            {title}
          </div>
          {clippedSubtitle ? (
            <div style={{ fontSize: 28, color: '#a8b5bd', lineHeight: 1.4 }}>
              {clippedSubtitle}
            </div>
          ) : null}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 48, height: 6, backgroundColor: '#ff5722' }} />
          <div style={{ fontSize: 24, color: '#6b7a85' }}>
            Danny Yanko | Systems Architect &amp; Automation Consultant
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [{ name: 'Ubuntu', data: fontData, weight: 700 }],
    }
  )
}
