import { useDriverApp } from '../../state/store.jsx';

export default function BoxCountScreen() {
  const { a, state, actions } = useDriverApp();
  const diff = state.boxActual - a.boxes;
  const mismatch = diff !== 0;

  return (
    <div className="pbody screen">
      <div className="text-muted" style={{ fontSize: 11.5 }}>{a.id} · {a.customer}</div>
      <h4 style={{ margin: '6px 0 0' }}>Count boxes while loading</h4>
      <hr className="hr" />

      <div className="card-flat" style={{ display: 'flex', padding: 0, overflow: 'hidden', marginBottom: 16 }}>
        <div style={{ flex: 1, padding: 12 }}><div className="text-muted" style={{ fontSize: 10, letterSpacing: '.06em', textTransform: 'uppercase' }}>Expected</div><div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 24, lineHeight: 1.1 }}>{a.boxes}</div></div>
        <div style={{ flex: 1, padding: 12 }}><div className="text-muted" style={{ fontSize: 10, letterSpacing: '.06em', textTransform: 'uppercase' }}>Loaded</div><div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 24, lineHeight: 1.1 }}>{state.boxActual}</div></div>
        <div style={{ flex: 1, padding: 12 }}><div className="text-muted" style={{ fontSize: 10, letterSpacing: '.06em', textTransform: 'uppercase' }}>Difference</div><div className="bdiff" data-off={mismatch ? '1' : '0'}>{diff > 0 ? `+${diff}` : diff}</div></div>
      </div>

      <div className="well" style={{ display: 'flex', alignItems: 'stretch', padding: 4 }}>
        <button type="button" onClick={actions.decBox} className="btn" style={{ width: 66, flex: 'none', fontSize: 26, fontWeight: 800 }}>−</button>
        <input
          className="input"
          style={{ border: 0, boxShadow: 'none', background: 'transparent', textAlign: 'center', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 38, minHeight: 88, flex: 1 }}
          value={state.boxActual}
          onChange={(e) => actions.setBox(e.target.value)}
          inputMode="numeric"
        />
        <button type="button" onClick={actions.incBox} className="btn" style={{ width: 66, flex: 'none', fontSize: 26, fontWeight: 800 }}>+</button>
      </div>
      <div className="text-muted" style={{ fontSize: 11, marginTop: 7 }}>Tap the number to type an exact count.</div>

      {mismatch && (
        <div className="well" style={{ marginTop: 14, padding: 12, background: 'var(--color-accent-soft)' }}>
          <div style={{ font: '800 13px var(--font-body)', color: 'var(--color-accent-strong)' }}>Actual box count differs from booking</div>
          <p style={{ fontSize: 12, margin: '5px 0 0', color: 'var(--color-accent-strong)' }}>Booked {a.boxes} · loaded {state.boxActual}. Add a remark so Operations can reconcile with the customer.</p>
        </div>
      )}

      <button type="button" className="btn btn-secondary btn-block" style={{ minHeight: 46, marginTop: 14 }} onClick={actions.goStickers} disabled={state.boxActual < 1}>
        <svg width="16" height="16" viewBox="0 0 24 24" style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 1.8 }}>
          <path d="M6 9V3h12v6" /><rect x="6" y="13" width="12" height="8" /><path d="M6 17H3v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6h-3" />
        </svg>
        Print box stickers ({state.boxActual})
      </button>
      <div className="text-muted" style={{ fontSize: 11, marginTop: 6 }}>One 2 × 1 in sticker per box · Docket No. and box count.</div>

      <div className="field" style={{ marginTop: 14 }}>
        <label htmlFor="pickup-remark">Pickup remark (optional)</label>
        <textarea id="pickup-remark" className="input" style={{ minHeight: 68 }} placeholder="e.g. 2 cartons held back by shipper — not ready" value={state.remark} onChange={(e) => actions.setRemark(e.target.value)} />
      </div>

      <button type="button" className="btn btn-primary btn-block" style={{ minHeight: 48, margin: '16px 0 6px' }} onClick={actions.confirmPickup}>
        Confirm pickup
        <svg width="15" height="15" viewBox="0 0 24 24" style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 2, marginLeft: 'auto' }}><path d="m9 5 7 7-7 7" /></svg>
      </button>
      <div className="text-muted" style={{ fontSize: 11, paddingBottom: 22 }}>Confirming records time, GPS and the loaded count against {a.id}.</div>
    </div>
  );
}
