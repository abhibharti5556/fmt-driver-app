import { useDriverApp } from '../../state/store.jsx';
import PrintPortal from '../PrintPortal.jsx';

function StickerCard({ n, total, a }) {
  return (
    <div className="sticker">
      <div className="sticker-inner">
        <div className="sticker-brand">FINAL MILE TECHIES</div>
        <div className="sticker-docket">{a.id}</div>
        <div className="sticker-row">
          <span className="sticker-count">{n}/{total}</span>
          <span className="sticker-customer">{a.customer}</span>
        </div>
      </div>
    </div>
  );
}

export default function StickersScreen() {
  const { a, state, actions } = useDriverApp();
  const total = Math.max(1, state.boxActual);
  const boxes = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="pbody screen">
      <div className="text-muted" style={{ fontSize: 11.5 }}>{a.id} · {a.customer}</div>
      <h4 style={{ margin: '5px 0 4px' }}>Box stickers</h4>
      <p className="text-muted" style={{ fontSize: 12.5, margin: '0 0 14px' }}>
        {total} sticker{total === 1 ? '' : 's'} · 2 × 1 in each · one box, one sticker
      </p>
      <button type="button" className="btn btn-primary btn-block" style={{ minHeight: 48, marginBottom: 8 }} onClick={() => window.print()}>
        Print all {total} sticker{total === 1 ? '' : 's'}
        <svg width="16" height="16" viewBox="0 0 24 24" style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, marginLeft: 'auto' }}>
          <path d="M6 9V3h12v6" /><rect x="6" y="13" width="12" height="8" /><path d="M6 17H3v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6h-3" />
        </svg>
      </button>
      <p className="text-muted" style={{ fontSize: 11, margin: '0 0 16px' }}>
        Opens your browser's print dialog — pick your label printer, page size is set automatically to 2 × 1 in.
      </p>
      <div className="kicker">Preview</div>

      <div className="sticker-sheet">
        {boxes.map((n) => <StickerCard key={n} n={n} total={total} a={a} />)}
      </div>

      <div style={{ height: 20 }} />
      <button type="button" className="btn btn-secondary btn-block" style={{ marginBottom: 22 }} onClick={actions.back}>Back to box count</button>

      <PrintPortal>
        {boxes.map((n) => <StickerCard key={n} n={n} total={total} a={a} />)}
      </PrintPortal>
    </div>
  );
}
