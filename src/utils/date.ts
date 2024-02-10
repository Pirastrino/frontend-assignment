import {UNKNOWN_DATE} from '../constants';

export const formatDate = (date: string | Date = '', locales = 'en-US') => {
  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) {
    return UNKNOWN_DATE;
  }
  return dateObj.toLocaleDateString(locales, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
