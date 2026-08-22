/**
 * FAQ content. The first two entries are the ones visible in the original
 * design; the rest are written to agree with lib/pricing.ts and lib/site.ts
 * so nothing on the site contradicts anything else.
 */

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqs: FaqItem[] = [
  {
    question: "What are your operating hours?",
    answer:
      "We're open 24/7, 365 days a year at all three locations (Hrastnik, Zagorje, and Sevnica). Your membership gives you round-the-clock access to any of our facilities, so you can work out whenever it fits your schedule.",
  },
  {
    question: "Do I need to book equipment in advance?",
    answer:
      "No booking is required for any of our gym equipment — simply turn up and train. The only things worth reserving ahead are personal training sessions and massage therapy, which you can arrange at reception or over the phone.",
  },
  {
    question: "Can I use all three locations with one membership?",
    answer:
      "Yes. Every membership includes unlimited 24/7 access to Hrastnik, Zagorje and Sevnica at no extra cost. Train near home during the week and near work on your way back — it's all the same card.",
  },
  {
    question: "Is there a joining fee or a long-term contract?",
    answer:
      "There is no joining fee and no hidden extras. The Monthly plan at €49 rolls month to month with no minimum term, while the 6-Month (€252) and Annual (€444) plans are paid upfront in exchange for a lower effective monthly rate.",
  },
  {
    question: "Can I freeze or cancel my membership?",
    answer:
      "Monthly members can cancel at any time before their next billing date — no notice period, no cancellation fee. Members on the 6-Month and Annual plans can freeze their membership for up to two months per term for medical reasons or extended travel; just let the team know.",
  },
  {
    question: "Do you offer guest passes?",
    answer:
      "Yes. The 6-Month plan includes two guest passes each month, and the Annual plan includes unlimited guest passes. Monthly members are welcome to bring a friend on a €15 day pass.",
  },
  {
    question: "How does personal training work?",
    answer:
      "All of our trainers are certified and available at every location. A single session is €45, a five-session block is €200 and a ten-session block is €380. Annual members receive one session per month as part of their membership.",
  },
  {
    question: "What amenities are available at each location?",
    answer:
      "Every location has free parking, locker rooms, showers and a sauna. Hrastnik and Sevnica also have a private massage therapy room, and Zagorje has a dedicated group-class studio.",
  },
  {
    question: "Do you offer group classes?",
    answer:
      "We do. Drop into a single class for €15, buy a ten-class pack for €120, or add unlimited classes to your membership for €80 per month. The current timetable is posted at reception in every location.",
  },
  {
    question: "How do I get started?",
    answer:
      "Give us a call on +386 1 234 5678 or walk into any of our three locations. We'll show you around, talk through which plan fits your goals, and you can be training the same day.",
  },
];
