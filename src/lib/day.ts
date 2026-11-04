import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

/**
 * Re-export of dayjs with customParseFormat plugin extended.
 * Use this instance throughout the application for consistent date handling.
 */
export { dayjs };
