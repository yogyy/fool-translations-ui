import dayjs from 'dayjs';

export const formatDate = (date: Date) => {
  const currentTime = dayjs();
  const origin = dayjs(date);

  const hoursDiff = currentTime.diff(origin, 'hour');
  const daysDiff = currentTime.diff(origin, 'day');
  const monthsDiff = currentTime.diff(origin, 'month');
  const yearsDiff = currentTime.diff(origin, 'year');

  switch (true) {
    case hoursDiff < 24:
      return `today`;
    case daysDiff <= 1:
      return 'a day ago';
    case daysDiff < 30:
      return `${daysDiff} days ago`;
    case monthsDiff <= 1:
      return `a month ago`;
    case monthsDiff < 12:
      return `${monthsDiff} months ago`;
    case yearsDiff === 1:
      return 'a year ago';
    case yearsDiff > 1:
      return `${yearsDiff} years ago`;
    default:
      return origin.format('MMM YYYY');
  }
};
