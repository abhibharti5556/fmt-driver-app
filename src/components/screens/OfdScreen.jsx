import { useDriverApp } from '../../state/store.jsx';

export default function OfdScreen() {
  const { a, actions } = useDriverApp();
  return (
    <div className="pbody screen">
      <div className="well" style={{ padding: 14 }}>
        <div style={{ font: '700 10px var(--font-body)', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--color-accent-strong)' }}>Status updated</div>
        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 23, marginTop: 6 }}>Out for Delivery</div>
        <div className="text-muted" style={{ fontSize: 12 }}>{a.id} · notified customer</div>
      </div>
      <hr className="hr" />
      <div className="kicker">Complete in 3 steps</div>
      <div className="card-flat" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="step-row" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <span className="step-num" data-done="1">1</span>
          <div style={{ flex: 1 }}><div style={{ font: '700 13.5px var(--font-body)' }}>Shipment photograph</div><div className="text-muted" style={{ fontSize: 11.5 }}>GPS-tagged delivery evidence</div></div>
        </div>
        <div className="step-row" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <span className="step-num" data-done="0">2</span>
          <div style={{ flex: 1 }}><div style={{ font: '700 13.5px var(--font-body)' }}>POD upload</div><div className="text-muted" style={{ fontSize: 11.5 }}>JPG, JPEG, PNG or PDF</div></div>
        </div>
        <div className="step-row">
          <span className="step-num" data-done="0">3</span>
          <div style={{ flex: 1 }}><div style={{ font: '700 13.5px var(--font-body)' }}>Delivery remarks</div><div className="text-muted" style={{ fontSize: 11.5 }}>Optional for this customer</div></div>
        </div>
      </div>
      <button type="button" className="btn btn-primary btn-block" style={{ minHeight: 48, margin: '16px 0 22px' }} onClick={actions.goPhoto}>
        Capture shipment photo
        <svg width="15" height="15" viewBox="0 0 24 24" style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 2, marginLeft: 'auto' }}><path d="m9 5 7 7-7 7" /></svg>
      </button>
    </div>
  );
}
