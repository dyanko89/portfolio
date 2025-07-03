// components/FeatureCard.tsx
export function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string; }) {
  return (
    <div className="feature-card">
      <div className="icon">{icon}</div>
      <h3 className="text-heading-20" style={{ marginBottom: '12px' }}>{title}</h3>
      <p className="text-copy-16" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{description}</p>
    </div>
  );
}
