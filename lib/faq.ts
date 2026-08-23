import { site } from "@/lib/site";

/**
 * FAQ content.
 *
 * Plan names and figures here must match lib/pricing.ts, and the contact number
 * is interpolated from lib/site.ts rather than typed out, so correcting the
 * placeholder phone number in one place fixes it everywhere.
 */

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqs: FaqItem[] = [
  {
    question: "What are your opening hours?",
    answer:
      "The gyms are open 24 hours a day, 365 days a year, at all three locations. Reception is staffed weekdays 09:00–20:00 and Saturday 09:00–13:00 — that is when to come in if you want a tour, a contract signed or a question answered in person.",
  },
  {
    question: "Do I need to book equipment in advance?",
    answer:
      "No booking is required for any of the gym equipment — turn up and train. The only things worth reserving ahead are personal training sessions and massage therapy, which you can arrange at reception or over the phone.",
  },
  {
    question: "Can I use all three gyms with one membership?",
    answer:
      "Yes. Every membership includes unlimited 24-hour access to Hrastnik, Zagorje and Sevnica at no extra cost, on the same card.",
  },
  {
    question: "Is there a joining fee or a minimum term?",
    answer:
      "There is no joining fee. The monthly plan is €49 and rolls month to month with no minimum term. The 6-month (€252) and 12-month (€444) plans are paid upfront in exchange for a lower effective monthly rate.",
  },
  {
    question: "Can I freeze or cancel my membership?",
    answer:
      "Monthly members can cancel any time before the next billing date — no notice period, no cancellation fee. Members on the 6-month and 12-month plans can freeze for up to two months per term for medical reasons or extended travel; let the team know and we will sort it out.",
  },
  {
    question: "Do you offer guest passes?",
    answer:
      "The 6-month plan includes two guest passes a month and the 12-month plan includes unlimited guest passes. Monthly members are welcome to bring someone on a €15 day pass.",
  },
  {
    question: "How does personal training work?",
    answer:
      "All of our trainers are certified and available at every location. One session is €45, five sessions are €200 and ten sessions are €380. Members on the 12-month plan get one session a month included.",
  },
  {
    question: "What is at each location?",
    answer:
      "Every gym has free parking, locker rooms, showers and a sauna. Hrastnik and Sevnica also have a private massage therapy room, and Zagorje has a group-class studio.",
  },
  {
    question: "Do you offer group classes?",
    answer:
      "Yes. A single class is €15, a ten-class pack is €120, or add unlimited classes to your membership for €80 a month. The current timetable is posted at reception in every gym.",
  },
  {
    question: "How do I join?",
    answer: `Call ${site.phone} or walk into any of the three gyms during reception hours. We will show you round, talk through which plan fits, and you can train the same day.`,
  },
];
