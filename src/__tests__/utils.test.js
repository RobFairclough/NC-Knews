/* eslint-disable no-undef */
import { pluralise, passwordScore, validUsername } from '../utils';

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
    test('should add an e to plurals if passed the addAnE param', () => {
      expect(pluralise('zero', 2, true)).toBe('zeroes');
    });
  });
});

describe('validUsername()', () => {
  test('should return false for a username containing invalid characters', () => {
    expect(validUsername('!!!')).toBe(false);
    expect(validUsername('€#¢∞')).toBe(false);
    expect(validUsername('abc!@£$')).toBe(false);
    expect(validUsername('abc123*%&')).toBe(false);
  });
  test('should return true for a username containing only valid characters', () => {
    expect(validUsername('rob')).toBe(true);
    expect(validUsername('rob123')).toBe(true);
    expect(validUsername('rob-fairclough')).toBe(true);
    expect(validUsername('rob_rob_rob-123')).toBe(true);
  });
});

describe('passwordScore()', () => {
  test('should give a score of 1 for a password less than 4 characters', () => {
    const password = 'rob';
    expect(passwordScore(password)).toBe(1);
  });
  test('should give a score of 2 for a password more than 4 but less than 8 characters long', () => {
    const password = 'buffalo';
    expect(passwordScore(password)).toBe(2);
  });
  test('should return 3 for a password of 8+ characters which is all letters', () => {
    const password = 'hellofriend';
    expect(passwordScore(password)).toBe(3);
  });
  test('should return 4 for a password of 8+ characters including a number', () => {
    const password = 'bananas123';
    expect(passwordScore(password)).toBe(4);
  });
  test('should return 5 for an 8+ char password with a number and special character', () => {
    const password = 'hey!!!333';
    expect(passwordScore(password)).toBe(5);
  });
  test('shuold return 6 for a password over 12 chars long which includes a number', () => {
    const password = 'thirteenchars13';
    expect(passwordScore(password)).toBe(6);
  });
  test('should return 7 for a password over 12 chars long including a number and special chars', () => {
    const password = 'password.no.7';
    expect(passwordScore(password)).toBe(7);
  });
});
