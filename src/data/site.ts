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
    slug: "bareilly-to-nainital-guide-2025",
    title: "Bareilly to Nainital by Cab: The Ultimate Travel Guide 2025",
    excerpt:
      "Planning a trip from Bareilly to Nainital? Discover the scenic 140 km route, best time to visit, must-see stops, and why a cab is the most comfortable way to reach the Queen of Hills.",
    category: "Hill Stations",
    date: "April 15, 2025",
    read: "5 min read",
    image: img.mountains,
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
    image: img.hills,
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
    image: img.nainital,
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
    image: img.temple,
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
    image: img.wheel,
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
