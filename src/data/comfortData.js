export const AFFIRMATIONS = [
  {
    id: 1,
    tag: "Biology Fact",
    text: "Your body is working through a lot of changes right now. It is completely natural to feel tired or drained.",
    sub: "You have every right to take it slow today."
  },
  {
    id: 2,
    tag: "Gentle Hug",
    text: "You do not need to be productive or check anything off a list today. Resting and recovering is more than enough.",
    sub: "Curl into a warm blanket and stay comfortable."
  },
  {
    id: 3,
    tag: "Comfort First",
    text: "Comfort food serves a real purpose when your body needs soothing. Enjoy whatever makes you feel peaceful.",
    sub: "Zero guilt for snacks that bring you comfort."
  },
  {
    id: 4,
    tag: "Care",
    text: "I wish I could take the cramps away and carry them for you. Until they pass, sending you all the gentlest warmth.",
    sub: "Rest your eyes and keep the warmth close."
  },
  {
    id: 5,
    tag: "Immunity",
    text: "If you feel quiet, sensitive, or want the world to leave you alone today, you have full permission. Your comfort comes first.",
    sub: "No explanations needed."
  },
  {
    id: 6,
    tag: "Validation",
    text: "You are allowed to feel whatever emotions arise today without judging yourself. Every single feeling is valid.",
    sub: "Take deep, gentle breaths."
  },
  {
    id: 7,
    tag: "Reminder",
    text: "Even on days when you feel exhausted and under the weather, you are wonderful and deeply appreciated.",
    sub: "Never forget how special you are."
  },
  {
    id: 8,
    tag: "Peace",
    text: "Rest is not something you have to earn. It is essential self-care. Give yourself grace today.",
    sub: "Close your eyes and breathe easy."
  }
];

export const CAFE_DRINKS = [
  {
    id: 'cocoa',
    name: 'Hot Dark Cocoa',
    iconType: 'coffee',
    tag: 'Comfort',
    desc: 'Rich dark cocoa with steamed milk to naturally support serotonin.',
    benefit: 'Dark chocolate contains magnesium, which helps relax uterine muscle tension.'
  },
  {
    id: 'chamomile',
    name: 'Honey Chamomile Tea',
    iconType: 'leaf',
    tag: 'Spasm Relief',
    desc: 'Pure chamomile blossoms infused with clover honey.',
    benefit: 'Chamomile contains glycine, which naturally calms muscle spasms and eases cramps.'
  },
  {
    id: 'ginger',
    name: 'Warm Ginger Lemon',
    iconType: 'flame',
    tag: 'Soother',
    desc: 'Fresh ginger root and lemon steeped in hot water.',
    benefit: 'Ginger is widely known to reduce inflammatory prostaglandins and soothe aching bellies.'
  },
  {
    id: 'strawberry',
    name: 'Warm Vanilla Milk',
    iconType: 'heart',
    tag: 'Relaxation',
    desc: 'Gentle warm milk with a hint of natural sweet vanilla.',
    benefit: 'Warm milk promotes tryptophan production for tranquil, restorative rest.'
  }
];

export const CRAVINGS = [
  {
    id: 'choc',
    name: 'Dark Chocolate',
    iconType: 'cookie',
    desc: 'Rich in magnesium to ease muscle tension.',
    tip: 'Releases natural endorphins that gently lift your mood.'
  },
  {
    id: 'soup',
    name: 'Warm Broth',
    iconType: 'utensils',
    desc: 'Nourishing, savory warmth that settles the stomach.',
    tip: 'Warm fluids promote circulation and soothe abdominal discomfort.'
  },
  {
    id: 'fruit',
    name: 'Fresh Berries',
    iconType: 'sparkles',
    desc: 'Sweet, hydrating, and naturally refreshing.',
    tip: 'Antioxidants help calm systemic inflammation.'
  },
  {
    id: 'cookies',
    name: 'Warm Baked Cookie',
    iconType: 'cookie',
    desc: 'A comforting, sweet staple for cozy days in bed.',
    tip: 'Gentle carbs help replenish energy when you are feeling low.'
  }
];

export const CHECKLIST_ITEMS = [
  { id: 'water', text: 'Drank warm water or herbal tea', tip: 'Hydration helps decrease bloating and cramping.' },
  { id: 'socks', text: 'Wearing warm fuzzy socks', tip: 'Keeping feet warm promotes healthy circulation.' },
  { id: 'heat', text: 'Heating pad placed on tummy or lower back', tip: 'Gentle heat increases blood flow and relaxes muscles.' },
  { id: 'rest', text: 'Curled up in a comfortable position', tip: 'A soft fetal posture naturally relieves abdomen tension.' },
  { id: 'guiltfree', text: 'Given yourself permission to do nothing today', tip: 'Resting is your only priority today.' }
];

export const COUPONS = [
  {
    id: 'c1',
    title: 'Guilt-Free Rest Pass',
    iconType: 'moon',
    desc: 'No alarms or obligations. Sleep until your body feels completely restored.',
    code: 'REST-PASS'
  },
  {
    id: 'c2',
    title: 'Peace & Quiet Pass',
    iconType: 'bellOff',
    desc: 'Leave notifications on silent, ignore messages, and enjoy quiet solitude.',
    code: 'QUIET-TIME'
  },
  {
    id: 'c3',
    title: 'Comfort Snack Pass',
    iconType: 'cookie',
    desc: 'Permission to eat whatever warm comfort food sounds good today.',
    code: 'TREAT-PASS'
  },
  {
    id: 'c4',
    title: 'Comfort Binge Watch',
    iconType: 'tv',
    desc: 'Rewatch your favorite series or movies under the blanket all day.',
    code: 'COMFORT-WATCH'
  },
  {
    id: 'c5',
    title: 'Zero Responsibilities',
    iconType: 'calendarOff',
    desc: 'All chores and errands are postponed until you feel 100% better.',
    code: 'CHORES-OFF'
  }
];

export const LETTERS = [
  {
    id: 'l1',
    title: 'When cramps are hurting',
    iconType: 'heart',
    snippet: 'Take a slow, deep breath...',
    body: `Hey,

I know your body feels uncomfortable and exhausted right now. Cramps can be so draining to endure.

Please bundle up under the warmest blanket, keep the heat pad close, and relax your muscles. You don't have to push through anything today.

I am sending you the warmest, calmest thoughts. Take all the time you need to rest and heal.`
  },
  {
    id: 'l2',
    title: 'When your mood feels heavy',
    iconType: 'shield',
    snippet: 'Be gentle with yourself...',
    body: `Hey,

It is completely normal if your mood feels lower or sensitive today. Hormone shifts can make small things feel much heavier.

Please don't judge yourself for wanting to stay in bed, be quiet, or simply do nothing.

You are a wonderful, resilient person. Today is simply a day to rest, and tomorrow will be lighter.`
  },
  {
    id: 'l3',
    title: 'A gentle reminder of your light',
    iconType: 'sparkles',
    snippet: 'Just a quiet thought...',
    body: `Hey sweet girl,

Just a quiet note to remind you that your presence brings so much warmth and happiness to everyone around you.

Take it easy, drink something warm, and know that you are deeply cared for.

I hope this little quiet sanctuary brings you a moment of comfort today.`
  }
];
