import { useDriverApp } from '../../state/store.jsx';

function nowDisplay() {
  const d = new Date();
  return d.toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).replace(',', ' ·');
}

export default function PickupDoneScreen() {
  const { a, state, actions } = useDriverApp();
  const gps = state.gps ? `${state.gps.lat.toFixed(4)}, ${state.gps.lng.toFixed(4)}` : '19.1176, 72.8697';
  const rows = [
    ['Status', 'Picked Up'],
    ['Boxes loaded', `${state.boxActual} of ${a.boxes}`],
    ['Timestamp', nowDisplay()],
    ['GPS', gps],
    ['Activity log', 'Entry created'],
  ];
  return (
    <div className="pbody screen" style={{ paddingTop: 24 }}>
      <div className="success-badge">
        <svg width="26" height="26" viewBox="0 0 24 24" style={{ fill: 'none', stroke: '#2a2723', strokeWidth: 2.8 }}><path d="m4 13 5 5L20 7" /></svg>
      </div>
      <h3 style={{ margin: '14px 0 4px' }}>Pickup confirmed</h3>
      <p className="text-muted" style={{ fontSize: 13, margin: 0 }}>{a.id} · {a.customer}</p>
      <hr className="hr" />
      <div className="kicker">Recorded automatically</div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {rows.map(([k, v]) => (
          <div key={k} className="row-between" style={{ padding: '8px 0', borderBottom: '1px solid var(--color-border)', fontSize: 13 }}>
            <span className="text-muted">{k}</span><span style={{ fontWeight: 600 }}>{v}</span>
          </div>
        ))}
      </div>
      <hr className="hr" />
      <div className="kicker">Next stop</div>
      <button type="button" className="scard" onClick={actions.goRoute}>
        <div className="row-between"><span style={{ font: '800 13.5px var(--font-body)' }}>Stop 2 · LOU000065</span><span className="tag tag-accent">11:00</span></div>
        <div className="text-muted" style={{ fontSize: 11.5, marginTop: 4 }}>Viviana Mall, Thane West · 11.4 km · appointment delivery</div>
      </button>
      <div style={{ display: 'flex', gap: 8, margin: '16px 0 22px' }}>
        <button type="button" className="btn btn-secondary" style={{ flex: 1, justifyContent: 'flex-start' }} onClick={actions.goTimeline}>Timeline</button>
        <button type="button" className="btn btn-primary" style={{ flex: 1.4, justifyContent: 'flex-start' }} onClick={actions.goPickups}>Back to pickups</button>
      </div>
    </div>
  );
}
