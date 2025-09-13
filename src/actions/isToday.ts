function isToday(dateString: string): boolean {
  if (!dateString) return false;

  const [day, month, year] = dateString.split('/').map(Number);
  const today = new Date();

  return (
    Number(day) === today.getDate() &&
    Number(month) === today.getMonth() + 1 &&
    Number(year) === today.getFullYear() - 2000
  );
}

export default isToday;
