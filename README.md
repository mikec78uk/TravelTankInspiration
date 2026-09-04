# TravelTank — Inspiration

Greyscale wireframes for the TravelTank inspiration function. Three entry points into the same
recommendation engine, all leading to a shared results page.

**Live preview:** https://mikec78uk.github.io/TravelTankInspiration/
*(enable GitHub Pages under Settings → Pages → Deploy from branch → `main` / root)*

---

## What's here

| Page | What it is |
|---|---|
| [`index.html`](index.html) | Overview — the four entry points side by side |
| [`concept-1.html`](concept-1.html) | **Entry point 1** — guided brief (structured questions) |
| [`concept-2.html`](concept-2.html) | **Entry point 2** — open prompt with suggestions and a *Need help?* modal |
| [`concept-3.html`](concept-3.html) | **Entry point 3** — conversational, asks up to three follow-ups |
| [`concept-4.html`](concept-4.html) | **Entry point 4** — stepped questions on the page, writing into the prompt |
| [`results.html`](results.html) | Shared results — three destinations, flights, hotels, editable brief |
| [`results-v2.html`](results-v2.html) | Working copy of the results page, so the original survives edits |
| [`flights.html`](flights.html) | Step 2 — the logistics, once the destination and hotel are settled |

Shared code lives in `assets/`: `tt.css` (the wireframe system), `data.js` (destinations,
flights, hotels) and `core.js` (brief state, matching logic, page chrome).

## The four entry points

**1 — Guided brief.** The Figma frame, built out. Six groups of chips plus a free-text field.
Every field is optional; submitting an empty form still returns a recommendation.

*Entry requirements* is a two-way choice — **Visa-free** or **Visa required** — rather than a
single on/off toggle, so the customer can say a visa is no obstacle instead of only being able
to rule one out. Both options change the shortlist: visa-free excludes e-visa destinations as
well as embassy ones, and visa-required actively surfaces the places that need one.

**2 — Prompt with help on demand.** Lands on the standard Flights search, as the real homepage
does; *Inspire me* is the fourth tab. Selecting it does not focus the prompt box — the
worked-example suggestions appear only once the customer clicks into it, and clear away as soon
as they start typing.
*Need help?* opens a modal containing the Concept 1 questions. Whatever the customer picks is
turned into a plain-English prompt, dropped into the textbox when the modal closes — by any
route, including the X and the Esc key — and remains fully editable before sending.

**3 — Conversation.** The same homepage furniture as Concept 2, but the search panel itself
does the asking. Everything happens inside that one card, which grows as it goes: the prompt is
replaced by an echo of what the customer said (with *Edit*), then a collapsible line explaining
what was picked up and what is still missing, then the questions — up to three, paged through
in place (`‹ 2 of 3 ›`), then the brief and the hand-off. No chat bubbles and no separate
conversation page; the difference from Concept 2 is only what the panel does after you type.

Each question is a numbered list. It is fully keyboard-driven: `1`–`9` select, `↑` `↓`
navigate, `↵` chooses, `esc` skips. Every question also carries a *Something else* field for a
free-text answer, which is parsed the same way the opening message is, and the `×` stops the
questioning outright and goes with whatever it has. Interests are multi-select — options
toggle, and `esc` means done rather than discard once anything is picked.

## The results page

`results.html` is the version already shown to the client. `results-v2.html` is the working
copy where changes are made, so the original survives — both are in the
wireframe nav, and all four entry points still open the original. Each page carries its own
layout CSS and script inline, so editing one leaves the other alone; they do share
`assets/tt.css`, `core.js` and `data.js`, and a change there lands on both.

### What v2 does differently

The original page reads as a way of navigating destination content. v2 is built to read as a
recommendation, and to show its working.

All three are on the page at once as separate cards rather than tabs you toggle — bordered,
spaced apart, imagery running to the card edges, with a heavier top rule on the lead pick. Each one
carries a **TravelTank verdict**, **Why it fits you**, **The trade-off** — a real downside,
written per destination — and an expandable **Why we're confident**.

*Why we're confident* is itemised against the brief and **reports misses as misses**: the
premium option is routinely labelled a *Partial match* with crosses against the budget, the
flight cap or the visa. A recommendation that only ever lists hits is an advert.

Selecting a destination opens a **full-screen sheet from the bottom**. The page behind it is
locked while it is open and returns to where it was on close. It runs: overview and shark tip,
weather with a temperature band, what to wear, what you will be eating, four sights not to miss,
your party, and where to stay.

**Hotels are an accordion** — open one without leaving the page and pick a room type. Room
options are derived from the property's nightly rate and star rating rather than authored, and
**Who is coming** (adults, children, rooms) reprices as you change it. A family of four often
finds one family room beats two doubles, which the page shows rather than states.

