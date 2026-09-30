/*
  NASI GROUP — site content
  ------------------------------------------------------------------
  Everything the page says lives here so it can be swapped without
  touching layout code.

  PLACEHOLDER POLICY
  Copy marked  [P]  is placeholder written to fit the brief's tone.
  Property and project names, prices, areas, years and sizes are
  illustrative and must be replaced with verified NASI data before
  launch. Nothing here should be read as a claim about a real listing.

  Photographs are licensed stock (see /assets/photo-credits.json)
  standing in for real NASI project photography.
*/

export const brand = {
  name: 'NASI Group',
  tagline: 'Building legacy.',
  descriptor: 'Real estate · Construction · Interiors',
};

export const nav = [
  { label: 'About', href: '#about' },
  { label: 'Real Estate', href: '#real-estate' },
  { label: 'Construction', href: '#construction' },
  { label: 'Interiors', href: '#interiors' },
  { label: 'Contact', href: '#contact' },
];

export const contact = {
  addressLines: [
    'Shop #5, Begur-Koppa Road, Vemana Circle,',
    'Mylasandra, Begur Hobli,',
    'Bengaluru – 560068, Karnataka, India',
  ],
  phones: ['7676767229', '7760596956', '7760008769'],
  // [P] Assumed the first listed number is WhatsApp-enabled. Confirm.
  whatsapp: '917676767229',
  email: 'nasi.group.official@gmail.com',
};

export const hero = {
  // Line breaks are deliberate; the final word is set in italic.
  headline: 'We build\nwhat comes\nnext.',
  supporting:
    'Real estate. Construction. Interiors. One integrated approach to creating spaces with lasting value.',
  primary: { label: 'Explore NASI', href: '#ecosystem' },
  secondary: { label: 'View properties', href: '#real-estate' },
  // The drawing sheet that builds itself as the visitor scrolls.
  stages: [
    { key: 'land', title: 'Land', note: 'The right ground, read for what it can become.' },
    { key: 'structure', title: 'Structure', note: 'Columns, beams and slabs set out with precision.' },
    { key: 'space', title: 'Space', note: 'Walls, openings and light, planned around living.' },
    { key: 'experience', title: 'Experience', note: 'A place that belongs to the people in it.' },
  ],
};

export const pathways = [
  {
    key: 'real-estate',
    title: 'Real Estate',
    line: 'Find the right opportunity.',
    href: '#real-estate',
    img: 'path-realestate',
    alt: 'Bengaluru skyline seen over a canopy of trees',
  },
  {
    key: 'construction',
    title: 'Construction',
    line: 'Build with confidence.',
    href: '#construction',
    img: 'path-construction',
    alt: 'Concrete frame of a building under construction',
  },
  {
    key: 'interiors',
    title: 'Interiors',
    line: 'Make the space yours.',
    href: '#interiors',
    img: 'path-interiors',
    alt: 'Planted courtyard with terracotta floor and a water bowl',
  },
];

export const ecosystem = {
  eyebrow: 'The NASI ecosystem',
  headline: 'One vision. Three disciplines.',
  copy: 'Real estate, construction and interiors under one ecosystem, so every decision is made with the bigger picture in view.',
  chain: [
    { key: 'land', title: 'Land', body: 'Finding and evaluating the opportunity.' },
    { key: 'build', title: 'Build', body: 'Planning and constructing with precision.' },
    { key: 'design', title: 'Design', body: 'Interiors shaped around the people in them.' },
    { key: 'experience', title: 'Experience', body: 'A place that performs for years.' },
  ],
};

