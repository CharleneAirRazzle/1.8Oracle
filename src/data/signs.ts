export type Sign = {
  id: number;
  name: string;
  tagline: string;
  story: string;
  naturalMeaning: string;
  slogans: string[];
  wear: string;
  eat: string;
  read: string;
  watch: string;
  symbol: string;
};

export const SIGNS: Sign[] = [
  {
    id: 1,
    name: 'Heaven',
    tagline: 'The Creative',
    story:
      "Your energy today: EXPANSIVE. Today you're being called to lead, not to wait. This is a day for starting things, saying yes, and trusting your own momentum. Fortune favors you in creative work, new conversations, and bold decisions. Be careful of overconfidence and rushing past other people's feelings — your energy is strong today, and it can overwhelm those around you.",
    naturalMeaning:
      'The 1/8 Oracle draws from one of the oldest philosophical and mystical systems in human history. Today, in the natural world, your sign means the open sky at dawn — the moment when light first touches everything, and nothing is yet decided.',
    slogans: [
      'Move first. The path opens as you walk.',
      'Your intention is the spark. Act on it.',
      'The sky does not wait for permission.',
      'Lead with your heart, and the way will follow.',
    ],
    wear: 'White, gold, or something that makes you stand up straighter.',
    eat: 'Something warm and freshly made — bread, soup, or anything that feels like a beginning.',
    read: 'The Alchemist by Paulo Coelho.',
    watch: 'The Secret Life of Walter Mitty.',
    symbol: '☰',
  },
  {
    id: 2,
    name: 'Earth',
    tagline: 'The Receptive',
    story:
      "Your energy today: GROUNDING. Today is not about pushing — it's about holding. You're being asked to be the steady one: for a friend, for a project, for yourself. Fortune favors you in quiet conversations, long-term planning, and caring for something small. Be careful of giving so much that you forget you also need to receive.",
    naturalMeaning:
      'The 1/8 Oracle draws from one of the oldest philosophical and mystical systems in human history. Today, in the natural world, your sign means the soil after rain — dark, patient, and full of everything that hasn\'t grown yet.',
    slogans: [
      'Be patient. Good things grow quietly.',
      'You are allowed to rest and still be enough.',
      'Support others, and support returns.',
      'Roots grow deeper than you can see.',
    ],
    wear: 'Soft earth tones — cream, oatmeal, warm brown.',
    eat: 'Something slow-cooked — a stew, a broth, a meal that took time.',
    read: 'Braiding Sweetgrass by Robin Wall Kimmerer.',
    watch: 'Forrest Gump.',
    symbol: '☷',
  },
  {
    id: 3,
    name: 'Thunder',
    tagline: 'The Arousing',
    story:
      "Your energy today: ELECTRIC. Something is about to move — maybe inside you, maybe around you. Today rewards courage. Take the first step before you feel ready. Fortune favors you in breakthroughs, honest conversations, and decisions you've been delaying. Be careful of reacting too fast and mistaking motion for progress.",
    naturalMeaning:
      'The 1/8 Oracle draws from one of the oldest philosophical and mystical systems in human history. Today, in the natural world, your sign means the first crack of thunder after a long, still summer — sudden, alive, and impossible to ignore.',
    slogans: [
      'Act now. The moment favors the bold.',
      'A shake-up is a breakthrough in disguise.',
      "You don't need to feel ready. You need to begin.",
      'Thunder wakes the earth. Let it wake you.',
    ],
    wear: "Something bright — red, electric blue, or a color you've been shy about.",
    eat: 'Something with a kick — citrus, spice, or a cold drink on a warm day.',
    read: 'The War of Art by Steven Pressfield.',
    watch: 'Whiplash.',
    symbol: '☳',
  },
  {
    id: 4,
    name: 'Wind',
    tagline: 'The Gentle',
    story:
      "Your energy today: SOFTENING. Today is not for force. It's for patience, subtlety, and trusting that small consistent actions add up. Fortune favors you in listening, adapting, and letting things come to you instead of chasing them. Be careful of being so flexible that you forget what you actually want.",
    naturalMeaning:
      'The 1/8 Oracle draws from one of the oldest philosophical and mystical systems in human history. Today, in the natural world, your sign means a breeze moving through tall grass — invisible, but you can see everything it touches.',
    slogans: [
      'Go with the flow. Gentle wins.',
      'Small steps today. Big shifts later.',
      'The softest wind shapes the hardest stone.',
      "You don't have to push. You can just keep moving.",
    ],
    wear: 'Something loose and flowing — linen, soft cotton, a scarf.',
    eat: 'Something light and green — salad, tea, fresh fruit.',
    read: 'The Tao of Pooh by Benjamin Hoff.',
    watch: "Kiki's Delivery Service.",
    symbol: '☴',
  },
  {
    id: 5,
    name: 'Water',
    tagline: 'The Deep',
    story:
      "Your energy today: DEEP. Today may feel heavy — but heavy doesn't mean bad. You're being asked to move carefully, think before speaking, and trust your own depth. Fortune favors you in introspection, difficult but honest conversations, and getting through something that's been weighing on you. Be careful of isolation — going too deep alone.",
    naturalMeaning:
      'The 1/8 Oracle draws from one of the oldest philosophical and mystical systems in human history. Today, in the natural world, your sign means a river at night — dark on the surface, but moving steadily toward somewhere it already knows.',
    slogans: [
      "Move carefully, but don't stop moving.",
      'Wisdom lives in the deep.',
      'Even the darkest river finds the sea.',
      "Your depth is not a burden. It's your gift.",
    ],
    wear: 'Deep blues, blacks, or soft grays.',
    eat: 'Something comforting — soup, rice, warm tea with honey.',
    read: 'The Old Man and the Sea by Ernest Hemingway.',
    watch: 'Manchester by the Sea.',
    symbol: '☵',
  },
  {
    id: 6,
    name: 'Fire',
    tagline: 'The Clinging',
    story:
      "Your energy today: LUMINOUS. Today you can see clearly — and that clarity is a gift, even when it's uncomfortable. Fortune favors you in creative work, being seen, and saying what you actually think. Be careful of burning too bright too fast — and of clinging to something that no longer lights you up.",
    naturalMeaning:
      'The 1/8 Oracle draws from one of the oldest philosophical and mystical systems in human history. Today, in the natural world, your sign means a campfire at dusk — small, warm, and the center of everything around it.',
    slogans: [
      'See clearly. Act honestly. Shine anyway.',
      'Your inner light already knows the way.',
      'You are allowed to be seen.',
      'Burn warm, not fast.',
    ],
    wear: 'Warm tones — amber, orange, terracotta.',
    eat: 'Something roasted, spiced, or shared.',
    read: 'Circe by Madeline Miller.',
    watch: 'Soul.',
    symbol: '☲',
  },
  {
    id: 7,
    name: 'Mountain',
    tagline: 'Keeping Still',
    story:
      "Your energy today: STILL. Today is not a day to push. It's a day to pause, breathe, and let things settle. Fortune favors you in rest, reflection, and quietly knowing when not to act. Be careful of confusing stillness with giving up — they are not the same thing.",
    naturalMeaning:
      'The 1/8 Oracle draws from one of the oldest philosophical and mystical systems in human history. Today, in the natural world, your sign means a mountain at noon — unmoving, unhurried, and older than any question you\'re carrying.',
    slogans: [
      'Pause. Clarity comes in the quiet.',
      'Rest is part of the path.',
      "Stillness is not empty. It's full of everything.",
      "You don't have to move today to be growing.",
    ],
    wear: 'Neutral tones — stone, moss, muted gray.',
    eat: 'Something simple and grounding — rice, root vegetables, plain tea.',
    read: 'Walden by Henry David Thoreau.',
    watch: 'Paterson.',
    symbol: '☶',
  },
  {
    id: 8,
    name: 'Lake',
    tagline: 'The Joyful',
    story:
      "Your energy today: OPEN. Today is about connection. Reach out. Share something. Say the kind thing you've been thinking. Fortune favors you in friendships, creative collaboration, and joy that comes from being fully yourself. Be careful of people-pleasing — saying yes when you mean no.",
    naturalMeaning:
      'The 1/8 Oracle draws from one of the oldest philosophical and mystical systems in human history. Today, in the natural world, your sign means a still lake reflecting a clear sky — everything you bring to it comes back to you, doubled.',
    slogans: [
      'Speak warmly. Connection is the win today.',
      'Joy shared is joy doubled.',
      'You are allowed to take up space with your joy.',
      'What you give returns to you, doubled.',
    ],
    wear: 'Something joyful — pastel, floral, or a color that makes you smile.',
    eat: 'Something shared — a meal with someone, a dessert, fresh fruit.',
    read: 'The House in the Cerulean Sea by TJ Klune.',
    watch: 'Amélie.',
    symbol: '☱',
  },
];

export function getSignById(id: number): Sign | undefined {
  return SIGNS.find((s) => s.id === id);
}

export function getRandomSlogan(sign: Sign): string {
  const idx = Math.floor(Math.random() * sign.slogans.length);
  return sign.slogans[idx];
}
