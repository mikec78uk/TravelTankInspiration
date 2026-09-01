/* =========================================================
   TravelTank — Inspiration wireframes
   Indicative demo data. All prices are placeholders in NGN
   for wireframe purposes only — not live pricing.
   ========================================================= */

const WHO = [
  {id:'solo',   label:'Just me'},
  {id:'couple', label:'Two of us'},
  {id:'family', label:'Family'},
  {id:'friends',label:'Friends'}
];

const VIBES = [
  {id:'beach',    label:'Beach & chill'},
  {id:'city',     label:'City & culture'},
  {id:'adventure',label:'Adventure'},
  {id:'wildlife', label:'Wildlife & nature'},
  {id:'food',     label:'Food & nightlife'},
  {id:'romance',  label:'Romance'},
  {id:'family',   label:'Family fun'},
  {id:'wellness', label:'Wellness & rest'}
];

const BUDGETS = [
  {id:1,label:'Easy on the wallet'},
  {id:2,label:'Comfortable'},
  {id:3,label:'Go all out'}
];

const FLIGHTS = [
  {id:3, label:'Quick hop (under 3h)'},
  {id:6, label:'Up to 6 hours'},
  {id:10,label:'Up to 10 hours'},
  {id:99,label:'Anywhere on earth'}
];

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const MONTHS_FULL = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const VISA_LABEL = {free:'Visa-free','on-arrival':'Visa on arrival',easy:'Easy e-visa',required:'Visa required'};

/* ---------------------------------------------------------
   Destinations
   budget: 1 easy / 2 comfortable / 3 go all out
   pace:   1 very slow … 5 relentless
   --------------------------------------------------------- */