export const realEstate = {
  eyebrow: 'Real estate · Bengaluru',
  headline: 'Property, with perspective.',
  copy:
    'Discover properties selected not simply for what they are today, but for what they can become tomorrow.',
  categories: ['All', 'Residential', 'Commercial', 'Plots & Land', 'Villas', 'Investment'],
  // [P] Illustrative listings. Localities are real South Bengaluru micro-markets
  // near the NASI office; everything else is placeholder.
  properties: [
    {
      name: 'Courtyard Villa, Begur Road', // [P]
      positioning: 'Four bedrooms around a shaded central court.',
      location: 'Begur, South Bengaluru',
      type: 'Villa',
      category: 'Villas',
      price: '₹3.2 Cr', // [P]
      status: 'Ready to move',
      stats: [['Built-up', '3,150 sq ft'], ['Plot', '2,400 sq ft'], ['Facing', 'East']],
      img: 'prop-villa-begur',
      alt: 'Contemporary villa at dusk with warm interior light',
      feature: true,
    },
    {
      name: 'Skyline Residences, Hosur Road', // [P]
      positioning: 'Three-bedroom homes between the city and the green.',
      location: 'Hosur Road, near Electronic City',
      type: 'Apartment',
      category: 'Residential',
      price: '₹1.45 Cr onwards', // [P]
      status: 'Under construction',
      stats: [['Carpet', '1,620 sq ft'], ['Floors', '2 to 14'], ['Possession', '2027']],
      img: 'prop-apartment',
      alt: 'White residential towers against a clear sky',
    },
    {
      name: 'Rainwood Plot, Bannerghatta Road', // [P]
      positioning: 'A level, tree-lined plot inside an approved layout.',
      location: 'Off Bannerghatta Road',
      type: 'Plot',
      category: 'Plots & Land',
      price: '₹92 L', // [P]
      status: 'Available',
      stats: [['Area', '1,800 sq ft'], ['Dimensions', '30 × 60 ft'], ['Approval', 'BDA']],
      img: 'prop-plot',
      alt: 'Level plot of land shaded by mature trees',
    },
    {
      name: 'Vemana Circle Commercial', // [P]
      positioning: 'Two floors of retail on a busy junction.',
      location: 'Vemana Circle, Begur',
      type: 'Commercial',
      category: 'Commercial',
      price: '₹2.1 Cr', // [P]
      status: 'Available',
      stats: [['Built-up', '4,200 sq ft'], ['Frontage', '48 ft'], ['Parking', '6 cars']],
      img: 'prop-commercial',
      alt: 'Dark glass and steel facade of a commercial building',
    },
    {
      name: 'Garden Villa, Koppa Road', // [P]
      positioning: 'Single-level living with a private lawn.',
      location: 'Koppa Road, Begur Hobli',
      type: 'Villa',
      category: 'Villas',
      price: '₹2.75 Cr', // [P]
      status: 'Ready to move',
      stats: [['Built-up', '2,800 sq ft'], ['Plot', '3,000 sq ft'], ['Facing', 'North']],
      img: 'prop-villa-courtyard',
      alt: 'Modern concrete villa with outdoor seating',
    },
    {
      name: 'Orchard Land, Chandapura', // [P]
      positioning: 'Two planted acres on the Hosur growth corridor.',
      location: 'Chandapura, Anekal Taluk',
      type: 'Land',
      category: 'Investment',
      price: 'On request',
      status: 'Available',
      stats: [['Area', '2 acres'], ['Road', '40 ft access'], ['Zoning', 'Verify']],
      img: 'prop-land-investment',
      alt: 'Rows of young trees on red soil',
    },
  ],
  cta: {
    lead: 'Interested in a property?',
    line: "Let's arrange a private viewing.",
    label: 'Request a viewing',
  },
};

export const difference = {
  eyebrow: 'The NASI difference',
  headline: 'Why NASI?',
  points: [
    { title: 'Integrated thinking', body: 'Real estate, construction and interiors under one ecosystem.' },
    { title: 'Experience over transactions', body: 'The relationship goes beyond simply closing a deal.' },
    { title: 'Detail-led execution', body: 'Small decisions often define the final outcome.' },
    { title: 'Transparency', body: 'Clear communication, structured processes and realistic expectations.' },
    { title: 'Long-term value', body: 'Every project is considered beyond the immediate transaction.' },
  ],
};

