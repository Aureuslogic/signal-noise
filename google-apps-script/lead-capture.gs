/**
 * Receives lead-gate submissions from the Signal or Noise game and appends
 * them as a row to the sheet this script is bound to.
 *
 * Setup:
 * 1. Open the target Google Sheet.
 * 2. Extensions > Apps Script.
 * 3. Delete any starter code and paste this whole file in.
 * 4. Deploy > New deployment > type "Web app".
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web app URL and set it as WEBHOOK_URL in lib/config.ts.
 *
 * The game posts `application/x-www-form-urlencoded` with mode: "no-cors",
 * so the response body is never read by the browser - doPost just needs to
 * not throw.
 */
const HEADERS = [
  "timestamp",
  "name",
  "email",
  "instruments",
  "level",
  "educational_profile",
  "simulated_balance",
  "decision_discipline",
  "process_consistency",
  "source",
];

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const params = (e && e.parameter) || {};

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }

  sheet.appendRow(HEADERS.map((key) => params[key] || ""));

  return ContentService.createTextOutput(JSON.stringify({ status: "ok" })).setMimeType(
    ContentService.MimeType.JSON,
  );
}
