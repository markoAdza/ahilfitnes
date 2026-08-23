/**
 * Every price on the site lives here, so the Home rate card and the /pricing
 * page can never drift apart. Figures are taken from the original design.
 */

export type Plan = {
  slug: string;
  name: string;
  /** Effective monthly cost, in euros. */
  monthly: number;
  /** Total paid upfront. Null for the rolling monthly plan. */
  upfront: number | null;
  /** How the plan is billed, in plain words. */
  billing: string;
  /** Saving against the rolling monthly rate, e.g. "Save €42 a year". */
  save: string | null;
  /** Marks the plan the gym points people at. One at most. */
  recommended: boolean;
  features: string[];
};

export const plans: Plan[] = [
  {
    slug: "monthly",
    name: "Monthly",
    monthly: 49,
    upfront: null,
    billing: "Billed monthly, cancel any time",
    save: null,
    recommended: false,
    features: [
      "24-hour access to all three gyms",
      "Locker room and showers",
      "Sauna",
      "Free WiFi",
    ],
  },
  {
    slug: "6-months",
    name: "6 months",
    monthly: 42,
    upfront: 252,
    billing: "€252 paid upfront",
    save: "Save €42 over six months",
    recommended: true,
    features: [
      "Everything in Monthly",
      "Fitness assessment when you join",
      "Nutrition guide",
      "Two guest passes a month",
    ],
  },
  {
    slug: "annual",
    name: "12 months",
    monthly: 37,
    upfront: 444,
    billing: "€444 paid upfront",
    save: "Save €144 over the year",
    recommended: false,
    features: [
      "Everything in 6 months",
      "One personal training session a month",
      "Unlimited guest passes",
      "Member events",
    ],
  },
];

/** Cheapest effective monthly rate, quoted on the Home page. */
export const fromPrice = Math.min(...plans.map((plan) => plan.monthly));

export type PriceRow = {
  service: string;
  price: string;
  /** Small note under the service name — billing detail or saving. */
  note?: string;
};

export type PriceGroup = {
  title: string;
  rows: PriceRow[];
};

/**
 * The full price list, grouped.
 *
 * This replaces the old flat table plus a second "Add-ons" section that listed
 * the same twelve figures again — one grouped list is shorter to read and
 * leaves nothing to contradict itself.
 */
export const priceGroups: PriceGroup[] = [
  {
    title: "Membership",
    rows: [
      { service: "Monthly", price: "€49", note: "Rolling, cancel any time" },
      { service: "6 months", price: "€252", note: "Works out at €42 a month" },
      { service: "12 months", price: "€444", note: "Works out at €37 a month" },
      { service: "Day pass", price: "€15", note: "Walk-ins and guests" },
    ],
  },
  {
    title: "Personal training",
    rows: [
      { service: "One session", price: "€45" },
      { service: "Five sessions", price: "€200", note: "Saves €25" },
      { service: "Ten sessions", price: "€380", note: "Saves €70" },
    ],
  },
  {
    title: "Group classes",
    rows: [
      { service: "Drop-in", price: "€15" },
      { service: "Ten-class pack", price: "€120", note: "Saves €30" },
      { service: "Unlimited, per month", price: "€80" },
    ],
  },
  {
    title: "Extras",
    rows: [
      { service: "Locker rental, per month", price: "€10" },
      { service: "Towel service, per month", price: "€15" },
      { service: "Massage therapy, 60 minutes", price: "€60" },
    ],
  },
];
