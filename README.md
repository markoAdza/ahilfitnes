# Ahil Fitnes

Predstavitvena spletna stran za Ahil Fitnes — fitnes, odprt 24 ur, s tremi lokacijami v Hrastniku,
Trbovljah in Sevnici. Zgrajena z Next.js 15 (App Router), TypeScriptom in Tailwind CSS v4.

Stran je **enojezična slovenska**: `lang="sl"`, brez i18n knjižnice in brez slovarjev — nizi so
prevedeni na mestu, ker je za eno jezikovno različico to najmanj gibljivih delov.

Štiri strani: **Domov** (`/`), **Oprema** (`/oprema`), **Cenik** (`/cenik`) in **Pogosta vprašanja**
(`/pogosta-vprasanja`). Vse se predrenderira v statični HTML — brez baze, brez API-ja, brez
okoljskih spremenljivk.

> **Preden gre v produkcijo:** glavna telefonska številka, naslova v Hrastniku in Trbovljah, seznam
> opreme, družbena omrežja in vse fotografije so nadomestki. Celoten seznam je v
> [`PODATKI-ZA-ZAMENJAVO.md`](PODATKI-ZA-ZAMENJAVO.md).

## Lokalni razvoj

```bash
npm install
npm run dev      # http://localhost:3000
```

| Ukaz | Kaj naredi |
| --- | --- |
| `npm run dev` | Razvojni strežnik s samodejnim osveževanjem |
| `npm run build` | Produkcijska gradnja (vse 4 poti se predrenderirajo) |
| `npm start` | Postreže produkcijsko gradnjo |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

## Urejanje vsebine

Vse besedilo, cene in kontaktni podatki živijo v [`lib/`](lib/) — za spremembo tega, kar stran
pove, se ni treba dotakniti nobene komponente.

| Datoteka | Vsebuje |
| --- | --- |
| [`lib/site.ts`](lib/site.ts) | **Telefon, e-pošto, lokacije** (naslovi, sklon, rimska številka, ugodnosti), navigacijo, družbena omrežja, galerijo |
| [`lib/pricing.ts`](lib/pricing.ts) | 6 kart, pakete osebnega trenerja, letno članarino in druge storitve — s tiskanega cenika |
| [`lib/equipment.ts`](lib/equipment.ts) | 4 cone opreme z opisi, fotografijami in (nadomestnimi) seznami naprav |
| [`lib/faq.ts`](lib/faq.ts) | 8 vprašanj in odgovorov, sestavljenih iz podatkov zgoraj |
| [`lib/i18n.ts`](lib/i18n.ts) | Slovenska slovnica: sklanjanje po številu, naštevanje, zapis cen, iskanje brez strešic |

Številke so navedene na enem mestu in brane povsod drugod: »15 € za obisk« pride iz `fromPrice`,
mesečna cena polletne karte iz `perMonth()`, cena ure osebnega trenerja iz `perHour()`, število
lokacij iz `locations.length`, imena krajev v opisih iz `location.locative` (»v Hrastniku,
Trbovljah in Sevnici«), `lib/faq.ts` pa vstavi `site.phone`, `site.email` in zneske namesto da bi
jih ponovil. Spremeni številko v `lib/` in vsaka stran, ki jo omenja, sledi.

### Slovenska slovnica v kodi

Angleški izvirnik je nize sestavljal kot `` `${n} locations` ``, kar v slovenščini razpade
(1 lokacija, 2 lokaciji, 3 lokacije, 5 lokacij). [`lib/i18n.ts`](lib/i18n.ts) rešuje štiri stvari,
ki jih izvirna koda ni imela:

- `plural(n, oblike)` — pravilna oblika po slovenskih pravilih (CLDR). Obliki `forms.mesec` in
  `forms.mesecLoc` sta **različni**: pri štetju je »6 mesecev«, za predlogom pa »v 6 mesecih«.
- `listSl([...], "in" | "ali")` — »a, b **in** c« ali »a, b **ali** c«, brez vejice pred zadnjim
  členom.
- `eur(49)` — `49 €` z nedeljivim presledkom, ne `€49`.
- `fold(besedilo)` — zloži za primerjavo brez strešic.

**Pisave morajo vključevati `latin-ext`.** Podnabor `latin` NE vsebuje č, š in ž. Brez njega bi se
šumniki risali iz sistemske nadomestne pisave — vidno druge črke sredi besede. Nastavljeno je v
[`app/layout.tsx`](app/layout.tsx).

## Oblikovni sistem

Vse je definirano enkrat v [`app/globals.css`](app/globals.css) pod `@theme`. Smer: temno,
surovo in premijsko, z grškim junakom Ahilom kot edinim motivom — bronasta čelada iz logotipa
in rimske številke. Brez sloganov.

