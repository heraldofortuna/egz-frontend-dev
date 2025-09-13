import { FormatDateType } from '@customtypes/actions';

function formatDate(date: string, type: FormatDateType = 'medium'): string {
  const [day, month, year] = date.split('/').map(Number);
  const dateObj = new Date(year + 2000, month - 1, day);

  const weekDay = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];

  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Setiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  const dayName = weekDay[dateObj.getDay()];
  const formattedDay = day.toString().padStart(2, '0');

  let formattedMonth = month.toString().padStart(2, '0');
  let formattedDate: string = '';

  if (type === 'short') {
    formattedDate = `${formattedDay}.${formattedMonth}`;
  }

  if (type === 'medium') {
    formattedDate = `${dayName} ${formattedDay}.${formattedMonth}`;
  }

  if (type === 'large') {
    formattedMonth = months[month - 1];

    formattedDate = `${dayName} ${formattedDay} de ${formattedMonth}`;
  }

  return formattedDate;
}

export default formatDate;
