/**
 * Equipment catalogue - 16 items, 4 per category, so every filter on
 * /equipment renders a full row rather than a sparse one.
 *
 * The Cardio entries and the Strength names/blurbs come from the original
 * design; Functional and Recovery are written to match the same voice.
 */

export const categories = ["Cardio", "Strength", "Functional", "Recovery"] as const;
export type Category = (typeof categories)[number];

export type EquipmentItem = {
  slug: string;
  name: string;
  category: Category;
  blurb: string;
  specs: string[];
};

export const equipment: EquipmentItem[] = [
  // ---------------------------------------------------------------- Cardio
  {
    slug: "treadmills",
    name: "Treadmills",
    category: "Cardio",
    blurb:
      "Professional-grade treadmills with advanced cushioning and incline features",
    specs: [
      "12 units across all locations",
      "Incline up to 15%, decline to -3%",
      "Shock-absorbing deck reduces joint impact",
      "Built-in heart-rate and programme tracking",
    ],
  },
  {
    slug: "elliptical-trainers",
    name: "Elliptical trainers",
    category: "Cardio",
    blurb: "Low-impact cardio machines for full-body workouts",
    specs: [
      "Front and rear-drive models available",
      "20 levels of magnetic resistance",
      "Moving handlebars engage the upper body",
      "Ideal for joint-friendly conditioning",
    ],
  },
  {
    slug: "rowing-machines",
    name: "Rowing machines",
    category: "Cardio",
    blurb: "Water and air resistance rowers for complete cardio training",
    specs: [
      "Both air and water resistance models",
      "Works 86% of your muscle mass",
      "Live split, pace and watt readouts",
      "Interval programmes preloaded",
    ],
  },
  {
    slug: "stationary-bikes",
    name: "Stationary bikes",
    category: "Cardio",
    blurb: "Upright and recumbent bikes with digital tracking",
    specs: [
      "Upright, recumbent and spin options",
      "Magnetic resistance, near-silent",
      "Fully adjustable seat and bar height",
      "Watt, cadence and calorie display",
    ],
  },

  // -------------------------------------------------------------- Strength
  {
    slug: "free-weights",
    name: "Free weights",
    category: "Strength",
    blurb: "Full dumbbell and plate range for every level of lifter",
    specs: [
      "Dumbbells from 2 kg to 60 kg",
      "Olympic bars and bumper plates",
      "Adjustable benches at every rack",
      "Dedicated lifting platform",
    ],
  },
  {
    slug: "cable-machines",
    name: "Cable machines",
    category: "Strength",
    blurb: "Dual-adjustable pulleys for unlimited movement variety",
    specs: [
      "Dual adjustable pulley stations",
      "Full attachment library on site",
      "Smooth 2:1 ratio weight stacks",
      "Cross-over and functional set-ups",
    ],
  },
  {
    slug: "smith-machine",
    name: "Smith machine",
    category: "Strength",
    blurb: "Guided barbell work with safety catches at every height",
    specs: [
      "Linear bearing guided bar path",
      "Multi-position safety catches",
      "Train heavy without a spotter",
      "Squat, press and shrug ready",
    ],
  },
  {
    slug: "leg-press",
    name: "Leg press",
    category: "Strength",
    blurb: "Plate-loaded leg press and hack squat for lower-body power",
    specs: [
      "45-degree plate-loaded press",
      "Takes loads beyond 400 kg",
      "Adjustable back pad and foot plate",
      "Hack squat conversion available",
    ],
  },

  // ------------------------------------------------------------ Functional
  {
    slug: "kettlebells",
    name: "Kettlebells",
    category: "Functional",
    blurb: "Competition-grade bells for swings, cleans and carries",
    specs: [
      "4 kg to 48 kg in even steps",
      "Uniform competition dimensions",
      "Open turf area for swings",
      "Powder-coated grip finish",
    ],
  },
  {
    slug: "battle-ropes",
    name: "Battle ropes",
    category: "Functional",
    blurb: "High-intensity conditioning ropes with anchored stations",
    specs: [
      "15 m heavy-duty ropes",
      "Floor-anchored stations",
      "Built for HIIT finishers",
      "Two stations per location",
    ],
  },
  {
    slug: "plyo-boxes",
    name: "Plyo boxes",
    category: "Functional",
    blurb: "Soft and wooden boxes for explosive jump training",
    specs: [
      "Heights from 30 cm to 75 cm",
      "Soft-foam and timber options",
      "Non-slip landing surface",
      "Stackable for custom heights",
    ],
  },
  {
    slug: "suspension-trainers",
    name: "TRX suspension trainers",
    category: "Functional",
    blurb: "Bodyweight suspension training for core and stability",
    specs: [
      "Ceiling-mounted anchor points",
      "Scales from beginner to advanced",
      "Core, pull and mobility work",
      "Rig space for four users",
    ],
  },

  // -------------------------------------------------------------- Recovery
  {
    slug: "foam-rolling",
    name: "Foam rolling zone",
    category: "Recovery",
    blurb: "Rollers, balls and bands for self-myofascial release",
    specs: [
      "Smooth and textured rollers",
      "Lacrosse and peanut balls",
      "Resistance bands in all strengths",
      "Guided routines posted on the wall",
    ],
  },
  {
    slug: "stretching-area",
    name: "Stretching area",
    category: "Recovery",
    blurb: "Matted open floor for mobility and cool-down work",
    specs: [
      "Cushioned matted flooring",
      "Full-length mirrors",
      "Mobility rig with bands",
      "Quiet zone away from the racks",
    ],
  },
  {
    slug: "massage-room",
    name: "Massage room",
    category: "Recovery",
    blurb: "Private sports-massage room with certified therapists",
    specs: [
      "Certified sports therapists",
      "60-minute sessions available",
      "Bookable in Hrastnik and Sevnica",
      "Reserve at reception or by phone",
    ],
  },
  {
    slug: "sauna",
    name: "Sauna",
    category: "Recovery",
    blurb: "Finnish sauna to unwind and speed up recovery",
    specs: [
      "Traditional Finnish dry heat",
      "Included with every membership",
      "Towel service available as an add-on",
      "Next to the shower facilities",
    ],
  },
];

/** The four category cards in the Home page bento grid. */
export const categoryShowcase: {
  category: Category;
  image: string;
  focus: string;
  highlights: string[];
}[] = [
  {
    category: "Cardio",
    image: "/images/cardio.jpg",
    focus: "center",
    highlights: [
      "Treadmills",
      "Elliptical trainers",
      "Rowing machines",
      "Stationary bikes",
    ],
  },
  {
    category: "Strength",
    image: "/images/strength.jpg",
    focus: "center",
    highlights: ["Free weights", "Cable machines", "Smith machine", "Leg press"],
  },
  {
    category: "Functional",
    image: "/images/hrastnik.jpg",
    focus: "center",
    highlights: ["Kettlebells", "Battle ropes", "Plyo boxes", "TRX suspension trainers"],
  },
  {
    category: "Recovery",
    image: "/images/sevnica.jpg",
    focus: "right",
    highlights: ["Foam rolling zone", "Stretching area", "Massage room", "Sauna"],
  },
];
