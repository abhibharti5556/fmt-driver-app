import { useDriverApp } from '../../state/store.jsx';

export default function DeliveredScreen() {
  const { a, state, podName, driver, actions } = useDriverApp();
  const deliveredOn = new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }).replace(',', ' ·');
  const gps = state.gps ? `${state.gps.lat.toFixed(4)}, ${state.gps.lng.toFixed(4)}` : '19.0653, 72.8688';
  const rows = [
    ['Status', 'Delivered'],
    ['Delivered on', deliveredOn],
    ['Driver', driver.name],
    ['GPS', gps],
    ['POD', podName],
    ['Shipment photo', state.photoTaken ? 'Attached' : 'Not attached'],
    ['Remarks', state.remark || 'None'],
  ];
  return (
    <div className="pbody screen" style={{ paddingTop: 24 }}>
      <div className="success-badge">
        <svg width="26" height="26" viewBox="0 0 24 24" style={{ fill: 'none', stroke: '#2a2723', strokeWidth: 2.8 }}><path d="m4 13 5 5L20 7" /></svg>
      </div>
      <h3 style={{ margin: '14px 0 4px' }}>Shipment delivered successfully</h3>
      <p className="text-muted" style={{ fontSize: 13, margin: 0 }}>{a.id} · {a.customer}</p>
      <hr className="hr" />
      <div className="kicker">Recorded automatically</div>
      <div style={{ font: '400 13px var(--font-body)' }}>
        {rows.map(([k, v]) => (
          <div key={k} className="row-between" style={{ padding: '8px 0', borderBottom: '1px solid var(--color-border)' }}>
            <span className="text-muted">{k}</span><span style={{ fontWeight: 600, maxWidth: 180, textAlign: 'right' }}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, margin: '16px 0 22px' }}>
        <button type="button" className="btn btn-secondary" style={{ flex: 1, justifyContent: 'flex-start' }} onClick={actions.goTimeline}>Timeline</button>
        <button type="button" className="btn btn-primary" style={{ flex: 1.4, justifyContent: 'flex-start' }} onClick={actions.goDeliveries}>Back to deliveries</button>
      </div>
    </div>
  );
}
