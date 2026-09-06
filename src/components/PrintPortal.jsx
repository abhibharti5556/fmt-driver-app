import { createPortal } from 'react-dom';

// Renders straight onto <body>, outside the phone frame's DOM entirely.
// Printing from inside a fixed-size, overflow:hidden phone mockup is
// unreliable (the ancestor's box confuses pagination) — a real print
// target needs to be a plain sibling of #root with nothing else assumed.
export default function PrintPortal({ children }) {
  return createPortal(<div id="print-root">{children}</div>, document.body);
}
