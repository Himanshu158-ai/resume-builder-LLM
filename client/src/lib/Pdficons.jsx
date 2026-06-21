import { Svg, Path, Circle, Rect, Polyline, Line } from '@react-pdf/renderer';

// Lucide icon paths adapted for react-pdf's <Svg>/<Path> components.
// Lucide icons use a 24x24 viewBox with stroke-based paths (strokeWidth ~2).
// react-pdf supports stroke/fill props directly on <Path>, <Circle>, etc.

const ICON_SIZE = 10; // default render size in pt, adjust per use

export const PhoneIcon = ({ size = ICON_SIZE, color = '#000000' }) => (
  <Svg viewBox="0 0 24 24" width={size} height={size}>
    <Path
      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
      stroke={color}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const MailIcon = ({ size = ICON_SIZE, color = '#000000' }) => (
  <Svg viewBox="0 0 24 24" width={size} height={size}>
    <Rect x="2" y="4" width="20" height="16" rx="2" stroke={color} strokeWidth={2} fill="none" />
    <Polyline points="22,6 12,13 2,6" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const LinkedinIcon = ({ size = ICON_SIZE, color = '#000000' }) => (
  <Svg viewBox="0 0 24 24" width={size} height={size}>
    <Path
      d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
      stroke={color}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Rect x="2" y="9" width="4" height="12" stroke={color} strokeWidth={2} fill="none" />
    <Circle cx="4" cy="4" r="2" stroke={color} strokeWidth={2} fill="none" />
  </Svg>
);

export const GithubIcon = ({ size = ICON_SIZE, color = '#000000' }) => (
  <Svg viewBox="0 0 24 24" width={size} height={size}>
    <Path
      d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"
      stroke={color}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const MapPinIcon = ({ size = ICON_SIZE, color = '#000000' }) => (
  <Svg viewBox="0 0 24 24" width={size} height={size}>
    <Path
      d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"
      stroke={color}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="12" cy="10" r="3" stroke={color} strokeWidth={2} fill="none" />
  </Svg>
);