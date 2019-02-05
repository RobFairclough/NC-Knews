import { pluralise } from '../utils';

describe('utils', () => {
  describe('pluralise', () => {
    test('should return an unchanged string when given the number one', () => {
      expect(pluralise('single', 1)).toBe('single');
    });
    test('should return a pluralised word if passed a number other than one', () => {
      expect(pluralise('plural', 3)).toBe('plurals');
    });
    test('should pluralise a zero number', () => {
      expect(pluralise('zero point', 0)).toBe('zero points');
    });
  });
});
