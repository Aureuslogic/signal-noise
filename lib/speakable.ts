const DAYS: Record<string, string> = {
  mon: "Monday",
  tue: "Tuesday",
  tues: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  thur: "Thursday",
  thurs: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

/**
 * Expands day abbreviations (Mon, Tue, Wed, ...) to full words for the voice
 * narrator. Only apply this to text handed to the narrator - the on-screen
 * day tabs and scene kickers should keep their short form.
 */
export function speakable(text: string): string {
  return text.replace(/\b(thurs|thur|thu|tues|tue|mon|wed|fri|sat|sun)\b/gi, (match) => DAYS[match.toLowerCase()]);
}
