export function parseTitleExercises(title: string) {
  const match = title.match(/^(.+?)(?:\s+(\d+))?$/);

  if (match) {
    return {
      parsedTitle: match[1].trim(),
      number: match[2] ? parseInt(match[2], 10) : null,
    };
  }

  return { parsedTitle: title, number: null };
}
