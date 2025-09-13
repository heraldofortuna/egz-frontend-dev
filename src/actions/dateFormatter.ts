export const formatDateToDDMMYYYY = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
};

export const createFutureDate = (daysToAdd: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);
  return formatDateToDDMMYYYY(date);
};

export const createPastDate = (daysToSubtract: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysToSubtract);
  return formatDateToDDMMYYYY(date);
};