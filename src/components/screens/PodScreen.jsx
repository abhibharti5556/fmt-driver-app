import { useRef } from 'react';
import { useDriverApp } from '../../state/store.jsx';

export default function PodScreen() {
  const { a, state, actions } = useDriverApp();
  const captureRef = useRef(null);
  const fileRef = useRef(null);

  const onFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) actions.uploadPod(file);
    e.target.value = '';
  };

  return (
    <div className="pbody screen" style={{ paddingTop: 14 }}>
      <div className="text-muted" style={{ fontSize: 11.5 }}>{a.id} · {a.customer}</div>
      <h4 style={{ margin: '5px 0 12px' }}>Upload proof of delivery</h4>

      <input ref={captureRef} type="file" accept="image/*" capture="environment" style={{ display: 'none' }} onChange={onFile} />
      <input ref={fileRef} type="file" accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf" style={{ display: 'none' }} onChange={onFile} />

      {state.podError === 'upload' && (
        <div className="well" style={{ padding: 11, marginBottom: 12, background: 'var(--color-accent-soft)' }}>
          <div style={{ font: '800 13px var(--font-body)', color: 'var(--color-accent-strong)' }}>Unable to upload POD. Please try again.</div>
          <p style={{ fontSize: 12, margin: '5px 0 0', color: 'var(--color-accent-strong)' }}>Upload failed at {state.podProgress || 62}% — weak network at this location. Try again.</p>
        </div>
      )}
      {state.podError === 'type' && (
        <div className="well" style={{ padding: 11, marginBottom: 12, background: 'var(--color-accent-soft)' }}>
          <div style={{ font: '800 13px var(--font-body)', color: 'var(--color-accent-strong)' }}>Please upload JPG, PNG or PDF.</div>
          <p style={{ fontSize: 12, margin: '5px 0 0', color: 'var(--color-accent-strong)' }}>That file type was rejected. Convert the file or photograph the signed sheet instead.</p>
        </div>
      )}

      <button type="button" className="btn btn-primary btn-block" style={{ minHeight: 52, margin: '0 0 8px' }} disabled={state.podUploading} onClick={() => captureRef.current?.click()}>
        <svg width="18" height="18" viewBox="0 0 24 24" style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, marginRight: 8 }}><path d="M3 8h4l2-2h6l2 2h4v12H3z" /><circle cx="12" cy="14" r="4" /></svg>
        Capture POD
      </button>
      <button type="button" className="btn btn-secondary btn-block" style={{ minHeight: 46 }} disabled={state.podUploading} onClick={() => fileRef.current?.click()}>Upload from files</button>

      <div className="well" style={{ padding: 14, marginTop: 14 }}>
        <div className="kicker" style={{ marginBottom: 6 }}>Accepted</div>
        <div style={{ fontSize: 12.5 }}>JPG · JPEG · PNG · PDF — up to 10 MB. Signed and stamped copies only.</div>
      </div>

      {state.podUploading && (
        <div className="card-flat" style={{ marginTop: 14, padding: 11 }}>
          <div className="row-between" style={{ fontSize: 12 }}><span style={{ fontWeight: 600 }}>Uploading POD…</span><span className="text-muted">{Math.round(state.podProgress)}%</span></div>
          <div style={{ height: 8, borderRadius: 4, boxShadow: 'var(--shadow-card-sm)', marginTop: 8, overflow: 'hidden' }}>
            <div style={{ width: `${state.podProgress}%`, height: '100%', background: 'var(--color-accent)', borderRadius: 4, transition: 'width .2s linear' }} />
          </div>
        </div>
      )}
      <div style={{ height: 22 }} />
    </div>
  );
}
