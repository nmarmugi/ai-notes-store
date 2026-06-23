export function notesLabel(count: number): string {
  if (count === 0) return "Vuoto";
  if (count === 1) return "1 appunto";
  return `${count} appunti`;
}

export function formatNoteDate(date: Date): string {
  return date.toLocaleDateString("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
