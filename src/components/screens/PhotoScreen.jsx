import { useRef } from 'react';
import { useDriverApp } from '../../state/store.jsx';

export default function PhotoScreen() {
  const { a, state, actions } = useDriverApp();
  const cameraRef = useRef(null);
  const galleryRef = useRef(null);

  const onFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) actions.capturePhoto(file);
    e.target.value = '';
  };

  return (
    <div className="pbody screen" style={{ paddingTop: 12 }}>
      <div className="text-muted" style={{ fontSize: 11.5 }}>{a.id} · {a.customer} · {a.boxes} boxes</div>
      <h4 style={{ margin: '5px 0 12px' }}>Capture shipment photo</h4>

      <input ref={cameraRef} type="file" accept="image/*" capture="environment" style={{ display: 'none' }} onChange={onFile} />
      <input ref={galleryRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={onFile} />

      {state.photoTaken ? (
        <>
          <div style={{ height: 300, borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)', overflow: 'hidden', position: 'relative', background: 'var(--color-surface)' }}>
            {state.photoUrl && <img src={state.photoUrl} alt="Captured shipment" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
            <div style={{ position: 'absolute', left: 10, bottom: 10, font: '700 10px ui-monospace,Menlo,monospace', background: 'var(--color-bg)', borderRadius: 6, boxShadow: 'var(--shadow-card-sm)', padding: '3px 7px' }}>SHIPMENT PHOTO · {a.id}</div>
          </div>
          <div className="card-flat" style={{ padding: 10, marginTop: 10, fontSize: 11.5, lineHeight: 1.7 }}>
            <div className="row-between"><span className="text-muted">GPS</span><span style={{ fontWeight: 600 }}>{state.gps ? `${state.gps.lat.toFixed(4)}, ${state.gps.lng.toFixed(4)}` : 'Captured at GPS step'}</span></div>
            <div className="row-between"><span className="text-muted">Timestamp</span><span style={{ fontWeight: 600 }}>{new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}</span></div>
            <div className="row-between"><span className="text-muted">Shipment / driver</span><span style={{ fontWeight: 600 }}>{a.id} · FMT-DRV-042</span></div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button type="button" className="btn btn-secondary" style={{ flex: 1, justifyContent: 'flex-start' }} onClick={actions.retakePhoto}>Retake</button>
            <button type="button" className="btn btn-primary" style={{ flex: 1.3, justifyContent: 'flex-start' }} onClick={actions.goGps}>Continue</button>
          </div>
          <div className="text-muted" style={{ fontSize: 11, margin: '8px 0 22px' }}>This photograph is the shipment delivery evidence stored against the docket.</div>
        </>
      ) : (
        <>
          <div style={{ height: 300, borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)', background: 'var(--color-neutral-900, #2d2b2b)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', top: 12, left: 12, font: '700 10px ui-monospace,Menlo,monospace', color: 'rgba(255,255,255,.6)' }}>CAMERA · REAR</div>
            <div style={{ width: 140, height: 140, borderRadius: 12, boxShadow: 'inset 0 0 0 2px rgba(255,255,255,.35)' }} />
            <div style={{ position: 'absolute', bottom: 12, left: 12, right: 12, display: 'flex', justifyContent: 'space-between', font: '700 10px ui-monospace,Menlo,monospace', color: 'rgba(255,255,255,.6)' }}>
              <span>FRAME ALL BOXES</span><span>TAP TO CAPTURE</span>
            </div>
          </div>
          <button type="button" className="btn btn-primary btn-block" style={{ minHeight: 52, marginTop: 12 }} onClick={() => cameraRef.current?.click()}>
            <svg width="18" height="18" viewBox="0 0 24 24" style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, marginRight: 8 }}><path d="M3 8h4l2-2h6l2 2h4v12H3z" /><circle cx="12" cy="14" r="4" /></svg>
            Capture photo
          </button>
          <button type="button" className="btn btn-secondary btn-block" style={{ minHeight: 44 }} onClick={() => galleryRef.current?.click()}>Upload from gallery</button>
          <div className="text-muted" style={{ fontSize: 11, margin: '10px 0 22px' }}>Location, latitude, longitude, timestamp, shipment number and driver ID are attached to the file automatically.</div>
        </>
      )}
    </div>
  );
}
