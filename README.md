# Ahil Fitnes

Predstavitvena spletna stran za Ahil Fitnes — fitnes, odprt 24 ur, s tremi lokacijami v Hrastniku,
Zagorju in Sevnici. Zgrajena z Next.js 15 (App Router), TypeScriptom in Tailwind CSS v4.

Stran je **enojezična slovenska**: `lang="sl"`, brez i18n knjižnice in brez slovarjev — nizi so
prevedeni na mestu, ker je za eno jezikovno različico to najmanj gibljivih delov.

Štiri strani: **Domov** (`/`), **Oprema** (`/oprema`), **Cenik** (`/cenik`) in **Pogosta vprašanja**
(`/pogosta-vprasanja`). Vse se predrenderira v statični HTML — brez baze, brez API-ja, brez
okoljskih spremenljivk.

> **Preden gre v produkcijo:** del kontaktnih podatkov je nadomestek in ni resničen. Celoten seznam
> je v [`PODATKI-ZA-ZAMENJAVO.md`](PODATKI-ZA-ZAMENJAVO.md).

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
| [`lib/site.ts`](lib/site.ts) | **Telefonske številke, naslove, ugodnosti**, ure recepcije, navigacijo, družbena omrežja, galerijo |
| [`lib/pricing.ts`](lib/pricing.ts) | Tri članarine in cenik po skupinah |
| [`lib/equipment.ts`](lib/equipment.ts) | 16 naprav in 4 povzetke kategorij |
| [`lib/faq.ts`](lib/faq.ts) | 10 vprašanj in odgovorov |
| [`lib/i18n.ts`](lib/i18n.ts) | Slovenska slovnica: sklanjanje po številu, naštevanje, zapis cen, iskanje brez strešic |

Številke so navedene na enem mestu in brane povsod drugod: vrstica »od 37 € na mesec« pride iz
`fromPrice` v `lib/pricing.ts`, število lokacij iz `locations.length`, `lib/faq.ts` pa vstavi
`site.phone` namesto da bi ga ponovil. Spremeni številko v `lib/` in vsaka stran, ki jo omenja,
sledi.

### Slovenska slovnica v kodi

Angleški izvirnik je nize sestavljal kot `` `${n} locations` ``, kar v slovenščini razpade
(1 lokacija, 2 lokaciji, 3 lokacije, 5 lokacij). [`lib/i18n.ts`](lib/i18n.ts) rešuje štiri stvari,
ki jih izvirna koda ni imela:

- `plural(n, oblike)` — pravilna oblika po slovenskih pravilih (CLDR). Obliki `forms.mesec` in
  `forms.mesecLoc` sta **različni**: pri štetju je »6 mesecev«, za predlogom pa »v 6 mesecih«.
- `listSl([...])` — »a, b **in** c«, brez vejice pred zadnjim členom.
- `eur(49)` — `49 €` z nedeljivim presledkom, ne `€49`.
- `fold(besedilo)` — zloži za primerjavo brez strešic, da iskanje »moc« najde »Moč«.

**Pisave morajo vključevati `latin-ext`.** Podnabor `latin` NE vsebuje č, š in ž. Brez njega bi se
šumniki risali iz sistemske nadomestne pisave — vidno druge črke sredi besede. Nastavljeno je v
[`app/layout.tsx`](app/layout.tsx).

## Oblikovni sistem

Vse je definirano enkrat v [`app/globals.css`](app/globals.css) pod `@theme`.

**Barva** — temna industrijska. Podlaga je topla skoraj-črna v štirih stopnjah (`ink`, `ink-2`,
`ink-3` in lasnici `line` / `line-soft`), besedilo v treh (`chalk`, `body`, `muted`). Cenik stoji na
**svetlem otoku** (`paper`, razred `on-light`), ker se 27 vrstic tabelaričnih številk na svetlem
bere bistveno bolje. Akcent je natanko en, baker (`--color-accent`), in je odmerjen na štiri
opravila: podčrtaj aktivne navigacije, oznaka »Priporočeno«, aktivni zavihek in števci.

Kontrasti so merjeni proti **najsvetlejši podlagi, na kateri se barva pojavi**, ne le proti osnovni:
`muted` je proti `ink` na 5,7 : 1, na dvignjenih površinah pa na 4,7 : 1. Prvi izbor odtenka je
padel na 4,36 : 1 in je bil zato zamenjan.

**Tipografija** — dve vlogi, ena družina za naslove. Archivo je naložena kot **variabilna z osjo
širine** (`wdth` 62–125), zato displej stopnje uporabijo kondenzirano različico iste pisave
(`font-stretch: 76–88 %`) brez dodatnega zahtevka. Kondenzacija ni okras: slovenski nizi so
~15–20 % daljši od angleških in kondenziran displej to pobere brez zmanjšanja velikosti. Inter za
vmesnik in tekoče besedilo. Lestvica je v pripomočkih `type-mega` / `type-h1` / `type-h2` /
`type-h3` / `type-stat`; `type-label` je edino mesto z velikimi črkami.

**Oblika** — en radij 2 px povsod, lasnice namesto obrob s sencami. Nobenih polnjenih tablet.

**Ritem** — sekcije so `py-16 md:py-24` in vsaka se odpre z lasnico, `type-label` nadnapisom in
levo poravnanim naslovom prek [`SectionHeading`](components/ui/SectionHeading.tsx), ki lahko izriše
tudi dvomestno številko sekcije.

## Interaktivnost

Mobile-first: poteg s prstom je nosilna interakcija, gumbi so krmilje.