**Barva** — hladna skoraj-črna v treh stopnjah (`ink`, `ink-2`, `ink-3`) in dveh lasnicah (`line`,
`line-soft`), besedilo v treh (`chalk`, `body`, `muted`). Akcent je natanko en, **antični bron**:
`accent` (#b08d57, varen za besedilo, 6,4 : 1), `accent-bright` (#d6aa6c, polnila gumbov in aktivna
stanja; ink na njem 9,2 : 1), `accent-deep` (samo okras in prelivi, nikoli besedilo) in
`accent-dim` (toplejša podlaga za poudarjene površine). Kontrasti so merjeni proti najsvetlejši
podlagi, na kateri se barva pojavi; vsi pari besedila prestanejo WCAG AA.

Fotografije so razbarvane (`grayscale`) in prek `mix-blend-mode: color` tonirane v bron, da so
nadomestne slike različnih avtorjev videti kot ena serija.

**Tipografija** — dve družini, obe z `latin-ext`.
- **Archivo** (variabilna, `wdth` 62–125, `wght` 100–900) za vse: displej je kondenziran
  (`font-stretch` 62–68 %, teža 800–900, velike črke), tekoče besedilo normalne širine.
- **Cormorant Garamond** v kurzivi za klasični naglas: rimske številke sekcij, lokacij in con ter
  »fitnes« v heroju, ki odmeva pisani del logotipa.

Lestvica je v pripomočkih `type-mega` / `type-h1` / `type-h2` / `type-h3` / `type-stat` /
`type-label` / `type-serif`.

**Znak** — [`HelmetMark`](components/ui/HelmetMark.tsx) je vektorska sled čelade iz originalnega
logotipa (potrace, ne narisana na novo) z bronastim prelivom in zrnatostjo. V heroju je spomenik
čez desni rob, v glavah podstrani in zaključnem pasu tih odmev v barvi lasnice. Celoten logotip je
v [`public/brand/`](public/brand/).

**Ločnica** — [`Divider`](components/ui/Divider.tsx), tanka bronasta črta, namenoma le na treh
mestih: pod herojem, nad nogo in kot ločnica v ceniku.

**Oblika** — en radij 2 px povsod, lasnice namesto senc. Nobenih tablet.

**Ritem** — sekcije so `py-20 md:py-24` in vsaka se odpre z lasnico, rimsko številko,
`type-label` nadnapisom in levo poravnanim naslovom prek
[`SectionHeading`](components/ui/SectionHeading.tsx).

## Interaktivnost

Mobile-first: poteg s prstom je nosilna interakcija, gumbi so krmilje.

| Komponenta | Kaj dela |
| --- | --- |
| [`motion/RevealRoot`](components/motion/RevealRoot.tsx) | **En** IntersectionObserver za celo stran. Strežniške komponente dodajo le `data-reveal` — brez lastne client meje. |
| [`motion/Counter`](components/motion/Counter.tsx) | Prešteje navzgor ob vstopu v vidno polje. |
| [`motion/ParallaxLayer`](components/motion/ParallaxLayer.tsx) | Parallax hero fotografije in čelade (različni hitrosti) — edini poslušalec drsenja na strani. |
| [`motion/useSnapCarousel`](components/motion/useSnapCarousel.ts) | Logika karusela lokacij. |
| [`LocationSwitcher`](components/LocationSwitcher.tsx) | Tri lokacije kot karusel z zaskokom + krmilje s tipkovnico. |
| [`EquipmentExplorer`](components/EquipmentExplorer.tsx) | Filter po coni, zapisan v naslov (`/oprema#kardio`). |
| [`Gallery`](components/Gallery.tsx) | Bento mreža s svetlobno škatlo na domačem `<dialog>`. |
| [`MapPanel`](components/MapPanel.tsx) | Zemljevid, ki se naloži šele na klik. |
| [`JoinDialog`](components/JoinDialog.tsx) | Dialog za vpis — odpre ga vsak `[data-join]` (glej spodaj). |
| [`StickyJoinBar`](components/StickyJoinBar.tsx) | Lepljiv »Pridruži se« na mobilnem, med prvim zaslonom in nogo. |

### Zakaj brez `tablist` / `tabpanel`

Preklopnik lokacij **ni** vzorec tablist: ta bi pomenil, da sta dve od treh plošč skriti, in brez
JavaScripta bi ostali skriti. Tu so vse plošče vedno v dokumentu in vidne — nosilec
je vodoravna vrsta z zaskokom, krmilje pa le zadrsa do nje.

Iz istega razloga stojijo odgovori na vprašanja v domačem `<details>`:
`<details name="faq">` da harmoniko z enim odprtim vprašanjem **brez ene vrstice JavaScripta**, past
za fokus in tipkovnica pa sta vgrajena v brskalnik.

### Delovanje brez JavaScripta

| Stran | Kaj ostane vidno |
| --- | --- |
| `/` | Hero, vse 3 lokacije, 4 cone, 3 karte, paketi osebnega trenerja, galerija, števci s pravimi vrednostmi |
| `/oprema` | Vse 4 cone z vsemi napravami (filter jih le skriva) |
| `/cenik` | Vseh 6 kart, 4 paketi osebnega trenerja, 2 drugi storitvi |
| `/pogosta-vprasanja` | Vseh 8 vprašanj, prvo odprto |

