import './Stats.css'

interface StatsProps {
  hardBlocked: number
  contextSensitive: number
}

export default function Stats({ hardBlocked, contextSensitive }: StatsProps) {
  return (
    <section className="stats-section">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value accent">{hardBlocked}</div>
          <div className="stat-label">Termos bloqueados</div>
        </div>
        <div className="stat-card">
          <div className="stat-value purple">{contextSensitive}</div>
          <div className="stat-label">Context-sensitive</div>
        </div>
        <div className="stat-card">
          <div className="stat-value green">&lt; 1ms</div>
          <div className="stat-label">Por mensagem</div>
        </div>
        <div className="stat-card">
          <div className="stat-value pink">100%</div>
          <div className="stat-label">Offline / Client-side</div>
        </div>
      </div>
    </section>
  )
}
