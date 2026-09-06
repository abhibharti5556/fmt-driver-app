// Static seed data — mirrors the Claude Design prototype's `ships` / `baseEvents`
// tables (Final Mile Techies · India region · sample customers Cuisinart,
// Nespresso, Louis Stitch).

export const DRIVER = {
  name: 'Rakesh Yadav',
  driverId: 'FMT-DRV-042',
  vehicle: 'MH 12 KL 4482',
  vehicleType: 'Tata Ace · LCV',
  area: 'Mumbai West',
  phone: '+91 98195 77340',
  mobile: '98195 77340',
  password: 'fmt2026',
};

export const SHIPS = {
  CUI000148: {
    id: 'CUI000148', kind: 'pickup', customer: 'Cuisinart India Pvt Ltd',
    addr: 'Unit 4, Sundar Industrial Estate, Andheri East, Mumbai 400069',
    contact: 'Sameer Kulkarni', phone: '+91 98204 41123',
    boxes: 12, weight: '148 kg', appt: '05 Sep · 10:30', dist: '4.2 km',
    type: 'Palletised · 3 pallets', priority: 'Standard',
    instructions: 'Loading bay 3. Collect gate pass at the security desk before entering.',
    appointment: true,
  },
  LOU000072: {
    id: 'LOU000072', kind: 'pickup', customer: 'Louis Stitch',
    addr: 'Shop 12, Kamala Mills Compound, Lower Parel, Mumbai 400013',
    contact: 'Neha Rane', phone: '+91 98330 20876',
    boxes: 4, weight: '36 kg', appt: '05 Sep · 12:15', dist: '7.8 km',
    type: 'Cartons · fragile', priority: 'Standard',
    instructions: 'Call on arrival. Narrow lane — no truck entry after 13:00.',
    appointment: false,
  },
  NES000231: {
    id: 'NES000231', kind: 'delivery', customer: 'Nespresso India',
    addr: 'Nespresso Boutique, Galleria, Powai, Mumbai 400076',
    contact: 'Farhan Qureshi', phone: '+91 99871 55402',
    boxes: 6, weight: '72 kg', appt: '05 Sep · 14:00', dist: '3.1 km',
    type: '50–100 kg slab', priority: 'Appointment',
    instructions: 'Appointment delivery. Report at the mall service entrance, level -1.',
    appointment: true,
  },
  CUI000141: {
    id: 'CUI000141', kind: 'delivery', customer: 'Cuisinart India Pvt Ltd',
    addr: 'Cuisinart Experience Centre, Unit 9, Bandra Kurla Complex, Mumbai 400051',
    contact: 'Aarti Shah', phone: '+91 98676 21004',
    boxes: 9, weight: '104 kg', appt: '—', dist: '5.6 km',
    type: '100–150 kg slab', priority: 'Standard',
    instructions: 'Deliver to reception. Carry the BKC gate pass issued by Operations.',
    appointment: false,
  },
  LOU000065: {
    id: 'LOU000065', kind: 'delivery', customer: 'Louis Stitch',
    addr: 'Kiosk 4, Viviana Mall, Thane West 400610',
    contact: 'Rohit Pillai', phone: '+91 98211 43390',
    boxes: 2, weight: '18 kg', appt: '05 Sep · 11:00', dist: '11.4 km',
    type: '0–25 kg slab', priority: 'SLA at risk',
    instructions: 'Appointment delivery. Mall receiving closes at 11:30 sharp.',
    appointment: true,
  },
};

export const PICK_IDS = ['CUI000148', 'LOU000072'];
export const DEL_IDS = ['NES000231', 'CUI000141', 'LOU000065'];

