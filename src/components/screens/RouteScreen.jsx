import { useDriverApp } from '../../state/store.jsx';

function isStopDone(kind, status) {
  return kind === 'Delivery' ? status === 'Delivered' : (status === 'Picked Up' || status === 'In Transit');
}

export default function RouteScreen() {
  const { stops, state, actions } = useDriverApp();
  return (
    <div className="pbody">
      <div className="mapgrid" style={{ height: 230, position: 'relative', margin: '0 16px 14px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)' }}>
        <svg viewBox="0 0 340 230" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <polyline points="46,182 104,128 176,152 244,74 296,120" style={{ fill: 'none', stroke: 'var(--color-accent)', strokeWidth: 2.5, strokeDasharray: '6 5' }} />
        </svg>
        {[
          { l: 38, t: 174, n: 1, dot: false },
          { l: 96, t: 120, n: 2, dot: true },
          { l: 168, t: 144, n: 3, dot: false },
          { l: 236, t: 66, n: 4, dot: true },
          { l: 288, t: 112, n: 5, dot: false, ring: true },
        ].map((p) => (
          <div key={p.n} style={{
            position: 'absolute', left: p.l, top: p.t, width: 20, height: 20,
            borderRadius: p.dot || p.ring ? '50%' : 6,
            background: p.ring ? 'var(--color-bg)' : (p.dot ? 'var(--color-accent)' : 'var(--color-text)'),
            boxShadow: p.ring ? 'var(--shadow-card-sm), inset 0 0 0 2px var(--color-text)' : 'var(--shadow-card-sm)',
            color: p.ring || p.dot ? 'var(--color-text)' : '#fff', font: '700 11px/20px var(--font-body)', textAlign: 'center',
          }}
          >{p.n}</div>
        ))}
        <div style={{ position: 'absolute', left: 10, top: 10, background: 'var(--color-bg)', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-card-sm)', padding: '7px 9px', font: '400 10px/1.7 var(--font-body)' }}>
          <div><span style={{ display: 'inline-block', width: 9, height: 9, background: 'var(--color-text)', marginRight: 6, borderRadius: 2 }} />Pickup</div>
          <div><span style={{ display: 'inline-block', width: 9, height: 9, borderRadius: '50%', background: 'var(--color-accent)', marginRight: 6 }} />Appointment delivery</div>
          <div><span style={{ display: 'inline-block', width: 9, height: 9, borderRadius: '50%', boxShadow: 'inset 0 0 0 2px var(--color-text)', marginRight: 6 }} />Delivery</div>
        </div>
        <div style={{ position: 'absolute', right: 10, bottom: 10, font: '700 9px ui-monospace,Menlo,monospace', background: 'var(--color-bg)', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-card-sm)', padding: '3px 7px' }}>41.6 KM · 2H 25M</div>
      </div>
      <div className="screen">
        <div className="text-muted" style={{ fontSize: 11, marginBottom: 4 }}>Tap a stop to open it — pickups follow the pickup flow, deliveries follow the delivery flow.</div>
        {stops.map((s) => {
          const done = isStopDone(s.kind, state.status[s.id]);
          return (
            <button
              key={s.n} type="button" onClick={() => actions.openShipment(s.id)}
              style={{ display: 'flex', gap: 11, padding: '11px 0', borderWidth: '0 0 1px', borderStyle: 'solid', borderColor: 'var(--color-border)', width: '100%', background: 'transparent', textAlign: 'left', cursor: 'pointer', opacity: done ? 0.6 : 1 }}
            >
              <div style={{
                width: 24, height: 24, flex: 'none', borderRadius: 8, font: '700 12px/24px var(--font-body)', textAlign: 'center', boxShadow: 'var(--shadow-card-sm)',
                background: done ? 'var(--color-good)' : 'var(--color-text)', color: '#fff',
              }}>
                {done ? '✓' : s.n}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', gap: 7, alignItems: 'baseline' }}>
                  <span style={{ font: '700 12px var(--font-body)', letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--color-accent-strong)' }}>{s.kind}</span>
                  <span style={{ font: '700 13px var(--font-body)', textDecoration: done ? 'line-through' : 'none' }}>{s.id}</span>
                </div>
                <div className="text-muted" style={{ fontSize: 11.5, marginTop: 2 }}>{s.place} · {s.dist}</div>
              </div>
              <div style={{ textAlign: 'right', flex: 'none' }}>
                <div style={{ font: '700 12px var(--font-body)' }}>{s.time}</div>
                <div className="text-muted" style={{ fontSize: 10, letterSpacing: '.05em', textTransform: 'uppercase' }}>{done ? 'Closed' : s.tag}</div>
              </div>
            </button>
          );
        })}
        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}
