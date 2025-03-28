
export function AnalyticsPanel() {
  return (
    <div className="glass-card p-8 text-center">
      <div className="flex items-center justify-center mb-4">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="#e2e8f0" strokeWidth="12" />
          <circle 
            cx="60" 
            cy="60" 
            r="54" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="12" 
            strokeDasharray="339.3" 
            strokeDashoffset="135.7" 
            className="text-primary" 
          />
        </svg>
        <div className="absolute">
          <p className="text-3xl font-bold">60%</p>
          <p className="text-xs text-muted-foreground">Engagement</p>
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2">Analytics Coming Soon</h3>
      <p className="text-muted-foreground">
        User engagement and game play statistics will be available soon.
      </p>
    </div>
  );
}
