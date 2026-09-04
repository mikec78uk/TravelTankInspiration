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

const VISA_CHOICES = [
  {id:'free',     label:'Visa-free'},
  {id:'required', label:'Visa required'}
];

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const MONTHS_FULL = ['January','February','March','April','May','June','July','August','September','October','November','December'];

/* Full airport names, so the flight detail reads like a ticket rather than a code. */
const AIRPORTS = {
  ABJ:'Abidjan Félix-Houphouët-Boigny', ACC:'Accra Kotoka', ADD:'Addis Ababa Bole',
  BVC:'Boa Vista Rabil', CAI:'Cairo International', CBQ:'Calabar Margaret Ekpo',
  CDG:'Paris Charles de Gaulle', CMN:'Casablanca Mohammed V', CPT:'Cape Town International',
  DOH:'Doha Hamad', DSS:'Dakar Blaise Diagne', DXB:'Dubai International',
  IST:'Istanbul Airport', JNB:'Johannesburg O.R. Tambo', KGL:'Kigali International',
  LFW:'Lomé Gnassingbé Eyadéma', LIS:'Lisbon Humberto Delgado', LOS:'Lagos Murtala Muhammed',
  LVI:'Livingstone Harry Mwaanga Nkumbula', MRU:'Mauritius Sir Seewoosagur Ramgoolam',
  NBO:'Nairobi Jomo Kenyatta', QUO:'Uyo Akwa Ibom', RAK:'Marrakesh Menara',
  SEZ:'Seychelles International', SID:'Sal Amílcar Cabral', VFA:'Victoria Falls',
  ZNZ:'Zanzibar Abeid Amani Karume'
};

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
  tradeoff:'Accra is not a beach holiday. The city is the point, the coast is the side trip, and the traffic between the two can eat half a day.',
  chooseIf:'you want a first trip abroad that needs almost no planning',
  temps:'27-32°C all year · rain Jun-Jul',
  weather:'Hot and humid the whole year with very little variation. The big rains fall in June and July and the dustier harmattan blows in December and January, which is when the heat is most bearable.',
  wear:'Light cotton and linen, and something with sleeves for churches and the castles. Trainers you do not mind getting muddy for the Kakum canopy walk.',
  food:'Waakye for breakfast from a roadside stand, jollof and grilled tilapia everywhere, and a serious modern Ghanaian scene in Osu and Airport Residential.',
  sights:[{n:'Cape Coast and Elmina castles',d:'Heavy going and essential. Take a guide, and give yourself the afternoon after.'},{n:'Kakum canopy walkway',d:'Seven rope bridges through the rainforest canopy, first thing before the coaches.'},{n:'Makola Market',d:'Accra at full volume. Go with someone who knows it.'},{n:'Labadi Beach on a Sunday',d:'Live highlife, horse riding on the sand, the whole city out.'},{n:'Independence Square',d:'Black Star Gate and the parade ground — twenty minutes, and it explains a lot.'},{n:'Jamestown',d:'The lighthouse, the boxing gyms and the fishing harbour below.'}],
  watchout:'Harmattan dust in December and January can grey out the light for photographs, and the Cape Coast road is slow whatever the season.',
  pack:[{k:'Daytime',v:'Cotton and linen only — the humidity defeats anything heavier.'},{k:'Cape Coast',v:'Something with sleeves for the castles, and shoes you can lose to mud at Kakum.'},{k:'Evenings',v:'Osu is smart-casual. One shirt or dress will cover you.'},{k:'Beach',v:'Labadi on a Sunday is a proper day out — bring a change of clothes.'},{k:'Rain',v:'A packable layer if you go June to July. It falls hard and briefly.'}],
  eat:[{k:'One special dinner',v:'Modern Ghanaian in Airport Residential — worth booking a table.'},{k:'Eat like a local',v:'Waakye from a roadside stand before nine, when it is still hot.'},{k:'The one to try',v:'Grilled tilapia and banku at a chop bar, eaten with your hands.'},{k:'Something you might miss',v:'Jollof at a Sunday family spot rather than a hotel buffet.'}],
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
  tradeoff:'The Atlantic here is cold and the surf is real — this is not a float-in-the-shallows beach. Dakar itself is busy and takes a day to find your feet.',
  chooseIf:'you want a real city and a real beach in the same week',
  temps:'24-31°C · dry Nov-Jun',
  weather:'Atlantic and breezy, so it rarely feels as hot as the numbers suggest. The rains are short and confined to August and September; the rest of the year is dry and bright.',
  wear:'The sea breeze has a bite after dark, so bring one layer. Modest dress inland and around mosques; proper swimwear is fine at Saly.',
  food:'Thieboudienne is the national dish and worth planning a day around. Yassa chicken, grilled fish on the beach at Saly, and coffee touba on every corner.',
  sights:[{n:'Gorée Island',d:'The House of Slaves and a whole island that changes character once the day-trippers leave.'},{n:'African Renaissance Monument',d:'Taller than the Statue of Liberty, and the view over the peninsula is the point.'},{n:'Lac Rose',d:'Pink from the algae, ringed by salt collectors, an hour out of the city.'},{n:'Saly at sunset',d:'The Petite Côte turns gold and the beach bars fill up.'},{n:'Île de Ngor',d:'A five-minute pirogue across to a car-free island of alleys and swimming spots.'},{n:'Marché Kermel',d:'The colonial-era market building, best at eight in the morning.'}],
  watchout:'The Atlantic here has a real undertow. Swim where the locals swim, and August to September can wash out a week.',
  pack:[{k:'Daytime',v:'Light layers — the sea breeze makes it cooler than the numbers suggest.'},{k:'Evenings',v:'One warm layer. It genuinely drops after dark on the peninsula.'},{k:'Gorée',v:'Walking shoes for the cobbles, and sun cover on the ferry.'},{k:'Beach',v:'Saly is a proper beach resort. Modest cover-up for the walk through town.'},{k:'Mosques',v:'Long sleeves and long trousers, and a scarf for women.'}],
  eat:[{k:'One special dinner',v:'A Lebanese-Senegalese place in Almadies, on the water.'},{k:'Eat like a local',v:'Thieboudienne at lunch, which is when Senegal actually eats it.'},{k:'The one to try',v:'Yassa chicken — onions, lemon and mustard, slow-cooked.'},{k:'Something you might miss',v:'Café touba from a street cart. Coffee with pepper in it.'}],
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
  tradeoff:'It is small. Three or four nights is right; a fortnight would run out of things to do, and there is very little in the way of a night out.',
  chooseIf:'you have three or four nights and want them to feel expensive',
  temps:'18-25°C Nov-Mar · brutal Jun-Sep',
  weather:'Winter is the whole point: dry, clear and in the twenties. From June to September it is genuinely dangerous outside in the middle of the day, and everything happens indoors.',
  wear:'Cover shoulders and knees in public and in the souq. Layers for the air conditioning, which is fierce. Closed shoes for the desert.',
  food:'The Gulf done properly — machboos, grilled hammour, mezze at Souq Waqif with the birds and the horses going past your table.',
  sights:[{n:'Museum of Islamic Art',d:'World-class, and the building alone is worth the trip. Go at dusk for the skyline.'},{n:'Souq Waqif',d:'Atmospheric in a way the malls are not. Falcon souq at the back.'},{n:'The Inland Sea',d:'Khor Al Adaid, where the desert meets the water. Half a day with a driver.'},{n:'National Museum of Qatar',d:'The desert-rose building, and the best telling of the country you will get.'},{n:'Katara Cultural Village',d:'Amphitheatre, galleries and the best beach in the city behind it.'},{n:'Msheireb Museums',d:'Four restored houses telling the story of Qatar before the gas.'}],
  watchout:'From June to September the middle of the day is genuinely unsafe outside. Even in winter, plan the desert for early or late.',
  pack:[{k:'Daytime',v:'Shoulders and knees covered in public. Loose and light works best.'},{k:'Indoors',v:'A layer for the air conditioning, which is set very cold.'},{k:'Desert',v:'Closed shoes and something you do not mind filling with sand.'},{k:'Evenings',v:'Smart-casual for the hotel restaurants. Jacket rarely needed.'},{k:'Souq',v:'Comfortable shoes — the floors are stone and you will be on them for hours.'}],
  eat:[{k:'One special dinner',v:'A Michelin-level tasting menu in West Bay, at a fraction of a European price.'},{k:'Eat like a local',v:'Machboos at Souq Waqif with the falconers going past.'},{k:'The one to try',v:'Grilled hammour, the Gulf fish everything is built around.'},{k:'Something you might miss',v:'Karak tea from a drive-through window at midnight. A national habit.'}],
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
  tradeoff:'The medina is relentless — brilliant for two days, wearing by the fourth. Expect to be hustled, and expect to haggle for everything.',
  chooseIf:'you want somewhere that looks nothing like home, cheaply',
  temps:'20-28°C spring and autumn · 38°C+ Jul-Aug',
  weather:'Dry heat. March to May and September to November are close to perfect. July and August are punishing, and the nights in December and January are genuinely cold.',
  wear:'Cover up in the medina — it is more comfortable as well as more respectful. Shoes you can walk cobbles in. A jumper for winter evenings.',
  food:'Tagine and couscous obviously, but the street food at Jemaa el-Fnaa after dark is the real event. Mint tea is not optional.',
  sights:[{n:'Jemaa el-Fnaa after dark',d:'The square transforms at sunset. Eat from the stalls, not the terraces.'},{n:'Bahia Palace',d:'The best of Moroccan craftsmanship, and quiet first thing.'},{n:'Jardin Majorelle',d:'Small and busy, so book the first slot of the day.'},{n:'The Atlas Mountains',d:'An hour out. Imlil for the day, or stay a night in a Berber guesthouse.'},{n:'Le Jardin Secret',d:'A restored riad garden in the middle of the medina, and almost empty.'},{n:'Ben Youssef Madrasa',d:'The finest carved plaster and cedar in Morocco, recently reopened.'}],
  watchout:'July and August are punishing and the medina offers no relief. Winter nights are genuinely cold and riads are often unheated.',
  pack:[{k:'Medina',v:'Cover up — it is more comfortable and it changes how you are treated.'},{k:'Footwear',v:'Shoes with a sole. The medina is cobbles, grit and the occasional mule.'},{k:'Evenings',v:'A jumper from November to February. Riad courtyards get cold.'},{k:'Atlas day',v:'Layers and walking shoes. It is a different climate up there.'},{k:'Hammam',v:'Flip-flops and something you do not mind ruining.'}],
  eat:[{k:'One special dinner',v:'A rooftop in the medina at sunset, with the call to prayer going up.'},{k:'Eat like a local',v:'The food stalls at Jemaa el-Fnaa after dark — the numbered ones with queues.'},{k:'The one to try',v:'Tanjia, the Marrakchi lamb dish cooked in the hammam embers.'},{k:'Something you might miss',v:'Msemen and mint tea for breakfast on a side street, not in the riad.'}],
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
  tradeoff:'The sites are extraordinary and the crowds and touts around them are the price of admission. Cairo traffic and air quality are genuinely hard work.',
  chooseIf:'you want the trip to be about what you saw, not where you stayed',
  temps:'20-26°C Oct-Apr · 38°C+ summer',
  weather:'Bone dry. October to April is the sensible window; the summer is fierce and the sites offer almost no shade. Nights in December and January get properly cold.',
  wear:'Long, light layers for the sun and for the mosques. A scarf for women at religious sites. Dust-proof shoes, and a hat you will actually wear.',
  food:'Koshari from a proper koshari house, ful and taameya for breakfast, and a felucca at sunset with mezze.',
  sights:[{n:'Giza pyramids and the Sphinx',d:'Go at opening or an hour before closing. The middle of the day is the worst of it.'},{n:'Grand Egyptian Museum',d:'Tutankhamun in full, and enough space to see it properly.'},{n:'Khan el-Khalili',d:'Centuries of souq. Tea at El Fishawy.'},{n:'Sailing the Nile',d:'A night on the water between Luxor and Aswan is the part people remember.'},{n:'Coptic Cairo',d:'The Hanging Church and Ben Ezra synagogue, layers of the city most tours skip.'},{n:'Saqqara and Dahshur',d:'The step pyramid and the bent pyramid, with a fraction of the Giza crowds.'}],
  watchout:'Cairo traffic will eat hours you did not budget for, and the air quality is hard going if you are asthmatic.',
  pack:[{k:'Sites',v:'Long light layers, a hat, and shoes that cope with sand and dust.'},{k:'Mosques',v:'A scarf for women, and everyone covers shoulders and knees.'},{k:'Evenings',v:'Warm layer from December to February. The desert gets cold at night.'},{k:'Nile cruise',v:'Smart-casual for dinner on board, swimwear for the sun deck.'},{k:'Everywhere',v:'More sun protection than you think. There is no shade at Giza.'}],
  eat:[{k:'One special dinner',v:'A Nile-side table in Zamalek, ideally on a boat that does not move.'},{k:'Eat like a local',v:'Koshari from a dedicated koshari house — rice, lentils, pasta, fried onion.'},{k:'The one to try',v:'Ful and taameya for breakfast, the way Cairo actually starts the day.'},{k:'Something you might miss',v:'Om Ali, the bread pudding, somewhere unfashionable.'}],
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
  tradeoff:'Sal is windy and mostly resort — if you want street life and culture you will be hunting for it. Island-hopping adds both cost and faff.',
  chooseIf:'you want guaranteed sun and no thinking',
  temps:'24-29°C all year',
  weather:'Reliably sunny with almost no rain, and a constant Atlantic trade wind that keeps it comfortable. There is no bad month, which is unusual on this list.',
  wear:'Beachwear and something windproof — the trade wind is constant, and Sal is exposed. Reef shoes for the volcanic rock.',
  food:'Cachupa, the slow-cooked national stew, and whatever came off the boat that morning. Grogue is the local rum and it is strong.',
  sights:[{n:'Pedra de Lume salt crater',d:'Float in a salt lake inside an old volcano.'},{n:'Santa Maria pier at dawn',d:'The fishing boats land and the whole town turns out for it.'},{n:'Kite surfing at Kite Beach',d:'The wind that annoys you on the beach is the reason people come.'},{n:'Boa Vista dunes',d:'A desert island in the literal sense. Day trip by ferry or a short hop.'},{n:'Buracona blue eye',d:'A lava cave where the light comes through the water at midday.'},{n:'Espargos market',d:'The island doing its own shopping, twenty minutes from the resorts.'}],
  watchout:'The trade wind is constant and it will find you on the beach. Inter-island flights are unreliable — leave slack around them.',
  pack:[{k:'Beach',v:'Reef shoes. The volcanic rock and sea urchins are the reason.'},{k:'Wind',v:'A light windproof. It is the one thing everyone forgets.'},{k:'Daytime',v:'Beachwear all day. Nowhere on Sal expects anything else.'},{k:'Evenings',v:'A shirt or dress for Santa Maria, which does dress up a little.'},{k:'Sun',v:'Very high UV year round with almost no cloud cover.'}],
  eat:[{k:'One special dinner',v:'Fresh lobster on the sand at Santa Maria, priced far below Europe.'},{k:'Eat like a local',v:'Cachupa for breakfast — the leftover stew, fried with an egg.'},{k:'The one to try',v:'Whatever came off the boat that morning, grilled whole.'},{k:'Something you might miss',v:'Grogue with honey and lime at a bar with live morna.'}],
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
  tradeoff:'Stone Town is atmospheric but tight and hot, and the good beaches are an hour or more away, so you will be paying for transfers.',
  chooseIf:'you want the beach to be the whole point, with some history attached',
  temps:'26-32°C · rains Mar-May',
  weather:'Hot and humid with a proper monsoon in April and May that shuts a lot of places. June to October is dry and breezy; December to February is hotter and stickier.',
  wear:'Modest clothing in Stone Town — shoulders and knees covered away from the beach. Light fabrics only; the humidity is the thing that gets people.',
  food:'Swahili cooking with Indian and Omani in it. The Forodhani night market for grilled seafood, and Zanzibar pizza, which is neither.',
  sights:[{n:'Stone Town at dusk',d:'Get lost in it deliberately. The carved doors are the whole history in miniature.'},{n:'A spice farm',d:'Less naff than it sounds, and it explains why anyone came here in the first place.'},{n:'Nakupenda sandbank',d:'A sandbar that appears at low tide, an hour by boat.'},{n:'Jozani Forest',d:'The red colobus monkeys exist nowhere else on earth.'},{n:'Prison Island',d:'Giant tortoises, and snorkelling straight off the beach.'},{n:'Kizimkazi',d:'Dolphins in the early morning, before the boats crowd them.'}],
  watchout:'April and May are a proper monsoon and much of the island closes. Stone Town to the east coast is an hour and a half each way.',
  pack:[{k:'Stone Town',v:'Shoulders and knees covered. It is a Muslim town and it matters.'},{k:'Beach',v:'Swimwear for the resorts only, plus a cover-up for the walk back.'},{k:'Footwear',v:'Sandals you can walk in. Stone Town is sand, stone and steps.'},{k:'Sun',v:'Very strong. A rash vest saves the snorkelling days.'},{k:'Evenings',v:'Light long sleeves — as much for mosquitoes as for cool.'}],
  eat:[{k:'One special dinner',v:'The Rock, out in the tide, if you book it weeks ahead.'},{k:'Eat like a local',v:'Forodhani night market — grilled seafood, chosen by pointing.'},{k:'The one to try',v:'Urojo, the tamarind soup locals call Zanzibar mix.'},{k:'Something you might miss',v:'Spiced coffee and a slab of halua from a street vendor.'}],
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
  tradeoff:'A visa to arrange, a long flight, and weather that turns — the wind off the Cape can end a beach day without warning.',
  chooseIf:'you want a proper city break with mountains and wine on the doorstep',
  temps:'22-28°C Nov-Mar · wet winters',
  weather:'A Mediterranean climate upside down: hot dry summers from November to March, wet and windy from June to August. The south-easter can blow for days and closes the cable car.',
  wear:'Layers, always — the city can do four seasons before lunch. A windproof jacket for the Cape, and something smart for the wine estates.',
  food:'One of the best food cities in the southern hemisphere. Cape Malay curries, the Bo-Kaap, braai everywhere, and the Winelands an hour out.',
  sights:[{n:'Table Mountain',d:'Go up the moment it is clear — do not save it for later in the week.'},{n:'Robben Island',d:'Book weeks ahead. Guided by former political prisoners.'},{n:'Cape Point and Boulders',d:'The peninsula drive, and the penguins on the way back.'},{n:'Franschhoek wine tram',d:'A whole day, and someone else does the driving.'},{n:'Kirstenbosch',d:'The botanical gardens under the mountain, and summer sunset concerts.'},{n:'Bo-Kaap',d:'The painted streets, and the museum that explains why they are painted.'}],
  watchout:'The south-easter can blow for days and closes the cable car with no notice. Take Table Mountain the first clear morning you get.',
  pack:[{k:'Layers',v:'Four seasons before lunch is not a joke here. Always carry one more layer.'},{k:'Table Mountain',v:'Trainers with grip and a windproof, whatever the forecast said.'},{k:'Winelands',v:'Smart-casual and comfortable shoes for moving between estates.'},{k:'Beach',v:'Swimwear, but the Atlantic side is genuinely freezing. False Bay is warmer.'},{k:'Dinner',v:'One or two smarter outfits — Cape Town restaurants are worth dressing for.'}],
  eat:[{k:'One special dinner',v:'A tasting menu in the Winelands, which competes with anywhere in the world.'},{k:'Eat like a local',v:'A braai, or Cape Malay curry and koesisters in the Bo-Kaap.'},{k:'The one to try',v:'Line-caught fish at a harbour shack in Kalk Bay.'},{k:'Something you might miss',v:'A neighbourhood wine bar in Woodstock rather than a estate cellar door.'}],
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
  tradeoff:'This is the most expensive way to spend a week on this list, and the days start before dawn. It is a trip you come back from tired.',
  chooseIf:'this is the trip you have been saving for',
  temps:'20-27°C · short rains Nov',
  weather:'High and temperate rather than hot, and cold at dawn when you will be out. The great migration crosses roughly July to October; the short rains in November green everything up.',
  wear:'Neutral colours, long sleeves against the sun and insects, and a proper fleece for the pre-dawn game drives. Nothing bright, nothing blue.',
  food:'Camp food, and much better than that sounds — most lodges cook seriously. Breakfast is usually taken out in the bush.',
  sights:[{n:'The Mara river crossings',d:'If you time it right, the single most extraordinary thing on this list.'},{n:'A dawn balloon flight',d:'Expensive and worth it. Champagne breakfast on landing.'},{n:'A private conservancy',d:'Off-road driving and night drives that the main reserve does not allow.'},{n:'A Maasai village',d:'Choose a community-run visit rather than the ones the lodges tout.'},{n:'Hot air balloon at dawn',d:'Expensive, unforgettable, and a champagne breakfast on landing.'},{n:'A Maasai community visit',d:'Choose a community-run one, not the version the lodge sells.'}],
  watchout:'Dawn game drives mean 5am starts every day, and the Mara is cold before sunrise. This is not a restful week.',
  pack:[{k:'Game drives',v:'Neutral colours only. No bright white, and never blue — it draws tsetse flies.'},{k:'Mornings',v:'A proper fleece and a hat. It is genuinely cold in an open vehicle at dawn.'},{k:'Sun',v:'Long sleeves. You are exposed for six hours a day.'},{k:'Camp',v:'Soft bag rather than a hard case — light aircraft insist on it.'},{k:'Feet',v:'Closed shoes for walking safaris, sandals for camp.'}],
  eat:[{k:'One special dinner',v:'A bush dinner under the stars, which most camps will arrange.'},{k:'Eat like a local',v:'Nyama choma and ugali on the way in from Nairobi.'},{k:'The one to try',v:'Breakfast cooked in the bush after the dawn drive.'},{k:'Something you might miss',v:'Kenyan coffee at source, which almost nobody drinks at home.'}],
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
  tradeoff:'A walking city built on hills and choked with traffic, and the tourist core is priced and hustled accordingly. Winters are grey and wet.',
  chooseIf:'you want two continents and serious food at a short-haul price',
  temps:'22-29°C May-Sep · cold wet winters',
  weather:'Four proper seasons. Spring and autumn are the best of it. Summer is hot and crowded; winter is grey, wet and occasionally snowy, but the city is beautiful in it and half empty.',
  wear:'Comfortable shoes above everything — it is hills and cobbles. A scarf for the mosques. A real coat in winter.',
  food:'Arguably the reason to go. Breakfast is an event, the kebab is nothing like the one at home, and the Bosphorus fish restaurants are worth the trek.',
  sights:[{n:'Hagia Sophia and the Blue Mosque',d:'Both, early, before the tour groups.'},{n:'The Grand Bazaar',d:'Four thousand shops. Haggle, and take a break at a çay house.'},{n:'A Bosphorus ferry',d:'The cheapest and best sightseeing in the city.'},{n:'Kadıköy on the Asian side',d:'Where people actually eat. Markets, meyhanes, no coach parties.'},{n:'Basilica Cistern',d:'An underground Roman reservoir, recently and beautifully relit.'},{n:'Balat',d:'Coloured houses, antique shops and no coach parties, up the Golden Horn.'}],
  watchout:'It is a city of hills and cobbles, and the tourist core is priced and hustled accordingly. Winter is grey, wet and can snow.',
  pack:[{k:'Footwear',v:'The single most important thing. Hills, cobbles, and miles of walking.'},{k:'Mosques',v:'A scarf for women, shoulders and knees covered for everyone.'},{k:'Winter',v:'A real coat, waterproof shoes. It is colder than people expect.'},{k:'Evenings',v:'Istanbul dresses up. Smart-casual gets you into most places.'},{k:'Bazaar',v:'A bag that closes, and small notes for haggling.'}],
  eat:[{k:'One special dinner',v:'A meyhane in Beyoğlu — meze, raki and a long evening.'},{k:'Eat like a local',v:'Breakfast. A full Turkish kahvaltı is a two-hour event and worth clearing a morning for.'},{k:'The one to try',v:'Iskender kebab, which bears no relation to the one at home.'},{k:'Something you might miss',v:'Kadıköy on the Asian side, where the city actually eats.'}],
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
  tradeoff:'Almost everything is indoors and air-conditioned, and nothing is cheap once you leave the hotel. Outside winter the heat rules out the middle of the day.',
  chooseIf:'the trip has to work for everyone and nothing can go wrong',
  temps:'24-30°C Nov-Mar · 45°C summer',
  weather:'November to March is warm, dry and faultless. From May to September it is genuinely extreme — 45°C and humid — and life moves entirely indoors.',
  wear:'Cover shoulders and knees in malls and public areas. Layers for the air conditioning. Anything goes at hotel pools and beach clubs.',
  food:'Every cuisine on earth at every price. The Emirati food is in Al Fahidi and Deira, not in the towers.',
  sights:[{n:'Burj Khalifa at sunset',d:'Book the timed slot. Level 148 if the budget stretches.'},{n:'A desert safari',d:'Dune bashing, camels, dinner under the stars. Touristy and good fun.'},{n:'Dubai Creek and the souks',d:'The old city, an abra across the water for a few dirhams.'},{n:'Al Fahidi historical district',d:'Wind towers and courtyard cafés — the Dubai that was there before.'},{n:'Dubai Frame',d:'The picture-frame building, old city one side and new the other.'},{n:'Alserkal Avenue',d:'Warehouse galleries and independent coffee — the city off duty.'}],
  watchout:'Outside November to March the heat rules out the middle of the day entirely. Alcohol is expensive and restricted to licensed venues.',
  pack:[{k:'Public places',v:'Shoulders and knees covered in malls and souks.'},{k:'Indoors',v:'A layer for the air conditioning, which is aggressive.'},{k:'Desert safari',v:'Closed shoes, and something you do not mind getting sandy.'},{k:'Pool and beach',v:'Anything goes at hotels and beach clubs.'},{k:'Evenings',v:'Smart-casual to smart. Several venues enforce it.'}],
  eat:[{k:'One special dinner',v:'A tasting menu in DIFC, or a table high up in the Burj Al Arab.'},{k:'Eat like a local',v:'Emirati food in Al Fahidi — machboos, luqaimat, camel if you are brave.'},{k:'The one to try',v:'Karak chai and a shawarma from a Deira cafeteria, for almost nothing.'},{k:'Something you might miss',v:'Friday brunch, which is an institution rather than a meal.'}],
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
  tradeoff:'The falls themselves are two days, so the rest of the week has to be built around them. Late in the dry season the water drops and so does the spectacle.',
  chooseIf:'you want a wonder of the world that nobody you know has done',
  temps:'25-32°C · falls highest Mar-May',
  weather:'Dry and warm from May to October, which is also the best game-viewing. The water is highest in March to May and lowest in October and November, when Devil is Pool opens.',
  wear:'A waterproof for the spray, which soaks you regardless of season. Neutral colours for game drives, and a fleece for early mornings.',
  food:'Lodge cooking, mostly. Try the Zambezi bream, and a sundowner cruise is as much about the drinks as the wildlife.',
  sights:[{n:'The falls from both sides',d:'Zimbabwe for the panorama, Zambia for the closeness. Do both if you can.'},{n:'Devil’s Pool',d:'Only when the water is low, roughly August to December. Not for everyone.'},{n:'A Zambezi sunset cruise',d:'Hippos, elephants coming down to drink, and a gin and tonic.'},{n:'Chobe day trip',d:'Two hours west into Botswana for the largest elephant population in Africa.'},{n:'Chobe day trip',d:'Two hours west into Botswana for the biggest elephant herds in Africa.'},{n:'Livingstone Island',d:'Lunch on the lip of the falls, reachable only when the water is low.'}],
  watchout:'The spray soaks you whatever you wear, and by October and November the water can drop to a trickle on the Zambian side.',
  pack:[{k:'The falls',v:'A waterproof and a dry bag for your phone. You will be drenched.'},{k:'Game drives',v:'Neutral colours, long sleeves, and a fleece for early starts.'},{k:'Footwear',v:'Something that dries. Sandals with a strap work better than trainers.'},{k:'Evenings',v:'Long sleeves and repellent — this is a malaria area.'},{k:'Rafting',v:'Nothing you mind losing to the Zambezi.'}],
  eat:[{k:'One special dinner',v:'Dinner on the Royal Livingstone lawn with the spray in the distance.'},{k:'Eat like a local',v:'Zambezi bream, grilled, with nshima.'},{k:'The one to try',v:'A sundowner cruise, which is as much dinner as it is wildlife.'},{k:'Something you might miss',v:'The lunch braai at a riverside lodge, which beats most of the dinners.'}],
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
  tradeoff:'Domestic infrastructure is the weak point — the roads are long and the hotels are basic by international standards.',
  chooseIf:'you want somewhere cool and green without a passport queue',
  temps:'16-24°C on the plateau',
  weather:'Genuinely cool because of the altitude — mist in the mornings and cold at night, which surprises most people. The dry season from November to March is the time to go.',
  wear:'A jumper and a jacket, which is not advice you expect for Nigeria. Walking boots for the ranch trails.',
  food:'Cross River cooking — afang and edikang ikong soup, and Calabar is widely reckoned to have the best kitchens in the country.',
  sights:[{n:'The cable car',d:'One of the longest in Africa, up onto the plateau.'},{n:'The canopy walkway',d:'Through the treetops at Becheve nature reserve.'},{n:'Kwa Falls',d:'A gorge and a swimmable pool an hour from Calabar.'},{n:'Calabar at Christmas',d:'The month-long carnival is one of the biggest street parties in Africa.'},{n:'Agbokim Falls',d:'Seven cascades near the Cameroon border, and almost nobody there.'},{n:'Tinapa',d:'The lakeside resort complex — half ghost town, half weekend escape.'}],
  watchout:'The roads are long and hard going, and hotel standards on the plateau are basic by international comparison. Book the cable car ahead.',
  pack:[{k:'Plateau',v:'A jumper and a jacket. It genuinely gets cold at 1,600 metres.'},{k:'Walking',v:'Proper boots. The trails are steep and often wet with mist.'},{k:'Calabar',v:'Light clothes — it is hot and humid the moment you drop off the plateau.'},{k:'Rain',v:'A waterproof whatever the month. The mist comes in fast.'},{k:'Evenings',v:'Long sleeves against mosquitoes lower down.'}],
  eat:[{k:'One special dinner',v:'A Calabar kitchen doing edikang ikong properly, with pounded yam.'},{k:'Eat like a local',v:'Afang soup, and Calabar is the place people travel for it.'},{k:'The one to try',v:'Grilled fish at a Marina Resort stall in Calabar.'},{k:'Something you might miss',v:'Palm wine straight from the tapper, on the plateau.'}],
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
  tradeoff:'Gorilla permits are the single largest cost of any trip here and there is no way around them. Beyond that, Rwanda is quiet after dark.',
  chooseIf:'you want one unforgettable morning and an easy week around it',
  temps:'18-27°C · rains Mar-May, Oct-Nov',
  weather:'Temperate and green because of the altitude, never truly hot. Two rainy seasons, and the mountains are cold and wet whatever the month.',
  wear:'Waterproofs and proper boots for the gorilla trek, long trousers against the nettles, and gardening gloves are genuinely recommended.',
  food:'A real coffee culture, brochettes and grilled tilapia, and a growing Kigali restaurant scene that surprises people.',
  sights:[{n:'Gorilla trekking',d:'The permit is the biggest cost of the trip and there is no way around it. Book months ahead.'},{n:'Kigali Genocide Memorial',d:'Essential and very hard. Leave the rest of the day free.'},{n:'Lake Kivu',d:'Two hours west, and the calmest place in the country.'},{n:'Nyungwe canopy walk',d:'Rainforest, chimpanzees, and a bridge sixty metres up.'},{n:'Lake Kivu',d:'Two hours west, and the calmest place in the country.'},{n:'Nyungwe canopy walk',d:'A bridge sixty metres up through primary rainforest.'}],
  watchout:'Gorilla permits are the biggest single cost of any trip here and sell out months ahead. Nothing about that is negotiable.',
  pack:[{k:'Gorilla trek',v:'Waterproofs, boots, long trousers and gardening gloves for the nettles.'},{k:'Kigali',v:'Smart-casual. It is a notably well-dressed city.'},{k:'Altitude',v:'A fleece. It never gets truly hot and the mountains are cold.'},{k:'Rain',v:'A proper waterproof — two rainy seasons and mountain weather.'},{k:'No plastic bags',v:'They are banned and confiscated at the airport.'}],
  eat:[{k:'One special dinner',v:'A modern Rwandan tasting menu in Kigali, which surprises everybody.'},{k:'Eat like a local',v:'Brochettes and a Primus at a roadside bar after dark.'},{k:'The one to try',v:'Rwandan coffee at the source — among the best in the world.'},{k:'Something you might miss',v:'A buffet lunch at a local canteen, which is how Kigali eats at midday.'}],
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
  tradeoff:'Resort-shaped: lovely inside the gates, thinner outside them. Cyclone season runs January into March.',
  chooseIf:'you want to unpack once and not think again',
  temps:'24-30°C · cyclones Jan-Mar',
  weather:'Warm all year. May to December is drier and cooler; January to March is hot, humid and the cyclone window. The north and west are calmer than the exposed east.',
  wear:'Beachwear and one smart thing — the better hotels still expect it at dinner. Reef shoes and plenty of sunscreen.',
  food:'Creole, Indian, Chinese and French all at once. Street dholl puri, rougaille, and rum from the local distilleries.',
  sights:[{n:'Île aux Cerfs',d:'A day on the lagoon. Go early or take the last boat back.'},{n:'Black River Gorges',d:'The green interior nobody sees from the resorts.'},{n:'Chamarel',d:'The seven-coloured earths and a waterfall, plus the best rum on the island.'},{n:'Port Louis market',d:'The one place the island is not arranged for visitors.'},{n:'Chamarel',d:'Seven-coloured earths, a waterfall, and the best rum on the island.'},{n:'Île aux Aigrettes',d:'A restored island nature reserve with pink pigeons and giant tortoises.'}],
  watchout:'January to March is the cyclone window, and the east coast is far windier than the brochures suggest. The interior is barely visited.',
  pack:[{k:'Beach',v:'Reef shoes for the coral, and more sunscreen than you think.'},{k:'Dinner',v:'One smart outfit — the better hotels still expect it.'},{k:'Interior',v:'Walking shoes and a light rain layer for Black River Gorges.'},{k:'Boats',v:'A windproof. It is cooler out on the lagoon.'},{k:'Rain',v:'Short sharp showers year round, especially inland.'}],
  eat:[{k:'One special dinner',v:'A beachfront table doing Franco-Mauritian cooking properly.'},{k:'Eat like a local',v:'Dholl puri from a street cart — the national snack, and unbeatable.'},{k:'The one to try',v:'Rougaille, the Creole tomato stew, with octopus.'},{k:'Something you might miss',v:'Port Louis central market at lunchtime, which the resorts never mention.'}],
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
  tradeoff:'The most expensive beaches in the Indian Ocean, and moving between the islands is slow and adds up quickly.',
  chooseIf:'money is not the constraint and the beach has to be perfect',
  temps:'26-31°C all year',
  weather:'Hot and humid all year with no real seasons. The south-east trade wind from May to September brings seaweed to some beaches; the north-west from November brings the rain.',
  wear:'Very little. One long-sleeved layer for the boats and the sun, reef shoes, and the strongest reef-safe sunscreen you can find.',
  food:'Creole with a lot of fish — grilled bourgeois, octopus curry, and breadfruit with everything.',
  sights:[{n:'Anse Source d’Argent',d:'The granite boulders you have seen a thousand times. Go at low tide.'},{n:'Vallée de Mai',d:'Prehistoric palm forest and the coco de mer. A morning.'},{n:'Anse Lazio',d:'Widely called the best beach in the world, and it has a fair claim.'},{n:'Island hopping',d:'Mahé, Praslin and La Digue are three different holidays.'},{n:'Copolia trail',d:'An hour up for the best view on Mahé, and hardly anyone does it.'},{n:'La Digue by bicycle',d:'No cars worth speaking of. The whole island in a day on two wheels.'}],
  watchout:'It is the most expensive beach destination on this list, and seaweed can affect some beaches from May to September.',
  pack:[{k:'Beach',v:'Reef shoes, rash vest, and the strongest reef-safe sunscreen you can find.'},{k:'Boats',v:'A windproof and something dry to change into.'},{k:'Walking',v:'Trainers for Vallée de Mai and the Copolia trail.'},{k:'Evenings',v:'Very relaxed. One smart-casual outfit covers the whole trip.'},{k:'Sun',v:'Equatorial. Midday sun here burns faster than anywhere else on this list.'}],
  eat:[{k:'One special dinner',v:'A Creole tasting menu on Praslin, with the fish landed that afternoon.'},{k:'Eat like a local',v:'Grilled bourgeois with rice and lentils at a beach takeaway.'},{k:'The one to try',v:'Octopus curry with coconut milk and breadfruit.'},{k:'Something you might miss',v:'The Beau Vallon fish market on a Wednesday evening.'}],
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
