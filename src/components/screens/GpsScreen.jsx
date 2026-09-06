import { useDriverApp } from '../../state/store.jsx';

export default function GpsScreen() {
  const { a, state, actions } = useDriverApp();
  const capturedAt = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

  if (state.gps) {
    return (
      <div className="pbody screen" style={{ paddingTop: 14 }}>
        <div className="well" style={{ padding: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" style={{ fill: 'none', stroke: 'var(--color-accent-strong)', strokeWidth: 1.8 }}><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
            <span style={{ font: '800 14px var(--font-body)' }}>GPS location captured</span>
          </div>
          <div className="mapgrid" style={{ height: 100, marginTop: 11, borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card-sm)', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '50%', top: '50%', width: 13, height: 13, margin: '-6.5px 0 0 -6.5px', borderRadius: '50%', background: 'var(--color-accent)', boxShadow: '0 0 0 7px var(--color-accent-soft)' }} />
          </div>
          <div style={{ font: '400 11.5px/1.8 var(--font-body)', marginTop: 10 }}>
            <div className="row-between" style={{ borderBottom: '1px solid var(--color-border)' }}><span className="text-muted">Latitude</span><span style={{ fontWeight: 600 }}>{state.gps.lat.toFixed(6)}</span></div>
            <div className="row-between" style={{ borderBottom: '1px solid var(--color-border)' }}><span className="text-muted">Longitude</span><span style={{ fontWeight: 600 }}>{state.gps.lng.toFixed(6)}</span></div>
            <div className="row-between" style={{ borderBottom: '1px solid var(--color-border)' }}><span className="text-muted">Accuracy</span><span style={{ fontWeight: 600 }}>±{Math.round(state.gps.accuracy)} m</span></div>
            <div className="row-between" style={{ borderBottom: '1px solid var(--color-border)' }}><span className="text-muted">Captured at</span><span style={{ fontWeight: 600 }}>{capturedAt}</span></div>
            <div className="row-between"><span className="text-muted">Attached to</span><span style={{ fontWeight: 600 }}>{a.id}</span></div>
          </div>
        </div>
        <button type="button" className="btn btn-primary btn-block" style={{ minHeight: 48, margin: '14px 0 22px' }} onClick={actions.goPod}>
          Continue to POD
          <svg width="15" height="15" viewBox="0 0 24 24" style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 2, marginLeft: 'auto' }}><path d="m9 5 7 7-7 7" /></svg>
        </button>
      </div>
    );
  }

  if (state.gpsError) {
    return (
      <div className="pbody screen" style={{ paddingTop: 14 }}>
        <div className="well" style={{ padding: 12, background: 'var(--color-accent-soft)' }}>
          <div style={{ font: '800 14px var(--font-body)', color: 'var(--color-accent-strong)' }}>Location permission is required</div>
          <p style={{ fontSize: 12.5, margin: '6px 0 0', color: 'var(--color-accent-strong)' }}>{state.gpsError} Enable location for Final Mile Techies Driver, then retry.</p>
        </div>
        <div className="card-flat" style={{ padding: 11, marginTop: 12, fontSize: 11.5, lineHeight: 1.7 }}>
          <div className="row-between"><span className="text-muted">Photo</span><span style={{ fontWeight: 600 }}>Saved without GPS</span></div>
          <div className="row-between"><span className="text-muted">Timestamp</span><span style={{ fontWeight: 600 }}>{capturedAt}</span></div>
        </div>
        <div style={{ display: 'flex', gap: 8, margin: '14px 0 6px' }}>
          <button type="button" className="btn btn-secondary" style={{ flex: 1, justifyContent: 'flex-start' }} onClick={actions.gpsRetry}>Retry GPS</button>
          <button type="button" className="btn btn-primary" style={{ flex: 1.2, justifyContent: 'flex-start' }} onClick={actions.goPod}>Continue anyway</button>
        </div>
        <div className="text-muted" style={{ fontSize: 11, paddingBottom: 22 }}>Ops sees a "GPS missing" flag on the docket when you continue without location.</div>
      </div>
    );
  }

  return (
    <div className="screen" style={{ paddingTop: 30, textAlign: 'center' }}>
      <div className="text-muted" style={{ fontSize: 13 }}>Requesting device location…</div>
    </div>
  );
}
