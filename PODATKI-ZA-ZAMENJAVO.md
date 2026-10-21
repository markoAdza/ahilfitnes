# Podatki, ki jih je treba zamenjati

Stran je oblikovno in vsebinsko dokončana, a del podatkov še **ni resničen** —
to so nadomestki, ki čakajo na stranko. Ta dokument našteje vse take podatke in
kje se popravijo. Pred objavo v produkcijo mora biti vsaka vrstica v razdelku 1
urejena.

Skoraj vse stoji v [`lib/`](lib/). Popravek na enem mestu se sam prenese v
navigacijo, nogo, dialog za vpis, kartice lokacij, vse `tel:` in `mailto:`
povezave, zemljevide, strukturirane podatke in odgovore v pogostih vprašanjih.

---

## 1. Nujno — nadomestki na strani

| Podatek | Trenutna vrednost | Kje | Opomba |
|---|---|---|---|
| **Glavna telefonska številka** | `+386 1 234 5678` | [`lib/site.ts`](lib/site.ts) → `site.phone` | Najbolj kritično: številka je na vsakem gumbu "Pokliči", v dialogu za vpis, nogi, navigaciji in v odgovoru "Kako se vpišem?". |
| Naslov Hrastnik | `[naslov], 1430 Hrastnik` | [`lib/site.ts`](lib/site.ts) → `locations` | Oglati oklepaji so namenoma vidni. Vpliva tudi na povezavo do Zemljevidov Google in na vdelan zemljevid. |
| Naslov Trbovlje | `[naslov], 1420 Trbovlje` | [`lib/site.ts`](lib/site.ts) → `locations` | Enako. |
| Telefon Hrastnik, Trbovlje | *(ni naveden)* | [`lib/site.ts`](lib/site.ts) → `locations[].phone` | Neobvezno polje. Brez njega kartica lokacije pokaže glavno številko. |
| **Družbena omrežja** | `https://instagram.com`, `https://facebook.com`, `https://tiktok.com` | [`lib/site.ts`](lib/site.ts) → `socials` | Gole domene brez računa. Vstavi prave profile ali ikono odstrani. Ko so pravi, jih dodaj tudi v `sameAs` v [`app/layout.tsx`](app/layout.tsx). |
| **Seznam opreme** | splošna imena (ročke, tekalne steze …) | [`lib/equipment.ts`](lib/equipment.ts) → `items` | Vsak element je označen `placeholder: true`. Stranka naj sporoči, kaj je res v fitnesih (in znamke, če jih želi navesti). Ko je vnos potrjen, oznako odstrani. |
| Domena | `https://ahil-fitness.vercel.app` | [`lib/site.ts`](lib/site.ts) → `site.url` | Uporablja se za `sitemap.xml`, `robots.txt`, kanonične naslove in Open Graph. |

### Potrjeni podatki (stranka, 21. 10. 2026)

- Lokacije: **Hrastnik, Trbovlje, Sevnica** (Zagorje ni več lokacija).
- Sevnica: `Glavni trg 19, 8290 Sevnica`, `+386 7 816 9012`.
- E-pošta za vpis: `ahilfitnes@gmail.com`.
- Vsi trije fitnesi so odprti **24/7, brez recepcije**; vstop s kartico.
- Vsaka karta velja na vseh treh lokacijah.
- Brezplačno parkirišče ob vseh treh fitnesih.
- Garderobe in prhe na vseh treh lokacijah. Drugih ugodnosti (savna, skupinske
  vadbe, masaža, WiFi, vstopnice za goste, zamrznitev članarine) stranka ni
  potrdila, zato jih stran ne omenja.
- Vpis: pokliči ali piši → dogovor za termin → v fitnesu plačaš karto in letno
  članarino ter prevzameš kartico. Brezplačnega preizkusa ni.

---

## 2. Cene

Vse cene so prepisane s **tiskanega cenika v fitnesu** in so z DDV. Edini vir
je [`lib/pricing.ts`](lib/pricing.ts) — opisi strani, kartice, dialog in
odgovori v [`lib/faq.ts`](lib/faq.ts) jih berejo od tam, zato se ne morejo
razlikovati.

