# Hyundai EV Inspektions-Checkliste

Ein browserbasiertes Wartungsplanungs-Tool für Hyundai-Elektrofahrzeuge (IONIQ 5, Kona EV). Entwickelt gemeinsam mit Claude AI.

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
