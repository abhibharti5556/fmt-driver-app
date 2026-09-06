import { useDriverApp } from '../../state/store.jsx';

export default function NotificationsScreen() {
  const { notifs } = useDriverApp();
  return (
    <div className="pbody" style={{ paddingTop: 12 }}>
      {notifs.map((n) => (
        <div key={n.title} className="notif" data-new={n.level}>
          <div className="row-between" style={{ gap: 8 }}>
            <span style={{ font: '700 11px var(--font-body)', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--color-accent-strong)' }}>{n.kind}</span>
            <span className="text-muted" style={{ fontSize: 11, flex: 'none' }}>{n.ago}</span>
          </div>
          <div style={{ font: '700 13.5px var(--font-body)', marginTop: 4 }}>{n.title}</div>
          <div className="text-muted" style={{ fontSize: 11.5, lineHeight: 1.45 }}>{n.body}</div>
        </div>
      ))}
      <div style={{ height: 20 }} />
    </div>
  );
}
