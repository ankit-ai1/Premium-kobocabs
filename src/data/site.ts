// ============================================================
//  YantraCabs — Central site data
//  All real business info lives here so every page stays in sync.
// ============================================================

export const site = {
  name: "YantraCabs",
  tagline: "Premium Outstation & City Cab Booking",
  since: 2020,
  city: "New Delhi",
  state: "Delhi",
  phone: "+91 8755 718911",
  phoneRaw: "918755718911",
  email: "YantraCabs@gmail.com",
  address: "Bhavbhuti Marg, Kamla Market, Ajmeri Gate, New Delhi, Delhi 110002",
  hours: "Mon – Sun, 6 AM – 10 PM IST",
  whatsapp: "https://wa.me/918755718911",
  mapUrl:
    "https://maps.google.com/?q=Bhavbhuti+Marg,+Kamla+Market,+Ajmeri+Gate,+New+Delhi,+Delhi+110002",
  socials: {
    instagram: "https://instagram.com/YantraCabsindia",
    twitter: "https://twitter.com/YantraCabsindia",
    facebook: "https://facebook.com/YantraCabsindia",
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
  logo: "https://res.cloudinary.com/dtg3lepr4/image/upload/v1786983788/ChatGPT_Image_Aug_17_2026_09_52_44_PM_ovagvh.png",
  heroCity: "/images/hero-city.jpg",
  cabNight: "/images/cab-night.jpg",
  driver: "/images/driver.jpg",
  wheel: "/images/wheel.jpg",
  yellowCab: "/images/yellow-cab.jpg",
  about: "https://res.cloudinary.com/dtg3lepr4/image/upload/v1786516127/ChatGPT_Image_Aug_12_2026_11_58_28_AM_tme2tv.png",
  bareilly: "/images/bareilly.png",
  callToBook: "/images/call-to-book.png",
  outstation: "/images/outstation.png",
  oneWay: "/images/one-way.png",
  hillStation: "/images/hill-station.png",
  pilgrimage: "/images/pilgrimage.png",
  road: "/images/road.jpg",
  // Branded YantraCabs cab shots — Swift, Honda City, Innova Crysta, Traveller.
  hatchback: "https://res.cloudinary.com/dtg3lepr4/image/upload/v1786519058/ChatGPT_Image_Aug_12_2026_12_47_19_PM_wilvzo.png",
  sedan: "https://res.cloudinary.com/dtg3lepr4/image/upload/v1786519619/ChatGPT_Image_Aug_12_2026_12_55_55_PM_theatb.png",
  suv: "https://res.cloudinary.com/dtg3lepr4/image/upload/v1786519736/ChatGPT_Image_Aug_12_2026_12_58_34_PM_qnlqat.png",
  tempo: "https://res.cloudinary.com/dtg3lepr4/image/upload/v1786519862/ChatGPT_Image_Aug_12_2026_01_00_44_PM_o4ynpa.png",
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
  /**
   * Per-km rate for a one-way drop — higher, because the return leg runs empty.
   * `null` means the rate is quoted on request rather than off a card.
   */
  rateOneWay: number | null;
  /** Per-km rate for a round trip, billed across the total distance of both legs. */
  rateRoundTrip: number;
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
    rateOneWay: 10,
    rateRoundTrip: 10,
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
    rateOneWay: 11,
    rateRoundTrip: 11,
    seats: 4,
    ac: true,
    tag: "Refined & Comfortable",
    blurb: "Business-class comfort for every journey.",
    models: ["Maruti Dzire", "Toyota Etios", "Honda Amaze"],
    image: img.sedan,
    bestFor: ["Business Travel", "Airport Drop"],
  },
  {
    id: "ertiga",
    name: "Ertiga",
    rateOneWay: 14,
    rateRoundTrip: 14,
    seats: 6,
    ac: true,
    tag: "Roomy & Practical",
    blurb: "Extra room for the family without the SUV price tag.",
    models: ["Maruti Ertiga", "Maruti XL6"],
    image: img.suv,
    bestFor: ["Family Groups (5–6)", "Weekend Trips"],
  },
  {
    id: "kia-carens",
    name: "Kia Carens",
    rateOneWay: 16,
    rateRoundTrip: 16,
    seats: 7,
    ac: true,
    tag: "Powerful & Spacious",
    blurb: "The choice for hills, long hauls and travelling in comfort.",
    models: ["Kia Carens"],
    image: img.suv,
    bestFor: ["Hill Stations", "Char Dham Yatra"],
  },
  {
    id: "innova-crysta",
    name: "Innova Crysta",
    rateOneWay: 20,
    rateRoundTrip: 20,
    seats: 7,
    ac: true,
    tag: "Powerful & Spacious",
    blurb: "Extra comfort and space for long-distance journeys.",
    models: ["Toyota Innova Crysta"],
    image: img.suv,
    bestFor: ["Hill Stations", "Char Dham Yatra"],
  },
  {
    id: "tempo",
    name: "Tempo Traveller",
    // Quoted on request: one-way tempo pricing depends on the route.
    rateOneWay: null,
    rateRoundTrip: 25,
    seats: 12,
    ac: true,
    tag: "Grand & Commanding",
    blurb: "Built for large groups — pilgrimages, tours & events.",
    models: ["Force Traveller 12-Seater", "Tata Winger", "Tempo Traveller Luxury"],
    image: img.tempo,
    bestFor: ["Groups 9–12", "Char Dham Yatra"],
  },
];

// ---- Fare disclaimer ----
// Shown wherever a fare is quoted, and repeated in the WhatsApp message, so the
// customer never treats an estimate as the final bill.
export const fareNote = {
  short: "Estimate only — toll and driver allowance extra.",
  long:
    "This fare is an estimate based on the mapped distance. The final fare is confirmed on the actual kilometres travelled. Toll and driver allowance are not included and are payable separately.",
  whatsapp:
    "Note: this is an estimated fare. Final fare is decided on actual kilometres. Toll and driver allowance are extra.",
};

// ---- Trip types ----
export const tripTypes = [
  { title: "Business Trip", note: "Airport transfers, client meets.", cab: "Sedan" },
  { title: "Family Vacation", note: "Up to 6 members, heavy luggage.", cab: "Ertiga" },
  { title: "Hill Station", note: "Nainital, Mussoorie, Shimla.", cab: "Premium SUV" },
  { title: "Pilgrimage", note: "Char Dham, Haridwar, Varanasi.", cab: "Premium SUV" },
  { title: "Group Tour", note: "9–12 people, weddings, outings.", cab: "Tempo Traveller" },
  { title: "Budget Trip", note: "Solo or couple, short routes.", cab: "Hatchback" },
];

// ---- Routes ----
/**
 * A group of routes shown on the Routes page.
 * `lead` overrides the "Cabs From" heading for groups that are not a city.
 */
export type RouteGroup = {
  from: string;
  count: number;
  routes: string[];
  lead?: string;
};

