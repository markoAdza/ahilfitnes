import type { SVGProps } from "react";
import type { IconName } from "@/lib/equipment";

/**
 * Line-icon set for the equipment catalogue. One glyph per item so the
 * design-led cards on /equipment stay visually distinct without photography.
 */
const paths: Record<IconName, React.ReactNode> = {
  treadmill: (
    <>
      <path d="M2 18h12l5-11" />
      <path d="M17 7h4" />
      <path d="M4 18v2M14 18v2" />
      <path d="M6 15h6" />
    </>
  ),
  elliptical: (
    <>
      <ellipse cx="9" cy="17" rx="7" ry="2.5" transform="rotate(-10 9 17)" />
      <path d="M17 19V5" />
      <path d="M13 5h8" />
      <path d="m11 15 6-4" />
    </>
  ),
  rower: (
    <>
      <path d="M3 17h18" />
      <path d="M6 17v-3l6-2" />
      <path d="M18 8v6" />
      <path d="M15 11h6" />
      <circle cx="18" cy="6" r="2" />
    </>
  ),
  bike: (
    <>
      <circle cx="7" cy="17" r="4" />
      <path d="M7 13V6" />
      <path d="M4 6h6" />
      <path d="M11 17h6" />
      <path d="M17 17v-5" />
      <path d="M15 12h4" />
    </>
  ),
  dumbbell: (
    <>
      <path d="M7 8v8M4 10v4M17 8v8M20 10v4" />
      <path d="M7 12h10" />
    </>
  ),
  cable: (
    <>
      <path d="M4 3v18" />
      <path d="M2 21h5" />
      <path d="M4 3h10" />
      <path d="M14 3v7" />
      <path d="M10 10h8" />
    </>
  ),
  barbell: (
    <>
      <path d="M2 12h20" />
      <path d="M6 7v10M9 9v6M15 9v6M18 7v10" />
    </>
  ),
  legpress: (
    <>
      <path d="M3 20h8" />
      <path d="M4 20v-6h5" />
      <path d="m9 15 6-5" />
      <path d="M13 7l5 5-2 2-5-5z" />
    </>
  ),
  kettlebell: (
    <>
      <path d="M9 8a3 3 0 0 1 6 0" />
      <path d="M9.5 8C7 9.5 6 12 6 14a6 6 0 0 0 12 0c0-2-1-4.5-3.5-6" />
    </>
  ),
  rope: (
    <>
      <path d="M3 8c3 0 3 4 6 4s3-4 6-4 3 4 6 4" />
      <path d="M3 15c3 0 3 4 6 4s3-4 6-4 3 4 6 4" />
    </>
  ),
  box: (
    <>
      <path d="M4 9l8-4 8 4-8 4-8-4Z" />
      <path d="M4 9v6l8 4 8-4V9" />
      <path d="M12 13v6" />
    </>
  ),
  trx: (
    <>
      <path d="M4 3h16" />
      <path d="M12 3v4" />
      <path d="M12 7 7 12" />
      <path d="m12 7 5 5" />
      <rect x="4" y="12" width="5" height="3" rx="1" />
      <rect x="15" y="12" width="5" height="3" rx="1" />
    </>
  ),
  foamroller: (
    <>
      <ellipse cx="6" cy="12" rx="2.5" ry="6" />
      <path d="M6 6h12" />
      <path d="M6 18h12" />
      <ellipse cx="18" cy="12" rx="2.5" ry="6" />
    </>
  ),
  stretch: (
    <>
      <circle cx="9" cy="5" r="2" />
      <path d="M9 7v5l-4 8" />
      <path d="M9 12h6l4-4" />
      <path d="M9 12l3 8" />
    </>
  ),
  massage: (
    <>
      <path d="M3 15h18" />
      <path d="M5 15v4M19 15v4" />
      <path d="M6 12c2-3 5-4 8-4s3 2 3 4" />
      <path d="M9 8V6" />
    </>
  ),
  sauna: (
    <>
      <path d="M4 20h16" />
      <path d="M6 20v-5h12v5" />
      <path d="M9 11c0-2 2-2 2-4s-2-2-2-4" />
      <path d="M15 11c0-2 2-2 2-4s-2-2-2-4" />
    </>
  ),
};

export function EquipmentIcon({
  name,
  ...props
}: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
