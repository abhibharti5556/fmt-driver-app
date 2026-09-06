import { useDriverApp } from '../../state/store.jsx';

const DAY_LABEL = new Date().toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit', month: 'short' }).toUpperCase();

export default function DashboardScreen() {
  const { driver, state, pickIds, delIds, pickDoneCount, delDoneCount, actions } = useDriverApp();
  const pickPending = pickIds.length - pickDoneCount;
  const delPending = delIds.length - delDoneCount;

  return (
    <div className="pbody screen" style={{ paddingTop: 12 }}>
      <div className="row-between" style={{ alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 19 }}>{driver.name}</div>
          <div className="text-muted" style={{ fontSize: 12 }}>{driver.driverId} · {state.vehicleNo}</div>
        </div>
        <button
          type="button"
          onClick={actions.toggleDuty}
          className="chip"
          data-on={state.onDuty ? '1' : '0'}
          style={{ flex: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: state.onDuty ? 'var(--color-good)' : 'var(--color-muted)', flex: 'none' }} />
          {state.onDuty ? 'On duty' : 'Off duty'}
        </button>
      </div>
      <div className="row-between" style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 12, marginTop: 6 }}>
        <div style={{ font: '700 11px var(--font-body)', letterSpacing: '.06em' }}>{DAY_LABEL}</div>
        <div className="text-muted" style={{ fontSize: 11 }}>{driver.area}</div>
      </div>

      <div style={{ marginTop: 16 }}>
        <div className="kicker">Pickup</div>
        <div className="stat-trio">
          <div className="stat-box"><div className="stat-num">{pickIds.length}</div><div className="stat-label">Assigned</div></div>
          <div className="stat-box"><div className="stat-num">{pickDoneCount}</div><div className="stat-label">Completed</div></div>
          <div className="stat-box"><div className="stat-num" style={{ color: 'var(--color-accent-strong)' }}>{pickPending}</div><div className="stat-label">Pending</div></div>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <div className="kicker">Delivery</div>
        <div className="stat-trio">
          <div className="stat-box"><div className="stat-num">{delIds.length}</div><div className="stat-label">Assigned</div></div>
          <div className="stat-box"><div className="stat-num">{delDoneCount}</div><div className="stat-label">Delivered</div></div>
          <div className="stat-box"><div className="stat-num" style={{ color: 'var(--color-accent-strong)' }}>{delPending}</div><div className="stat-label">Pending</div></div>
        </div>
      </div>

      <div className="well" style={{ marginTop: 16, padding: 12, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <span className="tag tag-accent" style={{ flex: 'none', fontWeight: 700 }}>14:00</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ font: '700 13px var(--font-body)' }}>Appointment today · NES000231</div>
          <div className="text-muted" style={{ fontSize: 11.5 }}>Nespresso Boutique, Powai · 6 boxes</div>
        </div>
      </div>

      <div style={{ marginTop: 18 }}>
        <div className="row-between" style={{ marginBottom: 8 }}>
          <div className="kicker" style={{ margin: 0 }}>Today's route</div>
          <button type="button" className="btn btn-ghost" style={{ fontSize: 11 }} onClick={actions.goRoute}>View all 5 stops</button>
        </div>
        <div className="mapgrid" style={{ height: 140, borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card-sm)', position: 'relative' }}>
          <svg viewBox="0 0 340 150" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <polyline points="38,116 96,72 168,96 232,44 300,80" style={{ fill: 'none', stroke: 'var(--color-accent)', strokeWidth: 2.5, strokeDasharray: '6 5', filter: 'drop-shadow(0 1px 1px rgba(0,0,0,.12))' }} />
          </svg>
          {[
            { l: 30, t: 108, n: 1, dot: false },
            { l: 88, t: 64, n: 2, dot: true },
            { l: 160, t: 88, n: 3, dot: false },
            { l: 224, t: 36, n: 4, dot: true },
            { l: 292, t: 72, n: 5, dot: false, ring: true },
          ].map((p) => (
            <div key={p.n} style={{
              position: 'absolute', left: p.l, top: p.t, width: 18, height: 18,
              borderRadius: p.dot || p.ring ? '50%' : 6,
              background: p.ring ? 'var(--color-bg)' : (p.dot ? 'var(--color-accent)' : 'var(--color-text)'),
              boxShadow: p.ring ? 'var(--shadow-card-sm), inset 0 0 0 2px var(--color-text)' : 'var(--shadow-card-sm)',
              color: p.ring || p.dot ? 'var(--color-text)' : '#fff',
              font: '700 10px/18px var(--font-body)', textAlign: 'center',
            }}
            >{p.n}</div>
          ))}
        </div>
        <div className="card-flat" style={{ display: 'flex', marginTop: 10, padding: 0, overflow: 'hidden' }}>
          <div style={{ flex: 1, padding: '9px 11px' }}><div className="text-muted" style={{ fontSize: 10, letterSpacing: '.06em', textTransform: 'uppercase' }}>Distance</div><div style={{ font: '700 14px var(--font-body)' }}>41.6 km</div></div>
          <div style={{ flex: 1, padding: '9px 11px' }}><div className="text-muted" style={{ fontSize: 10, letterSpacing: '.06em', textTransform: 'uppercase' }}>Drive time</div><div style={{ font: '700 14px var(--font-body)' }}>2h 25m</div></div>
          <div style={{ flex: 1, padding: '9px 11px' }}><div className="text-muted" style={{ fontSize: 10, letterSpacing: '.06em', textTransform: 'uppercase' }}>Stops</div><div style={{ font: '700 14px var(--font-body)' }}>5</div></div>
        </div>
        <div className="text-muted" style={{ fontSize: 10.5, marginTop: 8 }}>Route sequenced automatically from appointment times, addresses and your workload.</div>
        <button type="button" className="btn btn-primary btn-block" style={{ minHeight: 46, marginTop: 12 }} onClick={actions.startRoute} disabled={!state.onDuty}>
          Start route
          <svg width="15" height="15" viewBox="0 0 24 24" style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 2, marginLeft: 'auto' }}><path d="m9 5 7 7-7 7" /></svg>
        </button>
        {!state.onDuty && <div className="text-muted" style={{ fontSize: 10.5, marginTop: 6 }}>Go on duty to start your route.</div>}
      </div>
      <div style={{ height: 20 }} />
    </div>
  );
}
