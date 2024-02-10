import {formatDate} from './date';
import {UNKNOWN_DATE} from '../constants';

describe('formatDate function', () => {
  test('formats valid date correctly for EN', () => {
    const result = formatDate('2024-02-10', 'en');
    expect(result).toEqual('February 10, 2024');
  });

  test('formats valid date correctly for CS', () => {
    const result = formatDate('2024-02-10', 'cs');
    expect(result).toEqual('10. února 2024');
  });

  test('uses default locale if not provided', () => {
    const result = formatDate('2024-02-10');
    expect(result).toEqual('February 10, 2024');
  });

  test('returns unknown date for invalid date', () => {
    const result = formatDate('invalid');
    expect(result).toEqual(UNKNOWN_DATE);
  });
});
