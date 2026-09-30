/*
  NASI GROUP — About section content
  ------------------------------------------------------------------
  Copy follows the About section specification word for word.

  PLACEHOLDERS
  Founder portraits have not been supplied yet, so `image` is null and
  the card shows the founder's initials in a 4:5 frame. Drop the file
  into /public/img (plus an -800 variant) and set `image` to its name.
  The two architectural photographs are licensed stock standing in for
  project-team photography (see /assets/photo-credits.json).
*/

export const intro = {
  eyebrow: 'About NASI Group',
  headline: ['People.', 'Ideas.', 'Execution.', 'Legacy.'],
  body: 'NASI Group brings together real estate, construction and interiors with a practical focus on creating well-designed spaces, delivering them with discipline, and building long-term value.',
  secondary: 'Different experiences. One shared direction.',
};

export const detail = {
  image: 'build-complete', // [P] stock stand-in
};

export const foundersHead = {
  eyebrow: 'The people behind NASI',
  headline: 'Three perspectives. One direction.',
  supporting: 'NASI Group is shaped by different experiences, disciplines and ways of thinking — brought together around one shared standard for how the company builds and grows.',
};

export const founders = [
  {
    id: 'sri-harsha',
    index: '01',
    name: 'Sri Harsha B S',
    designation: 'Founder & Managing Director',
    bio: 'A computer science engineer with a background in network engineering, and experience across real estate, construction, legal consulting and hospitality, including NASI Biryani and its growth.',
    image: null, // [P] portrait to be supplied
    alt: 'Sri Harsha B S, Founder and Managing Director of NASI Group',
  },
  {
    id: 'mohit-srinivasan',
    index: '02',
    name: 'Mohit Srinivasan',
    designation: 'Co-Founder & Managing Director',
    bio: 'A computer science engineer and DevOps consultant who brings real-estate marketing, brand positioning, technology and networks to strategic growth and disciplined execution.',
    image: null, // [P] portrait to be supplied
    alt: 'Mohit Srinivasan, Co-Founder and Managing Director of NASI Group',
  },
  {
    id: 'varun-narayan',
    index: '03',
    name: 'Varun Narayan',
    designation: 'Co-Founder & Managing Director',
    bio: 'A civil engineer working across construction, interiors and plotted-layout development, from design detailing and site execution to end-to-end project delivery.',
    image: null, // [P] portrait to be supplied
    alt: 'Varun Narayan, Co-Founder and Managing Director of NASI Group',
  },
];

export const direction = {
  statement: 'Different experiences. One shared direction.',
  body: 'NASI Group combines technology, development, construction, interiors, marketing and business strategy under one operating mindset: plan carefully, execute responsibly and create value that lasts.',
};

export const principles = [
  { index: '01', title: 'Vision', body: 'Think beyond the immediate project and design for where the space, business and community are heading.' },
  { index: '02', title: 'Values', body: 'Build trust through transparency, responsibility, quality and respect for the people involved.' },
  { index: '03', title: 'Approach', body: 'Plan clearly, communicate directly and execute with attention to detail.' },
  { index: '04', title: 'Impact', body: 'Measure success by the usefulness, durability and long-term value created.' },
];

export const purpose = {
  eyebrow: 'Building legacy',
  headline: 'Better spaces. Brighter tomorrows.',
  body: 'We are building NASI Group as a long-term enterprise — one that brings together people, property, construction and design to create places and projects that remain valuable beyond the day they are completed.',
  image: 'int-living-dusk', // [P] stock stand-in
};
