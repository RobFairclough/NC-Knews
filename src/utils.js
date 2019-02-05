const pluralise = (word, count, addAnE) =>
  count === 1 || count === '1' || count.length === '1'
    ? word
    : `${word}${addAnE ? 'e' : ''}s`;
export { pluralise };