const DEST = [

{ id:'accra', name:'Accra & Cape Coast', country:'Ghana', hours:1, budget:1, visa:'free',
  months:[1,2,3,7,8,11,12], vibes:['city','food','adventure'], who:['solo','couple','friends','family'],
  offbeat:false, heat:'warm', pace:3,
  blurb:'Ghana’s capital is a short hop along the coast and an easy first trip abroad — no visa, no jet lag, no long-haul recovery day. Accra runs on live highlife, a serious restaurant scene and a beachfront that fills up on Sundays. Two hours west, Cape Coast and Elmina hold the slave-trade castles, a canopy walkway through Kakum rainforest, and a stretch of Atlantic beach that empties out midweek.',
  why:'Accra is the lowest-friction trip on this list. You are in the air barely an hour, the passport does nothing, and a long weekend genuinely works. The city carries a night out, and Cape Coast gives the trip something to remember it by.',
  tip:'Do Cape Coast as an overnight, not a day trip — the road back to Accra after dark is the one part of this trip nobody enjoys.',
  flights:[
    {carrier:'Africa World Airlines', route:'LOS → ACC', dur:'1h 05m', stops:'Direct', price:186000, note:'Cheapest — hand baggage only'},
    {carrier:'Air Peace',             route:'LOS → ACC', dur:'1h 10m', stops:'Direct', price:224000, note:'Best value — 23kg included'},
    {carrier:'Ethiopian Airlines',    route:'LOS → ACC', dur:'1h 05m', stops:'Direct', price:298000, note:'Most flexible — free date change'}
  ],
  hotels:{
    low:[{n:'Sleepy Hollow Lodge',area:'East Legon',stars:3,board:'Room only',night:52000,note:'Quiet residential street, 15 min to the beach'},
         {n:'Coconut Grove Beach',area:'Elmina',stars:3,board:'Breakfast',night:64000,note:'Right on the sand at Cape Coast'}],
    mid:[{n:'Villa Monticello',area:'Airport Residential',stars:4,board:'Breakfast',night:138000,note:'Boutique, walkable to restaurants'},
         {n:'Labadi Beach Hotel',area:'Labadi',stars:4,board:'Breakfast',night:172000,note:'Beachfront, pool, the reliable choice'}],
    high:[{n:'Kempinski Gold Coast City',area:'Ridge',stars:5,board:'Breakfast',night:326000,note:'The best rooms in Accra, big spa'},
          {n:'Mövenpick Ambassador',area:'Ridge',stars:5,board:'Half board',night:298000,note:'Central, garden pool, strong service'}]
  }},

{ id:'dakar', name:'Dakar & Saly', country:'Senegal', hours:6, budget:2, visa:'free',
  months:[11,12,1,2,3,4,5], vibes:['beach','food','city','adventure'], who:['couple','friends','solo'],
  offbeat:true, heat:'warm', pace:3,
  blurb:'Senegal sits on the far western edge of the continent and feels different from the moment you land — francophone, Atlantic-facing, mbalax playing out of every second doorway. Dakar itself is a working city on a peninsula, with Gorée Island a short ferry ride offshore. An hour south, the Petite Côte at Saly turns into proper beach country: warm water, low-rise hotels and almost no crowds outside French school holidays.',
  why:'Somewhere most people you know have not been, without being difficult. Visa-free, three hours in the air, and the mix of a real city plus a genuine beach week is unusual at this distance.',
  tip:'Take the first ferry to Gorée. By eleven the day-trippers land and the whole island changes character.',
  flights:[
    {carrier:'ASKY Airlines',      route:'LOS → LFW → DSS', dur:'7h 40m', stops:'1 stop', price:312000, note:'Cheapest — long layover in Lomé'},
    {carrier:'Air Côte d’Ivoire', route:'LOS → ABJ → DSS', dur:'6h 15m', stops:'1 stop', price:398000, note:'Best value'},
    {carrier:'Royal Air Maroc',    route:'LOS → CMN → DSS', dur:'9h 30m', stops:'1 stop', price:465000, note:'Most comfortable aircraft'}
  ],
  hotels:{
    low:[{n:'Hôtel Le Djoloff',area:'Fann, Dakar',stars:3,board:'Breakfast',night:58000,note:'Small, arty, rooftop terrace'},
         {n:'Résidence Les Filaos',area:'Saly',stars:3,board:'Room only',night:71000,note:'Self-catering, 5 min walk to sand'}],
    mid:[{n:'Pullman Dakar Teranga',area:'Plateau, Dakar',stars:4,board:'Breakfast',night:164000,note:'Ocean-facing, walk to the ferry'},
         {n:'Lamantin Beach Resort',area:'Saly',stars:4,board:'Half board',night:196000,note:'Beachfront, good pool, quiet'}],
    high:[{n:'Radisson Blu Dakar',area:'Corniche Ouest',stars:5,board:'Breakfast',night:342000,note:'Cliffside pool over the Atlantic'},
          {n:'Riu Baobab',area:'Pointe Sarène',stars:5,board:'All inclusive',night:428000,note:'All-in, adults-only wing available'}]
  }},

{ id:'doha', name:'Doha', country:'Qatar', hours:7, budget:2, visa:'free',
  months:[1,2,3,4,5,11,12], vibes:['city','food','family','romance'], who:['couple','family','solo','friends'],
  offbeat:false, heat:'hot', pace:3,
  blurb:'Already well known as a business destination, Doha has turned into a genuine short-break city. Qatar packs a lot into a small country: the Museum of Islamic Art, the restored alleys of Souq Waqif, coastal forts and desert dunes, mangrove lagoons and an inland sea you can reach and return from inside a day — all within an hour of the airport.',
  why:'Doha rewards a short, focused trip. The Museum of Islamic Art is genuinely world-class, Souq Waqif is atmospheric in a way Gulf malls are not, and the inland sea is an easy half-day. Calmer, cheaper and far less exhausting than Dubai — three or four nights rather than a fortnight.',
  tip:'For an amazing view head to the Museum of Islamic Art at dusk, with the whole skyline lit up behind it.',
  flights:[
    {carrier:'Qatar Airways', route:'LOS → DOH', dur:'6h 55m', stops:'Direct', price:420000, note:'Cheapest — overnight outbound'},
    {carrier:'Qatar Airways', route:'LOS → DOH', dur:'6h 55m', stops:'Direct', price:512000, note:'Best value — daytime, 30kg'},
    {carrier:'Turkish Airlines', route:'LOS → IST → DOH', dur:'13h 20m', stops:'1 stop', price:468000, note:'Cheaper cabin bag fare, long day'}
  ],
  hotels:{
    low:[{n:'Premier Inn Doha Education City',area:'Al Rayyan',stars:3,board:'Room only',night:61000,note:'Metro on the doorstep'},
         {n:'Al Najada by Tivoli',area:'Msheireb',stars:3,board:'Breakfast',night:88000,note:'Walk to Souq Waqif'}],
    mid:[{n:'Alwadi Hotel MGallery',area:'Msheireb Downtown',stars:4,board:'Breakfast',night:158000,note:'Best located mid-range in the city'},
         {n:'Banana Island Anantara',area:'Banana Island',stars:4,board:'Half board',night:242000,note:'20-min ferry, beach and lagoon'}],
    high:[{n:'Mandarin Oriental Doha',area:'Msheireb',stars:5,board:'Breakfast',night:486000,note:'Rooftop pool, the best service in town'},
          {n:'The Chedi Katara',area:'Katara',stars:5,board:'Breakfast',night:624000,note:'Private beach, very quiet'}]
  }},

{ id:'marrakech', name:'Marrakech', country:'Morocco', hours:8, budget:2, visa:'easy',
  months:[3,4,5,9,10,11], vibes:['city','food','romance','wellness','adventure'], who:['couple','friends','solo'],
  offbeat:false, heat:'warm', pace:4,
  blurb:'Marrakech is a walled medina wrapped around a thousand-year-old market, with the High Atlas visible over the rooftops on a clear morning. The old city is dense and loud; step through an unmarked door and you are in a riad courtyard with a plunge pool and total silence. Beyond the walls sit the Agafay rock desert, the Ourika valley and Berber villages an hour into the mountains.',
  why:'The contrast is the entire appeal — chaos and calm inside the same fifteen seconds. Four nights feels like a week, the flight is manageable, and it is the cheapest way to feel genuinely far from home.',
  tip:'Book a guide for your first walk through the souk and then go back alone the next day. You need one to learn the shape of it and the other to enjoy it.',
  flights:[
    {carrier:'Royal Air Maroc', route:'LOS → CMN → RAK', dur:'9h 05m', stops:'1 stop', price:472000, note:'Cheapest — short Casablanca connection'},
    {carrier:'Royal Air Maroc', route:'LOS → CMN → RAK', dur:'7h 30m', stops:'1 stop', price:558000, note:'Best value — fastest connection, 23kg'},
    {carrier:'Air France',      route:'LOS → CDG → RAK', dur:'14h 10m', stops:'1 stop', price:690000, note:'Most comfortable, long routing'}
  ],
  hotels:{
    low:[{n:'Riad Dar Anika',area:'Medina',stars:3,board:'Breakfast',night:47000,note:'Six rooms, rooftop breakfast'},
         {n:'Riad Le Jardin d’Abdou',area:'Kasbah',stars:3,board:'Breakfast',night:63000,note:'Courtyard pool, quiet corner'}],
    mid:[{n:'El Fenn',area:'Medina, near Bab Laksour',stars:4,board:'Breakfast',night:214000,note:'The design riad everyone copies'},
         {n:'Les Jardins de la Koutoubia',area:'Medina',stars:4,board:'Breakfast',night:168000,note:'Two pools, 3 min to Jemaa el-Fnaa'}],
    high:[{n:'La Mamounia',area:'Hivernage edge',stars:5,board:'Breakfast',night:892000,note:'The famous one. Gardens, spa, worth a night'},
          {n:'Royal Mansour',area:'Medina walls',stars:5,board:'Breakfast',night:1480000,note:'Private riads, absurd and unforgettable'}]
  }},

{ id:'cairo', name:'Cairo & the Nile', country:'Egypt', hours:6, budget:2, visa:'easy',
  months:[10,11,12,1,2,3,4], vibes:['city','city','adventure','food'], who:['couple','family','friends','solo'],
  offbeat:false, heat:'warm', pace:4,
  blurb:'Cairo is twenty million people, a river running through the middle, and the last surviving wonder of the ancient world sitting at the edge of the suburbs. The Grand Egyptian Museum finally opened alongside the pyramids at Giza. South of the city the Nile narrows into the classic route — Luxor’s temples and tombs, Aswan’s cataracts — usually done as a three or four-night sail.',
  why:'Nowhere else gives you this much history for the money. A week splits neatly: three nights in Cairo for the museum and Giza, then the Nile leg where somebody else does the driving.',
  tip:'Give the Grand Egyptian Museum a full day and go on your first morning, before Giza. Everything you then see at the pyramids makes far more sense.',
  flights:[
    {carrier:'EgyptAir',        route:'LOS → CAI', dur:'5h 45m', stops:'Direct', price:438000, note:'Cheapest — direct, hand baggage only'},
    {carrier:'EgyptAir',        route:'LOS → CAI', dur:'5h 45m', stops:'Direct', price:524000, note:'Best value — direct with 23kg'},
    {carrier:'Ethiopian Airlines',route:'LOS → ADD → CAI', dur:'11h 55m', stops:'1 stop', price:462000, note:'Cheaper checked-bag fare, long day'}
  ],
  hotels:{
    low:[{n:'Pyramids View Inn',area:'Giza',stars:3,board:'Breakfast',night:44000,note:'Rooftop faces the pyramids. That is the point'},
         {n:'Osiris Hotel Cairo',area:'Downtown',stars:3,board:'Room only',night:51000,note:'Old-Cairo building, walk to the museum'}],
    mid:[{n:'Steigenberger El Tahrir',area:'Downtown',stars:4,board:'Breakfast',night:126000,note:'Central, reliable, good breakfast'},
         {n:'Sonesta St George (Nile cruise)',area:'Luxor → Aswan',stars:4,board:'Full board',night:188000,note:'4 nights sailing, all meals'}],
    high:[{n:'Marriott Mena House',area:'Giza',stars:5,board:'Breakfast',night:398000,note:'Pyramid-view rooms from the garden wing'},
          {n:'Oberoi Philae (Nile cruise)',area:'Luxor → Aswan',stars:5,board:'Full board',night:512000,note:'The best boat on the river'}]
  }},

{ id:'capeverde', name:'Cape Verde', country:'Sal & Boa Vista', hours:12, budget:2, visa:'easy',
  months:[11,12,1,2,3,4,5,6], vibes:['beach','wellness','adventure','romance'], who:['couple','family','friends'],
  offbeat:true, heat:'warm', pace:1,
  blurb:'A scatter of volcanic islands 500km off the Senegalese coast, with year-round sunshine and almost no rain. Sal and Boa Vista are the beach islands — long empty Atlantic strands, whitewashed fishing towns and a Creole-Portuguese culture with its own music. The wind is reliable enough that kitesurfers plan their year around it, and the turtle nesting season on Boa Vista runs through the summer.',
  why:'The Atlantic beach week almost nobody from Lagos has done. Same latitude band, similar water, a fraction of the Indian Ocean’s flight time and cost — and it is genuinely quiet outside European half-term.',
  tip:'Boa Vista is the emptier of the two islands. If you want a beach with nobody on it, go there and skip Sal entirely.',
  flights:[
    {carrier:'TAP Air Portugal',route:'LOS → LIS → SID', dur:'14h 20m', stops:'1 stop', price:516000, note:'Cheapest — overnight in transit'},
    {carrier:'Royal Air Maroc', route:'LOS → CMN → SID', dur:'11h 45m', stops:'1 stop', price:598000, note:'Best value — shortest routing'},
    {carrier:'TAP Air Portugal',route:'LOS → LIS → BVC', dur:'13h 05m', stops:'1 stop', price:664000, note:'Straight to Boa Vista'}
  ],
  hotels:{
    low:[{n:'Ponta Preta Guesthouse',area:'Santa Maria, Sal',stars:3,board:'Room only',night:49000,note:'Two streets back from the beach'},
         {n:'Casa Beramar',area:'Sal Rei, Boa Vista',stars:3,board:'Breakfast',night:57000,note:'Small, family-run, good local food'}],
    mid:[{n:'Hotel Morabeza',area:'Santa Maria, Sal',stars:4,board:'Breakfast',night:152000,note:'The original Sal hotel, right on the sand'},
         {n:'Iberostar Boa Vista',area:'Praia de Chaves',stars:4,board:'All inclusive',night:214000,note:'All-in on an enormous empty beach'}],
    high:[{n:'Hilton Cabo Verde Sal',area:'Santa Maria',stars:5,board:'Half board',night:298000,note:'Adults-only wing, best pool on Sal'},
          {n:'Riu Palace Boavista',area:'Praia de Chaves',stars:5,board:'All inclusive',night:352000,note:'Top-end all-in, swim-up rooms'}]
  }},

{ id:'zanzibar', name:'Zanzibar', country:'Tanzania', hours:10, budget:2, visa:'on-arrival',
  months:[6,7,8,9,10,1,2], vibes:['beach','romance','wellness','food'], who:['couple','solo','friends','family'],
  offbeat:false, heat:'hot', pace:1,
  blurb:'An island off the Tanzanian coast with a UNESCO-listed old town at one end and some of the Indian Ocean’s best beaches at the other. Stone Town is a maze of carved doors, spice markets and Swahili rooftop restaurants. An hour north, the tide behaves, the water turns a colour that does not photograph properly, and the days lose their shape entirely.',
  why:'Zanzibar does what most beach destinations only promise — genuinely restful without being dull. Two days of Stone Town, then five of doing nothing. And it costs meaningfully less than Mauritius or the Seychelles for the same water.',
  tip:'Stay north at Nungwi or Kendwa. Almost everywhere else on the island, the tide goes out far enough that you cannot swim for half the day.',
  flights:[
    {carrier:'Ethiopian Airlines',route:'LOS → ADD → ZNZ', dur:'12h 40m', stops:'1 stop', price:678000, note:'Cheapest — long Addis layover'},
    {carrier:'Kenya Airways',     route:'LOS → NBO → ZNZ', dur:'9h 55m',  stops:'1 stop', price:742000, note:'Best value — tight connection'},
    {carrier:'Qatar Airways',     route:'LOS → DOH → ZNZ', dur:'16h 30m', stops:'1 stop', price:928000, note:'Most comfortable, longest routing'}
  ],
  hotels:{
    low:[{n:'Lost & Found Hostel',area:'Stone Town',stars:2,board:'Breakfast',night:38000,note:'Private doubles available, great location'},
         {n:'Amaan Bungalows',area:'Nungwi',stars:3,board:'Breakfast',night:66000,note:'Simple, right at the north tip'}],
    mid:[{n:'Emerson on Hurumzi',area:'Stone Town',stars:4,board:'Breakfast',night:148000,note:'Rooftop dinner is a Zanzibar institution'},
         {n:'Zuri Zanzibar',area:'Kendwa',stars:4,board:'Half board',night:246000,note:'Design-led, big beach, good spa'}],
    high:[{n:'Park Hyatt Zanzibar',area:'Stone Town seafront',stars:5,board:'Breakfast',night:392000,note:'Best rooms in the old town'},
          {n:'&Beyond Mnemba Island',area:'Mnemba Atoll',stars:5,board:'All inclusive',night:1420000,note:'Ten bandas on a private island'}]
  }},

{ id:'capetown', name:'Cape Town', country:'South Africa', hours:11, budget:2, visa:'required',
  months:[11,12,1,2,3], vibes:['city','adventure','wildlife','food','romance'], who:['couple','friends','solo','family'],
  offbeat:false, heat:'warm', pace:4,
  blurb:'A city built around a mountain, with penguins on one side, vineyards on the other and two oceans meeting at the bottom of the peninsula. Cape Town does city break, beach day, serious hiking and world-ranked restaurants inside the same week — and the exchange rate does a great deal of the work. Summer runs November to March, which is when you most want to be somewhere else.',
  why:'The rare place that satisfies four different travellers at once. One wants a city, one wants a beach, one wants a mountain and the fourth wants a tasting menu — all four get their way, usually before lunch.',
  tip:'Book Table Mountain for your first clear morning, not for a fixed day. The cloud decides this trip, not your itinerary.',
  flights:[
    {carrier:'Ethiopian Airlines',route:'LOS → ADD → CPT', dur:'15h 10m', stops:'1 stop', price:614000, note:'Cheapest — long layover'},
    {carrier:'Kenya Airways',     route:'LOS → NBO → CPT', dur:'13h 25m', stops:'1 stop', price:706000, note:'Best value'},
    {carrier:'South African Airways',route:'LOS → JNB → CPT', dur:'10h 40m', stops:'1 stop', price:838000, note:'Fastest — shortest total journey'}
  ],
  hotels:{
    low:[{n:'Never at Home Green Point',area:'Green Point',stars:3,board:'Room only',night:46000,note:'Private rooms, walk to the promenade'},
         {n:'The B.I.G. Backpackers',area:'City Bowl',stars:3,board:'Breakfast',night:54000,note:'Mountain views from the roof deck'}],
    mid:[{n:'The Bay Hotel',area:'Camps Bay',stars:4,board:'Breakfast',night:186000,note:'Across the road from Camps Bay beach'},
         {n:'Gorgeous George',area:'City Bowl',stars:4,board:'Breakfast',night:212000,note:'Rooftop pool, best base for eating out'}],
    high:[{n:'Ellerman House',area:'Bantry Bay',stars:5,board:'Full board',night:1180000,note:'Thirteen rooms, art collection, all-inclusive feel'},
          {n:'One&Only Cape Town',area:'V&A Waterfront',stars:5,board:'Breakfast',night:648000,note:'Table Mountain from the bath. Good for families'}]
  }},

{ id:'masaimara', name:'Masai Mara', country:'Kenya', hours:6, budget:3, visa:'easy',
  months:[7,8,9,10,1,2], vibes:['wildlife','adventure','romance'], who:['couple','family','friends'],
  offbeat:false, heat:'warm', pace:2,
  blurb:'The northern end of the Serengeti ecosystem, reached by a short bush flight from Nairobi. Between July and October the wildebeest migration crosses the Mara river; outside those months the resident lion, cheetah and elephant populations are among the densest anywhere in Africa. Camps range from mobile canvas to permanent lodges, most on private conservancies where off-road driving and night drives are allowed.',
  why:'This is the one that people talk about for years afterwards. Nowhere else concentrates this much wildlife into a three-night stay, and a private conservancy means you are not queueing six vehicles deep at a lion sighting.',
  tip:'Pay for a conservancy camp rather than one inside the national reserve. Same animals, a fraction of the vehicles, and you can drive off-road and after dark.',
  flights:[
    {carrier:'Kenya Airways',     route:'LOS → NBO', dur:'5h 30m', stops:'Direct', price:522000, note:'Cheapest — direct, plus bush flight'},
    {carrier:'Kenya Airways',     route:'LOS → NBO', dur:'5h 30m', stops:'Direct', price:604000, note:'Best value — direct, 30kg, flexible'},
    {carrier:'Ethiopian Airlines',route:'LOS → ADD → NBO', dur:'10h 15m', stops:'1 stop', price:486000, note:'Cheapest overall, long day'}
  ],
  hotels:{
    low:[{n:'Mara Explorers Camp',area:'Talek Gate',stars:2,board:'Full board',night:94000,note:'Basic tents, shared game drives'},
         {n:'Enchoro Wildlife Camp',area:'Sekenani',stars:3,board:'Full board',night:118000,note:'Good value, drives included'}],
    mid:[{n:'Mara Bush Camp',area:'Private conservancy',stars:4,board:'Full board',night:286000,note:'Ten tents, all drives and meals in'},
         {n:'Basecamp Masai Mara',area:'Talek river',stars:4,board:'Full board',night:342000,note:'Eco-camp, strong Maasai guiding'}],
    high:[{n:'Angama Mara',area:'Oloololo escarpment',stars:5,board:'All inclusive',night:1380000,note:'The view from the Out of Africa scene'},
          {n:'Mahali Mzuri',area:'Olare Motorogi',stars:5,board:'All inclusive',night:1240000,note:'Twelve suites, private conservancy'}]
  }},

{ id:'istanbul', name:'Istanbul', country:'Türkiye', hours:7, budget:2, visa:'easy',
  months:[4,5,6,9,10,11], vibes:['city','food','romance','adventure'], who:['couple','friends','solo','family'],
  offbeat:false, heat:'mild', pace:5,
  blurb:'A city on two continents with fifteen hundred years of imperial capital behind it. The old peninsula holds Hagia Sophia, the Blue Mosque, Topkapi and the Grand Bazaar; across the Golden Horn, Beyoğlu and Karaköy run on rooftop bars, third-wave coffee and some of the best eating in Europe. Ferries cross to the Asian side every twenty minutes for the price of a bus ticket.',
  why:'The most city you can get for the money. Walkable, endlessly layered, and it works as a four-night break or as the first leg of something longer through Cappadocia and the coast.',
  tip:'Take the commuter ferry to Kadıköy on the Asian side and eat there. It is where Istanbul goes when it is not working.',
  flights:[
    {carrier:'Turkish Airlines',route:'LOS → IST', dur:'6h 40m', stops:'Direct', price:562000, note:'Cheapest — direct, hand baggage only'},
    {carrier:'Turkish Airlines',route:'LOS → IST', dur:'6h 40m', stops:'Direct', price:648000, note:'Best value — direct with 23kg'},
    {carrier:'Egyptair',        route:'LOS → CAI → IST', dur:'12h 30m', stops:'1 stop', price:498000, note:'Cheapest overall, long connection'}
  ],
  hotels:{
    low:[{n:'Cheers Lighthouse',area:'Sultanahmet',stars:3,board:'Breakfast',night:43000,note:'Rooftop over the Bosphorus, private rooms'},
         {n:'Hotel Sultania Annex',area:'Sirkeci',stars:3,board:'Breakfast',night:59000,note:'Two tram stops from everything'}],
    mid:[{n:'Georges Hotel Galata',area:'Galata',stars:4,board:'Breakfast',night:142000,note:'Best-located mid-range on the new side'},
         {n:'Sirkeci Mansion',area:'Sultanahmet',stars:4,board:'Breakfast',night:126000,note:'Behind Topkapi, free walking tours'}],
    high:[{n:'Six Senses Kocatas',area:'Sarıyer, Bosphorus',stars:5,board:'Breakfast',night:562000,note:'Two Ottoman mansions on the water'},
          {n:'Çırağan Palace Kempinski',area:'Beşiktaş',stars:5,board:'Breakfast',night:748000,note:'Actual palace. Infinity pool on the Bosphorus'}]
  }},

{ id:'dubai', name:'Dubai', country:'UAE', hours:8, budget:3, visa:'easy',
  months:[11,12,1,2,3,4], vibes:['city','family','food','beach'], who:['family','couple','friends','solo'],
  offbeat:false, heat:'hot', pace:4,
  blurb:'The Gulf’s tourism engine: fifty kilometres of beachfront hotels, indoor ski slopes, the world’s tallest building and a desert twenty minutes from the last metro stop. Dubai is built for visitors in a way few cities are — everything is signposted, air-conditioned and open late. Old Dubai around the creek and the gold souk is the part most people skip and shouldn’t.',
  why:'When the trip has to work for everyone — grandparents, teenagers, a five-year-old — Dubai is the safest yes on this list. Nothing goes wrong, everything is close, and the winter weather is faultless.',
  tip:'Do the desert on your first night, not your last. It resets everyone before the city takes over.',
  flights:[
    {carrier:'Emirates',        route:'LOS → DXB', dur:'7h 45m', stops:'Direct', price:588000, note:'Cheapest — direct, 30kg'},
    {carrier:'Emirates',        route:'LOS → DXB', dur:'7h 45m', stops:'Direct', price:702000, note:'Best value — flexible, seat choice'},
    {carrier:'Qatar Airways',   route:'LOS → DOH → DXB', dur:'11h 05m', stops:'1 stop', price:534000, note:'Cheapest overall via Doha'}
  ],
  hotels:{
    low:[{n:'Rove Downtown',area:'Downtown',stars:3,board:'Room only',night:68000,note:'Burj views, metro on the doorstep'},
         {n:'Premier Inn Dubai Ibn Battuta',area:'Jebel Ali',stars:3,board:'Breakfast',night:56000,note:'Family rooms, mall attached'}],
    mid:[{n:'Aloft Palm Jumeirah',area:'The Palm',stars:4,board:'Breakfast',night:172000,note:'Beach access, good for couples'},
         {n:'JA Ocean View Hotel',area:'JBR',stars:4,board:'Half board',night:228000,note:'On The Walk, direct beach, kids club'}],
    high:[{n:'Atlantis The Palm',area:'The Palm',stars:5,board:'Half board',night:596000,note:'Waterpark and aquarium included'},
          {n:'Bulgari Resort Dubai',area:'Jumeira Bay',stars:5,board:'Breakfast',night:1240000,note:'Private island, marina, very adult'}]
  }},

{ id:'vicfalls', name:'Victoria Falls', country:'Zambia & Zimbabwe', hours:13, budget:3, visa:'easy',
  months:[5,6,7,8,9,10], vibes:['adventure','wildlife','romance'], who:['couple','friends','family'],
  offbeat:true, heat:'warm', pace:3,
  blurb:'The Zambezi drops a hundred metres into a basalt gorge on the Zambia–Zimbabwe border, throwing up spray visible from thirty kilometres away. The falls themselves take half a day; the rest of the trip is what surrounds them — white-water rafting through grade-five rapids, sunset cruises on the upper river, Chobe’s elephants two hours west in Botswana, and Devil’s Pool at the lip of the drop when the water is low.',
  why:'One of the genuine wonders, and almost nobody flying out of Lagos goes. Pair it with two nights in Chobe and you have a short trip with more in it than most fortnights.',
  tip:'Go between August and October if you want Devil’s Pool. Go in April if you want the falls at full roar — you cannot have both.',
  flights:[
    {carrier:'Ethiopian Airlines',route:'LOS → ADD → VFA', dur:'16h 20m', stops:'1 stop', price:742000, note:'Cheapest — overnight in Addis'},
    {carrier:'Kenya Airways',     route:'LOS → NBO → LVI', dur:'14h 05m', stops:'1 stop', price:816000, note:'Best value — Zambian side'},
    {carrier:'South African Airways',route:'LOS → JNB → VFA', dur:'12h 45m', stops:'1 stop', price:924000, note:'Fastest routing'}
  ],
  hotels:{
    low:[{n:'Shoestrings Backpackers',area:'Victoria Falls town',stars:2,board:'Room only',night:41000,note:'Private chalets, 10 min walk to the falls'},
         {n:'Jollyboys Camp',area:'Livingstone',stars:3,board:'Breakfast',night:53000,note:'Pool, free shuttle to the falls'}],
    mid:[{n:'Ilala Lodge',area:'Victoria Falls town',stars:4,board:'Breakfast',night:198000,note:'Closest hotel to the falls, hear them at night'},
         {n:'Waterberry Lodge',area:'Upper Zambezi',stars:4,board:'Half board',night:236000,note:'Riverside, quiet, good guiding'}],
    high:[{n:'Victoria Falls Hotel',area:'Zimbabwe side',stars:5,board:'Breakfast',night:412000,note:'Colonial-era grande dame, gorge terrace'},
          {n:'Royal Chundu',area:'Zambezi river',stars:5,board:'All inclusive',night:986000,note:'Island villas, all activities in'}]
  }},

{ id:'obudu', name:'Obudu & Calabar', country:'Nigeria', hours:1, budget:1, visa:'free',
  months:[11,12,1,2,3,4], vibes:['adventure','wellness','wildlife','family'], who:['family','couple','friends','solo'],
  offbeat:true, heat:'mild', pace:2,
  blurb:'The Obudu plateau sits sixteen hundred metres up in the Sankwala mountains near the Cameroonian border, and it is genuinely cold at night — mist in the mornings, grassland, a canopy walk and one of the longest cable cars in Africa. Calabar, four hours south, is the jumping-off point: a river city with the Drill Ranch primate sanctuary, good Efik food and a carnival in December that fills the whole place.',
  why:'A domestic trip that does not feel domestic. No passport, no forex, no flight longer than an hour — and a landscape almost nobody expects Nigeria to have.',
  tip:'Do not attempt the mountain road after dark. Fly into Calabar in the morning and drive up in daylight — the last stretch is the best part of the journey anyway.',
  flights:[
    {carrier:'Ibom Air',  route:'LOS → CBQ', dur:'1h 10m', stops:'Direct', price:148000, note:'Cheapest — hand baggage only'},
    {carrier:'Air Peace', route:'LOS → CBQ', dur:'1h 15m', stops:'Direct', price:192000, note:'Best value — 20kg included'},
    {carrier:'Ibom Air',  route:'LOS → QUO → CBQ', dur:'3h 40m', stops:'1 stop', price:134000, note:'Cheapest overall, awkward routing'}
  ],
  hotels:{
    low:[{n:'Transcorp Hotels Calabar',area:'Calabar',stars:3,board:'Breakfast',night:46000,note:'Central, reliable, good base night'},
         {n:'Obudu Chalets (standard)',area:'Obudu plateau',stars:3,board:'Breakfast',night:58000,note:'On the mountain, basic but the view is the point'}],
    mid:[{n:'Marina Resort Calabar',area:'Calabar waterfront',stars:4,board:'Breakfast',night:112000,note:'On the river, walk to the slave-history museum'},
         {n:'Obudu Mountain Resort',area:'Obudu plateau',stars:4,board:'Half board',night:138000,note:'Cable car, canopy walk, water park on site'}],
    high:[{n:'Channel View Hotel',area:'Calabar',stars:5,board:'Breakfast',night:196000,note:'The best rooms in the city'},
          {n:'Presidential Lodge, Obudu',area:'Obudu plateau',stars:5,board:'Full board',night:264000,note:'Private lodge at the top, all meals'}]
  }},

{ id:'kigali', name:'Kigali & Volcanoes', country:'Rwanda', hours:5, budget:3, visa:'free',
  months:[6,7,8,9,12,1,2], vibes:['wildlife','adventure','wellness','city'], who:['couple','solo','friends'],
  offbeat:true, heat:'mild', pace:2,
  blurb:'Rwanda is small, green, mountainous and startlingly well run — Kigali is among the cleanest and safest capitals on the continent, with a genuine coffee and art scene and a genocide memorial that is essential and very hard. Two hours north, Volcanoes National Park holds a third of the world’s remaining mountain gorillas; permits are strictly limited and the trek is an hour or a day depending on where the family has moved.',
  why:'The single most affecting wildlife experience available anywhere, and a capital city that quietly upends whatever you expected. Visa-free, five hours direct, and almost nobody flying out of Lagos does it.',
  tip:'Book the gorilla permit before you book anything else — the daily allocation is tiny and the whole trip has to be built around the date you get.',
  flights:[
    {carrier:'RwandAir',          route:'LOS → KGL', dur:'5h 05m', stops:'Direct', price:496000, note:'Cheapest — direct, hand baggage only'},
    {carrier:'RwandAir',          route:'LOS → KGL', dur:'5h 05m', stops:'Direct', price:582000, note:'Best value — direct with 23kg'},
    {carrier:'Ethiopian Airlines',route:'LOS → ADD → KGL', dur:'11h 30m', stops:'1 stop', price:458000, note:'Cheapest overall, long day'}
  ],
  hotels:{
    low:[{n:'Discover Rwanda Hostel',area:'Kiyovu, Kigali',stars:3,board:'Breakfast',night:42000,note:'Private rooms, profits fund youth programmes'},
         {n:'La Locanda',area:'Nyarugenge, Kigali',stars:3,board:'Breakfast',night:64000,note:'Small guesthouse, walk to the memorial'}],
    mid:[{n:'The Retreat by Heaven',area:'Kiyovu, Kigali',stars:4,board:'Breakfast',night:186000,note:'Solar-heated pool, best restaurant in the city'},
         {n:'Le Bambou Gorilla Lodge',area:'Kinigi, Volcanoes',stars:4,board:'Full board',night:214000,note:'Ten minutes from the trek briefing point'}],
    high:[{n:'One&Only Nyungwe House',area:'Nyungwe forest',stars:5,board:'All inclusive',night:892000,note:'Tea plantation, chimp tracking, canopy walk'},
          {n:'Singita Kwitonda Lodge',area:'Volcanoes NP',stars:5,board:'All inclusive',night:1620000,note:'On the park boundary. The best gorilla base there is'}]
  }},

{ id:'mauritius', name:'Mauritius', country:'Indian Ocean', hours:14, budget:3, visa:'free',
  months:[5,6,9,10,11,12], vibes:['beach','family','romance','wellness'], who:['couple','family'],
  offbeat:false, heat:'hot', pace:1,
  blurb:'A volcanic island ringed almost entirely by coral reef, which is why the lagoon is calm enough for small children and nervous swimmers. Beyond the resort belt the interior is mountainous and green — Chamarel’s coloured earths, Black River Gorges, tea plantations — and Port Louis market delivers Creole, Indian and Chinese food in one very hot building. Visa-free for Nigerian passports.',
  why:'This is what people mean when they say they just want a holiday. The resorts are genuinely good, nobody has to plan anything, and you are paying for the certainty that nothing will go wrong.',
  tip:'Base yourself north-west for calm water and sunsets, or east if you want fewer people and can live with more wind.',
  flights:[
    {carrier:'Kenya Airways',    route:'LOS → NBO → MRU', dur:'15h 40m', stops:'1 stop', price:968000, note:'Cheapest — long Nairobi layover'},
    {carrier:'Ethiopian Airlines',route:'LOS → ADD → MRU', dur:'14h 25m', stops:'1 stop', price:1064000, note:'Best value'},
    {carrier:'Emirates',         route:'LOS → DXB → MRU', dur:'17h 50m', stops:'1 stop', price:1248000, note:'Most comfortable, longest'}
  ],
  hotels:{
    low:[{n:'Ocean Beauty Blue Bay',area:'Blue Bay',stars:3,board:'Breakfast',night:62000,note:'Guesthouse, best snorkelling lagoon'},
         {n:'Manisa Hotel',area:'Flic en Flac',stars:3,board:'Half board',night:84000,note:'Across from the beach, good value'}],
    mid:[{n:'Veranda Grand Baie',area:'Grand Baie',stars:4,board:'Half board',night:196000,note:'Walk to restaurants and the boats'},
         {n:'Sugar Beach',area:'Flic en Flac',stars:4,board:'All inclusive',night:284000,note:'Big beach, plantation style, kids club'}],
    high:[{n:'Constance Belle Mare Plage',area:'East coast',stars:5,board:'Half board',night:486000,note:'Two golf courses, excellent for families'},
          {n:'Four Seasons Anahita',area:'Beau Champ',stars:5,board:'Breakfast',night:892000,note:'Private pool villas, own island beach'}]
  }},

{ id:'seychelles', name:'Seychelles', country:'Indian Ocean', hours:13, budget:3, visa:'free',
  months:[4,5,10,11,12,1], vibes:['beach','romance','wellness'], who:['couple','solo'],
  offbeat:false, heat:'hot', pace:1,
  blurb:'A hundred and fifteen granite and coral islands scattered across the Indian Ocean, with no visa required for any nationality. Mahé has the airport and the mountains, Praslin the palm forest and Anse Lazio, La Digue no cars to speak of and the beach that appears on every list of the world’s best. Inter-island ferries run several times a day and the whole thing is small enough to see properly in a week.',
  why:'The highest-end version of this trip. Nothing else looks quite like the granite boulders, the water is bath-warm year round, and the no-visa rule removes the last piece of admin.',
  tip:'Do not stay on Mahé the whole time. One night there and the rest split between Praslin and La Digue is a completely different holiday.',
  flights:[
    {carrier:'Ethiopian Airlines',route:'LOS → ADD → SEZ', dur:'14h 55m', stops:'1 stop', price:1148000, note:'Cheapest — long layover'},
    {carrier:'Kenya Airways',     route:'LOS → NBO → SEZ', dur:'13h 10m', stops:'1 stop', price:1284000, note:'Best value'},
    {carrier:'Qatar Airways',     route:'LOS → DOH → SEZ', dur:'18h 05m', stops:'1 stop', price:1466000, note:'Most comfortable'}
  ],
  hotels:{
    low:[{n:'Chalets d’Anse Forbans',area:'South Mahé',stars:3,board:'Room only',night:88000,note:'Self-catering chalets on a quiet beach'},
         {n:'Le Nautique',area:'La Digue',stars:3,board:'Breakfast',night:96000,note:'Bikes included, walk to Source d’Argent'}],
    mid:[{n:'Le Domaine de La Réserve',area:'Praslin',stars:4,board:'Half board',night:242000,note:'Own jetty, easy hop to Curieuse'},
         {n:'Coral Strand',area:'Beau Vallon, Mahé',stars:4,board:'Breakfast',night:198000,note:'Main beach, best restaurant choice'}],
    high:[{n:'Constance Lemuria',area:'Praslin',stars:5,board:'Half board',night:964000,note:'Three beaches including Anse Georgette'},
          {n:'Six Senses Zil Pasyon',area:'Félicité Island',stars:5,board:'Breakfast',night:1680000,note:'Private island, boulder villas'}]
  }}

];

/* Nudge chips shown on the results page */
const NUDGES = [
  {id:'hotter',    label:'Hotter'},
  {id:'cheaper',   label:'Cheaper'},
  {id:'shorter',   label:'Shorter flight'},
  {id:'adventure', label:'More adventurous'},
  {id:'beach',     label:'More beach'},
  {id:'quieter',   label:'Less touristy'},
  {id:'visa',      label:'Skip the visa'}
];
