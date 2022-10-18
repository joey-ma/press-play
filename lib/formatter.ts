import formatDuration from 'format-duration';

export const formatTime = (timeInSeconds = 0) => {
  return formatDuration(timeInSeconds * 1000);
};

export const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric', // numeric, 2-digit
    month: 'short', // numeric, short, long
    day: 'numeric', // numeric, 2-digit
  });
};
