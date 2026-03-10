const { chromium } = require('/opt/homebrew/lib/node_modules/playwright');
const path = require('path');

const FILE = 'file://' + path.resolve(__dirname, 'hyundai-inspektion.html');

let passed = 0;
let failed = 0;

function ok(name) { console.log('✓ ' + name); passed++; }
function fail(name, detail) { console.log('✗ ' + name + (detail ? ' — ' + detail : '')); failed++; }

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(FILE);

  // 1. Titel sichtbar
  const h1 = await page.textContent('.header h1');
  h1.includes('Inspektion') ? ok('Titel sichtbar') : fail('Titel sichtbar', h1);

  // 2. Erster Tab vorhanden
  const tab = await page.locator('.tab-btn').first();
  (await tab.isVisible()) ? ok('Erster Tab vorhanden') : fail('Erster Tab vorhanden');

  // 3. Modell-Dropdown vorhanden
  const sel = await page.locator('select').first();
  (await sel.isVisible()) ? ok('Modell-Dropdown sichtbar') : fail('Modell-Dropdown sichtbar');

  // 4. Modell wählen: IONIQ 5
  await sel.selectOption({ index: 0 });
  const selVal = await sel.inputValue();
  selVal ? ok('Modell wählbar: ' + selVal) : fail('Modell wählbar');

  // 5. Zulassungsmonat/-jahr setzen
  const selects = await page.locator('select').all();
  if (selects.length >= 3) {
    await selects[1].selectOption('01'); // Monat Januar (zero-padded)
    await selects[2].selectOption('2022'); // Jahr 2022
    ok('Zulassungsdatum gesetzt (01/2022)');
  } else {
    fail('Zulassungs-Selects nicht gefunden', `${selects.length} selects`);
  }

  // 6. Kilometerstand eingeben
  const kmInput = await page.locator('input[inputmode="numeric"]').first();
  await kmInput.focus();
  await kmInput.fill('45000');
  await kmInput.press('Enter');
  await page.waitForTimeout(200);
  const kmVal = await kmInput.inputValue();
  kmVal.includes('45') ? ok('km-Eingabe: ' + kmVal) : fail('km-Eingabe', kmVal);

  // 7. Wartungstabelle erscheint
  const rows = await page.locator('table tr').count();
  rows > 1 ? ok(`Wartungstabelle: ${rows} Zeilen`) : fail('Wartungstabelle leer');

  // 8. Ampel-Badges vorhanden
  const badges = await page.locator('.badge').count();
  badges > 0 ? ok(`Ampel-Badges: ${badges} Stück`) : fail('Keine Ampel-Badges');

  // 9. Kostenschätzung sichtbar
  const cost = await page.locator('.cost-item').count();
  cost >= 2 ? ok(`Kostenschätzung: ${cost} Positionen`) : fail('Kostenschätzung fehlt');

  // 10. Zweiten Tab hinzufügen
  await page.locator('.tab-add').click();
  await page.waitForTimeout(100);
  const tabs = await page.locator('.tab-btn').count();
  tabs >= 2 ? ok(`Zweiter Tab erstellt (${tabs} Tabs)`) : fail('Tab-Hinzufügen fehlgeschlagen');

  // 11. Tab schließen
  const closeBtn = await page.locator('.tab-close').last();
  await closeBtn.click();
  await page.waitForTimeout(100);
  const tabsAfter = await page.locator('.tab-btn').count();
  tabsAfter === 1 ? ok('Tab geschlossen') : fail('Tab-Schließen fehlgeschlagen', `${tabsAfter} Tabs übrig`);

  // 12. Scheckheft: Monats-Dropdown vorhanden (Werte zero-padded z.B. "01")
  const shMonthSels = await page.locator('.sh-month').all();
  if (shMonthSels.length > 0) {
    await shMonthSels[0].selectOption('06');
    ok(`Scheckheft-Monat gewählt (${shMonthSels.length} Monats-Selects)`);
  } else {
    fail('Keine Monats-Selects im Scheckheft');
  }

  await browser.close();

  console.log(`\n${passed} bestanden, ${failed} fehlgeschlagen`);
  process.exit(failed > 0 ? 1 : 0);
})();
