# Podatki, ki jih je treba zamenjati

Spletna stran je vsebinsko dokončana, a del kontaktnih podatkov je bil prevzet
iz prvotnega osnutka in **ni resničen**. Ta dokument našteje vse take podatke in
kje se popravijo.

Skoraj vse stoji v eni datoteki — [`lib/site.ts`](lib/site.ts). Popravek na enem
mestu se sam prenese v navigacijo, nogo, vse kartice lokacij, vse `tel:`
povezave, zemljevide, strukturirane podatke in zemljevid strani.

---

## 1. Nujno — podatki, ki so izmišljeni

| Podatek | Trenutna vrednost | Kje | Opomba |
|---|---|---|---|
| **Glavna telefonska številka** | `+386 1 234 5678` | [`lib/site.ts:20`](lib/site.ts) | Najbolj kritično: to je številka na vsakem gumbu na strani. Pojavi se v navigaciji, nogi, vseh pozivih k akciji, cenikih in v odgovoru "Kako se vpišem?". |
| Telefon Hrastnik | `+386 3 564 2210` | [`lib/site.ts`](lib/site.ts) | |
| Telefon Zagorje ob Savi | `+386 3 566 4180` | [`lib/site.ts`](lib/site.ts) | |
| Naslov Hrastnik | `Log 24, 1430 Hrastnik` | [`lib/site.ts`](lib/site.ts) | Vpliva tudi na povezavo do Zemljevidov Google in na vdelan zemljevid. |
| Naslov Zagorje ob Savi | `Cesta zmage 12, 1410 Zagorje ob Savi` | [`lib/site.ts`](lib/site.ts) | Enako. |
| **Družbena omrežja** | `https://instagram.com`, `https://facebook.com`, `https://tiktok.com` | [`lib/site.ts`](lib/site.ts) | Gole domene brez računa — ikone v nogi trenutno vodijo na vstopno stran omrežja. Vstavi prave profile ali ikono odstrani. |
| Domena | `https://ahil-fitness.vercel.app` | [`lib/site.ts`](lib/site.ts) | Ob prehodu na pravo domeno popravi tudi tu: uporablja se za `sitemap.xml`, `robots.txt`, kanonične naslove in Open Graph. |
| Ure recepcije | `med tednom 9.00–20.00, v soboto 9.00–13.00` | [`lib/site.ts`](lib/site.ts) | Preveri pri stranki. Če se spremenijo, popravi **oba** zapisa: besedilni `reception` in strojni `receptionHours`, ki poganja živ status "recepcija je odprta / zaprta". |

### Preverjeni podatki

Iz prvotnega osnutka izhaja kot resničen samo Sevnica:
`Glavni trg 19, 8290 Sevnica`, `+386 7 816 9012`.

---

## 2. Fotografije

Na voljo je **šest** različnih posnetkov notranjosti, nobeden pa ni izrecno
vezan na določeno lokacijo. Zato zdaj vsaka lokacija prikaže drugo sobo, da se
ista fotografija ne ponovi trikrat:

| Lokacija | Trenutna fotografija |
|---|---|
| Hrastnik | `/images/hrastnik.jpg` |
| Zagorje ob Savi | `/images/sevnica.jpg` *(nadomestna)* |
| Sevnica | `/images/equipment-hero.jpg` *(nadomestna)* |

> **Opomba:** v mapi `images/readdy/` obstaja datoteka `zagorje.jpg`, ki pa je
> bajt za bajt enaka Hrastnikovi (`hrasnk.jpg`) — torej ni fotografija Zagorja
> in je nismo uporabili.

**Priporočilo:** naročiti fotografiranje vseh treh fitnesov. Vsaka lokacija
potrebuje 2–3 posnetke; galerija na domači strani in na strani z opremo bere iz
polja `gallery` v [`lib/site.ts`](lib/site.ts) in sprejme poljubno število slik.

Neuporabljeno: `images/owner.png` (fotografija lastnika). Sekcije o ekipi po
dogovoru nismo dodali — če se pozneje odločite zanjo, je to najmočnejši element
proti občutku "generične strani", saj doda resničen obraz.

---

## 3. Cene — preverjene, a jih velja potrditi

Vsi zneski so nespremenjeni iz prvotnega osnutka in stojijo v
[`lib/pricing.ts`](lib/pricing.ts) kot **števila** (izpis `49 €` naredi
`eur()` iz [`lib/i18n.ts`](lib/i18n.ts), prihranke pa preklopnik izračuna sam).

Članarina `49 €` / `252 €` / `444 €` · dnevna vstopnica `15 €` ·
osebni trening `45 €` / `200 €` / `380 €` ·
skupinske vadbe `15 €` / `120 €` / `80 €` ·
omarica `10 €` · brisače `15 €` · masaža `60 €`

⚠️ Cene so **na treh mestih**, ki se morajo ujemati:
1. [`lib/pricing.ts`](lib/pricing.ts) — vir resnice
2. [`app/cenik/page.tsx`](app/cenik/page.tsx) — vpisane v opis strani za iskalnike
3. [`lib/faq.ts`](lib/faq.ts) — vpisane v besedilo odgovorov

---

## 4. Besedilo za pregled pri stranki

Strokovni izrazi za opremo so prevedeni po najboljši presoji. Če v fitnesu
uporabljate druge izraze, jih popravite v [`lib/equipment.ts`](lib/equipment.ts):

| Uporabljeno | Možna alternativa |
|---|---|
| Kettlebelli | girje |
| Bojne vrvi | battle ropes |
| Pliometrične skrinje | plyo skrinje, skakalne skrinje |
| Kabelski trenažerji | škripčevja |
| Cona z masažnimi valji | foam roller cona |
| Naprava za potisk nog | leg press |

Nagovor je **tikanje** ("Treniraj, kadar želiš") — po dogovoru. Če bi stranka
raje vikanje, gre za sistematičen popravek v `lib/*.ts` in v komponentah.

---

## 5. Kaj je še vredno urediti

- **Google Business Profile** za vse tri lokacije. Stran zdaj oddaja
  `SportsActivityLocation` oznake z naslovi, telefoni in odprtostjo 24/7, kar
  Google lahko poveže s profilom — brez profila je polovica učinka izgubljena.
- **Prava domena** namesto `.vercel.app`.
- **Open Graph slika** (`app/opengraph-image.png`, priporočeno 1200 × 630).
  Trenutno predogled ob deljenju povezave nima slike.