Vsak »Pridruži se« je brez JS navadna povezava na `#vpis` — kontaktni blok v nogi s telefonom in
e-pošto, ki je na vsaki strani.

Skrito izhodišče za odkrivanje ob drsenju vklopi vgrajena skripta v layoutu, ki teče **pred**
izrisom (`data-reveal-armed` na `<html>`) — brez JS se ne postavi nič in nič ne izgine.

## Vpis — gumbi in obrazci

Zaledja zavestno ni, zato nič ne more tiho odpovedati. Vpis poteka tako, kot poteka v resnici:
**pokliči ali piši → dogovor za termin → v fitnesu plačaš karto in letno članarino ter prevzameš
kartico.**

Vsak poziv »Pridruži se« / »Izberi« je [`JoinButton`](components/JoinButton.tsx): strežniška
povezava na `#vpis` z `data-join` (in `data-join-pass="Mesečna karta"`, kjer gre za karto).
[`JoinDialog`](components/JoinDialog.tsx) v layoutu prestreže klik v fazi zajemanja — pred
next/link — in odpre domači `<dialog>` s tremi koraki, gumbom `tel:` in gumbom `mailto:` z
izpolnjeno zadevo (»Vpis – Mesečna karta«) in osnutkom sporočila. Na telefonu je dialog list z dna
zaslona, od `md` naprej okno na sredini.

## Fotografije

Vse fotografije v [`public/images/`](public/images/) so z Unsplash in **niso posnete v fitnesih
Ahil** — zato so v heroju in karticah opreme zgolj okras (`alt=""`), galerija pa ne trdi, da kaže
»naše prostore«. Avtorji so v [`public/images/CREDITS.md`](public/images/CREDITS.md), priporočilo za
fotografiranje v [`PODATKI-ZA-ZAMENJAVO.md`](PODATKI-ZA-ZAMENJAVO.md). Posnetki zaslona prvotnega
osnutka in izvorno gradivo so za referenco v [`images/`](images/) — ta mapa je zunaj `public/`, zato
se nikoli ne postreže.

## Dostopnost in SEO

- **Nič ni skrito za hoverjem.** Naslovi, telefonske številke in specifikacije so v DOM-u in vidni
  ves čas, na vsaki napravi.
- **Kontrast:** vsi pari besedila in podlage prestanejo WCAG AA. Tekoče besedilo je 7,9 : 1,
  `muted` 5,7 : 1, bronasti `accent` 6,4 : 1, ink na bronastem gumbu 9,2 : 1.
- **Zmanjšano gibanje:** pod `prefers-reduced-motion: reduce` se ustavijo parallax, števci,
  odkrivanje ob drsenju in prehodi dialoga; vsebina je takoj vidna.
- **Zasebnost:** pred klikom na zemljevid ne gre proti Googlu noben zahtevek — preverjeno v
  omrežnem dnevniku.
- **Tipkovnica:** karusel lokacij se krmili s puščicami, `Home` in `End`; svetlobna škatla in dialog
  za vpis stojita na `<dialog>`, zato imata past za fokus, `Escape` in vračilo fokusa vgrajene.
- **Paketi osebnega trenerja** so `<table>` s `scope="row"` in skritim napisom, zato se pravilno
  berejo v bralniku zaslona.
- **Strukturirani podatki:** `Organization` (v layoutu), 3× `SportsActivityLocation` z naslovi,
  telefoni in odprtostjo 24/7 (domača stran), `BreadcrumbList` (podstrani), `FAQPage`.
- `app/sitemap.ts`, `app/robots.ts` in `app/icon.png` so na mestu; vsaka stran nastavi svoj
  `title`, `description`, kanonični naslov in OpenGraph.
- Stare angleške poti (`/equipment`, `/pricing`, `/faq`) so **trajno preusmerjene** (308) na
  slovenske v [`next.config.ts`](next.config.ts), da nobena deljena povezava ne pripelje na 404.

## Objava

### 1. Na GitHub

```bash
# Najprej ustvari prazno repozitorij "ahil-fitnes" na github.com, nato:
git remote add origin https://github.com/<uporabnisko-ime>/ahil-fitnes.git
git branch -M main
git push -u origin main
```

### 2. Uvoz na Vercel

1. Pojdi na [vercel.com/new](https://vercel.com/new) in izberi repozitorij.
2. Sprejmi privzete nastavitve — Vercel sam zazna Next.js. Okoljskih spremenljivk in nastavitev
   gradnje ni.
3. Objavi. Vsak nadaljnji `push` na `main` samodejno posodobi stran.

### 3. Po prvi objavi

Nastavi `site.url` v [`lib/site.ts`](lib/site.ts) na pravo domeno. Uporablja se za kanonične
naslove, `sitemap.xml`, `robots.txt` in OpenGraph, zato bodo predogledi ob deljenju napačni, dokler
se ne ujema z živim naslovom.