The **flights are a separate page** — the hotel is still part of the inspiration, the flight is
logistics. It carries the party and hotel across, suggests one flight with the reasoning shown,
lists the rest of the route, and totals the trip.

**Compare** opens a side-by-side sheet: ten rows — match against the brief, *Choose this if*,
flight, entry, season, price band, indicative total, what it is good for, pace and *Main
compromise* — with the objectively best cell in a row marked (Shortest, Cheapest). Row labels
stay pinned while the columns scroll.

**Challenge our pick** is a strip under the table rather than a column in it — a free-text
field with autocomplete, where matching destinations appear with the matched letters marked,
navigable by arrow keys and Enter. Type something we do not have and it says so and offers to
put it to a Travel Shark, carrying what you typed into the note. Choosing one adds a fourth
column to the table,
and **TravelTank's call** gives a straight answer on it. The verdict is computed from the same
points shown beneath it, so it flips to *"Honestly? X is the better call"* when their pick
genuinely wins. **Rebuild around X** then pins it as the lead recommendation — labelled *Your
pick*, not *Best match* — relaxing only the parts of the brief that were blocking it and saying
which. A chip on the brief undoes it.

*Like the direction but want a little more help?* sits at the foot of the page and opens a form
that names what is already being passed to a Travel Shark, asks what you want help with, and
takes a free-text note.

*Nudge it* docks to the bottom of the window and only appears once the customer has scrolled
into the recommendations — offering it on arrival asks them to change a result they have not
read yet. **Edit brief** is unchanged.

Three destinations the customer toggles between:

- **Best match** — the closest fit to the brief
- **The premium option** — re-scored as if money were no object, so the customer's own budget
  cap doesn't penalise the upgrade being offered
- **Off the beaten track** — the brief still applies, but obscurity is weighted heavily

The three sit in a tab strip detached from the card below, with a pointer tying the selected
one to it. Each destination leads with its name and country, then an image mosaic — one lead
tile with two stacked beside it — rather than a single banner with the name overlaid.

**Not for me** asks why before it swaps. The reasons are optional and multi-select, and each
one changes the brief rather than just being recorded — *too expensive* drops the budget a
notch, *too far* tightens the flight cap, *the visa is a hassle* filters to visa-free — so the
replacement answers the objection instead of being the next name down the list. Rule out
everything and it says so and stops, rather than quietly re-offering what you already rejected.

For each destination: an editorial description, a *Why here* rationale generated from the
brief, a Shark Tip, three return flight options from Lagos, and six hotels split into lower,
middle and higher budget tiers. Selecting a different flight or hotel tier reprices the
indicative trip total live.

**4 — Stepped prompt.** Concept 2's questions taken out of the *Need help?* modal and put on
the page, one at a time directly above the prompt box. Every step has the same shape: a progress bar, a
quiet meta line (*Question 2 of 6* on desktop, *2 of 6* on a phone, with Back), the question
as the one clear focal point, a line of help, the options, and a single action button that
never moves. That button is *Skip this question* by default; on the multi-select step, which
cannot know when you have finished, it becomes a filled *Next* with a count once you pick. Each answer writes
into the prompt as a sentence, and the prompt stays editable throughout — type into it and your
words are kept: while the generated opening is still intact we rewrite only that and preserve
your tail, and once you have rewritten it yourself we stop owning it and each later answer
appends just its own fact rather than restating the whole brief over the top of you.

Refinement works three ways — the **Nudge it** chips, removing a chip from the brief, or
typing into the **Edit brief** rail, which opens on-page from the left and pushes the results
across rather than covering them. The rail is full-height, so its composer sits on the bottom
edge of the browser at every scroll position and the message list scrolls inside it — nothing
to scroll to reach the input. Below 900px there is no width to give up, so it floats over with
a scrim instead ("cheaper", "too far", "more beach", a month, a
budget figure). All three re-score all three destinations. **Not interested** drops that
destination and promotes the next best fit for the slot.

The brief carries from an entry point through to the results page in `sessionStorage`. All
three entry points reset to their defaults on load — including on browser Back — so each run
through starts from scratch rather than inheriting the last one's answers.

## Notes for review

- Greyscale throughout, with a single accent reserved for the primary action on each screen.
- Imagery is deliberately left as checkerboard placeholders.
- **All destinations, flights, hotels and prices are indicative placeholders for demonstration
  only.** Flights are return economy from Lagos, hotels are per room per night, totals assume
  six nights.
- The Figma frame lists three options under *How far will you fly?*, two of them labelled
  "Go all out". Built here as the intended four: quick hop / 6h / 10h / anywhere.
- No build step, no dependencies. Open `index.html`, or serve the folder:
  `python3 -m http.server 4173`
