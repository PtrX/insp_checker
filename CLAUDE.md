# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A standalone, browser-based maintenance planning tool for Hyundai electric vehicles (IONIQ 5, Kona EV). German-language UI. No build process, no dependencies — open the HTML file directly in a browser.

## Development

- **Run**: Open `hyundai-inspektion.html` in any modern browser
- **No build, lint, or test tooling** — the project is a single self-contained HTML file

The numbered variants (`hyundai-inspektion_1.html` through `_5.html`) are historical iterations/backups.

## Architecture

All code lives in `hyundai-inspektion.html` with three embedded sections:

1. **CSS** (lines 7–303): CSS custom properties for theming, component styles (cards, badges, tables), print styles
2. **Configuration** (top of `<script>`): Vehicle model definitions with service intervals and cost ranges
3. **JavaScript** (lines 316–751): State, core algorithms, and DOM rendering

### Data Model

A `tabs` array holds vehicle objects. Each tab contains:
- Vehicle model, registration month/year, current km
- `scheckheft`: array of completed service entries (type, date, mileage)

No persistence — state is lost on page refresh.

### Core Logic

- `calcServices()`: Determines due/upcoming services from registration date, current mileage, and service history
- `calcCosts()`: Estimates costs for overdue and upcoming (24-month) services
- `getAmpel()`: Returns traffic-light status (green/yellow/red) per service
- `checkTolerance()`: Validates warranty-relevant service timing (±1 month / ±500 km)

### Vehicle Configuration

```
IONIQ 5:       24-month / 30,000 km intervals, includes climate service
Kona EV (old): 12-month / 15,000 km intervals, no climate service
Kona EV (new): 24-month / 30,000 km intervals, no climate service
HU/AU (TÜV):   First at 36 months, then every 24 months
```

Locale: German (`de-DE`) for all date and number formatting.
