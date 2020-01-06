/**
 * Date with local information
 * 
 * @param {number} day day of month number
 * @param {string} dayName day of the week name
 * @param {number} month month of the year number
 * @param {string} monthName month of the year name
 * @param {number} year full year
 */
export interface LocalDate {
  day: number;
  dayName: string;
  month: number;
  monthName: string;
  year: number;
}