export const routeGroups: RouteGroup[] = [
  {
    from: "Delhi NCR",
    count: 56,
    routes: [
      "Delhi to Jaipur",
      "Delhi to Agra",
      "Delhi to Mathura",
      "Delhi to Vrindavan",
      "Delhi to Haridwar",
      "Delhi to Rishikesh",
      "Delhi to Dehradun",
      "Delhi to Mussoorie",
      "Delhi to Nainital",
      "Delhi to Kainchi Dham",
      "Delhi to Shimla",
      "Delhi to Manali",
      "Delhi to Kasauli",
      "Delhi to Kalka",
      "Delhi to Chandigarh",
      "Delhi to Kurukshetra",
      "Delhi to Patiala",
      "Delhi to Amritsar",
      "Delhi to Jammu",
      "Delhi to Katra",
      "Delhi to Lucknow",
      "Delhi to Kanpur",
      "Delhi to Prayagraj",
      "Delhi to Varanasi",
      "Delhi to Ayodhya",
      "Delhi to Gorakhpur",
      "Delhi to Chitrakoot",
      "Delhi to Bareilly",
      "Delhi to Moradabad",
      "Delhi to Rampur",
      "Delhi to Khatu Shyam Ji",
      "Delhi to Salasar Balaji",
      "Delhi to Ajmer",
      "Delhi to Pushkar",
      "Delhi to Udaipur",
      "Delhi to Jodhpur",
      "Delhi to Jaisalmer",
      "Delhi to Bikaner",
      "Delhi to Mount Abu",
      "Delhi to Kota",
      "Delhi to Gwalior",
      "Delhi to Bhopal",
      "Delhi to Indore",
      "Delhi to Nagpur",
      "Delhi to Vadodara",
      "Delhi to Ahmedabad",
      "Delhi to Mumbai",
      "Delhi to Thane",
      "Delhi to Navi Mumbai",
      "Delhi to Pune",
      "Delhi to Bangalore",
      "Delhi to Kolkata",
      "Delhi to Asansol",
      "Delhi to Patna",
      "Delhi to Gaya",
      "Delhi to Begusarai",
    ],
  },
  {
    from: "Delhi",
    lead: "Hill Escapes From",
    count: 12,
    routes: [
      "Delhi to Lansdowne",
      "Delhi to Dhanaulti",
      "Delhi to Kanatal",
      "Delhi to Landour",
      "Delhi to Gairsain",
      "Delhi to Almora",
      "Delhi to Ranikhet",
      "Delhi to Mukteshwar",
      "Delhi to Jageshwar",
      "Delhi to Pithoragarh",
      "Delhi to Sonprayag",
      "Delhi to Gaurikund",
    ],
  },
  {
    from: "Airports",
    lead: "Transfers To",
    count: 16,
    routes: [
      "Indira Gandhi International Airport",
      "Hindon Airport",
      "Jewar Airport",
      "Safdarjung Airport",
      "Agra Airport",
      "Chandigarh Airport",
      "Dehradun Airport",
      "Pantnagar Airport",
      "Jaipur International Airport",
      "Lucknow Airport",
      "Bareilly Airport",
      "Kanpur Airport",
      "Ayodhya Airport",
      "Prayagraj Airport",
      "Varanasi Airport",
      "Gorakhpur Airport",
    ],
  },
  {
    from: "Bareilly",
    count: 28,
    routes: [
      "Bareilly to Delhi NCR",
      "Bareilly to Lucknow",
      "Bareilly to Nainital",
      "Bareilly to Haldwani",
      "Bareilly to Kathgodam",
      "Bareilly to Kainchi Dham",
      "Bareilly to Almora",
      "Bareilly to Ranikhet",
      "Bareilly to Pithoragarh",
      "Bareilly to Rudrapur",
      "Bareilly to Kashipur",
      "Bareilly to Sitarganj",
      "Bareilly to Khatima",
      "Bareilly to Banbasa",
      "Bareilly to Pilibhit",
      "Bareilly to Shahjahanpur",
      "Bareilly to Sitapur",
      "Bareilly to Lakhimpur",
      "Bareilly to Gola Gokarannath",
      "Bareilly to Badaun",
      "Bareilly to Aonla",
      "Bareilly to Kasganj",
      "Bareilly to Etah",
      "Bareilly to Moradabad",
      "Bareilly to Rampur",
      "Bareilly to Manona Dham",
      "Bareilly to Mayawati Ashram",
      "Bareilly to Agra",
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

// ---- Tour packages ----
export type TourGroup = { title: string; note: string; items: string[] };

export const oneWayTaxiRoutes = [
  "Delhi NCR",
  "Mumbai",
  "Pune",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Varanasi",
  "Prayagraj",
  "Agra",
  "Bareilly",
  "Haridwar",
  "Rishikesh",
  "Dehradun",
  "Kainchi Dham",
  "Ayodhya",
  "Nainital",
  "Mathura",
  "Vrindavan",
  "Khatu Shyam Ji",
  "Salasar Balaji",
  "Kota",
  "Udaipur",
  "Jodhpur",
  "Jaisalmer",
  "Jammu",
  "Amritsar",
  "Shimla",
  "Manali",
  "Banbasa",
  "Kanpur",
  "Gorakhpur",
  "Patna",
  "Khatima",
  "Pilibhit",
  "Shahjahanpur",
  "Sitapur",
  "Lakhimpur",
  "Gola Gokarannath",
  "Badaun",
  "Kasganj",
  "Etah",
  "Manona Dham",
  "Aonla",
  "Moradabad",
  "Rampur",
  "Rudrapur",
  "Kashipur",
  "Sitarganj",
  "Haldwani",
  "Kathgodam",
  "Almora",
  "Ranikhet",
  "Pithoragarh",
  "Sonprayag",
  "Gauri Fanta",
  "Gaya",
  "Gwalior",
  "Indore",
  "Mussoorie",
  "Vadodara",
  "Nagpur",
  "Bhopal",
  "Begusarai",
  "Bangalore",
  "Lansdowne",
  "Kurukshetra",
  "Patiala",
  "Chandigarh",
  "Kasauli",
  "Kalkaji",
  "Asansol",
  "Bilaspur",
  "Thane",
  "Navi Mumbai",
  "Chitrakoot",
  "Mayawati Ashram",
  "Gairsain",
  "Dhanaulti",
  "Kanatal",
  "Landour",
];

export const tourPackages: TourGroup[] = [
  {
    title: "Pilgrimage Tours",
    note: "Multi-day yatra packages with driver, stays planned around darshan timings.",
    items: [
      "Char Dham Yatra",
      "Kedarnath",
      "Badrinath",
      "Aadi Kailash & Om Parvat",
      "Haridwar & Rishikesh",
      "Kainchi Dham · Nainital · Mukteshwar · Jageshwar",
      "Ayodhya · Varanasi · Prayagraj · Naimisharanya",
      "Mathura · Vrindavan · Agra",
      "Mayawati Ashram",
    ],
  },
  {
    title: "Rajasthan Tour",
    note: "Temple towns, forts and desert cities on one circuit.",
    items: [
      "Khatu Shyam Ji",
      "Salasar Balaji",
      "Ajmer",
      "Pushkar Ji",
      "Jaipur",
      "Udaipur",
      "Jodhpur",
      "Jaisalmer",
      "Bikaner",
      "Mount Abu",
    ],
  },
  {
    title: "Himachal Tours",
    note: "Hill stations and valleys, from an easy weekend to a full Spiti loop.",
    items: [
      "Shimla",
      "Manali",
      "Dharamshala",
      "Dalhousie",
      "Khajjiar",
      "Kullu",
      "Kasol",
      "Bir Billing",
      "Tirthan Valley",
      "Spiti Valley",
    ],
  },
  {
    title: "Jammu & Kashmir Tours",
    note: "Srinagar, the valleys, and Katra for Vaishno Devi.",
    items: [
      "Dal Lake",
      "Mughal Gardens",
      "Gulmarg",
      "Pahalgam",
      "Sonmarg",
      "Yusmarg",
      "Doodhpathri",
      "Bhaderwah",
      "Patnitop",
      "Katra Vaishno Devi",
      "Jammu City",
    ],
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
    a: "The fare shown is an estimate based on the mapped distance, and is confirmed on the actual kilometres travelled. Toll and driver allowance are charged extra, and state entry permits on outstation routes are paid directly at the booth.",
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
  /** Substring of the title to render in the yellow .hi style. */
  titleHi?: string;
  /** Article body: section headings and paragraphs, in order. */
  content: PostBlock[];
};

/** One block of article body — a display heading or a paragraph. */
export type PostBlock = { h2: string } | { p: string };

// Article bodies, keyed by slug, so the post list above stays readable.
// A block is either a section heading or a paragraph — headings render in the
// site's Anton display style, paragraphs stay in readable Inter.
const postContent: Record<string, PostBlock[]> = {
  "rishikesh-cab-travel-guide-2025": [
    { p: "Rishikesh sits at the point where the Ganga finally leaves the hills and spreads into the plains, about 230 km from Delhi and 24 km upstream of Haridwar. The drive from Delhi takes five to six hours through Meerut and Muzaffarnagar; from Bareilly it is closer to 300 km via Moradabad and Najibabad. The town has two halves that first-time visitors often confuse — the older bazaar side around Triveni Ghat, and the ashram belt across the river at Swarg Ashram, reached over the footbridges." },
    { h2: "The aarti, and which one to pick" },
    { p: "There are two evening ceremonies and they are not the same experience. Triveni Ghat holds the larger, more formal Maha Aarti in the main town — crowded, ceremonial, close to the shops. Parmarth Niketan, on the Swarg Ashram bank below the Shiva statue, runs a quieter version led by the ashram's students, with more chanting and a better view of the river. Both start around sunset and both are free; arrive forty minutes early if you want to sit rather than stand." },
    { h2: "Rafting: the season and the stretches" },
    { p: "The rafting season runs from roughly mid-September to the end of June. Operators shut down through the monsoon, when the river runs too high for permits to be issued, so a July booking is not something any legitimate operator will take. Three standard runs cover most trips: Brahmapuri at 9 km is the gentle family option, Shivpuri at 16 km is the popular one with the bigger rapids, and Marine Drive at 26 km takes most of a day. Life jacket and helmet are mandatory, and most operators set a minimum age of fourteen." },
    { h2: "Yoga, ashrams and the drives around town" },
    { p: "The yoga reputation is not marketing. Parmarth Niketan and Sivananda Ashram run structured programmes, and the International Yoga Festival fills the town for a week each March. The Beatles Ashram — properly Chaurasi Kutia, inside the Rajaji reserve — is ticketed and worth an unhurried hour for the painted meditation domes. Two drives are worth the cab: Neelkanth Mahadev, 32 km up a tight winding road that takes about ninety minutes each way, and Kunjapuri Devi for the Himalayan sunrise, which means leaving town around 4:30 AM." },
    { p: "One practical note: Rishikesh is a designated holy city, so alcohol and meat are not sold within it, and Lakshman Jhula has been closed on safety grounds for several years — foot traffic now crosses at Ram Jhula and Janki Setu. February to April and September to November are the most comfortable months. A sedan is fine for the town itself; if Neelkanth or Kunjapuri are on your list, book an SUV through YantraCabs and keep the same driver for the whole trip rather than negotiating a local vehicle at each stop." },
  ],
  "delhi-to-jaipur-road-trip-guide": [
    { p: "Delhi to Jaipur is 270 km and used to be a five-hour commitment on NH-48 through Gurugram, Behror and Shahpura. The Sohna–Dausa section of the Delhi–Mumbai Expressway has changed that: taking the Sohna spur and rejoining NH-148N near Dausa, about 55 km short of Jaipur, brings the run down to roughly three and a half hours when traffic out of Delhi cooperates. The old highway is still the better choice if you want the dhaba stops at Behror, which the expressway skips entirely." },
    { h2: "Two days of forts, in the right order" },
    { p: "Amber Fort is the one everyone comes for, and it rewards an early arrival — gates open at eight, and the courtyards are pleasant for perhaps two hours before the tour buses land. Above it, Jaigarh holds the Jaivana cannon, and Nahargarh looks back over the whole city and is best kept for sunset. In the walled city itself, the City Palace, Jantar Mantar and Hawa Mahal sit within walking distance of one another; Hawa Mahal photographs best in the first hour of light, from the rooftop cafés directly opposite." },
    { h2: "Timing the visit" },
    { p: "October to March is the season, and January in particular — the weather is at its best and the Jaipur Literature Festival brings the city alive, though it also fills every hotel in the old quarter. April onward the temperature climbs past 40°C and the forts become genuinely hard work by midday. If you are travelling in the heat, front-load the sightseeing into the morning and keep the afternoon for the City Palace museums, which are shaded." },
    { h2: "Where the cab actually helps" },
    { p: "Jaipur is spread out in a way that catches people off guard. Amber is 11 km from the walled city, Nahargarh is a separate climb, and Chokhi Dhani sits 20 km south on the Tonk road. Parking near Hawa Mahal and Johari Bazaar is difficult and the streets around them are one-way in ways that are not obvious. Keeping a car and driver for two days costs less than the taxis and parking of doing it piecemeal, and it lets you finish at Nahargarh for sunset without worrying about the drive back down in the dark." },
    { p: "For a weekend, most travellers leave Delhi on Friday evening or early Saturday and start back by mid-afternoon Sunday to stay ahead of the returning traffic on NH-48. A sedan handles the route comfortably for four; a family of six with luggage is better in an SUV. YantraCabs runs Delhi–Jaipur as both a one-way drop and a full round trip with the car at your disposal in the city." },
  ],
  "udaipur-city-of-lakes-guide": [
    { p: "Udaipur earns its nickname honestly. The old city is built around Lake Pichola, with Fateh Sagar to the north and a ring of hills beyond, and the effect from almost any rooftop at dusk is the reason the city fills up every winter. It sits 400 km south-west of Jaipur — about six and a half hours via Ajmer and Bhilwara — and roughly 660 km from Delhi, which is a long day's drive and better broken overnight in Jaipur or Ajmer." },
    { h2: "The palace, and the ones people skip" },
    { p: "The City Palace is the largest palace complex in Rajasthan and takes a solid two hours; buy the museum ticket and go clockwise, ending at the Amar Vilas terrace. Jagdish Temple sits just outside the main gate and is easy to walk into on the way out. Two lesser-visited stops are worth the detour: Saheliyon ki Bari, a garden built for the queen's attendants with fountains that still run, and Bagore ki Haveli on Gangaur Ghat, where the evening folk dance and puppet show at seven is one of the few tourist performances in Rajasthan that is genuinely good." },
    { h2: "Sunset, and getting on the water" },
    { p: "Two options and both are worth doing on separate evenings. The boat ride from Rameshwar Ghat circles Lake Pichola and stops at Jag Mandir, and the last departure before sunset is the one to book. Sajjangarh — the Monsoon Palace — sits on a hilltop inside a wildlife sanctuary above the city, and the view down over both lakes at dusk is the better of the two. Private vehicles are not allowed past the sanctuary gate; you park and take the shuttle for the final climb." },
    { h2: "Day trips that justify a third night" },
    { p: "Kumbhalgarh is 85 km north, and its perimeter wall — the second longest in the world — runs for 36 km along the ridge. Pairing it with the Ranakpur Jain temple, with its 1,444 carved marble pillars, makes a full but manageable day out by road. Chittorgarh, 115 km east, is the alternative for anyone more interested in history than architecture, and works well as a stop on the way back towards Delhi." },
    { p: "October to March is the season; November and December are the best of it. Summer here is severe, and the city is worth avoiding entirely between May and mid-June unless you have air-conditioned plans. Sightseeing distances within Udaipur are short but the old city lanes are narrow and largely one-way, so a driver who knows where to drop and where to wait saves a lot of walking. YantraCabs covers the Jaipur–Udaipur leg and the Kumbhalgarh and Chittorgarh day trips as fixed-fare outstation runs." },
  ],
  "manali-road-trip-guide": [
    { p: "Manali is 530 km from Delhi, and no amount of expressway makes that a comfortable single push. The route runs Chandigarh, Bilaspur, Mandi and up the Beas valley, and takes twelve to fourteen hours depending on the Mandi stretch, which is the one that reliably slows down. Most people either drive through the night or, better, break the journey at Chandigarh or Mandi and arrive in daylight with the valley actually visible." },
    { h2: "Solang, Rohtang and the tunnel that changed things" },
    { p: "Solang Valley, 13 km from town, is the easy half-day — paragliding, the ropeway, and snow at the top end of the valley for much of the year. Rohtang Pass is the harder one: it needs a permit issued online, the daily vehicle quota is capped, and the pass is closed on Tuesdays for maintenance and through the winter, opening around May. Since the Atal Tunnel opened in 2020, you no longer need Rohtang at all to reach Lahaul — the 9 km tunnel puts you at Sissu in under an hour, stays open most of the year, and needs no permit. If your goal is snow and a view, Sissu is now the simpler trip." },
    { h2: "Old Manali and the temples" },
    { p: "Old Manali, a couple of kilometres uphill from the Mall, is the part of town worth the time — cafés along a single lane, orchards behind them, and the Manu Temple at the top. Hadimba Devi Temple, built in 1553 in cedar with a four-tiered pagoda roof, sits in a deodar grove ten minutes from the centre and is best seen early. Across the river, Vashisht has hot sulphur springs and a quieter set of guesthouses; Jogini Falls is a ninety-minute walk from there." },
    { h2: "Choosing your months" },
    { p: "March to June is the main season, when the valley is green and the passes are opening. October and November are the quiet reward — clear skies, sharp mountain views, thin crowds, and cold nights. December to February brings snow to Solang and the town itself, which is popular, but road closures beyond Manali are common and any Rohtang plan is off the table. July and August are best avoided; the Mandi–Kullu stretch is landslide-prone and the Beas runs high." },
    { p: "This is an SUV route, not a sedan one. Ground clearance matters on the Solang and Sissu roads, and the climb past Mandi is long enough that engine capacity is a comfort issue rather than a luxury. Book the Delhi–Manali run with YantraCabs as a multi-day round trip and keep the same driver for the local sightseeing — local taxi rates for Solang and the tunnel are charged per trip and add up quickly." },
  ],
  "leh-ladakh-road-trip-guide": [
    { p: "There are two ways to drive into Ladakh and the choice matters more than most itineraries admit. The Manali–Leh highway is 430 km over Baralacha La, Nakee La, Lachulung La and Tanglang La at 5,328 m, and it typically opens from late May to October. The Srinagar–Leh road is 434 km over Zoji La and Fotu La, opens earlier in the season, and — because it gains altitude gradually via Kargil — is far kinder to a body that has not been above 3,000 m before. If you can, drive up from Srinagar and return via Manali." },
    { h2: "Altitude is the whole trip" },
    { p: "Leh sits at 3,500 m and the standard advice is to do nothing at all for the first 48 hours. That is not a suggestion. Acute mountain sickness does not care about fitness, and the people who get into trouble are almost always the ones who landed at Leh airport and drove to Pangong the next morning. Spend two nights in Leh, drink far more water than feels reasonable, skip alcohol, and talk to a doctor about Diamox before you leave home. A headache that does not clear with rest and fluids means going down, not pushing on." },
    { h2: "Permits, and the taxi rule nobody mentions" },
    { p: "Nubra, Pangong, Tso Moriri and Hanle sit in protected areas. Indian travellers need an Inner Line Permit, applied for online and stamped at the Leh DC office; foreign nationals need a Protected Area Permit and cannot travel solo. Carry several photocopies — they are collected at checkposts. The second rule catches road-trippers out: vehicles registered outside the union territory are generally barred from local sightseeing circuits inside Ladakh, which are reserved for the Leh taxi union. In practice that means driving up in your own cab, then hiring locally for Pangong and Nubra." },
    { h2: "What the days actually look like" },
    { p: "Pangong Tso is five hours from Leh over Chang La at 5,360 m, and while it can be done as a long day, a night at Spangmik is the better version. Nubra is over Khardung La and deserves two days for the Diskit monastery, the Hunder dunes and Turtuk near the border. Around Leh itself: Thiksey monastery at dawn for the morning prayers, Hemis, Shanti Stupa at sunset, and the Hall of Fame museum. Mid-June to mid-September is the reliable window; Hemis festival falls in June or July." },
    { p: "Fuel stations are sparse past Keylong and Kargil, mobile coverage is postpaid-only across Ladakh, and cash matters where card machines have no signal. For the drive up from Delhi or Chandigarh, YantraCabs runs the Manali and Srinagar approaches as multi-day SUV bookings with drivers who have done the passes before — which, on a road with no margin for a wrong line at 5,000 m, is worth more than the vehicle." },
  ],
  "nainital-best-time-to-visit": [
    { p: "Most Nainital advice stops at how to get there. The more useful question is when to go, because the same town in April and in October is effectively two different trips — and the things worth doing shift with it. Here is the year, month by month, and what each season is actually good for." },
    { h2: "The four seasons, honestly" },
    { p: "March to June is the peak: daytime temperatures in the high teens to mid-twenties, boats on the lake, and the largest crowds of the year — the last two weeks of May are the busiest the town gets. July and August are the monsoon; the hills are green and the hotels are cheap, but landslides on the Kathgodam climb are a genuine risk and the views disappear behind cloud. September to November is the connoisseur's window, with the clearest air of the year and the Himalayan skyline visible from Snow View on most mornings. December to February drops to near freezing, brings occasional snow around late December and January, and empties the town out." },
    { h2: "Things worth doing, in order" },
    { p: "The lake first: the yellow-canopied rowboats run all day, and the hour before sunset is the one to take. Naina Devi temple sits at the northern end and is one of the fifty-one Shakti Peethas, which is why the town exists at all. The ropeway climbs to Snow View at 2,270 m in about three minutes; on a clear autumn morning you can pick out Nanda Devi and Trishul from the deck. Tiffin Top, also called Dorothy's Seat, is a four-kilometre walk or a short pony ride from Mall Road, and Naina Peak at 2,615 m is the longer version for anyone who wants the whole valley at once." },
    { h2: "Getting out of the town centre" },
    { p: "Nainital fills up, and the lakes around it do not. Sattal is a cluster of seven interconnected lakes half an hour away and is the best of them for birdwatching. Bhimtal is larger and quieter than Naini, Naukuchiatal has the boating without the bazaar, and Khurpatal is barely developed at all. Further out, Mukteshwar at 2,300 m has the better Himalayan view and Pangot is where serious birders stay. The High Altitude Zoo in town, with snow leopards and Siberian tigers, is closed on Mondays." },
    { p: "Two logistics worth knowing: Mall Road is closed to non-local vehicles during peak evening hours, and parking anywhere near the lake in season is a long exercise in patience — which is the practical case for arriving with a driver who can drop you at the boat stand and park elsewhere. Bareilly to Nainital is about 140 km and three and a half hours; YantraCabs runs it as a round trip with the car available for the Sattal and Mukteshwar days." },
  ],
  "shimla-travel-guide-by-cab": [
    { p: "Shimla is 350 km from Delhi and about seven hours by road via Ambala, Zirakpur and Kalka, with the last two hours climbing steadily through Solan. It was the summer capital of British India, which is why a Himachali hill town has a Gothic church, a Tudor-style library and a Scottish-baronial Viceregal Lodge sitting along a single ridge at 2,200 m." },
    { h2: "The Ridge, and the walk along it" },
    { p: "Everything in old Shimla happens on the Ridge and the Mall below it, and both are closed to vehicles — which is exactly why they are pleasant. Christ Church, built in 1857 and the second-oldest church in North India, anchors the eastern end. Scandal Point, the Gaiety Theatre and the Town Hall follow along the Mall. Above them, Jakhoo Temple sits at 2,455 m under a 108-foot Hanuman statue, twenty minutes up a steep path or a short ropeway ride; leave spectacles and food in the car, because the monkeys there are organised and unsentimental." },
    { h2: "The toy train, and whether it is worth it" },
    { p: "The Kalka–Shimla railway is a UNESCO World Heritage line: 96 km of narrow gauge, around a hundred tunnels and more than eight hundred bridges, climbing 1,500 m in about five hours. It is slower than the road and that is the point. The practical way to do it is one-way — take the train up from Kalka, have the cab meet you in Shimla, and drive back. Book the seat well ahead in season, since the Himalayan Queen and the Shivalik Deluxe sell out weeks in advance." },
    { h2: "Where to go when the Mall gets busy" },
    { p: "Kufri, 16 km out, is the standard excursion and is often more crowded than the town. Mashobra and Naldehra — the latter with a golf course laid out by Lord Curzon among deodars — are the calmer alternatives on the same road. Chail, 45 km away, has the world's highest cricket ground and a fraction of Shimla's traffic. The Viceregal Lodge, now the Indian Institute of Advanced Study, is worth the guided tour for the room where the Partition was negotiated; it closes on Mondays." },
    { p: "March to June and December to January are the two seasons, the first for weather and the second for snow. Avoid July to September, when the Solan stretch takes landslides. Vehicles cannot enter the Mall or Ridge at all, so you park at the Old Bus Stand or Lift area and take the historic lift up — one more reason a local driver is worth having. YantraCabs runs Delhi–Shimla as a round trip or a one-way drop if you are continuing to Manali." },
  ],
  "amritsar-golden-temple-cab-guide": [
    { p: "Amritsar is 450 km from Delhi on NH-44 through Panipat, Ludhiana and Jalandhar — seven to eight hours of largely four-lane driving. Nearly everyone comes for one building, and the Harmandir Sahib deserves the reputation. What most itineraries get wrong is the timing: the temple is open twenty-four hours, and the two hours it is at its best are ones that clash with an ordinary sightseeing schedule." },
    { h2: "Getting the Golden Temple right" },
    { p: "Go twice. Once late at night, when the Palki Sahib ceremony carries the Guru Granth Sahib to the Akal Takht and the crowd thins to a few hundred, and once before dawn for the Prakash ceremony bringing it back — roughly 4 to 5 AM depending on the season. Heads must be covered and shoes left at the free counters; scarves are handed out at the entrance if you do not have one. The langar serves free meals to tens of thousands of people a day in two enormous halls, and sitting through one is not a tourist activity so much as the point of the place." },
    { h2: "Jallianwala Bagh and the Partition Museum" },
    { p: "Jallianwala Bagh is a two-minute walk from the temple entrance, through the same narrow lane General Dyer's troops blocked in 1919. The bullet marks are still in the walls and the well is still there. Ten minutes further, in the old Town Hall, the Partition Museum is the more demanding of the two — an oral-history collection built largely from survivor testimony, and the only museum in the world dedicated to 1947. It closes on Mondays. Give both more time than the map suggests they need." },
    { h2: "Wagah, and the drive out" },
    { p: "The beating retreat ceremony at the Attari–Wagah border is 28 km west of the city and starts roughly two hours before sunset — around 5:15 PM in winter and 6:15 in summer. Leave the city by 3:30 PM regardless: seating is unreserved, security is thorough, bags are not allowed past the checkpoint, and carrying photo ID is mandatory. The drive back takes an hour in the post-ceremony traffic, which is worth accounting for if you have dinner plans." },
    { p: "October to March is the comfortable window; Baisakhi in April and Guru Nanak Jayanti in November fill the city and are extraordinary if you can find a room. Eat where the city eats — Amritsari kulcha for breakfast, the old dhabas around Lawrence Road for dinner. The walled city is closed to cars, so a driver who knows the drop points near Ghanta Ghar and where to wait during Wagah saves the day's worth of friction. YantraCabs runs Delhi–Amritsar as a one-way drop or a round trip with the Wagah run included." },
  ],
  "varanasi-ghats-travel-guide": [
    { p: "Varanasi is 320 km from Lucknow — about six hours now that the Purvanchal Expressway carries most of the distance — and 125 km from Prayagraj. It is one of the oldest continuously inhabited cities on earth, and it is organised entirely around the four-kilometre curve of the Ganga and the eighty-odd ghats stepping down to it. Nothing about it runs on a schedule that suits a two-hour visit." },
    { h2: "The two ends of the day" },
    { p: "Dawn on the water is the thing to do first. Boats leave from Assi Ghat around sunrise and drift north past Harishchandra and Manikarnika; the light on the west-facing ghats at that hour is the reason every photograph of this city looks the way it does. Assi Ghat also runs Subah-e-Banaras, a sunrise programme of aarti and classical music. In the evening, the Ganga Aarti at Dashashwamedh Ghat starts around a quarter to seven, and the practical way to see it is from a boat on the river rather than from the steps, where you will be standing behind several thousand people." },
    { h2: "The temple, the corridor and the lanes" },
    { p: "Kashi Vishwanath is one of the twelve Jyotirlingas, and since the corridor opened in 2021 the approach has changed completely — a broad walkway now connects the temple directly to Lalita Ghat, where before there was only a warren of lanes. Security is airport-grade and phones are not permitted inside; there are free lockers at the entrances. Around it, the old city is a maze that no car can enter. Vehicles stop at the Godowlia crossing and everything from there is on foot, which is the correct way to see it anyway." },
    { h2: "Sarnath, and a word about the burning ghats" },
    { p: "Sarnath is 10 km north, where the Buddha gave his first sermon after enlightenment. The Dhamek Stupa and the excavated monastery ruins take an hour, and the archaeological museum next door holds the Ashokan lion capital that became the national emblem; the museum is closed on Fridays. Back at the river, Manikarnika and Harishchandra are working cremation ghats. Photography there is prohibited and enforced, guides offering to take you closer for a donation should be declined, and the correct posture is to keep walking." },
    { p: "October to March is the season. Dev Deepawali on Kartik Purnima in November, when every ghat is lit with earthen lamps, is the most spectacular night of the Varanasi year and needs hotel bookings months ahead. Given that the old city is unreachable by car, the useful cab plan is a driver who drops at Godowlia or Assi, waits, and handles the Sarnath run separately — YantraCabs covers Varanasi from Lucknow, Prayagraj and Ayodhya as fixed-fare outstation routes." },
  ],
  "delhi-to-dehradun-cab-route-guide": [
    { p: "Delhi to Dehradun is a route that has genuinely changed. The old drive along NH-58 through Meerut, Muzaffarnagar, Roorkee and Haridwar ran 250 km and took six to seven hours, most of it in town traffic. The Delhi–Dehradun Expressway, running from Akshardham through Baghpat and Saharanpur, has cut that to roughly three hours on the completed sections — including a 12 km elevated stretch over the Rajaji forest belt built so the road does not cut the wildlife corridor." },
    { h2: "Which route to take, and when" },
    { p: "Take the expressway if speed is the point and you are heading straight to Dehradun or Mussoorie. Take the old NH-58 if Haridwar or Rishikesh is on the itinerary anyway — the detour is free that way, and Cheetal Grand at Khatauli is still the most reliable breakfast stop on the corridor. Ask your operator which sections of the expressway are open on your travel date; the project has been commissioned in phases, and a route that was partly under construction one month is fully open the next." },
    { h2: "Dehradun as a base, not a stop" },
    { p: "Most people treat Dehradun as a place they pass through on the way to Mussoorie, which is 35 km and an hour further up. It works better as a base. Rishikesh is 45 km away, Haridwar 55 km, and Jolly Grant airport sits between them. From a Dehradun hotel you can do Mussoorie one day and Rishikesh the next without repacking, usually at half the room rate of either." },
    { h2: "What to see in the Doon valley" },
    { p: "The Forest Research Institute campus is the surprise — a vast colonial building in red brick set in gardens, and the single most photographed structure in the city. Robber's Cave, locally Guchhupani, is a stream running through a narrow limestone gorge that you walk up through ankle-deep water. Mindrolling Monastery at Clement Town has one of the largest stupas in the world and a 35 m Buddha statue, and Tapkeshwar temple sits in a cave with water dripping onto the lingam. Paltan Bazaar handles the shopping." },
    { p: "Dehradun is comfortable most of the year, which is its advantage over the hill stations above it — February to June and September to November are the pick, and even the monsoon is manageable since the expressway does not take landslides the way the Mussoorie road does. A sedan is enough for the valley itself; add an SUV if Mussoorie or Chakrata is in the plan. YantraCabs runs Delhi–Dehradun as a one-way drop and as a multi-day round trip covering the Mussoorie and Rishikesh legs." },
  ],
  "bareilly-to-nainital-guide-2025": [
    { p: "Nainital sits about 140 km north of Bareilly, and on a clear morning the drive takes roughly three and a half hours. The road runs through Kichha and Haldwani before it starts to climb at Kathgodam, where the plains end and the Kumaon hills begin. Most of the journey is easy highway driving; the last 35 km is a steady ascent with tight bends that rewards an unhurried pace." },
    { h2: "The best months to travel" },
    { p: "March to June is the main window, when the plains are already uncomfortable and the lake district stays in the low twenties. September to November is the quieter alternative — the monsoon has cleared the air and the Himalayan peaks are visible from Snow View Point. July and August bring heavy rain and occasional landslides on the Kathgodam stretch; travel then only with a driver who knows the diversions." },
    { h2: "Planning the day" },
    { p: "Leave Bareilly by 6 AM if you want a full day. That gets you to Bhimtal for breakfast around 9, into Nainital before the day-tripper traffic builds, and leaves the afternoon free for a boat ride on the lake and the ropeway up to Snow View." },
    { p: "Parking inside Mall Road is limited and often closed to outside vehicles in peak season, which is one practical reason a cab with a local driver saves an hour of circling. Worth stopping for on the way: the Kumaon gate at Haldwani for local produce, Bhimtal for a quieter lake than Naini itself, and Naukuchiatal if you have an extra hour." },
    { h2: "Choosing your cab" },
    { p: "For a group of four, a sedan handles the route comfortably. Six or more, or a trip continuing to Mukteshwar or Ranikhet, is better served by an SUV — the extra ground clearance matters on the narrower hill roads beyond Nainital. On the return leg, most travellers prefer to start down by 4 PM; the descent after dark is manageable but slow." },
  ],
  "char-dham-yatra-2025": [
    { p: "The Char Dham circuit links four shrines in Uttarakhand — Yamunotri, Gangotri, Kedarnath and Badrinath — and is traditionally travelled west to east in that order. The full loop from Haridwar runs about 1,600 km and takes ten to twelve days at a sensible pace. Compressing it into under a week is possible but leaves no margin for weather, and the mountain roads punish a tight schedule." },
    { h2: "When the portals open" },
    { p: "The temples open in late April or early May, depending on the Hindu calendar, and close around Diwali. May, June, September and October are the practical windows. The monsoon months of July and August see frequent landslides on the Rishikesh–Rudraprayag corridor, and while the roads usually reopen within hours, a single slip can cost a day." },
    { h2: "The stretches you walk" },
    { p: "Two shrines need walking. Yamunotri is a 6 km climb from Janki Chatti, and Kedarnath is 16 km from Gaurikund — ponies and palanquins are available at both, and helicopter services run to Kedarnath from Phata and Sersi in season. Gangotri and Badrinath are reachable by road right up to the temple." },
    { h2: "Respecting the altitude" },
    { p: "Altitude is the part most first-time travellers underestimate. Badrinath sits above 3,100 m and Kedarnath above 3,500 m. Build in a night at a lower elevation before each, drink more water than feels necessary, and treat a persistent headache as a reason to descend rather than push on." },
    { p: "A Tempo Traveller suits groups of nine or more and gives space for the luggage a ten-day trip requires. Smaller families are usually more comfortable in an SUV, which handles the hairpins above Rudraprayag with less effort. In either case, a driver who has done the circuit before is worth more than the vehicle." },
  ],
  "delhi-to-agra-by-cab": [
    { p: "The Yamuna Expressway turned Delhi–Agra into a three-hour drive. The 165 km road is a controlled-access motorway with a 100 km/h limit for cars, and the toll for a one-way private car trip runs a few hundred rupees. Leaving Delhi before 7 AM avoids the Noida bottleneck and puts you at the Taj Mahal for the light most photographers prefer." },
    { h2: "The one rule that catches people out" },
    { p: "The Taj is closed on Fridays. That single fact derails more Agra day trips than traffic ever does. It opens from sunrise to sunset otherwise, and the ticket also gives a small discount on same-day entry to Agra Fort. Buy online in advance during the winter season, when the queue at the west gate can run to an hour." },
    { h2: "What else is worth your time" },
    { p: "Agra Fort deserves the two hours most itineraries do not give it. So does Itmad-ud-Daulah — the smaller tomb across the river often called the Baby Taj, which sees a fraction of the crowds. If you have a full day, Fatehpur Sikri sits 40 km further west and pairs naturally with the return leg." },
    { p: "For a view of the Taj without the queue, Mehtab Bagh on the opposite bank is at its best in the last hour before sunset. It is a ten-minute drive from the main complex and a good way to close the day before starting back." },
    { h2: "One-way or return?" },
    { p: "Most people do this as a day trip and are back in Delhi by 9 PM. A one-way drop makes sense only if you are continuing to Jaipur; for a return the same day, a round-trip booking works out cheaper. If you would rather not rush, an overnight stay lets you see the monument at sunrise, which is genuinely different from the mid-morning experience." },
  ],
  "best-hill-stations-near-delhi": [
    { p: "When the plains cross 40°C, the nearest real relief is a few hours north. These five hill stations are all within about 350 km of Delhi, which means a comfortable morning drive rather than an overnight journey." },
    { h2: "The easy two: Mussoorie and Nainital" },
    { p: "Mussoorie, 280 km out, is the most accessible. The drive via Dehradun is almost entirely four-lane, and at 2,000 m the town stays fifteen degrees cooler than Delhi. It is also the busiest — go midweek if you can. Nainital, at 300 km, trades some of that convenience for a lake and a quieter Mall Road, though it fills up on long weekends." },
    { h2: "For a longer drive: Shimla and Kasauli" },
    { p: "Shimla is 350 km and the longest of the five, but the Kalka stretch is scenic enough to justify it, and the Ridge is still one of the better places in North India to do nothing at all. Kasauli, an hour short of Shimla, is the alternative for anyone who wants pine forest without crowds — a cantonment town, small, and deliberately undeveloped." },
    { h2: "The quiet one: Lansdowne" },
    { p: "Lansdowne is the least known of the group and the shortest drive at 250 km. Because there is very little to do beyond walking, it tends to attract people who actually want rest rather than sightseeing." },
    { p: "Any of these works as a two-night trip. Leave Friday evening or early Saturday, and start back by mid-afternoon Sunday to stay ahead of the returning weekend traffic. A sedan is fine for Mussoorie and Nainital; for Shimla and Lansdowne the climbs are steeper and an SUV is the more comfortable choice." },
  ],
  "haridwar-rishikesh-by-cab": [
    { p: "Haridwar and Rishikesh sit 24 km apart on the Ganga, and while they are usually mentioned together, they are quite different places. Haridwar is the older pilgrimage city — dense, ceremonial, organised around the river. Rishikesh is quieter upstream, with ashrams, footbridges and, increasingly, rafting operators." },
    { h2: "The evening aarti" },
    { p: "The Ganga Aarti at Har Ki Pauri is the reason most people come to Haridwar, and it happens every evening around sunset. Arrive at least forty minutes early; the ghat fills quickly and the better vantage points go first. The ceremony lasts about half an hour and the crowd disperses slowly afterwards, so plan for a slow walk back to the vehicle." },
    { h2: "What to see in Rishikesh" },
    { p: "Triveni Ghat holds its own aarti in a calmer setting. Lakshman Jhula and Ram Jhula are the two suspension bridges worth crossing on foot, and the Beatles Ashram — properly the Maharishi Mahesh Yogi ashram — is now open to visitors and makes an unhurried hour." },
    { h2: "Timing your trip" },
    { p: "March and April are the most comfortable months, with September and October a close second once the monsoon has passed. Avoid the Kanwar Yatra period in Shravan, usually July or August, unless you are part of it — the highways around Haridwar are effectively closed to ordinary traffic for the duration." },
    { p: "From Delhi the drive is about 230 km and five hours; from Bareilly, roughly 300 km. Both cities are compact enough to see in two days, and the road between them is short enough that staying in one and visiting the other costs nothing in time." },
  ],
  "one-way-vs-round-trip": [
    { p: "The choice between a one-way drop and a round trip is mostly a question of whether the cab waits for you. On a one-way booking you pay for the distance you travel, and the operator takes on the risk of finding a return passenger. On a round trip you are paying for the vehicle and driver for the whole duration, including the time it sits parked." },
    { h2: "The two-day rule of thumb" },
    { p: "If you are coming back within two days, a round trip is almost always cheaper. Beyond that, the waiting cost outweighs the return fare, and two one-way bookings usually win. Bareilly to Nainital and back over a weekend is a round trip. Bareilly to Delhi for a week is two one-ways." },
    { h2: "Where one-way pricing wins" },
    { p: "One-way rates have a quiet advantage on popular corridors. Delhi–Agra, Delhi–Jaipur and Bareilly–Delhi carry enough traffic in both directions that operators can fill the return leg, which is why one-way fares on those routes are often close to half a round trip rather than the two-thirds you might expect elsewhere." },
    { h2: "When a round trip earns its cost" },
    { p: "Multi-stop travel is where paying for the wait makes sense. A hill itinerary taking in Nainital, Bhimtal and Mukteshwar over three days involves a lot of short hops and waiting, and rebooking a fresh cab at each stop is both more expensive and considerably more trouble." },
    { p: "One thing to confirm before booking either way: whether driver allowance, tolls and state entry permits are included. A quoted fare that excludes them can end up 15 to 20 percent higher than it first appears." },
  ],
  "mussoorie-travel-guide-2025": [
    { p: "Mussoorie sits at just over 2,000 m on a ridge above the Doon Valley, about 35 km beyond Dehradun. The approach climbs steadily for the last hour, and the first view of the valley opening out below is the reason people keep making the trip." },
    { h2: "Picking your season" },
    { p: "April to June is the main season, when the town is busy and the weather is at its best. September to November is the better choice for anyone who prefers space — the monsoon has cleared, the Himalayan skyline is sharp, and the hotels are cheaper. December and January bring occasional snow, which is popular but makes the upper roads slow." },
    { h2: "The walks worth doing" },
    { p: "Camel's Back Road is a three-kilometre walk with no traffic and the best sunset view in town. Gun Hill, reached by ropeway from Mall Road, gives the wider panorama on a clear day. Kempty Falls is the standard stop 15 km out and is usually crowded; Bhatta Falls nearby is smaller and considerably calmer." },
    { h2: "The part most visitors miss" },
    { p: "Landour, a short climb above Mussoorie, is a cantonment area with colonial-era buildings, a handful of good cafés at Char Dukan, and almost no traffic. If you have a spare morning, spend it there rather than on Mall Road." },
    { p: "From Delhi the drive is roughly 280 km and six hours; from Bareilly, about 380 km. Vehicles are restricted on parts of Mall Road during peak hours, so a driver who knows the parking arrangements will save you a lot of walking with luggage." },
  ],
  "jim-corbett-cab-guide": [
    { p: "Jim Corbett is India's oldest national park and the birthplace of Project Tiger, and it sits about 160 km from Bareilly — close enough for a weekend, far enough that the drive deserves an early start. The route runs through Kashipur and Ramnagar, and takes roughly four hours." },
    { h2: "Which zone can you enter?" },
    { p: "The park is divided into zones, and which one you can enter depends on the season and on how far ahead you book. Dhikala is the best known and requires an overnight stay inside the park; Bijrani and Jhirna are the usual day-safari zones. Jhirna and Dhela stay open through the year, while Dhikala and Bijrani close during the monsoon, roughly mid-June to mid-November." },
    { h2: "Booking the safari" },
    { p: "Safari permits are limited and released online in advance. In the winter season they routinely sell out weeks ahead, so book the permit before the accommodation. Morning safaris start around sunrise and afternoon slots run until dusk; the morning drive is generally better for sightings." },
    { h2: "When to visit" },
    { p: "November to February is the most comfortable period for weather. March to June is hotter but gives better odds of a tiger sighting, since the animals concentrate around the remaining water. Even then, treat a sighting as a bonus — the birdlife, the sal forest and the Ramganga riverbed make the trip worthwhile regardless." },
    { p: "Most lodges sit around Ramnagar and Dhikuli, within twenty minutes of the entry gates. An SUV is the sensible booking for this route: the last stretch to some of the resorts is unpaved, and the extra clearance matters after rain." },
  ],
};

export const posts: Post[] = [
  {
    slug: "rishikesh-cab-travel-guide-2025",
    title: "Rishikesh by Cab: Ganga Aarti, Rafting & Yoga",
    excerpt:
      "The Ganga leaves the hills at Rishikesh, and the town packs two evening aartis, a full rafting season and India's best-known ashrams into a few kilometres of riverbank.",
    category: "Pilgrimage",
    date: "December 18, 2025",
    read: "6 min",
    image: img.temple,
    titleHi: "Rafting & Yoga",
    content: postContent["rishikesh-cab-travel-guide-2025"],
  },
  {
    slug: "delhi-to-jaipur-road-trip-guide",
    title: "Delhi to Jaipur: The Pink City Road Trip",
    excerpt:
      "The new expressway has cut Delhi–Jaipur to about three and a half hours. Here's how to spend the two days you save — forts, timings and the drives that need a car.",
    category: "North India",
    date: "December 2, 2025",
    read: "6 min",
    image:
      "https://res.cloudinary.com/dtg3lepr4/image/upload/v1786517714/ChatGPT_Image_Aug_12_2026_12_24_58_PM_se6jlg.png",
    titleHi: "Road Trip",
    content: postContent["delhi-to-jaipur-road-trip-guide"],
  },
  {
    slug: "udaipur-city-of-lakes-guide",
    title: "Udaipur Travel Guide: The City of Lakes",
    excerpt:
      "Lake Pichola, the largest palace complex in Rajasthan, and a sunset from Sajjangarh — plus the Kumbhalgarh day trip that earns you a third night.",
    category: "Travel Guides",
    date: "November 14, 2025",
    read: "6 min",
    image: img.about,
    titleHi: "City of Lakes",
    content: postContent["udaipur-city-of-lakes-guide"],
  },
  {
    slug: "manali-road-trip-guide",
    title: "Manali Road Trip Guide: Solang & Old Manali",
    excerpt:
      "530 km from Delhi up the Beas valley. Where to break the drive, why the Atal Tunnel has made Rohtang optional, and which months actually work.",
    category: "Hill Stations",
    date: "October 28, 2025",
    read: "6 min",
    image:
      "https://res.cloudinary.com/dtg3lepr4/image/upload/v1786516883/ChatGPT_Image_Aug_12_2026_12_11_01_PM_yhhnp3.png",
    titleHi: "Old Manali",
    content: postContent["manali-road-trip-guide"],
  },
  {
    slug: "leh-ladakh-road-trip-guide",
    title: "Leh–Ladakh Road Trip Guide: Passes & Pangong",
    excerpt:
      "Two roads lead into Ladakh and the choice decides how well you handle the altitude. Permits, acclimatisation, the local taxi rule, and how to plan Pangong and Nubra.",
    category: "Travel Guides",
    date: "October 6, 2025",
    read: "7 min",
    image: img.mountains,
    titleHi: "Passes & Pangong",
    content: postContent["leh-ladakh-road-trip-guide"],
  },
  {
    slug: "nainital-best-time-to-visit",
    title: "Best Time to Visit Nainital & Things to Do",
    excerpt:
      "The same hill town is a different trip in April and in October. A month-by-month look at Nainital's seasons, and what each one is actually good for.",
    category: "Hill Stations",
    date: "September 20, 2025",
    read: "6 min",
    image: img.nainital,
    titleHi: "Things to Do",
    content: postContent["nainital-best-time-to-visit"],
  },
  {
    slug: "shimla-travel-guide-by-cab",
    title: "Shimla by Cab: The Ridge & the Toy Train",
    excerpt:
      "Seven hours from Delhi to the summer capital of British India — Christ Church, Jakhoo, the UNESCO railway from Kalka, and where to escape the Mall.",
    category: "Hill Stations",
    date: "September 2, 2025",
    read: "6 min",
    image: img.hills,
    titleHi: "the Toy Train",
    content: postContent["shimla-travel-guide-by-cab"],
  },
  {
    slug: "amritsar-golden-temple-cab-guide",
    title: "Amritsar by Cab: Golden Temple & Wagah Border",
    excerpt:
      "The Harmandir Sahib is at its best at times no ordinary itinerary allows for. Here's how to time the temple, Jallianwala Bagh and the border ceremony.",
    category: "Pilgrimage",
    date: "August 12, 2025",
    read: "6 min",
    image: img.yellowCab,
    titleHi: "Wagah Border",
    content: postContent["amritsar-golden-temple-cab-guide"],
  },
  {
    slug: "varanasi-ghats-travel-guide",
    title: "Varanasi by Cab: The Ghats, Aarti & Sarnath",
    excerpt:
      "Eighty-odd ghats along a four-kilometre curve of the Ganga. Sunrise on the water, the evening aarti from a boat, and how to handle a city no car can enter.",
    category: "Pilgrimage",
    date: "July 24, 2025",
    read: "6 min",
    image:
      "https://res.cloudinary.com/dtg3lepr4/image/upload/v1786518719/ChatGPT_Image_Aug_12_2026_12_41_43_PM_g2ixhx.png",
    titleHi: "Aarti & Sarnath",
    content: postContent["varanasi-ghats-travel-guide"],
  },
  {
    slug: "delhi-to-dehradun-cab-route-guide",
    title: "Delhi to Dehradun: The Expressway Route",
    excerpt:
      "The new expressway has halved this drive. Which route to take, why Dehradun works better as a base than a stop, and what to see in the Doon valley.",
    category: "Route Tips",
    date: "June 30, 2025",
    read: "5 min",
    image: img.road,
    titleHi: "Expressway Route",
    content: postContent["delhi-to-dehradun-cab-route-guide"],
  },
  {
    slug: "bareilly-to-nainital-guide-2025",
    title: "Bareilly to Nainital by Cab: The Ultimate Travel Guide 2025",
    excerpt:
      "Planning a trip from Bareilly to Nainital? Discover the scenic 140 km route, best time to visit, must-see stops, and why a cab is the most comfortable way to reach the Queen of Hills.",
    category: "Hill Stations",
    date: "April 15, 2025",
    read: "5 min read",
    image: img.nainital,
    featured: true,
    titleHi: "Travel Guide 2025",
    content: postContent["bareilly-to-nainital-guide-2025"],
  },
  {
    slug: "char-dham-yatra-2025",
    title: "Char Dham Yatra 2025: Complete Cab Travel Guide from North India",
    excerpt:
      "Embark on the sacred Char Dham Yatra — Yamunotri, Gangotri, Kedarnath, and Badrinath — with complete route details and best times to travel.",
    category: "Pilgrimage",
    date: "March 28, 2025",
    read: "7 min",
    image:
      "https://res.cloudinary.com/dtg3lepr4/image/upload/v1786518634/ChatGPT_Image_Aug_12_2026_12_40_17_PM_w9aqpu.png",
    titleHi: "from North India",
    content: postContent["char-dham-yatra-2025"],
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
    titleHi: "Along the Way",
    content: postContent["delhi-to-agra-by-cab"],
  },
  {
    slug: "best-hill-stations-near-delhi",
    title: "5 Best Hill Stations Near Delhi for a Weekend Cab Getaway",
    excerpt:
      "When the heat of the plains gets unbearable, these 5 hill stations within 350 km of Delhi offer cool relief — all easily reachable by cab.",
    category: "Hill Stations",
    date: "February 20, 2025",
    read: "5 min",
    image:
      "https://res.cloudinary.com/dtg3lepr4/image/upload/v1786516883/ChatGPT_Image_Aug_12_2026_12_11_01_PM_yhhnp3.png",
    titleHi: "Cab Getaway",
    content: postContent["best-hill-stations-near-delhi"],
  },
  {
    slug: "haridwar-rishikesh-by-cab",
    title: "Haridwar & Rishikesh by Cab: A Complete Travel Guide from North India",
    excerpt:
      "Two of India's most sacred cities sit just 24 km apart on the banks of the Ganga. Here's how to plan the perfect cab trip to Haridwar.",
    category: "Pilgrimage",
    date: "February 5, 2025",
    read: "5 min",
    image:
      "https://res.cloudinary.com/dtg3lepr4/image/upload/v1786518634/ChatGPT_Image_Aug_12_2026_12_40_17_PM_w9aqpu.png",
    titleHi: "from North India",
    content: postContent["haridwar-rishikesh-by-cab"],
  },
  {
    slug: "one-way-vs-round-trip",
    title: "One-Way vs Round-Trip Cab: Which is Better for Your Budget?",
    excerpt:
      "Should you book a one-way cab or a round-trip? The answer depends on your trip length, flexibility, and how you plan to travel.",
    category: "Route Tips",
    date: "January 22, 2025",
    read: "4 min",
    image: img.oneWay,
    titleHi: "for Your Budget?",
    content: postContent["one-way-vs-round-trip"],
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
    titleHi: "There by Cab",
    content: postContent["mussoorie-travel-guide-2025"],
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
    titleHi: "from Bareilly",
    content: postContent["jim-corbett-cab-guide"],
  },
];

// Derived from the posts above, so counts can never drift out of sync — add a
// post and its category tally updates everywhere the list is rendered.
export const blogCategories = Array.from(
  posts.reduce((map, post) => {
    map.set(post.category, (map.get(post.category) ?? 0) + 1);
    return map;
  }, new Map<string, number>())
).map(([name, count]) => ({ name, count }));

// ---- Reviews ----
export const reviews = [
  {
    name: "Meera Nair",
    text: "YantraCabs is the best cab service for outstation travel. Professional drivers, clean vehicles, and transparent pricing.",
    trip: "Bareilly → Nainital",
  },
  {
    name: "Karan Mehta",
    text: "Booked a Sedan for a family trip. Everything was perfect — clean car, polite driver, and no surprises on the bill.",
    trip: "Delhi → Agra",
  },
  {
    name: "Sunita Verma",
    text: "YantraCabs made our pilgrimage trip so comfortable. The Tempo Traveller was in great condition and the driver was wonderful.",
    trip: "Haridwar → Rishikesh",
  },
];

