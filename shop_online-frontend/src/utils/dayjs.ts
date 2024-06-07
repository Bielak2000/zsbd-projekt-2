import dayjs from 'dayjs';
import customFormatPlugin from 'dayjs/plugin/customParseFormat';
import calendarPlugin from 'dayjs/plugin/calendar';

dayjs.extend(customFormatPlugin);
dayjs.extend(calendarPlugin);
