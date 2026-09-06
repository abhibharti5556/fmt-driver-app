import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  DRIVER, SHIPS, PICK_IDS, DEL_IDS, BASE_EVENTS, STAGES, STOPS, NOTIFS,
  REMARK_OPTIONS, INITIAL_STATUS,
} from './data.js';

const STORAGE_KEY = 'fmt-driver-app-state-v1';

const initialState = {
  screen: 'login',
  prev: 'dash',
  activeId: 'CUI000141',
  status: INITIAL_STATUS,
  events: {},
  loaded: {},
  boxActual: 12,
  photoTaken: false,
  photoUrl: null,
  gps: null,
  gpsError: null,
  pod: null,
  podError: null,
  podUploading: false,
  podProgress: 0,
  remark: '',
  filter: 'today',
  q: '',
  toast: null,
  modal: null,
  authError: null,
  loginMobile: DRIVER.mobile,
  loginPassword: '',
  onDuty: true,
  vehicleNo: DRIVER.vehicle,
  driverPhoto: null,
};

function loadPersisted() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // Never resume mid-camera/GPS/upload transients or the password field.
    return {
      ...initialState,
      ...parsed,
      screen: parsed.screen === 'login' ? 'login' : parsed.screen,
      photoUrl: null,
      podUploading: false,
      podProgress: 0,
      toast: null,
      modal: null,
      loginPassword: '',
    };
  } catch {
    return null;
  }
}

const Ctx = createContext(null);

