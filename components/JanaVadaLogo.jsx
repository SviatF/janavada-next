export default function JanaVadaLogo({ size = 34, theme = 'dark', showNews = true, lang = 'en' }) {
  const jana = theme === 'light' ? '#FFFFFF' : '#111827';
  const vada = theme === 'light' ? '#93C5FD' : '#1E3A8A';
  const muted = theme === 'light' ? 'rgba(255,255,255,.5)' : '#9CA3AF';

  return (
    <span className="inline-flex flex-col leading-none">
      <span className="font-logo" style={{ fontSize: size, letterSpacing: '.01em' }}>
        <span style={{ color: jana, fontWeight: 600 }}>JANA</span>
        <span style={{ color: vada, fontWeight: 600 }}>VADA</span>
      </span>
      {showNews && (
        <span
          className="font-body uppercase"
          style={{
            fontSize: size * .24,
            letterSpacing: '.22em',
            color: muted,
            fontWeight: 500,
            marginTop: size * .12,
          }}
        >
          {lang === 'hi' ? 'समाचार' : 'NEWS'}
        </span>
      )}
    </span>
  );
}
