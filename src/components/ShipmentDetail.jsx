import { useDriverApp } from '../state/store.jsx';

// tel: links are safe to navigate on a phone (the OS dialer opens directly).
// On desktop browsers a registered handler (Phone Link, FaceTime, Skype...)
// intercepts it with a blocking "open this app?" interstitial that can eat
// the page's next click — so there, just surface the number instead of
// attempting navigation.
const isTouchDevice = () => typeof window !== 'undefined' && window.matchMedia?.('(pointer: coarse)').matches;

export default function ShipmentDetail({ addressLabel, boxesLabel, typeLabel, primaryLabel, onPrimary, footNote }) {
  const { a, actions } = useDriverApp();
  return (
    <div className="pbody screen">
      <div className="row-between">
        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 21 }}>{a.id}</span>
        <span className={`tag ${a.tagClass}`}>{a.status}</span>
      </div>
      <div style={{ font: '700 13px var(--font-body)', marginTop: 4 }}>{a.customer}</div>
      <hr className="hr" />
      <div className="kicker">{addressLabel}</div>
      <div style={{ fontSize: 13.5, lineHeight: 1.5 }}>{a.addr}</div>
      <div style={{ display: 'flex', gap: 8, marginTop: 11 }}>
        <button type="button" className="btn btn-secondary" style={{ flex: 1, justifyContent: 'flex-start' }} onClick={actions.navigate}>Navigate</button>
        {isTouchDevice() ? (
          <a href={`tel:${a.phone.replace(/\s+/g, '')}`} className="btn btn-secondary" style={{ flex: 1, justifyContent: 'flex-start' }} onClick={actions.call}>Call</a>
        ) : (
          <button type="button" className="btn btn-secondary" style={{ flex: 1, justifyContent: 'flex-start' }} onClick={actions.call}>Call</button>
        )}
      </div>
      <hr className="hr" />
      <div className="detail-grid">
        <div><div className="detail-label">Contact person</div><div className="detail-value">{a.contact}</div></div>
        <div><div className="detail-label">Contact number</div><div className="detail-value">{a.phone}</div></div>
        <div><div className="detail-label">{boxesLabel}</div><div className="detail-value">{a.boxes}</div></div>
        <div><div className="detail-label">Weight</div><div className="detail-value">{a.weight}</div></div>
        <div><div className="detail-label">Appointment</div><div className="detail-value">{a.appt}</div></div>
        <div><div className="detail-label">{typeLabel}</div><div className="detail-value">{a.type}</div></div>
      </div>
      <hr className="hr" />
      <div className="kicker">Special instructions</div>
      <div style={{ fontSize: 13, lineHeight: 1.5, borderLeft: '3px solid var(--color-accent)', paddingLeft: 10, borderRadius: 2 }}>{a.instructions}</div>
      <button type="button" className="btn btn-primary btn-block" style={{ minHeight: 48, margin: '18px 0 6px' }} onClick={onPrimary}>
        {primaryLabel}
        <svg width="15" height="15" viewBox="0 0 24 24" style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 2, marginLeft: 'auto' }}><path d="m9 5 7 7-7 7" /></svg>
      </button>
      <div className="text-muted" style={{ fontSize: 11, paddingBottom: 22 }}>{footNote}</div>
    </div>
  );
}
