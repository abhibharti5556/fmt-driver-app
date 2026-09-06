import { useDriverApp } from '../../state/store.jsx';

export default function RemarksScreen() {
  const { a, state, remarkOptions, actions } = useDriverApp();
  return (
    <div className="pbody screen" style={{ paddingTop: 14 }}>
      <div className="text-muted" style={{ fontSize: 11.5 }}>{a.id} · {a.customer}</div>
      <h4 style={{ margin: '5px 0 4px' }}>Delivery remarks</h4>
      <p className="text-muted" style={{ fontSize: 12, margin: '0 0 12px' }}>Optional. Pick a preset or type your own.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
        {remarkOptions.map((r) => (
          <button key={r} type="button" className="chip" data-on={state.remark === r ? '1' : '0'} style={{ fontWeight: 500 }} onClick={() => actions.pickRemarkPreset(r)}>{r}</button>
        ))}
      </div>
      <div className="field" style={{ marginTop: 14 }}>
        <label htmlFor="remark">Remark</label>
        <textarea id="remark" className="input" style={{ minHeight: 90 }} placeholder="Anything Operations should know" value={state.remark} onChange={(e) => actions.setRemark(e.target.value)} />
      </div>
      <button type="button" className="btn btn-primary btn-block" style={{ minHeight: 48, margin: '14px 0 6px' }} onClick={actions.completeDelivery}>
        Complete delivery
        <svg width="15" height="15" viewBox="0 0 24 24" style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 2, marginLeft: 'auto' }}><path d="m9 5 7 7-7 7" /></svg>
      </button>
      <div className="text-muted" style={{ fontSize: 11, paddingBottom: 22 }}>Photo, POD, GPS, timestamp and remarks are filed against the docket together.</div>
    </div>
  );
}
