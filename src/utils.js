const pluralise = (word, count, addAnE) => (count === 1 ? word : `${word}${addAnE ? 'e' : ''}s`);

const passwordScore = password => (password.match(/(?=.*[0-9])(?=.*\W).{13,}/gi)
  ? 7
  : password.match(/(?=.*[0-9]).{13,}/gi)
    ? 6
    : password.match(/(?=.*[0-9])(?=.*\W).{8,}/gi)
      ? 5
      : password.match(/(?=.*[0-9]).{8,}/gi)
        ? 4
        : password.match(/[a-z]{8,13}/gi)
          ? 3
          : password.match(/.{4,7}/gi)
            ? 2
            : 1);
const validUsername = username => !/[^0-9a-z_-]/gi.test(username);

export { pluralise, passwordScore, validUsername };
