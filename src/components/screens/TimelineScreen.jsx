import { useDriverApp } from '../../state/store.jsx';

export default function TimelineScreen() {
  const { a, timeline } = useDriverApp();
  return (
    <div className="pbody screen">
      <div className="row-between">
        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 19 }}>{a.id}</span>
        <span className={`tag ${a.tagClass}`}>{a.status}</span>
      </div>
      <div className="text-muted" style={{ fontSize: 12, marginTop: 3 }}>{a.customer} · {a.boxes} boxes · {a.weight}</div>
      <hr className="hr" />
      {timeline.map((e, i) => (
        <div key={e.title} style={{ display: 'flex', gap: 12 }}>
          <div style={{ width: 12, flex: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className="tldot" data-done={e.done ? '1' : '0'} />
            {i < timeline.length - 1 && <span style={{ flex: 1, width: 1, background: 'var(--color-border)' }} />}
          </div>
          <div style={{ flex: 1, paddingBottom: 16, minWidth: 0 }}>
            <div className="tltitle" data-done={e.done ? '1' : '0'}>{e.title}</div>
            <div className="text-muted" style={{ fontSize: 11.5, lineHeight: 1.5 }}>{e.when}<br />{e.who}<br />{e.where}</div>
          </div>
        </div>
      ))}
      <div style={{ height: 8 }} />
    </div>
  );
}
