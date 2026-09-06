export default function ShipmentCard({ item, thirdLabel, thirdValue, onOpen }) {
  return (
    <button type="button" className="scard" data-appt={item.apptFlag} onClick={onOpen}>
      <div className="row-between">
        <span style={{ font: '800 14px var(--font-body)' }}>{item.id}</span>
        <span className={`tag ${item.tagClass}`}>{item.status}</span>
      </div>
      <div style={{ font: '700 12.5px var(--font-body)', marginTop: 5 }}>{item.customer}</div>
      <div className="text-muted" style={{ fontSize: 11.5, lineHeight: 1.45, marginTop: 2 }}>{item.addr}</div>
      <div style={{ display: 'flex', marginTop: 10, borderTop: '1px solid var(--color-border)', paddingTop: 8 }}>
        <div style={{ flex: 1 }}><div className="text-muted" style={{ fontSize: 9.5, letterSpacing: '.06em', textTransform: 'uppercase' }}>Boxes</div><div style={{ font: '700 13px var(--font-body)' }}>{item.boxes}</div></div>
        <div style={{ flex: 1.4 }}><div className="text-muted" style={{ fontSize: 9.5, letterSpacing: '.06em', textTransform: 'uppercase' }}>Appointment</div><div style={{ font: '700 13px var(--font-body)' }}>{item.appt}</div></div>
        <div style={{ flex: 1 }}><div className="text-muted" style={{ fontSize: 9.5, letterSpacing: '.06em', textTransform: 'uppercase' }}>{thirdLabel}</div><div style={{ font: '700 13px var(--font-body)' }}>{thirdValue}</div></div>
      </div>
    </button>
  );
}