export const BASE_EVENTS = {
  CUI000148: {
    Booked: ['05 Sep · 07:10', 'Priya Menon · Operations', 'Mumbai HO'],
    'Pickup Assigned': ['05 Sep · 07:14', 'Priya Menon · Operations', 'Auto-assign · Mumbai West'],
  },
  LOU000072: {
    Booked: ['05 Sep · 07:22', 'Louis Stitch · Customer portal', 'Lower Parel'],
    'Pickup Assigned': ['05 Sep · 07:40', 'Priya Menon · Operations', 'Mumbai West'],
  },
  CUI000141: {
    Booked: ['03 Sep · 11:20', 'Priya Menon · Operations', 'Mumbai HO'],
    'Pickup Assigned': ['03 Sep · 11:26', 'Priya Menon · Operations', 'Mumbai West'],
    'Picked Up': ['04 Sep · 09:48', 'Rakesh Yadav · FMT-DRV-042', 'Andheri East · 19.1176, 72.8697'],
    'In Transit': ['04 Sep · 10:05', 'System', 'Mumbai hub scan'],
    'Delivery Assigned': ['05 Sep · 08:30', 'Priya Menon · Operations', 'Mumbai West'],
  },
  NES000231: {
    Booked: ['04 Sep · 16:02', 'Nespresso India · Customer portal', 'Powai'],
    'Pickup Assigned': ['04 Sep · 16:20', 'Priya Menon · Operations', 'Mumbai West'],
    'Picked Up': ['04 Sep · 18:10', 'Rakesh Yadav · FMT-DRV-042', 'Chakala · 19.1103, 72.8697'],
    'In Transit': ['04 Sep · 19:00', 'System', 'Mumbai hub scan'],
    'Delivery Assigned': ['05 Sep · 08:30', 'Priya Menon · Operations', 'Appointment 14:00'],
  },
  LOU000065: {
    Booked: ['04 Sep · 10:15', 'Louis Stitch · Customer portal', 'Lower Parel'],
    'Pickup Assigned': ['04 Sep · 10:30', 'Priya Menon · Operations', 'Mumbai West'],
    'Picked Up': ['04 Sep · 15:40', 'Imran Shaikh · FMT-DRV-031', 'Lower Parel · 19.0089, 72.8296'],
    'In Transit': ['04 Sep · 17:12', 'System', 'Mumbai hub scan'],
    'Delivery Assigned': ['05 Sep · 08:31', 'Priya Menon · Operations', 'Appointment 11:00'],
  },
};

export const STAGES = [
  'Booked', 'Pickup Assigned', 'Picked Up', 'In Transit',
  'Delivery Assigned', 'Out for Delivery', 'Shipment Photo Captured',
  'POD Uploaded', 'Delivered',
];

export const STOPS = [
  { n: 1, kind: 'Pickup', id: 'CUI000148', place: 'Andheri East', dist: '4.2 km', time: '09:50', tag: 'Window' },
  { n: 2, kind: 'Delivery', id: 'LOU000065', place: 'Thane West', dist: '11.4 km', time: '11:00', tag: 'Appointment' },
  { n: 3, kind: 'Pickup', id: 'LOU000072', place: 'Lower Parel', dist: '7.8 km', time: '12:15', tag: 'Window' },
  { n: 4, kind: 'Delivery', id: 'NES000231', place: 'Powai', dist: '3.1 km', time: '14:00', tag: 'Appointment' },
  { n: 5, kind: 'Delivery', id: 'CUI000141', place: 'BKC', dist: '5.6 km', time: '15:30', tag: 'Standard' },
];

export const NOTIFS = [
  { kind: 'New pickup', title: 'CUI000148 assigned to you', body: 'Cuisinart India · Andheri East · 12 boxes · window 10:30', ago: '2 min', level: '2' },
  { kind: 'Appointment approaching', title: 'NES000231 · 14:00 at Powai', body: 'Leave BKC by 13:20 to make the appointment window.', ago: '08:15', level: '2' },
  { kind: 'Route change', title: '1 stop added to your route', body: 'LOU000072 pickup inserted at position 3. Route re-sequenced.', ago: '07:52', level: '1' },
  { kind: 'Reassignment', title: 'LOU000065 moved to you', body: 'Previously with Imran Shaikh · FMT-DRV-031.', ago: 'Yesterday', level: '0' },
  { kind: 'Missed appointment', title: 'CUI000119 marked missed', body: 'Appointment 18:00 passed without delivery. Ops has rescheduled to 08 Sep.', ago: 'Yesterday', level: '0' },
  { kind: 'Admin instruction', title: 'Carry BKC gate pass', body: 'Security at Unit 9 will not admit vehicles without the printed pass.', ago: 'Yesterday', level: '0' },
];

export const REMARK_OPTIONS = ['Delivered to reception', 'Delivered to security', 'Customer unavailable', 'Damaged package', 'Partial delivery'];

export const INITIAL_STATUS = {
  CUI000148: 'Pickup Assigned',
  LOU000072: 'Pickup Assigned',
  NES000231: 'Delivery Assigned',
  CUI000141: 'Delivery Assigned',
  LOU000065: 'Delivery Assigned',
};
