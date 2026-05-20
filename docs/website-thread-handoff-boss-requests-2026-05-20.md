# Website Thread Handoff - Boss Requests - 20/05/2026

Use this as the starting brief for the next website thread.

## Standing Brand Rules

- Keep the voice restrained, heritage-first, and chateau-first.
- Do not overclaim history or brewing continuity.
- Do not use: "Brassee au chateau depuis 1560".
- Do not imply regular public opening hours.
- The chateau remains private.
- Keep partial/open systems as structured work in progress, not as public promises.
- Do not publish public bottle prices until pricing and channel logic are approved.

## Current Website State

- Public domain is live: `https://brasseriechateaudurbuy.be/`.
- Source of truth is this repo, with static-first `index.html`.
- `index.html` and `redesign-template.html` should stay identical after homepage edits.
- Public contact on the site should remain `info@brasseriechateaudurbuy.be`.
- Reservation flow is currently a restrained teaser/contact route, not a full booking engine.
- Beer names, ABVs, and full tasting details are still treated carefully because labels/launch are not final.

## Boss Requests To Carry Into Website Work

### 1. Points De Vente / Where To Buy

Monsieur Jean-Michel wants a website tab or section showing where the beers are currently sold.

Recommended first implementation:

- Add a restrained section: "Ou trouver nos bieres" or "Points de vente".
- Keep it factual: name, address, optional external link.
- Avoid stock guarantees.
- Use wording like: "Une selection de nos bieres est disponible chez plusieurs partenaires locaux, selon arrivage."
- Do not publish prices in this section.

Known sales points:

| Sales point | Suggested display name | Address | Status |
|---|---|---|---|
| Distributor / drink market | Etablissements Dispas | Route de Bomal 42/A, 6940 Barvaux-sur-Ourthe | Public website verified |
| Local shop | L'Epicerie de Durbuy | Rue du Comte Theodule d'Ursel 39, 6940 Durbuy | Public website verified |
| Confiturerie | Confiturerie Saint-Amour | Atelier: 13 Rue Saint-Amour, 6940 Durbuy; shop: 7 Rue Alphonse Eloy, 6940 Durbuy | Confirm which location stocks the beer before publishing |
| Librairie | Le Petit Bazar / La Librairie area | Rue du Comte Theodule d'Ursel 20, 6940 Durbuy | Confirm exact public display name before publishing |

Open before publish:

- Confirm whether Saint-Amour beer stock is at the atelier, the shop in old Durbuy, or both.
- Confirm exact display name for the librairie.
- Decide whether to link to partner websites or keep only addresses.

### 2. Open Brasserie / Quarterly Visit Concept

Monsieur Jean-Michel wants to consider an "open brasserie" / free brewery visit moment roughly once every three months.

Important:

- This is not regular opening hours.
- Do not publish until actual dates are chosen.
- Frame only as announced occasional brewery days.
- The chateau itself remains private.

Possible later wording:

> Des journees ouvertes de la brasserie pourront etre annoncees ponctuellement. Le chateau demeure un domaine prive.

Do not add this as an active event section until dates and conditions are confirmed.

### 3. Launch / Presentation Timing

Monsieur Jean-Michel said late June is more realistic than early June for the launch / presentation moment.

Website consequence:

- Do not announce a launch date yet.
- Keep public copy flexible.
- Any launch/event section depends on corrected labels, new physical proof, beer readiness, and owner approval.

### 4. Four-Bottle Gift Pack / Packaging

Monsieur Jean-Michel wants to investigate a generic four-bottle beer pack / valise:

- four 33 cl bottles visible in a row;
- labels visible;
- generic carrier usable across the range;
- custom sticker applied to the carrier;
- sticker content/design still to define.

Supplier direction:

- MJ Pack / M.J.PACK SPRL is confirmed as the supplier direction.
- Product reference found: 4 x 33 cl APO / Longneck presentation box, ref. 47509.
- Must confirm actual fit for the brewery's 33 cl APO bottles.
- Must confirm that all four labels remain visible.
- Ask MJ Pack for current stock, price, minimum quantity, delivery cost, lead time, and sticker/printing options.

Packaging examples:

- Lars found Krabbendam Kadoverpakking links only as visual examples of the type of carrier Jean-Michel likely meant.
- These examples are not selected products.
- Do not assume they fit the brewery bottles.

Website consequence:

- Do not add a gift-pack sales page yet.
- Packaging can become a later launch / gift idea once product, sticker, and availability are confirmed.

### 5. Pricing / Price List

Monsieur Jean-Michel wants Raynald to prepare a new price list.

Confirmed pricing logic:

- Production price = fabricated cost basis.
- Prix distributeur = production price + 20%.
- Prix vendeur = prix distributeur + 30%.
- Combined: prix vendeur = production price x 1.56.

Website consequence:

- Do not publish bottle prices publicly yet.
- If a future professional area exists, prices should likely be behind controlled access or sent on request.
- B2B / rebranding still needs to be mapped onto the confirmed pricing structure if it is a separate column.

### 6. Order / Login Idea

Lars proposed a possible website order flow:

- Professional customers with VAT number:
  - order/request routed to Dispas or internal follow-up.
- Private customers:
  - order/request for pickup at the chateau by appointment.

Recommended website approach:

1. Add public "Points de vente" first.
2. Later add restrained inquiry forms, without public prices.
3. Only consider login-protected order forms after pricing, stock, distributor routing, pickup process, and admin responsibility are stable.

Avoid calling it an online shop for now.

Better labels later:

- "Demande professionnelle"
- "Demande de retrait au chateau"
- "Retrait sur rendez-vous"

## What To Build First

Build first:

1. A new "Ou trouver nos bieres" / "Points de vente" section.
2. Add it to desktop and mobile navigation only if it does not overload the nav.
3. Use restrained partner list layout, not marketing cards.
4. Keep text short and factual.
5. Preserve the existing visual tone.

Suggested section copy:

> Ou trouver nos bieres
>
> Une selection de nos bieres est disponible chez plusieurs partenaires locaux, selon arrivage.

Then list partners.

## What Not To Build Yet

- No public ecommerce.
- No public price table.
- No login/order area until workflow is agreed.
- No open-brasserie dates until dates are selected.
- No gift-pack page until packaging and stock are confirmed.
- No launch date until late-June event timing is approved.
- No label/product claims that depend on the rejected proof cycle.

## Related Operational Status

Labels remain the main public-launch blocker:

- Eshuis 20/05 physical proof was rejected.
- Raynald must send corrected 180 x 80 mm visible artwork as 184 x 84 mm PDFs with 2 mm bleed.
- Raynald sent one IPA PDF on 20/05 at 13:37, but it failed because it was 180 x 80 mm without bleed.
- Do not make public launch/product claims until the label route is clean and a new physical proof is accepted.

## Reference Files

- `C:\Users\Lars\Documents\Brasserie\commercial_website_packaging_notes_2026-05-20.md`
- `C:\Users\Lars\Documents\Brasserie\owner_decisions_2026-05-20.md`
- `C:\Users\Lars\Documents\Brasserie\label_revision_gate_2026-05-20.md`
- `C:\Users\Lars\Documents\Brasserie\label_check_raynald_ipa_2026-05-20.md`
- `C:\Users\Lars\Documents\Brasserie\brasserie-chateau-durbuy-2026\docs\website-handoff-2026-05-20-points-de-vente.md`
