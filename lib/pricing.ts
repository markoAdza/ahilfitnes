/**
 * Every price on the site lives here, so the Home teaser, the /pricing plan
 * cards, the Complete Price List table and the Add-ons grid can never drift
 * apart. Figures are taken verbatim from the original design.
 */

export type Plan = {
  slug: string;
  name: string;
  /** Effective monthly cost, in euros. */
  monthly: number;
  /** Total paid upfront, shown under the price. Null for the rolling plan. */
  upfront: number | null;
  /** Discount badge text, e.g. "SAVE 15%". */
  save: string | null;
  popular: boolean;
  features: string[];
};

export const plans: Plan[] = [
  {
    slug: "monthly",
    name: "Monthly",
    monthly: 49,
    upfront: null,
    save: null,
    popular: false,
    features: [
      "24/7 Access to All Locations",
      "Unlimited Gym Access",
      "Free WiFi",
      "Locker Room Access",
      "Shower Facilities",
    ],
  },
  {
    slug: "6-months",
    name: "6 Months",
    monthly: 42,
    upfront: 252,
    save: "SAVE 15%",
    popular: true,
    features: [
      "Everything in Monthly",
      "Priority Equipment Access",
      "Free Fitness Assessment",
      "Nutrition Guide",
      "Guest Pass (2x/month)",
    ],
  },
  {
    slug: "annual",
    name: "Annual",
    monthly: 37,
    upfront: 444,
    save: "SAVE 25%",
    popular: false,
    features: [
      "Everything in 6 Months",
      "Personal Training Session (1x/month)",
      "Unlimited Guest Passes",
      "Free Merchandise",
      "VIP Member Events",
    ],
  },
];

export type PriceRow = {
  service: string;
  price: string;
  /** Memberships are emphasised in the table, add-ons are not. */
  emphasis?: boolean;
};

export const priceList: PriceRow[] = [
  { service: "Monthly Membership", price: "€49/month", emphasis: true },
  { service: "6-Month Membership", price: "€252 (€42/month)", emphasis: true },
  { service: "Annual Membership", price: "€444 (€37/month)", emphasis: true },
  { service: "Personal Training (1 Session)", price: "€45" },
  { service: "Personal Training (5 Sessions)", price: "€200" },
  { service: "Personal Training (10 Sessions)", price: "€380" },
  { service: "Group Class Drop-in", price: "€15" },
  { service: "Group Class 10-Pack", price: "€120" },
  { service: "Unlimited Group Classes (Monthly)", price: "€80" },
  { service: "Locker Rental (Monthly)", price: "€10" },
  { service: "Towel Service (Monthly)", price: "€15" },
  { service: "Massage Therapy (60min)", price: "€60" },
];

export type AddOn = {
  label: string;
  price: string;
  /** Optional savings note rendered in coral beneath the label. */
  save?: string;
};

export type AddOnGroup = {
  title: string;
  items: AddOn[];
};

export const addOnGroups: AddOnGroup[] = [
  {
    title: "Personal Training",
    items: [
      { label: "1 Session", price: "€45" },
      { label: "5 Sessions", price: "€200", save: "Save €25" },
      { label: "10 Sessions", price: "€380", save: "Save €70" },
    ],
  },
  {
    title: "Group Classes",
    items: [
      { label: "Drop-in", price: "€15" },
      { label: "10 Class Pack", price: "€120", save: "Save €30" },
      { label: "Unlimited Monthly", price: "€80" },
    ],
  },
  {
    title: "Additional Services",
    items: [
      { label: "Locker Rental (Monthly)", price: "€10" },
      { label: "Towel Service (Monthly)", price: "€15" },
      { label: "Massage Therapy (60min)", price: "€60" },
    ],
  },
];
