import { useState } from 'react';
import { useDriverApp } from '../../state/store.jsx';
import FmtLogo from '../FmtLogo.jsx';

function forgotPasswordHref(mobile) {
  const subject = `Password reset request — ${mobile || 'driver'}`;
  const body = [
    'Hello Operations team,',
    '',
    'I am unable to log in to the Final Mile Techies Driver App and need my password reset.',
    '',
    `Registered mobile number: ${mobile || ''}`,
    `Requested on: ${new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}`,
    '',
    'Please reset my password or share fresh login credentials at the earliest.',
    '',
    'Thanks,',
  ].join('\n');
  return `mailto:support@finalmiletechies.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function LoginScreen() {
  const { state, actions } = useDriverApp();
  const [authMode, setAuthMode] = useState('password');

  const submit = (e) => {
    e.preventDefault();
    actions.attemptLogin(state.loginMobile, state.loginPassword);
  };

  return (
    <form className="screen" style={{ padding: '32px 22px 22px', display: 'flex', flexDirection: 'column', height: '100%' }} onSubmit={submit}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <FmtLogo height={72} />
      </div>
      <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 15, margin: '18px 0 2px', textAlign: 'center' }}>Driver App</div>
      <p className="text-muted" style={{ fontSize: 13, margin: '0 0 16px', textAlign: 'center' }}>Sign in with your registered mobile number.</p>

      <hr className="hr" style={{ margin: '0 0 32px' }} />

      <div className="field" style={{ marginBottom: 14 }}>
        <label htmlFor="mobile">Mobile number / Username</label>
        <input id="mobile" className="input" value={state.loginMobile} onChange={(e) => actions.setLoginMobile(e.target.value)} autoComplete="username" />
      </div>

      <div className="seg" style={{ marginBottom: 14 }}>
        <label className="seg-opt">
          <input type="radio" name="authmode" checked={authMode === 'password'} onChange={() => setAuthMode('password')} />
          <span>Password</span>
        </label>
        <label className="seg-opt">
          <input type="radio" name="authmode" checked={authMode === 'otp'} onChange={() => setAuthMode('otp')} />
          <span>OTP</span>
        </label>
      </div>

      {authMode === 'password' ? (
        <div className="field" style={{ marginBottom: 16 }}>
          <label htmlFor="password">Password</label>
          <input id="password" className="input" type="password" value={state.loginPassword} onChange={(e) => actions.setLoginPassword(e.target.value)} autoComplete="current-password" placeholder="Enter password" />
        </div>
      ) : (
        <div className="field" style={{ marginBottom: 16 }}>
          <label htmlFor="otp">One-time password</label>
          <input id="otp" className="input" value={state.loginPassword} onChange={(e) => actions.setLoginPassword(e.target.value)} placeholder="Sent via SMS" inputMode="numeric" />
        </div>
      )}

      {state.authError && (
        <div className="well" style={{ padding: 11, marginBottom: 16, color: 'var(--color-accent-strong)', fontSize: 12.5, fontWeight: 600 }}>{state.authError}</div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <label className="radio">
          <input type="checkbox" defaultChecked />
          <span className="dot" />
          <span style={{ fontSize: 13 }}>Remember me</span>
        </label>
        <a href={forgotPasswordHref(state.loginMobile)} style={{ fontSize: 13 }}>Forgot password</a>
      </div>

      <button type="submit" className="btn btn-primary btn-block" style={{ minHeight: 50 }}>
        Login
        <svg width="15" height="15" viewBox="0 0 24 24" style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 2, marginLeft: 'auto' }}><path d="m9 5 7 7-7 7" /></svg>
      </button>

      <div style={{ marginTop: 'auto', paddingTop: 22, fontSize: 11, lineHeight: 1.5 }} className="text-muted">
        Driver ID and vehicle are issued by the Operations team. Contact control room 022 4890 1100 for access.
      </div>
    </form>
  );
}
