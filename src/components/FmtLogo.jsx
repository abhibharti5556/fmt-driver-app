import fmtLogoUrl from '../assets/fmt-logo.png';

// The real Final Mile Techies logo, supplied by the company.
export default function FmtLogo({ height = 88 }) {
  return (
    <img
      src={fmtLogoUrl}
      alt="Final Mile Techies"
      height={height}
      style={{ height, width: 'auto', display: 'block', flexShrink: 0, alignSelf: 'flex-start' }}
    />
  );
}
