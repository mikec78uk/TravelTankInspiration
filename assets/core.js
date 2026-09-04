/* =========================================================
   TravelTank — Inspiration wireframes
   Shared brief state, matching logic and page chrome.
   ========================================================= */

const TT = (function(){

  const KEY = 'tt_brief_v1';

  /* ---------- brief state ---------- */
  function blank(){
    return {
      origin:'Lagos', who:null, vibes:[], month:null, budget:null,
      maxHours:null, visa:null, heat:null, quieter:false, freeText:'', source:'', thread:[],
      dismissed:[], pinned:null, swap:{}, swapFrom:{}, stay:null, lane:'best'
    };
  }
  function load(){
    try{
      const r = sessionStorage.getItem(KEY);
      if(r){
        const b = Object.assign(blank(), JSON.parse(r));
        if(b.visaOnly && !b.visa) b.visa = 'free';   // migrate the old single toggle
        delete b.visaOnly;
        return b;
      }
    }
    catch(e){}
    return blank();
  }
  function save(b){
    try{ sessionStorage.setItem(KEY, JSON.stringify(b)); }catch(e){}
    return b;
  }
  function clear(){ try{ sessionStorage.removeItem(KEY); }catch(e){} }

  /* Entry points always start from scratch: wipe any brief left over from a
     previous run through, and hand back a clean one. The results page uses
     load() instead, since carrying the brief across is the whole point there. */
  function fresh(){
    clear();
    /* Browser Back can restore a page straight from the bfcache without re-running
       this script, which would put the previous run's answers back on screen.
       Force a reload in that case so the reset actually happens. */
    if(!fresh._armed){
      fresh._armed = true;
      window.addEventListener('pageshow', e=>{ if(e.persisted) location.reload(); });
    }
    return blank();
  }

  /* ---------- formatting ---------- */
  const money = n => '₦' + Math.round(n).toLocaleString('en-NG');
  /* Dates drive every price on the page, so they live on the brief rather than
     being a constant nobody can see or change. */
  const DEFAULT_NIGHTS = 6;
  const nights = b => (b && b.stay && b.stay.nights) ? b.stay.nights : DEFAULT_NIGHTS;

  function pad(n){ return (n < 10 ? '0' : '') + n; }
  function iso(d){ return d.getFullYear() + '-' + pad(d.getMonth()+1) + '-' + pad(d.getDate()); }
  function addDays(isoStr, n){
    const d = new Date(isoStr + 'T00:00:00');
    d.setDate(d.getDate() + n);
    return iso(d);
  }
  function fmtDate(isoStr){
    const d = new Date(isoStr + 'T00:00:00');
    return d.getDate() + ' ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear();
  }
  function daysBetween(a, b){
    return Math.round((new Date(b + 'T00:00:00') - new Date(a + 'T00:00:00')) / 86400000);
  }

  /* Seed a plausible check-in: the month they asked for if there is one, else six
     weeks out. Always in the future. */
  function defaultStay(b){
    const today = new Date();
    let d;
    if(b && b.month){
      d = new Date(today.getFullYear(), b.month - 1, 8);
      if(d < today) d = new Date(today.getFullYear() + 1, b.month - 1, 8);
    } else {
      d = new Date(today.getTime() + 42 * 86400000);
    }
    return {from: iso(d), nights: DEFAULT_NIGHTS};
  }

  function stayOf(b){
    if(!b.stay) b.stay = defaultStay(b);
    return b.stay;
  }

  function monthRuns(d){
    const ms=[...d.months].sort((a,b)=>a-b), runs=[];
    let start=ms[0], prev=ms[0];
    for(let i=1;i<ms.length;i++){
      if(ms[i]===prev+1){ prev=ms[i]; }
      else { runs.push([start,prev]); start=prev=ms[i]; }
    }
    runs.push([start,prev]);
    return runs.map(r=>r[0]===r[1]?MONTHS[r[0]-1]:MONTHS[r[0]-1]+' - '+MONTHS[r[1]-1]).slice(0,2).join(', ');
  }

  /* ---------- scoring ---------- */
  function score(d, b){
    let s = 50; const why = [];

    if(b.vibes && b.vibes.length){
      const hits = b.vibes.filter(v=>d.vibes.includes(v));
      s += Math.min(hits.length,3) * 14;
      s -= (b.vibes.length - hits.length) * 5;
      if(hits.length){
        const names = hits.map(h=>(VIBES.find(v=>v.id===h)||{label:h}).label.toLowerCase());
        why.push('Hits the ' + names.slice(0,2).join(' and ') + ' you asked for');
      }
    }

    if(b.who){
      if(d.who.includes(b.who)){ s += 10; why.push(whoWhy(b.who, d)); }
      else s -= 10;
    }

    if(b.budget){
      const gap = Math.abs(d.budget - b.budget);
      if(gap===0){ s += 14; why.push('Priced about where you said you wanted to be'); }
      else if(gap===1){ s += 3; }
      else { s -= 14; }
    }

    if(b.maxHours){
      if(d.hours <= b.maxHours){
        s += 12;
        if(b.maxHours <= 6) why.push('Only ' + d.hours + ' hour' + (d.hours===1?'':'s') + ' in the air from ' + b.origin);
      } else if(d.hours <= b.maxHours + 2){ s -= 4; }
      else { s -= 22; }
    }

    if(b.month){
      if(d.months.includes(b.month)){ s += 16; why.push(MONTHS_FULL[b.month-1] + ' is one of the best months to go'); }
      else { s -= 12; }
    }

    if(b.heat==='hot'){
      if(d.heat==='hot'){ s += 11; why.push('Reliably hot, not just mild'); }
      else if(d.heat==='warm'){ s += 4; }
      else { s -= 14; }
    }

    if(b.quieter){
      s += (d.offbeat ? 16 : 0) + (4 - d.pace) * 3;
      if(d.offbeat) why.push('Nowhere near as busy as the obvious choice');
    }

    if(b.visa==='free'){
      if(d.visa==='required') s -= 45;
      else if(d.visa==='free'){ s += 8; why.push('No visa at all on a Nigerian passport'); }
      else if(d.visa==='on-arrival'){ s += 5; why.push('Visa on arrival — nothing to arrange before you fly'); }
      else s -= 28;   // an e-visa is still a visa
    } else if(b.visa==='required'){
      if(d.visa==='required'){ s += 12; why.push('Needs a visa, which you said you were happy to sort — and it earns it'); }
      else if(d.visa==='easy'){ s += 4; }
    }

    return {score:s, why:why};
  }

  function whoWhy(who, d){
    if(who==='couple')  return 'Quiet enough for two, with enough going on';
    if(who==='family')  return 'Works with children without becoming a logistics exercise';
    if(who==='friends') return 'Enough to do that nobody has to agree on a plan';
    return 'Easy and safe to do on your own';
  }

  /* ---------- the three lanes ---------- */
  function lanes(b){
    const dropped = b.dismissed || [];
    let pool = DEST.filter(d=>!dropped.includes(d.id));
    /* We always need three lanes to render. If the customer has ruled out so much
       that we cannot fill them, fall back to the full list but say so, rather than
       quietly handing back something they already rejected. */
    let recycled = false;
    if(pool.length < 3){ pool = DEST; recycled = true; }

    const scored = pool.map(d=>{
      const r = score(d,b);
      return {d:d, score:r.score, why:r.why};
    }).sort((x,y)=>y.score-x.score);

    /* Premium: same brief, but re-scored as if money were no object, so the
       customer's own budget cap does not penalise the very upgrade we are offering. */
    const richBrief = Object.assign({}, b, {budget:3});
    const premiumRank = pool.map(d=>{
      const r = score(d, richBrief);
      return {d:d, score:r.score, why:r.why, lift:r.score + d.budget*16};
    }).sort((a,c)=>c.lift-a.lift);

    /* Off the beaten track: the brief still applies, but obscurity is worth a lot. */
    const offbeatRank = scored.map(x=>({d:x.d, score:x.score, why:x.why,
      lift:x.score + (x.d.offbeat?40:0)})).sort((a,c)=>c.lift-a.lift);

    const swap = b.swap || {};
    const used = [];
    const out = {recycled:recycled, pinned:false};

    /* A lane the customer has fixed — pinned from a comparison, or swapped by
       nudging that card — leads whatever the score says. */
    function forced(key){
      const id = (key === 'best' && b.pinned) ? b.pinned : swap[key];
      if(!id || used.indexOf(id) !== -1) return null;
      if(dropped.indexOf(id) !== -1) return null;
      const d = DEST.find(x=>x.id === id);
      if(!d) return null;
      const r = score(d, b);
      if(key === 'best' && b.pinned) out.pinned = true;
      return {d:d, score:r.score, why:r.why, swapped:!!swap[key]};
    }
    function pick(key, rank){
      const f = forced(key);
      if(f){ used.push(f.d.id); return f; }
      const hit = rank.find(x=>used.indexOf(x.d.id) === -1) || rank[0];
      if(hit) used.push(hit.d.id);
      return hit;
    }

    out.best    = pick('best', scored);
    out.premium = pick('premium', premiumRank);
    out.offbeat = pick('offbeat', offbeatRank);
    return out;
  }

  /* ---- "like this, but…" ----
     Nudges hang off a single card and swap only that card. We work out the
     replacement first and only offer the ones we can actually deliver, so a chip
     never leads nowhere. */
  const CARD_NUDGES = [
    {id:'cheaper', label:'Cheaper',          applies:d=>d.budget > 1,
     ok:(x,d)=>x.budget < d.budget},
    {id:'shorter', label:'Shorter flight',   applies:d=>d.hours > 3,
     ok:(x,d)=>x.hours < d.hours},
    {id:'hotter',  label:'Hotter',           applies:d=>d.heat !== 'hot',
     ok:x=>x.heat === 'hot'},
    {id:'quieter', label:'Less touristy',    applies:d=>!d.offbeat,
     ok:x=>!!x.offbeat},
    {id:'visa',    label:'No visa to sort',  applies:d=>d.visa !== 'free' && d.visa !== 'on-arrival',
     ok:x=>x.visa === 'free' || x.visa === 'on-arrival'},
    {id:'beach',   label:'More beach',       applies:d=>d.vibes.indexOf('beach') === -1,
     ok:x=>x.vibes.indexOf('beach') !== -1},
    {id:'wilder',  label:'More adventurous', applies:d=>d.vibes.indexOf('adventure') === -1,
     ok:x=>x.vibes.indexOf('adventure') !== -1},
    {id:'special', label:'Something special', applies:d=>d.budget < 3,
     ok:(x,d)=>x.budget > d.budget}
  ];

  /* How close a candidate is to the one being replaced — a nudge should give you
     the same trip with one thing changed, not an unrelated destination. */
  function similarity(x, d){
    let s = 0;
    d.vibes.forEach(v=>{ if(x.vibes.indexOf(v) !== -1) s += 3; });
    if(x.heat === d.heat) s += 1;
    if(Math.abs(x.pace - d.pace) <= 1) s += 1;
    return s;
  }

  function nudgeOptionsFor(d, b, exclude){
    const dropped = b.dismissed || [];
    const pool = DEST.filter(x=>x.id !== d.id &&
      (exclude || []).indexOf(x.id) === -1 && dropped.indexOf(x.id) === -1);
    const out = [], taken = [];
    CARD_NUDGES.forEach(n=>{
      if(!n.applies(d)) return;
      /* A nudge has to return the same trip with one thing changed. Something with
         nothing in common is a different holiday, not a cheaper version of this one. */
      const cands = pool.filter(x=>n.ok(x, d) &&
        x.vibes.some(v=>d.vibes.indexOf(v) !== -1) &&
        taken.indexOf(x.id) === -1);
      if(!cands.length) return;
      cands.sort((a,c)=>{
        const sim = similarity(c, d) - similarity(a, d);
        if(sim) return sim;
        return score(c, b).score - score(a, b).score;
      });
      taken.push(cands[0].id);          /* two chips landing on the same place is one chip */
      out.push({id:n.id, label:n.label, to:cands[0]});
    });
    return out.slice(0, 4);
  }

  const LANE_META = {
    best:    {label:'Best match',           blurb:'The closest fit to everything you have told us.'},
    premium: {label:'The premium option',   blurb:'Same brief, more money, noticeably better trip.'},
    offbeat: {label:'Off the beaten track', blurb:'Nobody you know has done this one.'}
  };

  /* ---------- trip costing ---------- */
  function tripCost(d, tier, flightIdx){
    const f = d.flights[flightIdx==null?1:flightIdx];
    const h = d.hotels[tier][0];
    const n = nights(b);
    return {flight:f.price, hotelNight:h.night, hotelTotal:h.night*n, nights:n,
            total:f.price + h.night*n};
  }

  /* ---------- brief summary ---------- */
  function isEmpty(b){
    return !b.who && !b.vibes.length && !b.month && !b.budget && !b.maxHours && !b.visa && !b.heat && !b.quieter && !b.freeText.trim();
  }

  function summary(b){
    if(isEmpty(b)) return 'You have not told us much yet, so this is our broadest crowd-pleaser.';
    const bits = [];
    if(b.who) bits.push(WHO.find(w=>w.id===b.who).label.toLowerCase());
    if(b.vibes.length) bits.push(b.vibes.map(v=>VIBES.find(x=>x.id===v).label.toLowerCase()).join(' and '));
    if(b.month) bits.push('in ' + MONTHS_FULL[b.month-1]);
    if(b.budget) bits.push(BUDGETS[b.budget-1].label.toLowerCase());
    if(b.maxHours && b.maxHours!==99) bits.push('within ' + b.maxHours + ' hours of ' + b.origin);
    if(b.heat==='hot') bits.push('somewhere reliably hot');
    if(b.quieter) bits.push('away from the crowds');
    if(b.visa==='free') bits.push('no visa needed');
    else if(b.visa==='required') bits.push('happy to sort a visa');
    return 'Based on ' + bits.join(', ') + '.';
  }

  function chips(b){
    const out = [];
    if(b.who)      out.push({k:'who',    label:WHO.find(w=>w.id===b.who).label});
    b.vibes.forEach(v=>out.push({k:'vibe:'+v, label:VIBES.find(x=>x.id===v).label}));
    if(b.month)    out.push({k:'month',  label:MONTHS_FULL[b.month-1]});
    if(b.budget)   out.push({k:'budget', label:BUDGETS[b.budget-1].label});
    if(b.maxHours) out.push({k:'hours',  label:FLIGHTS.find(f=>f.id===b.maxHours).label});
    if(b.heat==='hot') out.push({k:'heat', label:'Somewhere hot'});
    if(b.quieter)      out.push({k:'quiet', label:'Less touristy'});
    if(b.pinned){
      const d = DEST.find(x=>x.id === b.pinned);
      if(d) out.push({k:'pinned', label:'Built around ' + d.name});
    }
    if(b.visa==='free')     out.push({k:'visa', label:'Visa-free'});
    else if(b.visa==='required') out.push({k:'visa', label:'Visa required'});
    return out;
  }

  function removeChip(b, k){
    if(k==='who') b.who=null;
    else if(k.indexOf('vibe:')===0) b.vibes = b.vibes.filter(v=>v!==k.slice(5));
    else if(k==='month') b.month=null;
    else if(k==='budget') b.budget=null;
    else if(k==='hours') b.maxHours=null;
    else if(k==='heat') b.heat=null;
    else if(k==='quiet') b.quieter=false;
    else if(k==='visa') b.visa=null;
    else if(k==='pinned') b.pinned=null;
    return b;
  }

  /* ---------- pre-formulated prompt (Concept 2 modal) ---------- */
  const VIBE_PHRASE = {
    beach:'beach time', city:'city and culture', adventure:'some adventure',
    wildlife:'wildlife and nature', food:'good food and nightlife',
    romance:'somewhere romantic', family:'plenty for the kids to do',
    wellness:'proper rest'
  };
  const WHO_PHRASE = {
    solo:'A trip for one', couple:'A trip for two of us',
    family:'A family trip', friends:'A trip with friends'
  };
  const BUDGET_PHRASE = {1:'keeping the cost down', 2:'nothing extravagant', 3:'happy to go all out'};

  /* One field of the brief on its own, as a standalone sentence. Needed where an
     answer has to be added to wording the customer has already written, so we add
     only the new fact instead of restating — and contradicting — the whole brief. */
  /* An itemised account of how a destination measures against the brief — every
     point the customer actually stated, and whether this place meets it. Misses
     are reported as misses; a recommendation that only lists hits is marketing. */
  /* ---- flights: cabins, and the detail a fare page is expected to show ----
     Everything below is derived from the flight record we already hold, so all
     16 destinations get it without inventing a schedule per route. */
  const CABINS = [
    {id:'eco',   label:'Economy',         mult:1,    hand:'1 x 7kg'},
    {id:'prem',  label:'Premium economy', mult:1.8,  hand:'1 x 10kg'},
    {id:'biz',   label:'Business',        mult:3.4,  hand:'2 x 10kg'},
    {id:'first', label:'First',           mult:6.0,  hand:'2 x 12kg', minHours:8}
  ];
  const CARRIER_CODE = {
    'Air Peace':'P4','Africa World Airlines':'AW','Arik Air':'W3','ASKY Airlines':'KP',
    'Qatar Airways':'QR','Emirates':'EK','Royal Air Maroc':'AT','EgyptAir':'MS',
    'Kenya Airways':'KQ','Ethiopian Airlines':'ET','RwandAir':'WB','South African Airways':'SA',
    'Turkish Airlines':'TK','Air Côte d’Ivoire':'HF','TAP Air Portugal':'TP','Air Senegal':'HC',
    'British Airways':'BA','Virgin Atlantic':'VS'
  };
  const AIRCRAFT_SHORT = ['Boeing 737-800','Airbus A320neo','Embraer E195'];
  const AIRCRAFT_MID   = ['Airbus A330-300','Boeing 787-8','Airbus A321neo'];
  const AIRCRAFT_LONG  = ['Boeing 787-9','Airbus A350-900','Boeing 777-300ER'];

  function hashOf(str){
    let h = 0;
    for(let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
    return h;
  }
  function cabinsFor(d){
    return CABINS.filter(c=>!c.minHours || d.hours >= c.minHours);
  }
  function cabinOf(id){ return CABINS.find(c=>c.id === id) || CABINS[0]; }
  function farePrice(f, cabinId){
    return Math.round(f.price * cabinOf(cabinId).mult / 1000) * 1000;
  }
  function durMins(dur){
    const m = dur.match(/(\d+)h\s*(\d+)?/);
    return m ? (+m[1]) * 60 + (+(m[2] || 0)) : 0;
  }
  function hhmm(mins){
    const h = Math.floor(((mins % 1440) + 1440) % 1440 / 60), m = Math.round(mins) % 60;
    return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
  }
  function aircraftFor(f){
    const mins = durMins(f.dur);
    const pool = mins < 200 ? AIRCRAFT_SHORT : (mins < 480 ? AIRCRAFT_MID : AIRCRAFT_LONG);
    return pool[hashOf(f.carrier + f.route) % pool.length];
  }
  function flightNumber(f, d, leg){
    const code = CARRIER_CODE[f.carrier] || f.carrier.slice(0,2).toUpperCase();
    return code + ' ' + (100 + hashOf(f.carrier + d.id) % 800 + (leg === 'in' ? 1 : 0));
  }

  /* One leg, with a plausible departure derived from the record and an arrival
     computed from the stated duration. */
  function legOf(f, d, leg){
    const out = leg === 'out';
    /* Routes read "LOS → CPT" or "LOS → NBO → CPT" — the last stop is the
       destination, anything between is the connection. */
    const parts = f.route.split('→').map(x=>x.trim()).filter(Boolean);
    const dest = parts[parts.length - 1];
    const via  = parts.length > 2 ? parts.slice(1, -1) : [];
    const from = out ? 'LOS' : dest;
    const to   = out ? dest : 'LOS';
    const dep  = ((out ? 7 : 11) + hashOf(f.carrier + d.id + leg) % 13) * 60
                 + [0,15,25,40,50][hashOf(f.route + leg) % 5];
    const mins = durMins(f.dur);
    const arr  = dep + mins;
    return {
      from: from, to: to, via: out ? via : via.slice().reverse(),
      no: flightNumber(f, d, leg), carrier: f.carrier, aircraft: aircraftFor(f),
      dep: hhmm(dep), arr: hhmm(arr), plusDay: Math.floor(arr / 1440),
      dur: f.dur, stops: f.stops
    };
  }

  /* Baggage follows the cabin, except that a stripped economy fare says so. */
  function baggageFor(f, cabinId){
    const c = cabinOf(cabinId);
    const stripped = /hand baggage|no bag|carry-on only/i.test(f.note);
    const checked = cabinId === 'eco' ? (stripped ? 'Not included' : '1 x 23kg')
                  : cabinId === 'prem' ? '2 x 23kg'
                  : cabinId === 'biz'  ? '2 x 32kg' : '3 x 32kg';
    return {hand: c.hand, checked: checked, stripped: stripped && cabinId === 'eco'};
  }
  function fareRules(cabinId){
    return cabinId === 'eco'  ? 'Non-refundable · changes for a fee'
         : cabinId === 'prem' ? 'Changeable for a fee · non-refundable'
         : 'Flexible · changes and refunds permitted';
  }

  /* A small stroke-icon set, drawn to one grid so they sit together. */
  const ICONS = {
    plane:'M2 14l19-7-7 19-2.5-7.5L2 14z',
    sun:'M12 4.5v-2M12 21.5v-2M4.5 12h-2M21.5 12h-2M6.7 6.7L5.3 5.3M18.7 18.7l-1.4-1.4M6.7 17.3l-1.4 1.4M18.7 5.3l-1.4 1.4M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z',
    passport:'M5 3h11a3 3 0 013 3v15H8a3 3 0 01-3-3V3zM5 18h14M12 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM9.5 15h5',
    calendar:'M4 6h16v15H4zM4 10h16M8.5 3v5M15.5 3v5',
    wallet:'M3 7h15a2 2 0 012 2v9a2 2 0 01-2 2H3zM3 7V5.5A1.5 1.5 0 014.5 4H16M16.5 13.5h1.5',
    clock:'M12 3a9 9 0 100 18 9 9 0 000-18zM12 7v5.5l3.5 2',
    wifi:'M2.5 9a14 14 0 0119 0M6 12.5a9 9 0 0112 0M9.5 16a4.5 4.5 0 015 0M12 19.5h.01',
    pool:'M3 17.5c1.8 0 1.8 1.5 3.6 1.5s1.8-1.5 3.6-1.5 1.8 1.5 3.6 1.5 1.8-1.5 3.6-1.5 1.8 1.5 3.6 1.5M7 15V6a2 2 0 014 0v9M13 15V6a2 2 0 014 0v9M7 9.5h4M13 9.5h4',
    food:'M6 3v8a2.5 2.5 0 005 0V3M8.5 11v10M17 3c-1.5 1.5-2 3-2 5.5S16 12 17 12v9',
    spa:'M12 21c0-5 3.5-8.5 8-9-.5 4.5-4 8-8 9zM12 21c0-5-3.5-8.5-8-9 .5 4.5 4 8 8 9zM12 21V11a6 6 0 010-8 6 6 0 010 8',
    gym:'M4 9v6M7 6.5v11M17 6.5v11M20 9v6M7 12h10',
    beach:'M3 20h18M6 20c0-6 3-10 7-10s7 4 7 10M13 10V4M4.5 9.5c2-3 6-4 8.5-2.5M21 12c-1.5-3-5-4.5-8-3.5',
    parking:'M4 3h16v18H4zM9.5 17V8h3.5a2.75 2.75 0 010 5.5H9.5',
    bar:'M4 4h16l-8 8v7M8 19h8M14.5 8.5l4-4',
    concierge:'M3 18h18M5 18a7 7 0 0114 0M12 8V6M10.5 6h3',
    room:'M3 18v-5a2 2 0 012-2h14a2 2 0 012 2v5M3 18v2M21 18v2M6 11V8a1.5 1.5 0 011.5-1.5h9A1.5 1.5 0 0118 8v3',
    pin:'M12 22s7-6.4 7-12a7 7 0 10-14 0c0 5.6 7 12 7 12zM12 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z'
  };
  function icon(name, cls){
    const d = ICONS[name];
    if(!d) return '';
    return '<svg class="ic' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" fill="none" ' +
      'stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" ' +
      'aria-hidden="true"><path d="' + d + '"/></svg>';
  }

  /* Facilities are read off the property record — star rating, board and where it is —
     rather than authored per hotel, so they stay consistent across all of them. */
  function facilitiesFor(h, d){
    const out = [{i:'wifi', t:'Wi-Fi throughout'}];
    const where = (h.area + ' ' + h.note).toLowerCase();

    if(/breakfast/i.test(h.board))      out.push({i:'food', t:'Breakfast included'});
    if(/half board/i.test(h.board))     out.push({i:'food', t:'Half board'});
    if(/all inclusive/i.test(h.board))  out.push({i:'bar',  t:'All inclusive'});
    if(/full board/i.test(h.board))     out.push({i:'food', t:'Full board'});

    if(h.stars >= 3) out.push({i:'pool', t:'Pool'});
    if(h.stars >= 4) out.push({i:'food', t:'Restaurant on site'});
    if(h.stars >= 4) out.push({i:'parking', t:'Parking'});
    if(h.stars >= 5) out.push({i:'spa',  t:'Spa'});
    if(h.stars >= 5) out.push({i:'gym',  t:'Gym'});
    if(h.stars >= 5) out.push({i:'concierge', t:'Concierge'});

    if(/beach|beachfront|coast|lagoon|sea/.test(where)) out.push({i:'beach', t:'Beach access'});
    if(d && d.vibes.indexOf('family') !== -1)           out.push({i:'room',  t:'Family rooms'});

    /* de-duplicate by label */
    const seen = {};
    return out.filter(x=>{ if(seen[x.t]) return false; seen[x.t] = 1; return true; });
  }

  /* Room options are derived from the hotel's nightly rate and star rating rather
     than authored per property — enough to price a party realistically in a
     wireframe, and consistent across all of them. */
  function roomsFor(h){
    const round = n => Math.round(n / 1000) * 1000;
    const lux = h.stars >= 5, mid = h.stars >= 4;
    return [
      {id:'std',  name: lux ? 'Deluxe room' : (mid ? 'Standard double' : 'Standard room'),
       sleeps:2, night: round(h.night)},
      {id:'sup',  name: lux ? 'Junior suite' : (mid ? 'Superior, better view' : 'Larger room'),
       sleeps:2, night: round(h.night * 1.28)},
      {id:'fam',  name: mid ? 'Family room' : 'Twin or family room',
       sleeps:4, night: round(h.night * 1.62)}
    ];
  }

  /* How many of a given room a party needs. */
  function roomsNeeded(room, adults, children){
    return Math.max(1, Math.ceil((adults + children) / room.sleeps));
  }

  function matchReport(d, b){
    const checks = [];
    const add = (label, ok) => checks.push({label:label, ok:!!ok});

    if(b.who){
      const w = WHO.find(x=>x.id===b.who);
      add('Works for ' + w.label.toLowerCase(), d.who.indexOf(b.who) !== -1);
    }
    b.vibes.forEach(v=>{
      const lbl = (VIBES.find(x=>x.id===v)||{label:v}).label;
      add(lbl, d.vibes.indexOf(v) !== -1);
    });
    if(b.month) add(MONTHS_FULL[b.month-1] + ' is a good time to go', d.months.indexOf(b.month) !== -1);
    if(b.budget) add('Within your ' + BUDGETS[b.budget-1].label.toLowerCase() + ' band', d.budget <= b.budget);
    if(b.maxHours){
      add(b.maxHours === 99 ? 'Any flight length' : 'Under ' + b.maxHours + ' hours from ' + b.origin,
          d.hours <= b.maxHours);
    }
    if(b.visa === 'free')     add('Nothing to arrange before you fly', d.visa === 'free' || d.visa === 'on-arrival');
    if(b.visa === 'required') add('You were happy to sort a visa', true);
    if(b.heat === 'hot')      add('Reliably hot', d.heat === 'hot');
    if(b.quieter)             add('Away from the crowds', !!d.offbeat || d.pace <= 2);

    const hit = checks.filter(c=>c.ok).length;
    const total = checks.length;
    const pct = total ? hit / total : null;

    let level;
    if(!total)            level = 'Broad crowd-pleaser';
    else if(pct >= 0.85)  level = 'Excellent match';
    else if(pct >= 0.6)   level = 'Strong match';
    else                  level = 'Partial match';

    return {checks:checks, hit:hit, total:total, pct:pct, level:level};
  }

  function promptFragment(b, key){
    const cap = t => t ? t.charAt(0).toUpperCase() + t.slice(1) : '';
    switch(key){
      case 'who':
        return b.who ? WHO_PHRASE[b.who] + '.' : '';
      case 'vibes': {
        if(!b.vibes.length) return '';
        const v = b.vibes.map(x=>VIBE_PHRASE[x] || VIBES.find(y=>y.id===x).label.toLowerCase());
        return 'We want ' + (v.length>1 ? v.slice(0,-1).join(', ') + ' and ' + v[v.length-1] : v[0]) + '.';
      }
      case 'month':    return b.month ? 'In ' + MONTHS_FULL[b.month-1] + '.' : '';
      case 'budget':   return b.budget ? cap(BUDGET_PHRASE[b.budget]) + '.' : '';
      case 'maxHours':
        if(!b.maxHours) return '';
        return b.maxHours === 99 ? 'Anywhere in the world.'
             : 'No more than ' + b.maxHours + ' hours from ' + b.origin + '.';
      case 'visa':
        if(b.visa === 'free')     return 'Visa-free or visa on arrival.';
        if(b.visa === 'required') return 'Happy to apply for a visa if it is worth it.';
        return '';
      case 'heat':     return b.heat === 'hot' ? 'Somewhere reliably hot.' : '';
      case 'quieter':  return b.quieter ? 'Away from the crowds.' : '';
    }
    return '';
  }

  function promptFromBrief(b){
    if(isEmpty(b)) return '';

    let head = b.who ? WHO_PHRASE[b.who] : 'A trip';
    if(b.vibes.length){
      const v = b.vibes.map(x=>VIBE_PHRASE[x] || VIBES.find(y=>y.id===x).label.toLowerCase());
      head += ' with ' + (v.length>1 ? v.slice(0,-1).join(', ') + ' and ' + v[v.length-1] : v[0]);
    }

    const rest = [];
    if(b.month) rest.push('in ' + MONTHS_FULL[b.month-1]);
    if(b.maxHours === 99) rest.push('anywhere in the world');
    else if(b.maxHours) rest.push('no more than ' + b.maxHours + ' hours from ' + b.origin);
    if(b.heat==='hot') rest.push('somewhere reliably hot');
    if(b.quieter) rest.push('away from the crowds');
    if(b.budget) rest.push(BUDGET_PHRASE[b.budget]);
    if(b.visa==='free') rest.push('visa-free or visa on arrival for a Nigerian passport');
    else if(b.visa==='required') rest.push('happy to apply for a visa if it is worth it');

    return (rest.length ? head + ', ' + rest.join(', ') : head) + '.';
  }

  /* ---------- natural-language brief parsing ---------- */
  const KEYWORDS = [
    [/beach|\bsea\b|sand|coast|island|swim|lagoon/i,      b=>addVibe(b,'beach'),    'beach time'],
    [/city|culture|museum|history|architect|gallery/i,b=>addVibe(b,'city'),     'city and culture'],
    [/adventure|hike|climb|trek|\bactive\b|surf|raft/i,   b=>addVibe(b,'adventure'),'adventure'],
    [/safari|wildlife|animal|nature|game drive|bird/i,b=>addVibe(b,'wildlife'), 'wildlife'],
    [/\bfood\b|\beat(ing|s)?\b|restaurant|nightlife|\bbars?\b|part(y|ies)/i,      b=>addVibe(b,'food'),     'food and nightlife'],
    [/romantic|romance|honeymoon|anniversar/i,        b=>addVibe(b,'romance'),  'romance'],
    [/kids|children|child|family/i,                   b=>{addVibe(b,'family'); b.who='family';}, 'a family trip'],
    [/\bspas?\b|wellness|relax|reset|unwind|slow morning/i, b=>addVibe(b,'wellness'), 'rest'],
    [/less touristy|not touristy|too touristy|off the beaten|away from the crowds|somewhere quiet|fewer (people|crowds)/i, b=>b.quieter=true, 'away from the crowds'],
    [/cheap|budget|affordable|save money|not expensive|low cost/i, b=>b.budget=1, 'a tighter budget'],
    [/luxury|luxurious|splash out|all out|five star|5 star|premium/i, b=>b.budget=3, 'going all out'],
    [/\bhot\b|sunshine|sunny|somewhere warm|really warm/i, b=>b.heat='hot', 'somewhere reliably hot'],
    [/visa.?free|no visa|without a visa|skip the visa|no embassy/i, b=>b.visa='free', 'visa-free only'],
    [/happy to (get|apply for|sort).{0,14}visa|visa is fine|don'?t mind a visa|do not mind a visa|visa no problem/i, b=>b.visa='required', 'happy to sort a visa'],
    [/solo|on my own|by myself|just me/i,             b=>b.who='solo',    'travelling solo'],
    [/couple|two of us|me and my (wife|husband|partner|girlfriend|boyfriend)|partner/i, b=>b.who='couple','a trip for two'],
    [/friends|group of us|the lads|the girls/i,       b=>b.who='friends', 'a trip with friends'],
    [/short flight|nearby|quick hop/i,                b=>b.maxHours=3,    'a short flight'],
    [/too far|too long a flight|closer to home|not so far/i, b=>{
       const o=[3,6,10,99], c=b.maxHours||99;
       b.maxHours = o[Math.max(0,o.indexOf(c)-1)];
     }, 'a shorter flight'],
    [/long haul|far away|anywhere/i,                  b=>b.maxHours=99,   'anywhere on earth']
  ];

  function addVibe(b,v){ if(!b.vibes.includes(v)) b.vibes.push(v); }

  function parse(text, b){
    const notes = [];
    KEYWORDS.forEach(([re,fn,note])=>{ if(re.test(text)){ fn(b); if(notes.indexOf(note)<0) notes.push(note); } });
    MONTHS_FULL.forEach((m,i)=>{
      if(new RegExp('\b'+m+'\b','i').test(text) || new RegExp('\b'+MONTHS[i]+'\b','i').test(text)){
        b.month = i+1; notes.push('travelling in ' + m);
      }
    });
    const nm = text.match(/(?:under|below|less than|max(?:imum)?|up to)\s*[₦n]?\s*([\d,.]+)\s*(m|million|k|thousand)?/i);
    if(nm){
      let v = parseFloat(nm[1].replace(/,/g,''));
      const u = (nm[2]||'').toLowerCase();
      if(u==='m'||u==='million') v*=1e6; else if(u==='k'||u==='thousand') v*=1e3;
      if(v>0){ b.budget = v < 900000 ? 1 : (v < 2200000 ? 2 : 3); notes.push('a budget around ' + money(v)); }
    }
    const hm = text.match(/(\d+)\s*(?:h|hr|hour)/i);
    if(hm){ const h=parseInt(hm[1],10); b.maxHours = h<=3?3:(h<=6?6:(h<=10?10:99)); notes.push('within ' + h + ' hours'); }
    return notes;
  }

  /* ---------- nudges ---------- */
  function nudge(b, id){
    switch(id){
      case 'hotter':    b.heat='hot'; return 'filtered to the reliably hot options';
      case 'cheaper':   b.budget = Math.max(1,(b.budget||3)-1); return 'dropped to ' + BUDGETS[b.budget-1].label.toLowerCase();
      case 'shorter': {
        const o=[3,6,10,99], c=b.maxHours||99;
        b.maxHours = o[Math.max(0,o.indexOf(c)-1)];
        /* Reads inside "We ___ and picked again", so it has to be a verb phrase. */
        return b.maxHours===99 ? 'left the flight length open' : 'capped flights at ' + b.maxHours + ' hours';
      }
      case 'adventure': addVibe(b,'adventure'); return 'added adventure to your brief';
      case 'beach':     addVibe(b,'beach');     return 'added more beach to your brief';
      case 'quieter':   b.quieter = true;       return 'pushed towards the less touristy end';
      case 'visa':      b.visa = 'free';        return 'filtered to visa-free and visa on arrival';
    }
    return '';
  }

  /* ---------- page chrome ---------- */
  function navbar(current){
    const items = [
      ['index.html','Overview'],
      ['concept-1.html','1 · Guided brief'],
      ['concept-2.html','2 · Prompt + help'],
      ['concept-3.html','3 · Conversation'],
      ['concept-4.html','4 · Stepped prompt'],
      ['results.html','Results'],
      ['results-v2.html','Results v2'],
      ['flights.html','Flights']
    ];
    return '<div class="wf-bar"><div class="wf-bar-in">' +
      '<span class="wf-tag">Wireframe</span>' +
      '<span>TravelTank &mdash; Inspiration</span>' +
      '<nav class="wf-nav">' +
      items.map(([h,l])=>'<a href="'+h+'"'+(h===current?' class="on"':'')+'>'+l+'</a>').join('') +
      '</nav></div></div>';
  }

  function siteHeader(){
    return '<header class="site-header">' +
      '<div class="logo">TravelTank</div>' +
      '<ul class="main-nav">' +
        '<li><a href="#">Flights</a></li><li><a href="#">Hotels</a></li>' +
        '<li><a href="#">Holidays</a></li><li><a href="#" class="on">Inspiration</a></li>' +
      '</ul>' +
      '<div class="header-right"><span>Favourites (0)</span><span>NGN (₦)</span><span>My account</span></div>' +
      '</header>';
  }

  function mount(current){
    document.body.insertAdjacentHTML('afterbegin', navbar(current) + siteHeader());
  }

  function go(source){
    const b = load(); b.source = source; save(b);
    location.href = 'results.html';
  }

  const esc = s => String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

  return {blank,load,save,clear,fresh,money,nights,stayOf,defaultStay,addDays,fmtDate,daysBetween,iso,monthRuns,score,lanes,LANE_META,tripCost,
          isEmpty,summary,chips,removeChip,promptFromBrief,promptFragment,matchReport,nudgeOptionsFor,roomsFor,roomsNeeded,icon,facilitiesFor,CABINS,cabinsFor,cabinOf,farePrice,legOf,baggageFor,fareRules,aircraftFor,parse,nudge,addVibe,
          navbar,siteHeader,mount,go,esc};
})();
