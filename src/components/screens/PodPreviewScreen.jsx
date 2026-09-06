import { useDriverApp } from '../../state/store.jsx';

export default function PodPreviewScreen() {
  const { a, podName, state, actions } = useDriverApp();
  const meta = state.pod ? `${state.pod.size} · ${state.pod.type}` : '1.8 MB · JPG';

  return (
    <div className="pbody screen" style={{ paddingTop: 14 }}>
      <div className="text-muted" style={{ fontSize: 11.5 }}>{a.id} · POD attached</div>
      <h4 style={{ margin: '5px 0 12px' }}>POD preview</h4>
      <div className="stripe" style={{ height: 260, borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)', display: 'flex', alignItems: 'flex-end', padding: 10 }}>
        <div style={{ font: '700 10px ui-monospace,Menlo,monospace', background: 'var(--color-bg)', borderRadius: 6, boxShadow: 'var(--shadow-card-sm)', padding: '3px 7px' }}>POD SCAN — SIGNED &amp; STAMPED</div>
      </div>
      <div className="card-flat" style={{ padding: 10, marginTop: -2, fontSize: 11.5, lineHeight: 1.7 }}>
        <div className="row-between"><span className="text-muted">File</span><span style={{ fontWeight: 600 }}>{podName}</span></div>
        <div className="row-between"><span className="text-muted">Size / type</span><span style={{ fontWeight: 600 }}>{meta}</span></div>
        <div className="row-between"><span className="text-muted">Received by</span><span style={{ fontWeight: 600 }}>{a.contact}</span></div>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button type="button" className="btn btn-secondary" style={{ flex: 1, justifyContent: 'flex-start' }} onClick={actions.podReplace}>Replace</button>
        <button type="button" className="btn btn-secondary" style={{ flex: 1, justifyContent: 'flex-start' }} onClick={actions.podDelete}>Delete</button>
      </div>
      <button type="button" className="btn btn-primary btn-block" style={{ minHeight: 48, marginTop: 8 }} onClick={actions.goRemarks}>
        Upload POD
        <svg width="15" height="15" viewBox="0 0 24 24" style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 2, marginLeft: 'auto' }}><path d="m9 5 7 7-7 7" /></svg>
      </button>
      <div className="text-muted" style={{ fontSize: 11, margin: '8px 0 22px' }}>A valid POD moves this shipment to Delivered automatically.</div>
    </div>
  );
}
