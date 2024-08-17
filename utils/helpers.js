export const cn = (...args: string[]) => {
  return args.filter(Boolean).join(' ');
};

export const formatDate = (date: Date | string) => {
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

export const calculateProgress = (
  startDate: Date | string,
  endDate: Date | string,
  currentValue: number,
  targetValue: number
) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();
  const daysPassed = Math.round((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const totalDays = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const progress =
    (daysPassed / totalDays) * 100 +
    ((currentValue - targetValue) / targetValue) * 100;
  return Math.round(progress);
};

export const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};