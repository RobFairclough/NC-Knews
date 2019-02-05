const pluralise = (word, count) =>
  count === 1 || count === '1' || count.length === '1' ? word : `${word}s`;

export { pluralise };
