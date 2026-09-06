import { useDriverApp } from '../../state/store.jsx';
import ShipmentCard from '../ShipmentCard.jsx';

const FILTERS = [['Today', 'today'], ['Pending', 'pending'], ['Delivered', 'done'], ['Appointment', 'appt']];

export default function DeliveriesScreen() {
  const { state, delCards, actions } = useDriverApp();
  return (
    <div className="pbody">
      <div className="screen" style={{ position: 'sticky', top: 0, background: 'var(--color-bg)', zIndex: 2, paddingBottom: 4 }}>
        <input className="input" placeholder="Search docket, customer or area" value={state.q} onChange={(e) => actions.setQ(e.target.value)} />
        <div className="chiprow" style={{ marginTop: 10 }}>
          {FILTERS.map(([label, key]) => (
            <button key={key} type="button" className="chip" data-on={state.filter === key ? '1' : '0'} onClick={() => actions.setFilter(key)}>{label}</button>
          ))}
        </div>
      </div>
      <div className="well" style={{ margin: '0 16px 12px', padding: 12 }}>
        <div className="row-between">
          <span style={{ font: '800 11px var(--font-body)', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--color-accent-strong)' }}>Appointment today</span>
          <span style={{ font: '700 12px var(--font-body)' }}>in 4h 19m</span>
        </div>
        <div style={{ font: '700 13px var(--font-body)', marginTop: 6 }}>NES000231 · 14:00 · route position 4</div>
        <div className="text-muted" style={{ fontSize: 11.5 }}>Nespresso Boutique, Galleria, Powai · 6 boxes</div>
      </div>
      <div className="screen" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {delCards.map((d) => (
          <ShipmentCard key={d.id} item={d} thirdLabel="Priority" thirdValue={d.priority} onOpen={() => actions.openShipment(d.id)} />
        ))}
        {delCards.length === 0 && (
          <div className="well" style={{ padding: '30px 18px', boxShadow: 'var(--shadow-card)' }}>
            <div style={{ font: '800 16px var(--font-body)' }}>No deliveries match</div>
            <p className="text-muted" style={{ fontSize: 12.5, margin: '6px 0 0' }}>Try another filter, or pull down to refresh your assignments.</p>
          </div>
        )}
        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}
