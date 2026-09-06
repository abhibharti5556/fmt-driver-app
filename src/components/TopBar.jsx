export default function TopBar({ kicker, title, showBack, onBack, onNotifs, notifCount }) {
  return (
    <div className="topbar">
      {showBack && (
        <button type="button" className="btn btn-icon btn-secondary" onClick={onBack} aria-label="Back">
          <svg width="16" height="16" viewBox="0 0 24 24" style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 1.8 }}>
            <path d="M20 12H4" /><path d="m10 6-6 6 6 6" />
          </svg>
        </button>
      )}
      <div className="topbar-titles">
        <div className="topbar-kicker">{kicker}</div>
        <div className="topbar-title">{title}</div>
      </div>
      <button type="button" className="btn btn-icon btn-secondary topbar-bell" onClick={onNotifs} aria-label="Notifications">
        <svg width="16" height="16" viewBox="0 0 24 24" style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 1.6 }}>
          <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6z" /><path d="M10 19a2 2 0 0 0 4 0" />
        </svg>
        {notifCount > 0 && <span className="topbar-badge">{notifCount}</span>}
      </button>
    </div>
  );
}
