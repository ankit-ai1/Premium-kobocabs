// ============================================================
//  KoboCabs — Central site data
//  All real business info lives here so every page stays in sync.
// ============================================================

export const site = {
  name: "KoboCabs",
  tagline: "Premium Outstation & City Cab Booking",
  since: 2020,
  city: "Bareilly",
  phone: "+91 8755 718911",
  phoneRaw: "918755718911",
  email: "kobocabs@gmail.com",
  address: "Near Samar Timber, Shanti Vihar, Badaun Road, Bareilly, UP 243001",
  hours: "Mon – Sun, 6 AM – 10 PM IST",
  whatsapp: "https://wa.me/918755718911",
  mapUrl:
    "https://maps.google.com/?q=Near+Samar+Timber,+Shanti+Vihar,+Badaun+Road+Bareilly,+Uttar+Pradesh+243001",
  socials: {
    instagram: "https://instagram.com/kobocabsindia",
    twitter: "https://twitter.com/kobocabsindia",
    facebook: "https://facebook.com/kobocabsindia",
  },
  stats: {
    rides: "50,000+",
    routes: "500+",
    rating: "4.9",
    cities: "500+",
  },
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Premium Cabs", href: "/premium-cabs" },
  { label: "Routes", href: "/routes" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

// ---- Image bank ----
// Self-hosted in /public/images so nothing depends on a third-party CDN.
// Drop your own photos in with these exact filenames to swap the whole site.
export const img = {
  heroCity: "/images/hero-city.jpg",
  cabNight: "/images/cab-night.jpg",
  driver: "/images/driver.jpg",
  wheel: "/images/wheel.jpg",
  yellowCab: "/images/yellow-cab.jpg",
  about: "/images/about.png",
  bareilly: "/images/bareilly.png",
  callToBook: "/images/call-to-book.png",
  outstation: "/images/outstation.png",
  oneWay: "/images/one-way.png",
  hillStation: "/images/hill-station.png",
  pilgrimage: "/images/pilgrimage.png",
  road: "/images/road.jpg",
  // Branded KoboCabs cab shots — Swift, Honda City, Innova Crysta, Traveller.
  hatchback: "/images/hatchback.png",
  sedan: "/images/sedan.png",
  suv: "/images/suv.png",
  tempo: "/images/tempo.png",
  nainital: "/images/nainital.jpg",
  taj: "/images/taj.jpg",
  mountains: "/images/mountains.jpg",
  temple: "/images/temple.jpg",
  wildlife: "/images/wildlife.jpg",
  hills: "/images/hills.jpg",
};

// ---- Premium cabs ----
export type Cab = {
  id: string;
  name: string;
  ratePerKm: number;
  seats: number;
  ac: boolean;
  tag: string;
  blurb: string;
  models: string[];
  image: string;
  bestFor: string[];
};

export const premiumCabs: Cab[] = [
  {
    id: "hatchback",
    name: "Hatchback",
    ratePerKm: 11,
    seats: 4,
    ac: true,
    tag: "Smart & Economical",
    blurb: "Perfect for solo and couple outstation trips.",
    models: ["Maruti Swift", "WagonR", "Celerio"],
    image: img.hatchback,
    bestFor: ["Solo Travel", "Couple Trip"],
  },
  {
    id: "sedan",
    name: "Sedan",
    ratePerKm: 13,
    seats: 4,
    ac: true,
    tag: "Refined & Comfortable",
    blurb: "Business-class comfort for every journey.",
    models: ["Maruti Dzire", "Toyota Etios", "Honda Amaze"],
    image: img.sedan,
    bestFor: ["Business Travel", "Airport Drop"],
  },
  {
    id: "suv",
    name: "SUV",
    ratePerKm: 16,
    seats: 6,
    ac: true,
    tag: "Powerful & Spacious",
    blurb: "The choice for hills, families & long hauls.",
    models: ["Toyota Innova Crysta", "Maruti Ertiga", "Mahindra Marazzo"],
    image: img.suv,
    bestFor: ["Family Groups (5–6)", "Hill Stations"],
  },
  {
    id: "tempo",
    name: "Tempo Traveller",
    ratePerKm: 22,
    seats: 12,
    ac: true,
    tag: "Grand & Commanding",
    blurb: "Built for large groups — pilgrimages, tours & events.",
    models: ["Force Traveller 12-Seater", "Tata Winger", "Tempo Traveller Luxury"],
    image: img.tempo,
    bestFor: ["Groups 9–12", "College Tours"],
  },
];

// ---- Trip types ----
export const tripTypes = [
  { title: "Business Trip", note: "Airport transfers, client meets.", cab: "Sedan" },
  { title: "Family Vacation", note: "Up to 6 members, heavy luggage.", cab: "SUV" },
  { title: "Hill Station", note: "Nainital, Mussoorie, Shimla.", cab: "SUV" },
  { title: "Pilgrimage", note: "Haridwar, Varanasi, Vrindavan.", cab: "SUV / Tempo" },
  { title: "Group Tour", note: "9–12 people, weddings, outings.", cab: "Tempo Traveller" },
  { title: "Budget Trip", note: "Solo or couple, short routes.", cab: "Hatchback" },
];

// ---- Routes ----
export type RouteGroup = { from: string; count: number; routes: string[] };

export const routeGroups: RouteGroup[] = [
  {
    from: "Bareilly",
    count: 15,
    routes: [
      "Bareilly to Delhi",
      "Bareilly to Nainital",
      "Bareilly to Haldwani",
      "Bareilly to Lucknow",
      "Bareilly to Agra",
      "Bareilly to Haridwar",
      "Bareilly to Dehradun",
      "Bareilly to Rishikesh",
      "Bareilly to Jim Corbett",
      "Bareilly to Moradabad",
      "Bareilly to Ayodhya",
      "Bareilly to Varanasi",
      "Bareilly to Mussoorie",
      "Bareilly to Jaipur",
      "Bareilly to Noida",
    ],
  },
  {
    from: "Delhi",
    count: 12,
    routes: [
      "Delhi to Agra",
      "Delhi to Jaipur",
      "Delhi to Haridwar",
      "Delhi to Rishikesh",
      "Delhi to Dehradun",
      "Delhi to Shimla",
      "Delhi to Manali",
      "Delhi to Mussoorie",
      "Delhi to Nainital",
      "Delhi to Lucknow",
      "Delhi to Chandigarh",
      "Delhi to Amritsar",
    ],
  },
  {
    from: "Lucknow",
    count: 6,
    routes: [
      "Lucknow to Agra",
      "Lucknow to Varanasi",
      "Lucknow to Ayodhya",
      "Lucknow to Prayagraj",
      "Lucknow to Delhi",
      "Lucknow to Kanpur",
    ],
  },
  {
    from: "Agra",
    count: 4,
    routes: ["Agra to Delhi", "Agra to Jaipur", "Agra to Mathura", "Agra to Lucknow"],
  },
];

// ---- How it works ----
export const steps = [
  {
    n: "01",
    title: "Enter Locations",
    text: "Type your pickup and drop-off. Auto-complete finds any city, airport, or landmark across North India.",
  },
  {
    n: "02",
    title: "Pick Your Cab",
    text: "Choose Hatchback, Sedan, SUV or Tempo Traveller and see the full fare breakdown upfront.",
  },
  {
    n: "03",
    title: "Confirm Booking",
    text: "Enter your travel details and get an instant confirmation via SMS and email.",
  },
  {
    n: "04",
    title: "Pay & Ride",
    text: "Pay securely via UPI, card or net-banking. Your driver is assigned instantly.",
  },
];

// ---- Promise / trust points ----
export const promises = [
  {
    title: "Commercial Registration",
    text: "Every vehicle carries a valid commercial permit — no private cars disguised as taxis.",
  },
  {
    title: "Background-Verified Drivers",
    text: "Government ID, driving licence and address verified before onboarding.",
  },
  {
    title: "GPS Active on All Trips",
    text: "Real-time location tracking on every booking — shared on request.",
  },
  {
    title: "Zero Advance Payment",
    text: "No upfront amount required — pay the driver only after your journey ends.",
  },
  {
    title: "4.8 / 5 Driver Rating",
    text: "Post-trip ratings collected after every booking to maintain service quality.",
  },
  {
    title: "24×7 Support",
    text: "WhatsApp and call support round the clock — even on public holidays.",
  },
];

// ---- FAQs ----
export const faqs = [
  {
    q: "How do I book a cab for outstation travel?",
    a: "Enter your pickup and drop location, pick a cab type, and confirm. You get an instant confirmation on SMS and WhatsApp, and pay only 15% to lock the booking.",
  },
  {
    q: "What is included in the fare?",
    a: "The fare shown is all-inclusive — it covers driver allowance, tolls, and GST. State entry permits on outstation routes are paid directly at the booth.",
  },
  {
    q: "Can I cancel or modify my booking?",
    a: "Yes. You can cancel free of charge up to 6 hours before pickup, and modify pickup time or cab type by contacting us on WhatsApp.",
  },
  {
    q: "Are the drivers verified?",
    a: "Every driver is background-checked with a valid commercial licence, verified government ID, and address proof before onboarding.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept UPI, credit/debit cards, net-banking, and cash. Only a 15% advance confirms the ride — the rest is paid to the driver.",
  },
  {
    q: "Is there a waiting charge at pickup?",
    a: "The driver is dispatched 30 minutes before pickup and waits free of charge for a reasonable window. Extended waiting is billed transparently.",
  },
];

// ---- Blog posts ----
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  read: string;
  image: string;
  featured?: boolean;
};

export const posts: Post[] = [
  {
    slug: "bareilly-to-nainital-guide-2025",
    title: "Bareilly to Nainital by Cab: The Ultimate Travel Guide 2025",
    excerpt:
      "Planning a trip from Bareilly to Nainital? Discover the scenic 140 km route, best time to visit, must-see stops, and why a cab is the most comfortable way to reach the Queen of Hills.",
    category: "Hill Stations",
    date: "April 15, 2025",
    read: "5 min read",
    image: img.mountains,
    featured: true,
  },
  {
    slug: "char-dham-yatra-2025",
    title: "Char Dham Yatra 2025: Complete Cab Travel Guide from North India",
    excerpt:
      "Embark on the sacred Char Dham Yatra — Yamunotri, Gangotri, Kedarnath, and Badrinath — with complete route details and best times to travel.",
    category: "Pilgrimage",
    date: "March 28, 2025",
    read: "7 min",
    image: img.hills,
  },
  {
    slug: "delhi-to-agra-by-cab",
    title: "Delhi to Agra by Cab: Tips, Route & What to See Along the Way",
    excerpt:
      "The Yamuna Expressway makes Delhi to Agra a breeze — just 3 hours. But there's so much more to this route than the Taj. Here's the full guide.",
    category: "Travel Guides",
    date: "March 10, 2025",
    read: "4 min",
    image: img.taj,
  },
  {
    slug: "best-hill-stations-near-delhi",
    title: "5 Best Hill Stations Near Delhi for a Weekend Cab Getaway",
    excerpt:
      "When the heat of the plains gets unbearable, these 5 hill stations within 350 km of Delhi offer cool relief — all easily reachable by cab.",
    category: "Hill Stations",
    date: "February 20, 2025",
    read: "5 min",
    image: img.nainital,
  },
  {
    slug: "haridwar-rishikesh-by-cab",
    title: "Haridwar & Rishikesh by Cab: A Complete Travel Guide from North India",
    excerpt:
      "Two of India's most sacred cities sit just 24 km apart on the banks of the Ganga. Here's how to plan the perfect cab trip to Haridwar.",
    category: "Pilgrimage",
    date: "February 5, 2025",
    read: "5 min",
    image: img.temple,
  },
  {
    slug: "one-way-vs-round-trip",
    title: "One-Way vs Round-Trip Cab: Which is Better for Your Budget?",
    excerpt:
      "Should you book a one-way cab or a round-trip? The answer depends on your trip length, flexibility, and how you plan to travel.",
    category: "Route Tips",
    date: "January 22, 2025",
    read: "4 min",
    image: img.wheel,
  },
  {
    slug: "mussoorie-travel-guide-2025",
    title: "Mussoorie Travel Guide 2025: Best Time, Places & Getting There by Cab",
    excerpt:
      "Mussoorie — the Queen of Hills — sits at 2,000 metres above sea level with breathtaking views of the Doon Valley and Himalayas.",
    category: "Hill Stations",
    date: "January 8, 2025",
    read: "6 min",
    image: img.hills,
  },
  {
    slug: "jim-corbett-cab-guide",
    title: "Jim Corbett National Park: Cab Travel Guide from Bareilly",
    excerpt:
      "India's oldest national park and the birthplace of Project Tiger sits just 160 km from Bareilly. Here's your complete guide to reaching it.",
    category: "Travel Guides",
    date: "December 15, 2024",
    read: "5 min",
    image: img.wildlife,
  },
];

export const blogCategories = [
  { name: "Travel Guides", count: 17 },
  { name: "Hill Stations", count: 15 },
  { name: "Pilgrimage", count: 6 },
  { name: "Route Tips", count: 7 },
  { name: "North India", count: 5 },
];

// ---- Reviews ----
export const reviews = [
  {
    name: "Meera Nair",
    text: "KoboCabs is the best cab service for outstation travel. Professional drivers, clean vehicles, and transparent pricing.",
    trip: "Bareilly → Nainital",
  },
  {
    name: "Karan Mehta",
    text: "Booked a Sedan for a family trip. Everything was perfect — clean car, polite driver, and no surprises on the bill.",
    trip: "Delhi → Agra",
  },
  {
    name: "Sunita Verma",
    text: "KoboCabs made our pilgrimage trip so comfortable. The Tempo Traveller was in great condition and the driver was wonderful.",
    trip: "Haridwar → Rishikesh",
  },
];
