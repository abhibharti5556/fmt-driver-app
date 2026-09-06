import { useRef, useState } from 'react';
import { useDriverApp } from '../../state/store.jsx';

export default function ProfileScreen() {
  const { driver, state, actions } = useDriverApp();
  const photoInputRef = useRef(null);
  const [photoError, setPhotoError] = useState(null);

  const onPickPhoto = (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) { setPhotoError('Please choose an image file.'); return; }
    if (file.size > 3 * 1024 * 1024) { setPhotoError('Image is too large — pick one under 3 MB.'); return; }
    setPhotoError(null);
    const reader = new FileReader();
    reader.onload = () => actions.setDriverPhoto(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="pbody screen">
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 'none' }}>
          {state.driverPhoto ? (
            <img src={state.driverPhoto} alt="" style={{ width: 58, height: 58, borderRadius: '50%', boxShadow: 'var(--shadow-card)', objectFit: 'cover', display: 'block' }} />
          ) : (
            <div className="stripe" style={{ width: 58, height: 58, borderRadius: '50%', boxShadow: 'var(--shadow-card)' }} />
          )}
          <button
            type="button" onClick={() => photoInputRef.current?.click()}
            aria-label="Change photo"
            style={{
              position: 'absolute', right: -3, bottom: -3, width: 24, height: 24, borderRadius: '50%',
              background: 'var(--color-text)', color: '#fff', border: '2px solid var(--color-bg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 2 }}>
              <path d="M3 8h4l2-2h6l2 2h4v12H3z" /><circle cx="12" cy="14" r="4" />
            </svg>
          </button>
          <input ref={photoInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={onPickPhoto} />
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 19 }}>{driver.name}</div>
          <div className="text-muted" style={{ fontSize: 12 }}>{driver.driverId} · {driver.phone}</div>
        </div>
      </div>
      {photoError && <div className="text-muted" style={{ fontSize: 11, color: 'var(--color-accent-strong)', marginTop: 8 }}>{photoError}</div>}
      <hr className="hr" />
      <div style={{ font: '400 13px var(--font-body)' }}>
        <div className="row-between" style={{ padding: '9px 0', borderBottom: '1px solid var(--color-border)' }}>
          <span className="text-muted">Vehicle</span>
          <input
            aria-label="Vehicle number"
            className="input" value={state.vehicleNo} onChange={(e) => actions.setVehicleNo(e.target.value)}
            style={{ width: 150, minHeight: 32, padding: '4px 10px', textAlign: 'right', fontWeight: 600, fontSize: 13 }}
          />
        </div>
        <div className="row-between" style={{ padding: '9px 0', borderBottom: '1px solid var(--color-border)' }}><span className="text-muted">Vehicle type</span><span style={{ fontWeight: 600 }}>{driver.vehicleType}</span></div>
        <div className="row-between" style={{ padding: '9px 0', borderBottom: '1px solid var(--color-border)' }}><span className="text-muted">Service area</span><span style={{ fontWeight: 600 }}>{driver.area}</span></div>
        <div className="row-between" style={{ padding: '9px 0' }}>
          <span className="text-muted">Duty status</span>
          <button type="button" onClick={actions.toggleDuty} className="chip" data-on={state.onDuty ? '1' : '0'} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: state.onDuty ? 'var(--color-good)' : 'var(--color-muted)', flex: 'none' }} />
            {state.onDuty ? 'On duty' : 'Off duty'}
          </button>
        </div>
      </div>
      <div className="kicker" style={{ margin: '18px 0 8px' }}>Today</div>
      <div className="stat-trio">
        <div className="stat-box"><div style={{ font: '800 21px var(--font-body)' }}>5</div><div className="stat-label">Stops</div></div>
        <div className="stat-box"><div style={{ font: '800 21px var(--font-body)' }}>41.6</div><div className="stat-label">km</div></div>
        <div className="stat-box"><div style={{ font: '800 21px var(--font-body)' }}>96%</div><div className="stat-label">On time</div></div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, margin: '18px 0 22px' }}>
        <button type="button" className="btn btn-secondary btn-block" style={{ margin: 0 }}>Change password</button>
        <button type="button" className="btn btn-secondary btn-block" style={{ margin: 0 }}>Notification settings</button>
        <button type="button" className="btn btn-secondary btn-block" style={{ margin: 0, color: 'var(--color-accent-strong)' }} onClick={actions.logout}>Log out</button>
      </div>
    </div>
  );
}
