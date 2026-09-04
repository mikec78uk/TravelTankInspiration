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
      dismissed:[], pinned:null, lane:'best'
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
  const nights = () => 6;

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

    /* A destination the customer has told us to build around leads, whatever the
       score says — otherwise "rebuild around X" is a button that does not do it. */
    let best = scored[0];
    let pinned = false;
    if(b.pinned){
      const forced = scored.find(x=>x.d.id === b.pinned) ||
                     (function(){ const d = DEST.find(x=>x.id === b.pinned);
                                  if(!d) return null;
                                  const r = score(d,b);
                                  return {d:d, score:r.score, why:r.why}; })();
      if(forced){ best = forced; pinned = true; }
    }

    /* Premium: same brief, but re-scored as if money were no object, so the
       customer's own budget cap does not penalise the very upgrade we are offering. */
    const richBrief = Object.assign({}, b, {budget:3});
    const premium = pool
      .filter(d=>d.id!==best.d.id)
      .map(d=>{
        const r = score(d, richBrief);
        return {d:d, score:r.score, why:r.why, lift:r.score + d.budget*16};
      })
      .sort((a,b2)=>b2.lift-a.lift)[0];

    /* Off the beaten track: the brief still applies, but obscurity is worth a lot. */
    const offbeat = scored
      .filter(x=>x.d.id!==best.d.id && x.d.id!==premium.d.id)
      .map(x=>({...x, lift:x.score + (x.d.offbeat?40:0)}))
      .sort((a,b2)=>b2.lift-a.lift)[0];

    return {best:best, premium:premium, offbeat:offbeat, recycled:recycled, pinned:pinned};
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
    const n = nights();
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
      ['results-v2.html','Results v2']
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

  return {blank,load,save,clear,fresh,money,nights,monthRuns,score,lanes,LANE_META,tripCost,
          isEmpty,summary,chips,removeChip,promptFromBrief,promptFragment,matchReport,parse,nudge,addVibe,
          navbar,siteHeader,mount,go,esc};
})();
