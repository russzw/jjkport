

export default function CursedSeals({ theme }: { theme: 'gojo' | 'sukuna' }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
      {/* Top Left Seal */}
      <svg
        className="absolute -top-20 -left-20 w-80 h-80 text-accent animate-[spin_20s_linear_infinite]"
        viewBox="0 0 200 200"
      >
        <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" />
        <path d="M100 10 L100 190 M10 100 L190 100" stroke="currentColor" strokeWidth="0.5" />
        <rect x="50" y="50" width="100" height="100" fill="none" stroke="currentColor" strokeWidth="0.5" transform="rotate(45 100 100)" />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="currentColor" fontSize="10" className="font-display">
          {theme === 'sukuna' ? 'MALEVOLENT' : 'INFINITE'}
        </text>
      </svg>

      {/* Bottom Right Seal */}
      <svg
        className="absolute -bottom-20 -right-20 w-96 h-96 text-secondary animate-[spin_25s_linear_infinite_reverse]"
        viewBox="0 0 200 200"
      >
        <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M40 40 L160 160 M160 40 L40 160" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="currentColor" fontSize="8" className="font-heading uppercase tracking-widest">
          {theme === 'sukuna' ? 'SHRINE' : 'VOID'}
        </text>
      </svg>
    </div>
  );
}
