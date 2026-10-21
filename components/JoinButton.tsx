import type { ReactNode } from "react";

import { ButtonLink } from "@/components/ui/Button";

/**
 * Vsak poziv "Pridruži se" na strani.
 *
 * Izriše se kot navadna povezava na `#vpis` (kontaktni blok v nogi, ki je na
 * vsaki strani), zato deluje tudi brez JavaScripta. Ko se JS naloži, `JoinDialog`
 * prestreže klik na katerikoli `[data-join]` in namesto skoka odpre dialog —
 * gumbu tako ni treba biti odjemalska komponenta.
 *
 * `pass` je ime karte, ki jo dialog vpiše v zadevo e-pošte ("Vpis – Mesečna
 * karta"), da obiskovalcu ni treba pisati, kaj želi.
 */
export function JoinButton({
  pass,
  variant = "primary",
  size = "lg",
  className,
  children = "Pridruži se",
}: {
  pass?: string;
  variant?: "primary" | "outline" | "outlineLight";
  size?: "md" | "lg";
  className?: string;
  children?: ReactNode;
}) {
  return (
    <ButtonLink
      href="#vpis"
      variant={variant}
      size={size}
      className={className}
      data-join=""
      data-join-pass={pass}
    >
      {children}
    </ButtonLink>
  );
}