export function DriverAppProvider({ children }) {
  const [state, setState] = useState(() => loadPersisted() || initialState);
  const toastTimer = useRef(null);

  useEffect(() => {
    try {
      const { photoUrl, ...persistable } = state;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persistable));
    } catch {
      // storage unavailable (private mode / quota) — app still works in-memory
    }
  }, [state]);

  const patch = (p) => setState((s) => ({ ...s, ...(typeof p === 'function' ? p(s) : p) }));

  const flash = (message) => {
    clearTimeout(toastTimer.current);
    patch({ toast: message });
    toastTimer.current = setTimeout(() => patch({ toast: null }), 2600);
  };

  const stamp = (s, id, stage, when, who, where) => {
    const events = { ...s.events };
    const own = { ...(events[id] || {}) };
    own[stage] = [when, who, where];
    events[id] = own;
    return events;
  };

  const nowStamp = () => {
    const d = new Date();
    const day = String(d.getDate()).padStart(2, '0');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const time = d.toTimeString().slice(0, 5);
    return `${day} ${months[d.getMonth()]} · ${time}`;
  };

  const go = (screenName) => patch((s) => ({ screen: screenName, prev: s.screen }));
  const back = () => patch((s) => ({ screen: s.prev || 'dash' }));

  // ---- derived values (recomputed every render, same shape as the prototype) ----
  const a = useMemo(() => {
    const raw = SHIPS[state.activeId] || SHIPS.CUI000141;
    const status = state.status[raw.id] || 'Booked';
    const tagClass = status === 'Delivered' ? 'tag-neutral'
      : (status === 'Out for Delivery' || status === 'Picked Up' ? 'tag-accent' : 'tag-outline');
    return { ...raw, boxes: state.loaded[raw.id] ?? raw.boxes, status, tagClass };
  }, [state.activeId, state.status, state.loaded]);

  const isPickDone = (id) => state.status[id] === 'Picked Up' || state.status[id] === 'In Transit';
  const pickDoneCount = PICK_IDS.filter(isPickDone).length;
  const delDoneCount = DEL_IDS.filter((id) => state.status[id] === 'Delivered').length;

  const q = state.q.toLowerCase();
  const matches = (sh) => !q || (`${sh.id} ${sh.customer} ${sh.addr}`).toLowerCase().includes(q);
  const inFilter = (id, done) => {
    if (state.filter === 'done') return done;
    if (state.filter === 'pending') return !done;
    if (state.filter === 'appt') return SHIPS[id].appointment;
    return true;
  };
  const toCard = (id) => {
    const sh = SHIPS[id];
    const st = state.status[id];
    return {
      ...sh,
      boxes: state.loaded[id] ?? sh.boxes,
      status: st,
      tagClass: st === 'Delivered' ? 'tag-neutral' : (st === 'Picked Up' || st === 'Out for Delivery' ? 'tag-accent' : 'tag-outline'),
      apptFlag: sh.appointment ? '1' : '0',
    };
  };
  const pickCards = PICK_IDS.filter((id) => matches(SHIPS[id]) && inFilter(id, isPickDone(id))).map(toCard);
  const delCards = DEL_IDS.filter((id) => matches(SHIPS[id]) && inFilter(id, state.status[id] === 'Delivered')).map(toCard);

  const ev = { ...(BASE_EVENTS[a.id] || {}), ...(state.events[a.id] || {}) };
  const timeline = STAGES.filter((st) => st !== 'Delivery Assigned' || ev['Delivery Assigned']).map((st) => {
    const e = ev[st];
    return { title: st, when: e ? e[0] : 'Pending', who: e ? e[1] : '—', where: e ? e[2] : '—', done: !!e };
  });

  const podName = state.pod ? state.pod.name : `POD_${a.id}.jpg`;

  const requestGps = () => {
    patch({ gpsError: null, gps: null });
    if (!('geolocation' in navigator)) {
      patch({ gpsError: 'Geolocation is not supported on this device.' });
      return;
    }
    let settled = false;
    // Some embedded/sandboxed viewers (e.g. a preview iframe with no
    // geolocation permission delegated) never invoke either callback at
    // all — getCurrentPosition's own `timeout` option only bounds a
    // request that the platform actually started. Without this fallback
    // the GPS step can hang forever with no visible error.
    const hangGuard = setTimeout(() => {
      if (settled) return;
      settled = true;
      patch({ gpsError: 'Location did not respond — this browser/preview may be blocking GPS access.' });
    }, 6000);
    try {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          if (settled) return;
          settled = true;
          clearTimeout(hangGuard);
          patch({ gps: { lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy }, gpsError: null });
        },
        (err) => {
          if (settled) return;
          settled = true;
          clearTimeout(hangGuard);
          patch({ gpsError: err.message || 'Location permission is required to capture GPS information.' });
        },
        { enableHighAccuracy: true, timeout: 5500 },
      );
    } catch {
      if (!settled) {
        settled = true;
        clearTimeout(hangGuard);
        patch({ gpsError: 'Location access is blocked in this browser/preview.' });
      }
    }
  };

  // ---- actions ----
  const actions = useMemo(() => ({
    openShipment: (id) => {
      const sh = SHIPS[id];
      patch((s) => ({
        activeId: id,
        prev: sh.kind === 'pickup' ? 'pickups' : 'deliveries',
        screen: sh.kind === 'pickup' ? 'pickupDetail' : 'deliveryDetail',
        boxActual: s.loaded[id] ?? sh.boxes,
        remark: '',
      }));
    },
    attemptLogin: (mobile, password) => {
      if (!mobile.trim() || !password.trim()) {
        patch({ authError: 'Enter your mobile number and password.' });
        return;
      }
      const normalizedMobile = mobile.replace(/\s+/g, '');
      if (normalizedMobile !== DRIVER.mobile.replace(/\s+/g, '') || password !== DRIVER.password) {
        patch({ authError: 'Incorrect mobile number or password. Contact the control room if you are locked out.' });
        return;
      }
      patch({ authError: null, screen: 'dash', prev: 'dash' });
    },
    setLoginMobile: (v) => patch({ loginMobile: v, authError: null }),
    setLoginPassword: (v) => patch({ loginPassword: v, authError: null }),
    logout: () => patch({ screen: 'login', loginPassword: '' }),
    toggleDuty: () => patch((s) => {
      const next = !s.onDuty;
      flash(next ? 'You are on duty' : 'You are off duty');
      return { onDuty: next };
    }),
    setVehicleNo: (v) => patch({ vehicleNo: v }),
    setDriverPhoto: (dataUrl) => patch({ driverPhoto: dataUrl }),
    goDash: () => go('dash'),
    goRoute: () => go('route'),
    goPickups: () => patch({ screen: 'pickups', prev: 'dash', filter: 'today' }),
    goDeliveries: () => patch({ screen: 'deliveries', prev: 'dash', filter: 'today' }),
    goProfile: () => go('profile'),
    goNotifs: () => go('notifs'),
    goTimeline: () => go('timeline'),
    back,
    setQ: (v) => patch({ q: v }),
    setFilter: (f) => patch({ filter: f }),
    startRoute: () => { flash('Route started · navigating to stop 1'); go('route'); },
    navigate: () => {
      const dest = encodeURIComponent(a.addr);
      let opened = null;
      try {
        opened = window.open(`https://www.google.com/maps/dir/?api=1&destination=${dest}`, '_blank', 'noopener');
      } catch {
        opened = null;
      }
      // A sandboxed preview silently blocks the popup (window.open returns
      // null/undefined) instead of throwing — always surface the address
      // in-app too, so the action is never a dead end.
      flash(opened ? `Opening Google Maps · ${a.addr}` : `Maps blocked here · destination: ${a.addr}`);
    },
    // Deliberately does NOT set window.location.href itself: on some hosts
    // (embedded/sandboxed previews included) assigning location.href to an
    // unregistered scheme like tel: leaves the page in a pending-navigation
    // state that silently swallows the *next* click. The Call control is a
    // real <a href="tel:..."> anchor instead — this only fires as a toast
    // alongside that native, browser-handled navigation.
    call: () => flash(`Calling ${a.contact} · ${a.phone}`),
    startPickup: () => patch((s) => ({ screen: 'box', prev: 'pickupDetail', boxActual: s.loaded[a.id] ?? a.boxes, remark: '' })),
    goStickers: () => go('stickers'),
    incBox: () => patch((s) => ({ boxActual: s.boxActual + 1 })),
    decBox: () => patch((s) => ({ boxActual: Math.max(0, s.boxActual - 1) })),
    setBox: (v) => patch({ boxActual: Math.max(0, parseInt(v, 10) || 0) }),
    setRemark: (v) => patch({ remark: v }),
    confirmPickup: () => {
      patch((s) => {
        const status = { ...s.status, [a.id]: 'Picked Up' };
        const loaded = { ...s.loaded, [a.id]: s.boxActual };
        return {
          status, loaded,
          events: stamp(s, a.id, 'Picked Up', nowStamp(), `${DRIVER.name} · ${DRIVER.driverId}`, 'Andheri East · 19.1176, 72.8697'),
          screen: 'pickupDone', prev: 'pickups',
        };
      });
      flash('Status → Picked Up · activity logged');
    },
    askStartDelivery: () => patch({ modal: 'ofd' }),
    closeModal: () => patch({ modal: null }),
    confirmOfd: () => {
      patch((s) => ({
        modal: null,
        status: { ...s.status, [a.id]: 'Out for Delivery' },
        events: stamp(s, a.id, 'Out for Delivery', nowStamp(), `${DRIVER.name} · ${DRIVER.driverId}`, '19.1176, 72.8697'),
        screen: 'ofd', prev: 'deliveryDetail',
        photoTaken: false, photoUrl: null, pod: null, podError: null, remark: '',
      }));
    },
    goPhoto: () => go('photo'),
    capturePhoto: (file) => {
      const url = URL.createObjectURL(file);
      patch((s) => ({
        photoTaken: true,
        photoUrl: url,
        events: stamp(s, a.id, 'Shipment Photo Captured', nowStamp(), `${DRIVER.name} · ${DRIVER.driverId}`, s.gps ? `${s.gps.lat.toFixed(4)}, ${s.gps.lng.toFixed(4)} · ±${Math.round(s.gps.accuracy)} m` : 'GPS pending'),
      }));
    },
    retakePhoto: () => patch({ photoTaken: false, photoUrl: null }),
    goGps: () => { patch({ screen: 'gps', prev: 'photo' }); requestGps(); },
    gpsRetry: () => requestGps(),
    goPod: () => patch({ screen: 'pod', prev: 'gps', podError: null, podUploading: false, podProgress: 0 }),
    uploadPod: (file) => {
      const okType = ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type);
      if (!okType) {
        patch({ podError: 'type' });
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        patch({ podError: 'upload' });
        return;
      }
      patch({ podUploading: true, podProgress: 0, podError: null });
      const willFail = Math.random() < 0.12;
      let pct = 0;
      const timer = setInterval(() => {
        pct += 18 + Math.random() * 12;
        if (pct >= (willFail ? 62 : 100)) {
          clearInterval(timer);
          if (willFail) {
            patch({ podUploading: false, podProgress: 62, podError: 'upload' });
          } else {
            patch({
              podUploading: false, podProgress: 100, podError: null,
              pod: { name: file.name, size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`, type: file.type.split('/')[1].toUpperCase() },
              screen: 'podPreview', prev: 'pod',
            });
          }
        } else {
          patch({ podProgress: Math.min(pct, 100) });
        }
      }, 220);
    },
    podReplace: () => patch({ screen: 'pod', prev: 'gps', pod: null }),
    podDelete: () => { patch({ screen: 'pod', prev: 'gps', pod: null }); flash('POD removed'); },
    goRemarks: () => patch((s) => ({
      screen: 'remarks', prev: 'podPreview',
      events: stamp(s, a.id, 'POD Uploaded', nowStamp(), `${DRIVER.name} · ${DRIVER.driverId}`, podName),
    })),
    pickRemarkPreset: (label) => patch((s) => ({ remark: s.remark === label ? '' : label })),
    completeDelivery: () => {
      patch((s) => ({
        status: { ...s.status, [a.id]: 'Delivered' },
        events: stamp(s, a.id, 'Delivered', nowStamp(), 'System · POD validated', s.gps ? `${s.gps.lat.toFixed(4)}, ${s.gps.lng.toFixed(4)}` : '—'),
        screen: 'delivered', prev: 'deliveries',
      }));
      flash('Shipment delivered · dashboards updated');
    },
  }), [a.id, a.addr, a.phone, a.contact, a.boxes, podName]);

  const value = {
    state, a, actions,
    driver: DRIVER,
    pickIds: PICK_IDS, delIds: DEL_IDS,
    pickDoneCount, delDoneCount, pickCards, delCards,
    timeline, stops: STOPS, notifs: NOTIFS, remarkOptions: REMARK_OPTIONS,
    podName,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useDriverApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useDriverApp must be used within DriverAppProvider');
  return ctx;
}
