export default function StatsBar({ stats }) {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="value">{stats.total || 0}</div>
        <div className="label">Total</div>
      </div>
      <div className="stat-card">
        <div className="value" style={{ color: 'var(--green)' }}>{stats.completed || 0}</div>
        <div className="label">Done</div>
      </div>
      <div className="stat-card">
        <div className="value" style={{ color: 'var(--accent2)' }}>{stats.pending || 0}</div>
        <div className="label">Pending</div>
      </div>
      <div className="stat-card">
        <div className="value" style={{ color: 'var(--red)' }}>{stats.high_priority || 0}</div>
        <div className="label">Urgent</div>
      </div>
    </div>
  );
}
