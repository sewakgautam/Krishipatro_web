// utils/nepaliDate.ts

// Nepali months and their English equivalents
const nepaliMonths = [
  'बैशाख', 'जेठ', 'असार', 'साउन', 'भदौ', 'असोज',
  'कार्तिक', 'मंसिर', 'पौष', 'माघ', 'फागुन', 'चैत्र'
];

// Days in Nepali months for different years (sample data - you'd need complete lookup table)
const nepaliCalendarData: { [year: number]: number[] } = {
  2081: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2024-25
  2082: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2025-26
  // Add more years as needed
};

export function convertToNepaliDate(englishDate: string): string {
  try {
    // For a proper conversion, you should use a library like 'nepali-date-converter'
    // This is a simplified approximation
    
    const date = new Date(englishDate);
    const englishYear = date.getFullYear();
    const englishMonth = date.getMonth() + 1;
    const englishDay = date.getDate();
    
    // Rough conversion: Nepali year is approximately English year + 56.7
    // More accurate conversion would require lookup tables
    let nepaliYear: number;
    let nepaliMonth: number;
    let nepaliDay: number;
    
    if (englishMonth >= 4) {
      // April onwards -> new Nepali year
      nepaliYear = englishYear + 57;
      nepaliMonth = englishMonth - 3; // April = 1st Nepali month (Baisakh)
    } else {
      // January-March -> previous Nepali year
      nepaliYear = englishYear + 56;
      nepaliMonth = englishMonth + 9; // Jan = 10th Nepali month
    }
    
    // Adjust for month boundaries (simplified)
    nepaliDay = englishDay;
    
    // Format as YYYY-MM-DD
    return `${nepaliYear}-${nepaliMonth.toString().padStart(2, '0')}-${nepaliDay.toString().padStart(2, '0')}`;
  } catch (error) {
    console.error('Error converting to Nepali date:', error);
    return "";
  }
}

export function formatNepaliDate(nepaliDate: string): string {
  try {
    const [year, month, day] = nepaliDate.split('-').map(Number);
    const monthName = nepaliMonths[month - 1] || month.toString();
    return `${year} ${monthName} ${day}`;
  } catch (error) {
    console.error('Error formatting Nepali date:', error);
    return nepaliDate;
  }
}

// For more accurate conversion, install and use: npm install nepali-date-converter
// Example usage with the library:
/*
import { englishToNepali } from 'nepali-date-converter';

export function convertToNepaliDateAccurate(englishDate: string): string {
  try {
    const date = new Date(englishDate);
    const nepaliDate = englishToNepali(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );
    return `${nepaliDate.year}-${nepaliDate.month.toString().padStart(2, '0')}-${nepaliDate.day.toString().padStart(2, '0')}`;
  } catch (error) {
    console.error('Error converting to Nepali date:', error);
    return "";
  }
}
*/
