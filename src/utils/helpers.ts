
export const calculateDuration = (start: Date, end: Date): string => {
  const difference = (end.getTime() - start.getTime()) / 1000;
  const hours = Math.floor(difference / 3600);
  const minutes = Math.floor((difference % 3600) / 60);
  const seconds = Math.floor(difference % 60);
  return `${hours}:${minutes}:${seconds}`
}

