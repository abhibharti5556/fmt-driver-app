import { useDriverApp } from '../../state/store.jsx';
import ShipmentCard from '../ShipmentCard.jsx';

const FILTERS = [['Today', 'today'], ['Pending', 'pending'], ['Completed', 'done'], ['Appointment', 'appt']];

export default function PickupsScreen() {
  const { state, pickCards, actions } = useDriverApp();
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
      <div className="screen" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {pickCards.map((p) => (
          <ShipmentCard key={p.id} item={p} thirdLabel="Distance" thirdValue={p.dist} onOpen={() => actions.openShipment(p.id)} />
        ))}
        {pickCards.length === 0 && (
          <div className="well" style={{ padding: '30px 18px', textAlign: 'left', boxShadow: 'var(--shadow-card)' }}>
            <div style={{ font: '800 16px var(--font-body)' }}>No pickups match</div>
            <p className="text-muted" style={{ fontSize: 12.5, margin: '6px 0 0' }}>Nothing in this filter for today. Clear the filter or check with the control room on 022 4890 1100.</p>
          </div>
        )}
        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}
