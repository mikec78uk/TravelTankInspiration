# TravelTank — Inspiration

Greyscale wireframes for the TravelTank inspiration function. Three entry points into the same
recommendation engine, all leading to a shared results page.

**Live preview:** https://mikec78uk.github.io/TravelTankInspiration/
*(enable GitHub Pages under Settings → Pages → Deploy from branch → `main` / root)*

---

## What's here

| Page | What it is |
|---|---|
| [`index.html`](index.html) | Overview — the three entry points side by side |
| [`concept-1.html`](concept-1.html) | **Entry point 1** — guided brief (structured questions) |
| [`concept-2.html`](concept-2.html) | **Entry point 2** — open prompt with suggestions and a *Need help?* modal |
| [`concept-3.html`](concept-3.html) | **Entry point 3** — conversational, asks up to three follow-ups |
| [`results.html`](results.html) | Shared results — three destinations, flights, hotels, editable brief |

Shared code lives in `assets/`: `tt.css` (the wireframe system), `data.js` (destinations,
flights, hotels) and `core.js` (brief state, matching logic, page chrome).

## The three entry points

**1 — Guided brief.** The Figma frame, built out. Six groups of chips plus a free-text field.
Every field is optional; submitting an empty form still returns a recommendation.

*Entry requirements* is a two-way choice — **Visa-free** or **Visa required** — rather than a
single on/off toggle, so the customer can say a visa is no obstacle instead of only being able
to rule one out. Both options change the shortlist: visa-free excludes e-visa destinations as
well as embassy ones, and visa-required actively surfaces the places that need one.

**2 — Prompt with help on demand.** Lands on the standard Flights search, as the real homepage
does; *Inspire me* is the fourth tab. The worked-example suggestions appear only while the
prompt box is active and still empty, and clear away as soon as the customer starts typing.
*Need help?* opens a modal containing the Concept 1 questions. Whatever the customer picks is
turned into a plain-English prompt, dropped into the textbox when the modal closes — by any
route, including the X and the Esc key — and remains fully editable before sending.

**3 — Conversation.** One text box. The assistant parses the opening message, works out which
of interests / who / when / budget / distance / visa it already knows, and asks only what's
missing, up to three questions. Every step offers *Skip this — just show me somewhere*.

## The results page

Three destinations the customer toggles between:

- **Best match** — the closest fit to the brief
- **The premium option** — re-scored as if money were no object, so the customer's own budget
  cap doesn't penalise the upgrade being offered
- **Off the beaten track** — the brief still applies, but obscurity is weighted heavily

For each destination: an editorial description, a *Why here* rationale generated from the
brief, a Shark Tip, three return flight options from Lagos, and six hotels split into lower,
middle and higher budget tiers. Selecting a different flight or hotel tier reprices the
indicative trip total live.

Refinement works three ways — the **Nudge it** chips, removing a chip from the brief, or
typing into the **Edit brief** side panel ("cheaper", "too far", "more beach", a month, a
budget figure). All three re-score all three destinations. **Not interested** drops that
destination and promotes the next best fit for the slot.

The brief carries between pages in `sessionStorage`, so any entry point feeds the same results.

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