| Komponenta | Kaj dela |
| --- | --- |
| [`motion/RevealRoot`](components/motion/RevealRoot.tsx) | **En** IntersectionObserver za celo stran. Strežniške komponente dodajo le `data-reveal` — brez lastne client meje. |
| [`motion/Counter`](components/motion/Counter.tsx) | Prešteje navzgor ob vstopu v vidno polje. |
| [`motion/ParallaxLayer`](components/motion/ParallaxLayer.tsx) | Rahel parallax hero fotografije — edini poslušalec drsenja na strani. |
| [`motion/useSnapCarousel`](components/motion/useSnapCarousel.ts) | Deljena logika karusela za lokacije in članarine. |
| [`LocationSwitcher`](components/LocationSwitcher.tsx) | Tri lokacije kot karusel z zaskokom + krmilje s tipkovnico. |
| [`PlanSwitcher`](components/PlanSwitcher.tsx) | Segmentni preklopnik; prihranek se izračuna iz števil, ne prepiše. |
| [`EquipmentExplorer`](components/EquipmentExplorer.tsx) | Filter po kategoriji + iskanje po imenih, opisih in specifikacijah. |
| [`Gallery`](components/Gallery.tsx) | Bento mreža s svetlobno škatlo na domačem `<dialog>`. |
| [`MapPanel`](components/MapPanel.tsx) | Zemljevid, ki se naloži šele na klik. |
| [`StickyCallBar`](components/StickyCallBar.tsx) | Lepljiv poziv k akciji na mobilnem, med prvim zaslonom in nogo. |
| [`ReceptionStatus`](components/ReceptionStatus.tsx) | Živ status recepcije, po uri v Ljubljani. |

### Zakaj brez `tablist` / `tabpanel`

Preklopnika lokacij in članarin **nista** vzorec tablist: ta bi pomenil, da sta dve od treh plošč
skriti, in brez JavaScripta bi ostali skriti. Tu so vse plošče vedno v dokumentu in vidne — nosilec
je vodoravna vrsta z zaskokom, krmilje pa le zadrsa do nje.

Iz istega razloga stojijo specifikacije opreme in odgovori na vprašanja v domačem `<details>`:
`<details name="faq">` da harmoniko z enim odprtim vprašanjem **brez ene vrstice JavaScripta**, past
za fokus in tipkovnica pa sta vgrajena v brskalnik.

### Delovanje brez JavaScripta (preverjeno)

| Stran | Kaj ostane vidno |
| --- | --- |
| `/` | Vseh 11 `data-reveal` elementov, vse 3 lokacije, vse 3 članarine, števci s pravimi vrednostmi |
| `/oprema` | Vseh 16 naprav in vseh 64 vrstic specifikacij |
| `/cenik` | Vse 3 članarine in vseh 13 vrstic cenika |
| `/pogosta-vprasanja` | Vseh 10 vprašanj, prvo odprto |

Skrito izhodišče za odkrivanje ob drsenju vklopi vgrajena skripta v layoutu, ki teče **pred**
izrisom (`data-reveal-armed` na `<html>`) — brez JS se ne postavi nič in nič ne izgine.

## Gumbi in obrazci

Zaledja zavestno ni, zato nič ne more tiho odpovedati. Vsak poziv k akciji je `tel:` povezava na
`site.phone`, in napisi to povedo — **Pokliči**, **Pokliči in se vpiši**, **Pogovori se z nami** —
namesto da bi namigovali na spletni vpis, ki ne obstaja.

Obrazca za e-novice ni. Prejšnji ni imel zaledja in je vseeno potrdil »na seznamu si«, kar je edina
stvar, ki je obrazec ne sme narediti.

## Fotografije

Šest posnetkov notranjosti in logotip so v [`public/images/`](public/images/). Posnetki zaslona
prvotnega osnutka in izvorno gradivo so za referenco v [`images/`](images/) — ta mapa je zunaj
`public/`, zato se nikoli ne postreže in ne pakira.

Nobena od šestih fotografij ni izrecno vezana na določeno lokacijo, zato vsaka lokacija prikaže
drugo sobo, da se ista fotografija ne ponovi trikrat. Podrobnosti in priporočilo za fotografiranje
so v [`PODATKI-ZA-ZAMENJAVO.md`](PODATKI-ZA-ZAMENJAVO.md).

## Dostopnost in SEO

- **Nič ni skrito za hoverjem.** Naslovi, telefonske številke in specifikacije so v DOM-u in vidni
  ves čas, na vsaki napravi.
- **Kontrast:** izmerjenih 341 besedilnih vozlišč na štirih straneh, nobene prekoračitve WCAG AA.
  Tekoče besedilo je 7,7 : 1, `muted` 5,7 : 1, akcent 7,7 : 1 — varen tudi za besedilo, ne le za
  polnila.
- **Zmanjšano gibanje:** pod `prefers-reduced-motion: reduce` se ustavijo parallax, trak, števci in
  odkrivanje ob drsenju; vsebina je takoj vidna.
- **Zasebnost:** pred klikom na zemljevid ne gre proti Googlu noben zahtevek — preverjeno v
  omrežnem dnevniku.
- **Tipkovnica:** karusela se krmilita s puščicami, `Home` in `End`; svetlobna škatla stoji na
  `<dialog>`, zato ima past za fokus, `Escape` in vračilo fokusa vgrajene.
- **Cenik** je `<table>` z `scope="colgroup"` in `scope="row"`, zato se pravilno bere v bralniku
  zaslona.
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
