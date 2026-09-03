type P = { className?: string };

export function SpiralIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 12.5a1.6 1.6 0 1 1 1.9-1.6c0 1.9-1.9 3-3.6 3A5 5 0 0 1 5.6 9C5.6 5.6 8.5 3 12.2 3A8 8 0 0 1 20 11.2c0 4.7-3.9 8.5-8.8 8.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function StarBubbleIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M21 11.5c0 4.14-4.03 7.5-9 7.5-1 0-1.97-.14-2.87-.4L4 21l1.3-3.6C3.86 16.06 3 13.9 3 11.5 3 7.36 7.03 4 12 4s9 3.36 9 7.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M12 7.6c.35 2.2 1.06 2.9 3.2 3.3-2.14.4-2.85 1.1-3.2 3.3-.35-2.2-1.06-2.9-3.2-3.3 2.14-.4 2.85-1.1 3.2-3.3Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function OrbIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="orbg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.72 0.2 295)" />
          <stop offset="100%" stopColor="oklch(0.65 0.17 240)" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="7.5" fill="url(#orbg)" />
      <ellipse
        cx="12"
        cy="12"
        rx="11"
        ry="3.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.85"
        transform="rotate(-22 12 12)"
      />
    </svg>
  );
}
