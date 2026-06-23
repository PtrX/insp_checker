# Hyundai EV Inspektions-Checkliste

Ein browserbasiertes Wartungsplanungs-Tool für Hyundai-Elektrofahrzeuge wie IONIQ 5 und Kona EV. Das Tool berechnet kommende Wartungen, zeigt überfällige Positionen und hilft dabei, Garantie-relevante Serviceintervalle im Blick zu behalten.

## Warum dieses Projekt existiert

EV-Wartungsintervalle sind nicht schwer, aber im Alltag leicht zu übersehen: Kilometerstand, Zulassungsdatum, HU/AU, Klimaservice und erledigte Scheckheft-Einträge liegen oft an unterschiedlichen Stellen. Dieses kleine Tool bündelt diese Informationen in einer lokal laufenden Checkliste.

## Funktionen

- **Wartungsplan** für IONIQ 5 und Kona EV (alt/neu) auf Basis von Zulassungsdatum und aktuellem Kilometerstand
- **Ampelsystem** (grün / gelb / rot) zeigt den Status jeder Wartungsposition auf einen Blick
- **Kostenschätzung** für offene/überfällige Wartung und die nächsten 24 Monate
- **Scheckheft-Eingabe**: Erledigte Services mit Datum und km eintragen inkl. Toleranzprüfung (±1 Monat / ±500 km) für die Garantie
- **Mehrere Fahrzeuge** in Tabs verwaltbar
- Alle Zahlen in **deutschem Format** (Punkte als Tausendertrenner, Komma als Dezimalzeichen)

## Verwendung

Einfach `hyundai-inspektion.html` im Browser öffnen — keine Installation, keine Abhängigkeiten.

## Wartungsintervalle

| Modell | Intervall | Klimaservice |
|---|---|---|
| IONIQ 5 | 24 Monate / 30.000 km | ✓ |
| Kona EV (neu) | 24 Monate / 30.000 km | – |
| Kona EV (alt) | 12 Monate / 15.000 km | – |

HU/AU (TÜV): erstmals nach 36 Monaten, dann alle 24 Monate.

## Kostenschätzungen

| Wartungsposition | Kosten (ca.) |
|---|---|
| Inspektion | 150–200 € |
| Bremsflüssigkeit | 50–70 € |
| Innenraumfilter | 30–50 € |
| Klimaservice | 40–60 € |
| HU/AU | 80–120 € |

## Technik

Reine HTML/CSS/JavaScript-Einzeldatei, kein Build-Prozess, keine externen Abhängigkeiten. Daten werden nur im Browser-Speicher gehalten (kein Server, kein Login).

## Datenschutz

Alle Eingaben bleiben lokal im Browser. Es gibt keinen Server, kein Tracking und keine Synchronisierung.

## Lessons Learned

- Kleine Alltagsprobleme profitieren oft mehr von einer fokussierten Einzeldatei-App als von einem schweren Framework.
- Wartungslogik sollte transparent im UI sichtbar sein, weil Nutzer die berechneten Fristen nachvollziehen wollen.
- Lokale Speicherung ist für persönliche Fahrzeugdaten ein sinnvoller Default, solange keine Team- oder Multi-Device-Synchronisierung gebraucht wird.
