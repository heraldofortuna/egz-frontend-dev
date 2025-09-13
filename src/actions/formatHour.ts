function formatHour(hourString: string) {
  if (!hourString) return 'Por definir';

  const [hour, minute, second] = hourString.split(':');
  let period = 'de la mañana';
  let formattedHours = hour;
  let formattedMinutes = minute;

  return `${hour}:${minute}`;
}

export default formatHour;