export const construction = {
  eyebrow: 'Construction',
  headline: 'Built with intention.',
  copy:
    'From foundation to finishing, we approach construction as a process of precision, accountability and long-term performance.',
  journey: [
    { step: 'Discover', body: 'Requirements, site and constraints.', stage: 'Site', img: 'build-site' },
    { step: 'Plan', body: 'Budget, drawings and timelines.', stage: 'Foundation', img: 'build-site' },
    { step: 'Design', body: 'Architecture, engineering and function.', stage: 'Structure', img: 'build-structure' },
    { step: 'Build', body: 'Execution and coordination on site.', stage: 'Walls', img: 'build-structure' },
    { step: 'Inspect', body: 'Quality, workmanship and milestones.', stage: 'Services', img: 'build-finishing' },
    { step: 'Deliver', body: 'Completion and handover.', stage: 'Finishing', img: 'build-finishing' },
    { step: 'Support', body: 'Assistance after completion.', stage: 'Completed space', img: 'build-complete' },
  ],
  details: {
    headline: "We don't just build. We manage the details.",
    items: [
      'Transparent communication',
      'Structured planning',
      'Quality-conscious execution',
      'Material clarity',
      'Site supervision',
      'Timeline management',
      'Vendor coordination',
      'Design coordination',
      'Documentation',
      'Client involvement',
    ],
  },
  cta: { lead: 'Planning to build?', line: "Tell us what you're building.", label: 'Start a project' },
};

export const interiors = {
  eyebrow: 'Interiors',
  headline: 'Spaces that feel like you.',
  copy:
    "Interior design isn't about filling a room. It's about creating an environment that belongs to the people who live, work and experience it.",
  gallery: [
    { img: 'int-kitchen-garden', category: 'Residential', caption: 'A kitchen that opens to the garden', alt: 'Kitchen island facing a planted garden through a wide opening' }, // [P]
    { img: 'int-dining-wood', category: 'Residential', caption: 'Timber shelving as the room’s quiet spine', alt: 'Dining room with warm timber shelving and daylight' }, // [P]
    { img: 'int-kitchen-marble', category: 'Luxury residential', caption: 'Green marble against brushed steel', alt: 'Kitchen island in green marble with grey cabinetry' }, // [P]
    { img: 'int-linen-light', category: 'Residential', caption: 'Morning light on linen', alt: 'Sunlight and shadow falling across a linen bed' }, // [P]
    { img: 'int-office-garden', category: 'Office', caption: 'A workspace with a courtyard for a wall', alt: 'Glass-walled office looking onto a courtyard garden' }, // [P]
    { img: 'int-living-dusk', category: 'Residential', caption: 'Evening in a city living room', alt: 'Warm living room at dusk with large windows' }, // [P]
  ],
  feels: ['Morning light', 'Privacy', 'Space', 'Views', 'Materials', 'Landscape', 'Lifestyle'],
  materials: {
    headline: 'The details matter.',
    items: [
      { key: 'stone', title: 'Stone', img: 'mat-stone', note: 'Cool underfoot, honest for decades.' },
      { key: 'wood', title: 'Wood', img: 'mat-wood', note: 'Warmth and grain.' },
      { key: 'metal', title: 'Metal', img: 'mat-metal', note: 'Fine lines that hold the rest.' },
      { key: 'glass', title: 'Glass', img: 'mat-glass', note: 'Borrowed light and landscape.' },
      { key: 'fabric', title: 'Fabric', img: 'mat-fabric', note: 'The layer a home is touched through.' },
      { key: 'lighting', title: 'Lighting', img: 'mat-lighting', note: 'Designed for evening.' },
    ],
  },
  process: [
    { step: 'Understand', body: 'Lifestyle and personality.' },
    { step: 'Concept', body: 'Mood, colour and materials.' },
    { step: 'Design', body: 'Layouts, furniture and lighting.' },
    { step: 'Develop', body: 'Drawings and specifications.' },
    { step: 'Execute', body: 'On-site installation.' },
    { step: 'Reveal', body: 'The completed space.' },
  ],
  cta: { lead: 'Have a space in mind?', line: "Let's design it together.", label: 'Discuss your space' },
};

export const finalCta = {
  headline: "Let's build something worth talking about.",
  options: [
    { key: 'buy', title: 'I want to buy', body: 'Properties and viewings.' },
    { key: 'build', title: 'I want to build', body: 'Construction.' },
    { key: 'design', title: 'I want to design', body: 'Interiors.' },
    { key: 'partner', title: 'I want to partner', body: 'Land and development.' },
  ],
  form: {
    submit: 'Start a conversation',
    success: 'Thank you. We will be in touch shortly.',
  },
};

export const footer = {
  columns: [
    { title: 'NASI Group', links: nav },
    { title: 'Real estate', links: [{ label: 'Bengaluru properties', href: '#real-estate' }] },
  ],
  copyright: `© ${new Date().getFullYear()} NASI Group. All rights reserved.`,
};
