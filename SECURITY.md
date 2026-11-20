# M4T Neoonkontroll — turvalisus

Rakendus järgib NATO-laadseid põhimõtteid (kaitse mitmes kihis, vähima õiguse põhimõte, andmete minimeerimine). See **ei ole sertifitseeritud ega akrediteeritud** ning ei sobi salastatud teabe töötlemiseks.

## Kihid
| Kiht | Meede |
|---|---|
| Võrk | CSP `connect-src` lubab ainult `api.open-meteo.com`. Väliseid fonte, analüütikat ega CDN-e pole. `upgrade-insecure-requests`, `referrer: no-referrer`. |
| Kood | Skript on eraldi failis (`script-src 'self'`). Inline-skripte ja `eval` ei ole. Kõik kasutaja tekstid läbivad `esc()` enne HTML-i. |
| Andmed | Andmed jäävad seadme `localStorage`-isse, fotod seadme IndexedDB-sse. Serverit ega kontot pole. |
| Fotod | Vähendatakse kuni 1600 px-ni ja kodeeritakse uuesti. Sellega eemaldatakse EXIF- ja asukohaandmed. Jagamine toimub ainult kasutaja tegevusel (Web Share). |
| Õhuruum | Alade andmed (eAIP AIRAC 09/2026) on rakenduse sees. Arvutus tehakse telefonis ja asukohta ei saadeta kuhugi. |
| Sisend | `sanitize()` kontrollib salvestuse ja impordi iga välja tüüpi, vahemikku ja loetelu. Import on piiratud 2 MB-ga. Vigased koordinaadid ja telefoninumbrid jäetakse välja. |
| Väline API | Open-Meteo vastuse puhul kontrollitakse sisutüüpi, massiivide kuju ja väärtuste vahemikke. |
| Vahemälu | Service worker salvestab ainult oma päritoluga failid. |
| Kasutajaliides | Korraga on avatud üks dialoog. Taust on dialoogi ajal `inert` ja fookus jääb dialoogi. |

## Kasutaja vastutus
- Kasuta seadmes ekraanilukku ja ketta krüpteerimist.
- Ära sisesta salastatud ega isikuandmeid.
- Kontrolli enne iga lendu ametlikke allikaid: lennuruum, NOTAM ja ilm.

## Kontrollitud (2026-11-20, v7)
- XSS-import: 6 süstimiskatset, mitte ükski ei käivitunud.
- CSP rikkumisi ei leitud. Väliseid hoste peale Open-Meteo ei kasutatud.
- Topeltaknaid ei leitud 13 kombinatsioonis.