| Karta | Cena | Opomba |
|---|---|---|
| Enkratni obisk | 15 € | |
| 10 obiskov | 75 € | Velja 365 dni od nakupa karte |
| Tedenska karta | 25 € | |
| **Mesečna karta** | 65 € | Oznaka "Najbolj priljubljeno" |
| Polletna karta | 330 € | Stran izračuna ≈ 55 € na mesec |
| Letna karta | 600 € | Stran izračuna 50 € na mesec |

Osebni trener: 1 ura 35 € · 4 ure (1× na teden) 120 € · 8 ur (2× na teden)
200 € · 12 ur (3× na teden) 240 €. Paketi veljajo **do porabe**.

Druge storitve: letna članarina 20 € · izdelava nove kartice 10 €.

⚠️ **Za potrditev pri stranki:** letna članarina (20 €) je po navodilu stranke
obvezna za **vse** karte — torej tudi za enkratni obisk, ki tako skupaj stane
35 €. Če to ne drži (npr. enkratni obisk je brez članarine), popravi opis
`annualFee` v `lib/pricing.ts`, opombo na `PassCard` in odgovor "Kaj je letna
članarina?" v `lib/faq.ts`.

---

## 3. Fotografije — vse so nadomestne

Vse fotografije v [`public/images/`](public/images/) so z **Unsplash** (licenca
Unsplash, prosta uporaba) in **niso posnete v fitnesih Ahil**. Avtorji so v
[`public/images/CREDITS.md`](public/images/CREDITS.md). Prejšnje fotografije so
bile ustvarjene z umetno inteligenco in so odstranjene.

Stran zato nikjer ne trdi, da fotografija prikazuje naš prostor: hero in
kartice opreme imajo `alt=""` (okras), kartice lokacij "Nadomestna fotografija
vadbenega prostora", galerija pa nima napisa "naši prostori".

| Datoteka | Kje se prikaže |
|---|---|
| `hero.jpg` | Ozadje heroja na domači strani |
| `lokacija-hrastnik.jpg`, `lokacija-trbovlje.jpg`, `lokacija-sevnica.jpg` | Kartice lokacij |
| `oprema-*.jpg` (4) | Kartice con na domači strani in na /oprema |
| `galerija-1.jpg` … `galerija-6.jpg` | Galerija |

**Priporočilo:** fotografiranje vseh treh fitnesov, 3–4 posnetki na lokacijo in
po en posnetek vsake cone. Ko so na voljo, zamenjaj datoteke z istim imenom ali
popravi poti v `lib/site.ts` in `lib/equipment.ts`, ter popravi `alt` besedila,
da opišejo pravi prostor.

Logotip: [`public/brand/`](public/brand/) vsebuje vektorsko sled originalnega
logotipa (`logo.svg`, `logo-light.svg`, `helmet.svg`). Narejena je samodejno iz
`public/images/logo.png` in se ujema z njim — če ima stranka izvirno vektorsko
datoteko, jo uporabi namesto sledi.

---

## 4. Besedilo za pregled pri stranki

- Nagovor je **tikanje** ("Pridruži se", "Pokliči ali piši").
- Hero je samo besedna znamka "Ahil fitnes" — brez slogana, po dogovoru.
- Imena con (Proste uteži, Naprave na plošče, Kardio, Funkcionalna cona) in
  njihovi kratki opisi so v [`lib/equipment.ts`](lib/equipment.ts).

---

## 5. Kaj je še vredno urediti

- **Google Business Profile** za vse tri lokacije. Stran oddaja
  `SportsActivityLocation` oznake z naslovi in odprtostjo 24/7 — brez profila je
  polovica učinka izgubljena. Najprej pa pravi naslovi (razdelek 1).
- **Prava domena** namesto `.vercel.app`.
- **Open Graph slika** (`app/opengraph-image.png`, 1200 × 630) — npr. bronasta
  čelada na temni podlagi.
