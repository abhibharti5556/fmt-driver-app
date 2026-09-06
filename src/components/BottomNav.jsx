const icon = {
  home: <svg width="21" height="21" viewBox="0 0 24 24" style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 1.6 }}><path d="M3 10.5 12 3l9 7.5" /><path d="M5.5 9.5V21h13V9.5" /></svg>,
  pickups: <svg width="21" height="21" viewBox="0 0 24 24" style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 1.6 }}><path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5z" /><path d="M3 7.5 12 12l9-4.5M12 12v9" /></svg>,
  delivery: <svg width="21" height="21" viewBox="0 0 24 24" style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 1.6 }}><path d="M2 6h11v10H2z" /><path d="M13 9h4l4 3v4h-8z" /><circle cx="6.5" cy="18.5" r="1.8" /><circle cx="17" cy="18.5" r="1.8" /></svg>,
  route: <svg width="21" height="21" viewBox="0 0 24 24" style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 1.6 }}><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>,
  profile: <svg width="21" height="21" viewBox="0 0 24 24" style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 1.6 }}><circle cx="12" cy="8" r="3.5" /><path d="M4.5 20c1.2-4 4-6 7.5-6s6.3 2 7.5 6" /></svg>,
};

export default function BottomNav({ active, onHome, onPickups, onDeliveries, onRoute, onProfile }) {
  const tabs = [
    { key: 'home', label: 'Home', onClick: onHome },
    { key: 'pickups', label: 'Pickups', onClick: onPickups },
    { key: 'delivery', label: 'Delivery', onClick: onDeliveries },
    { key: 'route', label: 'Route', onClick: onRoute },
    { key: 'profile', label: 'Profile', onClick: onProfile },
  ];
  return (
    <div className="bottomnav">
      {tabs.map((t) => (
        <button key={t.key} type="button" className="ptab" data-on={active === t.key ? '1' : '0'} onClick={t.onClick}>
          {icon[t.key]}
          {t.label}
        </button>
      ))}
    </div>
  );
}
